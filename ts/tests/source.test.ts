import { Transaction } from '@iota/iota-sdk/transactions'
import { IotaClient } from '@iota/iota-sdk/client'
import { Ed25519Keypair } from '@iota/iota-sdk/keypairs/ed25519'
import { fromB64 } from '@iota/iota-sdk/utils'
import { it, expect, describe } from 'vitest'
import {
  Bar,
  Dummy,
  Foo,
  WithGenericField,
  WithSpecialTypes,
  WithSpecialTypesAsGenerics,
  WithSpecialTypesInVectors,
  WithTwoGenerics,
} from './gen/examples/fixture/structs'
import {
  createBar,
  createFoo,
  createSpecial,
  createSpecialAsGenerics,
  createSpecialInVectors,
  createWithGenericField,
  createWithTwoGenerics,
} from './gen/examples/fixture/functions'
import { StructFromOtherModule } from './gen/examples/other-module/structs'
import { string } from './gen/move-stdlib/ascii/functions'
import { utf8 } from './gen/move-stdlib/string/functions'
import { none, some } from './gen/move-stdlib/option/functions'
import { newUnsafeFromBytes } from './gen/iota/url/functions'
import { new_ as newUid, idFromAddress } from './gen/iota/object/functions'
import { zero } from './gen/iota/balance/functions'
import { Balance } from './gen/iota/balance/structs'
import { extractType, phantom, vector } from './gen/_framework/reified'
import { IOTA } from './gen/iota/iota/structs'
import { Option } from './gen/move-stdlib/option/structs'
import { String as Utf8String } from './gen/move-stdlib/string/structs'
import { String as AsciiString } from './gen/move-stdlib/ascii/structs'
import { Url } from './gen/iota/url/structs'
import { ID, UID } from './gen/iota/object/structs'
import { loader } from './gen/_framework/loader'
import { PKG_V1 } from './gen/examples'
import { sqrt } from './gen/iota/math/functions'

const keypair = Ed25519Keypair.fromSecretKey(
  fromB64('AMVT58FaLF2tJtg/g8X2z1/vG0FvNn0jvRu9X2Wl8F+u').slice(1)
) // address: 0x8becfafb14c111fc08adee6cc9afa95a863d1bf133f796626eec353f98ea8507

const client = new IotaClient({
  url: 'https://api.testnet.iota.cafe',
})

it('creates and decodes an object with object as type param', async () => {
  const tx = new Transaction()

  const T = Bar.$typeName

  const genericVecNested = [
    createWithTwoGenerics(tx, [T, 'u8'], {
      genericField1: createBar(tx, 100n),
      genericField2: 1,
    }),
  ]

  const twoGenericsNested = createWithTwoGenerics(tx, [T, `${WithTwoGenerics.$typeName}<u8, u8>`], {
    genericField1: createBar(tx, 100n),
    genericField2: createWithTwoGenerics(tx, ['u8', 'u8'], {
      genericField1: 1,
      genericField2: 2,
    }),
  })

  const twoGenericsReifiedNested = createWithTwoGenerics(
    tx,
    [Bar.$typeName, `${WithTwoGenerics.$typeName}<u8, u8>`],
    {
      genericField1: createBar(tx, 100n),
      genericField2: createWithTwoGenerics(tx, ['u8', 'u8'], {
        genericField1: 1,
        genericField2: 2,
      }),
    }
  )

  const twoGenericsNestedVec = [
    createWithTwoGenerics(tx, [Bar.$typeName, `vector<${WithTwoGenerics.$typeName}<${T}, u8>>`], {
      genericField1: createBar(tx, 100n),
      genericField2: [
        createWithTwoGenerics(tx, [Bar.$typeName, 'u8'], {
          genericField1: createBar(tx, 100n),
          genericField2: 1,
        }),
      ],
    }),
  ]

  createFoo(tx, [T, Bar.$typeName], {
    generic: createBar(tx, 100n),
    reifiedPrimitiveVec: [1n, 2n, 3n],
    reifiedObjectVec: [createBar(tx, 100n)],
    genericVec: [createBar(tx, 100n)],
    genericVecNested,
    twoGenerics: createWithTwoGenerics(tx, [T, Bar.$typeName], {
      genericField1: createBar(tx, 100n),
      genericField2: createBar(tx, 100n),
    }),
    twoGenericsReifiedPrimitive: createWithTwoGenerics(tx, ['u16', 'u64'], {
      genericField1: 1,
      genericField2: 2n,
    }),
    twoGenericsReifiedObject: createWithTwoGenerics(tx, [Bar.$typeName, Bar.$typeName], {
      genericField1: createBar(tx, 100n),
      genericField2: createBar(tx, 100n),
    }),
    twoGenericsNested,
    twoGenericsReifiedNested,
    twoGenericsNestedVec,
    objRef: createBar(tx, 100n),
  })

  const res = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
    },
  })
  await client.waitForTransaction({
    digest: res.digest,
  })

  const id = res.effects!.created![0].reference.objectId

  const foo = await client.getObject({
    id,
    options: {
      showBcs: true,
      showContent: true,
    },
  })

  if (foo.data?.bcs?.dataType !== 'moveObject' || foo.data?.content?.dataType !== 'moveObject') {
    throw new Error(`not a moveObject`)
  }

  const exp = Foo.r(Bar.reified()).new({
    id,
    generic: Bar.r.new({ value: 100n }),
    reifiedPrimitiveVec: [1n, 2n, 3n],
    reifiedObjectVec: [Bar.r.new({ value: 100n })],
    genericVec: [Bar.r.new({ value: 100n })],
    genericVecNested: [
      WithTwoGenerics.r(Bar.reified(), 'u8').new({
        genericField1: Bar.r.new({ value: 100n }),
        genericField2: 1,
      }),
    ],
    twoGenerics: WithTwoGenerics.r(Bar.reified(), Bar.reified()).new({
      genericField1: Bar.r.new({ value: 100n }),
      genericField2: Bar.r.new({ value: 100n }),
    }),
    twoGenericsReifiedPrimitive: WithTwoGenerics.r('u16', 'u64').new({
      genericField1: 1,
      genericField2: 2n,
    }),
    twoGenericsReifiedObject: WithTwoGenerics.r(Bar.reified(), Bar.reified()).new({
      genericField1: Bar.r.new({ value: 100n }),
      genericField2: Bar.r.new({ value: 100n }),
    }),
    twoGenericsNested: WithTwoGenerics.r(Bar.reified(), WithTwoGenerics.reified('u8', 'u8')).new({
      genericField1: Bar.r.new({ value: 100n }),
      genericField2: WithTwoGenerics.r('u8', 'u8').new({
        genericField1: 1,
        genericField2: 2,
      }),
    }),
    twoGenericsReifiedNested: WithTwoGenerics.r(
      Bar.reified(),
      WithTwoGenerics.reified('u8', 'u8')
    ).new({
      genericField1: Bar.r.new({ value: 100n }),
      genericField2: WithTwoGenerics.r('u8', 'u8').new({
        genericField1: 1,
        genericField2: 2,
      }),
    }),
    twoGenericsNestedVec: [
      WithTwoGenerics.r(Bar.reified(), vector(WithTwoGenerics.reified(Bar.reified(), 'u8'))).new({
        genericField1: Bar.r.new({ value: 100n }),
        genericField2: [
          WithTwoGenerics.r(Bar.reified(), 'u8').new({
            genericField1: Bar.r.new({ value: 100n }),
            genericField2: 1,
          }),
        ],
      }),
    ],
    dummy: Dummy.r.new({ dummyField: false }),
    other: StructFromOtherModule.r.new({ dummyField: false }),
  })

  const de = Foo.fromBcs(Bar.reified(), fromB64(foo.data.bcs.bcsBytes))

  expect(de).toEqual(exp)
  expect(Foo.fromFieldsWithTypes(Bar.reified(), foo.data.content)).toEqual(exp)
  expect(Foo.fromIotaParsedData(Bar.reified(), foo.data.content)).toEqual(exp)
  expect(await Foo.fetch(client, Bar.reified(), id)).toEqual(exp)
  expect(Foo.fromJSON(Bar.reified(), de.toJSON())).toEqual(exp)
})

