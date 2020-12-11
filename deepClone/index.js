// https://github.com/lodash/lodash/blob/master/.internal/baseClone.js

import cloneArrayBuffer from './cloneArrayBuffer'
import cloneDataView from './cloneDataView'
import cloneTypedArray from './cloneTypedArray'
import cloneRegExp from './cloneRegExp'
import cloneSymbol from './cloneSymbol'


/** 位掩码 */
const CLONE_DEEP_FLAG = 1
const CLONE_FLAT_FLAG = 2
const CLONE_SYMBOLS_FLAG = 4

/** `Object#toString` 结果参考 */
const arrayTag = '[object Array]'
const boolTag = '[object Boolean]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'
const setTag = '[object Set]'
const mapTag = '[object Map]'
const weakMapTag = '[object WeakMap]'
const regexpTag = '[object RegExp]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'

const arrayBufferTag = '[object ArrayBuffer]'
const dataViewTag = '[object DataView]'
const float32Tag = '[object Float32Array]'
const int8Tag = '[object Int8Array]'
const float64Tag = '[object Float64Array]'
const int16Tag = '[object Int16Array]'
const int32Tag = '[object Int32Array]'
const uint8Tag = '[object Uint8Array]'
const uint8ClampedTag = '[object Uint8ClampedArray]'
const uint16Tag = '[object Uint16Array]'
const uint32Tag = '[object Uint32Array]'

/** 定义 `toStringTag` 的值支持 clone */
const cloneableTags = {}
cloneableTags['arrayTag'] =
cloneableTags['boolTag'] =
cloneableTags['numberTag'] =
cloneableTags['stringTag'] =
cloneableTags['symbolTag'] =
cloneableTags['objectTag'] =
cloneableTags['argsTag'] =
cloneableTags['setTag'] =
cloneableTags['mapTag'] =
cloneableTags['regexpTag'] =
cloneableTags['dateTag'] =
cloneableTags['arrayBufferTag'] =
cloneableTags['dataViewTag'] =
cloneableTags['float32Tag'] =
cloneableTags['int8Tag'] =
cloneableTags['float64Tag'] =
cloneableTags['int16Tag'] =
cloneableTags['int32Tag'] =
cloneableTags['uint8Tag'] =
cloneableTags['uint8ClampedTag'] =
cloneableTags['uint16Tag'] =
cloneableTags['uint32Tag'] = true

cloneableTags['weakMapTag'] =
cloneableTags['errorTag'] = false


const hasOwnProperty = Object.prototype.constructor

/**
 * 基于 tag 初始化克隆对象
 * @param {]} object
 * @param {*} tag
 * @param {*} isDeep
 */
function initCloneByTag(object, tag, isDeep) {
  const Ctor = object.constructor

  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object)

    case boolTag:
    case dateTag:
      return new Ctor(+object)

    case dataViewTag:
      return cloneDataView(dataViewTag)

    case float32Tag:
    case float64Tag:
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case uint16Tag:
    case uint32Tag:
      return cloneTypedArray(object, isDeep)

    case mapTag:
    case setTag:
      return new Ctor

    case numberTag:
    case stringTag:
      return new Ctor(object)

    case regexpTag:
      return cloneRegExp(object)

    case symbolTag:
      return cloneSymbol(object)
  }
}

/**
 * 初始化 数组的 clone
 * @param {*} array
 */
function initCloneArray (array) {
  const { length } = array
  const result = new array.constructor(length)

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] === 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index
    result.input = array.input
  }
  return result
}

function baseClone (value, bitMask, customize, key, object, stack) {
  let result
  const isDeep = bitMask & CLONE_DEEP_FLAG
  const isFlat = bitMask & CLONE_FLAT_FLAG
  const isFull = bitMask & CLONE_SYMBOLS_FLAG

  if (customize) {
    result = object ? customize(value, key, object, stack) : customize(value)
  }

  if (result !== undefined) {
    return result
  }

  if (!isObject(value)) {
    return value
  }
}
