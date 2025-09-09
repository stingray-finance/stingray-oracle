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
    clock::{ Self, Clock },
    sui::{ SUI }
};

use std::{
    type_name::{ Self, TypeName },
    debug::{ Self },
};

// === Constants ===
const ADMIN: address = @0xA;
const USER: address = @0x123;
const PRECISION: u8 = 6;
const TOLERANCE_MS: u64 = 1_000;

const PYTH_SUI_PRICE_FEED: address=  @0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744;
const SUPRA_SUI_PAIR_ID: u32 = 90;
const SWITCHBOARD_SUI_ID: address = @0x801dbc2f0053d34734814b2d6df491ce7807a725fe9a01ad74a07e9c51396c37; // just example 


// Asset
const SUI_PRICE: u64 = 3_000_000;
const SUI_DECIMALS: u8 = 6;
// === Errors ===
const ESignificientPriceDiff: u64 = 0;
const ECoinTypeNotAdded: u64 = 1;
const ENotActiveYet: u64 = 2;
const EWrongPrice: u64 = 3;
const EWrongDecimals: u64 = 4;

fun setup(): Scenario{
    let mut scenario_value = ts::begin(ADMIN);
    let scenario = &mut scenario_value;
    
    scenario.next_tx(ADMIN);
    {
        let clock = clock::create_for_testing(scenario.ctx());
        clock.share_for_testing();
        stingray_oracle::testing_init(scenario.ctx());
    };
    scenario_value
}

fun add_new_oracle_aggregator<CoinT>(
    scenario: &mut Scenario,
    pyth: Option<address>,
    supra: Option<u32>,
    switchboard: Option<address>,
){
    scenario.next_tx(ADMIN);
    {

        let admin_cap = scenario.take_from_address<AdminCap>(ADMIN);
        let mut stingray_oracle  = scenario.take_shared<StingrayOracle>();
        stingray_oracle.new_oracle_aggregator<CoinT>(&admin_cap, pyth,  switchboard, supra, PRECISION, TOLERANCE_MS, scenario.ctx());

        ts::return_shared(stingray_oracle);
        scenario.return_to_sender(admin_cap);
    };
}

fun activate<CoinT>(
    scenario: &mut Scenario,
){
    scenario.next_tx(ADMIN);
    {
        let mut stingray_oracle = scenario.take_shared<StingrayOracle>();
        let admin_cap = scenario.take_from_sender<AdminCap>();
        stingray_oracle.activate<CoinT>(&admin_cap);

        ts::return_shared(stingray_oracle);
        scenario.return_to_sender(admin_cap);

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
        stingray_oracle.testing_update_price_by_supra<CoinT>(price, decimals, clock);
        ts::return_shared(stingray_oracle);
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
        stingray_oracle.testing_update_price_by_switchboard<CoinT>(price, decimals, clock);
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
        stingray_oracle.testing_update_price_by_pyth<CoinT>(price, decimals, clock);
        ts::return_shared(stingray_oracle);
    };
}

fun update_price_by_all_oracles<CoinT>(
    scenario: &mut Scenario,
    price1: u64,
    decimals1: u8,
    price2: u64,
    decimals2: u8,
    price3: u64,
    decimals3: u8,
    clock: &Clock,
){
    scenario.next_tx(USER);
    {
        let mut stingray_oracle  = scenario.take_shared<StingrayOracle>();
        stingray_oracle.testing_update_price_by_all_oracles<CoinT>(price1, decimals1, price2, decimals2, price3, decimals3, clock);
        ts::return_shared(stingray_oracle);
    };
}

fun update_price_by_pyth_and_supra<CoinT>(
    scenario: &mut Scenario,
    price1: u64,
    decimals1: u8,
    price2: u64,
    decimals2: u8,
    clock: &Clock,
){
    scenario.next_tx(USER);
    {
        let mut stingray_oracle  = scenario.take_shared<StingrayOracle>();
        stingray_oracle.testing_update_price_by_pyth_and_supra<CoinT>(price1, decimals1, price2, decimals2, clock);
        ts::return_shared(stingray_oracle);
    };
}