it('creates and decodes Foo with vector of objects as type param', async () => {
  const tx = new Transaction()

  const T = `vector<${Bar.$typeName}>`
  const reifiedT = vector(Bar.reified())

  function createT(tx: Transaction, value: bigint) {
    return tx.makeMoveVec({
      elements: [createBar(tx, value)],
      type: Bar.$typeName,
    })
  }

  const genericVecNested = [
    createWithTwoGenerics(tx, [T, 'u8'], {
      genericField1: [createBar(tx, 100n)],
      genericField2: 1,
    }),
  ]

  const twoGenericsNested = createWithTwoGenerics(tx, [T, `${WithTwoGenerics.$typeName}<u8, u8>`], {
    genericField1: [createBar(tx, 100n)],
    genericField2: createWithTwoGenerics(tx, ['u8', 'u8'], {
      genericField1: 1,
      genericField2: 2,
    }),
  })

  const twoGenericsReifiedNested = createWithTwoGenerics(
    tx,
    [Bar.$typeName, `${WithTwoGenerics.$typeName}<u8, u8>`],
    {
      genericField1: createBar(tx, 100n),
      genericField2: createWithTwoGenerics(tx, ['u8', 'u8'], {
        genericField1: 1,
        genericField2: 2,
      }),
    }
  )

  const twoGenericsNestedVec = [
    createWithTwoGenerics(tx, [Bar.$typeName, `vector<${WithTwoGenerics.$typeName}<${T}, u8>>`], {
      genericField1: createBar(tx, 100n),
      genericField2: [
        createWithTwoGenerics(tx, [T, 'u8'], {
          genericField1: createT(tx, 100n), // or [createBar(tx, 100n)],
          genericField2: 1,
        }),
      ],
    }),
  ]

  createFoo(tx, [T, Bar.$typeName], {
    generic: createT(tx, 100n), // or [createBar(tx, 100n)]
    reifiedPrimitiveVec: [1n, 2n, 3n],
    reifiedObjectVec: [createBar(tx, 100n)],
    genericVec: [createT(tx, 100n)],
    genericVecNested,
    twoGenerics: createWithTwoGenerics(tx, [T, Bar.$typeName], {
      genericField1: [createBar(tx, 100n), createBar(tx, 100n)],
      genericField2: createBar(tx, 100n),
    }),
    twoGenericsReifiedPrimitive: createWithTwoGenerics(tx, ['u16', 'u64'], {
      genericField1: 1,
      genericField2: 2n,
    }),
    twoGenericsReifiedObject: createWithTwoGenerics(tx, [Bar.$typeName, Bar.$typeName], {
      genericField1: createBar(tx, 100n),
      genericField2: createBar(tx, 100n),
    }),
    twoGenericsNested,
    twoGenericsReifiedNested,
    twoGenericsNestedVec,
    objRef: createBar(tx, 100n),
  })

  const res = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
    },
  })
  await client.waitForTransaction({
    digest: res.digest,
  })

  const id = res.effects!.created![0].reference.objectId

  const foo = await client.getObject({
    id,
    options: {
      showBcs: true,
      showContent: true,
    },
  })

  if (foo.data?.bcs?.dataType !== 'moveObject' || foo.data?.content?.dataType !== 'moveObject') {
    throw new Error(`not a moveObject`)
  }

  const exp = Foo.r(reifiedT).new({
    id: id,
    generic: [Bar.r.new({ value: 100n })],
    reifiedPrimitiveVec: [1n, 2n, 3n],
    reifiedObjectVec: [Bar.r.new({ value: 100n })],
    genericVec: [[Bar.r.new({ value: 100n })]],
    genericVecNested: [
      WithTwoGenerics.r(reifiedT, 'u8').new({
        genericField1: [Bar.r.new({ value: 100n })],
        genericField2: 1,
      }),
    ],
    twoGenerics: WithTwoGenerics.r(reifiedT, Bar.reified()).new({
      genericField1: [Bar.r.new({ value: 100n }), Bar.r.new({ value: 100n })],
      genericField2: Bar.r.new({ value: 100n }),
    }),
    twoGenericsReifiedPrimitive: WithTwoGenerics.r('u16', 'u64').new({
      genericField1: 1,
      genericField2: 2n,
    }),
    twoGenericsReifiedObject: WithTwoGenerics.r(Bar.reified(), Bar.reified()).new({
      genericField1: Bar.r.new({ value: 100n }),
      genericField2: Bar.r.new({ value: 100n }),
    }),
    twoGenericsNested: WithTwoGenerics.r(reifiedT, WithTwoGenerics.reified('u8', 'u8')).new({
      genericField1: [Bar.r.new({ value: 100n })],
      genericField2: WithTwoGenerics.r('u8', 'u8').new({
        genericField1: 1,
        genericField2: 2,
      }),
    }),
    twoGenericsReifiedNested: WithTwoGenerics.r(
      Bar.reified(),
      WithTwoGenerics.reified('u8', 'u8')
    ).new({
      genericField1: Bar.r.new({ value: 100n }),
      genericField2: WithTwoGenerics.r('u8', 'u8').new({
        genericField1: 1,
        genericField2: 2,
      }),
    }),
    twoGenericsNestedVec: [
      WithTwoGenerics.r(Bar.reified(), vector(WithTwoGenerics.reified(reifiedT, 'u8'))).new({
        genericField1: Bar.r.new({ value: 100n }),
        genericField2: [
          WithTwoGenerics.r(reifiedT, 'u8').new({
            genericField1: [Bar.r.new({ value: 100n })],
            genericField2: 1,
          }),
        ],
      }),
    ],
    dummy: Dummy.r.new({ dummyField: false }),
    other: StructFromOtherModule.r.new({ dummyField: false }),
  })

  const de = Foo.fromBcs(reifiedT, fromB64(foo.data.bcs.bcsBytes))

  expect(de).toEqual(exp)

  expect(Foo.fromFieldsWithTypes(reifiedT, foo.data.content)).toEqual(exp)
  expect(Foo.fromJSON(reifiedT, de.toJSON())).toEqual(exp)
})

