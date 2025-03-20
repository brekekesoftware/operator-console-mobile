import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
  PanResponder,
  Image,
} from 'react-native'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import DndableSafe from './DndableSafe.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'
import PanelArea from './PanelArea.js'
import StatusIcon from './StatusIcon.js'

/**
 * MainTabs
 * props.uiData
 * props.uiData.ucUiStore
 * props.uiData.showingDialogVersion
 * props.uiData.showingDialog_update
 * props.uiData.mainAreaSplitters
 * props.uiData.mainPanelList
 * props.uiData.currentSelectedTab
 * props.uiData.backgroundTabs
 * props.uiData.blinkingTabs
 * props.uiData.funcOnSelectedQueue
 * props.uiData.externalCallWorkTable
 * props.uiData.historyDetailWorkTable
 * props.uiData.mainArea_handleSelect
 * props.uiData.tabMenuItem_onClick
 * props.uiData.tabLinkHideButton_onClick
 * props.uiData.tabLinkMoveHContextMenuItem_onClick
 * props.uiData.tabLinkMoveVContextMenuItem_onClick
 * props.uiData.mainTabsDndable_onDrop
 * props.position
 */
export default class MainTabs extends React.Component {
  constructor(props) {
    super(props)
    this.currentFrontTab = ''
    this.scrollViewRef = React.createRef()
    this.tabRefs = {}

    // Add blinking animation
    this.blinkingAnimation = new Animated.Value(0)

    this.state = {
      tabMenuShowingDialogVersion: null,
      tabLinkContextMenuShowingDialogVersion: null,
      tabDndableLeft: 0,
      showsTabMenu: false,
      blinksTabMenu: false,
      mainTabLinkContextMenuBalloonDialogStyle: {},
      mainTabLinkContextMenuPanelType: '',
      mainTabLinkContextMenuPanelCode: '',
      scrollX: new Animated.Value(0),
    }

    // Create animated style
    this.animatedStyle = {
      backgroundColor: this.blinkingAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.white_smoke, colors.medium_turquoise],
      }),
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: this.handleTabContentPress,
      onPanResponderRelease: this.handleTabContentRelease,
    })
  }

  componentDidMount() {
    // Start blinking animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.blinkingAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(this.blinkingAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start()

    this.updateTabScroll()
  }

  componentDidUpdate() {
    this.updateTabScroll()
  }

  updateTabScroll = () => {
    if (!this.scrollViewRef.current) return

    const selectedTab = this.tabRefs[this.currentFrontTab]
    if (selectedTab) {
      selectedTab.measure((x, y, width, height, pageX, pageY) => {
        const scrollView = this.scrollViewRef.current
        if (scrollView) {
          scrollView.scrollTo({
            x: Math.max(0, pageX - 20),
            animated: true,
          })
        }
      })
    }
  }

  handleTabPress = key => {
    if (key !== this.props.uiData.currentSelectedTab) {
      this.props.uiData.fire('mainArea_handleSelect', key)
    }
  }

  handleTabLongPress = (panelType, panelCode, event) => {
    const { locationX, locationY } = event.nativeEvent

    this.setState({
      tabLinkContextMenuShowingDialogVersion: ++this.props.uiData
        .showingDialogVersion,
      mainTabLinkContextMenuBalloonDialogStyle: {
        top: locationY,
        left: locationX,
      },
      mainTabLinkContextMenuPanelType: panelType,
      mainTabLinkContextMenuPanelCode: panelCode,
    })

    this.props.uiData.fire('showingDialog_update')
  }

  handleTabContentPress = (e, gestureState) => {
    this.mainTabContentClicking = gestureState.x0
  }

  handleTabContentRelease = (e, gestureState) => {
    const { props } = this
    if (
      this.mainTabContentClicking === gestureState.x0 &&
      props.uiData.mainPanelList.some(
        panel =>
          string(props.position).indexOf(string(panel.position)) !== -1 &&
          panel.panelType + '_' + panel.panelCode === this.currentFrontTab &&
          this.currentFrontTab !== props.uiData.currentSelectedTab,
      )
    ) {
      props.uiData.fire('mainArea_handleSelect', this.currentFrontTab)
    }
    this.mainTabContentClicking = 0
  }

  renderTab = (panel, key, index) => {
    const { props } = this
    const chatHeaderInfo = props.uiData.ucUiStore.getChatHeaderInfo({
      chatType: panel.panelType,
      chatCode: panel.panelCode,
    })

    let status = 32767
    let degree
    let tabTitle = ''
    let tabTitleTitle = ''

    // Status and title logic based on panel type
    if (panel.panelType === 'CHAT') {
      try {
        const buddy = JSON.parse(panel.panelCode)
        const buddyUserForUi =
          props.uiData.ucUiStore.getBuddyUserForUi(buddy) || {}
        if (buddyUserForUi.isBuddy) {
          const currentBuddyStatus =
            props.uiData.getCurrentBuddyStatus(buddy) || {}
          status = currentBuddyStatus.status
          degree = currentBuddyStatus.degree
        }
      } catch (e) {}
      tabTitle = tabTitleTitle = chatHeaderInfo.title
    }
    // ... other panel types logic

    return (
      <DndableSafe
        key={key}
        ref={ref => (this.tabRefs[key] = ref)}
        uiData={props.uiData}
        style={[
          styles.brMainTabLinkSpan,
          index === 0 && styles.brFirst,
          props.uiData.backgroundTabs[key]?.discarded && styles.brDiscarded,
        ]}
        dragSourceInfo={{
          dragSourceInfoType: 'mainTabLinkSpan',
          dragSourceInfoCode: `${props.position}|${key}`,
        }}
        onCheckCanDrop={ev =>
          ev.dragSourceInfo?.dragSourceInfoType === 'mainTabLinkSpan'
        }
        onDrop={() =>
          props.uiData.fire('mainTabsDndable_onDrop', {
            dropTargetInfoType: 'mainTabLinkSpan',
            dropTargetInfoCode: `${props.position}|${key}`,
          })
        }
      >
        <Animated.View
          style={[
            styles.tabLink,
            key === this.currentFrontTab && styles.tabLinkActive,
            props.uiData.backgroundTabs[key]?.discarded && styles.brDiscarded,
          ]}
        >
          <TouchableOpacity
            onPress={() => this.handleTabPress(key)}
            onLongPress={e =>
              this.handleTabLongPress(panel.panelType, panel.panelCode, e)
            }
            style={styles.tabTouchable}
          >
            <StatusIcon status={status} degree={degree} />
            <Text style={styles.brTabLinkTitle} numberOfLines={1}>
              {tabTitle || '\u2002'}
            </Text>
            <ButtonIconic
              style={styles.brTabLinkHideButton}
              iconName='cancel'
              onPress={() =>
                props.uiData.fire(
                  'tabLinkHideButton_onClick',
                  panel.panelType,
                  panel.panelCode,
                )
              }
            />
          </TouchableOpacity>
        </Animated.View>
      </DndableSafe>
    )
  }

  renderTabMenuItems = () => {
    const { props } = this
    const tabPanels = props.uiData.mainPanelList.filter(
      panel => string(props.position).indexOf(string(panel.position)) !== -1,
    )

    return tabPanels.map(panel => {
      const key = `${panel.panelType}_${panel.panelCode}`
      const chatHeaderInfo = props.uiData.ucUiStore.getChatHeaderInfo({
        chatType: panel.panelType,
        chatCode: panel.panelCode,
      })

      let status = 32767
      let degree
      let tabTitle = this.getTabTitle(panel, chatHeaderInfo)

      return (
        <MenuItem
          key={key}
          style={[
            styles.brMainTabMenuItem,
            props.uiData.blinkingTabs[key] && styles.brBlinking,
            key === props.uiData.currentSelectedTab && styles.brSelected,
          ]}
          onPress={() =>
            props.uiData.fire(
              'tabMenuItem_onClick',
              panel.panelType,
              panel.panelCode,
            )
          }
        >
          <StatusIcon status={status} degree={degree} />
          <Text style={styles.brMainTabMenuItemTitle}>
            {tabTitle || '\u2002'}
          </Text>
        </MenuItem>
      )
    })
  }

  renderContextMenuItems = () => {
    const { props } = this
    const { mainTabLinkContextMenuPanelType, mainTabLinkContextMenuPanelCode } =
      this.state

    return (
      <>
        <MenuItem
          style={styles.brMainTabLinkContextMenuItem}
          onPress={() =>
            props.uiData.fire(
              'tabLinkHideButton_onClick',
              mainTabLinkContextMenuPanelType,
              mainTabLinkContextMenuPanelCode,
            )
          }
        >
          <Text>{uawMsgs.LBL_TAB_LINK_HIDE_MENU}</Text>
        </MenuItem>

        {props.uiData.mainAreaSplitters !== 0 && (
          <MenuItem
            style={[
              styles.brMainTabLinkContextMenuItem,
              styles.brTabLinkMoveHContextMenuItem,
            ]}
            onPress={() =>
              props.uiData.fire(
                'tabLinkMoveHContextMenuItem_onClick',
                mainTabLinkContextMenuPanelType,
                mainTabLinkContextMenuPanelCode,
              )
            }
          >
            <Text>
              {string(props.position).indexOf('east') !== -1 ||
              string(props.position).indexOf('se') !== -1
                ? uawMsgs.LBL_TAB_LINK_MOVE_LEFT_MENU
                : uawMsgs.LBL_TAB_LINK_MOVE_RIGHT_MENU}
            </Text>
          </MenuItem>
        )}

        {props.uiData.mainAreaSplitters === 2 && (
          <MenuItem
            style={[
              styles.brMainTabLinkContextMenuItem,
              styles.brTabLinkMoveVContextMenuItem,
            ]}
            onPress={() =>
              props.uiData.fire(
                'tabLinkMoveVContextMenuItem_onClick',
                mainTabLinkContextMenuPanelType,
                mainTabLinkContextMenuPanelCode,
              )
            }
          >
            <Text>
              {string(props.position).indexOf('south') !== -1 ||
              string(props.position).indexOf('se') !== -1
                ? uawMsgs.LBL_TAB_LINK_MOVE_UP_MENU
                : uawMsgs.LBL_TAB_LINK_MOVE_DOWN_MENU}
            </Text>
          </MenuItem>
        )}
      </>
    )
  }

  getTabTitle = (panel, chatHeaderInfo) => {
    if (panel.panelType === 'CHAT') {
      return chatHeaderInfo.title
    } else if (panel.panelType === 'CONFERENCE') {
      return chatHeaderInfo.title
    } else if (panel.panelType === 'PREFERENCE') {
      return uawMsgs.TAB_PREFERENCE
    } else if (panel.panelType === 'WEBCHATQUEUE') {
      return uawMsgs.TAB_WEBCHATQUEUE
    } else if (panel.panelType === 'EXTERNALCALL') {
      return string(
        this.props.uiData.externalCallWorkTable?.[panel.panelCode]
          ?.display_name || panel.panelCode,
      )
    } else if (panel.panelType === 'HISTORYSUMMARIES') {
      return uawMsgs.TAB_HISTORYSUMMARIES
    } else if (panel.panelType === 'HISTORYDETAIL') {
      return (
        uawMsgs.TAB_HISTORYDETAIL +
        string(
          this.props.uiData.historyDetailWorkTable?.[panel.panelCode]
            ?.historyDetailName,
        )
      )
    }
    return ''
  }

  render() {
    const { props } = this
    const tabPanels = props.uiData.mainPanelList.filter(
      panel => string(props.position).indexOf(string(panel.position)) !== -1,
    )

    return (
      <View style={styles.brMainTabs}>
        <ScrollView
          ref={this.scrollViewRef}
          horizontal
          style={styles.brMainTabLinks}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.state.scrollX } } }],
            { useNativeDriver: true },
          )}
        >
          {tabPanels.map((panel, index) => {
            const key = `${panel.panelType}_${panel.panelCode}`
            return this.renderTab(panel, key, index)
          })}
        </ScrollView>

        {this.state.showsTabMenu && (
          <TouchableOpacity
            style={styles.brMainTabMenu}
            onPress={() => {
              this.setState({
                tabMenuShowingDialogVersion: ++props.uiData
                  .showingDialogVersion,
              })
              props.uiData.fire('showingDialog_update')
            }}
          >
            <Image
              source={require('../assets/images/triangle_down.png')}
              style={[
                styles.menuIcon,
                this.state.blinksTabMenu && styles.brBlinking,
              ]}
            />
          </TouchableOpacity>
        )}

        <View
          style={styles.brMainTabContent}
          {...this.panResponder.panHandlers}
        >
          {tabPanels.map(panel => {
            const key = `${panel.panelType}_${panel.panelCode}`
            if (key === this.currentFrontTab) {
              return (
                <PanelArea
                  key={key}
                  uiData={props.uiData}
                  panelType={panel.panelType}
                  panelCode={panel.panelCode}
                />
              )
            }
            return null
          })}
        </View>

        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
            this.state.tabMenuShowingDialogVersion
          }
          style={styles.brMainTabMenuBalloonDialog}
        >
          {this.renderTabMenuItems()}
        </MenuBalloonDialog>

        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
            this.state.tabLinkContextMenuShowingDialogVersion
          }
          style={[
            styles.brMainTabLinkContextMenuBalloonDialog,
            this.state.mainTabLinkContextMenuBalloonDialogStyle,
          ]}
        >
          {this.renderContextMenuItems()}
        </MenuBalloonDialog>
      </View>
    )
  }
}

