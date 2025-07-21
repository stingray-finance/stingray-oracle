module stingray_oracle::pyth_price_fetcher;

// === Imports ===
use std::{ 
    ascii::{ String },
};

use sui::{
    clock::{ Clock },
};
use pyth::{
    price::{ Self },
    pyth::{ Self },
    price_info::{ PriceInfoObject },
    i64::{ Self },
};
use stingray_oracle::{
    current_price::{ Self, CurrentPrice },
};


// === Constants ===

public fun fetch_price(
    coin_type: String,
    price_info_object: &PriceInfoObject,
    clock: &Clock,
    required_decimals: u8, 
    tolerance_ms: u64,
): Option<CurrentPrice>{
    let price_struct = pyth::get_price_no_older_than(price_info_object, clock, tolerance_ms);    

    let decimal_i64 = price::get_expo(&price_struct);
    let price_i64 = price::get_price(&price_struct);
    let timestamp_sec = price::get_timestamp(&price_struct);
   
    let decimal_u8 = (i64::get_magnitude_if_negative(&decimal_i64) as u8);
    let mut price = (i64::get_magnitude_if_positive(&price_i64));

    let timestamp = timestamp_sec * 1000;

    if (decimal_u8 > required_decimals) {
        price = price / 10u64.pow(decimal_u8 - required_decimals);
    } else {
        price = price * 10u64.pow(required_decimals - decimal_u8);
    };

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