import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../../../_framework/util";
import {TypeName} from "../../0x1/type-name/structs";
import {UID} from "../../0x2/object/structs";
import {VecSet} from "../../0x2/vec-set/structs";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Config =============================== */

export function isConfig(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::scoin_rule::Config`; }

export interface ConfigFields { id: ToField<UID>; scoinPairs: ToField<VecSet<SCoinPair>> }

export type ConfigReified = Reified< Config, ConfigFields >;

export class Config implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::scoin_rule::Config`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Config.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::scoin_rule::Config`; readonly $typeArgs: []; readonly $isPhantom = Config.$isPhantom;

 readonly id: ToField<UID>; readonly scoinPairs: ToField<VecSet<SCoinPair>>

 private constructor(typeArgs: [], fields: ConfigFields, ) { this.$fullTypeName = composeSuiType( Config.$typeName, ...typeArgs ) as `${typeof PKG_V1}::scoin_rule::Config`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.scoinPairs = fields.scoinPairs; }

 static reified( ): ConfigReified { return { typeName: Config.$typeName, fullTypeName: composeSuiType( Config.$typeName, ...[] ) as `${typeof PKG_V1}::scoin_rule::Config`, typeArgs: [ ] as [], isPhantom: Config.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Config.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Config.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Config.fromBcs( data, ), bcs: Config.bcs, fromJSONField: (field: any) => Config.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Config.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Config.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Config.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Config.fetch( client, id, ), new: ( fields: ConfigFields, ) => { return new Config( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Config.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Config>> { return phantom(Config.reified( )); } static get p() { return Config.phantom() }

 static get bcs() { return bcs.struct("Config", {

 id: UID.bcs, scoin_pairs: VecSet.bcs(SCoinPair.bcs)

}) };

 static fromFields( fields: Record<string, any> ): Config { return Config.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), scoinPairs: decodeFromFields(VecSet.reified(SCoinPair.reified()), fields.scoin_pairs) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Config { if (!isConfig(item.type)) { throw new Error("not a Config type");

 }

 return Config.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), scoinPairs: decodeFromFieldsWithTypes(VecSet.reified(SCoinPair.reified()), item.fields.scoin_pairs) } ) }

 static fromBcs( data: Uint8Array ): Config { return Config.fromFields( Config.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,scoinPairs: this.scoinPairs.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Config { return Config.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), scoinPairs: decodeFromJSONField(VecSet.reified(SCoinPair.reified()), field.scoinPairs) } ) }

 static fromJSON( json: Record<string, any> ): Config { if (json.$typeName !== Config.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Config.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Config { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isConfig(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Config object`); } return Config.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Config { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isConfig(data.bcs.type)) { throw new Error(`object at is not a Config object`); }

 return Config.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Config.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Config> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Config object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isConfig(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Config object`); }

 return Config.fromSuiObjectData( res.data ); }

 }

/* ============================== AdminCap =============================== */

export function isAdminCap(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::scoin_rule::AdminCap`; }

export interface AdminCapFields { id: ToField<UID> }

export type AdminCapReified = Reified< AdminCap, AdminCapFields >;