fun update_price_by_pyth_and_switchboard<CoinT>(
    scenario: &mut Scenario,
    price1: u64,
    decimals1: u8,
    price2: u64,
    decimals2: u8,
    clock: &Clock,
){
    scenario.next_tx(USER);
    {
        let mut stingray_oracle  = scenario.take_shared<StingrayOracle>();
        stingray_oracle.testing_update_price_by_pyth_and_switchboard<CoinT>(price1, decimals1, price2, decimals2, clock);
        ts::return_shared(stingray_oracle);
    };
}

fun update_price_by_supra_and_switchboard<CoinT>(
    scenario: &mut Scenario,
    price1: u64,
    decimals1: u8,
    price2: u64,
    decimals2: u8,
    clock: &Clock,
){
    scenario.next_tx(USER);
    {
        let mut stingray_oracle  = scenario.take_shared<StingrayOracle>();
        stingray_oracle.testing_update_price_by_supra_and_switchboard<CoinT>(price1, decimals1, price2, decimals2, clock);
        ts::return_shared(stingray_oracle);
    };
}

#[test]
fun testing_new_sui_oracle_aggregator(){
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;
    add_new_oracle_aggregator<SUI>(scenario, option::some(PYTH_SUI_PRICE_FEED), option::some(SUPRA_SUI_PAIR_ID), option::some(SWITCHBOARD_SUI_ID));

    scenario.next_tx(ADMIN);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        let coin_type = type_name::with_defining_ids<SUI>();

        assert!(stingray_oracle.is_coin_type_added(coin_type), ECoinTypeNotAdded);

        ts::return_shared(stingray_oracle);
    };

    ts::end(scenario_value);
}

#[test]
fun testing_activate_sui_oracle_aggregator(){
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;
    add_new_oracle_aggregator<SUI>(scenario, option::some(PYTH_SUI_PRICE_FEED), option::some(SUPRA_SUI_PAIR_ID), option::some(SWITCHBOARD_SUI_ID));
    let coin_type = type_name::with_defining_ids<SUI>();
    activate<SUI>(scenario);
    
    // check 
    scenario.next_tx(ADMIN);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        let admin_cap = scenario.take_from_sender<AdminCap>();
        
        let sui_oracle_aggregator = stingray_oracle.borrow_oracle_aggregator(coin_type.into_string());
        assert!(sui_oracle_aggregator.is_active(), ENotActiveYet);

        ts::return_shared(stingray_oracle);
        scenario.return_to_sender(admin_cap);
    };

    ts::end(scenario_value);

}

#[test]
fun testing_update_sui_price_by_supra(){
    let coin_type = type_name::with_defining_ids<SUI>();
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;

    add_new_oracle_aggregator<SUI>(scenario, option::some(PYTH_SUI_PRICE_FEED), option::some(SUPRA_SUI_PAIR_ID), option::some(SWITCHBOARD_SUI_ID));
    activate<SUI>(scenario);
    let clock = scenario.take_shared<Clock>();
    update_price_by_supra<SUI>(scenario, SUI_PRICE, SUI_DECIMALS, &clock);
    
    // check 
    scenario.next_tx(USER);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        
        let price_info = stingray_oracle.get_price(&clock, coin_type.into_string());
        assert!(price_info.price() == SUI_PRICE, EWrongPrice);
        assert!(price_info.decimals() == SUI_DECIMALS, EWrongDecimals);

        ts::return_shared(stingray_oracle);
    };
    ts::return_shared(clock);
    ts::end(scenario_value);
}

#[test]
fun testing_update_sui_price_by_switchboard(){
    let coin_type = type_name::with_defining_ids<SUI>();
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;

    add_new_oracle_aggregator<SUI>(scenario, option::some(PYTH_SUI_PRICE_FEED), option::some(SUPRA_SUI_PAIR_ID), option::some(SWITCHBOARD_SUI_ID));
    activate<SUI>(scenario);
    let clock = scenario.take_shared<Clock>();
    update_price_by_switchboard<SUI>(scenario, SUI_PRICE, SUI_DECIMALS, &clock);
    
    // check 
    scenario.next_tx(USER);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        
        let price_info = stingray_oracle.get_price(&clock, coin_type.into_string());
        assert!(price_info.price() == SUI_PRICE, EWrongPrice);
        assert!(price_info.decimals() == SUI_DECIMALS, EWrongDecimals);

        ts::return_shared(stingray_oracle);
    };
    ts::return_shared(clock);
    ts::end(scenario_value);
}

