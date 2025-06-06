'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0
var _react = _interopRequireDefault(require('react'))
var _reactNative = require('react-native')
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
/**
 * BalloonDialog
 * props.shows
 * props.indicator
 * props.anchor
 */
var _default = (exports.default = function _default(props) {
  if (props.shows) {
    return /*#__PURE__*/ _react.default.createElement(
      _reactNative.View,
      {
        style: styles.brBalloonDialog,
      },
      /*#__PURE__*/ _react.default.createElement(
        _reactNative.View,
        {
          style: [
            styles.brBalloonDialogInner,
            props.anchor === 'right'
              ? styles.brAnchorRight
              : styles.brAnchorLeft,
          ],
        },
        /*#__PURE__*/ _react.default.createElement(
          _reactNative.View,
          {
            style: styles.brBalloonDialogInnerInner,
          },
          props.children,
        ),
      ),
    )
  } else {
    return /*#__PURE__*/ _react.default.createElement(_reactNative.View, null)
  }
})
var styles = _reactNative.StyleSheet.create({
  brBalloonDialog: {
    position: 'relative',
    left: 0,
    top: 30,
    width: 0,
    height: 0,
    zIndex: 1,
  },
  brBalloonDialogInner: {
    paddingTop: 8,
    position: 'absolute',
  },
  brBalloonDialogInnerInner: {
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  brAnchorLeft: {
    left: 0,
  },
  brAnchorRight: {
    right: 0,
  },
})
