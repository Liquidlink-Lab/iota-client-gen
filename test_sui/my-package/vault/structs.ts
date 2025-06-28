import * as reified from "../../_framework/reified";
import {ObjectBag} from "../../_dependencies/onchain/0x2/object-bag/structs";
import {ID, UID} from "../../_dependencies/onchain/0x2/object/structs";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeArgument, ToTypeStr, TypeArgument, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../_framework/util";
import {Vector} from "../../_framework/vector";
import {PKG_V1} from "../index";
import {BcsType, bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== VaultCreatedEvent =============================== */

export function isVaultCreatedEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::VaultCreatedEvent`; }

export interface VaultCreatedEventFields { vaultId: ToField<ID>; creator: ToField<"address">; maxReceivers: ToField<"u64"> }

export type VaultCreatedEventReified = Reified< VaultCreatedEvent, VaultCreatedEventFields >;

export class VaultCreatedEvent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::VaultCreatedEvent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = VaultCreatedEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::VaultCreatedEvent`; readonly $typeArgs: []; readonly $isPhantom = VaultCreatedEvent.$isPhantom;

 readonly vaultId: ToField<ID>; readonly creator: ToField<"address">; readonly maxReceivers: ToField<"u64">

 private constructor(typeArgs: [], fields: VaultCreatedEventFields, ) { this.$fullTypeName = composeSuiType( VaultCreatedEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::VaultCreatedEvent`; this.$typeArgs = typeArgs;

 this.vaultId = fields.vaultId;; this.creator = fields.creator;; this.maxReceivers = fields.maxReceivers; }

 static reified( ): VaultCreatedEventReified { return { typeName: VaultCreatedEvent.$typeName, fullTypeName: composeSuiType( VaultCreatedEvent.$typeName, ...[] ) as `${typeof PKG_V1}::vault::VaultCreatedEvent`, typeArgs: [ ] as [], isPhantom: VaultCreatedEvent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => VaultCreatedEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => VaultCreatedEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => VaultCreatedEvent.fromBcs( data, ), bcs: VaultCreatedEvent.bcs, fromJSONField: (field: any) => VaultCreatedEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => VaultCreatedEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => VaultCreatedEvent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => VaultCreatedEvent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => VaultCreatedEvent.fetch( client, id, ), new: ( fields: VaultCreatedEventFields, ) => { return new VaultCreatedEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return VaultCreatedEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<VaultCreatedEvent>> { return phantom(VaultCreatedEvent.reified( )); } static get p() { return VaultCreatedEvent.phantom() }

 static get bcs() { return bcs.struct("VaultCreatedEvent", {

 vault_id: ID.bcs, creator: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), max_receivers: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): VaultCreatedEvent { return VaultCreatedEvent.reified( ).new( { vaultId: decodeFromFields(ID.reified(), fields.vault_id), creator: decodeFromFields("address", fields.creator), maxReceivers: decodeFromFields("u64", fields.max_receivers) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): VaultCreatedEvent { if (!isVaultCreatedEvent(item.type)) { throw new Error("not a VaultCreatedEvent type");

 }

 return VaultCreatedEvent.reified( ).new( { vaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_id), creator: decodeFromFieldsWithTypes("address", item.fields.creator), maxReceivers: decodeFromFieldsWithTypes("u64", item.fields.max_receivers) } ) }

 static fromBcs( data: Uint8Array ): VaultCreatedEvent { return VaultCreatedEvent.fromFields( VaultCreatedEvent.bcs.parse(data) ) }

 toJSONField() { return {

 vaultId: this.vaultId,creator: this.creator,maxReceivers: this.maxReceivers.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): VaultCreatedEvent { return VaultCreatedEvent.reified( ).new( { vaultId: decodeFromJSONField(ID.reified(), field.vaultId), creator: decodeFromJSONField("address", field.creator), maxReceivers: decodeFromJSONField("u64", field.maxReceivers) } ) }

 static fromJSON( json: Record<string, any> ): VaultCreatedEvent { if (json.$typeName !== VaultCreatedEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return VaultCreatedEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): VaultCreatedEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVaultCreatedEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a VaultCreatedEvent object`); } return VaultCreatedEvent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): VaultCreatedEvent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isVaultCreatedEvent(data.bcs.type)) { throw new Error(`object at is not a VaultCreatedEvent object`); }

 return VaultCreatedEvent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return VaultCreatedEvent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<VaultCreatedEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching VaultCreatedEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isVaultCreatedEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a VaultCreatedEvent object`); }

 return VaultCreatedEvent.fromSuiObjectData( res.data ); }

 }

/* ============================== CoinAddedEvent =============================== */

export function isCoinAddedEvent(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::vault::CoinAddedEvent` + '<'); }

export interface CoinAddedEventFields<T0 extends PhantomTypeArgument> { vaultId: ToField<ID>; index: ToField<"u64">; coinValue: ToField<"u64"> }

export type CoinAddedEventReified<T0 extends PhantomTypeArgument> = Reified< CoinAddedEvent<T0>, CoinAddedEventFields<T0> >;

export class CoinAddedEvent<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::CoinAddedEvent`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = CoinAddedEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::CoinAddedEvent<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = CoinAddedEvent.$isPhantom;

 readonly vaultId: ToField<ID>; readonly index: ToField<"u64">; readonly coinValue: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: CoinAddedEventFields<T0>, ) { this.$fullTypeName = composeSuiType( CoinAddedEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::CoinAddedEvent<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.vaultId = fields.vaultId;; this.index = fields.index;; this.coinValue = fields.coinValue; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): CoinAddedEventReified<ToPhantomTypeArgument<T0>> { return { typeName: CoinAddedEvent.$typeName, fullTypeName: composeSuiType( CoinAddedEvent.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::vault::CoinAddedEvent<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: CoinAddedEvent.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => CoinAddedEvent.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CoinAddedEvent.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => CoinAddedEvent.fromBcs( T0, data, ), bcs: CoinAddedEvent.bcs, fromJSONField: (field: any) => CoinAddedEvent.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => CoinAddedEvent.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => CoinAddedEvent.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => CoinAddedEvent.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => CoinAddedEvent.fetch( client, T0, id, ), new: ( fields: CoinAddedEventFields<ToPhantomTypeArgument<T0>>, ) => { return new CoinAddedEvent( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return CoinAddedEvent.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<CoinAddedEvent<ToPhantomTypeArgument<T0>>>> { return phantom(CoinAddedEvent.reified( T0 )); } static get p() { return CoinAddedEvent.phantom }

 static get bcs() { return bcs.struct("CoinAddedEvent", {

 vault_id: ID.bcs, index: bcs.u64(), coin_value: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): CoinAddedEvent<ToPhantomTypeArgument<T0>> { return CoinAddedEvent.reified( typeArg, ).new( { vaultId: decodeFromFields(ID.reified(), fields.vault_id), index: decodeFromFields("u64", fields.index), coinValue: decodeFromFields("u64", fields.coin_value) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): CoinAddedEvent<ToPhantomTypeArgument<T0>> { if (!isCoinAddedEvent(item.type)) { throw new Error("not a CoinAddedEvent type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return CoinAddedEvent.reified( typeArg, ).new( { vaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_id), index: decodeFromFieldsWithTypes("u64", item.fields.index), coinValue: decodeFromFieldsWithTypes("u64", item.fields.coin_value) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): CoinAddedEvent<ToPhantomTypeArgument<T0>> { return CoinAddedEvent.fromFields( typeArg, CoinAddedEvent.bcs.parse(data) ) }

 toJSONField() { return {

 vaultId: this.vaultId,index: this.index.toString(),coinValue: this.coinValue.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): CoinAddedEvent<ToPhantomTypeArgument<T0>> { return CoinAddedEvent.reified( typeArg, ).new( { vaultId: decodeFromJSONField(ID.reified(), field.vaultId), index: decodeFromJSONField("u64", field.index), coinValue: decodeFromJSONField("u64", field.coinValue) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): CoinAddedEvent<ToPhantomTypeArgument<T0>> { if (json.$typeName !== CoinAddedEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(CoinAddedEvent.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return CoinAddedEvent.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): CoinAddedEvent<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCoinAddedEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CoinAddedEvent object`); } return CoinAddedEvent.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): CoinAddedEvent<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCoinAddedEvent(data.bcs.type)) { throw new Error(`object at is not a CoinAddedEvent object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return CoinAddedEvent.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CoinAddedEvent.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<CoinAddedEvent<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CoinAddedEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCoinAddedEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CoinAddedEvent object`); }

 return CoinAddedEvent.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== ObjectsAddedEvent =============================== */

