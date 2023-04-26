// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file
// source-hash: 1314d44a10bf844d5b657ced861c988f73266d5a
let wasm

const heap = new Array(128).fill(undefined)

heap.push(undefined, null, true, false)

function getObject(idx) {
  return heap[idx]
}

function isLikeNone(x) {
  return x === undefined || x === null
}

let cachedFloat64Memory0 = null

function getFloat64Memory0() {
  if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
    cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer)
  }
  return cachedFloat64Memory0
}

let cachedInt32Memory0 = null

function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer)
  }
  return cachedInt32Memory0
}

let WASM_VECTOR_LEN = 0

let cachedUint8Memory0 = null

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer)
  }
  return cachedUint8Memory0
}

const cachedTextEncoder = new TextEncoder("utf-8")

const encodeString = function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view)
}

function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === undefined) {
    const buf = cachedTextEncoder.encode(arg)
    const ptr = malloc(buf.length)
    getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf)
    WASM_VECTOR_LEN = buf.length
    return ptr
  }

  let len = arg.length
  let ptr = malloc(len)

  const mem = getUint8Memory0()

  let offset = 0

  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset)
    if (code > 0x7F) break
    mem[ptr + offset] = code
  }

  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset)
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3)
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len)
    const ret = encodeString(arg, view)

    offset += ret.written
  }

  WASM_VECTOR_LEN = offset
  return ptr
}

let heap_next = heap.length

function dropObject(idx) {
  if (idx < 132) return
  heap[idx] = heap_next
  heap_next = idx
}

function takeObject(idx) {
  const ret = getObject(idx)
  dropObject(idx)
  return ret
}

const cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })

cachedTextDecoder.decode()

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len))
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1)
  const idx = heap_next
  heap_next = heap[idx]

  heap[idx] = obj
  return idx
}

function debugString(val) {
  // primitive types
  const type = typeof val
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`
  }
  if (type == "string") {
    return `"${val}"`
  }
  if (type == "symbol") {
    const description = val.description
    if (description == null) {
      return "Symbol"
    } else {
      return `Symbol(${description})`
    }
  }
  if (type == "function") {
    const name = val.name
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`
    } else {
      return "Function"
    }
  }
  // objects
  if (Array.isArray(val)) {
    const length = val.length
    let debug = "["
    if (length > 0) {
      debug += debugString(val[0])
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i])
    }
    debug += "]"
    return debug
  }
  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val))
  let className
  if (builtInMatches.length > 1) {
    className = builtInMatches[1]
  } else {
    // Failed to match the standard '[object ClassName]'
    return toString.call(val)
  }
  if (className == "Object") {
    // we're a user defined class or Object
    // JSON.stringify avoids problems with cycles, and is generally much
    // easier than looping through ownProperties of `val`.
    try {
      return "Object(" + JSON.stringify(val) + ")"
    } catch (_) {
      return "Object"
    }
  }
  // errors
  if (val instanceof Error) {
    return `${val.name}: ${val.message}\n${val.stack}`
  }
  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className
}

let cachedUint32Memory0 = null

function getUint32Memory0() {
  if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
    cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer)
  }
  return cachedUint32Memory0
}

function getArrayJsValueFromWasm0(ptr, len) {
  const mem = getUint32Memory0()
  const slice = mem.subarray(ptr / 4, ptr / 4 + len)
  const result = []
  for (let i = 0; i < slice.length; i++) {
    result.push(takeObject(slice[i]))
  }
  return result
}

const MutationFinalization = new FinalizationRegistry((ptr) => wasm.__wbg_mutation_free(ptr))
/** */
export class Mutation {
  __destroy_into_raw() {
    const ptr = this.ptr
    this.ptr = 0
    MutationFinalization.unregister(this)
    return ptr
  }

  free() {
    const ptr = this.__destroy_into_raw()
    wasm.__wbg_mutation_free(ptr)
  }
  /**
   * @returns {number}
   */
  static counter() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16)
      wasm.mutation_counter(retptr)
      var r0 = getInt32Memory0()[retptr / 4 + 0]
      var r1 = getInt32Memory0()[retptr / 4 + 1]
      var r2 = getInt32Memory0()[retptr / 4 + 2]
      if (r2) {
        throw takeObject(r1)
      }
      return r0 >>> 0
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16)
    }
  }
}

const QueryFinalization = new FinalizationRegistry((ptr) => wasm.__wbg_query_free(ptr))
/** */
export class Query {
  __destroy_into_raw() {
    const ptr = this.ptr
    this.ptr = 0
    QueryFinalization.unregister(this)
    return ptr
  }

