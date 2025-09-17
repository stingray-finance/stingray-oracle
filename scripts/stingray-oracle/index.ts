export const PACKAGE_ID = "0x711bf347f4f82b6786194da3f150f72be76fa0d38d0fbe76abc8f7376207d205"; 
export const PUBLISHED_AT = "0x711bf347f4f82b6786194da3f150f72be76fa0d38d0fbe76abc8f7376207d205";
export const PKG_V1 = "0x711bf347f4f82b6786194da3f150f72be76fa0d38d0fbe76abc8f7376207d205";  

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
import { ADMIN_CAP, STINGRAY_ORACLE, SUPRA_ORACLE_HOLDER, PYTH_SUI_PRICE_INFO_OBJECT, SWITCHBOARD_SUI_AGGREGATOR, VSUI_RULE_PACKAGE_ID, VSUI_COIN_TYPE, PYTH_DEEP_PRICE_INFO_OBJECT, NAVX_COIN_TYPE, PYTH_NAVX_PRICE_INFO_OBJECT, DEEP_COIN_TYPE, CETUS_COIN_TYPE, SCOIN_RULE_PACKAGE_ID, SCALLOP_SUI_COIN_TYPE, SCALLOP_DEEP_COIN_TYPE, PYTH_WAL_PRICE_INFO_OBJECT, SUPRA_PAIR_IDS, WAL_COIN_TYPE, SCALLOP_WAL_COIN_TYPE, HASUI_RULE_PACKAGE_ID, HASUI_COIN_TYPE, SPRING_SUI_RULE_PACAKGE_ID, SPRING_SUI_COIN_TYPE, SUI_COIN_TYPE, SUI_PRICE_FEED, DEEP_PRICE_FEED, NAVX_PRICE_FEED, PYTH_CETUS_PRICE_INFO_OBJECT, CETUS_PRICE_FEED, WAL_PRICE_FEED, TLP_RULE_PACAKGE_ID, TLP_COIN_TYPE  } from "../constants";
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
    
    activate(tx, coinType, {
        self: STINGRAY_ORACLE,
        adminCap: ADMIN_CAP
    });
};

