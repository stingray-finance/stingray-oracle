module stingray_oracle::stingray_oracle;

// === Imports ===
use sui::{
    vec_set::{ Self, VecSet},
    clock::{ Clock },
    dynamic_field::{ Self as df},
};

use std::{
    ascii::{ String },
    type_name::{ Self, TypeName },
};

use stingray_oracle::{
    oracle_aggregator::{ Self, OracleAggregator, PriceInfo },
};
use switchboard::{
    aggregator::{ Aggregator },
};
use pyth::{
    price_info::{ PriceInfoObject },
};
use SupraOracle::{
    SupraSValueFeed::{ OracleHolder },
};

// === Errors ===
const EPriceExpired: u64 = 0;
fun err_price_expired() { abort EPriceExpired }
const EAssetAlreadyExisted: u64 = 1;
fun err_asset_already_existed(){ abort EAssetAlreadyExisted }
const EOracleAggregatorNotActive: u64 = 2;
fun err_oracle_aggregator_not_active(){ abort EOracleAggregatorNotActive } 
const EVersionNotExisted: u64 = 3;
fun err_version_not_existed(){ abort EVersionNotExisted }
const EVersionAlreadyExisted: u64 = 4;
fun err_version_already_existed(){ abort EVersionAlreadyExisted }
const EVersionNotAllowed: u64 = 5;
fun err_version_not_allowed(){ abort EVersionNotAllowed }
// === Consts ===
const VERSION: u64 =1;

public struct AdminCap has key, store {
    id: UID,
}

public struct StingrayOracle has key{
    id: UID,
    versions: VecSet<u64>,
    asset_types: VecSet<String>, // type string
}

// === Init Functions ===
fun init(ctx: &mut TxContext){
    let (stingray_oracle, admin_cap) = new_oracle(ctx);
    transfer::share_object(stingray_oracle);
    transfer::public_transfer(admin_cap, ctx.sender());
}
// === Public Functions ===
public fun add_version(
    self: &mut StingrayOracle,
    _: &AdminCap,
    new_version: u64,
){
    if (self.versions.contains(&new_version)){
        err_version_already_existed();
    };
    self.versions.insert(new_version);
}

public fun remove_version(
    self: &mut StingrayOracle,
    _: &AdminCap,
    to_remove_version: u64,
){
    if (!self.versions.contains(    &to_remove_version)){
        err_version_not_existed();
    };
    self.versions.remove(&to_remove_version);
}

public fun new_oracle_aggregator<CoinT>(
    self: &mut StingrayOracle,
    _: &AdminCap,
    pyth: Option<address>,
    switchboard: Option<address>,
    supra: Option<u32>,
    decimals: u8,
    tolerance_ms: u64,
    ctx: &mut TxContext,
){
    let oracle_aggregator = oracle_aggregator::new(type_name::get<CoinT>().into_string(), pyth, switchboard, supra, decimals, tolerance_ms, ctx);
    let key = type_name::get<CoinT>();
    if (df::exists_(&self.id, key)){
        err_asset_already_existed();
    };
    self.asset_types.insert(key.into_string());
    df::add(&mut self.id, key.into_string(), oracle_aggregator);
}

public fun update_tolerance_ms<CoinT>(
    self: &mut StingrayOracle,
    new_tolerance_ms: u64,
){
    let coin_type = type_name::get<CoinT>().into_string();
    let oracle_aggregator = self.borrow_oracle_aggregator_mut(coin_type);
    oracle_aggregator.update_tolerance_ms(new_tolerance_ms);
}

public fun deactivate<CoinT>(
    self: &mut StingrayOracle,
){
    let coin_type = type_name::get<CoinT>().into_string();
    let oracle_aggregator = self.borrow_oracle_aggregator_mut(coin_type);
    oracle_aggregator.deactive();
}

public fun activate<CoinT>(
    self: &mut StingrayOracle,
){
    let coin_type = type_name::get<CoinT>().into_string();
    let oracle_aggregator = self.borrow_oracle_aggregator_mut(coin_type);
    oracle_aggregator.active();
}

public fun update_pyth<CoinT>(
    self: &mut StingrayOracle,
    _: &AdminCap,
    new_pyth: Option<address>,
){
    let coin_type = type_name::get<CoinT>().into_string();
    let oracle_aggregator = self.borrow_oracle_aggregator_mut(coin_type);
    oracle_aggregator.set_pyth(new_pyth);
}

public fun update_switchboard<CoinT>(
    self: &mut StingrayOracle,
    _: &AdminCap,
    new_switchboard: Option<address>,
){
    let coin_type = type_name::get<CoinT>().into_string();
    let oracle_aggregator = self.borrow_oracle_aggregator_mut(coin_type);
    oracle_aggregator.set_switchboard(new_switchboard);
}

public fun update_supra<CoinT>(
    self: &mut StingrayOracle,
    _: &AdminCap,
    new_supra: Option<u32>,
){
    let coin_type = type_name::get<CoinT>().into_string();
    let oracle_aggregator = self.borrow_oracle_aggregator_mut(coin_type);
    oracle_aggregator.set_supra(new_supra);
}

