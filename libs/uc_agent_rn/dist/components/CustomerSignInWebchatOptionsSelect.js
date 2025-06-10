'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _reactNative = require('react-native')
var _picker = require('@react-native-picker/picker')
var _strings = require('../utilities/strings')
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
 * CustomerSignInWebchatOptionsSelect
 * props.uiData
 * props.uiData.configurations
 * props.uiData.signInWebchatOptionsSelectIndex
 * props.uiData.signInWebchatOptionsInputValue
 * props.uiData.signInWebchatOptionsSelect_onChange
 * props.uiData.signInWebchatOptionsInput_onChange
 */
var _default = (exports.default = function _default(props) {
  if (
    props.uiData.configurations.webchatOptions &&
    props.uiData.configurations.webchatOptions.length
  ) {
    var _props$uiData$configu,
      _props$uiData$configu2,
      _props$uiData$configu3,
      _props$uiData$configu4
    var op = props.uiData.configurations.webchatOptions.find(
      function (o, index) {
        return index === props.uiData.signInWebchatOptionsSelectIndex
      },
    )
    var areaStyles =
      ((_props$uiData$configu =
        props.uiData.configurations.signInFormStyles) === null ||
      _props$uiData$configu === void 0
        ? void 0
        : _props$uiData$configu.brSignInWebchatOptionsArea) || {}
    var labelStyles =
      ((_props$uiData$configu2 =
        props.uiData.configurations.signInFormStyles) === null ||
      _props$uiData$configu2 === void 0
        ? void 0
        : _props$uiData$configu2.brSignInWebchatOptionsLabel) || {}
    var selectStyles =
      ((_props$uiData$configu3 =
        props.uiData.configurations.signInFormStyles) === null ||
      _props$uiData$configu3 === void 0
        ? void 0
        : _props$uiData$configu3.brSignInWebchatOptionsSelect) || {}
    var inputStyles =
      ((_props$uiData$configu4 =
        props.uiData.configurations.signInFormStyles) === null ||
      _props$uiData$configu4 === void 0
        ? void 0
        : _props$uiData$configu4.brSignInWebchatOptionsInput) || {}
    if (props.uiData.configurations.webchatOptions.length < 2) {
      return null
    }
    return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: [
        styles.brSignInWebchatOptionsArea,
        props.uiData.configurations.webchatOptions.length >= 2
          ? styles.brWebchatOptionsMandatory
          : styles.brWebchatOptionsFixed,
        areaStyles,
      ],
      children: [
        /*#__PURE__*/ (0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.labelContainer,
          children: [
            /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: [styles.brSignInWebchatOptionsLabel, labelStyles],
              children: props.uiData.configurations.webchatOptionsInnerHTML
                ? props.uiData.configurations.webchatOptionsInnerHTML.replace(
                    /<[^>]*>/g,
                    '',
                  )
                : (0, _strings.string)(
                    props.uiData.configurations.webchatOptionsLabel,
                  ),
            }),
            props.uiData.configurations.webchatOptions.length >= 2 &&
              /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: styles.mandatoryIndicator,
                children: '*',
              }),
          ],
        }),
        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.pickerContainer,
          children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_picker.Picker, {
            style: [styles.brSignInWebchatOptionsSelect, selectStyles],
            selectedValue: props.uiData.signInWebchatOptionsSelectIndex,
            onValueChange: function onValueChange(itemValue) {
              props.uiData.fire('signInWebchatOptionsSelect_onChange', {
                target: {
                  value: itemValue,
                },
              })
            },
            children: props.uiData.configurations.webchatOptions.map(
              function (o, index) {
                return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                  _picker.Picker.Item,
                  {
                    label: o.innerHTML
                      ? o.innerHTML.replace(/<[^>]*>/g, '')
                      : (0, _strings.string)(o.label),
                    value: index,
                  },
                  index,
                )
              },
            ),
          }),
        }),
        op &&
          op.value &&
          op.value.indexOf('{0}') !== -1 &&
          /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.TextInput, {
            style: [styles.brSignInWebchatOptionsInput, inputStyles],
            value: props.uiData.signInWebchatOptionsInputValue,
            onChangeText: function onChangeText(text) {
              props.uiData.fire('signInWebchatOptionsInput_onChange', {
                target: {
                  value: text,
                },
              })
            },
          }),
      ],
    })
  } else {
    return null
  }
})
var styles = _reactNative.StyleSheet.create({
  brSignInWebchatOptionsArea: {
    width: 180,
    marginVertical: 8,
    marginHorizontal: 'auto',
    alignItems: 'center',
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  brWebchatOptionsFixed: {
    display: 'none',
  },
  brWebchatOptionsMandatory: {},
  labelContainer: {
    width: 180,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  brSignInWebchatOptionsLabel: {
    width: 180,
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    marginBottom: 8,
  },
  mandatoryIndicator: {
    color: '#bb7755',
    marginLeft: 2,
    fontSize: 16,
  },
  pickerContainer: _objectSpread(
    {
      width: 180,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      backgroundColor: '#fff',
      marginBottom: 10,
    },
    _reactNative.Platform.select({
      ios: {
        height: 40,
      },
      android: {
        height: 50,
      },
    }),
  ),
  brSignInWebchatOptionsSelect: _objectSpread(
    {
      width: 180,
    },
    _reactNative.Platform.select({
      ios: {
        height: 40,
      },
      android: {
        height: 50,
      },
    }),
  ),
  brSignInWebchatOptionsInput: {
    width: 180,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
  },
})