it('decodes special-cased types correctly', async () => {
  const tx = new Transaction()

  const encoder = new TextEncoder()

  const typeArgs = ['0x2::iota::IOTA', 'u64'] as [string, string]
  const reifiedArgs = [IOTA.p, 'u64'] as const

  createSpecial(tx, typeArgs, {
    string: utf8(tx, Array.from(encoder.encode('string'))),
    asciiString: string(tx, Array.from(encoder.encode('ascii'))),
    url: newUnsafeFromBytes(tx, Array.from(encoder.encode('https://example.com'))),
    idField: idFromAddress(tx, 'faf60f9f9d1f6c490dce8673c1371b9df456e0c183f38524e5f78d959ea559a5'),
    uid: newUid(tx),
    balance: zero(tx, '0x2::iota::IOTA'),
    option: some(tx, 'u64', 100n),
    optionObj: some(tx, Bar.$typeName, createBar(tx, 100n)),
    optionNone: none(tx, 'u64'),
    balanceGeneric: zero(tx, '0x2::iota::IOTA'),
    optionGeneric: some(tx, 'u64', 200n),
    optionGenericNone: none(tx, 'u64'),
  })

  const res = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
    },
  })
  await client.waitForTransaction({
    digest: res.digest,
  })

  const id = res.effects!.created![0].reference.objectId

  const obj = await client.getObject({
    id,
    options: {
      showBcs: true,
      showContent: true,
    },
  })

  if (obj.data?.bcs?.dataType !== 'moveObject' || obj.data?.content?.dataType !== 'moveObject') {
    throw new Error(`not a moveObject`)
  }

  const fromBcs = WithSpecialTypes.r(...reifiedArgs).fromBcs(fromB64(obj.data.bcs.bcsBytes))
  const fromFieldsWithTypes = WithSpecialTypes.r(...reifiedArgs).fromFieldsWithTypes(
    obj.data.content
  )

  const uid = (obj.data.content.fields as { uid: { id: string } }).uid.id

  const exp = WithSpecialTypes.r(...reifiedArgs).new({
    id,
    string: 'string',
    asciiString: 'ascii',
    url: 'https://example.com',
    idField: '0xfaf60f9f9d1f6c490dce8673c1371b9df456e0c183f38524e5f78d959ea559a5',
    uid,
    balance: Balance.r(IOTA.p).new({ value: 0n }),
    option: 100n,
    optionObj: Bar.r.new({ value: 100n }),
    optionNone: null,
    balanceGeneric: Balance.r(IOTA.p).new({ value: 0n }),
    optionGeneric: 200n,
    optionGenericNone: null,
  })

  expect(fromFieldsWithTypes).toEqual(exp)
  expect(fromBcs).toEqual(exp)
  expect(WithSpecialTypes.r(...reifiedArgs).fromJSON(exp.toJSON())).toEqual(exp)
})

