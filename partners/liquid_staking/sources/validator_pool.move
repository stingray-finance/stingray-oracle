module 0x549e8b69270defbfafd4f94e17ec44cdbdd99820b33bda2278dea3b9a32d3f55::validator_pool {
    public struct ValidatorPool has store {
        total_sui_supply: u64,
    }
    
    public fun total_sui_supply(arg0: &ValidatorPool) : u64 {
        arg0.total_sui_supply
    }
}

