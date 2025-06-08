module stingray_oracle::current_price;

public struct CurrentPrice<phantom CoinT> has copy, drop {
    price: u64,
    decimals: u8,
    timestamp_ms: u64,
}


// === Public- View Functions ===
public fun price<CoinT>(
    self: &CurrentPrice<CoinT>,
):u64{
    self.price
}
public fun decimals<CoinT>(
    self: &CurrentPrice<CoinT>,
):u8{
    self.decimals
}
public fun timestamp_ms<CoinT>(
    self: &CurrentPrice<CoinT>,
):u64{
    self.timestamp_ms
}

// === Public-Package Function ===
public(package) fun new_current_price<CoinT>(
    price: u64,
    decimals: u8,
    timestamp_ms: u64 
): CurrentPrice<CoinT>{
    CurrentPrice{
        price,
        decimals,
        timestamp_ms,
    }
}