  free() {
    const ptr = this.__destroy_into_raw()
    wasm.__wbg_query_free(ptr)
  }
  /**
   * @param {any} _parent
   * @param {any} args
   * @param {any} _context
   * @param {any} _info
   * @returns {string}
   */
  static username(_parent, args, _context, _info) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16)
      wasm.query_username(
        retptr,
        addHeapObject(_parent),
        addHeapObject(args),
        addHeapObject(_context),
        addHeapObject(_info),
      )
      var r0 = getInt32Memory0()[retptr / 4 + 0]
      var r1 = getInt32Memory0()[retptr / 4 + 1]
      var r2 = getInt32Memory0()[retptr / 4 + 2]
      var r3 = getInt32Memory0()[retptr / 4 + 3]
      var ptr0 = r0
      var len0 = r1
      if (r3) {
        ptr0 = 0
        len0 = 0
        throw takeObject(r2)
      }
      return getStringFromWasm0(ptr0, len0)
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16)
      wasm.__wbindgen_free(ptr0, len0)
    }
  }
}

const imports = {
  __wbindgen_placeholder__: {
    __wbindgen_jsval_loose_eq: function (arg0, arg1) {
      const ret = getObject(arg0) == getObject(arg1)
      return ret
    },
    __wbindgen_boolean_get: function (arg0) {
      const v = getObject(arg0)
      const ret = typeof (v) === "boolean" ? (v ? 1 : 0) : 2
      return ret
    },
    __wbindgen_number_get: function (arg0, arg1) {
      const obj = getObject(arg1)
      const ret = typeof (obj) === "number" ? obj : undefined
      getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret
      getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret)
    },
    __wbindgen_string_get: function (arg0, arg1) {
      const obj = getObject(arg1)
      const ret = typeof (obj) === "string" ? obj : undefined
      var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc)
      var len0 = WASM_VECTOR_LEN
      getInt32Memory0()[arg0 / 4 + 1] = len0
      getInt32Memory0()[arg0 / 4 + 0] = ptr0
    },
    __wbg_instanceof_Uint8Array_01cebe79ca606cca: function (arg0) {
      let result
      try {
        result = getObject(arg0) instanceof Uint8Array
      } catch {
        result = false
      }
      const ret = result
      return ret
    },
    __wbg_instanceof_ArrayBuffer_a69f02ee4c4f5065: function (arg0) {
      let result
      try {
        result = getObject(arg0) instanceof ArrayBuffer
      } catch {
        result = false
      }
      const ret = result
      return ret
    },
    __wbg_new_537b7341ce90bb31: function (arg0) {
      const ret = new Uint8Array(getObject(arg0))
      return addHeapObject(ret)
    },
    __wbindgen_object_drop_ref: function (arg0) {
      takeObject(arg0)
    },
    __wbindgen_error_new: function (arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1))
      return addHeapObject(ret)
    },
    __wbindgen_is_object: function (arg0) {
      const val = getObject(arg0)
      const ret = typeof (val) === "object" && val !== null
      return ret
    },
    __wbindgen_string_new: function (arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1)
      return addHeapObject(ret)
    },
    __wbindgen_object_clone_ref: function (arg0) {
      const ret = getObject(arg0)
      return addHeapObject(ret)
    },
    __wbg_getwithrefkey_15c62c2b8546208d: function (arg0, arg1) {
      const ret = getObject(arg0)[getObject(arg1)]
      return addHeapObject(ret)
    },
    __wbindgen_is_undefined: function (arg0) {
      const ret = getObject(arg0) === undefined
      return ret
    },
    __wbindgen_in: function (arg0, arg1) {
      const ret = getObject(arg0) in getObject(arg1)
      return ret
    },
    __wbg_log_1f7f93998ab961f7: function (arg0, arg1) {
      var v0 = getArrayJsValueFromWasm0(arg0, arg1).slice()
      wasm.__wbindgen_free(arg0, arg1 * 4)
      console.log(...v0)
    },
    __wbg_new_abda76e883ba8a5f: function () {
      const ret = new Error()
      return addHeapObject(ret)
    },
    __wbg_stack_658279fe44541cf6: function (arg0, arg1) {
      const ret = getObject(arg1).stack
      const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc)
      const len0 = WASM_VECTOR_LEN
      getInt32Memory0()[arg0 / 4 + 1] = len0
      getInt32Memory0()[arg0 / 4 + 0] = ptr0
    },
    __wbg_error_f851667af71bcfc6: function (arg0, arg1) {
      try {
        console.error(getStringFromWasm0(arg0, arg1))
      } finally {
        wasm.__wbindgen_free(arg0, arg1)
      }
    },
    __wbg_length_27a2afe8ab42b09f: function (arg0) {
      const ret = getObject(arg0).length
      return ret
    },
    __wbindgen_memory: function () {
      const ret = wasm.memory
      return addHeapObject(ret)
    },
    __wbg_buffer_cf65c07de34b9a08: function (arg0) {
      const ret = getObject(arg0).buffer
      return addHeapObject(ret)
    },
    __wbg_set_17499e8aa4003ebd: function (arg0, arg1, arg2) {
      getObject(arg0).set(getObject(arg1), arg2 >>> 0)
    },
    __wbindgen_debug_string: function (arg0, arg1) {
      const ret = debugString(getObject(arg1))
      const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc)
      const len0 = WASM_VECTOR_LEN
      getInt32Memory0()[arg0 / 4 + 1] = len0
      getInt32Memory0()[arg0 / 4 + 0] = ptr0
    },
    __wbindgen_throw: function (arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1))
    },
  },
}

