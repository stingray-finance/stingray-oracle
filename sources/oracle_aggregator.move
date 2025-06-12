module stingray_oracle::oracle_aggregator;

// === Imports ===
use std::{
    type_name::{ TypeName },
};

use sui::{
    clock::{ Clock },
    vec_map::{ Self, VecMap },
};

use switchboard::{
    aggregator::{ Aggregator },
};

use pyth::{
    price_info::{ PriceInfoObject},
    price_identifier::{ PriceIdentifier }, 
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

// === Errors ===
const ESignificientPriceDiff: u64 = 0;
fun err_significant_price_diff(){ abort ESignificientPriceDiff }
const ENoValidPrice: u64 = 1;
fun err_no_valid_price(){ abort ENoValidPrice }

// === Constants ===
const PYTH_KEY: vector<u8> = b"pyth";
const SWITCHBOARD_KEY: vector<u8> = b"switchboard";
const SUPRA_KEY: vector<u8> = b"supra";
const TOLERANCE_OF_PRICE_DIFF: u64 = 50;

// === Structs ===
public struct OracleAggregator has store {
    coin_type: TypeName,
    price: PriceInfo,
    oracles: Oracles,
    latest_update_ms: u64,
    tolerance_ms: u64,
    is_active: bool,
}

public struct PriceInfo has store{
    price: u64,
    decimals: u8,
}

public struct Oracles has store {
    pyth: Option<ID>,
    switchboard: Option<ID>,
    supra: Option<u32>,
}

public struct PriceSources has copy, drop{
    coin_type: TypeName,
    sources: VecMap<vector<u8>, Option<CurrentPrice>>,
}

// === Public-Write Functions ===
public fun new_price_sources(
    coin_type: TypeName,
): PriceSources{
    PriceSources{
        coin_type,
        sources: vec_map::empty<vector<u8>, Option<CurrentPrice>>(),
    }
}

// === Public-View Functions ===
public fun price_info(
    self: &OracleAggregator,
):(u64, u8){
    (self.price.price, self.price.decimals)
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
    coin_type: TypeName,
    pyth: Option<address>,
    switchboard: Option<address>,
    supra: Option<u32>,
    decimals: u8,
    tolerance_ms: u64,
): OracleAggregator{
    let pyth_config = if (pyth.is_some()) option::some(pyth.destroy_some().to_id()) else option::none();
    let switchboard_config = if (switchboard.is_some()) option::some(switchboard.destroy_some().to_id()) else option::none();
    OracleAggregator{
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
        sources.sources.insert(SUPRA_KEY,option::none());
    };
    let current_price = switchboard_price_fetcher::fetch_price(coin_type, aggregator, oracle_aggregator.price.decimals);
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
    expected_price_identifier: PriceIdentifier,
    
){
    if (oracle_aggregator.oracles.pyth.is_none()){
        sources.sources.insert(SUPRA_KEY,option::none());
    };
    let current_price = pyth_price_fetcher::fetch_price(coin_type, price_info_object, clock, expected_price_identifier, oracle_aggregator.price.decimals, oracle_aggregator.tolerance_ms);
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
    let current_price = supra_price_fetcher::fetch_price(coin_type, supra_holder, pair_id, oracle_aggregator.price.decimals);
    
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
        let (_, supra_current_price) = oracle_sources.remove(&b"switchboard");
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


