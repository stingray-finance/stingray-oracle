module xsui_rule::xsui_rule;

// === Imports ===
use std::{
    type_name::{ Self },
};
use sui::{
    sui::{ SUI },
    clock::{ Clock },
};

use liquid_staking::{
    liquid_staking::{ LiquidStakingInfo },
};

use xsui::{
    x_sui::{ X_SUI },
};

use stingray_oracle::{
    stingray_oracle::{ StingrayOracle },
};

// === Structs ===
public struct Rule has drop {}

// === Public Functions ===
public fun update_price(
    oracle: &mut StingrayOracle,
    liquid_staking_info: &LiquidStakingInfo<X_SUI>,
    clock: &Clock
){
    let sui_type = type_name::with_defining_ids<SUI>().into_string();
    let price_info = oracle.get_price(clock, sui_type);
    let sui_price = price_info.price();
    let sui_decimals = price_info.decimals();
    let xsui_type = type_name::with_defining_ids<X_SUI>().into_string();

    let xsui_price = lst_amount_to_sui_amount( liquid_staking_info, sui_price );
    let xsui_oracle = oracle.borrow_oracle_aggregator_mut(xsui_type);

    let xsui_decimals = xsui_oracle.price_info().decimals();
    let xsui_price = (10u128.pow(xsui_decimals)) * (xsui_price as u128) / (10u128.pow(sui_decimals));
    
    xsui_oracle.update_oracle_price_with_rule( Rule{}, clock, (xsui_price as u64));
}

fun lst_amount_to_sui_amount(
    liquid_staking_info: &LiquidStakingInfo<X_SUI>,
    lst_amount: u64,
): u64{
    let total_sui_supply = liquid_staking_info.total_sui_supply();
    let total_lst_supply = liquid_staking_info.total_lst_supply();

    let sui_amount = (total_sui_supply as u128)
        * (lst_amount as u128) 
        / (total_lst_supply as u128);

    sui_amount as u64
}