#[test]
fun testing_update_sui_price_by_pyth(){
    let coin_type = type_name::with_defining_ids<SUI>();
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;

    add_new_oracle_aggregator<SUI>(scenario, option::some(PYTH_SUI_PRICE_FEED), option::some(SUPRA_SUI_PAIR_ID), option::some(SWITCHBOARD_SUI_ID));
    activate<SUI>(scenario);
    let clock = scenario.take_shared<Clock>();
    update_price_by_pyth<SUI>(scenario, SUI_PRICE, SUI_DECIMALS, &clock);
    
    // check 
    scenario.next_tx(USER);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        
        let price_info = stingray_oracle.get_price(&clock, coin_type.into_string());
        assert!(price_info.price() == SUI_PRICE, EWrongPrice);
        assert!(price_info.decimals() == SUI_DECIMALS, EWrongDecimals);

        ts::return_shared(stingray_oracle);
    };
    ts::return_shared(clock);
    ts::end(scenario_value);
}

#[test]
fun testing_update_sui_price_by_all_oracles(){
    let price1 = SUI_PRICE;
    let decimals1 =  SUI_DECIMALS;
    let price2 = price1 + 1000;
    let decimals2 =  decimals1;
    let price3 = price1 + 1000;
    let decimals3 =  SUI_DECIMALS;

    let coin_type = type_name::with_defining_ids<SUI>();
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;

    add_new_oracle_aggregator<SUI>(scenario, option::some(PYTH_SUI_PRICE_FEED), option::some(SUPRA_SUI_PAIR_ID), option::some(SWITCHBOARD_SUI_ID));
    activate<SUI>(scenario);
    let clock = scenario.take_shared<Clock>();
    update_price_by_all_oracles<SUI>(scenario, price1, decimals1, price2, decimals2, price3, decimals3, &clock);
    
    // check 
    scenario.next_tx(USER);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        
        let price_info = stingray_oracle.get_price(&clock, coin_type.into_string());
        assert!(price_info.price() ==  (price1 + price2 + price3 ) / 3 , EWrongPrice);

        ts::return_shared(stingray_oracle);
    };
    ts::return_shared(clock);
    ts::end(scenario_value);
}

#[test]
#[expected_failure(abort_code = 0, location = oracle_aggregator)] // ESignificientPriceDiff
fun testing_update_sui_price_by_all_oracles_one_difference_too_large(){
    let price1 = SUI_PRICE;
    let decimals1 =  SUI_DECIMALS;
    let price2 = price1 + 1_000;
    let decimals2 =  decimals1;
    let price3 = price1 + 1_000_000;
    let decimals3 =  SUI_DECIMALS;

    let coin_type = type_name::with_defining_ids<SUI>();
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;

    add_new_oracle_aggregator<SUI>(scenario, option::some(PYTH_SUI_PRICE_FEED), option::some(SUPRA_SUI_PAIR_ID), option::some(SWITCHBOARD_SUI_ID));
    activate<SUI>(scenario);
    let clock = scenario.take_shared<Clock>();
    update_price_by_all_oracles<SUI>(scenario, price1, decimals1, price2, decimals2, price3, decimals3, &clock);
    
    // check 
    scenario.next_tx(USER);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        
        let price_info = stingray_oracle.get_price(&clock, coin_type.into_string());
        assert!(price_info.price() ==  (price1 + price2 ) / 2 , EWrongPrice);

        ts::return_shared(stingray_oracle);
    };
    ts::return_shared(clock);
    ts::end(scenario_value);
}

