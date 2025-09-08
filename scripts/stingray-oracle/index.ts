export const PACKAGE_ID = "0xe007d0aff9155276a962b8cfab25d42b6d220b3cbfd5a0b525e00e737b3e2799"; 
export const PUBLISHED_AT = "0x13a66b8420a0c6ec51f485275fcfcddefd273ab932b4b75e72c9fd8ef308c5bc";
export const PKG_V1 = "0xe007d0aff9155276a962b8cfab25d42b6d220b3cbfd5a0b525e00e737b3e2799";  

import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";

import { 
    newOracleAggregator, 
    getPrice, 
    updatePriceByPyth, 
    updatePriceBySupra, 
    updatePriceBySwitchboard,
    activate,
    deactivate,
    updateToleranceMs,
    addRule,
    removeRule
} from "./stingray-oracle/functions";
import { ADMIN_CAP, STINGRAY_ORACLE, SUPRA_ORACLE_HOLDER, PYTH_SUI_PRICE_INFO_OBJECT, SWITCHBOARD_SUI_AGGREGATOR, VSUI_RULE_PACKAGE_ID, VSUI_COIN_TYPE, PYTH_DEEP_PRICE_INFO_OBJECT, NAVX_COIN_TYPE, PYTH_NAVX_PRICE_INFO_OBJECT, DEEP_COIN_TYPE, CETUS_COIN_TYPE, SCOIN_RULE_PACKAGE_ID, SCALLOP_SUI_COIN_TYPE, SCALLOP_DEEP_COIN_TYPE, PYTH_WAL_PRICE_INFO_OBJECT, SUPRA_PAIR_IDS, WAL_COIN_TYPE, SCALLOP_WAL_COIN_TYPE, HASUI_RULE_PACKAGE_ID, HASUI_COIN_TYPE, SPRING_SUI_RULE_PACAKGE_ID, SPRING_SUI_COIN_TYPE  } from "../constants";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

const client = new SuiClient({ url: getFullnodeUrl('mainnet') });
const signer = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);

const createNewOracleAggregator = async (tx: Transaction, coinType: string, pyth: string | null, switchboard: string | null, supra: number | null) => {
    
    newOracleAggregator(tx, coinType, {
        self: STINGRAY_ORACLE,
        adminCap: ADMIN_CAP,
        pyth: pyth,        
        switchboard: switchboard,  
        supra: supra,      
        decimals: 6,       
        toleranceMs: BigInt(60000) 
    });
};

const getPriceInfo = async (tx: Transaction, coinType: string) => {
    
    getPrice(tx, {
        self: STINGRAY_ORACLE,
        clock: SUI_CLOCK_OBJECT_ID, 
        coinType: coinType
    });
};

const updatePriceWithPyth = async (tx: Transaction, coinType: string, priceInfoObject: string, priceId: string) => {    
    updatePriceByPyth(tx, coinType, {
        self: STINGRAY_ORACLE,
        priceInfoObject: priceInfoObject,
        clock: SUI_CLOCK_OBJECT_ID,
    });
};

const updatePriceWithSupra = async (tx: Transaction, coinType: string, supraHolder: string, pairId: number) => {
    
    updatePriceBySupra(tx, coinType, {
        self: STINGRAY_ORACLE,
        supraHolder: supraHolder,
        pairId: pairId,
        clock: SUI_CLOCK_OBJECT_ID
    });
};

const updatePriceWithSwitchboard = async (tx: Transaction, coinType: string, aggregator: string) => {
    
    updatePriceBySwitchboard(tx, coinType, {
        self: STINGRAY_ORACLE,
        aggregator: aggregator,
        clock: SUI_CLOCK_OBJECT_ID
    });
};

const activateOracle = async (tx: Transaction, coinType: string) => {
    
    activate(tx, coinType, STINGRAY_ORACLE);
};

const deactivateOracle = async (tx: Transaction, coinType: string) => {
    
    deactivate(tx, coinType, STINGRAY_ORACLE);
};

const updateTolerance = async(tx: Transaction, coinType: string, tolerance_ms: bigint)=>{
    updateToleranceMs(tx, coinType, {
        self: STINGRAY_ORACLE,
        newToleranceMs: tolerance_ms,
    });
}

const addWhitelistRule = async(tx: Transaction, coinType: string, ruleType: string)=>{
    addRule(tx, [coinType, ruleType], {
        self: STINGRAY_ORACLE,
        adminCap: ADMIN_CAP,
    });
}

const removeWhitelistRule = async(tx: Transaction, coinType: string, ruleType: string)=>{
    removeRule(tx, [ coinType, ruleType], {
        self: STINGRAY_ORACLE, 
        adminCap: ADMIN_CAP
    });
}


