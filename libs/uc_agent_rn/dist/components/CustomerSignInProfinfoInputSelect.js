'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _strings = require('../utilities/strings')
var _picker = require('@react-native-picker/picker')
var _jsxRuntime = require('react/jsx-runtime')
function _typeof(o) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o
          }),
    _typeof(o)
  )
}
function ownKeys(e, r) {
  var t = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e)
    r &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable
      })),
      t.push.apply(t, o)
  }
  return t
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {}
    r % 2
      ? ownKeys(Object(t), !0).forEach(function (r) {
          _defineProperty(e, r, t[r])
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
        : ownKeys(Object(t)).forEach(function (r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r))
          })
  }
  return e
}
function _defineProperty(e, r, t) {
  return (
    (r = _toPropertyKey(r)) in e
      ? Object.defineProperty(e, r, {
          value: t,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[r] = t),
    e
  )
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string')
  return 'symbol' == _typeof(i) ? i : i + ''
}
function _toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t
  var e = t[Symbol.toPrimitive]
  if (void 0 !== e) {
    var i = e.call(t, r || 'default')
    if ('object' != _typeof(i)) return i
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return ('string' === r ? String : Number)(t)
} /**
 * CustomerSignInProfinfoInputSelect
 * props.uiData
 * props.uiData.configurations
 * props.uiData.signInProfinfoInputsValue
 * props.uiData.signInProfileInfoInputSelect_onChange
 * props.profinfoInput
 */
var _default = (exports.default = function _default(props) {
  var _props$uiData$configu
  var configStyles =
    ((_props$uiData$configu = props.uiData.configurations.signInFormStyles) ===
      null || _props$uiData$configu === void 0
      ? void 0
      : _props$uiData$configu.brSignInProfinfoInputSelect) || {}
  var customStyles = StyleSheet.create({
    dynamic: {
      width: configStyles.width || 180,
      height: configStyles.height,
      backgroundColor: configStyles.backgroundColor,
      color: configStyles.color,
      marginTop: configStyles.marginTop,
      marginBottom: configStyles.marginBottom,
      marginLeft: configStyles.marginLeft,
      marginRight: configStyles.marginRight,
      paddingTop: configStyles.paddingTop,
      paddingBottom: configStyles.paddingBottom,
      paddingLeft: configStyles.paddingLeft,
      paddingRight: configStyles.paddingRight,
    },
  })
  return /*#__PURE__*/ (0, _jsxRuntime.jsx)(View, {
    style: [styles.container, customStyles.dynamic],
    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_picker.Picker, {
      style: styles.picker,
      selectedValue: (0, _strings.string)(
        props.uiData.signInProfinfoInputsValue[props.profinfoInput.key],
      ),
      onValueChange: function onValueChange(itemValue) {
        props.uiData.fire(
          'signInProfileInfoInputSelect_onChange',
          _objectSpread(
            _objectSpread({}, props.profinfoInput),
            {},
            {
              value: itemValue,
            },
          ),
        )
      },
      mode: 'dropdown',
      children: props.profinfoInput.options.map(function (o) {
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
          _picker.Picker.Item,
          {
            label: o,
            value: o,
            style: styles.pickerItem,
          },
          o,
        )
      }),
    }),
  })
})
var styles = StyleSheet.create({
  container: _objectSpread(
    {
      width: 180,
      // Default width from LESS
      overflow: 'hidden',
      borderRadius: 4,
    },
    Platform.select({
      ios: {
        backgroundColor: '#fff',
      },
      android: {
        backgroundColor: 'transparent',
      },
    }),
  ),
  picker: {
    width: '100%',
    height: Platform.select({
      ios: 40,
      android: 50,
    }),
    color: '#000',
  },
  pickerItem: {
    fontSize: 16,
    color: '#000',
  },
})
