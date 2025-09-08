import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeArgument, ToTypeStr, TypeArgument, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {TypeName} from "../../0x1/type-name/structs";
import {Balance} from "../../0x2/balance/structs";
import {UID} from "../../0x2/object/structs";
import {VecSet} from "../../0x2/vec-set/structs";
import {PKG_V7, PKG_V8} from "../index";
import {BcsType, bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== AuthorizedWitnessList =============================== */

export function isAuthorizedWitnessList(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V7}::borrow_referral::AuthorizedWitnessList`; }

export interface AuthorizedWitnessListFields { id: ToField<UID>; witnessList: ToField<VecSet<TypeName>> }

export type AuthorizedWitnessListReified = Reified< AuthorizedWitnessList, AuthorizedWitnessListFields >;

export class AuthorizedWitnessList implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V7}::borrow_referral::AuthorizedWitnessList`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = AuthorizedWitnessList.$typeName; readonly $fullTypeName: `${typeof PKG_V7}::borrow_referral::AuthorizedWitnessList`; readonly $typeArgs: []; readonly $isPhantom = AuthorizedWitnessList.$isPhantom;

 readonly id: ToField<UID>; readonly witnessList: ToField<VecSet<TypeName>>

 private constructor(typeArgs: [], fields: AuthorizedWitnessListFields, ) { this.$fullTypeName = composeSuiType( AuthorizedWitnessList.$typeName, ...typeArgs ) as `${typeof PKG_V7}::borrow_referral::AuthorizedWitnessList`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.witnessList = fields.witnessList; }

 static reified( ): AuthorizedWitnessListReified { return { typeName: AuthorizedWitnessList.$typeName, fullTypeName: composeSuiType( AuthorizedWitnessList.$typeName, ...[] ) as `${typeof PKG_V7}::borrow_referral::AuthorizedWitnessList`, typeArgs: [ ] as [], isPhantom: AuthorizedWitnessList.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AuthorizedWitnessList.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AuthorizedWitnessList.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AuthorizedWitnessList.fromBcs( data, ), bcs: AuthorizedWitnessList.bcs, fromJSONField: (field: any) => AuthorizedWitnessList.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AuthorizedWitnessList.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AuthorizedWitnessList.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => AuthorizedWitnessList.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => AuthorizedWitnessList.fetch( client, id, ), new: ( fields: AuthorizedWitnessListFields, ) => { return new AuthorizedWitnessList( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AuthorizedWitnessList.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AuthorizedWitnessList>> { return phantom(AuthorizedWitnessList.reified( )); } static get p() { return AuthorizedWitnessList.phantom() }

 static get bcs() { return bcs.struct("AuthorizedWitnessList", {

 id: UID.bcs, witness_list: VecSet.bcs(TypeName.bcs)

}) };

 static fromFields( fields: Record<string, any> ): AuthorizedWitnessList { return AuthorizedWitnessList.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), witnessList: decodeFromFields(VecSet.reified(TypeName.reified()), fields.witness_list) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AuthorizedWitnessList { if (!isAuthorizedWitnessList(item.type)) { throw new Error("not a AuthorizedWitnessList type");

 }

 return AuthorizedWitnessList.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), witnessList: decodeFromFieldsWithTypes(VecSet.reified(TypeName.reified()), item.fields.witness_list) } ) }

 static fromBcs( data: Uint8Array ): AuthorizedWitnessList { return AuthorizedWitnessList.fromFields( AuthorizedWitnessList.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,witnessList: this.witnessList.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AuthorizedWitnessList { return AuthorizedWitnessList.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), witnessList: decodeFromJSONField(VecSet.reified(TypeName.reified()), field.witnessList) } ) }

 static fromJSON( json: Record<string, any> ): AuthorizedWitnessList { if (json.$typeName !== AuthorizedWitnessList.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AuthorizedWitnessList.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AuthorizedWitnessList { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAuthorizedWitnessList(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AuthorizedWitnessList object`); } return AuthorizedWitnessList.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): AuthorizedWitnessList { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAuthorizedWitnessList(data.bcs.type)) { throw new Error(`object at is not a AuthorizedWitnessList object`); }

 return AuthorizedWitnessList.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return AuthorizedWitnessList.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<AuthorizedWitnessList> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AuthorizedWitnessList object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAuthorizedWitnessList(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AuthorizedWitnessList object`); }

 return AuthorizedWitnessList.fromSuiObjectData( res.data ); }

 }

/* ============================== BorrowReferral =============================== */

export function isBorrowReferral(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V7}::borrow_referral::BorrowReferral` + '<'); }

export interface BorrowReferralFields<CoinType extends PhantomTypeArgument, Witness extends TypeArgument> { id: ToField<UID>; borrowFeeDiscount: ToField<"u64">; referralShare: ToField<"u64">; borrowed: ToField<"u64">; referralFee: ToField<Balance<CoinType>>; witness: ToField<Witness> }

export type BorrowReferralReified<CoinType extends PhantomTypeArgument, Witness extends TypeArgument> = Reified< BorrowReferral<CoinType, Witness>, BorrowReferralFields<CoinType, Witness> >;

export class BorrowReferral<CoinType extends PhantomTypeArgument, Witness extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V7}::borrow_referral::BorrowReferral`; static readonly $numTypeParams = 2; static readonly $isPhantom = [true,false,] as const;

 readonly $typeName = BorrowReferral.$typeName; readonly $fullTypeName: `${typeof PKG_V7}::borrow_referral::BorrowReferral<${PhantomToTypeStr<CoinType>}, ${ToTypeStr<Witness>}>`; readonly $typeArgs: [PhantomToTypeStr<CoinType>, ToTypeStr<Witness>]; readonly $isPhantom = BorrowReferral.$isPhantom;

 readonly id: ToField<UID>; readonly borrowFeeDiscount: ToField<"u64">; readonly referralShare: ToField<"u64">; readonly borrowed: ToField<"u64">; readonly referralFee: ToField<Balance<CoinType>>; readonly witness: ToField<Witness>

 private constructor(typeArgs: [PhantomToTypeStr<CoinType>, ToTypeStr<Witness>], fields: BorrowReferralFields<CoinType, Witness>, ) { this.$fullTypeName = composeSuiType( BorrowReferral.$typeName, ...typeArgs ) as `${typeof PKG_V7}::borrow_referral::BorrowReferral<${PhantomToTypeStr<CoinType>}, ${ToTypeStr<Witness>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.borrowFeeDiscount = fields.borrowFeeDiscount;; this.referralShare = fields.referralShare;; this.borrowed = fields.borrowed;; this.referralFee = fields.referralFee;; this.witness = fields.witness; }

 static reified<CoinType extends PhantomReified<PhantomTypeArgument>, Witness extends Reified<TypeArgument, any>>( CoinType: CoinType, Witness: Witness ): BorrowReferralReified<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> { return { typeName: BorrowReferral.$typeName, fullTypeName: composeSuiType( BorrowReferral.$typeName, ...[extractType(CoinType), extractType(Witness)] ) as `${typeof PKG_V7}::borrow_referral::BorrowReferral<${PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>}, ${ToTypeStr<ToTypeArgument<Witness>>}>`, typeArgs: [ extractType(CoinType), extractType(Witness) ] as [PhantomToTypeStr<ToPhantomTypeArgument<CoinType>>, ToTypeStr<ToTypeArgument<Witness>>], isPhantom: BorrowReferral.$isPhantom, reifiedTypeArgs: [CoinType, Witness], fromFields: (fields: Record<string, any>) => BorrowReferral.fromFields( [CoinType, Witness], fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowReferral.fromFieldsWithTypes( [CoinType, Witness], item, ), fromBcs: (data: Uint8Array) => BorrowReferral.fromBcs( [CoinType, Witness], data, ), bcs: BorrowReferral.bcs(toBcs(Witness)), fromJSONField: (field: any) => BorrowReferral.fromJSONField( [CoinType, Witness], field, ), fromJSON: (json: Record<string, any>) => BorrowReferral.fromJSON( [CoinType, Witness], json, ), fromSuiParsedData: (content: SuiParsedData) => BorrowReferral.fromSuiParsedData( [CoinType, Witness], content, ), fromSuiObjectData: (content: SuiObjectData) => BorrowReferral.fromSuiObjectData( [CoinType, Witness], content, ), fetch: async (client: SuiClient, id: string) => BorrowReferral.fetch( client, [CoinType, Witness], id, ), new: ( fields: BorrowReferralFields<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>>, ) => { return new BorrowReferral( [extractType(CoinType), extractType(Witness)], fields ) }, kind: "StructClassReified", } }

 static get r() { return BorrowReferral.reified }

 static phantom<CoinType extends PhantomReified<PhantomTypeArgument>, Witness extends Reified<TypeArgument, any>>( CoinType: CoinType, Witness: Witness ): PhantomReified<ToTypeStr<BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>>>> { return phantom(BorrowReferral.reified( CoinType, Witness )); } static get p() { return BorrowReferral.phantom }

 static get bcs() { return <Witness extends BcsType<any>>(Witness: Witness) => bcs.struct(`BorrowReferral<${Witness.name}>`, {

 id: UID.bcs, borrow_fee_discount: bcs.u64(), referral_share: bcs.u64(), borrowed: bcs.u64(), referral_fee: Balance.bcs, witness: Witness

}) };

 static fromFields<CoinType extends PhantomReified<PhantomTypeArgument>, Witness extends Reified<TypeArgument, any>>( typeArgs: [CoinType, Witness], fields: Record<string, any> ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> { return BorrowReferral.reified( typeArgs[0], typeArgs[1], ).new( { id: decodeFromFields(UID.reified(), fields.id), borrowFeeDiscount: decodeFromFields("u64", fields.borrow_fee_discount), referralShare: decodeFromFields("u64", fields.referral_share), borrowed: decodeFromFields("u64", fields.borrowed), referralFee: decodeFromFields(Balance.reified(typeArgs[0]), fields.referral_fee), witness: decodeFromFields(typeArgs[1], fields.witness) } ) }

 static fromFieldsWithTypes<CoinType extends PhantomReified<PhantomTypeArgument>, Witness extends Reified<TypeArgument, any>>( typeArgs: [CoinType, Witness], item: FieldsWithTypes ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> { if (!isBorrowReferral(item.type)) { throw new Error("not a BorrowReferral type");

 } assertFieldsWithTypesArgsMatch(item, typeArgs);

 return BorrowReferral.reified( typeArgs[0], typeArgs[1], ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), borrowFeeDiscount: decodeFromFieldsWithTypes("u64", item.fields.borrow_fee_discount), referralShare: decodeFromFieldsWithTypes("u64", item.fields.referral_share), borrowed: decodeFromFieldsWithTypes("u64", item.fields.borrowed), referralFee: decodeFromFieldsWithTypes(Balance.reified(typeArgs[0]), item.fields.referral_fee), witness: decodeFromFieldsWithTypes(typeArgs[1], item.fields.witness) } ) }

 static fromBcs<CoinType extends PhantomReified<PhantomTypeArgument>, Witness extends Reified<TypeArgument, any>>( typeArgs: [CoinType, Witness], data: Uint8Array ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> { return BorrowReferral.fromFields( typeArgs, BorrowReferral.bcs( toBcs(typeArgs[1]) ).parse(data) ) }

 toJSONField() { return {

 id: this.id,borrowFeeDiscount: this.borrowFeeDiscount.toString(),referralShare: this.referralShare.toString(),borrowed: this.borrowed.toString(),referralFee: this.referralFee.toJSONField(),witness: fieldToJSON<Witness>(this.$typeArgs[1], this.witness),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<CoinType extends PhantomReified<PhantomTypeArgument>, Witness extends Reified<TypeArgument, any>>( typeArgs: [CoinType, Witness], field: any ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> { return BorrowReferral.reified( typeArgs[0], typeArgs[1], ).new( { id: decodeFromJSONField(UID.reified(), field.id), borrowFeeDiscount: decodeFromJSONField("u64", field.borrowFeeDiscount), referralShare: decodeFromJSONField("u64", field.referralShare), borrowed: decodeFromJSONField("u64", field.borrowed), referralFee: decodeFromJSONField(Balance.reified(typeArgs[0]), field.referralFee), witness: decodeFromJSONField(typeArgs[1], field.witness) } ) }

 static fromJSON<CoinType extends PhantomReified<PhantomTypeArgument>, Witness extends Reified<TypeArgument, any>>( typeArgs: [CoinType, Witness], json: Record<string, any> ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> { if (json.$typeName !== BorrowReferral.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(BorrowReferral.$typeName, ...typeArgs.map(extractType)), json.$typeArgs, typeArgs, )

 return BorrowReferral.fromJSONField( typeArgs, json, ) }

 static fromSuiParsedData<CoinType extends PhantomReified<PhantomTypeArgument>, Witness extends Reified<TypeArgument, any>>( typeArgs: [CoinType, Witness], content: SuiParsedData ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBorrowReferral(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a BorrowReferral object`); } return BorrowReferral.fromFieldsWithTypes( typeArgs, content ); }

 static fromSuiObjectData<CoinType extends PhantomReified<PhantomTypeArgument>, Witness extends Reified<TypeArgument, any>>( typeArgs: [CoinType, Witness], data: SuiObjectData ): BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBorrowReferral(data.bcs.type)) { throw new Error(`object at is not a BorrowReferral object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 2) { throw new Error(`type argument mismatch: expected 2 type arguments but got ${gotTypeArgs.length}`); }; for (let i = 0; i < 2; i++) { const gotTypeArg = compressSuiType(gotTypeArgs[i]); const expectedTypeArg = compressSuiType(extractType(typeArgs[i])); if (gotTypeArg !== expectedTypeArg) { throw new Error(`type argument mismatch at position ${i}: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); } };

 return BorrowReferral.fromBcs( typeArgs, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return BorrowReferral.fromSuiParsedData( typeArgs, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<CoinType extends PhantomReified<PhantomTypeArgument>, Witness extends Reified<TypeArgument, any>>( client: SuiClient, typeArgs: [CoinType, Witness], id: string ): Promise<BorrowReferral<ToPhantomTypeArgument<CoinType>, ToTypeArgument<Witness>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching BorrowReferral object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBorrowReferral(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a BorrowReferral object`); }

 return BorrowReferral.fromSuiObjectData( typeArgs, res.data ); }

 }

/* ============================== BorrowReferralCfgKey =============================== */

export function isBorrowReferralCfgKey(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V7}::borrow_referral::BorrowReferralCfgKey` + '<'); }

export interface BorrowReferralCfgKeyFields<Cfg extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type BorrowReferralCfgKeyReified<Cfg extends PhantomTypeArgument> = Reified< BorrowReferralCfgKey<Cfg>, BorrowReferralCfgKeyFields<Cfg> >;

export class BorrowReferralCfgKey<Cfg extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V7}::borrow_referral::BorrowReferralCfgKey`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = BorrowReferralCfgKey.$typeName; readonly $fullTypeName: `${typeof PKG_V7}::borrow_referral::BorrowReferralCfgKey<${PhantomToTypeStr<Cfg>}>`; readonly $typeArgs: [PhantomToTypeStr<Cfg>]; readonly $isPhantom = BorrowReferralCfgKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<Cfg>], fields: BorrowReferralCfgKeyFields<Cfg>, ) { this.$fullTypeName = composeSuiType( BorrowReferralCfgKey.$typeName, ...typeArgs ) as `${typeof PKG_V7}::borrow_referral::BorrowReferralCfgKey<${PhantomToTypeStr<Cfg>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<Cfg extends PhantomReified<PhantomTypeArgument>>( Cfg: Cfg ): BorrowReferralCfgKeyReified<ToPhantomTypeArgument<Cfg>> { return { typeName: BorrowReferralCfgKey.$typeName, fullTypeName: composeSuiType( BorrowReferralCfgKey.$typeName, ...[extractType(Cfg)] ) as `${typeof PKG_V7}::borrow_referral::BorrowReferralCfgKey<${PhantomToTypeStr<ToPhantomTypeArgument<Cfg>>}>`, typeArgs: [ extractType(Cfg) ] as [PhantomToTypeStr<ToPhantomTypeArgument<Cfg>>], isPhantom: BorrowReferralCfgKey.$isPhantom, reifiedTypeArgs: [Cfg], fromFields: (fields: Record<string, any>) => BorrowReferralCfgKey.fromFields( Cfg, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowReferralCfgKey.fromFieldsWithTypes( Cfg, item, ), fromBcs: (data: Uint8Array) => BorrowReferralCfgKey.fromBcs( Cfg, data, ), bcs: BorrowReferralCfgKey.bcs, fromJSONField: (field: any) => BorrowReferralCfgKey.fromJSONField( Cfg, field, ), fromJSON: (json: Record<string, any>) => BorrowReferralCfgKey.fromJSON( Cfg, json, ), fromSuiParsedData: (content: SuiParsedData) => BorrowReferralCfgKey.fromSuiParsedData( Cfg, content, ), fromSuiObjectData: (content: SuiObjectData) => BorrowReferralCfgKey.fromSuiObjectData( Cfg, content, ), fetch: async (client: SuiClient, id: string) => BorrowReferralCfgKey.fetch( client, Cfg, id, ), new: ( fields: BorrowReferralCfgKeyFields<ToPhantomTypeArgument<Cfg>>, ) => { return new BorrowReferralCfgKey( [extractType(Cfg)], fields ) }, kind: "StructClassReified", } }

