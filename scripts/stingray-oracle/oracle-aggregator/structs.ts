import * as reified from "../../_framework/reified";
import {String} from "../../_dependencies/source/0x1/ascii/structs";
import {Option} from "../../_dependencies/source/0x1/option/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {VecMap} from "../../_dependencies/source/0x2/vec-map/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, fieldToJSON, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {CurrentPrice} from "../current-price/structs";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== PriceInfo =============================== */

export function isPriceInfo(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::oracle_aggregator::PriceInfo`; }

export interface PriceInfoFields { price: ToField<"u64">; decimals: ToField<"u8"> }

export type PriceInfoReified = Reified< PriceInfo, PriceInfoFields >;

export class PriceInfo implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::oracle_aggregator::PriceInfo`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = PriceInfo.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::oracle_aggregator::PriceInfo`; readonly $typeArgs: []; readonly $isPhantom = PriceInfo.$isPhantom;

 readonly price: ToField<"u64">; readonly decimals: ToField<"u8">

 private constructor(typeArgs: [], fields: PriceInfoFields, ) { this.$fullTypeName = composeSuiType( PriceInfo.$typeName, ...typeArgs ) as `${typeof PKG_V1}::oracle_aggregator::PriceInfo`; this.$typeArgs = typeArgs;

 this.price = fields.price;; this.decimals = fields.decimals; }

 static reified( ): PriceInfoReified { return { typeName: PriceInfo.$typeName, fullTypeName: composeSuiType( PriceInfo.$typeName, ...[] ) as `${typeof PKG_V1}::oracle_aggregator::PriceInfo`, typeArgs: [ ] as [], isPhantom: PriceInfo.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => PriceInfo.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PriceInfo.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => PriceInfo.fromBcs( data, ), bcs: PriceInfo.bcs, fromJSONField: (field: any) => PriceInfo.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => PriceInfo.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => PriceInfo.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => PriceInfo.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => PriceInfo.fetch( client, id, ), new: ( fields: PriceInfoFields, ) => { return new PriceInfo( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return PriceInfo.reified() }

 static phantom( ): PhantomReified<ToTypeStr<PriceInfo>> { return phantom(PriceInfo.reified( )); } static get p() { return PriceInfo.phantom() }

 static get bcs() { return bcs.struct("PriceInfo", {

 price: bcs.u64(), decimals: bcs.u8()

}) };

 static fromFields( fields: Record<string, any> ): PriceInfo { return PriceInfo.reified( ).new( { price: decodeFromFields("u64", fields.price), decimals: decodeFromFields("u8", fields.decimals) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): PriceInfo { if (!isPriceInfo(item.type)) { throw new Error("not a PriceInfo type");

 }

 return PriceInfo.reified( ).new( { price: decodeFromFieldsWithTypes("u64", item.fields.price), decimals: decodeFromFieldsWithTypes("u8", item.fields.decimals) } ) }

 static fromBcs( data: Uint8Array ): PriceInfo { return PriceInfo.fromFields( PriceInfo.bcs.parse(data) ) }

 toJSONField() { return {

 price: this.price.toString(),decimals: this.decimals,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): PriceInfo { return PriceInfo.reified( ).new( { price: decodeFromJSONField("u64", field.price), decimals: decodeFromJSONField("u8", field.decimals) } ) }

 static fromJSON( json: Record<string, any> ): PriceInfo { if (json.$typeName !== PriceInfo.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return PriceInfo.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): PriceInfo { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPriceInfo(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PriceInfo object`); } return PriceInfo.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): PriceInfo { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPriceInfo(data.bcs.type)) { throw new Error(`object at is not a PriceInfo object`); }

 return PriceInfo.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return PriceInfo.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<PriceInfo> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PriceInfo object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPriceInfo(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PriceInfo object`); }

 return PriceInfo.fromSuiObjectData( res.data ); }

 }

/* ============================== OracleAggregator =============================== */

export function isOracleAggregator(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::oracle_aggregator::OracleAggregator`; }

export interface OracleAggregatorFields { coinType: ToField<String>; price: ToField<PriceInfo>; oracles: ToField<Oracles>; latestUpdateMs: ToField<"u64">; toleranceMs: ToField<"u64">; isActive: ToField<"bool"> }