it('decodes special-cased types as generics correctly', async () => {
  const tx = new Transaction()

  const encoder = new TextEncoder()

  const typeArgs = [
    '0x1::string::String',
    '0x1::ascii::String',
    '0x2::url::Url',
    '0x2::object::ID',
    '0x2::object::UID',
    '0x2::balance::Balance<0x2::iota::IOTA>',
    '0x1::option::Option<u64>',
    '0x1::option::Option<u64>',
  ] as [string, string, string, string, string, string, string, string]
  const reifiedArgs = [
    Utf8String.reified(),
    AsciiString.reified(),
    Url.reified(),
    ID.reified(),
    UID.reified(),
    Balance.reified(IOTA.p),
    Option.reified('u64'),
    Option.reified('u64'),
  ] as const

  createSpecialAsGenerics(tx, typeArgs, {
    string: utf8(tx, Array.from(encoder.encode('string'))),
    asciiString: string(tx, Array.from(encoder.encode('ascii'))),
    url: newUnsafeFromBytes(tx, Array.from(encoder.encode('https://example.com'))),
    idField: idFromAddress(tx, 'faf60f9f9d1f6c490dce8673c1371b9df456e0c183f38524e5f78d959ea559a5'),
    uid: newUid(tx),
    balance: zero(tx, '0x2::iota::IOTA'),
    option: some(tx, 'u64', 100n),
    optionNone: none(tx, 'u64'),
  })

  const res = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
    },
  })
  await client.waitForTransaction({
    digest: res.digest,
  })

  const id = res.effects!.created![0].reference.objectId

  const obj = await client.getObject({
    id,
    options: {
      showBcs: true,
      showContent: true,
    },
  })

  if (obj.data?.bcs?.dataType !== 'moveObject' || obj.data?.content?.dataType !== 'moveObject') {
    throw new Error(`not a moveObject`)
  }

  const uid = (obj.data.content.fields as { uid: { id: string } }).uid.id

  const fromBcs = WithSpecialTypesAsGenerics.r(...reifiedArgs).fromBcs(
    fromB64(obj.data.bcs.bcsBytes)
  )
  const fromFieldsWithTypes = WithSpecialTypesAsGenerics.r(...reifiedArgs).fromFieldsWithTypes(
    obj.data.content
  )

  const exp = WithSpecialTypesAsGenerics.r(...reifiedArgs).new({
    id,
    string: 'string',
    asciiString: 'ascii',
    url: 'https://example.com',
    idField: '0xfaf60f9f9d1f6c490dce8673c1371b9df456e0c183f38524e5f78d959ea559a5',
    uid,
    balance: Balance.r(IOTA.p).new({ value: 0n }),
    option: 100n,
    optionNone: null,
  })

  expect(fromBcs).toEqual(exp)
  expect(fromFieldsWithTypes).toEqual(exp)
  expect(WithSpecialTypesAsGenerics.r(...reifiedArgs).fromJSON(exp.toJSON())).toEqual(exp)
})

it('calls function correctly when special types are used', async () => {
  const tx = new Transaction()

  const encoder = new TextEncoder()

  const reifiedArgs = [
    IOTA.p,
    vector(Option.reified(Option.reified(vector(vector('u64'))))),
  ] as const

  createSpecial(
    tx,
    ['0x2::iota::IOTA', 'vector<0x1::option::Option<0x1::option::Option<vector<vector<u64>>>>>'],
    {
      string: 'string',
      asciiString: 'ascii',
      url: newUnsafeFromBytes(tx, Array.from(encoder.encode('https://example.com'))),
      idField: idFromAddress(
        tx,
        '0xfaf60f9f9d1f6c490dce8673c1371b9df456e0c183f38524e5f78d959ea559a5'
      ),
      uid: newUid(tx),
      balance: zero(tx, '0x2::iota::IOTA'),
      option: 100n,
      optionObj: some(tx, Bar.$typeName, createBar(tx, 100n)),
      optionNone: null,
      balanceGeneric: zero(tx, '0x2::iota::IOTA'),
      optionGeneric: [[[200n, 300n]], null, [[400n, 500n]]],
      optionGenericNone: null,
    }
  )

  const res = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
    },
  })
  await client.waitForTransaction({
    digest: res.digest,
  })

  const id = res.effects!.created![0].reference.objectId

  const obj = await client.getObject({
    id,
    options: {
      showBcs: true,
      showContent: true,
    },
  })

  if (obj.data?.bcs?.dataType !== 'moveObject' || obj.data?.content?.dataType !== 'moveObject') {
    throw new Error(`not a moveObject`)
  }

  expect(WithSpecialTypes.fromFieldsWithTypes([IOTA.p, reifiedArgs[1]], obj.data.content)).toEqual(
    WithSpecialTypes.r(IOTA.p, reifiedArgs[1]).new({
      id,
      string: 'string',
      asciiString: 'ascii',
      url: 'https://example.com',
      idField: '0xfaf60f9f9d1f6c490dce8673c1371b9df456e0c183f38524e5f78d959ea559a5',
      uid: (obj.data.content.fields as { uid: { id: string } }).uid.id,
      balance: Balance.r(IOTA.p).new({ value: 0n }),
      option: 100n,
      optionObj: Bar.r.new({ value: 100n }),
      optionNone: null,
      balanceGeneric: Balance.r(IOTA.p).new({ value: 0n }),
      optionGeneric: [[[200n, 300n]], null, [[400n, 500n]]],
      optionGenericNone: null,
    })
  )
})