 static get r() { return BorrowReferralCfgKey.reified }

 static phantom<Cfg extends PhantomReified<PhantomTypeArgument>>( Cfg: Cfg ): PhantomReified<ToTypeStr<BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>>>> { return phantom(BorrowReferralCfgKey.reified( Cfg )); } static get p() { return BorrowReferralCfgKey.phantom }

 static get bcs() { return bcs.struct("BorrowReferralCfgKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields<Cfg extends PhantomReified<PhantomTypeArgument>>( typeArg: Cfg, fields: Record<string, any> ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> { return BorrowReferralCfgKey.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<Cfg extends PhantomReified<PhantomTypeArgument>>( typeArg: Cfg, item: FieldsWithTypes ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> { if (!isBorrowReferralCfgKey(item.type)) { throw new Error("not a BorrowReferralCfgKey type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return BorrowReferralCfgKey.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<Cfg extends PhantomReified<PhantomTypeArgument>>( typeArg: Cfg, data: Uint8Array ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> { return BorrowReferralCfgKey.fromFields( typeArg, BorrowReferralCfgKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Cfg extends PhantomReified<PhantomTypeArgument>>( typeArg: Cfg, field: any ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> { return BorrowReferralCfgKey.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<Cfg extends PhantomReified<PhantomTypeArgument>>( typeArg: Cfg, json: Record<string, any> ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> { if (json.$typeName !== BorrowReferralCfgKey.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(BorrowReferralCfgKey.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return BorrowReferralCfgKey.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Cfg extends PhantomReified<PhantomTypeArgument>>( typeArg: Cfg, content: SuiParsedData ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBorrowReferralCfgKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a BorrowReferralCfgKey object`); } return BorrowReferralCfgKey.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Cfg extends PhantomReified<PhantomTypeArgument>>( typeArg: Cfg, data: SuiObjectData ): BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBorrowReferralCfgKey(data.bcs.type)) { throw new Error(`object at is not a BorrowReferralCfgKey object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return BorrowReferralCfgKey.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return BorrowReferralCfgKey.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Cfg extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: Cfg, id: string ): Promise<BorrowReferralCfgKey<ToPhantomTypeArgument<Cfg>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching BorrowReferralCfgKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBorrowReferralCfgKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a BorrowReferralCfgKey object`); }

 return BorrowReferralCfgKey.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== BorrowedKey =============================== */

export function isBorrowedKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V8}::borrow_referral::BorrowedKey`; }

export interface BorrowedKeyFields { dummyField: ToField<"bool"> }

export type BorrowedKeyReified = Reified< BorrowedKey, BorrowedKeyFields >;

export class BorrowedKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V8}::borrow_referral::BorrowedKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = BorrowedKey.$typeName; readonly $fullTypeName: `${typeof PKG_V8}::borrow_referral::BorrowedKey`; readonly $typeArgs: []; readonly $isPhantom = BorrowedKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: BorrowedKeyFields, ) { this.$fullTypeName = composeSuiType( BorrowedKey.$typeName, ...typeArgs ) as `${typeof PKG_V8}::borrow_referral::BorrowedKey`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): BorrowedKeyReified { return { typeName: BorrowedKey.$typeName, fullTypeName: composeSuiType( BorrowedKey.$typeName, ...[] ) as `${typeof PKG_V8}::borrow_referral::BorrowedKey`, typeArgs: [ ] as [], isPhantom: BorrowedKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => BorrowedKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => BorrowedKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => BorrowedKey.fromBcs( data, ), bcs: BorrowedKey.bcs, fromJSONField: (field: any) => BorrowedKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => BorrowedKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => BorrowedKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => BorrowedKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => BorrowedKey.fetch( client, id, ), new: ( fields: BorrowedKeyFields, ) => { return new BorrowedKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return BorrowedKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<BorrowedKey>> { return phantom(BorrowedKey.reified( )); } static get p() { return BorrowedKey.phantom() }

 static get bcs() { return bcs.struct("BorrowedKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): BorrowedKey { return BorrowedKey.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): BorrowedKey { if (!isBorrowedKey(item.type)) { throw new Error("not a BorrowedKey type");

 }

 return BorrowedKey.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): BorrowedKey { return BorrowedKey.fromFields( BorrowedKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): BorrowedKey { return BorrowedKey.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): BorrowedKey { if (json.$typeName !== BorrowedKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return BorrowedKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): BorrowedKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBorrowedKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a BorrowedKey object`); } return BorrowedKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): BorrowedKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBorrowedKey(data.bcs.type)) { throw new Error(`object at is not a BorrowedKey object`); }

 return BorrowedKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return BorrowedKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<BorrowedKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching BorrowedKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBorrowedKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a BorrowedKey object`); }

 return BorrowedKey.fromSuiObjectData( res.data ); }

 }

/* ============================== ReferralFeeKey =============================== */

export function isReferralFeeKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V8}::borrow_referral::ReferralFeeKey`; }

export interface ReferralFeeKeyFields { dummyField: ToField<"bool"> }

export type ReferralFeeKeyReified = Reified< ReferralFeeKey, ReferralFeeKeyFields >;

export class ReferralFeeKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V8}::borrow_referral::ReferralFeeKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ReferralFeeKey.$typeName; readonly $fullTypeName: `${typeof PKG_V8}::borrow_referral::ReferralFeeKey`; readonly $typeArgs: []; readonly $isPhantom = ReferralFeeKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: ReferralFeeKeyFields, ) { this.$fullTypeName = composeSuiType( ReferralFeeKey.$typeName, ...typeArgs ) as `${typeof PKG_V8}::borrow_referral::ReferralFeeKey`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): ReferralFeeKeyReified { return { typeName: ReferralFeeKey.$typeName, fullTypeName: composeSuiType( ReferralFeeKey.$typeName, ...[] ) as `${typeof PKG_V8}::borrow_referral::ReferralFeeKey`, typeArgs: [ ] as [], isPhantom: ReferralFeeKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ReferralFeeKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ReferralFeeKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ReferralFeeKey.fromBcs( data, ), bcs: ReferralFeeKey.bcs, fromJSONField: (field: any) => ReferralFeeKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ReferralFeeKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ReferralFeeKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ReferralFeeKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ReferralFeeKey.fetch( client, id, ), new: ( fields: ReferralFeeKeyFields, ) => { return new ReferralFeeKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ReferralFeeKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ReferralFeeKey>> { return phantom(ReferralFeeKey.reified( )); } static get p() { return ReferralFeeKey.phantom() }

 static get bcs() { return bcs.struct("ReferralFeeKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): ReferralFeeKey { return ReferralFeeKey.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ReferralFeeKey { if (!isReferralFeeKey(item.type)) { throw new Error("not a ReferralFeeKey type");

 }

 return ReferralFeeKey.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): ReferralFeeKey { return ReferralFeeKey.fromFields( ReferralFeeKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ReferralFeeKey { return ReferralFeeKey.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): ReferralFeeKey { if (json.$typeName !== ReferralFeeKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ReferralFeeKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ReferralFeeKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isReferralFeeKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ReferralFeeKey object`); } return ReferralFeeKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ReferralFeeKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isReferralFeeKey(data.bcs.type)) { throw new Error(`object at is not a ReferralFeeKey object`); }

 return ReferralFeeKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ReferralFeeKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ReferralFeeKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ReferralFeeKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isReferralFeeKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ReferralFeeKey object`); }

 return ReferralFeeKey.fromSuiObjectData( res.data ); }

 }
