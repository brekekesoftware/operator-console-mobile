'use strict'

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
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _strings = require('../utilities/strings')
var _picker = require('@react-native-picker/picker')
var _reactNativeDatePicker = _interopRequireDefault(
  require('react-native-date-picker'),
)
require('../utilities/disableamd')
require('../utilities/restoreamd')
require('moment/locale/ja')
require('moment/locale/zh-cn')
var _moment = _interopRequireDefault(require('moment'))
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
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
function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError('Cannot call a class as a function')
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t]
    ;(o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      'value' in o && (o.writable = !0),
      Object.defineProperty(e, _toPropertyKey(o.key), o)
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
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
}
function _callSuper(t, o, e) {
  return (
    (o = _getPrototypeOf(o)),
    _possibleConstructorReturn(
      t,
      _isNativeReflectConstruct()
        ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor)
        : o.apply(t, e),
    )
  )
}
function _possibleConstructorReturn(t, e) {
  if (e && ('object' == _typeof(e) || 'function' == typeof e)) return e
  if (void 0 !== e)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    )
  return _assertThisInitialized(t)
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    )
  return e
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    )
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t
  })()
}
function _getPrototypeOf(t) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t)
        }),
    _getPrototypeOf(t)
  )
}
function _inherits(t, e) {
  if ('function' != typeof e && null !== e)
    throw new TypeError('Super expression must either be null or a function')
  ;(t.prototype = Object.create(e && e.prototype, {
    constructor: { value: t, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(t, 'prototype', { writable: !1 }),
    e && _setPrototypeOf(t, e)
}
function _setPrototypeOf(t, e) {
  return (
    (_setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t
        }),
    _setPrototypeOf(t, e)
  )
}
_moment.default.locale('en')
_uawmsgs.default.registerMoment(_moment.default)

/**
 * SearchConditionsArea
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.panelType
 * props.panelCode
 */
var SearchConditionsArea = (exports.default = /*#__PURE__*/ (function (
  _React$Component,
) {
  function SearchConditionsArea(props) {
    var _this
    _classCallCheck(this, SearchConditionsArea)
    _this = _callSuper(this, SearchConditionsArea, [props])
    _this.state = {
      showStartDatePicker: false,
      showEndDatePicker: false,
      inputValues: {},
    }
    return _this
  }
  _inherits(SearchConditionsArea, _React$Component)
  return _createClass(SearchConditionsArea, [
    {
      key: 'debounce',
      value: function debounce(func, delay) {
        var timeoutId
        return function () {
          var _this2 = this
          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key]
          }
          clearTimeout(timeoutId)
          timeoutId = setTimeout(function () {
            func.apply(_this2, args)
          }, delay)
        }
      },
    },
    {
      key: 'handleDatePickerChange',
      value: function handleDatePickerChange(
        searchConditionIndex,
        isEnd,
        selectedDate,
      ) {
        var props = this.props
        var searchConditions = props.uiData.ucUiStore.getSearchConditions({
          chatType: props.panelType,
          chatCode: props.panelCode,
        })
        if (searchConditions && searchConditions[searchConditionIndex]) {
          var startEnd = (0, _strings.string)(
            searchConditions[searchConditionIndex].conditionValue,
          ).split('-')
          var momentDate = (0, _moment.default)(selectedDate)
          if (!isEnd) {
            startEnd[0] = (0, _strings.string)(
              momentDate.startOf('day').valueOf(),
            )
            startEnd[1] = (0, _strings.string)(startEnd[1])
            this.setState({
              showStartDatePicker: false,
            })
          } else {
            startEnd[0] = (0, _strings.string)(startEnd[0])
            startEnd[1] = (0, _strings.string)(
              momentDate.endOf('day').valueOf(),
            )
            this.setState({
              showEndDatePicker: false,
            })
          }
          searchConditions[searchConditionIndex].conditionValue =
            startEnd.join('-')
          props.uiData.ucUiAction.setSearchConditions({
            chatType: props.panelType,
            chatCode: props.panelCode,
            searchConditions: searchConditions,
          })
        }
      },
    },
    {
      key: 'handleSelectChange',
      value: function handleSelectChange(searchConditionIndex, value) {
        this.changeSearchCondition(searchConditionIndex, value)
      },
    },
    {
      key: 'handleInputChange',
      value: function handleInputChange(searchConditionIndex, value) {
        var inputValues = _objectSpread({}, this.state.inputValues)
        inputValues[searchConditionIndex] = value
        this.setState({
          inputValues: inputValues,
        })
        this.debounce(
          this.changeSearchCondition(searchConditionIndex, value),
          700,
        )
      },
    },
    {
      key: 'handleInputBlur',
      value: function handleInputBlur(searchConditionIndex) {
        var value = this.state.inputValues[searchConditionIndex]
        var inputValues = _objectSpread({}, this.state.inputValues)
        delete inputValues[searchConditionIndex]
        this.setState({
          inputValues: inputValues,
        })
        this.changeSearchCondition(searchConditionIndex, value)
      },
    },
    {
      key: 'handleInputSubmit',
      value: function handleInputSubmit(searchConditionIndex) {
        var value = this.state.inputValues[searchConditionIndex]
        var inputValues = _objectSpread({}, this.state.inputValues)
        delete inputValues[searchConditionIndex]
        this.setState({
          inputValues: inputValues,
        })
        this.changeSearchCondition(searchConditionIndex, value)
        this.props.uiData.ucUiAction.doSearch({
          chatType: this.props.panelType,
          chatCode: this.props.panelCode,
          emphasize: true,
        })
      },
    },
    {
      key: 'handleDoSearchPress',
      value: function handleDoSearchPress() {
        this.props.uiData.ucUiAction.doSearch({
          chatType: this.props.panelType,
          chatCode: this.props.panelCode,
          emphasize: true,
        })
      },
    },
    {
      key: 'changeSearchCondition',
      value: function changeSearchCondition(searchConditionIndex, value) {
        var props = this.props
        var searchConditions = props.uiData.ucUiStore.getSearchConditions({
          chatType: props.panelType,
          chatCode: props.panelCode,
        })
        if (searchConditions && searchConditions[searchConditionIndex]) {
          searchConditions[searchConditionIndex].conditionValue = value
          props.uiData.ucUiAction.setSearchConditions({
            chatType: props.panelType,
            chatCode: props.panelCode,
            searchConditions: searchConditions,
          })
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this3 = this
        var props = this.props
        console.log(
          '#Duy Phan console this.state.showStartDatePicker',
          this.state.showStartDatePicker,
        )
        var searchConditions = props.uiData.ucUiStore.getSearchConditions({
          chatType: props.panelType,
          chatCode: props.panelCode,
        })
        var searchWorkData = props.uiData.ucUiStore.getSearchWorkData({
          chatType: props.panelType,
          chatCode: props.panelCode,
        })
        return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.searchConditionsArea,
          children: /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
            _reactNative.ScrollView,
            {
              style: styles.conditionsContainer,
              children: [
                searchConditions.map(function (searchCondition, i) {
                  var _searchCondition$opti
                  var conditionLabel =
                    searchCondition.conditionLabel ||
                    (searchCondition.conditionKey === '_content'
                      ? _uawmsgs.default.LBL_SEARCH_CONDITION_CONTENT
                      : searchCondition.conditionKey === '_datetime'
                        ? _uawmsgs.default.LBL_SEARCH_CONDITION_DATETIME
                        : searchCondition.conditionKey === '_webchatIds'
                          ? _uawmsgs.default.LBL_SEARCH_CONDITION_WEBCHATIDS
                          : '')
                  if (searchCondition.hidden) {
                    return null
                  }
                  return /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                    _reactNative.View,
                    {
                      style: styles.conditionRow,
                      children: [
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.Text, {
                          style: styles.labelColumn,
                          children: conditionLabel,
                        }),
                        /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                          style: styles.inputColumn,
                          children:
                            searchCondition.conditionKey === '_datetime'
                              ? /*#__PURE__*/ (0, _jsxRuntime.jsxs)(
                                  _reactNative.View,
                                  {
                                    style: styles.datePickerContainer,
                                    children: [
                                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                        _reactNative.TouchableOpacity,
                                        {
                                          style: styles.datePickerButton,
                                          onPress: function onPress() {
                                            return _this3.setState({
                                              showStartDatePicker: true,
                                            })
                                          },
                                          children: /*#__PURE__*/ (0,
                                          _jsxRuntime.jsx)(_reactNative.Text, {
                                            children: _this3.getFormattedDate(
                                              searchCondition.conditionValue,
                                              false,
                                            ),
                                          }),
                                        },
                                      ),
                                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                        _reactNative.Text,
                                        {
                                          style: styles.separator,
                                          children: '-',
                                        },
                                      ),
                                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                        _reactNative.TouchableOpacity,
                                        {
                                          style: styles.datePickerButton,
                                          onPress: function onPress() {
                                            return _this3.setState({
                                              showEndDatePicker: true,
                                            })
                                          },
                                          children: /*#__PURE__*/ (0,
                                          _jsxRuntime.jsx)(_reactNative.Text, {
                                            children: _this3.getFormattedDate(
                                              searchCondition.conditionValue,
                                              true,
                                            ),
                                          }),
                                        },
                                      ),
                                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                        _reactNativeDatePicker.default,
                                        {
                                          date: _this3.getDateValue(
                                            searchCondition.conditionValue,
                                            false,
                                          ),
                                          modal: true,
                                          mode: 'date',
                                          open: _this3.state
                                            .showStartDatePicker,
                                          onConfirm: function onConfirm(date) {
                                            return _this3.handleDatePickerChange(
                                              i,
                                              false,
                                              date,
                                            )
                                          },
                                          onCancel: function onCancel() {
                                            return _this3.setState({
                                              showStartDatePicker: false,
                                            })
                                          },
                                        },
                                      ),
                                      /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                        _reactNativeDatePicker.default,
                                        {
                                          date: _this3.getDateValue(
                                            searchCondition.conditionValue,
                                            true,
                                          ),
                                          modal: true,
                                          mode: 'date',
                                          open: _this3.state.showEndDatePicker,
                                          onConfirm: function onConfirm(date) {
                                            return _this3.handleDatePickerChange(
                                              i,
                                              true,
                                              date,
                                            )
                                          },
                                          onCancel: function onCancel() {
                                            return _this3.setState({
                                              showEndDatePicker: false,
                                            })
                                          },
                                        },
                                      ),
                                    ],
                                  },
                                )
                              : (_searchCondition$opti =
                                    searchCondition.options) !== null &&
                                  _searchCondition$opti !== void 0 &&
                                  _searchCondition$opti.length
                                ? /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _picker.Picker,
                                    {
                                      style: [
                                        styles.picker,
                                        searchCondition.conditionKey ===
                                          '_content' && styles.contentPicker,
                                        searchCondition.conditionKey ===
                                          '_webchatIds' &&
                                          styles.webchatIdsPicker,
                                      ],
                                      selectedValue:
                                        searchCondition.conditionValue,
                                      onValueChange: function onValueChange(
                                        value,
                                      ) {
                                        return _this3.handleSelectChange(
                                          i,
                                          value,
                                        )
                                      },
                                      children: searchCondition.options.map(
                                        function (option, j) {
                                          return /*#__PURE__*/ (0,
                                          _jsxRuntime.jsx)(
                                            _picker.Picker.Item,
                                            {
                                              label: option.optionLabel,
                                              value: option.optionValue,
                                            },
                                            j,
                                          )
                                        },
                                      ),
                                    },
                                  )
                                : /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                                    _reactNative.TextInput,
                                    {
                                      style: [
                                        styles.textInput,
                                        searchCondition.conditionKey ===
                                          '_content' && styles.contentInput,
                                        searchCondition.conditionKey ===
                                          '_webchatIds' &&
                                          styles.webchatIdsInput,
                                      ],
                                      value:
                                        _this3.state.inputValues[i] !==
                                        undefined
                                          ? _this3.state.inputValues[i]
                                          : searchCondition.conditionValue,
                                      onChangeText: function onChangeText(
                                        text,
                                      ) {
                                        return _this3.handleInputChange(i, text)
                                      },
                                      // onBlur={() => this.handleInputBlur(i)}
                                      // onSubmitEditing={() => this.handleInputSubmit(i)}
                                    },
                                  ),
                        }),
                      ],
                    },
                    i,
                  )
                }),
                /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
                  style: styles.searchButtonContainer,
                  children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                    _reactNative.TouchableOpacity,
                    {
                      style: [
                        styles.searchButtonContainer,
                        styles.searchButton,
                        searchWorkData.searching && styles.searchButtonDisabled,
                      ],
                      disabled: searchWorkData.searching,
                      onPress: function onPress() {
                        return _this3.handleDoSearchPress()
                      },
                      activeOpacity: 0.8,
                      pressRetentionOffset: {
                        top: 10,
                        left: 10,
                        right: 10,
                        bottom: 10,
                      },
                      children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(
                        _reactNative.Text,
                        {
                          style: [
                            styles.searchButtonText,
                            searchWorkData.searching &&
                              styles.searchButtonDisabled,
                          ],
                          children: _uawmsgs.default.LBL_SEARCH_DO_BUTTON,
                        },
                      ),
                    },
                  ),
                }),
              ],
            },
          ),
        })
      },
    },
    {
      key: 'getDateValue',
      value: function getDateValue(conditionValue, isEnd) {
        var startEnd = (0, _strings.string)(conditionValue).split('-')
        var timestamp = isEnd ? startEnd[1] : startEnd[0]
        return timestamp ? new Date((0, _strings.int)(timestamp)) : new Date()
      },
    },
    {
      key: 'getFormattedDate',
      value: function getFormattedDate(conditionValue, isEnd) {
        var startEnd = (0, _strings.string)(conditionValue).split('-')
        var timestamp = isEnd ? startEnd[1] : startEnd[0]
        return timestamp
          ? (0, _moment.default)((0, _strings.int)(timestamp)).format(
              'YYYY-MM-DD',
            )
          : 'Select date'
      },
    },
  ])
})(_react.default.Component))
var styles = _reactNative.StyleSheet.create({
  searchConditionsArea: {
    borderWidth: 1,
    borderColor: '#dcdcd5',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  conditionsContainer: {
    flex: 1,
    padding: 16,
  },
  conditionRow: {
    flexDirection: 'row',
    marginBottom: 2,
    alignItems: 'center',
  },
  labelColumn: {
    padding: 1,
    textAlign: 'right',
    width: 120,
    color: '#333333',
    fontSize: 14,
  },
  inputColumn: {
    paddingVertical: 1,
    paddingLeft: 4,
    paddingRight: 1,
    flex: 1,
  },
  textInput: {
    height: 32,
    width: 150,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    paddingVertical: 1,
    paddingHorizontal: 0,
    paddingLeft: 8,
  },
  contentInput: {
    width: 200,
  },
  datePickerContainer: {
    width: 220,
    flexDirection: 'row',
    alignItems: 'center',
  },
  datePickerButton: {
    width: 100,
    height: 32,
    borderWidth: 1,
    borderColor: '#dcdcd5',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  separator: {
    marginHorizontal: 2,
  },
  searchButtonContainer: {
    padding: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  searchButton: _objectSpread(
    {
      height: 30,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#dcdcd5',
      borderRadius: 1,
      backgroundColor: '#f8f8f6',
      justifyContent: 'center',
      alignItems: 'center',
    },
    _reactNative.Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  ),
  searchButtonText: {
    color: '#888169',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  searchButtonPressed: {
    backgroundColor: '#ffffff',
  },
  searchButtonPressedText: {
    color: '#685947',
  },
  searchButtonActive: {
    backgroundColor: '#ccccc2',
  },
  searchButtonDisabled: {
    opacity: 0.33,
  },
  picker: {
    height: 32,
    width: 150,
    borderWidth: 1,
    borderColor: '#dcdcd5',
  },
  contentPicker: {
    width: 200,
  },
  webchatIdsPicker: {
    width: 150,
  },
  hidden: {
    display: 'none',
  },
})