it('calls function correctly when special types are used as generics', async () => {
  const tx = new Transaction()

  const encoder = new TextEncoder()

  const reifiedArgs = [
    Utf8String.reified(),
    AsciiString.reified(),
    Url.reified(),
    ID.reified(),
    UID.reified(),
    Balance.reified(IOTA.p),
    Option.reified(vector(Option.reified('u64'))),
    Option.reified('u64'),
  ] as const

  createSpecialAsGenerics(
    tx,
    [
      '0x1::string::String',
      '0x1::ascii::String',
      '0x2::url::Url',
      '0x2::object::ID',
      '0x2::object::UID',
      '0x2::balance::Balance<0x2::iota::IOTA>',
      '0x1::option::Option<vector<0x1::option::Option<u64>>>',
      '0x1::option::Option<u64>',
    ],
    {
      string: 'string',
      asciiString: 'ascii',
      url: newUnsafeFromBytes(tx, Array.from(encoder.encode('https://example.com'))),
      idField: idFromAddress(
        tx,
        '0xfaf60f9f9d1f6c490dce8673c1371b9df456e0c183f38524e5f78d959ea559a5'
      ),
      uid: newUid(tx),
      balance: zero(tx, '0x2::iota::IOTA'),
      option: [5n, null, 3n],
      optionNone: null,
    }
  )

  const res = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
    },
  })
  await client.waitForTransaction({
    digest: res.digest,
  })

  const id = res.effects!.created![0].reference.objectId

  const obj = await client.getObject({
    id,
    options: {
      showBcs: true,
      showContent: true,
    },
  })

  if (obj.data?.bcs?.dataType !== 'moveObject' || obj.data?.content?.dataType !== 'moveObject') {
    throw new Error(`not a moveObject`)
  }

  expect(
    WithSpecialTypesAsGenerics.r(...reifiedArgs).fromFieldsWithTypes(obj.data.content)
  ).toEqual(
    WithSpecialTypesAsGenerics.r(...reifiedArgs).new({
      id,
      string: 'string',
      asciiString: 'ascii',
      url: 'https://example.com',
      idField: '0xfaf60f9f9d1f6c490dce8673c1371b9df456e0c183f38524e5f78d959ea559a5',
      uid: (obj.data.content.fields as { uid: { id: string } }).uid.id,
      balance: Balance.r(IOTA.p).new({ value: 0n }),
      option: [5n, null, 3n],
      optionNone: null,
    })
  )
})

it('calls function correctly when special types are used as as vectors', async () => {
  const tx = new Transaction()

  createSpecialInVectors(tx, 'vector<u64>', {
    string: ['string'],
    asciiString: ['ascii'],
    idField: ['0x0', '0x1'],
    bar: [createBar(tx, 100n)],
    option: [5n, 1n, 3n],
    optionGeneric: [[5n], null],
  })

  const res = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
    },
  })
  await client.waitForTransaction({
    digest: res.digest,
  })

  const id = res.effects!.created![0].reference.objectId

  const obj = await client.getObject({
    id,
    options: {
      showBcs: true,
      showContent: true,
    },
  })

  if (obj.data?.bcs?.dataType !== 'moveObject' || obj.data?.content?.dataType !== 'moveObject') {
    throw new Error(`not a moveObject`)
  }

  expect(WithSpecialTypesInVectors.fromFieldsWithTypes(vector('u64'), obj.data.content)).toEqual(
    WithSpecialTypesInVectors.r(vector('u64')).new({
      id,
      string: ['string'],
      asciiString: ['ascii'],
      idField: [
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      ],
      bar: [Bar.r.new({ value: 100n })],
      option: [5n, 1n, 3n],
      optionGeneric: [[5n], null],
    })
  )
})

it('loads with loader correctly', async () => {
  const tx = new Transaction()

  const T = `${WithTwoGenerics.$typeName}<${Bar.$typeName}, vector<${WithTwoGenerics.$typeName}<${Bar.$typeName}, u8>>>`
  const tReified = WithTwoGenerics.reified(
    Bar.reified(),
    vector(WithTwoGenerics.reified(Bar.reified(), 'u8'))
  )

  const withTwoGenerics = createWithTwoGenerics(
    tx,
    [Bar.$typeName, `vector<${WithTwoGenerics.$typeName}<${Bar.$typeName}, u8>>`],
    {
      genericField1: createBar(tx, 100n),
      genericField2: [
        createWithTwoGenerics(tx, [Bar.$typeName, 'u8'], {
          genericField1: createBar(tx, 100n),
          genericField2: 1,
        }),
      ],
    }
  )
  createWithGenericField(tx, T, withTwoGenerics)

  const res = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
    },
  })
  await client.waitForTransaction({
    digest: res.digest,
  })

  const id = res.effects!.created![0].reference.objectId

  const obj = await client.getObject({
    id,
    options: {
      showBcs: true,
      showContent: true,
    },
  })
  if (obj.data?.bcs?.dataType !== 'moveObject' || obj.data?.content?.dataType !== 'moveObject') {
    throw new Error(`not a moveObject`)
  }

  const withGenericFieldReified = loader.reified(`${WithGenericField.$typeName}<${T}>`)

  expect(extractType(withGenericFieldReified)).toEqual(`${WithGenericField.$typeName}<${T}>`)

  const fromBcs = withGenericFieldReified.fromFieldsWithTypes(obj.data.content)
  expect(fromBcs).toEqual(
    WithGenericField.r(tReified).new({
      id,
      genericField: WithTwoGenerics.r(
        Bar.reified(),
        vector(WithTwoGenerics.reified(Bar.reified(), 'u8'))
      ).new({
        genericField1: Bar.r.new({ value: 100n }),
        genericField2: [
          WithTwoGenerics.r(Bar.reified(), 'u8').new({
            genericField1: Bar.r.new({ value: 100n }),
            genericField2: 1,
          }),
        ],
      }),
    })
  )
})

