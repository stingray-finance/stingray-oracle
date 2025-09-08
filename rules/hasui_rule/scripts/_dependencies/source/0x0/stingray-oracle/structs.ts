import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../../../_framework/util";
import {String} from "../../0x1/ascii/structs";
import {UID} from "../../0x2/object/structs";
import {VecSet} from "../../0x2/vec-set/structs";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::stingray_oracle::AdminCap`; }

export interface AdminCapFields { id: ToField<UID> }

export type AdminCapReified = Reified< AdminCap, AdminCapFields >;

export class AdminCap implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::stingray_oracle::AdminCap`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = AdminCap.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::stingray_oracle::AdminCap`; readonly $typeArgs: []; readonly $isPhantom = AdminCap.$isPhantom;

 readonly id: ToField<UID>

 private constructor(typeArgs: [], fields: AdminCapFields, ) { this.$fullTypeName = composeSuiType( AdminCap.$typeName, ...typeArgs ) as `${typeof PKG_V1}::stingray_oracle::AdminCap`; this.$typeArgs = typeArgs;

 this.id = fields.id; }

 static reified( ): AdminCapReified { return { typeName: AdminCap.$typeName, fullTypeName: composeSuiType( AdminCap.$typeName, ...[] ) as `${typeof PKG_V1}::stingray_oracle::AdminCap`, typeArgs: [ ] as [], isPhantom: AdminCap.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AdminCap.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AdminCap.fromBcs( data, ), bcs: AdminCap.bcs, fromJSONField: (field: any) => AdminCap.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AdminCap.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => AdminCap.fetch( client, id, ), new: ( fields: AdminCapFields, ) => { return new AdminCap( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AdminCap.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AdminCap>> { return phantom(AdminCap.reified( )); } static get p() { return AdminCap.phantom() }

 static get bcs() { return bcs.struct("AdminCap", {

 id: UID.bcs

}) };

 static fromFields( fields: Record<string, any> ): AdminCap { return AdminCap.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AdminCap { if (!isAdminCap(item.type)) { throw new Error("not a AdminCap type");

 }

 return AdminCap.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id) } ) }

 static fromBcs( data: Uint8Array ): AdminCap { return AdminCap.fromFields( AdminCap.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AdminCap { return AdminCap.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id) } ) }

 static fromJSON( json: Record<string, any> ): AdminCap { if (json.$typeName !== AdminCap.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AdminCap.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AdminCap { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAdminCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AdminCap object`); } return AdminCap.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): AdminCap { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAdminCap(data.bcs.type)) { throw new Error(`object at is not a AdminCap object`); }

 return AdminCap.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return AdminCap.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<AdminCap> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AdminCap object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAdminCap(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AdminCap object`); }

 return AdminCap.fromSuiObjectData( res.data ); }

 }

/* ============================== StingrayOracle =============================== */

export function isStingrayOracle(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::stingray_oracle::StingrayOracle`; }

export interface StingrayOracleFields { id: ToField<UID>; versions: ToField<VecSet<"u64">>; assetTypes: ToField<VecSet<String>> }

export type StingrayOracleReified = Reified< StingrayOracle, StingrayOracleFields >;

export class StingrayOracle implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::stingray_oracle::StingrayOracle`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = StingrayOracle.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::stingray_oracle::StingrayOracle`; readonly $typeArgs: []; readonly $isPhantom = StingrayOracle.$isPhantom;

 readonly id: ToField<UID>; readonly versions: ToField<VecSet<"u64">>; readonly assetTypes: ToField<VecSet<String>>

 private constructor(typeArgs: [], fields: StingrayOracleFields, ) { this.$fullTypeName = composeSuiType( StingrayOracle.$typeName, ...typeArgs ) as `${typeof PKG_V1}::stingray_oracle::StingrayOracle`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.versions = fields.versions;; this.assetTypes = fields.assetTypes; }

 static reified( ): StingrayOracleReified { return { typeName: StingrayOracle.$typeName, fullTypeName: composeSuiType( StingrayOracle.$typeName, ...[] ) as `${typeof PKG_V1}::stingray_oracle::StingrayOracle`, typeArgs: [ ] as [], isPhantom: StingrayOracle.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => StingrayOracle.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => StingrayOracle.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => StingrayOracle.fromBcs( data, ), bcs: StingrayOracle.bcs, fromJSONField: (field: any) => StingrayOracle.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => StingrayOracle.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => StingrayOracle.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => StingrayOracle.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => StingrayOracle.fetch( client, id, ), new: ( fields: StingrayOracleFields, ) => { return new StingrayOracle( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return StingrayOracle.reified() }

 static phantom( ): PhantomReified<ToTypeStr<StingrayOracle>> { return phantom(StingrayOracle.reified( )); } static get p() { return StingrayOracle.phantom() }

 static get bcs() { return bcs.struct("StingrayOracle", {

 id: UID.bcs, versions: VecSet.bcs(bcs.u64()), asset_types: VecSet.bcs(String.bcs)

}) };

 static fromFields( fields: Record<string, any> ): StingrayOracle { return StingrayOracle.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), versions: decodeFromFields(VecSet.reified("u64"), fields.versions), assetTypes: decodeFromFields(VecSet.reified(String.reified()), fields.asset_types) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): StingrayOracle { if (!isStingrayOracle(item.type)) { throw new Error("not a StingrayOracle type");

 }

 return StingrayOracle.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), versions: decodeFromFieldsWithTypes(VecSet.reified("u64"), item.fields.versions), assetTypes: decodeFromFieldsWithTypes(VecSet.reified(String.reified()), item.fields.asset_types) } ) }

 static fromBcs( data: Uint8Array ): StingrayOracle { return StingrayOracle.fromFields( StingrayOracle.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,versions: this.versions.toJSONField(),assetTypes: this.assetTypes.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): StingrayOracle { return StingrayOracle.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), versions: decodeFromJSONField(VecSet.reified("u64"), field.versions), assetTypes: decodeFromJSONField(VecSet.reified(String.reified()), field.assetTypes) } ) }

 static fromJSON( json: Record<string, any> ): StingrayOracle { if (json.$typeName !== StingrayOracle.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return StingrayOracle.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): StingrayOracle { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isStingrayOracle(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a StingrayOracle object`); } return StingrayOracle.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): StingrayOracle { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isStingrayOracle(data.bcs.type)) { throw new Error(`object at is not a StingrayOracle object`); }

 return StingrayOracle.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return StingrayOracle.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<StingrayOracle> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching StingrayOracle object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isStingrayOracle(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a StingrayOracle object`); }

 return StingrayOracle.fromSuiObjectData( res.data ); }

 }
