import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Image,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'

const colors = {
  white: '#FFFFFF',
  isabelline: '#EEEEEE',
  mantis: '#74C365',
  mediumTurquoise: '#4BC5DE',
}

const styles = StyleSheet.create({
  container: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20.8, // 1.6 * 13
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
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: false,
    }

    // Create animated values for the loading dots
    this.loadingDots = Array(8)
      .fill()
      .map(() => new Animated.ValueXY({ x: 0, y: 0 }))
    this.loadingOpacity = Array(8)
      .fill()
      .map(() => new Animated.Value(0))
  }

  componentDidMount() {
    this.startLoadingAnimation()
  }

  componentDidUpdate(prevProps) {
    const showmorelinkEntry =
      this.props.uiData.ucUiStore.getShowmorelinkTable()[
        this.props.showmorelink.showmorelink_id
      ] || {}

    const prevShowmorelinkEntry =
      prevProps.uiData.ucUiStore.getShowmorelinkTable()[
        prevProps.showmorelink.showmorelink_id
      ] || {}

    if (showmorelinkEntry.nowReceiving !== prevShowmorelinkEntry.nowReceiving) {
      this.startLoadingAnimation()
    }
  }

  startLoadingAnimation() {
    const showmorelinkEntry =
      this.props.uiData.ucUiStore.getShowmorelinkTable()[
        this.props.showmorelink.showmorelink_id
      ] || {}

    if (
      showmorelinkEntry.nowReceiving ||
      (this.props.isFirst &&
        !this.props.isIconicShowmorelink &&
        !showmorelinkEntry.errorType)
    ) {
      const radius = 10
      const positions = [
        { x: 0, y: -radius },
        {
          x: radius * Math.sin(Math.PI / 4),
          y: -radius * Math.sin(Math.PI / 4),
        },
        { x: radius, y: 0 },
        {
          x: radius * Math.sin(Math.PI / 4),
          y: radius * Math.sin(Math.PI / 4),
        },
        { x: 0, y: radius },
        {
          x: -radius * Math.sin(Math.PI / 4),
          y: radius * Math.sin(Math.PI / 4),
        },
        { x: -radius, y: 0 }, // Left
        {
          x: -radius * Math.sin(Math.PI / 4),
          y: -radius * Math.sin(Math.PI / 4),
        },
      ]

      const duration = 1500
      const stepDuration = duration / 8

      // Reset all dots
      this.loadingDots.forEach((dot, i) => {
        dot.setValue(positions[i])
        this.loadingOpacity[i].setValue(i < 3 ? 1 : 0)
      })

      const animations = []
      for (let step = 0; step < 8; step++) {
        const fadeInIndex = (step + 3) % 8
        const fadeOutIndex = step % 8

        animations.push(
          Animated.parallel([
            Animated.timing(this.loadingOpacity[fadeInIndex], {
              toValue: 1,
              duration: stepDuration / 4,
              useNativeDriver: true,
            }),
            Animated.timing(this.loadingOpacity[fadeOutIndex], {
              toValue: 0,
              duration: stepDuration / 4,
              useNativeDriver: true,
            }),
          ]),
        )

        animations.push(Animated.delay((stepDuration * 3) / 4))
      }

      Animated.loop(Animated.sequence(animations)).start()
    }
  }

  handlePress = () => {
    const { props } = this
    const showmorelinkEntry =
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
  }

  renderLoadingAnimation() {
    return (
      <View style={styles.loadingContainer}>
        {this.loadingDots.map((dot, index) => (
          <Animated.View
            key={index}
            style={[
              styles.loadingDot,
              {
                transform: [{ translateX: dot.x }, { translateY: dot.y }],
                opacity: this.loadingOpacity[index],
              },
            ]}
          />
        ))}
      </View>
    )
  }

  render() {
    const { props } = this
    const showmorelinkEntry =
      props.uiData.ucUiStore.getShowmorelinkTable()[
        props.showmorelink.showmorelink_id
      ] || {}

    if (!props.uiData.configurations.moreMessages) {
      return null
    }

    const isFirst = props.isFirst
    const isIconic = props.isIconicShowmorelink
    const isError = !!showmorelinkEntry.errorType
    const isProgress = !!showmorelinkEntry.nowReceiving
    const isUnread = props.showmorelink.unread

    const containerStyles = [
      styles.container,
      isFirst && styles.first,
      isIconic && styles.iconic,
      isIconic &&
        !isError &&
        !isProgress &&
        this.state.isHovered &&
        styles.iconicActive,
    ]

    let iconSource = null
    if (isIconic && !isError && !isProgress) {
      if (isFirst) {
        iconSource = require('../assets/images/chevron_up.png')
      } else {
        iconSource = require('../assets/images/chevron_down.png')
      }
    } else if (isError) {
      iconSource = require('../assets/images/error.png')
    }

    const linkStyles = [
      styles.link,
      ((isFirst && !isIconic && !isError) || isIconic) && styles.linkHidden,
      isIconic && styles.linkIconic,
    ]

    const errorTooltip = isError
      ? (uawMsgs[showmorelinkEntry.errorType] || showmorelinkEntry.errorType) +
        (showmorelinkEntry.errorDetail
          ? ' (' + showmorelinkEntry.errorDetail + ')'
          : '')
      : ''

    return (
      <TouchableOpacity
        style={containerStyles}
        onPress={this.handlePress}
        onPressIn={() => this.setState({ isHovered: true })}
        onPressOut={() => this.setState({ isHovered: false })}
        disabled={isError || isProgress}
        activeOpacity={1}
      >
        {isIconic && !isError && !isProgress && (
          <Image
            source={iconSource}
            style={[
              styles.iconicImage,
              !this.state.isHovered && styles.iconicImageDimmed,
            ]}
          />
        )}

        {isError && <Image source={iconSource} style={styles.errorIcon} />}

        <Text style={linkStyles}>{uawMsgs.LBL_CHAT_SHOWMORELINK_CONTENT}</Text>

        {isUnread && !isFirst && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadText}>
              {uawMsgs.LBL_CHAT_UNREAD_CONTENT}
            </Text>
          </View>
        )}

        {((isFirst && !isIconic && !isError) || (isIconic && isProgress)) &&
          this.renderLoadingAnimation()}
      </TouchableOpacity>
    )
  }
}
