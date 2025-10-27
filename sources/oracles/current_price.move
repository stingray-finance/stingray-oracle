module stingray_oracle::current_price;

use std::{
    ascii::{ String },
};

public struct CurrentPrice has copy, drop {
    coin_type: String,
    price: u64,
    decimals: u8,
    timestamp_ms: u64,
}


// === Public- View Functions ===
public fun price(
    self: &CurrentPrice,
):u64{
    self.price
}
public fun decimals(
    self: &CurrentPrice,
):u8{
    self.decimals
}
public fun timestamp_ms(
    self: &CurrentPrice,
):u64{
    self.timestamp_ms
}
public fun coin_type(
    self: &CurrentPrice,
): String{
    self.coin_type
}

// === Public-Package Function ===
public(package) fun new_current_price(
    coin_type: String,
    price: u64,
    decimals: u8,
    timestamp_ms: u64
): CurrentPrice{
    CurrentPrice{
        coin_type,
        price,
        decimals,
        timestamp_ms,
    }
}

// === Test Functions ===
#[test_only]
use sui::{ 
    clock::{ Self, Clock },
};

#[test_only]
public fun testing_new_current_price<CoinT>(
    price: u64,
    decimals: u8,
    clock: &Clock,
): CurrentPrice{
    let coin_type = type_name::with_defining_ids<CoinT>().into_string();
    CurrentPrice{
        coin_type,
        price,
        decimals,
        timestamp_ms: clock.timestamp_ms(),
    }
}
