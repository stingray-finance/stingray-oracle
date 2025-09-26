module hasui_rule::hasui_rule;

// === Imports ===
use std::{
    type_name::{ Self },
};
use sui::{
    sui::{ SUI },
    clock::{ Clock },
};
use haedal::{
    staking::{ Staking },
    hasui::{ HASUI },
};
use stingray_oracle::{
    stingray_oracle::{ StingrayOracle },
};

// === Structs ===
public struct Rule has drop {}

// === Constants ===
const PRECISION: u64 = 1_000_000;

// === Public Functions ===
public fun update_price(
    oracle: &mut StingrayOracle,
    staking: &Staking,
    clock: &Clock
){
    let sui_type = type_name::with_defining_ids<SUI>().into_string();
    let price_info = oracle.get_price(clock, sui_type);
    let sui_price = price_info.price();
    let sui_decimals = price_info.decimals();

    let hasui_type = type_name::with_defining_ids<HASUI>().into_string();
    let exchange_rate = staking.get_exchange_rate(); // hasui_price / sui_price
    let hasui_oracle = oracle.borrow_oracle_aggregator_mut(hasui_type);
    let hasui_price_raw = sui_price * exchange_rate / PRECISION;
    let hasui_decimals = hasui_oracle.price_info().decimals();
    let hasui_price = (10u128.pow(hasui_decimals)) * (hasui_price_raw as u128) / (10u128.pow(sui_decimals));
    
    hasui_oracle.update_oracle_price_with_rule( Rule{}, clock, (hasui_price as u64));

}

