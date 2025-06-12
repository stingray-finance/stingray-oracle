module stingray_oracle::current_price;

use std::type_name::{ TypeName };

public struct CurrentPrice has copy, drop {
    coin_type: TypeName,
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
): TypeName{
    self.coin_type
}

// === Public-Package Function ===
public(package) fun new_current_price(
    coin_type: TypeName,
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
