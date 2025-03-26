import React from 'react'
import { View, StyleSheet } from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import WebchatQueueButton from '../components/WebchatQueueButton.js'
import WebchatPickupButton from '../components/WebchatPickupButton.js'
import SearchDialogButton from '../components/SearchDialogButton.js'

/**
 * IconApp
 * props.uiData
 * props.iconName
 * props.iconDisabled
 */
class IconApp extends React.Component {
  render() {
    const { uiData, iconName, iconDisabled } = this.props

    if (iconName === 'webchatqueue') {
      return (
        <View style={[styles.brUCAgentApp, styles.brIconApp]}>
          <WebchatQueueButton uiData={uiData} disabled={iconDisabled} />
        </View>
      )
    } else if (iconName === 'webchatpickup') {
      return (
        <View style={[styles.brUCAgentApp, styles.brIconApp]}>
          <WebchatPickupButton uiData={uiData} disabled={iconDisabled} />
        </View>
      )
    } else if (iconName === 'search') {
      return (
        <View style={[styles.brUCAgentApp, styles.brIconApp]}>
          <SearchDialogButton uiData={uiData} disabled={iconDisabled} />
        </View>
      )
    } else {
      return <View style={[styles.brUCAgentApp, styles.brIconApp]} />
    }
  }
}

const styles = StyleSheet.create({
  brUCAgentApp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brIconApp: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default IconApp
