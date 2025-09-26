module vsui_rule::vsui_rule;

// === Imports ===
use std::{
    type_name::{ Self },
};
use sui::{
    sui::{ SUI },
    clock::{ Clock },
};
use liquid_staking::{
    cert::{ CERT as VSUI, Metadata },
    stake_pool::{ StakePool },
};
use stingray_oracle::{
    stingray_oracle::{ StingrayOracle },
};

// === Structs ===
public struct Rule has drop {
    dummy_field: bool
}

// === Public Functions ===
public fun update_price(
    oracle: &mut StingrayOracle,
    stake_pool: &StakePool,
    metadata: &Metadata<VSUI>,
    clock: &Clock,
){
    let sui_type = type_name::with_defining_ids<SUI>().into_string();
    let price_info = oracle.get_price(clock, sui_type);
    let sui_price = price_info.price();
    let sui_decimals = price_info.decimals();

    let vsui_type = type_name::with_defining_ids<VSUI>().into_string();
    let vsui_price = stake_pool.lst_amount_to_sui_amount( metadata, sui_price);
    let vsui_oracle = oracle.borrow_oracle_aggregator_mut(vsui_type);

    let vsui_decimals = vsui_oracle.price_info().decimals();
    let vsui_price = (10u128.pow(vsui_decimals)) * (vsui_price as u128) / (10u128.pow(sui_decimals));
    
    vsui_oracle.update_oracle_price_with_rule( Rule{ dummy_field: false }, clock, (vsui_price as u64));

}

public fun check_share(
    stake_pool: &StakePool,
    metadata: &Metadata<VSUI>,
){
    let _ = stake_pool.lst_amount_to_sui_amount(metadata, 1000000000);
}