it('converts to json correctly', () => {
  const U = WithSpecialTypes.reified(IOTA.p, 'u64')
  const V = vector(WithTwoGenerics.reified(Bar.reified(), 'u8'))

  const obj = WithTwoGenerics.r(U, V).new({
    genericField1: WithSpecialTypes.r(IOTA.p, 'u64').new({
      id: '0x1',
      string: 'string',
      asciiString: 'ascii',
      url: 'https://example.com',
      idField: '0x2',
      uid: '0x3',
      balance: Balance.r(IOTA.p).new({ value: 0n }),
      option: 100n,
      optionObj: Bar.r.new({ value: 100n }),
      optionNone: null,
      balanceGeneric: Balance.r(IOTA.p).new({ value: 0n }),
      optionGeneric: 200n,
      optionGenericNone: null,
    }),
    genericField2: [
      WithTwoGenerics.r(Bar.reified(), 'u8').new({
        genericField1: Bar.r.new({ value: 100n }),
        genericField2: 1,
      }),
    ],
  })

  const exp: ReturnType<typeof obj.toJSON> = {
    $typeName: `${PKG_V1}::fixture::WithTwoGenerics`,
    $typeArgs: [
      `${PKG_V1}::fixture::WithSpecialTypes<0x2::iota::IOTA, u64>`,
      `vector<${PKG_V1}::fixture::WithTwoGenerics<${PKG_V1}::fixture::Bar, u8>>`,
    ],
    genericField1: {
      id: '0x1',
      string: 'string',
      asciiString: 'ascii',
      url: 'https://example.com',
      idField: '0x2',
      uid: '0x3',
      balance: {
        value: '0',
      },
      option: '100',
      optionObj: {
        value: '100',
      },
      optionNone: null,
      balanceGeneric: {
        value: '0',
      },
      optionGeneric: '200',
      optionGenericNone: null,
    },
    genericField2: [
      {
        genericField1: {
          value: '100',
        },
        genericField2: 1,
      },
    ],
  }

  const resJSON = obj.toJSON()
  expect(resJSON).toEqual(exp)

  const fromJSON = WithTwoGenerics.fromJSON([U, V], resJSON)
  expect(fromJSON).toEqual(obj)
})