// First, define the colors from the CSS variables
const colors = {
  medium_turquoise: '#color2', // Replace with actual color
  blue_green: '#darkenColor2', // Replace with actual color
  mantis: '#color1', // Replace with actual color
  white: '#ffffff',
  snow: '#fafafa',
  white_smoke: '#f5f5f5',
  isabelline: '#eeeeee',
  platinum: '#e0e0e0',
  dark_gray: '#9e9e9e',
  dark_jungle_green: '#212121',
  disabled_gray: '#bdbdbd',
}

const styles = StyleSheet.create({
  brMainTabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  brMainTabLinks: {
    position: 'absolute',
    left: 0,
    top: 14,
    right: 23,
    height: 25,
    backgroundColor: colors.platinum,
    borderBottomWidth: 1,
    borderBottomColor: colors.platinum,
  },
  brMainTabLinkSpan: {
    paddingLeft: 5,
    paddingRight: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  brFirst: {
    marginLeft: 1,
  },
  tabLink: {
    position: 'relative',
    height: 25,
    marginRight: -1,
    borderWidth: 1,
    borderColor: colors.platinum,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingHorizontal: 8,
    backgroundColor: colors.white_smoke,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabLinkActive: {
    borderBottomWidth: 0,
    backgroundColor: colors.white,
  },
  brBlinking: {
    // Using React Native Animated API for blinking effect
  },
  brDiscarded: {
    opacity: 0.7,
  },
  brStatusIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  brTabLinkTitle: {
    maxWidth: 80,
    fontSize: 11 * (1 / 16),
    fontWeight: '400',
    letterSpacing: 0.3 * (1 / 16),
    lineHeight: 1.6 * (11 * (1 / 16)),
  },
  brTabLinkHideButton: {
    width: 18,
    height: 18,
    marginLeft: 2,
  },
  brMainTabMenu: {
    position: 'absolute',
    right: 0,
    top: 14,
    width: 23,
    height: 25,
    borderWidth: 1,
    borderColor: colors.platinum,
    backgroundColor: colors.white_smoke,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brMainTabMenuPressed: {
    backgroundColor: colors.isabelline,
  },
  brMainTabMenuHidden: {
    borderColor: colors.snow,
    borderBottomColor: colors.platinum,
    backgroundColor: colors.snow,
  },
  brMainTabMenuBalloonDialog: {
    position: 'absolute',
    right: 2,
    top: 39,
    maxWidth: '90%',
    zIndex: 9999,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  brMainTabMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  brSelected: {
    backgroundColor: colors.white,
    borderLeftWidth: 3,
    borderLeftColor: colors.medium_turquoise,
  },
  brMainTabMenuItemTitle: {
    marginLeft: 5,
  },
  brMainTabLinkContextMenuBalloonDialog: {
    position: 'absolute',
    zIndex: 9999,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  brMainTabLinksLastDndable: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 14,
    height: 25,
    display: 'none', // Will be handled in component logic
  },
  brMainTabContent: {
    position: 'absolute',
    width: '100%',
    top: 39,
    bottom: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.platinum,
    backgroundColor: colors.white_smoke,
  },
  brMainTabContentSelected: {
    backgroundColor: colors.white,
  },
  brHidden: {
    display: 'none',
  },
  brCanDrop: {
    borderWidth: 3,
    borderColor: colors.medium_turquoise,
  },
  menuIcon: {
    width: 12,
    height: 12,
    tintColor: '#666666',
  },
  brMainTabLinkContextMenuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  brTabLinkMoveHContextMenuItem: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  brTabLinkMoveVContextMenuItem: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  brInternetExplorer: {
    // Not needed for React Native
  },
  tabTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
})