export function isObjectsAddedEvent(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::vault::ObjectsAddedEvent` + '<'); }

export interface ObjectsAddedEventFields<T0 extends PhantomTypeArgument> { vaultId: ToField<ID>; index: ToField<"u64">; totalItems: ToField<"u64">; itemsPerReceiver: ToField<"u64"> }

export type ObjectsAddedEventReified<T0 extends PhantomTypeArgument> = Reified< ObjectsAddedEvent<T0>, ObjectsAddedEventFields<T0> >;

export class ObjectsAddedEvent<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::ObjectsAddedEvent`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = ObjectsAddedEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::ObjectsAddedEvent<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = ObjectsAddedEvent.$isPhantom;

 readonly vaultId: ToField<ID>; readonly index: ToField<"u64">; readonly totalItems: ToField<"u64">; readonly itemsPerReceiver: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: ObjectsAddedEventFields<T0>, ) { this.$fullTypeName = composeSuiType( ObjectsAddedEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::ObjectsAddedEvent<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.vaultId = fields.vaultId;; this.index = fields.index;; this.totalItems = fields.totalItems;; this.itemsPerReceiver = fields.itemsPerReceiver; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): ObjectsAddedEventReified<ToPhantomTypeArgument<T0>> { return { typeName: ObjectsAddedEvent.$typeName, fullTypeName: composeSuiType( ObjectsAddedEvent.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::vault::ObjectsAddedEvent<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: ObjectsAddedEvent.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => ObjectsAddedEvent.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ObjectsAddedEvent.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => ObjectsAddedEvent.fromBcs( T0, data, ), bcs: ObjectsAddedEvent.bcs, fromJSONField: (field: any) => ObjectsAddedEvent.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => ObjectsAddedEvent.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => ObjectsAddedEvent.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => ObjectsAddedEvent.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => ObjectsAddedEvent.fetch( client, T0, id, ), new: ( fields: ObjectsAddedEventFields<ToPhantomTypeArgument<T0>>, ) => { return new ObjectsAddedEvent( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ObjectsAddedEvent.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<ObjectsAddedEvent<ToPhantomTypeArgument<T0>>>> { return phantom(ObjectsAddedEvent.reified( T0 )); } static get p() { return ObjectsAddedEvent.phantom }

 static get bcs() { return bcs.struct("ObjectsAddedEvent", {

 vault_id: ID.bcs, index: bcs.u64(), total_items: bcs.u64(), items_per_receiver: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): ObjectsAddedEvent<ToPhantomTypeArgument<T0>> { return ObjectsAddedEvent.reified( typeArg, ).new( { vaultId: decodeFromFields(ID.reified(), fields.vault_id), index: decodeFromFields("u64", fields.index), totalItems: decodeFromFields("u64", fields.total_items), itemsPerReceiver: decodeFromFields("u64", fields.items_per_receiver) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): ObjectsAddedEvent<ToPhantomTypeArgument<T0>> { if (!isObjectsAddedEvent(item.type)) { throw new Error("not a ObjectsAddedEvent type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return ObjectsAddedEvent.reified( typeArg, ).new( { vaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_id), index: decodeFromFieldsWithTypes("u64", item.fields.index), totalItems: decodeFromFieldsWithTypes("u64", item.fields.total_items), itemsPerReceiver: decodeFromFieldsWithTypes("u64", item.fields.items_per_receiver) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): ObjectsAddedEvent<ToPhantomTypeArgument<T0>> { return ObjectsAddedEvent.fromFields( typeArg, ObjectsAddedEvent.bcs.parse(data) ) }

 toJSONField() { return {

 vaultId: this.vaultId,index: this.index.toString(),totalItems: this.totalItems.toString(),itemsPerReceiver: this.itemsPerReceiver.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): ObjectsAddedEvent<ToPhantomTypeArgument<T0>> { return ObjectsAddedEvent.reified( typeArg, ).new( { vaultId: decodeFromJSONField(ID.reified(), field.vaultId), index: decodeFromJSONField("u64", field.index), totalItems: decodeFromJSONField("u64", field.totalItems), itemsPerReceiver: decodeFromJSONField("u64", field.itemsPerReceiver) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): ObjectsAddedEvent<ToPhantomTypeArgument<T0>> { if (json.$typeName !== ObjectsAddedEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ObjectsAddedEvent.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return ObjectsAddedEvent.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): ObjectsAddedEvent<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isObjectsAddedEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ObjectsAddedEvent object`); } return ObjectsAddedEvent.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): ObjectsAddedEvent<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isObjectsAddedEvent(data.bcs.type)) { throw new Error(`object at is not a ObjectsAddedEvent object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return ObjectsAddedEvent.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ObjectsAddedEvent.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<ObjectsAddedEvent<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ObjectsAddedEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isObjectsAddedEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ObjectsAddedEvent object`); }

 return ObjectsAddedEvent.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== CoinWithdrawnEvent =============================== */

export function isCoinWithdrawnEvent(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::vault::CoinWithdrawnEvent` + '<'); }

export interface CoinWithdrawnEventFields<T0 extends PhantomTypeArgument> { vaultId: ToField<ID>; index: ToField<"u64">; coinValue: ToField<"u64"> }

export type CoinWithdrawnEventReified<T0 extends PhantomTypeArgument> = Reified< CoinWithdrawnEvent<T0>, CoinWithdrawnEventFields<T0> >;

export class CoinWithdrawnEvent<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::CoinWithdrawnEvent`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = CoinWithdrawnEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::CoinWithdrawnEvent<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = CoinWithdrawnEvent.$isPhantom;

 readonly vaultId: ToField<ID>; readonly index: ToField<"u64">; readonly coinValue: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: CoinWithdrawnEventFields<T0>, ) { this.$fullTypeName = composeSuiType( CoinWithdrawnEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::CoinWithdrawnEvent<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.vaultId = fields.vaultId;; this.index = fields.index;; this.coinValue = fields.coinValue; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): CoinWithdrawnEventReified<ToPhantomTypeArgument<T0>> { return { typeName: CoinWithdrawnEvent.$typeName, fullTypeName: composeSuiType( CoinWithdrawnEvent.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::vault::CoinWithdrawnEvent<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: CoinWithdrawnEvent.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => CoinWithdrawnEvent.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CoinWithdrawnEvent.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => CoinWithdrawnEvent.fromBcs( T0, data, ), bcs: CoinWithdrawnEvent.bcs, fromJSONField: (field: any) => CoinWithdrawnEvent.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => CoinWithdrawnEvent.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => CoinWithdrawnEvent.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => CoinWithdrawnEvent.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => CoinWithdrawnEvent.fetch( client, T0, id, ), new: ( fields: CoinWithdrawnEventFields<ToPhantomTypeArgument<T0>>, ) => { return new CoinWithdrawnEvent( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return CoinWithdrawnEvent.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<CoinWithdrawnEvent<ToPhantomTypeArgument<T0>>>> { return phantom(CoinWithdrawnEvent.reified( T0 )); } static get p() { return CoinWithdrawnEvent.phantom }

 static get bcs() { return bcs.struct("CoinWithdrawnEvent", {

 vault_id: ID.bcs, index: bcs.u64(), coin_value: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): CoinWithdrawnEvent<ToPhantomTypeArgument<T0>> { return CoinWithdrawnEvent.reified( typeArg, ).new( { vaultId: decodeFromFields(ID.reified(), fields.vault_id), index: decodeFromFields("u64", fields.index), coinValue: decodeFromFields("u64", fields.coin_value) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): CoinWithdrawnEvent<ToPhantomTypeArgument<T0>> { if (!isCoinWithdrawnEvent(item.type)) { throw new Error("not a CoinWithdrawnEvent type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return CoinWithdrawnEvent.reified( typeArg, ).new( { vaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_id), index: decodeFromFieldsWithTypes("u64", item.fields.index), coinValue: decodeFromFieldsWithTypes("u64", item.fields.coin_value) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): CoinWithdrawnEvent<ToPhantomTypeArgument<T0>> { return CoinWithdrawnEvent.fromFields( typeArg, CoinWithdrawnEvent.bcs.parse(data) ) }

 toJSONField() { return {

 vaultId: this.vaultId,index: this.index.toString(),coinValue: this.coinValue.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): CoinWithdrawnEvent<ToPhantomTypeArgument<T0>> { return CoinWithdrawnEvent.reified( typeArg, ).new( { vaultId: decodeFromJSONField(ID.reified(), field.vaultId), index: decodeFromJSONField("u64", field.index), coinValue: decodeFromJSONField("u64", field.coinValue) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): CoinWithdrawnEvent<ToPhantomTypeArgument<T0>> { if (json.$typeName !== CoinWithdrawnEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(CoinWithdrawnEvent.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return CoinWithdrawnEvent.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): CoinWithdrawnEvent<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCoinWithdrawnEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CoinWithdrawnEvent object`); } return CoinWithdrawnEvent.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): CoinWithdrawnEvent<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCoinWithdrawnEvent(data.bcs.type)) { throw new Error(`object at is not a CoinWithdrawnEvent object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return CoinWithdrawnEvent.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CoinWithdrawnEvent.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<CoinWithdrawnEvent<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CoinWithdrawnEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCoinWithdrawnEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CoinWithdrawnEvent object`); }

 return CoinWithdrawnEvent.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== ObjectsWithdrawnEvent =============================== */

export function isObjectsWithdrawnEvent(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::vault::ObjectsWithdrawnEvent` + '<'); }

export interface ObjectsWithdrawnEventFields<T0 extends PhantomTypeArgument> { vaultId: ToField<ID>; index: ToField<"u64">; totalItems: ToField<"u64"> }

export type ObjectsWithdrawnEventReified<T0 extends PhantomTypeArgument> = Reified< ObjectsWithdrawnEvent<T0>, ObjectsWithdrawnEventFields<T0> >;

export class ObjectsWithdrawnEvent<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::ObjectsWithdrawnEvent`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = ObjectsWithdrawnEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::ObjectsWithdrawnEvent<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = ObjectsWithdrawnEvent.$isPhantom;

 readonly vaultId: ToField<ID>; readonly index: ToField<"u64">; readonly totalItems: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: ObjectsWithdrawnEventFields<T0>, ) { this.$fullTypeName = composeSuiType( ObjectsWithdrawnEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::ObjectsWithdrawnEvent<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.vaultId = fields.vaultId;; this.index = fields.index;; this.totalItems = fields.totalItems; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): ObjectsWithdrawnEventReified<ToPhantomTypeArgument<T0>> { return { typeName: ObjectsWithdrawnEvent.$typeName, fullTypeName: composeSuiType( ObjectsWithdrawnEvent.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::vault::ObjectsWithdrawnEvent<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: ObjectsWithdrawnEvent.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => ObjectsWithdrawnEvent.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ObjectsWithdrawnEvent.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => ObjectsWithdrawnEvent.fromBcs( T0, data, ), bcs: ObjectsWithdrawnEvent.bcs, fromJSONField: (field: any) => ObjectsWithdrawnEvent.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => ObjectsWithdrawnEvent.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => ObjectsWithdrawnEvent.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => ObjectsWithdrawnEvent.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => ObjectsWithdrawnEvent.fetch( client, T0, id, ), new: ( fields: ObjectsWithdrawnEventFields<ToPhantomTypeArgument<T0>>, ) => { return new ObjectsWithdrawnEvent( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ObjectsWithdrawnEvent.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<ObjectsWithdrawnEvent<ToPhantomTypeArgument<T0>>>> { return phantom(ObjectsWithdrawnEvent.reified( T0 )); } static get p() { return ObjectsWithdrawnEvent.phantom }

 static get bcs() { return bcs.struct("ObjectsWithdrawnEvent", {

 vault_id: ID.bcs, index: bcs.u64(), total_items: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): ObjectsWithdrawnEvent<ToPhantomTypeArgument<T0>> { return ObjectsWithdrawnEvent.reified( typeArg, ).new( { vaultId: decodeFromFields(ID.reified(), fields.vault_id), index: decodeFromFields("u64", fields.index), totalItems: decodeFromFields("u64", fields.total_items) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): ObjectsWithdrawnEvent<ToPhantomTypeArgument<T0>> { if (!isObjectsWithdrawnEvent(item.type)) { throw new Error("not a ObjectsWithdrawnEvent type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return ObjectsWithdrawnEvent.reified( typeArg, ).new( { vaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_id), index: decodeFromFieldsWithTypes("u64", item.fields.index), totalItems: decodeFromFieldsWithTypes("u64", item.fields.total_items) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): ObjectsWithdrawnEvent<ToPhantomTypeArgument<T0>> { return ObjectsWithdrawnEvent.fromFields( typeArg, ObjectsWithdrawnEvent.bcs.parse(data) ) }

 toJSONField() { return {

 vaultId: this.vaultId,index: this.index.toString(),totalItems: this.totalItems.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): ObjectsWithdrawnEvent<ToPhantomTypeArgument<T0>> { return ObjectsWithdrawnEvent.reified( typeArg, ).new( { vaultId: decodeFromJSONField(ID.reified(), field.vaultId), index: decodeFromJSONField("u64", field.index), totalItems: decodeFromJSONField("u64", field.totalItems) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): ObjectsWithdrawnEvent<ToPhantomTypeArgument<T0>> { if (json.$typeName !== ObjectsWithdrawnEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ObjectsWithdrawnEvent.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return ObjectsWithdrawnEvent.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): ObjectsWithdrawnEvent<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isObjectsWithdrawnEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ObjectsWithdrawnEvent object`); } return ObjectsWithdrawnEvent.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): ObjectsWithdrawnEvent<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isObjectsWithdrawnEvent(data.bcs.type)) { throw new Error(`object at is not a ObjectsWithdrawnEvent object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return ObjectsWithdrawnEvent.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ObjectsWithdrawnEvent.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<ObjectsWithdrawnEvent<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ObjectsWithdrawnEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isObjectsWithdrawnEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ObjectsWithdrawnEvent object`); }

 return ObjectsWithdrawnEvent.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== CoinGivenEvent =============================== */

export function isCoinGivenEvent(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::vault::CoinGivenEvent` + '<'); }

export interface CoinGivenEventFields<T0 extends PhantomTypeArgument> { vaultId: ToField<ID>; index: ToField<"u64">; receiver: ToField<"address">; receivedCount: ToField<"u64">; remainingCount: ToField<"u64">; coinValue: ToField<"u64"> }

export type CoinGivenEventReified<T0 extends PhantomTypeArgument> = Reified< CoinGivenEvent<T0>, CoinGivenEventFields<T0> >;

export class CoinGivenEvent<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::CoinGivenEvent`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = CoinGivenEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::CoinGivenEvent<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = CoinGivenEvent.$isPhantom;

 readonly vaultId: ToField<ID>; readonly index: ToField<"u64">; readonly receiver: ToField<"address">; readonly receivedCount: ToField<"u64">; readonly remainingCount: ToField<"u64">; readonly coinValue: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: CoinGivenEventFields<T0>, ) { this.$fullTypeName = composeSuiType( CoinGivenEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::CoinGivenEvent<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.vaultId = fields.vaultId;; this.index = fields.index;; this.receiver = fields.receiver;; this.receivedCount = fields.receivedCount;; this.remainingCount = fields.remainingCount;; this.coinValue = fields.coinValue; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): CoinGivenEventReified<ToPhantomTypeArgument<T0>> { return { typeName: CoinGivenEvent.$typeName, fullTypeName: composeSuiType( CoinGivenEvent.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::vault::CoinGivenEvent<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: CoinGivenEvent.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => CoinGivenEvent.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CoinGivenEvent.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => CoinGivenEvent.fromBcs( T0, data, ), bcs: CoinGivenEvent.bcs, fromJSONField: (field: any) => CoinGivenEvent.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => CoinGivenEvent.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => CoinGivenEvent.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => CoinGivenEvent.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => CoinGivenEvent.fetch( client, T0, id, ), new: ( fields: CoinGivenEventFields<ToPhantomTypeArgument<T0>>, ) => { return new CoinGivenEvent( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return CoinGivenEvent.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<CoinGivenEvent<ToPhantomTypeArgument<T0>>>> { return phantom(CoinGivenEvent.reified( T0 )); } static get p() { return CoinGivenEvent.phantom }

 static get bcs() { return bcs.struct("CoinGivenEvent", {

 vault_id: ID.bcs, index: bcs.u64(), receiver: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), received_count: bcs.u64(), remaining_count: bcs.u64(), coin_value: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): CoinGivenEvent<ToPhantomTypeArgument<T0>> { return CoinGivenEvent.reified( typeArg, ).new( { vaultId: decodeFromFields(ID.reified(), fields.vault_id), index: decodeFromFields("u64", fields.index), receiver: decodeFromFields("address", fields.receiver), receivedCount: decodeFromFields("u64", fields.received_count), remainingCount: decodeFromFields("u64", fields.remaining_count), coinValue: decodeFromFields("u64", fields.coin_value) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): CoinGivenEvent<ToPhantomTypeArgument<T0>> { if (!isCoinGivenEvent(item.type)) { throw new Error("not a CoinGivenEvent type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return CoinGivenEvent.reified( typeArg, ).new( { vaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_id), index: decodeFromFieldsWithTypes("u64", item.fields.index), receiver: decodeFromFieldsWithTypes("address", item.fields.receiver), receivedCount: decodeFromFieldsWithTypes("u64", item.fields.received_count), remainingCount: decodeFromFieldsWithTypes("u64", item.fields.remaining_count), coinValue: decodeFromFieldsWithTypes("u64", item.fields.coin_value) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): CoinGivenEvent<ToPhantomTypeArgument<T0>> { return CoinGivenEvent.fromFields( typeArg, CoinGivenEvent.bcs.parse(data) ) }

 toJSONField() { return {

 vaultId: this.vaultId,index: this.index.toString(),receiver: this.receiver,receivedCount: this.receivedCount.toString(),remainingCount: this.remainingCount.toString(),coinValue: this.coinValue.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): CoinGivenEvent<ToPhantomTypeArgument<T0>> { return CoinGivenEvent.reified( typeArg, ).new( { vaultId: decodeFromJSONField(ID.reified(), field.vaultId), index: decodeFromJSONField("u64", field.index), receiver: decodeFromJSONField("address", field.receiver), receivedCount: decodeFromJSONField("u64", field.receivedCount), remainingCount: decodeFromJSONField("u64", field.remainingCount), coinValue: decodeFromJSONField("u64", field.coinValue) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): CoinGivenEvent<ToPhantomTypeArgument<T0>> { if (json.$typeName !== CoinGivenEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(CoinGivenEvent.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return CoinGivenEvent.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): CoinGivenEvent<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCoinGivenEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CoinGivenEvent object`); } return CoinGivenEvent.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): CoinGivenEvent<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCoinGivenEvent(data.bcs.type)) { throw new Error(`object at is not a CoinGivenEvent object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return CoinGivenEvent.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CoinGivenEvent.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<CoinGivenEvent<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CoinGivenEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCoinGivenEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CoinGivenEvent object`); }

 return CoinGivenEvent.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== ObjectsGivenEvent =============================== */

export function isObjectsGivenEvent(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::vault::ObjectsGivenEvent` + '<'); }

export interface ObjectsGivenEventFields<T0 extends PhantomTypeArgument> { vaultId: ToField<ID>; index: ToField<"u64">; receiver: ToField<"address">; receivedCount: ToField<"u64">; remainingCount: ToField<"u64">; amount: ToField<"u64"> }

export type ObjectsGivenEventReified<T0 extends PhantomTypeArgument> = Reified< ObjectsGivenEvent<T0>, ObjectsGivenEventFields<T0> >;

export class ObjectsGivenEvent<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::ObjectsGivenEvent`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = ObjectsGivenEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::ObjectsGivenEvent<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = ObjectsGivenEvent.$isPhantom;

 readonly vaultId: ToField<ID>; readonly index: ToField<"u64">; readonly receiver: ToField<"address">; readonly receivedCount: ToField<"u64">; readonly remainingCount: ToField<"u64">; readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: ObjectsGivenEventFields<T0>, ) { this.$fullTypeName = composeSuiType( ObjectsGivenEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::ObjectsGivenEvent<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.vaultId = fields.vaultId;; this.index = fields.index;; this.receiver = fields.receiver;; this.receivedCount = fields.receivedCount;; this.remainingCount = fields.remainingCount;; this.amount = fields.amount; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): ObjectsGivenEventReified<ToPhantomTypeArgument<T0>> { return { typeName: ObjectsGivenEvent.$typeName, fullTypeName: composeSuiType( ObjectsGivenEvent.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::vault::ObjectsGivenEvent<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: ObjectsGivenEvent.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => ObjectsGivenEvent.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ObjectsGivenEvent.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => ObjectsGivenEvent.fromBcs( T0, data, ), bcs: ObjectsGivenEvent.bcs, fromJSONField: (field: any) => ObjectsGivenEvent.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => ObjectsGivenEvent.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => ObjectsGivenEvent.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => ObjectsGivenEvent.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => ObjectsGivenEvent.fetch( client, T0, id, ), new: ( fields: ObjectsGivenEventFields<ToPhantomTypeArgument<T0>>, ) => { return new ObjectsGivenEvent( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ObjectsGivenEvent.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<ObjectsGivenEvent<ToPhantomTypeArgument<T0>>>> { return phantom(ObjectsGivenEvent.reified( T0 )); } static get p() { return ObjectsGivenEvent.phantom }

 static get bcs() { return bcs.struct("ObjectsGivenEvent", {

 vault_id: ID.bcs, index: bcs.u64(), receiver: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), received_count: bcs.u64(), remaining_count: bcs.u64(), amount: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): ObjectsGivenEvent<ToPhantomTypeArgument<T0>> { return ObjectsGivenEvent.reified( typeArg, ).new( { vaultId: decodeFromFields(ID.reified(), fields.vault_id), index: decodeFromFields("u64", fields.index), receiver: decodeFromFields("address", fields.receiver), receivedCount: decodeFromFields("u64", fields.received_count), remainingCount: decodeFromFields("u64", fields.remaining_count), amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): ObjectsGivenEvent<ToPhantomTypeArgument<T0>> { if (!isObjectsGivenEvent(item.type)) { throw new Error("not a ObjectsGivenEvent type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return ObjectsGivenEvent.reified( typeArg, ).new( { vaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_id), index: decodeFromFieldsWithTypes("u64", item.fields.index), receiver: decodeFromFieldsWithTypes("address", item.fields.receiver), receivedCount: decodeFromFieldsWithTypes("u64", item.fields.received_count), remainingCount: decodeFromFieldsWithTypes("u64", item.fields.remaining_count), amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): ObjectsGivenEvent<ToPhantomTypeArgument<T0>> { return ObjectsGivenEvent.fromFields( typeArg, ObjectsGivenEvent.bcs.parse(data) ) }

 toJSONField() { return {

 vaultId: this.vaultId,index: this.index.toString(),receiver: this.receiver,receivedCount: this.receivedCount.toString(),remainingCount: this.remainingCount.toString(),amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): ObjectsGivenEvent<ToPhantomTypeArgument<T0>> { return ObjectsGivenEvent.reified( typeArg, ).new( { vaultId: decodeFromJSONField(ID.reified(), field.vaultId), index: decodeFromJSONField("u64", field.index), receiver: decodeFromJSONField("address", field.receiver), receivedCount: decodeFromJSONField("u64", field.receivedCount), remainingCount: decodeFromJSONField("u64", field.remainingCount), amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): ObjectsGivenEvent<ToPhantomTypeArgument<T0>> { if (json.$typeName !== ObjectsGivenEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ObjectsGivenEvent.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return ObjectsGivenEvent.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): ObjectsGivenEvent<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isObjectsGivenEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ObjectsGivenEvent object`); } return ObjectsGivenEvent.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): ObjectsGivenEvent<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isObjectsGivenEvent(data.bcs.type)) { throw new Error(`object at is not a ObjectsGivenEvent object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return ObjectsGivenEvent.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ObjectsGivenEvent.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<ObjectsGivenEvent<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ObjectsGivenEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isObjectsGivenEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ObjectsGivenEvent object`); }

 return ObjectsGivenEvent.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== NumberOfReceiversUpdatedEvent =============================== */

export function isNumberOfReceiversUpdatedEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::NumberOfReceiversUpdatedEvent`; }

export interface NumberOfReceiversUpdatedEventFields { vaultId: ToField<ID>; oldNumberOfReceivers: ToField<"u64">; newNumberOfReceivers: ToField<"u64"> }

export type NumberOfReceiversUpdatedEventReified = Reified< NumberOfReceiversUpdatedEvent, NumberOfReceiversUpdatedEventFields >;

export class NumberOfReceiversUpdatedEvent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::NumberOfReceiversUpdatedEvent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = NumberOfReceiversUpdatedEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::NumberOfReceiversUpdatedEvent`; readonly $typeArgs: []; readonly $isPhantom = NumberOfReceiversUpdatedEvent.$isPhantom;

 readonly vaultId: ToField<ID>; readonly oldNumberOfReceivers: ToField<"u64">; readonly newNumberOfReceivers: ToField<"u64">

 private constructor(typeArgs: [], fields: NumberOfReceiversUpdatedEventFields, ) { this.$fullTypeName = composeSuiType( NumberOfReceiversUpdatedEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::NumberOfReceiversUpdatedEvent`; this.$typeArgs = typeArgs;

 this.vaultId = fields.vaultId;; this.oldNumberOfReceivers = fields.oldNumberOfReceivers;; this.newNumberOfReceivers = fields.newNumberOfReceivers; }

 static reified( ): NumberOfReceiversUpdatedEventReified { return { typeName: NumberOfReceiversUpdatedEvent.$typeName, fullTypeName: composeSuiType( NumberOfReceiversUpdatedEvent.$typeName, ...[] ) as `${typeof PKG_V1}::vault::NumberOfReceiversUpdatedEvent`, typeArgs: [ ] as [], isPhantom: NumberOfReceiversUpdatedEvent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => NumberOfReceiversUpdatedEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => NumberOfReceiversUpdatedEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => NumberOfReceiversUpdatedEvent.fromBcs( data, ), bcs: NumberOfReceiversUpdatedEvent.bcs, fromJSONField: (field: any) => NumberOfReceiversUpdatedEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => NumberOfReceiversUpdatedEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => NumberOfReceiversUpdatedEvent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => NumberOfReceiversUpdatedEvent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => NumberOfReceiversUpdatedEvent.fetch( client, id, ), new: ( fields: NumberOfReceiversUpdatedEventFields, ) => { return new NumberOfReceiversUpdatedEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return NumberOfReceiversUpdatedEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<NumberOfReceiversUpdatedEvent>> { return phantom(NumberOfReceiversUpdatedEvent.reified( )); } static get p() { return NumberOfReceiversUpdatedEvent.phantom() }

 static get bcs() { return bcs.struct("NumberOfReceiversUpdatedEvent", {

 vault_id: ID.bcs, old_number_of_receivers: bcs.u64(), new_number_of_receivers: bcs.u64()

}) };

 static fromFields( fields: Record<string, any> ): NumberOfReceiversUpdatedEvent { return NumberOfReceiversUpdatedEvent.reified( ).new( { vaultId: decodeFromFields(ID.reified(), fields.vault_id), oldNumberOfReceivers: decodeFromFields("u64", fields.old_number_of_receivers), newNumberOfReceivers: decodeFromFields("u64", fields.new_number_of_receivers) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): NumberOfReceiversUpdatedEvent { if (!isNumberOfReceiversUpdatedEvent(item.type)) { throw new Error("not a NumberOfReceiversUpdatedEvent type");

 }

 return NumberOfReceiversUpdatedEvent.reified( ).new( { vaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_id), oldNumberOfReceivers: decodeFromFieldsWithTypes("u64", item.fields.old_number_of_receivers), newNumberOfReceivers: decodeFromFieldsWithTypes("u64", item.fields.new_number_of_receivers) } ) }

 static fromBcs( data: Uint8Array ): NumberOfReceiversUpdatedEvent { return NumberOfReceiversUpdatedEvent.fromFields( NumberOfReceiversUpdatedEvent.bcs.parse(data) ) }

 toJSONField() { return {

 vaultId: this.vaultId,oldNumberOfReceivers: this.oldNumberOfReceivers.toString(),newNumberOfReceivers: this.newNumberOfReceivers.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): NumberOfReceiversUpdatedEvent { return NumberOfReceiversUpdatedEvent.reified( ).new( { vaultId: decodeFromJSONField(ID.reified(), field.vaultId), oldNumberOfReceivers: decodeFromJSONField("u64", field.oldNumberOfReceivers), newNumberOfReceivers: decodeFromJSONField("u64", field.newNumberOfReceivers) } ) }

 static fromJSON( json: Record<string, any> ): NumberOfReceiversUpdatedEvent { if (json.$typeName !== NumberOfReceiversUpdatedEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return NumberOfReceiversUpdatedEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): NumberOfReceiversUpdatedEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isNumberOfReceiversUpdatedEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a NumberOfReceiversUpdatedEvent object`); } return NumberOfReceiversUpdatedEvent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): NumberOfReceiversUpdatedEvent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isNumberOfReceiversUpdatedEvent(data.bcs.type)) { throw new Error(`object at is not a NumberOfReceiversUpdatedEvent object`); }

 return NumberOfReceiversUpdatedEvent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return NumberOfReceiversUpdatedEvent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<NumberOfReceiversUpdatedEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching NumberOfReceiversUpdatedEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isNumberOfReceiversUpdatedEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a NumberOfReceiversUpdatedEvent object`); }

 return NumberOfReceiversUpdatedEvent.fromSuiObjectData( res.data ); }

 }

/* ============================== VaultDestroyedEvent =============================== */

export function isVaultDestroyedEvent(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::VaultDestroyedEvent`; }

export interface VaultDestroyedEventFields { vaultId: ToField<ID> }

export type VaultDestroyedEventReified = Reified< VaultDestroyedEvent, VaultDestroyedEventFields >;

export class VaultDestroyedEvent implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::VaultDestroyedEvent`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = VaultDestroyedEvent.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::VaultDestroyedEvent`; readonly $typeArgs: []; readonly $isPhantom = VaultDestroyedEvent.$isPhantom;

 readonly vaultId: ToField<ID>

 private constructor(typeArgs: [], fields: VaultDestroyedEventFields, ) { this.$fullTypeName = composeSuiType( VaultDestroyedEvent.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::VaultDestroyedEvent`; this.$typeArgs = typeArgs;

 this.vaultId = fields.vaultId; }

 static reified( ): VaultDestroyedEventReified { return { typeName: VaultDestroyedEvent.$typeName, fullTypeName: composeSuiType( VaultDestroyedEvent.$typeName, ...[] ) as `${typeof PKG_V1}::vault::VaultDestroyedEvent`, typeArgs: [ ] as [], isPhantom: VaultDestroyedEvent.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => VaultDestroyedEvent.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => VaultDestroyedEvent.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => VaultDestroyedEvent.fromBcs( data, ), bcs: VaultDestroyedEvent.bcs, fromJSONField: (field: any) => VaultDestroyedEvent.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => VaultDestroyedEvent.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => VaultDestroyedEvent.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => VaultDestroyedEvent.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => VaultDestroyedEvent.fetch( client, id, ), new: ( fields: VaultDestroyedEventFields, ) => { return new VaultDestroyedEvent( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return VaultDestroyedEvent.reified() }

 static phantom( ): PhantomReified<ToTypeStr<VaultDestroyedEvent>> { return phantom(VaultDestroyedEvent.reified( )); } static get p() { return VaultDestroyedEvent.phantom() }

 static get bcs() { return bcs.struct("VaultDestroyedEvent", {

 vault_id: ID.bcs

}) };

 static fromFields( fields: Record<string, any> ): VaultDestroyedEvent { return VaultDestroyedEvent.reified( ).new( { vaultId: decodeFromFields(ID.reified(), fields.vault_id) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): VaultDestroyedEvent { if (!isVaultDestroyedEvent(item.type)) { throw new Error("not a VaultDestroyedEvent type");

 }

 return VaultDestroyedEvent.reified( ).new( { vaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_id) } ) }

 static fromBcs( data: Uint8Array ): VaultDestroyedEvent { return VaultDestroyedEvent.fromFields( VaultDestroyedEvent.bcs.parse(data) ) }

 toJSONField() { return {

 vaultId: this.vaultId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): VaultDestroyedEvent { return VaultDestroyedEvent.reified( ).new( { vaultId: decodeFromJSONField(ID.reified(), field.vaultId) } ) }

 static fromJSON( json: Record<string, any> ): VaultDestroyedEvent { if (json.$typeName !== VaultDestroyedEvent.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return VaultDestroyedEvent.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): VaultDestroyedEvent { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVaultDestroyedEvent(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a VaultDestroyedEvent object`); } return VaultDestroyedEvent.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): VaultDestroyedEvent { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isVaultDestroyedEvent(data.bcs.type)) { throw new Error(`object at is not a VaultDestroyedEvent object`); }

 return VaultDestroyedEvent.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return VaultDestroyedEvent.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<VaultDestroyedEvent> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching VaultDestroyedEvent object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isVaultDestroyedEvent(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a VaultDestroyedEvent object`); }

 return VaultDestroyedEvent.fromSuiObjectData( res.data ); }

 }

/* ============================== ObjectsWrapper =============================== */

export function isObjectsWrapper(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::vault::ObjectsWrapper` + '<'); }

export interface ObjectsWrapperFields<T0 extends TypeArgument> { id: ToField<UID>; itemsPerReceiver: ToField<"u64">; objects: ToField<Vector<T0>> }

export type ObjectsWrapperReified<T0 extends TypeArgument> = Reified< ObjectsWrapper<T0>, ObjectsWrapperFields<T0> >;

export class ObjectsWrapper<T0 extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::ObjectsWrapper`; static readonly $numTypeParams = 1; static readonly $isPhantom = [false,] as const;

 readonly $typeName = ObjectsWrapper.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::ObjectsWrapper<${ToTypeStr<T0>}>`; readonly $typeArgs: [ToTypeStr<T0>]; readonly $isPhantom = ObjectsWrapper.$isPhantom;

 readonly id: ToField<UID>; readonly itemsPerReceiver: ToField<"u64">; readonly objects: ToField<Vector<T0>>

 private constructor(typeArgs: [ToTypeStr<T0>], fields: ObjectsWrapperFields<T0>, ) { this.$fullTypeName = composeSuiType( ObjectsWrapper.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::ObjectsWrapper<${ToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.itemsPerReceiver = fields.itemsPerReceiver;; this.objects = fields.objects; }

 static reified<T0 extends Reified<TypeArgument, any>>( T0: T0 ): ObjectsWrapperReified<ToTypeArgument<T0>> { return { typeName: ObjectsWrapper.$typeName, fullTypeName: composeSuiType( ObjectsWrapper.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::vault::ObjectsWrapper<${ToTypeStr<ToTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [ToTypeStr<ToTypeArgument<T0>>], isPhantom: ObjectsWrapper.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => ObjectsWrapper.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ObjectsWrapper.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => ObjectsWrapper.fromBcs( T0, data, ), bcs: ObjectsWrapper.bcs(toBcs(T0)), fromJSONField: (field: any) => ObjectsWrapper.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => ObjectsWrapper.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => ObjectsWrapper.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => ObjectsWrapper.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => ObjectsWrapper.fetch( client, T0, id, ), new: ( fields: ObjectsWrapperFields<ToTypeArgument<T0>>, ) => { return new ObjectsWrapper( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ObjectsWrapper.reified }

 static phantom<T0 extends Reified<TypeArgument, any>>( T0: T0 ): PhantomReified<ToTypeStr<ObjectsWrapper<ToTypeArgument<T0>>>> { return phantom(ObjectsWrapper.reified( T0 )); } static get p() { return ObjectsWrapper.phantom }

 static get bcs() { return <T0 extends BcsType<any>>(T0: T0) => bcs.struct(`ObjectsWrapper<${T0.name}>`, {

 id: UID.bcs, items_per_receiver: bcs.u64(), objects: bcs.vector(T0)

}) };

 static fromFields<T0 extends Reified<TypeArgument, any>>( typeArg: T0, fields: Record<string, any> ): ObjectsWrapper<ToTypeArgument<T0>> { return ObjectsWrapper.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), itemsPerReceiver: decodeFromFields("u64", fields.items_per_receiver), objects: decodeFromFields(reified.vector(typeArg), fields.objects) } ) }

 static fromFieldsWithTypes<T0 extends Reified<TypeArgument, any>>( typeArg: T0, item: FieldsWithTypes ): ObjectsWrapper<ToTypeArgument<T0>> { if (!isObjectsWrapper(item.type)) { throw new Error("not a ObjectsWrapper type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return ObjectsWrapper.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), itemsPerReceiver: decodeFromFieldsWithTypes("u64", item.fields.items_per_receiver), objects: decodeFromFieldsWithTypes(reified.vector(typeArg), item.fields.objects) } ) }

 static fromBcs<T0 extends Reified<TypeArgument, any>>( typeArg: T0, data: Uint8Array ): ObjectsWrapper<ToTypeArgument<T0>> { const typeArgs = [typeArg];

 return ObjectsWrapper.fromFields( typeArg, ObjectsWrapper.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 id: this.id,itemsPerReceiver: this.itemsPerReceiver.toString(),objects: fieldToJSON<Vector<T0>>(`vector<${this.$typeArgs[0]}>`, this.objects),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends Reified<TypeArgument, any>>( typeArg: T0, field: any ): ObjectsWrapper<ToTypeArgument<T0>> { return ObjectsWrapper.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), itemsPerReceiver: decodeFromJSONField("u64", field.itemsPerReceiver), objects: decodeFromJSONField(reified.vector(typeArg), field.objects) } ) }

 static fromJSON<T0 extends Reified<TypeArgument, any>>( typeArg: T0, json: Record<string, any> ): ObjectsWrapper<ToTypeArgument<T0>> { if (json.$typeName !== ObjectsWrapper.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ObjectsWrapper.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return ObjectsWrapper.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends Reified<TypeArgument, any>>( typeArg: T0, content: SuiParsedData ): ObjectsWrapper<ToTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isObjectsWrapper(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ObjectsWrapper object`); } return ObjectsWrapper.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends Reified<TypeArgument, any>>( typeArg: T0, data: SuiObjectData ): ObjectsWrapper<ToTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isObjectsWrapper(data.bcs.type)) { throw new Error(`object at is not a ObjectsWrapper object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return ObjectsWrapper.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ObjectsWrapper.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: T0, id: string ): Promise<ObjectsWrapper<ToTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ObjectsWrapper object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isObjectsWrapper(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ObjectsWrapper object`); }

 return ObjectsWrapper.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Vault =============================== */

export function isVault(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::Vault`; }

export interface VaultFields { id: ToField<UID>; maxReceivers: ToField<"u64">; receivedCount: ToField<"u64">; contents: ToField<ObjectBag>; creator: ToField<"address">; manager: ToField<"address">; managerPublicKey: ToField<Vector<"u8">> }

export type VaultReified = Reified< Vault, VaultFields >;

export class Vault implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::Vault`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = Vault.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::Vault`; readonly $typeArgs: []; readonly $isPhantom = Vault.$isPhantom;

 readonly id: ToField<UID>; readonly maxReceivers: ToField<"u64">; readonly receivedCount: ToField<"u64">; readonly contents: ToField<ObjectBag>; readonly creator: ToField<"address">; readonly manager: ToField<"address">; readonly managerPublicKey: ToField<Vector<"u8">>

 private constructor(typeArgs: [], fields: VaultFields, ) { this.$fullTypeName = composeSuiType( Vault.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::Vault`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.maxReceivers = fields.maxReceivers;; this.receivedCount = fields.receivedCount;; this.contents = fields.contents;; this.creator = fields.creator;; this.manager = fields.manager;; this.managerPublicKey = fields.managerPublicKey; }

 static reified( ): VaultReified { return { typeName: Vault.$typeName, fullTypeName: composeSuiType( Vault.$typeName, ...[] ) as `${typeof PKG_V1}::vault::Vault`, typeArgs: [ ] as [], isPhantom: Vault.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Vault.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Vault.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Vault.fromBcs( data, ), bcs: Vault.bcs, fromJSONField: (field: any) => Vault.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Vault.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Vault.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => Vault.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => Vault.fetch( client, id, ), new: ( fields: VaultFields, ) => { return new Vault( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Vault.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Vault>> { return phantom(Vault.reified( )); } static get p() { return Vault.phantom() }

 static get bcs() { return bcs.struct("Vault", {

 id: UID.bcs, max_receivers: bcs.u64(), received_count: bcs.u64(), contents: ObjectBag.bcs, creator: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), manager: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), manager_public_key: bcs.vector(bcs.u8())

}) };

 static fromFields( fields: Record<string, any> ): Vault { return Vault.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), maxReceivers: decodeFromFields("u64", fields.max_receivers), receivedCount: decodeFromFields("u64", fields.received_count), contents: decodeFromFields(ObjectBag.reified(), fields.contents), creator: decodeFromFields("address", fields.creator), manager: decodeFromFields("address", fields.manager), managerPublicKey: decodeFromFields(reified.vector("u8"), fields.manager_public_key) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Vault { if (!isVault(item.type)) { throw new Error("not a Vault type");

 }

 return Vault.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), maxReceivers: decodeFromFieldsWithTypes("u64", item.fields.max_receivers), receivedCount: decodeFromFieldsWithTypes("u64", item.fields.received_count), contents: decodeFromFieldsWithTypes(ObjectBag.reified(), item.fields.contents), creator: decodeFromFieldsWithTypes("address", item.fields.creator), manager: decodeFromFieldsWithTypes("address", item.fields.manager), managerPublicKey: decodeFromFieldsWithTypes(reified.vector("u8"), item.fields.manager_public_key) } ) }

 static fromBcs( data: Uint8Array ): Vault { return Vault.fromFields( Vault.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,maxReceivers: this.maxReceivers.toString(),receivedCount: this.receivedCount.toString(),contents: this.contents.toJSONField(),creator: this.creator,manager: this.manager,managerPublicKey: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.managerPublicKey),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Vault { return Vault.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), maxReceivers: decodeFromJSONField("u64", field.maxReceivers), receivedCount: decodeFromJSONField("u64", field.receivedCount), contents: decodeFromJSONField(ObjectBag.reified(), field.contents), creator: decodeFromJSONField("address", field.creator), manager: decodeFromJSONField("address", field.manager), managerPublicKey: decodeFromJSONField(reified.vector("u8"), field.managerPublicKey) } ) }

 static fromJSON( json: Record<string, any> ): Vault { if (json.$typeName !== Vault.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Vault.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Vault { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isVault(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Vault object`); } return Vault.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): Vault { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isVault(data.bcs.type)) { throw new Error(`object at is not a Vault object`); }

 return Vault.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Vault.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<Vault> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Vault object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isVault(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Vault object`); }

 return Vault.fromSuiObjectData( res.data ); }

 }

/* ============================== ClaimPass =============================== */

export function isClaimPass(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::ClaimPass`; }

export interface ClaimPassFields { vaultId: ToField<ID>; index: ToField<"u64">; receiver: ToField<"address"> }

export type ClaimPassReified = Reified< ClaimPass, ClaimPassFields >;

export class ClaimPass implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::ClaimPass`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ClaimPass.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::ClaimPass`; readonly $typeArgs: []; readonly $isPhantom = ClaimPass.$isPhantom;

 readonly vaultId: ToField<ID>; readonly index: ToField<"u64">; readonly receiver: ToField<"address">

 private constructor(typeArgs: [], fields: ClaimPassFields, ) { this.$fullTypeName = composeSuiType( ClaimPass.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::ClaimPass`; this.$typeArgs = typeArgs;

 this.vaultId = fields.vaultId;; this.index = fields.index;; this.receiver = fields.receiver; }

 static reified( ): ClaimPassReified { return { typeName: ClaimPass.$typeName, fullTypeName: composeSuiType( ClaimPass.$typeName, ...[] ) as `${typeof PKG_V1}::vault::ClaimPass`, typeArgs: [ ] as [], isPhantom: ClaimPass.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ClaimPass.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ClaimPass.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ClaimPass.fromBcs( data, ), bcs: ClaimPass.bcs, fromJSONField: (field: any) => ClaimPass.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ClaimPass.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ClaimPass.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ClaimPass.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ClaimPass.fetch( client, id, ), new: ( fields: ClaimPassFields, ) => { return new ClaimPass( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ClaimPass.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ClaimPass>> { return phantom(ClaimPass.reified( )); } static get p() { return ClaimPass.phantom() }

 static get bcs() { return bcs.struct("ClaimPass", {

 vault_id: ID.bcs, index: bcs.u64(), receiver: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): ClaimPass { return ClaimPass.reified( ).new( { vaultId: decodeFromFields(ID.reified(), fields.vault_id), index: decodeFromFields("u64", fields.index), receiver: decodeFromFields("address", fields.receiver) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ClaimPass { if (!isClaimPass(item.type)) { throw new Error("not a ClaimPass type");

 }

 return ClaimPass.reified( ).new( { vaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_id), index: decodeFromFieldsWithTypes("u64", item.fields.index), receiver: decodeFromFieldsWithTypes("address", item.fields.receiver) } ) }

 static fromBcs( data: Uint8Array ): ClaimPass { return ClaimPass.fromFields( ClaimPass.bcs.parse(data) ) }

 toJSONField() { return {

 vaultId: this.vaultId,index: this.index.toString(),receiver: this.receiver,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ClaimPass { return ClaimPass.reified( ).new( { vaultId: decodeFromJSONField(ID.reified(), field.vaultId), index: decodeFromJSONField("u64", field.index), receiver: decodeFromJSONField("address", field.receiver) } ) }

 static fromJSON( json: Record<string, any> ): ClaimPass { if (json.$typeName !== ClaimPass.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ClaimPass.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ClaimPass { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isClaimPass(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ClaimPass object`); } return ClaimPass.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ClaimPass { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isClaimPass(data.bcs.type)) { throw new Error(`object at is not a ClaimPass object`); }

 return ClaimPass.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ClaimPass.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ClaimPass> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ClaimPass object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isClaimPass(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ClaimPass object`); }

 return ClaimPass.fromSuiObjectData( res.data ); }

 }

/* ============================== ClaimPassVerifyMessage =============================== */

export function isClaimPassVerifyMessage(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::vault::ClaimPassVerifyMessage`; }

export interface ClaimPassVerifyMessageFields { vaultId: ToField<ID>; receiver: ToField<"address"> }

export type ClaimPassVerifyMessageReified = Reified< ClaimPassVerifyMessage, ClaimPassVerifyMessageFields >;

export class ClaimPassVerifyMessage implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::vault::ClaimPassVerifyMessage`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = ClaimPassVerifyMessage.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::vault::ClaimPassVerifyMessage`; readonly $typeArgs: []; readonly $isPhantom = ClaimPassVerifyMessage.$isPhantom;

 readonly vaultId: ToField<ID>; readonly receiver: ToField<"address">

 private constructor(typeArgs: [], fields: ClaimPassVerifyMessageFields, ) { this.$fullTypeName = composeSuiType( ClaimPassVerifyMessage.$typeName, ...typeArgs ) as `${typeof PKG_V1}::vault::ClaimPassVerifyMessage`; this.$typeArgs = typeArgs;

 this.vaultId = fields.vaultId;; this.receiver = fields.receiver; }

 static reified( ): ClaimPassVerifyMessageReified { return { typeName: ClaimPassVerifyMessage.$typeName, fullTypeName: composeSuiType( ClaimPassVerifyMessage.$typeName, ...[] ) as `${typeof PKG_V1}::vault::ClaimPassVerifyMessage`, typeArgs: [ ] as [], isPhantom: ClaimPassVerifyMessage.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => ClaimPassVerifyMessage.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ClaimPassVerifyMessage.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => ClaimPassVerifyMessage.fromBcs( data, ), bcs: ClaimPassVerifyMessage.bcs, fromJSONField: (field: any) => ClaimPassVerifyMessage.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => ClaimPassVerifyMessage.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => ClaimPassVerifyMessage.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => ClaimPassVerifyMessage.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => ClaimPassVerifyMessage.fetch( client, id, ), new: ( fields: ClaimPassVerifyMessageFields, ) => { return new ClaimPassVerifyMessage( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return ClaimPassVerifyMessage.reified() }

 static phantom( ): PhantomReified<ToTypeStr<ClaimPassVerifyMessage>> { return phantom(ClaimPassVerifyMessage.reified( )); } static get p() { return ClaimPassVerifyMessage.phantom() }

 static get bcs() { return bcs.struct("ClaimPassVerifyMessage", {

 vault_id: ID.bcs, receiver: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields( fields: Record<string, any> ): ClaimPassVerifyMessage { return ClaimPassVerifyMessage.reified( ).new( { vaultId: decodeFromFields(ID.reified(), fields.vault_id), receiver: decodeFromFields("address", fields.receiver) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): ClaimPassVerifyMessage { if (!isClaimPassVerifyMessage(item.type)) { throw new Error("not a ClaimPassVerifyMessage type");

 }

 return ClaimPassVerifyMessage.reified( ).new( { vaultId: decodeFromFieldsWithTypes(ID.reified(), item.fields.vault_id), receiver: decodeFromFieldsWithTypes("address", item.fields.receiver) } ) }

 static fromBcs( data: Uint8Array ): ClaimPassVerifyMessage { return ClaimPassVerifyMessage.fromFields( ClaimPassVerifyMessage.bcs.parse(data) ) }

 toJSONField() { return {

 vaultId: this.vaultId,receiver: this.receiver,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): ClaimPassVerifyMessage { return ClaimPassVerifyMessage.reified( ).new( { vaultId: decodeFromJSONField(ID.reified(), field.vaultId), receiver: decodeFromJSONField("address", field.receiver) } ) }

 static fromJSON( json: Record<string, any> ): ClaimPassVerifyMessage { if (json.$typeName !== ClaimPassVerifyMessage.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return ClaimPassVerifyMessage.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): ClaimPassVerifyMessage { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isClaimPassVerifyMessage(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ClaimPassVerifyMessage object`); } return ClaimPassVerifyMessage.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): ClaimPassVerifyMessage { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isClaimPassVerifyMessage(data.bcs.type)) { throw new Error(`object at is not a ClaimPassVerifyMessage object`); }

 return ClaimPassVerifyMessage.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ClaimPassVerifyMessage.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<ClaimPassVerifyMessage> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ClaimPassVerifyMessage object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isClaimPassVerifyMessage(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ClaimPassVerifyMessage object`); }

 return ClaimPassVerifyMessage.fromSuiObjectData( res.data ); }

 }
