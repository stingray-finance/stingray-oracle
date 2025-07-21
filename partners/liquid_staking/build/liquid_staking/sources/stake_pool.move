module 0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::stake_pool {
    
    public struct StakePool has store, key {
        id: 0x2::object::UID,
        validator_pool: 0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::validator_pool::ValidatorPool,
        accrued_reward_fees: u64,
    }
    
    public fun total_sui_supply(arg0: &StakePool) : u64 {
        0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::validator_pool::total_sui_supply(&arg0.validator_pool) - arg0.accrued_reward_fees
    }
    
    public fun lst_amount_to_sui_amount(arg0: &StakePool, arg1: &0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::Metadata<0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT>, arg2: u64) : u64 {
        let v0 = 0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::get_total_supply_value(arg1);
        assert!(v0 > 0, 30002);
        ((total_sui_supply(arg0) as u128) * (arg2 as u128) / (v0 as u128)) as u64
    }
    
    public fun sui_amount_to_lst_amount(arg0: &StakePool, arg1: &0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::Metadata<0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::CERT>, arg2: u64) : u64 {
        let v0 = total_sui_supply(arg0);
        let v1 = 0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::cert::get_total_supply_value(arg1);
        if (v0 == 0 || v1 == 0) {
            return arg2
        };
        ((v1 as u128) * (arg2 as u128) / (v0 as u128)) as u64
    }
}

