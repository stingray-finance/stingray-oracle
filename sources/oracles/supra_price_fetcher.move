module stingray_oracle::supra_price_fetcher;

// === Imports ===

use SupraOracle::{
    SupraSValueFeed::{get_price, OracleHolder},
};
use stingray_oracle::{
    current_price::{Self, CurrentPrice},
};


public fun fetch_price<CoinT>(
    supra_holder: &OracleHolder,
    pair_id: u32,
    required_decimals: u8,
): Option<CurrentPrice<CoinT>>{
    let (price_u128, decimal_u16, timestamp_u128, _) = get_price(supra_holder, pair_id);
    let decimal_u8 = (decimal_u16 as u8);

    let mut price = (price_u128 as u64);
    let timestamp = (timestamp_u128 as u64);

    if (decimal_u8 > required_decimals) {
        price = price / 10u64.pow(decimal_u8 - required_decimals);
    } else {
        price = price * 10u64.pow(required_decimals - decimal_u8);
    };

    option::some(current_price::new_current_price(price, required_decimals, timestamp))

}