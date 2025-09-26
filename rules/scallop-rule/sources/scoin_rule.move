/// Module: scoin_rule
module scallop_rule::scoin_rule;

// Dependencies

use std::type_name::{Self, TypeName};
use sui::clock::{Clock};
use sui::vec_set::{Self, VecSet};
use stingray_oracle::stingray_oracle::{ StingrayOracle };
use scallop_rule::utils;

// Errors

const EInvalidScoinTypeInputs: u64 = 0;
fun err_invalid_scoin_type_inputs() { abort EInvalidScoinTypeInputs }

// Witness

public struct Rule has drop {}

// Objects

public struct SCoinPair has copy, drop, store {
    scoin_type: TypeName,
    coin_type: TypeName,
}

public struct Config has key {
    id: UID,
    scoin_pairs: VecSet<SCoinPair>,
}

public struct AdminCap has key, store {
    id: UID,
}

// Constructor
fun init(ctx: &mut TxContext) {
    transfer::share_object(
        Config {
            id: object::new(ctx),
            scoin_pairs: vec_set::empty(),
        }
    );
    transfer::transfer(
        AdminCap { id: object::new(ctx) },
        ctx.sender(),
    );
}

// Admin Funs

public fun add_scoin_pair<SCoinT, CoinT>(
    config: &mut Config,
    _: &AdminCap,
) {
    config.scoin_pairs.insert(
        new_scoin_pair<SCoinT, CoinT>(),
    );
}

public fun remove_scoin_pair<SCoinT, CoinT>(
    config: &mut Config,
    _: &AdminCap,
) {
    config.scoin_pairs.remove(
        &new_scoin_pair<SCoinT, CoinT>(),
    );
}

// Public Funs
public fun update_price<SCoinT, CoinT>(
    config: &Config,
    oracle: &mut StingrayOracle,
    version: &protocol::version::Version,
    market: &mut protocol::market::Market, 
    clock: &Clock,
) {
    if (!config.exists_pair<SCoinT, CoinT>()) {
        err_invalid_scoin_type_inputs();
    };
    let coin_type = type_name::with_defining_ids<CoinT>();
    let coin_price_info = oracle.get_price(clock, coin_type.into_string());
    let coin_price = coin_price_info.price();
    let coin_decimals = coin_price_info.decimals();
    let scoin_unit = utils::calc_coin_to_scoin(
        version, market, coin_type, clock, 10u64.pow(coin_decimals)
    );
    let scoin_type = type_name::with_defining_ids<SCoinT>();
    let scoin_decimals = 10u64.pow(oracle.get_decimal(scoin_type.into_string()));
    let scoin_price = (
        scoin_decimals as u128) *
        (coin_price as u128) / 
        (scoin_unit as u128);
    oracle.borrow_oracle_aggregator_mut(scoin_type.into_string()).update_oracle_price_with_rule(
        Rule {}, clock, (scoin_price as u64),
    );
}

// Getter Funs
public fun exists_pair<SCOIN, COIN>(config: &Config): bool {
    config.scoin_pairs.contains(
        &new_scoin_pair<SCOIN, COIN>(),
    )
}

// Internal Funs
fun new_scoin_pair<SCOIN, COIN>(): SCoinPair {
    SCoinPair {
        scoin_type: type_name::with_defining_ids<SCOIN>(),
        coin_type: type_name::with_defining_ids<COIN>(),
    }
}