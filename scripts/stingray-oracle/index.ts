export const PACKAGE_ID = "0xae407da0a7721a991faab902372505c1cec368777086bfd4bc8202645a6cb9fd"; 
export const PUBLISHED_AT = "0xae407da0a7721a991faab902372505c1cec368777086bfd4bc8202645a6cb9fd";
export const PKG_V1 = "0xae407da0a7721a991faab902372505c1cec368777086bfd4bc8202645a6cb9fd";  

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
import { ADMIN_CAP, STINGRAY_ORACLE, SUI_PAIR_ID, SUPRA_ORACLE_HOLDER, PYTH_SUI_PRICE_INFO_OBJECT, SWITCHBOARD_SUI_AGGREGATOR, VSUI_RULE_PACKAGE_ID, VSUI_COIN_TYPE  } from "../constants";
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
        const coinType = "0x2::sui::SUI";
        const sui_price_id = "0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744";
        
        const tx = new Transaction();
        await createNewOracleAggregator(tx, coinType, PYTH_SUI_PRICE_INFO_OBJECT, SWITCHBOARD_SUI_AGGREGATOR, SUI_PAIR_ID);
        await updatePriceWithSupra(tx, coinType, SUPRA_ORACLE_HOLDER, SUI_PAIR_ID );
        await updatePriceWithPyth(tx, coinType, PYTH_SUI_PRICE_INFO_OBJECT, sui_price_id);
        // await updatePriceWithSwitchboard(tx, coinType, SWITCHBOARD_SUI_AGGREGATOR);
        await activateOracle(tx, coinType);
        // let new_tolerance: bigint = BigInt(10000000);
        // await updateTolerance(tx, coinType, new_tolerance);
        
        const vsuiRuleType = `${VSUI_RULE_PACKAGE_ID}::vsui_rule::Rule`;
        await createNewOracleAggregator(tx, VSUI_COIN_TYPE, null, null, null);
        await activateOracle(tx, VSUI_COIN_TYPE);
        await addWhitelistRule(tx, VSUI_COIN_TYPE, vsuiRuleType);
        // await removeWhitelistRule(tx, VSUI_COIN_TYPE, VSUI_COIN_TYPE);
        // await addWhitelistRule(tx, VSUI_COIN_TYPE, VSUI_COIN_TYPE);

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