export class AdminCap implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::scoin_rule::AdminCap`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = AdminCap.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::scoin_rule::AdminCap`; readonly $typeArgs: []; readonly $isPhantom = AdminCap.$isPhantom;

 readonly id: ToField<UID>

 private constructor(typeArgs: [], fields: AdminCapFields, ) { this.$fullTypeName = composeSuiType( AdminCap.$typeName, ...typeArgs ) as `${typeof PKG_V1}::scoin_rule::AdminCap`; this.$typeArgs = typeArgs;

 this.id = fields.id; }

 static reified( ): AdminCapReified { return { typeName: AdminCap.$typeName, fullTypeName: composeSuiType( AdminCap.$typeName, ...[] ) as `${typeof PKG_V1}::scoin_rule::AdminCap`, typeArgs: [ ] as [], isPhantom: AdminCap.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AdminCap.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AdminCap.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AdminCap.fromBcs( data, ), bcs: AdminCap.bcs, fromJSONField: (field: any) => AdminCap.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AdminCap.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AdminCap.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => AdminCap.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => AdminCap.fetch( client, id, ), new: ( fields: AdminCapFields, ) => { return new AdminCap( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== Rule =============================== */

export function isRule(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::scoin_rule::Rule`; }

export interface RuleFields { dummyField: ToField<"bool"> }

export type RuleReified = Reified< Rule, RuleFields >;

export class Rule implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::scoin_rule::Rule`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Rule.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::scoin_rule::Rule`; readonly $typeArgs: []; readonly $isPhantom = Rule.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: RuleFields, ) { this.$fullTypeName = composeSuiType( Rule.$typeName, ...typeArgs ) as `${typeof PKG_V1}::scoin_rule::Rule`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): RuleReified { return { typeName: Rule.$typeName, fullTypeName: composeSuiType( Rule.$typeName, ...[] ) as `${typeof PKG_V1}::scoin_rule::Rule`, typeArgs: [ ] as [], isPhantom: Rule.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Rule.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Rule.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Rule.fromBcs( data, ), bcs: Rule.bcs, fromJSONField: (field: any) => Rule.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Rule.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Rule.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Rule.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Rule.fetch( client, id, ), new: ( fields: RuleFields, ) => { return new Rule( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Rule.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Rule>> { return phantom(Rule.reified( )); } static get p() { return Rule.phantom() }

 static get bcs() { return bcs.struct("Rule", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): Rule { return Rule.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Rule { if (!isRule(item.type)) { throw new Error("not a Rule type");

 }

 return Rule.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): Rule { return Rule.fromFields( Rule.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Rule { return Rule.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): Rule { if (json.$typeName !== Rule.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Rule.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Rule { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRule(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Rule object`); } return Rule.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Rule { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isRule(data.bcs.type)) { throw new Error(`object at is not a Rule object`); }

 return Rule.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Rule.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Rule> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Rule object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRule(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Rule object`); }

 return Rule.fromSuiObjectData( res.data ); }

 }

/* ============================== SCoinPair =============================== */

export function isSCoinPair(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::scoin_rule::SCoinPair`; }

export interface SCoinPairFields { scoinType: ToField<TypeName>; coinType: ToField<TypeName> }

export type SCoinPairReified = Reified< SCoinPair, SCoinPairFields >;

export class SCoinPair implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::scoin_rule::SCoinPair`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = SCoinPair.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::scoin_rule::SCoinPair`; readonly $typeArgs: []; readonly $isPhantom = SCoinPair.$isPhantom;

 readonly scoinType: ToField<TypeName>; readonly coinType: ToField<TypeName>

 private constructor(typeArgs: [], fields: SCoinPairFields, ) { this.$fullTypeName = composeSuiType( SCoinPair.$typeName, ...typeArgs ) as `${typeof PKG_V1}::scoin_rule::SCoinPair`; this.$typeArgs = typeArgs;

 this.scoinType = fields.scoinType;; this.coinType = fields.coinType; }

 static reified( ): SCoinPairReified { return { typeName: SCoinPair.$typeName, fullTypeName: composeSuiType( SCoinPair.$typeName, ...[] ) as `${typeof PKG_V1}::scoin_rule::SCoinPair`, typeArgs: [ ] as [], isPhantom: SCoinPair.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => SCoinPair.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => SCoinPair.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => SCoinPair.fromBcs( data, ), bcs: SCoinPair.bcs, fromJSONField: (field: any) => SCoinPair.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => SCoinPair.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => SCoinPair.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => SCoinPair.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => SCoinPair.fetch( client, id, ), new: ( fields: SCoinPairFields, ) => { return new SCoinPair( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return SCoinPair.reified() }

 static phantom( ): PhantomReified<ToTypeStr<SCoinPair>> { return phantom(SCoinPair.reified( )); } static get p() { return SCoinPair.phantom() }

 static get bcs() { return bcs.struct("SCoinPair", {

 scoin_type: TypeName.bcs, coin_type: TypeName.bcs

}) };

 static fromFields( fields: Record<string, any> ): SCoinPair { return SCoinPair.reified( ).new( { scoinType: decodeFromFields(TypeName.reified(), fields.scoin_type), coinType: decodeFromFields(TypeName.reified(), fields.coin_type) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): SCoinPair { if (!isSCoinPair(item.type)) { throw new Error("not a SCoinPair type");

 }

 return SCoinPair.reified( ).new( { scoinType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.scoin_type), coinType: decodeFromFieldsWithTypes(TypeName.reified(), item.fields.coin_type) } ) }

 static fromBcs( data: Uint8Array ): SCoinPair { return SCoinPair.fromFields( SCoinPair.bcs.parse(data) ) }

 toJSONField() { return {

 scoinType: this.scoinType.toJSONField(),coinType: this.coinType.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): SCoinPair { return SCoinPair.reified( ).new( { scoinType: decodeFromJSONField(TypeName.reified(), field.scoinType), coinType: decodeFromJSONField(TypeName.reified(), field.coinType) } ) }

 static fromJSON( json: Record<string, any> ): SCoinPair { if (json.$typeName !== SCoinPair.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return SCoinPair.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): SCoinPair { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isSCoinPair(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a SCoinPair object`); } return SCoinPair.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): SCoinPair { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isSCoinPair(data.bcs.type)) { throw new Error(`object at is not a SCoinPair object`); }

 return SCoinPair.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return SCoinPair.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<SCoinPair> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching SCoinPair object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isSCoinPair(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a SCoinPair object`); }

 return SCoinPair.fromSuiObjectData( res.data ); }

 }
