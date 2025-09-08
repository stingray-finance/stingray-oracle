import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {ID, UID} from "../../0x2/object/structs";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Ownership =============================== */

export function isOwnership(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::ownership::Ownership` + '<'); }

export interface OwnershipFields<T extends PhantomTypeArgument> { id: ToField<UID>; of: ToField<ID> }

export type OwnershipReified<T extends PhantomTypeArgument> = Reified< Ownership<T>, OwnershipFields<T> >;

export class Ownership<T extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::ownership::Ownership`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Ownership.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::ownership::Ownership<${PhantomToTypeStr<T>}>`; readonly $typeArgs: [PhantomToTypeStr<T>]; readonly $isPhantom = Ownership.$isPhantom;

 readonly id: ToField<UID>; readonly of: ToField<ID>

 private constructor(typeArgs: [PhantomToTypeStr<T>], fields: OwnershipFields<T>, ) { this.$fullTypeName = composeSuiType( Ownership.$typeName, ...typeArgs ) as `${typeof PKG_V1}::ownership::Ownership<${PhantomToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.of = fields.of; }

 static reified<T extends PhantomReified<PhantomTypeArgument>>( T: T ): OwnershipReified<ToPhantomTypeArgument<T>> { return { typeName: Ownership.$typeName, fullTypeName: composeSuiType( Ownership.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::ownership::Ownership<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>], isPhantom: Ownership.$isPhantom, reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => Ownership.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Ownership.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => Ownership.fromBcs( T, data, ), bcs: Ownership.bcs, fromJSONField: (field: any) => Ownership.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => Ownership.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => Ownership.fromSuiParsedData( T, content, ), fromSuiObjectData: (content: SuiObjectData) => Ownership.fromSuiObjectData( T, content, ), fetch: async (client: SuiClient, id: string) => Ownership.fetch( client, T, id, ), new: ( fields: OwnershipFields<ToPhantomTypeArgument<T>>, ) => { return new Ownership( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Ownership.reified }

 static phantom<T extends PhantomReified<PhantomTypeArgument>>( T: T ): PhantomReified<ToTypeStr<Ownership<ToPhantomTypeArgument<T>>>> { return phantom(Ownership.reified( T )); } static get p() { return Ownership.phantom }

 static get bcs() { return bcs.struct("Ownership", {

 id: UID.bcs, of: ID.bcs

}) };

 static fromFields<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, fields: Record<string, any> ): Ownership<ToPhantomTypeArgument<T>> { return Ownership.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), of: decodeFromFields(ID.reified(), fields.of) } ) }

 static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, item: FieldsWithTypes ): Ownership<ToPhantomTypeArgument<T>> { if (!isOwnership(item.type)) { throw new Error("not a Ownership type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Ownership.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), of: decodeFromFieldsWithTypes(ID.reified(), item.fields.of) } ) }

 static fromBcs<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, data: Uint8Array ): Ownership<ToPhantomTypeArgument<T>> { return Ownership.fromFields( typeArg, Ownership.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,of: this.of,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, field: any ): Ownership<ToPhantomTypeArgument<T>> { return Ownership.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), of: decodeFromJSONField(ID.reified(), field.of) } ) }

 static fromJSON<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, json: Record<string, any> ): Ownership<ToPhantomTypeArgument<T>> { if (json.$typeName !== Ownership.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Ownership.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Ownership.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, content: SuiParsedData ): Ownership<ToPhantomTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isOwnership(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Ownership object`); } return Ownership.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, data: SuiObjectData ): Ownership<ToPhantomTypeArgument<T>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isOwnership(data.bcs.type)) { throw new Error(`object at is not a Ownership object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Ownership.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Ownership.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T, id: string ): Promise<Ownership<ToPhantomTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Ownership object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isOwnership(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Ownership object`); }

 return Ownership.fromSuiObjectData( typeArg, res.data ); }

 }
