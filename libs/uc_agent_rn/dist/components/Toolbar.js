'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = Toolbar
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
var _reactNativeLinearGradient = _interopRequireDefault(
  require('react-native-linear-gradient'),
)
var _jsxRuntime = require('react/jsx-runtime')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
var styles = _reactNative.StyleSheet.create({
  toolbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    minWidth: 224,
    minHeight: 48,
    height: 48,
    paddingLeft: 4,
  },
  toolbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#f6f6f6',
    borderBottomWidth: 1,
    borderBottomColor: '#b2b2b2',
    // zIndex: 1,
  },
  // Style for child ToolbarButton components
  toolbarButton: {
    margin: 5,
    marginRight: 4,
  },
})

/**
 * Toolbar
 * props.children - Toolbar buttons or other components
 * props.style - Additional custom styles for the toolbar
 */
function Toolbar(props) {
  // On iOS and Android, we'll use LinearGradient for the background
  if (_reactNative.Platform.OS === 'web') {
    return /*#__PURE__*/ (0, _jsxRuntime.jsx)(
      _reactNativeLinearGradient.default,
      {
        style: [styles.toolbar, props.style],
        colors: ['rgba(255,255,255,0.7)', 'rgba(255,255,255,0)'],
        start: {
          x: 0,
          y: 0,
        },
        end: {
          x: 0,
          y: 1,
        },
        children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.toolbarContent,
          children: _react.default.Children.map(
            props.children,
            function (child) {
              var _child$type
              // Apply toolbar button styles to ToolbarButton children
              if (
                (child === null ||
                child === void 0 ||
                (_child$type = child.type) === null ||
                _child$type === void 0
                  ? void 0
                  : _child$type.name) === 'ToolbarButton'
              ) {
                return /*#__PURE__*/ _react.default.cloneElement(child, {
                  style: [styles.toolbarButton, child.props.style],
                })
              }
              return child
            },
          ),
        }),
      },
    )
  }

  // For web, we can use the regular View with background gradient
  return /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
    style: [
      styles.toolbar,
      // {
      //   backgroundImage:
      //     'linear-gradient(rgba(255,255,255,0.7) 0, rgba(255,255,255,0) 100%)',
      // },
      props.style,
    ],
    children: /*#__PURE__*/ (0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.toolbarContent,
      children: _react.default.Children.map(props.children, function (child) {
        var _child$type2
        // Apply toolbar button styles to ToolbarButton children
        if (
          (child === null ||
          child === void 0 ||
          (_child$type2 = child.type) === null ||
          _child$type2 === void 0
            ? void 0
            : _child$type2.name) === 'ToolbarButton'
        ) {
          return /*#__PURE__*/ _react.default.cloneElement(child, {
            style: [styles.toolbarButton, child.props.style],
          })
        }
        return child
      }),
    }),
  })
}
