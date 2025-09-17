module tlp_rule::tlp_rule;

// === Imports ===
use std::{
    type_name::{ Self },
};
use sui::{
    clock::{ Clock },
};

use stingray_oracle::{
    stingray_oracle::{ StingrayOracle },
};

use typus_perp::{
    lp_pool:: { Self, Registry },
    tlp::{ TLP },
    admin::{ Version },
};  

// === Structs ===
public struct Rule has drop {}

// === Constants ===
const PRECISION: u64 = 1_000_000;

// === Public Functions ===
public fun update_price(
    oracle: &mut StingrayOracle,
    version: &Version,
    registry: &Registry,
    index: u64,
    clock: &Clock
){
    let (share_total_supply, tvl_usd, _, _, _ ) = lp_pool::get_pool_liquidity(version, registry, index);
    let price = (tvl_usd as u128) * (PRECISION as u128) / (share_total_supply as u128);

    let tlp_type = type_name::with_defining_ids<TLP>();

    let tlp_oracle = oracle.borrow_oracle_aggregator_mut(tlp_type.into_string());
    tlp_oracle.update_oracle_price_with_rule( Rule{}, clock, (price as u64));
}