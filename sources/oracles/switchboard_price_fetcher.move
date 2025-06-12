module stingray_oracle::switchboard_price_fetcher;

// === Imports ===

use switchboard::{
    aggregator::{ Aggregator},
};

use stingray_oracle::{
    current_price::{Self, CurrentPrice},
};
use std::type_name::{ TypeName };

// === Errors ===

//=== Public-Write Functions ===

public fun fetch_price(
    coin_type: TypeName,
    aggregator: &Aggregator,
    required_decimals: u8, 
): Option<CurrentPrice>{
    let current_result = aggregator.current_result();
    let price = current_result.result().scale_to_decimals(required_decimals) as u64;
    if (price == 0) return option::none();

    let timestamp = (current_result.timestamp_ms() as u64);
    
    option::some(current_price::new_current_price(coin_type, price, required_decimals, timestamp))
}