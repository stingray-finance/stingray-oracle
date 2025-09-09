module stingray_oracle::oracle_aggregator;

// === Imports ===
use std::{
    type_name::{ TypeName },
    ascii::{ String },
};

use sui::{
    clock::{ Clock },
    vec_map::{ Self, VecMap },
    dynamic_field::{ Self as df },
};

use switchboard::{
    aggregator::{ Aggregator },
};

use pyth::{
    price_info::{ PriceInfoObject},
};

use stingray_oracle::{
    current_price::{ CurrentPrice },
    switchboard_price_fetcher::{ Self },
    pyth_price_fetcher::{ Self },
    supra_price_fetcher::{ Self },
};
use SupraOracle::{
    SupraSValueFeed::{ OracleHolder },
};
use switchboard::decimal;
use switchboard::on_demand::AdminCap;

// === Errors ===
const ESignificientPriceDiff: u64 = 0;
fun err_significant_price_diff(){ abort ESignificientPriceDiff }
const ENoValidPrice: u64 = 1;
fun err_no_valid_price(){ abort ENoValidPrice }
const EWrongSource: u64 = 2;
fun err_wrong_source(){ abort EWrongSource }
const ERuleNotSupported: u64 = 3;
fun err_rule_not_supported(){ abort ERuleNotSupported }

// === Constants ===
const PYTH_KEY: vector<u8> = b"pyth";
const SWITCHBOARD_KEY: vector<u8> = b"switchboard";
const SUPRA_KEY: vector<u8> = b"supra";
const TOLERANCE_OF_PRICE_DIFF: u64 = 50;

// === Structs ===
public struct OracleAggregator has key, store {
    id: UID,
    coin_type: String,
    price: PriceInfo,
    oracles: Oracles,
    latest_update_ms: u64,
    tolerance_ms: u64,
    is_active: bool,
}

public struct PriceInfo has store, copy, drop{
    price: u64,
    decimals: u8,
}

public struct Oracles has store {
    pyth: Option<ID>,
    switchboard: Option<ID>,
    supra: Option<u32>,
}

public struct PriceSources has copy, drop{
    coin_type: String,
    sources: VecMap<vector<u8>, Option<CurrentPrice>>,
}

public struct WhitelistRule<phantom R: drop> has store, copy, drop {}

// === Public-Write Functions ===
public fun new_price_sources(
    coin_type: TypeName,
): PriceSources{
    PriceSources{
        coin_type: coin_type.into_string(),
        sources: vec_map::empty<vector<u8>, Option<CurrentPrice>>(),
    }
}

// === Public-View Functions ===
public fun price_info(
    self: &OracleAggregator,
):PriceInfo{
    self.price
}

public fun price(
    price_info: &PriceInfo,
): u64{
    price_info.price
}

public fun decimals(
    price_info: &PriceInfo,
): u8{
    price_info.decimals
}

public fun oracle_amount(
    self: &OracleAggregator,
): u64{
    let mut amount = 0;
    if (self.oracles.pyth.is_some()){
        amount = amount + 1;
    };
    if (self.oracles.switchboard.is_some()){
        amount = amount + 1;
    };
    if (self.oracles.supra.is_some()){
        amount = amount + 1;
    };
    amount
}

public fun latest_update_ms(
    self: &OracleAggregator,
): u64{
    self.latest_update_ms
}

public fun is_active(
    self: &OracleAggregator,
):bool{
    self.is_active
}

public fun tolerance_ms(
    self: &OracleAggregator,
): u64{
    self.tolerance_ms
}

public use fun borrow_pyth as OracleAggregator.pyth;
public fun borrow_pyth(
    self: &OracleAggregator
): &Option<ID>{
    &self.oracles.pyth
}

public use fun borrow_switchboard as OracleAggregator.switchboard;
public fun borrow_switchboard(
    self: &OracleAggregator
): &Option<ID>{
    &self.oracles.switchboard
}

public use fun borrow_supra as OracleAggregator.supra;
public fun borrow_supra(
    self: &OracleAggregator
): &Option<u32>{
    &self.oracles.supra
}

// === Public-Package Functions ===
public(package) fun new(
    coin_type: String,
    pyth: Option<address>,
    switchboard: Option<address>,
    supra: Option<u32>,
    decimals: u8,
    tolerance_ms: u64,
    ctx: &mut TxContext,
): OracleAggregator{
    let pyth_config = if (pyth.is_some()) option::some(pyth.destroy_some().to_id()) else option::none();
    let switchboard_config = if (switchboard.is_some()) option::some(switchboard.destroy_some().to_id()) else option::none();
    OracleAggregator{
        id: object::new(ctx),
        coin_type, 
        price: PriceInfo{
            price: 0,
            decimals,
        },
        oracles: Oracles{
            pyth: pyth_config,
            switchboard: switchboard_config,
            supra,
        },
        tolerance_ms,
        latest_update_ms: 0,
        is_active: false,
    }
}

