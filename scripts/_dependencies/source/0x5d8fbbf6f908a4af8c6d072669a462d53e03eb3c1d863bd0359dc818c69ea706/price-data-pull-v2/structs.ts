import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../../../_framework/util";
import {PKG_V3} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== PriceData =============================== */

export function isPriceData(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V3}::price_data_pull_v2::PriceData`; }

export interface PriceDataFields { dummyField: ToField<"bool"> }

export type PriceDataReified = Reified< PriceData, PriceDataFields >;

export class PriceData implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V3}::price_data_pull_v2::PriceData`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = PriceData.$typeName; readonly $fullTypeName: `${typeof PKG_V3}::price_data_pull_v2::PriceData`; readonly $typeArgs: []; readonly $isPhantom = PriceData.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: PriceDataFields, ) { this.$fullTypeName = composeSuiType( PriceData.$typeName, ...typeArgs ) as `${typeof PKG_V3}::price_data_pull_v2::PriceData`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): PriceDataReified { return { typeName: PriceData.$typeName, fullTypeName: composeSuiType( PriceData.$typeName, ...[] ) as `${typeof PKG_V3}::price_data_pull_v2::PriceData`, typeArgs: [ ] as [], isPhantom: PriceData.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => PriceData.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PriceData.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => PriceData.fromBcs( data, ), bcs: PriceData.bcs, fromJSONField: (field: any) => PriceData.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => PriceData.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => PriceData.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => PriceData.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => PriceData.fetch( client, id, ), new: ( fields: PriceDataFields, ) => { return new PriceData( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return PriceData.reified() }

 static phantom( ): PhantomReified<ToTypeStr<PriceData>> { return phantom(PriceData.reified( )); } static get p() { return PriceData.phantom() }

 static get bcs() { return bcs.struct("PriceData", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): PriceData { return PriceData.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): PriceData { if (!isPriceData(item.type)) { throw new Error("not a PriceData type");

 }

 return PriceData.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): PriceData { return PriceData.fromFields( PriceData.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): PriceData { return PriceData.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): PriceData { if (json.$typeName !== PriceData.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return PriceData.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): PriceData { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPriceData(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PriceData object`); } return PriceData.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): PriceData { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPriceData(data.bcs.type)) { throw new Error(`object at is not a PriceData object`); }

 return PriceData.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return PriceData.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<PriceData> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PriceData object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPriceData(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PriceData object`); }

 return PriceData.fromSuiObjectData( res.data ); }

 }

/* ============================== MerkleRootHash =============================== */

export function isMerkleRootHash(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V3}::price_data_pull_v2::MerkleRootHash`; }

export interface MerkleRootHashFields { dummyField: ToField<"bool"> }

export type MerkleRootHashReified = Reified< MerkleRootHash, MerkleRootHashFields >;

export class MerkleRootHash implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V3}::price_data_pull_v2::MerkleRootHash`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = MerkleRootHash.$typeName; readonly $fullTypeName: `${typeof PKG_V3}::price_data_pull_v2::MerkleRootHash`; readonly $typeArgs: []; readonly $isPhantom = MerkleRootHash.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: MerkleRootHashFields, ) { this.$fullTypeName = composeSuiType( MerkleRootHash.$typeName, ...typeArgs ) as `${typeof PKG_V3}::price_data_pull_v2::MerkleRootHash`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): MerkleRootHashReified { return { typeName: MerkleRootHash.$typeName, fullTypeName: composeSuiType( MerkleRootHash.$typeName, ...[] ) as `${typeof PKG_V3}::price_data_pull_v2::MerkleRootHash`, typeArgs: [ ] as [], isPhantom: MerkleRootHash.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => MerkleRootHash.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MerkleRootHash.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => MerkleRootHash.fromBcs( data, ), bcs: MerkleRootHash.bcs, fromJSONField: (field: any) => MerkleRootHash.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => MerkleRootHash.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => MerkleRootHash.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => MerkleRootHash.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => MerkleRootHash.fetch( client, id, ), new: ( fields: MerkleRootHashFields, ) => { return new MerkleRootHash( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return MerkleRootHash.reified() }

 static phantom( ): PhantomReified<ToTypeStr<MerkleRootHash>> { return phantom(MerkleRootHash.reified( )); } static get p() { return MerkleRootHash.phantom() }

 static get bcs() { return bcs.struct("MerkleRootHash", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): MerkleRootHash { return MerkleRootHash.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): MerkleRootHash { if (!isMerkleRootHash(item.type)) { throw new Error("not a MerkleRootHash type");

 }

 return MerkleRootHash.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): MerkleRootHash { return MerkleRootHash.fromFields( MerkleRootHash.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): MerkleRootHash { return MerkleRootHash.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): MerkleRootHash { if (json.$typeName !== MerkleRootHash.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return MerkleRootHash.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): MerkleRootHash { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMerkleRootHash(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MerkleRootHash object`); } return MerkleRootHash.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): MerkleRootHash { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMerkleRootHash(data.bcs.type)) { throw new Error(`object at is not a MerkleRootHash object`); }

 return MerkleRootHash.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MerkleRootHash.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<MerkleRootHash> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MerkleRootHash object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMerkleRootHash(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MerkleRootHash object`); }

 return MerkleRootHash.fromSuiObjectData( res.data ); }

 }