const deactivateOracle = async (tx: Transaction, coinType: string) => {
    
    deactivate(tx, coinType, {
        self: STINGRAY_ORACLE,
        adminCap: ADMIN_CAP
    });
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

        const tx = new Transaction();

        // // add sui price to oracle
        // await createNewOracleAggregator(tx, SUI_COIN_TYPE, PYTH_SUI_PRICE_INFO_OBJECT, null, SUPRA_PAIR_IDS[SUI_COIN_TYPE]);
        // await updatePriceWithSupra(tx, SUI_COIN_TYPE, SUPRA_ORACLE_HOLDER, SUPRA_PAIR_IDS[SUI_COIN_TYPE] );
        // await updatePriceWithPyth(tx, SUI_COIN_TYPE, PYTH_SUI_PRICE_INFO_OBJECT, SUI_PRICE_FEED);
        // await activateOracle(tx, SUI_COIN_TYPE);
        
        // // add vsui price to oracle
        // const vsuiRuleType = `${VSUI_RULE_PACKAGE_ID}::vsui_rule::Rule`;
        // await createNewOracleAggregator(tx, VSUI_COIN_TYPE, null, null, null);
        // await activateOracle(tx, VSUI_COIN_TYPE);
        // await addWhitelistRule(tx, VSUI_COIN_TYPE, vsuiRuleType);
        // // await removeWhitelistRule(tx, VSUI_COIN_TYPE, VSUI_COIN_TYPE);
        // // await addWhitelistRule(tx, VSUI_COIN_TYPE, VSUI_COIN_TYPE);

        // // add deep price to oracle
        // await createNewOracleAggregator(tx, DEEP_COIN_TYPE, PYTH_DEEP_PRICE_INFO_OBJECT, null, SUPRA_PAIR_IDS[DEEP_COIN_TYPE]);
        // await updatePriceWithSupra(tx, DEEP_COIN_TYPE, SUPRA_ORACLE_HOLDER, SUPRA_PAIR_IDS[DEEP_COIN_TYPE] );
        // await updatePriceWithPyth(tx, DEEP_COIN_TYPE, PYTH_DEEP_PRICE_INFO_OBJECT, DEEP_PRICE_FEED);
        // await activateOracle(tx, DEEP_COIN_TYPE);

        // // add navx price to oracle
        // await createNewOracleAggregator(tx, NAVX_COIN_TYPE, PYTH_NAVX_PRICE_INFO_OBJECT, null, SUPRA_PAIR_IDS[NAVX_COIN_TYPE]);
        // await updatePriceWithSupra(tx, NAVX_COIN_TYPE, SUPRA_ORACLE_HOLDER, SUPRA_PAIR_IDS[NAVX_COIN_TYPE] );
        // await updatePriceWithPyth(tx, NAVX_COIN_TYPE, PYTH_NAVX_PRICE_INFO_OBJECT, NAVX_PRICE_FEED);
        // await activateOracle(tx, NAVX_COIN_TYPE);

        // // add cetus price to oracle 
        // await createNewOracleAggregator(tx, CETUS_COIN_TYPE, PYTH_CETUS_PRICE_INFO_OBJECT, null, SUPRA_PAIR_IDS[CETUS_COIN_TYPE]);
        // await updatePriceWithSupra(tx, CETUS_COIN_TYPE, SUPRA_ORACLE_HOLDER, SUPRA_PAIR_IDS[CETUS_COIN_TYPE] );
        // await updatePriceWithPyth(tx, CETUS_COIN_TYPE, PYTH_CETUS_PRICE_INFO_OBJECT, CETUS_PRICE_FEED);
        // await activateOracle(tx, CETUS_COIN_TYPE);

        // // add ssui price to oracle
        // const scallopRuleType = `${SCOIN_RULE_PACKAGE_ID}::scoin_rule::Rule`;
        // await createNewOracleAggregator(tx, SCALLOP_SUI_COIN_TYPE, null, null, null);
        // await activateOracle(tx, SCALLOP_SUI_COIN_TYPE);
        // await addWhitelistRule(tx, SCALLOP_SUI_COIN_TYPE, scallopRuleType);
        // // await removeWhitelistRule(tx, SCALLOP_SUI_COIN_TYPE, scallopRuleType);

        // // add sdeep price to oracle
        // await createNewOracleAggregator(tx, SCALLOP_DEEP_COIN_TYPE, null, null, null);
        // await activateOracle(tx, SCALLOP_DEEP_COIN_TYPE);
        // await addWhitelistRule(tx, SCALLOP_DEEP_COIN_TYPE, scallopRuleType);

        // // add wal price to oracle
        // await createNewOracleAggregator(tx, WAL_COIN_TYPE, PYTH_WAL_PRICE_INFO_OBJECT, null, SUPRA_PAIR_IDS[WAL_COIN_TYPE]);
        // await updatePriceWithSupra(tx, WAL_COIN_TYPE, SUPRA_ORACLE_HOLDER, SUPRA_PAIR_IDS[WAL_COIN_TYPE] );
        // await updatePriceWithPyth(tx, WAL_COIN_TYPE, PYTH_WAL_PRICE_INFO_OBJECT, WAL_PRICE_FEED);
        // await activateOracle(tx, WAL_COIN_TYPE);

        // // add swal price to oracle
        // const sRuleType = `${SCOIN_RULE_PACKAGE_ID}::scoin_rule::Rule`;
        // await createNewOracleAggregator(tx, SCALLOP_WAL_COIN_TYPE, null, null, null);
        // await activateOracle(tx, SCALLOP_WAL_COIN_TYPE);
        // await addWhitelistRule(tx, SCALLOP_WAL_COIN_TYPE, sRuleType);

        // // add vsui price to oracle
        // const hasuiRuleType = `${HASUI_RULE_PACKAGE_ID}::hasui_rule::Rule`;
        // await createNewOracleAggregator(tx, HASUI_COIN_TYPE, null, null, null);
        // await activateOracle(tx, HASUI_COIN_TYPE);
        // await addWhitelistRule(tx, HASUI_COIN_TYPE, hasuiRuleType);
        // // await removeWhitelistRule(tx, HASUI_COIN_TYPE, HASUI_COIN_TYPE);
        // // await addWhitelistRule(tx, HASUI_COIN_TYPE, HASUI_COIN_TYPE);

        // // add ssui price to oracle
        // const ssuiRuleType = `${SPRING_SUI_RULE_PACAKGE_ID}::ssui_rule::Rule`;
        // await createNewOracleAggregator(tx, SPRING_SUI_COIN_TYPE, null, null, null);
        // await activateOracle(tx, SPRING_SUI_COIN_TYPE);
        // await addWhitelistRule(tx, SPRING_SUI_COIN_TYPE, ssuiRuleType);

        // add tlp 
        const tlpRuleType = `${TLP_RULE_PACAKGE_ID}::tlp_rule::Rule`;
        await createNewOracleAggregator(tx, TLP_COIN_TYPE, null, null, null);
        await activateOracle(tx, TLP_COIN_TYPE);
        await addWhitelistRule(tx, TLP_COIN_TYPE, tlpRuleType);


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
