Object.values = Object.values
  ? Object.values
  : function (obj) {
      var allowedTypes = [
        '[object String]',
        '[object Object]',
        '[object Array]',
        '[object Function]',
      ]
      var objType = Object.prototype.toString.call(obj)

      if (obj === null || typeof obj === 'undefined') {
        throw new TypeError('Cannot convert undefined or null to object')
      } else if (!~allowedTypes.indexOf(objType)) {
        return []
      } else {
        // if ES6 is supported
        if (Object.keys) {
          return Object.keys(obj).map(function (key) {
            return obj[key]
          })
        }

        var result = []
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            result.push(obj[prop])
          }
        }

        return result
      }
    }
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict'
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object')
      }

      var to = Object(target)

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index]

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey]
            }
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true,
  })
}
if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined')
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function')
    }
    var list = Object(this)
    var length = list.length >>> 0
    var thisArg = arguments[1]
    var value

    for (var i = 0; i < length; i++) {
      value = list[i]
      if (predicate.call(thisArg, value, i, list)) {
        return value
      }
    }
    return undefined
  }
}
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (predicate) {
    if (this === null) {
      throw new TypeError(
        'Array.prototype.findIndex called on null or undefined',
      )
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function')
    }
    var list = Object(this)
    var length = list.length >>> 0
    var thisArg = arguments[1]
    var value

    for (var i = 0; i < length; i++) {
      value = list[i]
      if (predicate.call(thisArg, value, i, list)) {
        return i
      }
    }
    return -1
  }
}
module.exports = {}
