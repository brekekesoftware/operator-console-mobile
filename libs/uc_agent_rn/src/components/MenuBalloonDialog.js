import React from 'react'
import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

/**
 * MenuBalloonDialog - React Native version
 * A popup dialog component for menus
 *
 * props.showing - Whether the dialog is visible
 * props.style - Additional styles for the component
 * props.onPress - Function called when the dialog is pressed
 */
export default class MenuBalloonDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: false,
    }
  }

  handlePress = event => {
    const { onPress } = this.props

    if (typeof onPress === 'function') {
      onPress(event)
    }
  }

  handleScroll = () => {
    if (!this.state.isHovered) {
      this.setState({ isHovered: true })

      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout)
      }

      this.hoverTimeout = setTimeout(() => {
        this.setState({ isHovered: false })
      }, 1500)
    }
  }

  componentWillUnmount() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout)
    }
  }

  render() {
    const { showing, style, children } = this.props

    if (!showing) {
      return null
    }

    const { width, height } = Dimensions.get('window')
    const maxDimension = Math.min(width, height) * 0.7

    return (
      <View
        style={[
          styles.menuBalloonDialog,
          // { maxWidth: maxDimension, maxHeight: maxDimension },
          style,
        ]}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
          showsHorizontalScrollIndicator={false}
          scrollIndicatorInsets={{ right: 2 }}
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          indicatorStyle={this.state.isHovered ? 'default' : 'white'}
          onTouchStart={() => this.setState({ isHovered: true })}
          onTouchEnd={() => {
            setTimeout(() => this.setState({ isHovered: false }), 1500)
          }}
        >
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <View>{children}</View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    )
  }
}

const colors = {
  white: '#FFFFFF', // @white
  platinum: '#E0E0E0', // @platinum
  darkGray: '#9E9E9E', // @dark_gray
}

const styles = StyleSheet.create({
  menuBalloonDialog: {
    backgroundColor: colors.white,
    borderRadius: 4,
    shadowColor: colors.platinum,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
  },
  scrollView: {},
  contentContainer: {},
})