public use fun activate_aggregator as OracleAggregator.active;
public(package) fun activate_aggregator(
    self: &mut OracleAggregator,    
){
    self.is_active = true;
}

public use fun deactivate_aggregator as OracleAggregator.deactive;
public(package) fun deactivate_aggregator(
    self: &mut OracleAggregator,
){
    self.is_active = false;
}

public fun update_tolerance_ms(
    self: &mut OracleAggregator,
    new_tolerance_ms: u64
){
    self.tolerance_ms = new_tolerance_ms;
}

// ** Switchboard **
public(package) fun set_switchboard(
    self: &mut OracleAggregator,
    new_switchboard: Option<address>,
){
    self.oracles.switchboard = if(new_switchboard.is_some()) option::some(new_switchboard.destroy_some().to_id()) else option::none();
}

public use fun add_price_from_switchboard as PriceSources.add_switchboard_price;
public fun add_price_from_switchboard(
    sources: &mut PriceSources,
    coin_type: TypeName,
    oracle_aggregator: &OracleAggregator,
    aggregator: &Aggregator,
){
    if (oracle_aggregator.oracles.switchboard.is_none()){
        sources.sources.insert(SWITCHBOARD_KEY,option::none());
    };
    if (oracle_aggregator.oracles.switchboard.borrow() != &object::id(aggregator)){
        err_wrong_source();
    };
    let current_price = switchboard_price_fetcher::fetch_price(coin_type.into_string(), aggregator, oracle_aggregator.price.decimals);
    sources.sources.insert(SWITCHBOARD_KEY, current_price);
}

// ** Pyth **
public(package) fun set_pyth(
    self: &mut OracleAggregator,
    new_pyth: Option<address>,
){
    self.oracles.switchboard = if(new_pyth.is_some()) option::some(new_pyth.destroy_some().to_id()) else option::none();
}

public use fun add_price_from_pyth as PriceSources.add_pyth_price;
public fun add_price_from_pyth(
    sources: &mut PriceSources,
    coin_type: TypeName,
    oracle_aggregator: &OracleAggregator,
    price_info_object: &PriceInfoObject,
    clock: &Clock,
){
    if (oracle_aggregator.oracles.pyth.is_none()){
        sources.sources.insert(PYTH_KEY,option::none());
    };
    if (oracle_aggregator.oracles.pyth.borrow() != &object::id(price_info_object)){
        err_wrong_source();
    };
    let current_price = pyth_price_fetcher::fetch_price(coin_type.into_string(), price_info_object, clock, oracle_aggregator.price.decimals, oracle_aggregator.tolerance_ms);
    sources.sources.insert(PYTH_KEY, current_price);
}

// ** Supra **
public(package) fun set_supra(
    self: &mut OracleAggregator,
    new_supra: Option<u32>,
){
    self.oracles.supra = new_supra;
}
public use fun add_price_from_supra as PriceSources.add_supra_price;
public fun add_price_from_supra(
    sources: &mut PriceSources,
    coin_type: TypeName,
    oracle_aggregator: &OracleAggregator,
    supra_holder: &OracleHolder,
    pair_id: u32,
){
    if (oracle_aggregator.oracles.supra.is_none()){
        sources.sources.insert(SUPRA_KEY,option::none());
    };
    if (oracle_aggregator.oracles.supra.borrow() != &pair_id){
        err_wrong_source();
    };
    let current_price = supra_price_fetcher::fetch_price(coin_type.into_string(), supra_holder, pair_id, oracle_aggregator.price.decimals);
    let current_price = if (current_price.is_none()){
        option::none()
    }else{
         option::some(current_price.destroy_some())
    };
   
    sources.sources.insert(SUPRA_KEY,current_price);
}

