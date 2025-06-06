'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _ChatList = _interopRequireDefault(require('./ChatList'))
var _strings = require('../utilities/strings')
var _RadioCheckboxCheckedIcon = _interopRequireDefault(
  require('../icons/RadioCheckboxCheckedIcon'),
)
var _RadioCheckboxUncheckedIcon = _interopRequireDefault(
  require('../icons/RadioCheckboxUncheckedIcon'),
)
var _reactNativeGestureHandler = require('react-native-gesture-handler')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
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
}
var colors = {
  white: '#FFFFFF',
  black: '#000000',
  borderColor: '#DCDCD5',
  backgroundColor: '#F8F8F6',
  hoverColor: '#4BC5DE',
  activeColor: '#CCCCC2',
  textColor: '#888169',
  textHoverColor: '#685947',
  yellow: '#FFFF00',
}
var styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderColor,
    height: '100%',
  },
  header: {
    display: 'none',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 27,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    zIndex: 1,
  },
  headerVisible: {
    display: 'flex',
  },
  scrollable: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  scrollableWithHeader: {
    marginTop: 27,
  },
  selectAllButton: {
    position: 'absolute',
    right: 4,
    top: 2,
    height: 22,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 1,
    backgroundColor: colors.backgroundColor,
  },
  selectAllButtonText: {
    color: colors.textColor,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  selectAllButtonSelected: {
    backgroundColor: colors.activeColor,
  },
  checkboxButton: {
    position: 'absolute',
    left: 1,
    top: 2,
    width: 18,
    height: 22,
  },
  checkbox: {
    width: 18,
    height: 22,
    resizeMode: 'contain',
  },
  tableContainer: {
    flex: 1,
  },
  tableHidden: {
    display: 'none',
  },
  row: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    backgroundColor: colors.backgroundColor,
    height: 50,
  },
  rowHovered: {
    borderTopColor: colors.hoverColor,
    borderBottomColor: colors.hoverColor,
    backgroundColor: colors.white,
  },
  rowActive: {
    borderTopColor: colors.hoverColor,
    borderBottomColor: colors.hoverColor,
    backgroundColor: colors.activeColor,
  },
  checkCell: {
    padding: 1,
    paddingLeft: 1,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCellHidden: {
    width: 0,
    display: 'none',
  },
  timeCell: {
    width: 60,
    padding: 6,
    paddingLeft: 4,
    paddingRight: 0,
  },
  nameCell: {
    width: 100,
    padding: 6,
    paddingLeft: 4,
    paddingRight: 0,
  },
  nameText: {
    fontWeight: 'bold',
  },
  summaryCell: {
    flex: 1,
    padding: 6,
    paddingLeft: 4,
    paddingRight: 0,
  },
  emphasizedText: {
    color: colors.black,
    backgroundColor: colors.yellow,
    fontWeight: 'bold',
  },
  selectCell: {
    padding: 1,
    paddingRight: 4,
    paddingLeft: 0,
    width: 100,
    alignItems: 'flex-end',
  },
  selectCellHidden: {
    width: 0,
  },
  selectButton: {
    maxWidth: 96,
    height: 22,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonText: {
    color: colors.textColor,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  selectButtonSelected: {
    backgroundColor: colors.activeColor,
  },
  detailRow: {
    display: 'none',
  },
  detailRowExpanded: {
    display: 'flex',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    backgroundColor: colors.white,
  },
  errorArea: {
    alignItems: 'center',
    padding: 4,
  },
  errorAreaHidden: {
    display: 'none',
  },
  errorMessage: {
    color: colors.black,
    backgroundColor: colors.yellow,
    fontWeight: 'bold',
  },
  searchMoreArea: {
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    alignItems: 'center',
    padding: 4,
  },
  searchMoreAreaHidden: {
    display: 'none',
  },
  searchMoreButton: {
    height: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchMoreButtonText: {
    color: colors.textColor,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  searchingArea: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 4,
  },
  searchingAreaHidden: {
    display: 'none',
  },
  searchingIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  searchingMessage: {
    alignSelf: 'center',
  },
  gradientButton: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})

/**
 * SearchResultsArea
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.panelType
 * props.panelCode
 * props.selectable
 * props.allSelectable
 * props.checkBox
 * props.emphasize
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(_props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [_props])
    _defineProperty(_this, 'handleResultPress', function (searchResultId) {
      var _this2 = _this,
        props = _this2.props
      props.uiData.ucUiAction.expandSearchResult({
        chatType: props.panelType,
        chatCode: props.panelCode,
        searchResultIds: [searchResultId],
      })
    })
    _defineProperty(
      _this,
      'handleSelectPress',
      function (searchResultId, event) {
        var _this3 = _this,
          props = _this3.props
        props.uiData.ucUiAction.selectSearchResult({
          chatType: props.panelType,
          chatCode: props.panelCode,
          selectIds: [],
          unselectIds: [],
          reverseIds: [searchResultId],
        })
      },
    )
    _defineProperty(_this, 'handleSelectAllPress', function () {
      var _this4 = _this,
        props = _this4.props
      if (_this.state.selectedAll) {
        _this.setState({
          selectedAll: false,
        })
        props.uiData.ucUiAction.selectSearchResult({
          chatType: props.panelType,
          chatCode: props.panelCode,
          selectIds: [],
          unselectIds: null,
          reverseIds: [],
        })
      } else {
        _this.setState({
          selectedAll: true,
        })
        props.uiData.ucUiAction.selectSearchResult({
          chatType: props.panelType,
          chatCode: props.panelCode,
          selectIds: null,
          unselectIds: [],
          reverseIds: [],
        })
      }
    })
    _defineProperty(_this, 'handleSearchMorePress', function () {
      var _this5 = _this,
        props = _this5.props
      props.uiData.ucUiAction.doSearch({
        chatType: props.panelType,
        chatCode: props.panelCode,
        searchMore: true,
        emphasize: true,
      })
    })
    _defineProperty(_this, 'renderCheckbox', function (selected) {
      return /*#__PURE__*/ _react.default.createElement(
        _reactNative.View,
        {
          style: styles.checkbox,
        },
        selected
          ? /*#__PURE__*/ _react.default.createElement(
              _RadioCheckboxCheckedIcon.default,
              null,
            )
          : /*#__PURE__*/ _react.default.createElement(
              _RadioCheckboxUncheckedIcon.default,
              null,
            ),
      )
    })
    _defineProperty(
      _this,
      'renderButton',
      function (text, onPress, selected, style, textStyle) {
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.TouchableOpacity,
          {
            style: [style, selected && styles.selectButtonSelected],
            onPress: onPress,
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.Text,
            {
              style: textStyle,
            },
            text,
          ),
        )
      },
    )
    _defineProperty(
      _this,
      'renderSearchResult',
      function (searchResult, index) {
        var _this6 = _this,
          props = _this6.props
        var _this$state = _this.state,
          hoveredRow = _this$state.hoveredRow,
          activeRow = _this$state.activeRow
        var isHovered = hoveredRow === index
        var isActive = activeRow === index
        console.log('#Duy Phan console searchResult', searchResult)
        return /*#__PURE__*/ _react.default.createElement(
          _react.default.Fragment,
          {
            key: 'result-'.concat(index),
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.TouchableOpacity,
            {
              style: [
                styles.row,
                isHovered && styles.rowHovered,
                isActive && styles.rowActive,
              ],
              onPress: function onPress() {
                return _this.handleResultPress(searchResult.searchResultId)
              },
              onPressIn: function onPressIn() {
                return _this.setState({
                  hoveredRow: index,
                })
              },
              onPressOut: function onPressOut() {
                return _this.setState({
                  hoveredRow: null,
                  activeRow: null,
                })
              },
              activeOpacity: 1,
            },
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: [
                  styles.checkCell,
                  (!props.selectable || !props.checkBox) &&
                    styles.checkCellHidden,
                ],
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.TouchableOpacity,
                {
                  onPress: function onPress(e) {
                    _this.handleSelectPress(searchResult.searchResultId)
                  },
                },
                _this.renderCheckbox(searchResult.selected),
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.timeCell,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                null,
                (0, _strings.formatTopicDate)(searchResult.customerStartTime),
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.nameCell,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.nameText,
                },
                searchResult.customerName,
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.summaryCell,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                null,
                searchResult.summary.replace(/<[^>]*>/g, ''),
              ),
            ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: [
                  styles.selectCell,
                  (!props.selectable || props.checkBox) &&
                    styles.selectCellHidden,
                ],
              },
              props.selectable &&
                !props.checkBox &&
                _this.renderButton(
                  _uawmsgs.default.LBL_SEARCH_SELECT_BUTTON,
                  function (e) {
                    _this.handleSelectPress(searchResult.searchResultId)
                    e.stopPropagation()
                  },
                  searchResult.selected,
                  styles.selectButton,
                  styles.selectButtonText,
                ),
            ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: [
                styles.detailRow,
                searchResult._expanded && styles.detailRowExpanded,
              ],
            },
            /*#__PURE__*/ _react.default.createElement(_ChatList.default, {
              uiData: props.uiData,
              panelType: 'SEARCHRESULTDETAIL',
              panelCode: searchResult.searchResultId,
            }),
          ),
        )
      },
    )
    _this.state = {
      selectedAll: false,
      hoveredRow: null,
      activeRow: null,
    }
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'render',
      value: function render() {
        var _this7 = this
        var props = this.props
        var searchResults = props.uiData.ucUiStore.getSearchResults({
          chatType: props.panelType,
          chatCode: props.panelCode,
        })
        var searchWorkData = props.uiData.ucUiStore.getSearchWorkData({
          chatType: props.panelType,
          chatCode: props.panelCode,
        })
        var containerStyles = [styles.container]
        var headerStyles = [
          styles.header,
          props.allSelectable && searchResults.length && styles.headerVisible,
        ]
        var scrollableStyles = [
          styles.scrollable,
          props.allSelectable &&
            searchResults.length &&
            styles.scrollableWithHeader,
        ]
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: containerStyles,
          },
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.View,
            {
              style: headerStyles,
            },
            props.checkBox
              ? /*#__PURE__*/ _react.default.createElement(
                  _reactNative.TouchableOpacity,
                  {
                    style: styles.checkboxButton,
                    onPress: this.handleSelectAllPress,
                  },
                  this.renderCheckbox(this.state.selectedAll),
                )
              : this.renderButton(
                  _uawmsgs.default.LBL_SEARCH_SELECT_ALL_BUTTON,
                  this.handleSelectAllPress,
                  this.state.selectedAll,
                  styles.selectAllButton,
                  styles.selectAllButtonText,
                ),
          ),
          /*#__PURE__*/ _react.default.createElement(
            _reactNativeGestureHandler.ScrollView,
            {
              style: scrollableStyles,
            },
            searchResults.length > 0 &&
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: [styles.tableContainer],
                },
                searchResults.map(function (result, index) {
                  return _this7.renderSearchResult(result, index)
                }),
              ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: [
                  styles.errorArea,
                  !searchWorkData.errorType && styles.errorAreaHidden,
                ],
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.errorMessage,
                },
                (_uawmsgs.default[searchWorkData.errorType] ||
                  searchWorkData.errorType) +
                  (searchWorkData.errorDetail
                    ? ' (' + searchWorkData.errorDetail + ')'
                    : ''),
              ),
            ),
            searchWorkData.hasMore &&
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.View,
                {
                  style: [styles.searchMoreArea],
                },
                /*#__PURE__*/ _react.default.createElement(
                  _reactNative.TouchableOpacity,
                  {
                    style: styles.searchMoreButton,
                    onPress: this.handleSearchMorePress,
                  },
                  /*#__PURE__*/ _react.default.createElement(
                    _reactNative.Text,
                    {
                      style: styles.searchMoreButtonText,
                    },
                    _uawmsgs.default.LBL_SEARCH_MORE_BUTTON,
                  ),
                ),
              ),
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: [
                  styles.searchingArea,
                  !(searchWorkData.searching && !searchWorkData.clearing) &&
                    styles.searchingAreaHidden,
                ],
              },
              /*#__PURE__*/ _react.default.createElement(_reactNative.Image, {
                source: require('../images/progress.gif'),
                style: styles.searchingIcon,
              }),
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.searchingMessage,
                },
                _uawmsgs.default.LBL_SEARCH_SEARCHING,
              ),
            ),
          ),
        )
      },
    },
  ])
})(_react.default.Component))
