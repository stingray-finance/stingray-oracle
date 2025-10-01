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

use sui::{
    clock::{ Clock },
};

// === Errors ===

//=== Public-Write Functions ===

public fun fetch_price(
    coin_type: String,
    aggregator: &Aggregator,
    required_decimals: u8, 
): Option<CurrentPrice>{
    let current_result = aggregator.current_result();
    let price = (current_result.result().value() / (10u128.pow((current_result.result().dec() - required_decimals)))) as u64 ;
    assert!(current_result.result().value() != 0u128, 1111);
    if (price == 0) return option::none();

    let timestamp = (current_result.timestamp_ms() as u64);
    
    option::some(current_price::new_current_price(coin_type, price, required_decimals, timestamp))
}

// === Test Functions ===
#[test_only]
public fun testing_fetch_price<CoinT>(
    price: u64,
    decimals: u8,
    clock: &Clock,
    is_none: bool,
): Option<CurrentPrice>{
    if (is_none){
        option::none()
    }else{
        let current_price = current_price::testing_new_current_price<CoinT>( price, decimals, clock);
        option::some(current_price)
    }
}