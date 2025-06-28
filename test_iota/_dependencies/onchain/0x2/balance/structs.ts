import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeIotaType, compressIotaType, parseTypeName} from "../../../../_framework/util";
import {PKG_V3} from "../index";
import {bcs} from "@iota/iota-sdk/bcs";
import {IotaClient, IotaObjectData, IotaParsedData} from "@iota/iota-sdk/client";
import {fromB64} from "@iota/iota-sdk/utils";

/* ============================== Balance =============================== */

export function isBalance(type: string): boolean { type = compressIotaType(type); return type.startsWith(`${PKG_V3}::balance::Balance` + '<'); }

export interface BalanceFields<T0 extends PhantomTypeArgument> { value: ToField<"u64"> }

export type BalanceReified<T0 extends PhantomTypeArgument> = Reified< Balance<T0>, BalanceFields<T0> >;

export class Balance<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V3}::balance::Balance`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Balance.$typeName; readonly $fullTypeName: `${typeof PKG_V3}::balance::Balance<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = Balance.$isPhantom;

 readonly value: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: BalanceFields<T0>, ) { this.$fullTypeName = composeIotaType( Balance.$typeName, ...typeArgs ) as `${typeof PKG_V3}::balance::Balance<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.value = fields.value; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): BalanceReified<ToPhantomTypeArgument<T0>> { return { typeName: Balance.$typeName, fullTypeName: composeIotaType( Balance.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V3}::balance::Balance<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: Balance.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => Balance.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Balance.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => Balance.fromBcs( T0, data, ), bcs: Balance.bcs, fromJSONField: (field: any) => Balance.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => Balance.fromJSON( T0, json, ), fromIotaParsedData: (content: IotaParsedData) => Balance.fromIotaParsedData( T0, content, ), fromIotaObjectData: (content: IotaObjectData) => Balance.fromIotaObjectData( T0, content, ), fetch: async (client: IotaClient, id: string) => Balance.fetch( client, T0, id, ), new: ( fields: BalanceFields<ToPhantomTypeArgument<T0>>, ) => { return new Balance( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Balance.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<Balance<ToPhantomTypeArgument<T0>>>> { return phantom(Balance.reified( T0 )); } static get p() { return Balance.phantom }

 static get bcs() { return bcs.struct("Balance", {

 value: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): Balance<ToPhantomTypeArgument<T0>> { return Balance.reified( typeArg, ).new( { value: decodeFromFields("u64", fields.value) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): Balance<ToPhantomTypeArgument<T0>> { if (!isBalance(item.type)) { throw new Error("not a Balance type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Balance.reified( typeArg, ).new( { value: decodeFromFieldsWithTypes("u64", item.fields.value) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): Balance<ToPhantomTypeArgument<T0>> { return Balance.fromFields( typeArg, Balance.bcs.parse(data) ) }

 toJSONField() { return {

 value: this.value.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): Balance<ToPhantomTypeArgument<T0>> { return Balance.reified( typeArg, ).new( { value: decodeFromJSONField("u64", field.value) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): Balance<ToPhantomTypeArgument<T0>> { if (json.$typeName !== Balance.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeIotaType(Balance.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Balance.fromJSONField( typeArg, json, ) }

 static fromIotaParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: IotaParsedData ): Balance<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBalance(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Balance object`); } return Balance.fromFieldsWithTypes( typeArg, content ); }

 static fromIotaObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: IotaObjectData ): Balance<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBalance(data.bcs.type)) { throw new Error(`object at is not a Balance object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressIotaType(gotTypeArgs[0]); const expectedTypeArg = compressIotaType(extractType(typeArg)); if (gotTypeArg !== compressIotaType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Balance.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Balance.fromIotaParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: IotaClient, typeArg: T0, id: string ): Promise<Balance<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Balance object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBalance(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Balance object`); }

 return Balance.fromIotaObjectData( typeArg, res.data ); }

 }

/* ============================== Supply =============================== */

export function isSupply(type: string): boolean { type = compressIotaType(type); return type.startsWith(`${PKG_V3}::balance::Supply` + '<'); }

export interface SupplyFields<T0 extends PhantomTypeArgument> { value: ToField<"u64"> }

export type SupplyReified<T0 extends PhantomTypeArgument> = Reified< Supply<T0>, SupplyFields<T0> >;

export class Supply<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V3}::balance::Supply`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Supply.$typeName; readonly $fullTypeName: `${typeof PKG_V3}::balance::Supply<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = Supply.$isPhantom;

 readonly value: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: SupplyFields<T0>, ) { this.$fullTypeName = composeIotaType( Supply.$typeName, ...typeArgs ) as `${typeof PKG_V3}::balance::Supply<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.value = fields.value; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): SupplyReified<ToPhantomTypeArgument<T0>> { return { typeName: Supply.$typeName, fullTypeName: composeIotaType( Supply.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V3}::balance::Supply<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: Supply.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => Supply.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Supply.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => Supply.fromBcs( T0, data, ), bcs: Supply.bcs, fromJSONField: (field: any) => Supply.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => Supply.fromJSON( T0, json, ), fromIotaParsedData: (content: IotaParsedData) => Supply.fromIotaParsedData( T0, content, ), fromIotaObjectData: (content: IotaObjectData) => Supply.fromIotaObjectData( T0, content, ), fetch: async (client: IotaClient, id: string) => Supply.fetch( client, T0, id, ), new: ( fields: SupplyFields<ToPhantomTypeArgument<T0>>, ) => { return new Supply( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Supply.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<Supply<ToPhantomTypeArgument<T0>>>> { return phantom(Supply.reified( T0 )); } static get p() { return Supply.phantom }

 static get bcs() { return bcs.struct("Supply", {

 value: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): Supply<ToPhantomTypeArgument<T0>> { return Supply.reified( typeArg, ).new( { value: decodeFromFields("u64", fields.value) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): Supply<ToPhantomTypeArgument<T0>> { if (!isSupply(item.type)) { throw new Error("not a Supply type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Supply.reified( typeArg, ).new( { value: decodeFromFieldsWithTypes("u64", item.fields.value) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): Supply<ToPhantomTypeArgument<T0>> { return Supply.fromFields( typeArg, Supply.bcs.parse(data) ) }

 toJSONField() { return {

 value: this.value.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): Supply<ToPhantomTypeArgument<T0>> { return Supply.reified( typeArg, ).new( { value: decodeFromJSONField("u64", field.value) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): Supply<ToPhantomTypeArgument<T0>> { if (json.$typeName !== Supply.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeIotaType(Supply.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Supply.fromJSONField( typeArg, json, ) }

 static fromIotaParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: IotaParsedData ): Supply<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isSupply(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Supply object`); } return Supply.fromFieldsWithTypes( typeArg, content ); }

 static fromIotaObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: IotaObjectData ): Supply<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isSupply(data.bcs.type)) { throw new Error(`object at is not a Supply object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressIotaType(gotTypeArgs[0]); const expectedTypeArg = compressIotaType(extractType(typeArg)); if (gotTypeArg !== compressIotaType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Supply.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Supply.fromIotaParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: IotaClient, typeArg: T0, id: string ): Promise<Supply<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Supply object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isSupply(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Supply object`); }

 return Supply.fromIotaObjectData( typeArg, res.data ); }

 }
