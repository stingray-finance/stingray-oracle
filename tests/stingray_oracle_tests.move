#[test_only]
module stingray_oracle::stingray_oracle_tests;

// === Imports ===
use stingray_oracle::{
    stingray_oracle::{ Self, StingrayOracle, AdminCap },
    oracle_aggregator::{ Self, OracleAggregator},
    pyth_price_fetcher::{ Self },
    switchboard_price_fetcher::{ Self },
    supra_price_fetcher::{ Self },
};
use sui::{
    test_scenario::{ Self as ts , Scenario},
    clock::{ Clock },
    sui::{ SUI }
};

use std::{
    type_name::{ Self },
};
use std::debug;

// === Constants ===
const ADMIN: address = @0xA;
const USER: address = @0x123;
const PRECISION: u8 = 6;
const TOLERANCE_MS: u64 = 1_000;

fun setup(): Scenario{
    let mut scenario_value = ts::begin(ADMIN);
    let scenario = &mut scenario_value;
    
    scenario.next_tx(ADMIN);
    {
        stingray_oracle::testing_init(scenario.ctx());
    };
    scenario_value
}

fun add_new_oracle_aggregator<CoinT>(
    scenario: &mut Scenario,
){
    scenario.next_tx(ADMIN);
    {
        let admin_cap = scenario.take_from_address<AdminCap>(ADMIN);
        let mut stingray_oracle  = scenario.take_shared<StingrayOracle>();
        stingray_oracle.new_oracle_aggregator<CoinT>(&admin_cap, option::none(), option::none(), option::none(), PRECISION, TOLERANCE_MS);

        ts::return_shared(stingray_oracle);
        scenario.return_to_sender(admin_cap);
    };
}

fun update_price_by_switchboard<CoinT>(
    scenario: &mut Scenario,
    price: u64,
    decimals: u8,
    clock: &Clock,
){
    scenario.next_tx(USER);
    {
        let mut stingray_oracle  = scenario.take_shared<StingrayOracle>();
        
        let coin_type = type_name::get<CoinT>();
        let oracle_aggregator = stingray_oracle.borrow_oracle_aggregator_mut(coin_type.into_string());
        let mut price_sources = oracle_aggregator::new_price_sources(coin_type);
        let current_price = switchboard_price_fetcher::testing_fetch_price<CoinT>(price, decimals, clock.timestamp_ms(), false);
        price_sources.testing_add_switchboard_price( current_price);
        oracle_aggregator.update_price(clock, price_sources);

        ts::return_shared(stingray_oracle);
    };
}

fun update_price_by_pyth<CoinT>(
    scenario: &mut Scenario,
    price: u64,
    decimals: u8,
    clock: &Clock,
){
    scenario.next_tx(USER);
    {
        let mut stingray_oracle  = scenario.take_shared<StingrayOracle>();
        
        let coin_type = type_name::get<CoinT>();
        let oracle_aggregator = stingray_oracle.borrow_oracle_aggregator_mut(coin_type.into_string());
        let mut price_sources = oracle_aggregator::new_price_sources(coin_type);
        let current_price = pyth_price_fetcher::testing_fetch_price<CoinT>(price, decimals, clock.timestamp_ms(), false);
        price_sources.testing_add_pyth_price( current_price);
        oracle_aggregator.update_price(clock, price_sources);

        ts::return_shared(stingray_oracle);
    };
}

fun update_price_by_supra<CoinT>(
    scenario: &mut Scenario,
    price: u64,
    decimals: u8,
    clock: &Clock,
){
    scenario.next_tx(USER);
    {
        let mut stingray_oracle  = scenario.take_shared<StingrayOracle>();
        
        let coin_type = type_name::get<CoinT>();
        let oracle_aggregator = stingray_oracle.borrow_oracle_aggregator_mut(coin_type.into_string());
        let mut price_sources = oracle_aggregator::new_price_sources(coin_type);
        let current_price = supra_price_fetcher::testing_fetch_price<CoinT>(price, decimals, clock.timestamp_ms(), false);
        price_sources.testing_add_supra_price( current_price);
        oracle_aggregator.update_price(clock, price_sources);

        ts::return_shared(stingray_oracle);
    };
}

#[test]
public fun testing_update_price_by_supra(){
    let price = 40_000_000u64;
    let decimals = 6u8;
    let coin_type = type_name::get<SUI>();
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;
    add_new_oracle_aggregator<SUI>(scenario);

    let clock = scenario.take_shared<Clock>();
    update_price_by_supra<SUI>(scenario, price, decimals, &clock);
    
    scenario.next_tx(USER);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        let price_info = stingray_oracle.get_price(&clock, coin_type.into_string());
        debug::print(&price_info);

        ts::return_shared(stingray_oracle);
        ts::return_shared(clock);
    };
    ts::end(scenario_value);
}