public fun update_price(
    self: &mut OracleAggregator,
    clock: &Clock,
    sources: PriceSources
){
    let mut price_vec = vector::empty<CurrentPrice>();
    let current_timestamp = clock.timestamp_ms();
    let mut oracle_sources = sources.sources;
    
    if (oracle_sources.contains(&b"pyth")){
        let (_, pyth_current_price) = oracle_sources.remove(&b"pyth");
        if (pyth_current_price.is_some()){
            let pyth_price_entity = pyth_current_price.destroy_some();
            if ((current_timestamp - pyth_price_entity.timestamp_ms()) <= self.tolerance_ms){
                price_vec.push_back(pyth_price_entity);
            };
        };
    };

    if (oracle_sources.contains(&b"switchboard")){
        let (_, switchboard_current_price) = oracle_sources.remove(&b"switchboard");
        if (switchboard_current_price.is_some()){
            let switchboard_price_entity = switchboard_current_price.destroy_some();
            if ((current_timestamp - switchboard_price_entity.timestamp_ms()) <= self.tolerance_ms){
                price_vec.push_back(switchboard_price_entity);
            };
        };
    };
    
    if (oracle_sources.contains(&b"supra")){
        let (_, supra_current_price) = oracle_sources.remove(&b"supra");
        if (supra_current_price.is_some()){
            let supra_price_entity = supra_current_price.destroy_some();
            if ((current_timestamp - supra_price_entity.timestamp_ms()) <= self.tolerance_ms){
                price_vec.push_back(supra_price_entity);
            };
        };
    };

    if (price_vec.length() == 0){
        err_no_valid_price();
    };

    let aggregator_price = if (price_vec.length() == 1){
        price_vec.borrow(0).price()
    }else if (price_vec.length() == 2){
        let price_0 = price_vec.borrow( 0).price();
        let price_1 = price_vec.borrow( 1).price();
        let avg_price = (price_0 + price_1) / 2;
        if(price_0.diff(price_1) * TOLERANCE_OF_PRICE_DIFF > avg_price){
            err_significant_price_diff();
        };
        avg_price
    }else{
        let price_0 = price_vec.borrow( 0).price();
        let price_1 = price_vec.borrow( 1).price();
        let price_2 = price_vec.borrow( 2).price();
        let avg_price = (price_0 + price_1 + price_2) / 3;

        if((price_0.diff(price_1) * TOLERANCE_OF_PRICE_DIFF > avg_price) ||
           (price_0.diff(price_2) * TOLERANCE_OF_PRICE_DIFF > avg_price) ||
           (price_1.diff(price_2) * TOLERANCE_OF_PRICE_DIFF > avg_price) 
        ){
            err_significant_price_diff();
        };
        avg_price    
    };

    self.price.price = aggregator_price;
    self.latest_update_ms = current_timestamp;
}

// === Whitelist === 
public fun update_oracle_price_with_rule<RuleT: drop>(
    self: &mut OracleAggregator,
    _: RuleT,
    clock: &Clock,
    price: u64,
) {
    if (!df::exists_(&self.id, WhitelistRule<RuleT>{})){
        err_rule_not_supported();
    };
    self.price.price = price;
    let current_time = clock.timestamp_ms();
    self.latest_update_ms = current_time;
}

public(package) fun add_rule<RuleT: drop>(
    oracle_aggregator: &mut OracleAggregator,
) {
    df::add(
        &mut oracle_aggregator.id, WhitelistRule<RuleT> {}, true,
    );
}

public(package) fun remove_rule<RuleT: drop>(
    oracle_aggregator: &mut OracleAggregator,
) {
    df::remove<WhitelistRule<RuleT>, bool>(
        &mut oracle_aggregator.id, WhitelistRule<RuleT> {},
    );
}
// === Test Functions ===
#[test_only]
use std::{
    type_name::{ Self,},
};
#[test_only]
public fun testing_new_aggregator_oracle<CoinT>(
    tolerance_ms: u64,
    ctx: &mut TxContext
): OracleAggregator{
    let coin_type = type_name::with_defining_ids<CoinT>().into_string();
    OracleAggregator{
        id: object::new(ctx),
        coin_type, 
        price: PriceInfo{
            price: 0,
            decimals: 6,
        },
        oracles: Oracles{
            pyth: option::none(),
            switchboard: option::none(),
            supra: option::none(),
        },
        tolerance_ms,
        latest_update_ms: 0,
        is_active: false,
    }
}
#[test_only]
public fun testing_add_switchboard_price(
    price_sources: &mut PriceSources,
    current_price: Option<CurrentPrice>,
){
    price_sources.sources.insert(SWITCHBOARD_KEY, current_price);
}

#[test_only]
public fun testing_add_pyth_price(
    price_sources: &mut PriceSources,
    current_price: Option<CurrentPrice>,
){
    price_sources.sources.insert(PYTH_KEY, current_price);
}

#[test_only]
public fun testing_add_supra_price(
    price_sources: &mut PriceSources,
    current_price: Option<CurrentPrice>,
){
    price_sources.sources.insert(SUPRA_KEY, current_price);
}

#[test_only]
public fun testing_new_price_info(
    price: u64,
    decimals: u8,
): PriceInfo{
    PriceInfo{
        price,
        decimals
    }
}

