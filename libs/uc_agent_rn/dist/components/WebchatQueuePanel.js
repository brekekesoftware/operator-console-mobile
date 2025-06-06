'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = WebchatQueuePanel
var _reactNative = require('react-native')
var _WebchatQueueTable = _interopRequireDefault(require('./WebchatQueueTable'))
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e }
}
var styles = _reactNative.StyleSheet.create({
  webchatQueuePanel: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
})

/**
 * WebchatQueuePanel
 * props.uiData - UI data for the webchat queue
 */
function WebchatQueuePanel(props) {
  return /*#__PURE__*/ React.createElement(
    _reactNative.View,
    {
      style: styles.webchatQueuePanel,
    },
    /*#__PURE__*/ React.createElement(
      _reactNative.ScrollView,
      {
        style: styles.scrollView,
        horizontal: false,
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: true,
      },
      /*#__PURE__*/ React.createElement(_WebchatQueueTable.default, {
        uiData: props.uiData,
        bigStyle: true,
        resizerName: 'webchatQueuePanel',
      }),
    ),
  )
}
