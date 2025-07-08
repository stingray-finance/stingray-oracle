module stingray_oracle::switchboard_price_fetcher;

// === Imports ===

use switchboard::{
    aggregator::{ Aggregator},
};

use stingray_oracle::{
    current_price::{Self, CurrentPrice},
};
use std::{
    ascii::{ String },
};

// === Errors ===

//=== Public-Write Functions ===

public fun fetch_price(
    coin_type: String,
    aggregator: &Aggregator,
    required_decimals: u8, 
): Option<CurrentPrice>{
    let current_result = aggregator.current_result();
    let price = current_result.result().scale_to_decimals(required_decimals) as u64;
    if (price == 0) return option::none();

    let timestamp = (current_result.timestamp_ms() as u64);
    
    option::some(current_price::new_current_price(coin_type, price, required_decimals, timestamp))
}

// === Test Functions ===
#[test_only]
use std::{
    type_name::{ Self,},
};
#[test_only]
public fun testing_fetch_price<CoinT>(
    price: u64,
    decimals: u8,
    timestamp_ms: u64,
    is_none: bool,
): Option<CurrentPrice>{
    if (is_none){
        option::none()
    }else{
        let coin_type = type_name::get<CoinT>().into_string();
        let current_price = current_price::new_current_price(coin_type, price, decimals, timestamp_ms);
        option::some(current_price)
    }
}