it('decodes address field correctly', async () => {
  const tx = new Transaction()

  const T = 'address'

  const genericVecNested = [
    createWithTwoGenerics(tx, ['address', 'u8'], {
      genericField1: '0x999',
      genericField2: 1,
    }),
  ]

  const twoGenericsNested = createWithTwoGenerics(tx, [T, `${WithTwoGenerics.$typeName}<u8, u8>`], {
    genericField1: '0x111',
    genericField2: createWithTwoGenerics(tx, ['u8', 'u8'], {
      genericField1: 1,
      genericField2: 2,
    }),
  })

  const twoGenericsReifiedNested = createWithTwoGenerics(
    tx,
    [Bar.$typeName, `${WithTwoGenerics.$typeName}<u8, u8>`],
    {
      genericField1: createBar(tx, 100n),
      genericField2: createWithTwoGenerics(tx, ['u8', 'u8'], {
        genericField1: 1,
        genericField2: 2,
      }),
    }
  )

  const twoGenericsNestedVec = [
    createWithTwoGenerics(tx, [Bar.$typeName, `vector<${WithTwoGenerics.$typeName}<${T}, u8>>`], {
      genericField1: createBar(tx, 100n),
      genericField2: [
        createWithTwoGenerics(tx, ['address', 'u8'], {
          genericField1: '0x111',
          genericField2: 1,
        }),
      ],
    }),
  ]

  createFoo(tx, [T, Bar.$typeName], {
    generic: '0x123',
    reifiedPrimitiveVec: [1n, 2n, 3n],
    reifiedObjectVec: [createBar(tx, 100n)],
    genericVec: ['0x555'],
    genericVecNested,
    twoGenerics: createWithTwoGenerics(tx, ['address', Bar.$typeName], {
      genericField1: '0x111',
      genericField2: createBar(tx, 100n),
    }),
    twoGenericsReifiedPrimitive: createWithTwoGenerics(tx, ['u16', 'u64'], {
      genericField1: 1,
      genericField2: 2n,
    }),
    twoGenericsReifiedObject: createWithTwoGenerics(tx, [Bar.$typeName, Bar.$typeName], {
      genericField1: createBar(tx, 100n),
      genericField2: createBar(tx, 100n),
    }),
    twoGenericsNested,
    twoGenericsReifiedNested,
    twoGenericsNestedVec,
    objRef: createBar(tx, 100n),
  })

  const res = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
    },
  })
  await client.waitForTransaction({
    digest: res.digest,
  })

  const id = res.effects!.created![0].reference.objectId

  const foo = await client.getObject({
    id,
    options: {
      showBcs: true,
      showContent: true,
    },
  })

  if (foo.data?.bcs?.dataType !== 'moveObject' || foo.data?.content?.dataType !== 'moveObject') {
    throw new Error(`not a moveObject`)
  }

  const exp = Foo.r('address').new({
    id,
    generic: '0x0000000000000000000000000000000000000000000000000000000000000123',
    reifiedPrimitiveVec: [1n, 2n, 3n],
    reifiedObjectVec: [Bar.r.new({ value: 100n })],
    genericVec: ['0x0000000000000000000000000000000000000000000000000000000000000555'],
    genericVecNested: [
      WithTwoGenerics.r('address', 'u8').new({
        genericField1: '0x0000000000000000000000000000000000000000000000000000000000000999',
        genericField2: 1,
      }),
    ],
    twoGenerics: WithTwoGenerics.r('address', Bar.reified()).new({
      genericField1: '0x0000000000000000000000000000000000000000000000000000000000000111',
      genericField2: Bar.r.new({ value: 100n }),
    }),
    twoGenericsReifiedPrimitive: WithTwoGenerics.r('u16', 'u64').new({
      genericField1: 1,
      genericField2: 2n,
    }),
    twoGenericsReifiedObject: WithTwoGenerics.r(Bar.reified(), Bar.reified()).new({
      genericField1: Bar.r.new({ value: 100n }),
      genericField2: Bar.r.new({ value: 100n }),
    }),
    twoGenericsNested: WithTwoGenerics.r('address', WithTwoGenerics.reified('u8', 'u8')).new({
      genericField1: '0x0000000000000000000000000000000000000000000000000000000000000111',
      genericField2: WithTwoGenerics.r('u8', 'u8').new({
        genericField1: 1,
        genericField2: 2,
      }),
    }),
    twoGenericsReifiedNested: WithTwoGenerics.r(
      Bar.reified(),
      WithTwoGenerics.reified('u8', 'u8')
    ).new({
      genericField1: Bar.r.new({ value: 100n }),
      genericField2: WithTwoGenerics.r('u8', 'u8').new({
        genericField1: 1,
        genericField2: 2,
      }),
    }),
    twoGenericsNestedVec: [
      WithTwoGenerics.r(Bar.reified(), vector(WithTwoGenerics.reified('address', 'u8'))).new({
        genericField1: Bar.r.new({ value: 100n }),
        genericField2: [
          WithTwoGenerics.r('address', 'u8').new({
            genericField1: '0x0000000000000000000000000000000000000000000000000000000000000111',
            genericField2: 1,
          }),
        ],
      }),
    ],
    dummy: Dummy.r.new({ dummyField: false }),
    other: StructFromOtherModule.r.new({ dummyField: false }),
  })

  expect(Foo.fromBcs('address', fromB64(foo.data.bcs.bcsBytes))).toEqual(exp)
  expect(Foo.fromFieldsWithTypes('address', foo.data.content)).toEqual(exp)
  expect(Foo.fromIotaParsedData('address', foo.data.content)).toEqual(exp)
  expect(await Foo.fetch(client, 'address', id)).toEqual(exp)

  const de = Foo.fromFieldsWithTypes('address', foo.data.content)
  expect(Foo.fromJSON('address', de.toJSON())).toEqual(exp)
})

it('fails when fetching mismatch reified type', async () => {
  const tx = new Transaction()

  const encoder = new TextEncoder()
  const typeArgs = ['0x2::iota::IOTA', 'u64'] as [string, string]

  createSpecial(tx, typeArgs, {
    string: utf8(tx, Array.from(encoder.encode('string'))),
    asciiString: string(tx, Array.from(encoder.encode('ascii'))),
    url: newUnsafeFromBytes(tx, Array.from(encoder.encode('https://example.com'))),
    idField: idFromAddress(tx, 'faf60f9f9d1f6c490dce8673c1371b9df456e0c183f38524e5f78d959ea559a5'),
    uid: newUid(tx),
    balance: zero(tx, '0x2::iota::IOTA'),
    option: some(tx, 'u64', 100n),
    optionObj: some(tx, Bar.$typeName, createBar(tx, 100n)),
    optionNone: none(tx, 'u64'),
    balanceGeneric: zero(tx, '0x2::iota::IOTA'),
    optionGeneric: some(tx, 'u64', 200n),
    optionGenericNone: none(tx, 'u64'),
  })

  const res = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
    },
  })
  await client.waitForTransaction({
    digest: res.digest,
  })
  const id = res.effects!.created![0].reference.objectId

  await expect(() => {
    return WithSpecialTypes.r(phantom('u8'), 'u8').fetch(client, id)
  }).rejects.toThrowError(
    `type argument mismatch at position 0: expected 'u8' but got '0x2::iota::IOTA'`
  )
  await expect(() => {
    return WithSpecialTypes.r(IOTA.p, 'u8').fetch(client, id)
  }).rejects.toThrowError(`type argument mismatch at position 1: expected 'u8' but got 'u64'`)
})

