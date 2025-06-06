'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _uawmsgs = _interopRequireDefault(require('../utilities/uawmsgs'))
var _ChevronUpIcon = _interopRequireDefault(require('../icons/ChevronUpIcon'))
var _ChevronDownIcon = _interopRequireDefault(
  require('../icons/ChevronDownIcon'),
)
var _ErrorIcon = _interopRequireDefault(require('../icons/ErrorIcon'))
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
  isabelline: '#EEEEEE',
  mantis: '#74C365',
  mediumTurquoise: '#4BC5DE',
}
var styles = _reactNative.StyleSheet.create({
  container: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8,
    // 1.6 * 13
    letterSpacing: 0.3,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 0,
  },
  first: {
    height: 28,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconic: {
    height: 28,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconicActive: {
    backgroundColor: colors.isabelline,
  },
  iconicImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  iconicImageDimmed: {
    opacity: 0.2,
  },
  errorIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#FF4526',
  },
  link: {
    color: colors.mantis,
  },
  linkHidden: {
    opacity: 0,
    height: 0,
  },
  linkIconic: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  unreadBadge: {
    marginLeft: 2,
    paddingHorizontal: 4,
    backgroundColor: colors.mediumTurquoise,
  },
  unreadText: {
    color: colors.white,
  },
  loadingContainer: {
    width: 6,
    height: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.mediumTurquoise,
    position: 'absolute',
  },
})

/**
 * ChatShowmorelink
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.configurations
 * props.showmorelink
 * props.showmorelink.showmorelink_id
 * props.showmorelink.unread
 * props.isFirst
 * props.isIconicShowmorelink
 * props.begin
 * props.onClick
 */