const main = async () => {
    try {
        const suiType = "0x2::sui::SUI";
        const suiPriceId = "0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744";
        // const deepType = "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP";
        const deepPriceId = "0x29bdd5248234e33bd93d3b81100b5fa32eaa5997843847e2c2cb16d7c6d9f7ff";

        
        const navxPriceId = "0x88250f854c019ef4f88a5c073d52a18bb1c6ac437033f5932cd017d24917ab46";
        const tx = new Transaction();

        // add sui price to oracle
        // await createNewOracleAggregator(tx, suiType, PYTH_SUI_PRICE_INFO_OBJECT, SWITCHBOARD_SUI_AGGREGATOR, SUI_PAIR_ID);
        // await updatePriceWithSupra(tx, suiType, SUPRA_ORACLE_HOLDER, SUI_PAIR_ID );
        // await updatePriceWithPyth(tx, suiType, PYTH_SUI_PRICE_INFO_OBJECT, suiPriceId);
        // await activateOracle(tx, suiType);
        
        // add vsui price to oracle
        // const vsuiRuleType = `${VSUI_RULE_PACKAGE_ID}::vsui_rule::Rule`;
        // await createNewOracleAggregator(tx, VSUI_COIN_TYPE, null, null, null);
        // await activateOracle(tx, VSUI_COIN_TYPE);
        // await addWhitelistRule(tx, VSUI_COIN_TYPE, vsuiRuleType);
        // await removeWhitelistRule(tx, VSUI_COIN_TYPE, VSUI_COIN_TYPE);
        // await addWhitelistRule(tx, VSUI_COIN_TYPE, VSUI_COIN_TYPE);

        // add deep price to oracle
        // await createNewOracleAggregator(tx, DEEP_COIN_TYPE, PYTH_DEEP_PRICE_INFO_OBJECT, null, DEEP_PAIR_ID);
        // await updatePriceWithSupra(tx, DEEP_COIN_TYPE, SUPRA_ORACLE_HOLDER, DEEP_PAIR_ID );
        // await updatePriceWithPyth(tx, DEEP_COIN_TYPE, PYTH_DEEP_PRICE_INFO_OBJECT, deepPriceId);
        // await activateOracle(tx, DEEP_COIN_TYPE);

        // add navx price to oracle
        // await createNewOracleAggregator(tx, NAVX_COIN_TYPE, PYTH_NAVX_PRICE_INFO_OBJECT, null, NAVX_PAIR_ID);
        // await updatePriceWithSupra(tx, NAVX_COIN_TYPE, SUPRA_ORACLE_HOLDER, NAVX_PAIR_ID );
        // await updatePriceWithPyth(tx, NAVX_COIN_TYPE, PYTH_NAVX_PRICE_INFO_OBJECT, navxPriceId);
        // await activateOracle(tx, NAVX_COIN_TYPE);

        // add cetus price to oracle 
        // await createNewOracleAggregator(tx, CETUS_COIN_TYPE, null, null, CETUS_PAIR_ID);
        // await updatePriceWithSupra(tx, CETUS_COIN_TYPE, SUPRA_ORACLE_HOLDER, CETUS_PAIR_ID );
        // await activateOracle(tx, CETUS_COIN_TYPE);

        // add ssui price to oracle
        // const sRuleType = `${SCOIN_RULE_PACKAGE_ID}::scoin_rule::Rule`;
        // console.log(sRuleType);
        // await createNewOracleAggregator(tx, SCALLOP_SUI_COIN_TYPE, null, null, null);
        // await activateOracle(tx, SCALLOP_SUI_COIN_TYPE);
        // await addWhitelistRule(tx, SCALLOP_SUI_COIN_TYPE, sRuleType);
        //await removeWhitelistRule(tx, SCALLOP_SUI_COIN_TYPE, sRuleType);

        // add sdeep price to oracle
        // const sRuleType = `${SCOIN_RULE_PACKAGE_ID}::scoin_rule::Rule`;
        // await createNewOracleAggregator(tx, SCALLOP_DEEP_COIN_TYPE, null, null, null);
        // await activateOracle(tx, SCALLOP_DEEP_COIN_TYPE);
        // await addWhitelistRule(tx, SCALLOP_DEEP_COIN_TYPE, sRuleType);

        // add wal price to oracle
        // const walPriceId = "0xeba0732395fae9dec4bae12e52760b35fc1c5671e2da8b449c9af4efe5d54341";
        // await createNewOracleAggregator(tx, WAL_COIN_TYPE, PYTH_WAL_PRICE_INFO_OBJECT, null, SUPRA_PAIR_IDS[WAL_COIN_TYPE]);
        // await updatePriceWithSupra(tx, WAL_COIN_TYPE, SUPRA_ORACLE_HOLDER, SUPRA_PAIR_IDS[WAL_COIN_TYPE] );
        // await updatePriceWithPyth(tx, WAL_COIN_TYPE, PYTH_WAL_PRICE_INFO_OBJECT, walPriceId);
        // await activateOracle(tx, WAL_COIN_TYPE);

        // add swal price to oracle
        // const sRuleType = `${SCOIN_RULE_PACKAGE_ID}::scoin_rule::Rule`;
        // await createNewOracleAggregator(tx, SCALLOP_WAL_COIN_TYPE, null, null, null);
        // await activateOracle(tx, SCALLOP_WAL_COIN_TYPE);
        // await addWhitelistRule(tx, SCALLOP_WAL_COIN_TYPE, sRuleType);

        // add vsui price to oracle
        // const hasuiRuleType = `${HASUI_RULE_PACKAGE_ID}::hasui_rule::Rule`;
        // await createNewOracleAggregator(tx, HASUI_COIN_TYPE, null, null, null);
        // await activateOracle(tx, HASUI_COIN_TYPE);
        // await addWhitelistRule(tx, HASUI_COIN_TYPE, hasuiRuleType);
        // await removeWhitelistRule(tx, HASUI_COIN_TYPE, HASUI_COIN_TYPE);
        // await addWhitelistRule(tx, HASUI_COIN_TYPE, HASUI_COIN_TYPE);

        // add ssui price to oracle
        const ssuiRuleType = `${SPRING_SUI_RULE_PACAKGE_ID}::ssui_rule::Rule`;
        await createNewOracleAggregator(tx, SPRING_SUI_COIN_TYPE, null, null, null);
        await activateOracle(tx, SPRING_SUI_COIN_TYPE);
        await addWhitelistRule(tx, SPRING_SUI_COIN_TYPE, ssuiRuleType);


        let digest = await client.signAndExecuteTransaction({
            transaction: tx,
            signer,
        });

        console.log(digest.digest);

        await client.waitForTransaction({
            digest: digest.digest
        });

    } catch (error) {
        console.error("Error:", error);
    }
};

main();