public fun borrow_oracle_aggregator(
    self: &StingrayOracle,
    coin_type: String,
): &OracleAggregator{
    
    if (!self.is_version_allowed()){
        err_version_not_allowed();
    };
    
    let oracle_aggregator = df::borrow<String, OracleAggregator>(&self.id, coin_type);
    
    oracle_aggregator
}

public fun borrow_oracle_aggregator_mut(
    self: &mut StingrayOracle,
    coin_type: String,
): &mut OracleAggregator{
    
    if (!self.is_version_allowed()){
        err_version_not_allowed();
    };
    let oracle_aggregator = df::borrow_mut<String, OracleAggregator>(&mut self.id, coin_type);
    
    oracle_aggregator
}

public fun update_price_by_switchboard<CoinT>(
    self: &mut StingrayOracle,
    aggregator: &Aggregator,
    clock: &Clock,
){
    let coin_type = type_name::get<CoinT>();
    let oracle_aggregator = self.borrow_oracle_aggregator_mut(coin_type.into_string());
    let mut price_sources = oracle_aggregator::new_price_sources(coin_type);
    price_sources.add_switchboard_price(coin_type,  oracle_aggregator, aggregator);
    oracle_aggregator.update_price(clock, price_sources);
}

public fun update_price_by_pyth<CoinT>(
    self: &mut StingrayOracle,
    price_info_object: &PriceInfoObject,
    clock: &Clock,
){
    let coin_type = type_name::get<CoinT>();
    let oracle_aggregator = self.borrow_oracle_aggregator_mut(coin_type.into_string());
    let mut price_sources = oracle_aggregator::new_price_sources(coin_type);
    price_sources.add_pyth_price(coin_type, oracle_aggregator, price_info_object, clock);
    oracle_aggregator.update_price(clock, price_sources);
}

public fun update_price_by_supra<CoinT>(
    self: &mut StingrayOracle,
    supra_holder: &OracleHolder,
    pair_id: u32,
    clock: &Clock,
){
    let coin_type = type_name::get<CoinT>();
    let oracle_aggregator = self.borrow_oracle_aggregator_mut(coin_type.into_string());
    let mut price_sources = oracle_aggregator::new_price_sources(coin_type);
    price_sources.add_supra_price(coin_type, oracle_aggregator, supra_holder, pair_id);
    oracle_aggregator.update_price(clock, price_sources);
}

// === Whitelist == 
public fun add_rule<CoinT, RuleT: drop>(
    self: &mut StingrayOracle,
    _: &AdminCap,
){
    let coin_type = type_name::get<CoinT>().into_string();
    let oracle_aggregator = self.borrow_oracle_aggregator_mut(coin_type);
    oracle_aggregator.add_rule<RuleT>();
}

public fun remove_rule<CoinT, RuleT: drop>(
    self: &mut StingrayOracle,
    _: &AdminCap,
){
    let coin_type = type_name::get<CoinT>().into_string();
    let oracle_aggregator = self.borrow_oracle_aggregator_mut(coin_type);
    oracle_aggregator.remove_rule<RuleT>();
}

// === Public-View Functions ===
public fun is_version_allowed(
    self: &StingrayOracle,
): bool{
    let pkg_version = VERSION;
    self.versions.contains(&pkg_version)
}

public fun get_price(
    self: &StingrayOracle,
    clock: &Clock,
    coin_type: String,
): PriceInfo{
    
    let oracle_aggregator =self.borrow_oracle_aggregator(coin_type);

    if(!oracle_aggregator.is_active()){ 
        err_oracle_aggregator_not_active();
    };

    if (clock.timestamp_ms() - oracle_aggregator.latest_update_ms() > oracle_aggregator.tolerance_ms()){
        err_price_expired();
    };
    oracle_aggregator.price_info()
}

public fun get_decimal(
    self: &StingrayOracle,
    coin_type: String,
): u8{
    let oracle_aggregator =self.borrow_oracle_aggregator(coin_type);
    oracle_aggregator.price_info().decimals()
}

public fun is_price_supported(
    self: &StingrayOracle,
    coin_type: TypeName,
): bool{
    if (self.asset_types.contains(&coin_type.into_string())){
        df::borrow<TypeName, OracleAggregator>(&self.id, coin_type).is_active()
    }else{
        false
    }    
}

// === Private Functions ===
fun new_oracle(
    ctx: &mut TxContext,
):(StingrayOracle, AdminCap){
    let stingray_oracle = StingrayOracle{
        id: object::new(ctx),
        versions: vec_set::singleton(VERSION),
        asset_types: vec_set::empty(),
    };

    let admin_cap = AdminCap{
        id: object::new(ctx),
    };

    (stingray_oracle, admin_cap)
}

// === Test Functions ===
#[test_only]
public fun testing_init(ctx: &mut TxContext){
    init(ctx);
}