export type OracleAggregatorReified = Reified< OracleAggregator, OracleAggregatorFields >;

export class OracleAggregator implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::oracle_aggregator::OracleAggregator`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = OracleAggregator.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::oracle_aggregator::OracleAggregator`; readonly $typeArgs: []; readonly $isPhantom = OracleAggregator.$isPhantom;

 readonly coinType: ToField<String>; readonly price: ToField<PriceInfo>; readonly oracles: ToField<Oracles>; readonly latestUpdateMs: ToField<"u64">; readonly toleranceMs: ToField<"u64">; readonly isActive: ToField<"bool">

 private constructor(typeArgs: [], fields: OracleAggregatorFields, ) { this.$fullTypeName = composeSuiType( OracleAggregator.$typeName, ...typeArgs ) as `${typeof PKG_V1}::oracle_aggregator::OracleAggregator`; this.$typeArgs = typeArgs;

 this.coinType = fields.coinType;; this.price = fields.price;; this.oracles = fields.oracles;; this.latestUpdateMs = fields.latestUpdateMs;; this.toleranceMs = fields.toleranceMs;; this.isActive = fields.isActive; }

 static reified( ): OracleAggregatorReified { return { typeName: OracleAggregator.$typeName, fullTypeName: composeSuiType( OracleAggregator.$typeName, ...[] ) as `${typeof PKG_V1}::oracle_aggregator::OracleAggregator`, typeArgs: [ ] as [], isPhantom: OracleAggregator.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => OracleAggregator.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => OracleAggregator.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => OracleAggregator.fromBcs( data, ), bcs: OracleAggregator.bcs, fromJSONField: (field: any) => OracleAggregator.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => OracleAggregator.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => OracleAggregator.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => OracleAggregator.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => OracleAggregator.fetch( client, id, ), new: ( fields: OracleAggregatorFields, ) => { return new OracleAggregator( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return OracleAggregator.reified() }

 static phantom( ): PhantomReified<ToTypeStr<OracleAggregator>> { return phantom(OracleAggregator.reified( )); } static get p() { return OracleAggregator.phantom() }

 static get bcs() { return bcs.struct("OracleAggregator", {

 coin_type: String.bcs, price: PriceInfo.bcs, oracles: Oracles.bcs, latest_update_ms: bcs.u64(), tolerance_ms: bcs.u64(), is_active: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): OracleAggregator { return OracleAggregator.reified( ).new( { coinType: decodeFromFields(String.reified(), fields.coin_type), price: decodeFromFields(PriceInfo.reified(), fields.price), oracles: decodeFromFields(Oracles.reified(), fields.oracles), latestUpdateMs: decodeFromFields("u64", fields.latest_update_ms), toleranceMs: decodeFromFields("u64", fields.tolerance_ms), isActive: decodeFromFields("bool", fields.is_active) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): OracleAggregator { if (!isOracleAggregator(item.type)) { throw new Error("not a OracleAggregator type");

 }

 return OracleAggregator.reified( ).new( { coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type), price: decodeFromFieldsWithTypes(PriceInfo.reified(), item.fields.price), oracles: decodeFromFieldsWithTypes(Oracles.reified(), item.fields.oracles), latestUpdateMs: decodeFromFieldsWithTypes("u64", item.fields.latest_update_ms), toleranceMs: decodeFromFieldsWithTypes("u64", item.fields.tolerance_ms), isActive: decodeFromFieldsWithTypes("bool", item.fields.is_active) } ) }

 static fromBcs( data: Uint8Array ): OracleAggregator { return OracleAggregator.fromFields( OracleAggregator.bcs.parse(data) ) }

 toJSONField() { return {

 coinType: this.coinType,price: this.price.toJSONField(),oracles: this.oracles.toJSONField(),latestUpdateMs: this.latestUpdateMs.toString(),toleranceMs: this.toleranceMs.toString(),isActive: this.isActive,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): OracleAggregator { return OracleAggregator.reified( ).new( { coinType: decodeFromJSONField(String.reified(), field.coinType), price: decodeFromJSONField(PriceInfo.reified(), field.price), oracles: decodeFromJSONField(Oracles.reified(), field.oracles), latestUpdateMs: decodeFromJSONField("u64", field.latestUpdateMs), toleranceMs: decodeFromJSONField("u64", field.toleranceMs), isActive: decodeFromJSONField("bool", field.isActive) } ) }

 static fromJSON( json: Record<string, any> ): OracleAggregator { if (json.$typeName !== OracleAggregator.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return OracleAggregator.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): OracleAggregator { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isOracleAggregator(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a OracleAggregator object`); } return OracleAggregator.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): OracleAggregator { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isOracleAggregator(data.bcs.type)) { throw new Error(`object at is not a OracleAggregator object`); }

 return OracleAggregator.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return OracleAggregator.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<OracleAggregator> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching OracleAggregator object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isOracleAggregator(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a OracleAggregator object`); }

 return OracleAggregator.fromSuiObjectData( res.data ); }

 }

/* ============================== Oracles =============================== */

export function isOracles(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::oracle_aggregator::Oracles`; }

export interface OraclesFields { pyth: ToField<Option<ID>>; switchboard: ToField<Option<ID>>; supra: ToField<Option<"u32">> }

export type OraclesReified = Reified< Oracles, OraclesFields >;

export class Oracles implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::oracle_aggregator::Oracles`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Oracles.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::oracle_aggregator::Oracles`; readonly $typeArgs: []; readonly $isPhantom = Oracles.$isPhantom;

 readonly pyth: ToField<Option<ID>>; readonly switchboard: ToField<Option<ID>>; readonly supra: ToField<Option<"u32">>

 private constructor(typeArgs: [], fields: OraclesFields, ) { this.$fullTypeName = composeSuiType( Oracles.$typeName, ...typeArgs ) as `${typeof PKG_V1}::oracle_aggregator::Oracles`; this.$typeArgs = typeArgs;

 this.pyth = fields.pyth;; this.switchboard = fields.switchboard;; this.supra = fields.supra; }

 static reified( ): OraclesReified { return { typeName: Oracles.$typeName, fullTypeName: composeSuiType( Oracles.$typeName, ...[] ) as `${typeof PKG_V1}::oracle_aggregator::Oracles`, typeArgs: [ ] as [], isPhantom: Oracles.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Oracles.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Oracles.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Oracles.fromBcs( data, ), bcs: Oracles.bcs, fromJSONField: (field: any) => Oracles.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Oracles.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Oracles.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Oracles.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Oracles.fetch( client, id, ), new: ( fields: OraclesFields, ) => { return new Oracles( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Oracles.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Oracles>> { return phantom(Oracles.reified( )); } static get p() { return Oracles.phantom() }

 static get bcs() { return bcs.struct("Oracles", {

 pyth: Option.bcs(ID.bcs), switchboard: Option.bcs(ID.bcs), supra: Option.bcs(bcs.u32())

}) };

 static fromFields( fields: Record<string, any> ): Oracles { return Oracles.reified( ).new( { pyth: decodeFromFields(Option.reified(ID.reified()), fields.pyth), switchboard: decodeFromFields(Option.reified(ID.reified()), fields.switchboard), supra: decodeFromFields(Option.reified("u32"), fields.supra) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Oracles { if (!isOracles(item.type)) { throw new Error("not a Oracles type");

 }

 return Oracles.reified( ).new( { pyth: decodeFromFieldsWithTypes(Option.reified(ID.reified()), item.fields.pyth), switchboard: decodeFromFieldsWithTypes(Option.reified(ID.reified()), item.fields.switchboard), supra: decodeFromFieldsWithTypes(Option.reified("u32"), item.fields.supra) } ) }

 static fromBcs( data: Uint8Array ): Oracles { return Oracles.fromFields( Oracles.bcs.parse(data) ) }

 toJSONField() { return {

 pyth: fieldToJSON<Option<ID>>(`${Option.$typeName}<${ID.$typeName}>`, this.pyth),switchboard: fieldToJSON<Option<ID>>(`${Option.$typeName}<${ID.$typeName}>`, this.switchboard),supra: fieldToJSON<Option<"u32">>(`${Option.$typeName}<u32>`, this.supra),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Oracles { return Oracles.reified( ).new( { pyth: decodeFromJSONField(Option.reified(ID.reified()), field.pyth), switchboard: decodeFromJSONField(Option.reified(ID.reified()), field.switchboard), supra: decodeFromJSONField(Option.reified("u32"), field.supra) } ) }

 static fromJSON( json: Record<string, any> ): Oracles { if (json.$typeName !== Oracles.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Oracles.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Oracles { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isOracles(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Oracles object`); } return Oracles.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Oracles { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isOracles(data.bcs.type)) { throw new Error(`object at is not a Oracles object`); }

 return Oracles.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Oracles.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Oracles> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Oracles object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isOracles(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Oracles object`); }

 return Oracles.fromSuiObjectData( res.data ); }

 }

/* ============================== PriceSources =============================== */

export function isPriceSources(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::oracle_aggregator::PriceSources`; }

export interface PriceSourcesFields { coinType: ToField<String>; sources: ToField<VecMap<Vector<"u8">, Option<CurrentPrice>>> }

export type PriceSourcesReified = Reified< PriceSources, PriceSourcesFields >;

export class PriceSources implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::oracle_aggregator::PriceSources`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = PriceSources.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::oracle_aggregator::PriceSources`; readonly $typeArgs: []; readonly $isPhantom = PriceSources.$isPhantom;

 readonly coinType: ToField<String>; readonly sources: ToField<VecMap<Vector<"u8">, Option<CurrentPrice>>>

 private constructor(typeArgs: [], fields: PriceSourcesFields, ) { this.$fullTypeName = composeSuiType( PriceSources.$typeName, ...typeArgs ) as `${typeof PKG_V1}::oracle_aggregator::PriceSources`; this.$typeArgs = typeArgs;

 this.coinType = fields.coinType;; this.sources = fields.sources; }

 static reified( ): PriceSourcesReified { return { typeName: PriceSources.$typeName, fullTypeName: composeSuiType( PriceSources.$typeName, ...[] ) as `${typeof PKG_V1}::oracle_aggregator::PriceSources`, typeArgs: [ ] as [], isPhantom: PriceSources.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => PriceSources.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PriceSources.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => PriceSources.fromBcs( data, ), bcs: PriceSources.bcs, fromJSONField: (field: any) => PriceSources.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => PriceSources.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => PriceSources.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => PriceSources.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => PriceSources.fetch( client, id, ), new: ( fields: PriceSourcesFields, ) => { return new PriceSources( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return PriceSources.reified() }

 static phantom( ): PhantomReified<ToTypeStr<PriceSources>> { return phantom(PriceSources.reified( )); } static get p() { return PriceSources.phantom() }

 static get bcs() { return bcs.struct("PriceSources", {

 coin_type: String.bcs, sources: VecMap.bcs(bcs.vector(bcs.u8()), Option.bcs(CurrentPrice.bcs))

}) };

 static fromFields( fields: Record<string, any> ): PriceSources { return PriceSources.reified( ).new( { coinType: decodeFromFields(String.reified(), fields.coin_type), sources: decodeFromFields(VecMap.reified(reified.vector("u8"), Option.reified(CurrentPrice.reified())), fields.sources) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): PriceSources { if (!isPriceSources(item.type)) { throw new Error("not a PriceSources type");

 }

 return PriceSources.reified( ).new( { coinType: decodeFromFieldsWithTypes(String.reified(), item.fields.coin_type), sources: decodeFromFieldsWithTypes(VecMap.reified(reified.vector("u8"), Option.reified(CurrentPrice.reified())), item.fields.sources) } ) }

 static fromBcs( data: Uint8Array ): PriceSources { return PriceSources.fromFields( PriceSources.bcs.parse(data) ) }

 toJSONField() { return {

 coinType: this.coinType,sources: this.sources.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): PriceSources { return PriceSources.reified( ).new( { coinType: decodeFromJSONField(String.reified(), field.coinType), sources: decodeFromJSONField(VecMap.reified(reified.vector("u8"), Option.reified(CurrentPrice.reified())), field.sources) } ) }

 static fromJSON( json: Record<string, any> ): PriceSources { if (json.$typeName !== PriceSources.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return PriceSources.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): PriceSources { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPriceSources(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PriceSources object`); } return PriceSources.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): PriceSources { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPriceSources(data.bcs.type)) { throw new Error(`object at is not a PriceSources object`); }

 return PriceSources.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return PriceSources.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<PriceSources> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PriceSources object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPriceSources(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PriceSources object`); }

 return PriceSources.fromSuiObjectData( res.data ); }

 }
