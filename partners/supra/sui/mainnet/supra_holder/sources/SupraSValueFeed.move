module SupraOracle::SupraSValueFeed {

    use sui::object::UID;
    use std::vector;

    struct OracleHolder has key, store { id: UID }

    struct Price has drop {
        pair: u32,
        value: u128,
        decimal: u16,
        timestamp: u128,
        round: u64
    }

    public fun get_price(oracle_holder: &OracleHolder, pair: u32): (u128, u16, u128, u64) {
        abort 0
    }

    public fun get_prices(oracle_holder: &OracleHolder, pairs: vector<u32>): vector<Price> {
        abort 0
    }

    public fun extract_price(price: &Price): (u32, u128, u16, u128, u64) {
        abort 0
    }

    public fun get_derived_price(oracle_holder: &OracleHolder, pair_id1: u32, pair_id2: u32, operation: u8): (u128, u16, u64, u8) {
        abort 0
    }
}
