import {PhantomReified, Reified, StructClass, ToField, ToTypeArgument, ToTypeStr, TypeArgument, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {UID} from "../../0x2/object/structs";
import {PKG_V1} from "../index";
import {BcsType, bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== OneTimeLockValue =============================== */

export function isOneTimeLockValue(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::one_time_lock_value::OneTimeLockValue` + '<'); }

export interface OneTimeLockValueFields<T extends TypeArgument> { id: ToField<UID>; value: ToField<T>; lockUntilEpoch: ToField<"u64">; validBeforeEpoch: ToField<"u64"> }

export type OneTimeLockValueReified<T extends TypeArgument> = Reified< OneTimeLockValue<T>, OneTimeLockValueFields<T> >;

export class OneTimeLockValue<T extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::one_time_lock_value::OneTimeLockValue`; static readonly $numTypeParams = 1; static readonly $isPhantom = [false,] as const;

 readonly $typeName = OneTimeLockValue.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::one_time_lock_value::OneTimeLockValue<${ToTypeStr<T>}>`; readonly $typeArgs: [ToTypeStr<T>]; readonly $isPhantom = OneTimeLockValue.$isPhantom;

 readonly id: ToField<UID>; readonly value: ToField<T>; readonly lockUntilEpoch: ToField<"u64">; readonly validBeforeEpoch: ToField<"u64">

 private constructor(typeArgs: [ToTypeStr<T>], fields: OneTimeLockValueFields<T>, ) { this.$fullTypeName = composeSuiType( OneTimeLockValue.$typeName, ...typeArgs ) as `${typeof PKG_V1}::one_time_lock_value::OneTimeLockValue<${ToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.value = fields.value;; this.lockUntilEpoch = fields.lockUntilEpoch;; this.validBeforeEpoch = fields.validBeforeEpoch; }

 static reified<T extends Reified<TypeArgument, any>>( T: T ): OneTimeLockValueReified<ToTypeArgument<T>> { return { typeName: OneTimeLockValue.$typeName, fullTypeName: composeSuiType( OneTimeLockValue.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::one_time_lock_value::OneTimeLockValue<${ToTypeStr<ToTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [ToTypeStr<ToTypeArgument<T>>], isPhantom: OneTimeLockValue.$isPhantom, reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => OneTimeLockValue.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => OneTimeLockValue.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => OneTimeLockValue.fromBcs( T, data, ), bcs: OneTimeLockValue.bcs(toBcs(T)), fromJSONField: (field: any) => OneTimeLockValue.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => OneTimeLockValue.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => OneTimeLockValue.fromSuiParsedData( T, content, ), fromSuiObjectData: (content: SuiObjectData) => OneTimeLockValue.fromSuiObjectData( T, content, ), fetch: async (client: SuiClient, id: string) => OneTimeLockValue.fetch( client, T, id, ), new: ( fields: OneTimeLockValueFields<ToTypeArgument<T>>, ) => { return new OneTimeLockValue( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return OneTimeLockValue.reified }

 static phantom<T extends Reified<TypeArgument, any>>( T: T ): PhantomReified<ToTypeStr<OneTimeLockValue<ToTypeArgument<T>>>> { return phantom(OneTimeLockValue.reified( T )); } static get p() { return OneTimeLockValue.phantom }

 static get bcs() { return <T extends BcsType<any>>(T: T) => bcs.struct(`OneTimeLockValue<${T.name}>`, {

 id: UID.bcs, value: T, lock_until_epoch: bcs.u64(), valid_before_epoch: bcs.u64()

}) };

 static fromFields<T extends Reified<TypeArgument, any>>( typeArg: T, fields: Record<string, any> ): OneTimeLockValue<ToTypeArgument<T>> { return OneTimeLockValue.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), value: decodeFromFields(typeArg, fields.value), lockUntilEpoch: decodeFromFields("u64", fields.lock_until_epoch), validBeforeEpoch: decodeFromFields("u64", fields.valid_before_epoch) } ) }

 static fromFieldsWithTypes<T extends Reified<TypeArgument, any>>( typeArg: T, item: FieldsWithTypes ): OneTimeLockValue<ToTypeArgument<T>> { if (!isOneTimeLockValue(item.type)) { throw new Error("not a OneTimeLockValue type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return OneTimeLockValue.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), value: decodeFromFieldsWithTypes(typeArg, item.fields.value), lockUntilEpoch: decodeFromFieldsWithTypes("u64", item.fields.lock_until_epoch), validBeforeEpoch: decodeFromFieldsWithTypes("u64", item.fields.valid_before_epoch) } ) }

 static fromBcs<T extends Reified<TypeArgument, any>>( typeArg: T, data: Uint8Array ): OneTimeLockValue<ToTypeArgument<T>> { const typeArgs = [typeArg];

 return OneTimeLockValue.fromFields( typeArg, OneTimeLockValue.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 id: this.id,value: fieldToJSON<T>(this.$typeArgs[0], this.value),lockUntilEpoch: this.lockUntilEpoch.toString(),validBeforeEpoch: this.validBeforeEpoch.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends Reified<TypeArgument, any>>( typeArg: T, field: any ): OneTimeLockValue<ToTypeArgument<T>> { return OneTimeLockValue.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), value: decodeFromJSONField(typeArg, field.value), lockUntilEpoch: decodeFromJSONField("u64", field.lockUntilEpoch), validBeforeEpoch: decodeFromJSONField("u64", field.validBeforeEpoch) } ) }

 static fromJSON<T extends Reified<TypeArgument, any>>( typeArg: T, json: Record<string, any> ): OneTimeLockValue<ToTypeArgument<T>> { if (json.$typeName !== OneTimeLockValue.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(OneTimeLockValue.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return OneTimeLockValue.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends Reified<TypeArgument, any>>( typeArg: T, content: SuiParsedData ): OneTimeLockValue<ToTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isOneTimeLockValue(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a OneTimeLockValue object`); } return OneTimeLockValue.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T extends Reified<TypeArgument, any>>( typeArg: T, data: SuiObjectData ): OneTimeLockValue<ToTypeArgument<T>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isOneTimeLockValue(data.bcs.type)) { throw new Error(`object at is not a OneTimeLockValue object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return OneTimeLockValue.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return OneTimeLockValue.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: T, id: string ): Promise<OneTimeLockValue<ToTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching OneTimeLockValue object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isOneTimeLockValue(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a OneTimeLockValue object`); }

 return OneTimeLockValue.fromSuiObjectData( typeArg, res.data ); }

 }
