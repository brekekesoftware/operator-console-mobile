import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { IconKeyboard, IconPhoneIncoming, IconPhoneOutgoing } from '../icons'
import type { BrekekeOperatorConsole } from '../OperatorConsole'
import { Util } from '../Util'

const formatSecondsToHHMMSS = (seconds: number) => {
  const second = parseInt(String(seconds % 60))
  const minute = parseInt(String(seconds / 60)) % 60
  const hour = parseInt(String(seconds / (60 * 60)))

  return (
    hour.toString().padStart(2, '0') +
    ':' +
    minute.toString().padStart(2, '0') +
    ':' +
    second.toString().padStart(2, '0')
  )
}

type CallPanelProps = {
  currentCallInfo: {
    getIsAnswered(): any
    getAnsweredAt(): any
  }
  operatorConsoleAsParent: BrekekeOperatorConsole
  callpanelFgColor: string
  callpanelBgColor: string
  borderRadius: number
  outsideShadow_horizontalOffset: string
  outsideShadow_verticalOffset: string
  outsideShadow_blur: string
  outsideShadow_spread: string
  outsideShadow_color: string
  insideShadow_horizontalOffset: string
  insideShadow_verticalOffset: string
  insideShadow_blur: string
  insideShadow_spread: string
  insideShadow_color: string
  dialing: string
  isEditMode: boolean
}

type CallPanelState = {
  duration: string
}

export class CallPanel extends React.Component<CallPanelProps, CallPanelState> {
  durationTimeout: NodeJS.Timeout | null = null

  constructor(props) {
    super(props)
    this.state = { duration: '' }
    this.durationTimeout = setTimeout(this.updateCallDuration, 1000)
  }

  componentDidUpdate() {
    if (this.props.currentCallInfo?.getIsAnswered() && !this.durationTimeout) {
      this.updateCallDuration()
    }
    if (!this.props.currentCallInfo?.getIsAnswered() && this.state.duration) {
      this.setState({ duration: '' })
    }
  }

  componentWillUnmount() {
    if (this.durationTimeout) {
      clearTimeout(this.durationTimeout)
    }
  }

  render() {
    const operatorConsoleAsParent = this.props.operatorConsoleAsParent
    // const call = this.props.call;
    const currentCallInfo = operatorConsoleAsParent
      .getPhoneClient()
      .getCallInfos()
      .getCurrentCallInfo()

    const callpanelFgColor = Util.getRgbaCSSStringFromAntdColor(
      this.props.callpanelFgColor,
      '#304701',
    )
    const callpanelBgColor = Util.getRgbaCSSStringFromAntdColor(
      this.props.callpanelBgColor,
      '#A8C64E',
    )
    const borderRadius = this.props.borderRadius ? this.props.borderRadius : 8
    const outsideShadow_horizontalOffset = this.props
      .outsideShadow_horizontalOffset
      ? this.props.outsideShadow_horizontalOffset
      : ''
    const outsideShadow_verticalOffset = this.props.outsideShadow_verticalOffset
      ? this.props.outsideShadow_verticalOffset
      : ''
    const outsideShadow_blur = this.props.outsideShadow_blur
      ? this.props.outsideShadow_blur
      : ''
    const outsideShadow_spread = this.props.outsideShadow_spread
      ? this.props.outsideShadow_spread
      : ''
    const outsideShadowColorRgb = Util.getRgbaCSSStringFromAntdColor(
      this.props.outsideShadow_color,
      'rgba(0,0,0,0)',
    ) // "rgba(0,0,0,0.2)"  //!default

    const insideShadow_horizontalOffset = this.props
      .insideShadow_horizontalOffset
      ? this.props.insideShadow_horizontalOffset
      : ''
    const insideShadow_verticalOffset = this.props.insideShadow_verticalOffset
      ? this.props.insideShadow_verticalOffset
      : ''
    const insideShadow_blur = this.props.insideShadow_blur
      ? this.props.insideShadow_blur
      : ''
    const insideShadow_spread = this.props.insideShadow_spread
      ? this.props.insideShadow_spread
      : ''
    const insideShadowColorRgb = Util.getRgbaCSSStringFromAntdColor(
      this.props.insideShadow_color,
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

    const bIsDTMFInput = operatorConsoleAsParent.getIsDTMFInput()

    let dialing
    if (!this.props.dialing) {
      dialing = ''
    } else {
      dialing = this.props.dialing
    }

    // if( dialing.length > CallPanel.SHOW_DIALING_LENGTH ){
    //   dialing = dialing.substring( dialing.length - CallPanel.SHOW_DIALING_LENGTH, dialing.length );
    // }

    if (this.props.isEditMode !== true) {
      return (
        <View
          style={{
            borderRadius,
            backgroundColor: callpanelBgColor,
            // boxShadow: sBoxShadow,
            width: ' 100%',
            height: ' 100%',
            padding: 12,
          }}
        >
          <View style={styles.row}>
            <View style={styles.left}>
              {!!currentCallInfo &&
                (currentCallInfo.getIsIncoming()
                  ? IconPhoneIncoming
                  : IconPhoneOutgoing)}
            </View>
            <View style={styles.main}>
              <View style={styles.item}>
                <Text style={[styles.party, { color: callpanelFgColor }]}>
                  {currentCallInfo?.getPartyNumber()}
                </Text>
              </View>
              <View style={styles.item}>
                {' '}
                <Text style={[styles.party, { color: callpanelFgColor }]}>
                  {this.state.duration}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.row}>
            {bIsDTMFInput !== true && dialing.length !== 0 && (
              <View style={styles.left}>{IconKeyboard}</View>
            )}
            <View style={styles.main}>
              <Text
                style={[styles.party, { color: callpanelFgColor }]}
                numberOfLines={2}
              >
                {dialing}
              </Text>
            </View>
          </View>
        </View>
      )
    } else {
      return (
        <View
          style={{
            borderRadius,
            backgroundColor: callpanelBgColor,
            width: ' 100%',
            height: ' 100%',
            padding: 12,
          }}
        />
      )
    }
  }

  updateCallDuration = () => {
    if (this.durationTimeout) {
      clearTimeout(this.durationTimeout)
      this.durationTimeout = null
    }

    const currentCallInfo = this.props.currentCallInfo
    if (currentCallInfo && currentCallInfo.getIsAnswered()) {
      this.durationTimeout = setTimeout(this.updateCallDuration, 1000)
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
  },
  left: {
    width: 24,
    justifyContent: 'center',
    flexShrink: 0,
  },
  main: {
    flexGrow: 1,
    marginLeft: 4,
  },
  party: {
    fontSize: 19,
    lineHeight: 19,
  },
  item: {
    height: 19,
  },
})