describe('handles function calls with vector arguments correctly', () => {
  it('can pass in tx.pure values', async () => {
    const tx = new Transaction()

    createWithGenericField(tx, 'vector<u8>', [tx.pure.u8(3), tx.pure.u8(4)])
    const txRes = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      options: {
        showEffects: true,
      },
    })
    await client.waitForTransaction({
      digest: txRes.digest,
    })
    const id = txRes.effects!.created![0].reference.objectId
    const obj = await WithGenericField.r(vector('u8')).fetch(client, id)
    expect(obj.genericField).toEqual([3, 4])
  })

  it('can pass in primitive values', async () => {
    const tx = new Transaction()

    createWithGenericField(tx, 'vector<u8>', [3, 4])
    const txRes = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      options: {
        showEffects: true,
      },
    })
    await client.waitForTransaction({
      digest: txRes.digest,
    })
    const id = txRes.effects!.created![0].reference.objectId
    const obj = await WithGenericField.r(vector('u8')).fetch(client, id)
    expect(obj.genericField).toEqual([3, 4])
  })

  it('throws when mixing primitive and TransactionArgument values', async () => {
    const tx = new Transaction()

    expect(() => {
      createWithGenericField(tx, 'vector<u8>', [3, tx.pure.u8(4)])
    }).toThrowError('mixing primitive and TransactionArgument values is not supported')
  })

  it('can pass in mixed tx.pure and command result values', async () => {
    const tx = new Transaction()

    const val = sqrt(tx, 36n)
    createWithGenericField(tx, 'vector<u64>', [tx.pure.u64(3), val])

    const txRes = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      options: {
        showEffects: true,
      },
    })
    await client.waitForTransaction({
      digest: txRes.digest,
    })
    const id = txRes.effects!.created![0].reference.objectId
    const obj = await WithGenericField.r(vector('u64')).fetch(client, id)
    expect(obj.genericField).toEqual([3n, 6n])
  })

  it('throws when mixing primitive and command result values', async () => {
    const tx = new Transaction()
    const val = sqrt(tx, 36n)
    expect(() => {
      createWithGenericField(tx, 'vector<u64>', [3, val])
    }).toThrowError('mixing primitive and TransactionArgument values is not supported')
  })

  it('can use intents as values and can mix with tx.pure', async () => {
    const tx = new Transaction()

    const intent1 = (tx: Transaction) => tx.pure.u8(3)
    const intent2 = (tx: Transaction) => tx.pure.u8(4)

    createWithGenericField(tx, 'vector<u8>', [intent1(tx), intent2(tx), tx.pure.u8(7)])

    const txRes = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      options: {
        showEffects: true,
      },
    })
    await client.waitForTransaction({
      digest: txRes.digest,
    })
    const id = txRes.effects!.created![0].reference.objectId
    const obj = await WithGenericField.r(vector('u8')).fetch(client, id)
    expect(obj.genericField).toEqual([3, 4, 7])
  })

  it('throws when mixing primitive and intent values', async () => {
    const tx = new Transaction()

    const intent = (tx: Transaction) => tx.pure.u8(3)
    expect(() => {
      createWithGenericField(tx, 'vector<u8>', [3, intent(tx)])
    }).toThrowError('mixing primitive and TransactionArgument values is not supported')
  })
})

describe('handles function calls with option arguments correctly', () => {
  it('can use primitive value as option directly', async () => {
    const tx = new Transaction()

    createWithGenericField(tx, `${Option.$typeName}<u8>`, 3)
    const txRes = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      options: {
        showEffects: true,
      },
    })
    await client.waitForTransaction({
      digest: txRes.digest,
    })
    const id = txRes.effects!.created![0].reference.objectId
    const obj = await WithGenericField.r(Option.r('u8')).fetch(client, id)
    expect(obj.genericField).toEqual(3)
  })

  it('can pass in tx.pure values', async () => {
    const tx = new Transaction()

    createWithGenericField(tx, `${Option.$typeName}<vector<u8>>`, [tx.pure.u8(3), tx.pure.u8(4)])
    const txRes = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      options: {
        showEffects: true,
      },
    })
    await client.waitForTransaction({
      digest: txRes.digest,
    })
    const id = txRes.effects!.created![0].reference.objectId
    const obj = await WithGenericField.r(Option.r(vector('u8'))).fetch(client, id)
    expect(obj.genericField).toEqual([3, 4])
  })

  it('throws when mixing primitive and TransactionArgument values', async () => {
    const tx = new Transaction()

    expect(() => {
      createWithGenericField(tx, `${Option.$typeName}<vector<u8>>`, [3, tx.pure.u8(4)])
    }).toThrowError('mixing primitive and TransactionArgument values is not supported')
  })

  it('can use none function call result as a value', async () => {
    const tx = new Transaction()

    createWithGenericField(tx, `${Option.$typeName}<u8>`, none(tx, 'u8'))
    const txRes = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      options: {
        showEffects: true,
      },
    })
    await client.waitForTransaction({
      digest: txRes.digest,
    })
    const id = txRes.effects!.created![0].reference.objectId
    const obj = await WithGenericField.r(Option.r('u8')).fetch(client, id)
    expect(obj.genericField).toEqual(null)
  })

  it('can use null as values', async () => {
    const tx = new Transaction()

    createWithGenericField(tx, `${Option.$typeName}<u8>`, null)
    const txRes = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      options: {
        showEffects: true,
      },
    })
    await client.waitForTransaction({
      digest: txRes.digest,
    })
    const id = txRes.effects!.created![0].reference.objectId
    const obj = await WithGenericField.r(Option.r('u8')).fetch(client, id)
    expect(obj.genericField).toEqual(null)
  })

  it('handles nested vector of options as inner type correctly', async () => {
    const tx = new Transaction()

    createWithGenericField(tx, `${Option.$typeName}<vector<${Option.$typeName}<u8>>>`, [3, null, 4])
    const txRes = await client.signAndExecuteTransaction({
      signer: keypair,
      transaction: tx,
      options: {
        showEffects: true,
      },
    })
    await client.waitForTransaction({
      digest: txRes.digest,
    })
    const id = txRes.effects!.created![0].reference.objectId
    const obj = await WithGenericField.r(Option.r(vector(Option.r('u8')))).fetch(client, id)
    expect(obj.genericField).toEqual([3, null, 4])
  })
})
