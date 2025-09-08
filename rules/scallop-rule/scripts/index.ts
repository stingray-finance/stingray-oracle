export const PACKAGE_ID = "0x9e59c5fdcd7c29277bfd80c348d4b2cca341b75eaedd425cc91d9e0509126ac8"; 
export const PUBLISHED_AT = "0xb9f41f6f107665ab822c95c4f09ee5a3ec1aa0148a1fcef9536c145784d69b2b";
export const PKG_V1 = "0x9e59c5fdcd7c29277bfd80c348d4b2cca341b75eaedd425cc91d9e0509126ac8";  
import {obj, pure} from "./_framework/util";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { ADMIN_CAP, CONFIG, DEEP_COIN_TYPE, DEEP_PAIR_ID, SCALLOP_DEEP_COIN_TYPE, SCALLOP_MARKET, SCALLOP_VERSION, SCALLOP_WAL_COIN_TYPE, STINGRAY_ORACLE, STINGRAY_ORACLE_PACKAGE, SUI_PAIR_ID, SUPRA_ORACLE_HOLDER, WAL_COIN_TYPE, WAL_PAIR_ID } from "./constants";
import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

const client = new SuiClient({
    url: getFullnodeUrl('mainnet')
});

const signer = Ed25519Keypair.fromSecretKey(process.env.PRIVATE_KEY!);

const addSCoinToConfigOperate = async(
    tx: Transaction,
    coinType: string,
    scoinType: string,
)=>{
    tx.moveCall({
        target: `${PUBLISHED_AT}::scoin_rule::add_scoin_pair`,
        arguments: [
            obj(tx, CONFIG),
            obj(tx, ADMIN_CAP),
        ],
        typeArguments: [
            scoinType,
            coinType,
        ]
    });
}

const removeSCoinToConfigOperate = async(
    tx: Transaction,
    coinType: string,
    scoinType: string,
)=>{
    tx.moveCall({
        target: `${PUBLISHED_AT}::scoin_rule::remove_scoin_pair`,
        arguments: [
            obj(tx, CONFIG),
            obj(tx, ADMIN_CAP),
        ],
        typeArguments: [
            scoinType,
            coinType,
        ]
    });
}

const updateSCoinPriceOperate = async(
    tx: Transaction,
    scoinType: string,
    coinType: string,
)=>{
   tx.moveCall({
    target: `${PUBLISHED_AT}::scoin_rule::update_price`,
    arguments: [
        obj(tx, CONFIG),
        obj(tx, STINGRAY_ORACLE),
        obj(tx, SCALLOP_VERSION),
        obj(tx, SCALLOP_MARKET),
        obj(tx, SUI_CLOCK_OBJECT_ID),
    ],typeArguments: [
        scoinType,
        coinType
    ]
   });
}

const updateCoinPrice = async(
    tx: Transaction,
    coinType: string,
    pairId: number
)=>{
    tx.moveCall({
        target: `${STINGRAY_ORACLE_PACKAGE}::stingray_oracle::update_price_by_supra`,
        arguments: [
            obj(tx, STINGRAY_ORACLE),
            obj(tx, SUPRA_ORACLE_HOLDER),
            pure(tx, pairId, 'u32'),
            obj(tx, SUI_CLOCK_OBJECT_ID),
        ],typeArguments: [
            coinType
        ]
    });
}

const addSCoinToConfigMain = async()=>{
    // const coinType = "0x2::sui::SUI";
    // const scoinType = "0xaafc4f740de0dd0dde642a31148fb94517087052f19afb0f7bed1dc41a50c77b::scallop_sui::SCALLOP_SUI";
    // const coinType = "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP";
    // const scoinType = "0xeb7a05a3224837c5e5503575aed0be73c091d1ce5e43aa3c3e716e0ae614608f::scallop_deep::SCALLOP_DEEP";
    const coinType = "0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59::wal::WAL";
    const scoinType = "0x622345b3f80ea5947567760eec7b9639d0582adcfd6ab9fccb85437aeda7c0d0::scallop_wal::SCALLOP_WAL";

    const tx = new Transaction();
    await addSCoinToConfigOperate(tx, coinType, scoinType);

    const res = await client.signAndExecuteTransaction({
        transaction: tx, 
        signer,
    });
    await client.waitForTransaction({
        digest: res.digest
    });

    console.log(res);
}

const removeSCoinToConfigMain = async()=>{
    const coinType = "0x2::sui::SUI";
    const scoinType = "0xaafc4f740de0dd0dde642a31148fb94517087052f19afb0f7bed1dc41a50c77b::scallop_sui::SCALLOP_SUI";
    // const coinType = "0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP";
    // const scoinType = "0xeb7a05a3224837c5e5503575aed0be73c091d1ce5e43aa3c3e716e0ae614608f::scallop_deep::SCALLOP_DEEP";

    const tx = new Transaction();
    await removeSCoinToConfigOperate(tx, coinType, scoinType);

    const res = await client.signAndExecuteTransaction({
        transaction: tx, 
        signer,
    });
    await client.waitForTransaction({
        digest: res.digest
    });

    console.log(res);
}

const updateSCoinPriceMain = async()=>{
    const coinType = WAL_COIN_TYPE;
    const scoinType = SCALLOP_WAL_COIN_TYPE;
    const pairId = WAL_PAIR_ID;

    const tx = new Transaction();
    await updateCoinPrice(tx, coinType, pairId);
    await updateSCoinPriceOperate(tx, scoinType, coinType );

    const res = await client.signAndExecuteTransaction({
        transaction: tx, 
        signer,
    });
    await client.waitForTransaction({
        digest: res.digest
    });

    console.log(res);
}

// addSCoinToConfigMain();
// removeSCoinToConfigMain();
updateSCoinPriceMain();