#[test]
fun testing_update_sui_price_by_pyth_and_supra(){
    let price1 = SUI_PRICE;
    let decimals1 =  SUI_DECIMALS;
    let price2 = price1 + 1000;
    let decimals2 =  decimals1;

    let coin_type = type_name::with_defining_ids<SUI>();
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;

    add_new_oracle_aggregator<SUI>(scenario, option::some(PYTH_SUI_PRICE_FEED), option::some(SUPRA_SUI_PAIR_ID), option::some(SWITCHBOARD_SUI_ID));
    activate<SUI>(scenario);
    let clock = scenario.take_shared<Clock>();
    update_price_by_pyth_and_supra<SUI>(scenario, price1, decimals1, price2, decimals2, &clock);
    
    // check 
    scenario.next_tx(USER);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        
        let price_info = stingray_oracle.get_price(&clock, coin_type.into_string());
        assert!(price_info.price() ==  (price1 + price2 ) / 2 , EWrongPrice);

        ts::return_shared(stingray_oracle);
    };
    ts::return_shared(clock);
    ts::end(scenario_value);
}

#[test]
fun testing_update_sui_price_by_pyth_and_switchboard(){
    let price1 = SUI_PRICE;
    let decimals1 =  SUI_DECIMALS;
    let price2 = price1 + 1000;
    let decimals2 =  decimals1;

    let coin_type = type_name::with_defining_ids<SUI>();
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;

    add_new_oracle_aggregator<SUI>(scenario, option::some(PYTH_SUI_PRICE_FEED), option::some(SUPRA_SUI_PAIR_ID), option::some(SWITCHBOARD_SUI_ID));
    activate<SUI>(scenario);
    let clock = scenario.take_shared<Clock>();
    update_price_by_pyth_and_switchboard<SUI>(scenario, price1, decimals1, price2, decimals2, &clock);
    
    // check 
    scenario.next_tx(USER);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        
        let price_info = stingray_oracle.get_price(&clock, coin_type.into_string());
        assert!(price_info.price() ==  (price1 + price2 ) / 2 , EWrongPrice);

        ts::return_shared(stingray_oracle);
    };
    ts::return_shared(clock);
    ts::end(scenario_value);
}

#[test]
fun testing_update_sui_price_by_supra_and_swithboard(){
    let price1 = SUI_PRICE;
    let decimals1 =  SUI_DECIMALS;
    let price2 = price1 + 1000;
    let decimals2 =  decimals1;

    let coin_type = type_name::with_defining_ids<SUI>();
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;

    add_new_oracle_aggregator<SUI>(scenario, option::some(PYTH_SUI_PRICE_FEED), option::some(SUPRA_SUI_PAIR_ID), option::some(SWITCHBOARD_SUI_ID));
    activate<SUI>(scenario);
    let clock = scenario.take_shared<Clock>();
    update_price_by_supra_and_switchboard<SUI>(scenario, price1, decimals1, price2, decimals2, &clock);
    
    // check 
    scenario.next_tx(USER);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        
        let price_info = stingray_oracle.get_price(&clock, coin_type.into_string());
        assert!(price_info.price() ==  (price1 + price2 ) / 2 , EWrongPrice);

        ts::return_shared(stingray_oracle);
    };
    ts::return_shared(clock);
    ts::end(scenario_value);
}

#[test]
#[expected_failure( abort_code = 0, location = stingray_oracle)] //EPriceExpired
fun testing_get_price(){
    let price1 = SUI_PRICE;
    let decimals1 =  SUI_DECIMALS;
    let price2 = price1 + 1_000;
    let decimals2 =  decimals1;
    let price3 = price1 + 1_000;
    let decimals3 =  SUI_DECIMALS;

    let coin_type = type_name::with_defining_ids<SUI>();
    let mut scenario_value = setup();
    let scenario = &mut scenario_value;

    add_new_oracle_aggregator<SUI>(scenario, option::some(PYTH_SUI_PRICE_FEED), option::some(SUPRA_SUI_PAIR_ID), option::some(SWITCHBOARD_SUI_ID));
    activate<SUI>(scenario);
    let mut clock = scenario.take_shared<Clock>();
    update_price_by_all_oracles<SUI>(scenario, price1, decimals1, price2, decimals2, price3, decimals3, &clock);

    clock.increment_for_testing(1001);
    scenario.next_tx(USER);
    {
        let stingray_oracle = scenario.take_shared<StingrayOracle>();
        stingray_oracle.get_price(&clock, coin_type.into_string());
        ts::return_shared(stingray_oracle);
    };

    ts::return_shared(clock);
    ts::end(scenario_value);
}
