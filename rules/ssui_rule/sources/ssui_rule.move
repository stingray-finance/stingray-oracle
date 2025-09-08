module ssui_rule::ssui_rule;

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

use spring_sui::{
    spring_sui::{ SPRING_SUI },
};

use stingray_oracle::{
    stingray_oracle::{ StingrayOracle },
};

// === Structs ===
public struct Rule has drop {}

// === Public Functions ===
public fun update_price(
    oracle: &mut StingrayOracle,
    liquid_staking_info: &LiquidStakingInfo<SPRING_SUI>,
    clock: &Clock
){
    let sui_type = type_name::with_defining_ids<SUI>().into_string();
    let price_info = oracle.get_price(clock, sui_type);
    let sui_price = price_info.price();
    let sui_decimals = price_info.decimals();
    let ssui_type = type_name::with_defining_ids<SPRING_SUI>().into_string();

    let ssui_price = lst_amount_to_sui_amount( liquid_staking_info, sui_price );
    let ssui_oracle = oracle.borrow_oracle_aggregator_mut(ssui_type);

    let ssui_decimals = ssui_oracle.price_info().decimals();
    let ssui_price = (10u128.pow(ssui_decimals)) * (ssui_price as u128) / (10u128.pow(sui_decimals));
    
    ssui_oracle.update_oracle_price_with_rule( Rule{}, clock, (ssui_price as u64));
}

fun lst_amount_to_sui_amount(
    liquid_staking_info: &LiquidStakingInfo<SPRING_SUI>,
    lst_amount: u64,
): u64{
    let total_sui_supply = liquid_staking_info.total_sui_supply();
    let total_lst_supply = liquid_staking_info.total_lst_supply();

    let sui_amount = (total_sui_supply as u128)
        * (lst_amount as u128) 
        / (total_lst_supply as u128);

    sui_amount as u64
}