var _default = (exports.default = /*#__PURE__*/ (function (_React$Component) {
  function _default(_props) {
    var _this
    _classCallCheck(this, _default)
    _this = _callSuper(this, _default, [_props])
    _defineProperty(_this, 'handlePress', function () {
      var _this2 = _this,
        props = _this2.props
      var showmorelinkEntry =
        props.uiData.ucUiStore.getShowmorelinkTable()[
          props.showmorelink.showmorelink_id
        ] || {}
      if (showmorelinkEntry.errorType) {
        return
      }
      if (typeof props.onClick === 'function') {
        props.onClick()
      }
      props.uiData.ucUiAction.receiveMore({
        showmorelink_id: props.showmorelink.showmorelink_id,
        begin: props.begin,
      })
    })
    _this.state = {
      isHovered: false,
    }

    // Create animated values for the loading dots
    _this.loadingDots = Array(8)
      .fill()
      .map(function () {
        return new _reactNative.Animated.ValueXY({
          x: 0,
          y: 0,
        })
      })
    _this.loadingOpacity = Array(8)
      .fill()
      .map(function () {
        return new _reactNative.Animated.Value(0)
      })
    return _this
  }
  _inherits(_default, _React$Component)
  return _createClass(_default, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.startLoadingAnimation()
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var showmorelinkEntry =
          this.props.uiData.ucUiStore.getShowmorelinkTable()[
            this.props.showmorelink.showmorelink_id
          ] || {}
        var prevShowmorelinkEntry =
          prevProps.uiData.ucUiStore.getShowmorelinkTable()[
            prevProps.showmorelink.showmorelink_id
          ] || {}
        if (
          showmorelinkEntry.nowReceiving !== prevShowmorelinkEntry.nowReceiving
        ) {
          this.startLoadingAnimation()
        }
      },
    },
    {
      key: 'startLoadingAnimation',
      value: function startLoadingAnimation() {
        var _this3 = this
        var showmorelinkEntry =
          this.props.uiData.ucUiStore.getShowmorelinkTable()[
            this.props.showmorelink.showmorelink_id
          ] || {}
        if (
          showmorelinkEntry.nowReceiving ||
          (this.props.isFirst &&
            !this.props.isIconicShowmorelink &&
            !showmorelinkEntry.errorType)
        ) {
          var radius = 10
          var positions = [
            {
              x: 0,
              y: -radius,
            },
            {
              x: radius * Math.sin(Math.PI / 4),
              y: -radius * Math.sin(Math.PI / 4),
            },
            {
              x: radius,
              y: 0,
            },
            {
              x: radius * Math.sin(Math.PI / 4),
              y: radius * Math.sin(Math.PI / 4),
            },
            {
              x: 0,
              y: radius,
            },
            {
              x: -radius * Math.sin(Math.PI / 4),
              y: radius * Math.sin(Math.PI / 4),
            },
            {
              x: -radius,
              y: 0,
            },
            // Left
            {
              x: -radius * Math.sin(Math.PI / 4),
              y: -radius * Math.sin(Math.PI / 4),
            },
          ]
          var duration = 1500
          var stepDuration = duration / 8

          // Reset all dots
          this.loadingDots.forEach(function (dot, i) {
            dot.setValue(positions[i])
            _this3.loadingOpacity[i].setValue(i < 3 ? 1 : 0)
          })
          var animations = []
          for (var step = 0; step < 8; step++) {
            var fadeInIndex = (step + 3) % 8
            var fadeOutIndex = step % 8
            animations.push(
              _reactNative.Animated.parallel([
                _reactNative.Animated.timing(this.loadingOpacity[fadeInIndex], {
                  toValue: 1,
                  duration: stepDuration / 4,
                  useNativeDriver: true,
                }),
                _reactNative.Animated.timing(
                  this.loadingOpacity[fadeOutIndex],
                  {
                    toValue: 0,
                    duration: stepDuration / 4,
                    useNativeDriver: true,
                  },
                ),
              ]),
            )
            animations.push(_reactNative.Animated.delay((stepDuration * 3) / 4))
          }
          _reactNative.Animated.loop(
            _reactNative.Animated.sequence(animations),
          ).start()
        }
      },
    },
    {
      key: 'renderLoadingAnimation',
      value: function renderLoadingAnimation() {
        var _this4 = this
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: styles.loadingContainer,
          },
          this.loadingDots.map(function (dot, index) {
            return /*#__PURE__*/ _react.default.createElement(
              _reactNative.Animated.View,
              {
                key: index,
                style: [
                  styles.loadingDot,
                  {
                    transform: [
                      {
                        translateX: dot.x,
                      },
                      {
                        translateY: dot.y,
                      },
                    ],
                    opacity: _this4.loadingOpacity[index],
                  },
                ],
              },
            )
          }),
        )
      },
    },
    {
      key: 'render',
      value: function render() {
        var _this5 = this
        var props = this.props
        var showmorelinkEntry =
          props.uiData.ucUiStore.getShowmorelinkTable()[
            props.showmorelink.showmorelink_id
          ] || {}
        if (!props.uiData.configurations.moreMessages) {
          return null
        }
        var isFirst = props.isFirst
        var isIconic = props.isIconicShowmorelink
        var isError = !!showmorelinkEntry.errorType
        var isProgress = !!showmorelinkEntry.nowReceiving
        var isUnread = props.showmorelink.unread
        var containerStyles = [
          styles.container,
          isFirst && styles.first,
          isIconic && styles.iconic,
          isIconic &&
            !isError &&
            !isProgress &&
            this.state.isHovered &&
            styles.iconicActive,
        ]
        var iconSource = null
        if (isIconic && !isError && !isProgress) {
          if (isFirst) {
            iconSource = /*#__PURE__*/ _react.default.createElement(
              _ChevronUpIcon.default,
              null,
            )
          } else {
            iconSource = /*#__PURE__*/ _react.default.createElement(
              _ChevronDownIcon.default,
              null,
            )
          }
        } else if (isError) {
          iconSource = /*#__PURE__*/ _react.default.createElement(
            _ErrorIcon.default,
            null,
          )
        }
        var linkStyles = [
          styles.link,
          ((isFirst && !isIconic && !isError) || isIconic) && styles.linkHidden,
          isIconic && styles.linkIconic,
        ]
        var errorTooltip = isError
          ? (_uawmsgs.default[showmorelinkEntry.errorType] ||
              showmorelinkEntry.errorType) +
            (showmorelinkEntry.errorDetail
              ? ' (' + showmorelinkEntry.errorDetail + ')'
              : '')
          : ''
        return /*#__PURE__*/ _react.default.createElement(
          _reactNative.TouchableOpacity,
          {
            style: containerStyles,
            onPress: this.handlePress,
            onPressIn: function onPressIn() {
              return _this5.setState({
                isHovered: true,
              })
            },
            onPressOut: function onPressOut() {
              return _this5.setState({
                isHovered: false,
              })
            },
            disabled: isError || isProgress,
            activeOpacity: 1,
          },
          isIconic &&
            !isError &&
            !isProgress &&
            /*#__PURE__*/ _react.default.createElement(_reactNative.Image, {
              source: iconSource,
              style: [
                styles.iconicImage,
                !this.state.isHovered && styles.iconicImageDimmed,
              ],
            }),
          isError &&
            /*#__PURE__*/ _react.default.createElement(_reactNative.Image, {
              source: iconSource,
              style: styles.errorIcon,
            }),
          /*#__PURE__*/ _react.default.createElement(
            _reactNative.Text,
            {
              style: linkStyles,
            },
            _uawmsgs.default.LBL_CHAT_SHOWMORELINK_CONTENT,
          ),
          isUnread &&
            !isFirst &&
            /*#__PURE__*/ _react.default.createElement(
              _reactNative.View,
              {
                style: styles.unreadBadge,
              },
              /*#__PURE__*/ _react.default.createElement(
                _reactNative.Text,
                {
                  style: styles.unreadText,
                },
                _uawmsgs.default.LBL_CHAT_UNREAD_CONTENT,
              ),
            ),
          ((isFirst && !isIconic && !isError) || (isIconic && isProgress)) &&
            this.renderLoadingAnimation(),
        )
      },
    },
  ])
})(_react.default.Component))
