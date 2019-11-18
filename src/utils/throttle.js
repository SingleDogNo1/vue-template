/* eslint-disable */
let FUNC_ERROR_TEXT = 'Expected a function'
let [nativeMax, nativeMin] = [Math.max, Math.min]
let freeGlobal = typeof global === 'object' && global && global.Object === Object && global
let [undefinedTag, nullTag, symbolTag] = ['[object Undefined]', '[object Null]', '[object Symbol]']
let freeSelf = typeof self === 'object' && self && self.Object === Object && self
let root = freeGlobal || freeSelf || Function('return this')()
let ctxNow = Date && Date.now !== root.Date.now && Date.now
let NAN = 0 / 0
let symToStringTag = Symbol ? Symbol.toStringTag : undefined
let objectProto = Object.prototype
let hasOwnProperty = objectProto.hasOwnProperty
let nativeObjectToString = objectProto.toString
let [reTrim, reIsBinary, reIsOctal, freeParseInt, reIsBadHex] = [/^\s+|\s+$/g, /^0b[01]+$/i, /^0o[0-7]+$/i, parseInt, /^[-+]0x[0-9a-f]+$/i]
let now =
  ctxNow ||
  function() {
    return root.Date.now()
  }

function toNumber(value) {
  if (typeof value === 'number') {
    return value
  }
  if (isSymbol(value)) {
    return NAN
  }

  function getRawTag(value) {
    let isOwn = hasOwnProperty.call(value, symToStringTag)
    let tag = value[symToStringTag]
    value[symToStringTag] = undefined
    let unmasked = true
    let result = nativeObjectToString.call(value)
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag
      } else {
        delete value[symToStringTag]
      }
    }
    return result
  }

  function isObjectLike(value) {
    return value != null && typeof value === 'object'
  }

  function objectToString(value) {
    return nativeObjectToString.call(value)
  }

  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value)
  }

  function isSymbol(value) {
    return typeof value === 'symbol' || (isObjectLike(value) && baseGetTag(value) === symbolTag)
  }

  if (isObject(value)) {
    let other = typeof value.valueOf === 'function' ? value.valueOf() : value
    value = isObject(other) ? other + '' : other
  }
  if (typeof value !== 'string') {
    return value === 0 ? value : +value
  }
  value = value.replace(reTrim, '')
  let isBinary = reIsBinary.test(value)
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value
}

function isObject(value) {
  let type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

/**
 * 防抖函数
 * @param {Function} func 防抖函数
 * @param {Number} wait 防抖执行时间
 * @param {Object} options 选项对象
 * @param {Boolean} options.leading 指定在延迟开始前调用
 * @param {Number} options.maxWait 函数允许被延迟的最大长时间
 * @param {Boolean} options.trailing 指定在延迟结束时调用
 * @returns 返回新的防抖函数 debounced
 */
function debounce(
  func,
  wait = 600,
  options = {
    leading: false,
    maxWait: 3000,
    trailing: true
  }) {
  let lastArgs,lastThis,maxWait,result,timerId,lastCallTime,lastInvokeTime = 0,leading = false,maxing = false,trailing = true

  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT)
  }
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time) {
    let args = lastArgs
    let thisArg = lastThis
    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge(time) {
    lastInvokeTime = time
    timerId = setTimeout(timerExpired, wait)
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time) {
    let timeSinceLastCall = time - lastCallTime
    let timeSinceLastInvoke = time - lastInvokeTime
    let timeWaiting = wait - timeSinceLastCall
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
  }

  function shouldInvoke(time) {
    let timeSinceLastCall = time - lastCallTime
    let timeSinceLastInvoke = time - lastInvokeTime
    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || (maxing && timeSinceLastInvoke >= maxWait)
  }

  function timerExpired() {
    let time = now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge(time) {
    timerId = undefined
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now())
  }

  function debounced() {
    let time = now()
    let isInvoking = shouldInvoke(time)

    lastArgs = arguments
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}

/**
 * 节流函数
 * @param {Function} func 要节流的函数
 * @param {Number} wait 需要节流的毫秒数
 * @param {Object} options 选项对象
 * @param {Object} options.leading 指定调用在节流函数开始前
 * @param {Object} options 指定调用在节流函数结束后
 * @returns 返回节流的函数
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

export {
  throttle,
  debounce
}