/**
 * Decompression callback
 *
 * @callback DecompressCallback
 * @param {Uint8Array} compressed
 * @return {Uint8Array} decompressed
 */

/**
 * Options for instantiating a Wasm instance.
 * @typedef {Object} InstantiateOptions
 * @property {URL=} url - Optional url to the Wasm file to instantiate.
 * @property {DecompressCallback=} decompress - Callback to decompress the
 * raw Wasm file bytes before instantiating.
 */

/** Instantiates an instance of the Wasm module returning its functions.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 */
export async function instantiate(opts) {
  return (await instantiateWithInstance(opts)).exports
}

let instanceWithExports
let lastLoadPromise

/** Instantiates an instance of the Wasm module along with its exports.
 * @remarks It is safe to call this multiple times and once successfully
 * loaded it will always return a reference to the same object.
 * @param {InstantiateOptions=} opts
 * @returns {Promise<{
 *   instance: WebAssembly.Instance;
 *   exports: { Mutation : typeof Mutation ; Query : typeof Query  }
 * }>}
 */
export function instantiateWithInstance(opts) {
  if (instanceWithExports != null) {
    return Promise.resolve(instanceWithExports)
  }
  if (lastLoadPromise == null) {
    lastLoadPromise = (async () => {
      try {
        const instance = (await instantiateModule(opts ?? {})).instance
        wasm = instance.exports
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer)
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer)
        instanceWithExports = {
          instance,
          exports: getWasmInstanceExports(),
        }
        return instanceWithExports
      } finally {
        lastLoadPromise = null
      }
    })()
  }
  return lastLoadPromise
}

function getWasmInstanceExports() {
  return { Mutation, Query }
}

/** Gets if the Wasm module has been instantiated. */
export function isInstantiated() {
  return instanceWithExports != null
}

/**
 * @param {InstantiateOptions} opts
 */
async function instantiateModule(opts) {
  const wasmUrl = opts.url ?? new URL("resolvers_bg.wasm", import.meta.url)
  const decompress = opts.decompress
  const isFile = wasmUrl.protocol === "file:"

  // make file urls work in Node via dnt
  const isNode = globalThis.process?.versions?.node != null
  if (isNode && isFile) {
    // the deno global will be shimmed by dnt
    const wasmCode = await Deno.readFile(wasmUrl)
    return WebAssembly.instantiate(decompress ? decompress(wasmCode) : wasmCode, imports)
  }

  switch (wasmUrl.protocol) {
    case "file:":
    case "https:":
    case "http:": {
      if (isFile) {
        if (typeof Deno !== "object") {
          throw new Error("file urls are not supported in this environment")
        }
        if ("permissions" in Deno) {
          await Deno.permissions.request({ name: "read", path: wasmUrl })
        }
      } else if (typeof Deno === "object" && "permissions" in Deno) {
        await Deno.permissions.request({ name: "net", host: wasmUrl.host })
      }
      const wasmResponse = await fetch(wasmUrl)
      if (decompress) {
        const wasmCode = new Uint8Array(await wasmResponse.arrayBuffer())
        return WebAssembly.instantiate(decompress(wasmCode), imports)
      }
      if (
        isFile ||
        wasmResponse.headers.get("content-type")?.toLowerCase()
          .startsWith("application/wasm")
      ) {
        return WebAssembly.instantiateStreaming(wasmResponse, imports)
      } else {
        return WebAssembly.instantiate(await wasmResponse.arrayBuffer(), imports)
      }
    }
    default:
      throw new Error(`Unsupported protocol: ${wasmUrl.protocol}`)
  }
}
