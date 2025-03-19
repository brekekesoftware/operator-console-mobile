import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'

/**
 * DropDownMenu - React Native version
 * A dropdown menu component
 *
 * props.uiData - UI data object
 * props.uiData.showingDialogVersion - Dialog version for tracking open/closed state
 * props.uiData.showingDialog_update - Dialog update handler
 * props.style - Additional styles for the component
 * props.dialogStyle - Additional styles for the dialog
 * props.disabled - Whether the dropdown is disabled
 * props.hidden - Whether the dropdown is hidden
 * props.text - The text to display in the dropdown
 * props.onClick - Function called when the dropdown is clicked
 * props.onShowingDialogUpdate - Function called when the dialog visibility updates
 */
export default class DropDownMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showingDialogVersion: null,
      dialogPosition: {
        x: 0,
        y: 0,
        width: 0,
      },
    }
    this.dropdownRef = React.createRef()
  }

  componentDidMount() {
    this.measureDropdownPosition()
  }

  componentDidUpdate(prevProps) {
    if (this.isDialogShowing() !== this.wasDialogShowing(prevProps)) {
      this.measureDropdownPosition()
    }
  }

  measureDropdownPosition() {
    if (this.dropdownRef.current && Platform.OS !== 'web') {
      const { width: screenWidth, height: screenHeight } =
        Dimensions.get('window')

      this.dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
        this.setState({
          dialogPosition: {
            x: pageX,
            y: pageY + height,
            width: width,
          },
        })
      })
    }
  }

  isDialogShowing() {
    return (
      this.props.uiData.showingDialogVersion ===
        this.state.showingDialogVersion && !this.props.hidden
    )
  }

  wasDialogShowing(prevProps) {
    return (
      prevProps.uiData.showingDialogVersion ===
        this.state.showingDialogVersion && !prevProps.hidden
    )
  }

  handlePress = () => {
    const { props } = this

    if (props.disabled) {
      return
    }

    if (props.uiData.showingDialogVersion !== this.state.showingDialogVersion) {
      this.setState(
        {
          showingDialogVersion: ++props.uiData.showingDialogVersion,
        },
        () => {
          this.measureDropdownPosition()

          if (typeof props.onShowingDialogUpdate === 'function') {
            props.onShowingDialogUpdate()
          }

          props.uiData.fire('showingDialog_update')
        },
      )
    } else {
      this.setState({
        showingDialogVersion: null,
      })
    }

    if (typeof props.onClick === 'function') {
      props.onClick()
    }
  }

  extractTitle() {
    const { text } = this.props
    let title = ''

    if (typeof text === 'string') {
      title = text
    } else if (text && text.props && typeof text.props.children === 'string') {
      title = text.props.children
    } else if (
      text &&
      text.props &&
      text.props.children &&
      typeof text.props.children.forEach === 'function'
    ) {
      text.props.children.forEach(child => {
        if (typeof child === 'string' && child) {
          title = child
        }
      })
    }

    return title
  }

  render() {
    const { props, state } = this
    const isShowing = this.isDialogShowing()

    if (props.hidden) {
      return null
    }

    const iconName = isShowing ? 'triangle_up' : 'triangle_down'
    // TODO: Add icon component with base64 svg

    return (
      <View style={styles.container}>
        <TouchableOpacity
          ref={this.dropdownRef}
          style={[
            styles.dropDownMenu,
            isShowing && styles.focus,
            props.disabled && styles.disabled,
            props.style,
          ]}
          onPress={this.handlePress}
          disabled={props.disabled}
          accessibilityLabel={this.extractTitle()}
          activeOpacity={props.disabled ? 1 : 0.7}
        >
          <Text
            style={[styles.dropDownText, props.disabled && styles.disabledText]}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {props.text}
          </Text>

          <View style={styles.iconContainer}>
            <Image
              source={
                iconName === 'triangle_up'
                  ? require('../assets/images/triangle_up.png')
                  : require('../assets/images/triangle_down.png')
              }
              style={styles.icon}
              resizeMode='contain'
            />
          </View>
        </TouchableOpacity>

        <MenuBalloonDialog
          showing={isShowing}
          style={[
            {
              position: 'absolute',
              left: state.dialogPosition.x,
              top: state.dialogPosition.y,
              minWidth: state.dialogPosition.width,
              zIndex: isShowing ? 9999 : 0,
            },
            props.dialogStyle,
          ]}
          onClick={() => this.setState({ showingDialogVersion: null })}
        >
          {props.children}
        </MenuBalloonDialog>
      </View>
    )
  }
}

// Define colors from CSS variables
const colors = {
  mediumTurquoise: '#4BC5DE', // @medium_turquoise
  white: '#FFFFFF', // @white
  whiteSmoke: '#F5F5F5', // @white_smoke
  platinum: '#E0E0E0', // @platinum
  darkGray: '#9E9E9E', // @dark_gray
  darkJungleGreen: '#212121', // @dark_jungle_green
}

const styles = StyleSheet.create({
  container: {},
  dropDownMenu: {
    position: 'relative',
    width: 200,
    height: 32,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: colors.platinum,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  dropDownText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
    color: colors.darkJungleGreen,
  },
  iconContainer: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: colors.darkJungleGreen,
  },
  focus: {
    borderColor: colors.mediumTurquoise,
    ...Platform.select({
      ios: {
        shadowColor: colors.mediumTurquoise,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: `0px 0px 0px 1px ${colors.mediumTurquoise} inset`,
      },
    }),
  },
  disabled: {
    backgroundColor: colors.whiteSmoke,
  },
  disabledText: {
    color: colors.darkGray,
  },
})
