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
  LayoutAnimation,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import TriangleUpIcon from '../icons/TriangleUpIcon.js'
import TriangleDownIcon from '../icons/TriangleDownIcon.js'

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
      isVisible: false,
    }
    this.dropdownRef = React.createRef()
  }

  componentDidMount() {
    this.measureDropdownPosition()
  }

  componentDidUpdate(prevProps) {
    if (this.isDialogShowing() !== this.wasDialogShowing(prevProps)) {
      this.measureDropdownPosition()
      // Animate the transition
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }
  }

  measureDropdownPosition() {
    if (this.dropdownRef.current) {
      this.dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
        const { width: screenWidth, height: screenHeight } =
          Dimensions.get('window')

        // Calculate position to ensure dropdown stays within screen bounds
        let dialogY = pageY + height
        let dialogX = pageX

        // Check if dropdown would go below screen
        if (dialogY + 200 > screenHeight) {
          // Assuming max dropdown height of 200
          dialogY = pageY - 200 // Show above the button
        }

        // Check if dropdown would go beyond right edge
        if (dialogX + width > screenWidth) {
          dialogX = screenWidth - width - 10 // Add some padding
        }

        this.setState({
          dialogPosition: {
            x: dialogX,
            y: dialogY,
            width: width,
          },
          isVisible: this.isDialogShowing(),
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
        isVisible: false,
      })
      props.uiData.window_onclick()
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

    console.log('#Duy Phan console isShowing', state)

    if (props.hidden) {
      return null
    }

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
            <View style={styles.icon}>
              {isShowing ? (
                <TriangleUpIcon width={18} height={18} color='#000000' />
              ) : (
                <TriangleDownIcon width={18} height={18} color='#000000' />
              )}
            </View>
          </View>
        </TouchableOpacity>

        <MenuBalloonDialog
          showing={isShowing}
          style={[
            styles.dialog,
            {
              position: 'absolute',
              // left: state.dialogPosition.x,
              top: 30,
              left: 0,
              minWidth: state.dialogPosition.width,
              zIndex: isShowing ? 9999 : 0,
              // zIndex: 0
            },
            props.dialogStyle,
          ]}
          onClick={() =>
            this.setState({ showingDialogVersion: null, isVisible: false })
          }
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
  platinum: '#e0e0e0', // @platinum
  darkGray: '#9E9E9E', // @dark_gray
  darkJungleGreen: '#212121', // @dark_jungle_green
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
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
    }),
  },
  disabled: {
    backgroundColor: colors.whiteSmoke,
  },
  disabledText: {
    color: colors.darkGray,
  },
  dialog: {
    backgroundColor: colors.white,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: colors.darkJungleGreen,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
})
