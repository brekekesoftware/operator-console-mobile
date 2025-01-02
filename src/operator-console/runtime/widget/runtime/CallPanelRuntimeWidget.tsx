import { StyleSheet, Text, View } from 'react-native'

import {
  IconKeyboard,
  IconPhoneIncoming,
  IconPhoneOutgoing,
} from '../../../icons'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { Util } from '../../../Util'
import { RuntimeWidget } from './RuntimeWidget'

const formatSecondsToHHMMSS = seconds => {
  const secondsNum = Math.floor(seconds)

  const second = Math.floor(secondsNum % 60)
  const minute = Math.floor(secondsNum / 60) % 60
  const hour = Math.floor(secondsNum / (60 * 60))

  const s =
    hour.toString().padStart(2, '0') +
    ':' +
    minute.toString().padStart(2, '0') +
    ':' +
    second.toString().padStart(2, '0')
  return s
}

export class CallPanelRuntimeWidget extends RuntimeWidget {
  durationTimeout: NodeJS.Timeout | null = null

  constructor(props, context) {
    super(props, context)
    this.state = { duration: '' }
    this.durationTimeout = setTimeout(this._updateCallDuration, 1000)
  }

  componentDidUpdate() {
    super.componentDidUpdate()
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const currentCallInfo = oc
      .getPhoneClient()
      .getCallInfos()
      .getCurrentCallInfo()

    if (currentCallInfo?.getIsAnswered() && !this.durationTimeout) {
      this._updateCallDuration()
    }
    if (!currentCallInfo?.getIsAnswered() && this.state.duration) {
      this.setState({ duration: '' })
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    if (this.durationTimeout) {
      clearTimeout(this.durationTimeout)
    }
  }

  // !overload
  _getRenderMainJsx() {
    const widgetData = this.getWidgetData()

    const callpanelFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getCallpanelFgColor(),
      this.context.fgColor || '#304701',
    )
    const callpanelBgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getCallpanelBgColor(),
      '#A8C64E',
    )
    const callpanelBorderRadius =
      widgetData.getCallpanelBorderRadius() ||
      widgetData.getCallpanelBorderRadius() === 0
        ? widgetData.getCallpanelBorderRadius()
        : 8
    const outsideShadow_horizontalOffset =
      widgetData.getOutsideShadow_horizontalOffset() ||
      widgetData.getOutsideShadow_horizontalOffset() === 0
        ? widgetData.getOutsideShadow_horizontalOffset()
        : ''
    const outsideShadow_verticalOffset =
      widgetData.getOutsideShadow_verticalOffset() ||
      widgetData.getOutsideShadow_verticalOffset() === 0
        ? widgetData.getOutsideShadow_verticalOffset()
        : ''
    const outsideShadow_blur =
      widgetData.getOutsideShadow_blur() ||
      widgetData.getOutsideShadow_blur() === 0
        ? widgetData.getOutsideShadow_blur()
        : ''
    const outsideShadow_spread =
      widgetData.getOutsideShadow_spread() ||
      widgetData.getOutsideShadow_spread() === 0
        ? widgetData.getOutsideShadow_spread()
        : ''
    const outsideShadowColorRgb = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getOutsideShadow_color(),
      'rgba(0,0,0,0)',
    ) // "rgba(0,0,0,0.2)"  //!default

    const insideShadow_horizontalOffset =
      widgetData.getInsideShadow_horizontalOffset() ||
      widgetData.getInsideShadow_horizontalOffset() === 0
        ? widgetData.getInsideShadow_horizontalOffset()
        : ''
    const insideShadow_verticalOffset =
      widgetData.getInsideShadow_verticalOffset() ||
      widgetData.getInsideShadow_verticalOffset() === 0
        ? widgetData.getInsideShadow_verticalOffset()
        : ''
    const insideShadow_blur =
      widgetData.getInsideShadow_blur() ||
      widgetData.getInsideShadow_blur() === 0
        ? widgetData.getInsideShadow_blur()
        : ''
    const insideShadow_spread =
      widgetData.getInsideShadow_spread() ||
      widgetData.getInsideShadow_spread() === 0
        ? widgetData.getInsideShadow_spread()
        : ''
    const insideShadowColorRgb = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getInsideShadow_color(),
      'rgba(0,0,0,0)',
    ) // "rgba(48,71,1,1)" //!default

    const sBoxshadowOutside =
      outsideShadowColorRgb &&
      outsideShadow_horizontalOffset &&
      outsideShadow_verticalOffset &&
      outsideShadow_blur &&
      outsideShadow_spread
        ? outsideShadowColorRgb +
          ' ' +
          outsideShadow_horizontalOffset +
          'px ' +
          outsideShadow_verticalOffset +
          'px ' +
          outsideShadow_blur +
          'px ' +
          outsideShadow_spread +
          'px'
        : ''
    const sBoxshadowInside =
      insideShadowColorRgb &&
      insideShadow_horizontalOffset &&
      insideShadow_verticalOffset &&
      insideShadow_blur &&
      insideShadow_spread
        ? 'inset ' +
          insideShadowColorRgb +
          ' ' +
          insideShadow_horizontalOffset +
          'px ' +
          insideShadow_verticalOffset +
          'px ' +
          insideShadow_blur +
          'px ' +
          insideShadow_spread +
          'px'
        : ''
    const sBoxShadow =
      sBoxshadowOutside +
      (sBoxshadowOutside && sBoxshadowInside ? ',' : '') +
      sBoxshadowInside

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const currentCallInfo = oc
      .getPhoneClient()
      .getCallInfos()
      .getCurrentCallInfo()
    const bIsDTMFInput = oc.getIsDTMFInput()

    let dialing = oc.getDialing()
    if (!dialing) {
      dialing = ''
    }

    const partyName = currentCallInfo?.getPartyName()
    const hasPartyName = partyName && partyName.length !== 0
    return (
      <View
        style={{
          borderRadius: callpanelBorderRadius,
          backgroundColor: callpanelBgColor,
          // boxShadow: sBoxShadow,
          flex: 1,
          padding: 12,
        }}
      >
        <View style={styles.row}>
          <View style={styles.left}>
            <View style={{ flex: 1 }}>
              {!!currentCallInfo &&
                (currentCallInfo.getIsIncoming()
                  ? IconPhoneIncoming
                  : IconPhoneOutgoing)}
            </View>
          </View>
          <View style={styles.main}>
            {hasPartyName && (
              <Text style={[styles.party, { color: callpanelFgColor }]}>
                {partyName}
              </Text>
            )}
            <Text style={[hasPartyName ? styles.small : styles.party]}>
              {currentCallInfo?.getPartyNumber()}
            </Text>
            <Text style={[styles.party, { color: callpanelFgColor }]}>
              {this.state.duration}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          {bIsDTMFInput !== true && dialing.length !== 0 && (
            <View style={styles.left}>{IconKeyboard}</View>
          )}
          <View style={styles.main}>
            <Text style={[styles.party, { color: callpanelFgColor }]}>
              {dialing}
            </Text>
          </View>
        </View>
      </View>
    )
  }

  _updateCallDuration = () => {
    if (this.durationTimeout) {
      clearTimeout(this.durationTimeout)
      this.durationTimeout = null
    }

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const currentCallInfo = oc.getCurrentCallInfo()
    if (currentCallInfo && currentCallInfo.getIsAnswered()) {
      this.durationTimeout = setTimeout(this._updateCallDuration, 1000)
      this.setState({
        duration: formatSecondsToHHMMSS(
          currentCallInfo.getAnsweredAt()
            ? (Date.now() - currentCallInfo.getAnsweredAt()) / 1000
            : 0,
        ),
      })
    }
  }
}

const styles = StyleSheet.create({
  row: {
    minHeight: 48,
    flexDirection: 'row',
  },
  left: {
    width: 24,
    height: 24,
  },
  main: {
    flexGrow: 1,
    flex: 1,
    marginLeft: 4,
  },
  party: {
    fontSize: 19,
    lineHeight: 19,
  },
  item: {
    height: 19,
  },
  small: {
    fontSize: 14,
    lineHeight: 14,
  },
})
