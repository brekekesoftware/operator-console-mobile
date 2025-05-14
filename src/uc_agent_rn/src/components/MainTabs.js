import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ButtonIconic from './ButtonIconic.js'
import DndableSafe from './DndableSafe.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'
import PanelArea from './PanelArea.js'
import StatusIcon from './StatusIcon.js'
import animate from '../utilities/animate.js'
import {
  View,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  findNodeHandle,
  UIManager,
  NativeModules,
  Animated,
} from 'react-native'
import TriangleDownIcon from '../icons/TriangleDownIcon.js'
import CancelIcon from '../icons/CancelIcon.js'
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist'
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
const colors = {
  whiteSmoke: '#F5F5F5',
  mediumTurquoise: '#4BC5DE',
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.currentFrontTab = ''
    this.mainTabContentClicking = 0
    this.state = {
      tabMenuShowingDialogVersion: null,
      tabLinkContextMenuShowingDialogVersion: null,
      tabDndableLeft: 0,
      showsTabMenu: false,
      blinksTabMenu: false,
      mainTabLinkContextMenuBalloonDialogStyle: {},
      mainTabLinkContextMenuPanelType: '',
      mainTabLinkContextMenuPanelCode: '',
      activeTab: props.uiData.currentSelectedTab || '',
      isDragging: false,
    }
    this.mainTabLinksRef = React.createRef()
    this.mainTabsRef = React.createRef()
    this.tabRefs = {}
    this.animationRefs = {}
  }

  componentDidUpdate(prevProps) {
    const props = this.props
    console.log(
      '#Duy Phan console currentSelectedTab',
      props.uiData.currentSelectedTab,
      prevProps?.uiData?.currentSelectedTab,
    )
    if (
      prevProps?.uiData?.currentSelectedTab !==
      props?.uiData?.currentSelectedTab
    ) {
      this.setState({ activeTab: props.uiData.currentSelectedTab || '' })
    }

    if (this.mainTabLinksRef.current) {
      const newState = {}

      const selectedTabRef = this.tabRefs[this.currentFrontTab]
      if (selectedTabRef && selectedTabRef.current) {
        selectedTabRef.current.measure((x, y, width, height, pageX, pageY) => {
          if (this.mainTabLinksRef.current) {
            this.mainTabLinksRef.current.scrollTo({
              x: Math.max(0, pageX - 20),
              animated: true,
            })
          }
        })
      }

      if (this.mainTabLinksRef.current) {
        this.mainTabLinksRef.current.measure(
          (x, y, width, height, pageX, pageY) => {
            const containerWidth = width

            let totalTabWidth = 0
            Object.keys(this.tabRefs).forEach(key => {
              const tabRef = this.tabRefs[key]
              if (tabRef && tabRef.current) {
                totalTabWidth += 100
              }
            })

            if (totalTabWidth > containerWidth) {
              if (!this.state.showsTabMenu) {
                newState.showsTabMenu = true
              }
              if (this.state.tabDndableLeft !== containerWidth) {
                newState.tabDndableLeft = containerWidth
              }
            } else {
              if (this.state.showsTabMenu) {
                newState.showsTabMenu = false
              }
              if (this.state.tabDndableLeft !== totalTabWidth) {
                newState.tabDndableLeft = totalTabWidth
              }
            }

            if (
              totalTabWidth > containerWidth &&
              Object.keys(props.uiData.blinkingTabs).some(key => {
                const tabRef = this.tabRefs[key]
                if (tabRef && tabRef.current) {
                  return true
                }
                return false
              })
            ) {
              if (!this.state.blinksTabMenu) {
                newState.blinksTabMenu = true
              }
            } else {
              if (this.state.blinksTabMenu) {
                newState.blinksTabMenu = false
              }
            }

            if (Object.keys(newState).length) {
              this.setState(newState)
              console.log('#Duy Phan console newState', newState)
            }
          },
        )
      }
    }

    const newBlinkingTabs = this.props.uiData.blinkingTabs || {}
    const prevBlinkingTabs = prevProps?.uiData?.blinkingTabs || {}

    // Stop animations for removed tabs
    Object.keys(prevBlinkingTabs).forEach(key => {
      if (!newBlinkingTabs[key] && this.animationRefs[key]) {
        this.animationRefs[key].stopAnimation()
        delete this.animationRefs[key]
      }
    })

    // Handle new blinking tabs

    console.log(
      '#Duy Phan console newBlinkingTabs',
      newBlinkingTabs,
      prevBlinkingTabs,
    )
    Object.keys(newBlinkingTabs).forEach(key => {
      const animations = { ...this.animationRefs }
      animations[key] = new Animated.Value(0)
      this.animationRefs[key] = animations[key]
      this.startBlinkingAnimation(key)
    })
  }

  startBlinkingAnimation(key) {
    const animation = this.animationRefs[key]
    console.log('#Duy Phan console animation', animation)
    if (!animation) return

    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]),
    ).start()
  }

  handleMainTabLinkSpanContextMenu(panelType, panelCode, ev) {
    const props = this.props

    if (this.mainTabsRef.current) {
      this.mainTabsRef.current.measure((x, y, width, height, pageX, pageY) => {
        const mainTabLinkContextMenuBalloonDialogStyle = {
          top: ev.nativeEvent.pageY - pageY,
        }

        if (ev.nativeEvent.pageX < pageX + width / 2) {
          mainTabLinkContextMenuBalloonDialogStyle.left =
            ev.nativeEvent.pageX - pageX
        } else {
          mainTabLinkContextMenuBalloonDialogStyle.right =
            pageX + width - ev.nativeEvent.pageX
        }

        if (
          props.uiData.showingDialogVersion !==
          this.state.tabLinkContextMenuShowingDialogVersion
        ) {
          this.setState({
            tabLinkContextMenuShowingDialogVersion: ++props.uiData
              .showingDialogVersion,
            mainTabLinkContextMenuBalloonDialogStyle:
              mainTabLinkContextMenuBalloonDialogStyle,
            mainTabLinkContextMenuPanelType: panelType,
            mainTabLinkContextMenuPanelCode: panelCode,
          })
          props.uiData.fire('showingDialog_update')
        } else {
          this.setState({
            mainTabLinkContextMenuBalloonDialogStyle:
              mainTabLinkContextMenuBalloonDialogStyle,
            mainTabLinkContextMenuPanelType: panelType,
            mainTabLinkContextMenuPanelCode: panelCode,
          })
        }
      })
    }
  }
  handleMainTabMenuClick(ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
      this.state.tabMenuShowingDialogVersion
    ) {
      this.setState({
        tabMenuShowingDialogVersion: ++props.uiData.showingDialogVersion,
      })
      props.uiData.fire('showingDialog_update')
    } else {
      props.uiData.window_onclick()
    }
  }
  handleMainTabContentTouchStart(ev) {
    this.mainTabContentClicking = ev.nativeEvent.pageX
  }
  handleMainTabContentTouchEnd(ev) {
    const props = this.props
    if (
      this.mainTabContentClicking === ev.nativeEvent.pageX &&
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
  handleTabSelect = tabId => {
    this.setState({ activeTab: tabId })
    this.props.uiData.fire('mainArea_handleSelect', tabId)
  }

  handleDragStart = () => {
    this.setState({ isDragging: true })
    if (this.mainTabLinksRef.current) {
      this.mainTabLinksRef.current.setNativeProps({ scrollEnabled: false })
    }
  }

  handleDragEnd = ({ data }) => {
    const props = this.props
    this.setState({ isDragging: false })

    if (this.mainTabLinksRef.current) {
      this.mainTabLinksRef.current.setNativeProps({ scrollEnabled: true })
    }

    const newPanelList = data
      .map(item => {
        return props.uiData.mainPanelList.find(
          panel => panel.panelType + '_' + panel.panelCode === item.key,
        )
      })
      .filter(Boolean)

    if (newPanelList.length === props.uiData.mainPanelList.length) {
      props.uiData.mainPanelList = newPanelList
      this.forceUpdate()
    }
  }

  renderItem = ({ item, index, drag, isActive }) => {
    const props = this.props
    const key = item.key
    const isBlinking = props.uiData.blinkingTabs?.[key]
    console.log('#Duy Phan console isBlinking', isBlinking)

    const backgroundColor = isBlinking
      ? this.animationRefs[key]?.interpolate({
          inputRange: [0, 1],
          outputRange: [colors.whiteSmoke, colors.mediumTurquoise],
        })
      : undefined

    return (
      <ScaleDecorator>
        <TouchableOpacity
          ref={this.tabRefs[key]}
          key={'span_' + key}
          onPress={() => this.handleTabSelect(key)}
          onLongPress={drag}
          delayLongPress={150}
          activeOpacity={1}
          style={[
            styles.brMainTabLinkSpan,
            // this.state.activeTab === key ? styles.brSelected : {},
            // item.bgColorTable?.[key] && { backgroundColor: item.bgColorTable[key] },
            // isActive && styles.dragging,
          ]}
        >
          <Animated.View
            style={[
              styles.tabLink,
              this.state.activeTab === key ? styles.tabLinkActiveSelected : {},
              item.bgColorTable?.[key] && {
                backgroundColor: item.bgColorTable[key],
              },
              isActive && styles.dragging,
              isBlinking && { backgroundColor },
            ]}
          >
            <StatusIcon status={item.status} degree={item.degree} />
            <Text
              style={styles.brTabLinkTitle}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {item.tabTitle || '\u2002'}
            </Text>
            <ButtonIconic
              // style={{marginLeft: 2, width: 18, height: 18}}
              title={uawMsgs.LBL_TAB_LINK_HIDE_BUTTON_TOOLTIP}
              onPress={props.uiData.fire.bind(
                props.uiData,
                'tabLinkHideButton_onClick',
                item.panel.panelType,
                item.panel.panelCode,
              )}
              iconSource={<CancelIcon />}
            />
          </Animated.View>
        </TouchableOpacity>
      </ScaleDecorator>
    )
  }

  render() {
    const props = this.props
    const tabLinkList = []
    const tabMenuItemList = []
    const tabContentList = []
    let frontTab = ''
    let lastFrontTab = ''
    let hasSelectedTab = false
    const isIE = false

    let chatBgColorList = []
    try {
      chatBgColorList = [].concat(
        JSON.parse(
          string(
            props.uiData.ucUiStore.getOptionalSetting({ key: 'chat_bg_color' }),
          ) || '{}',
        ).list || [],
      )
    } catch (ex) {
      props.uiData.ucUiStore.getLogger().log('warn', ex)
    }
    const bgColorTable = {}
    props.uiData.mainPanelList
      .filter(
        panel => string(props.position).indexOf(string(panel.position)) !== -1,
      )
      .forEach(panel => {
        const key = panel.panelType + '_' + panel.panelCode
        const chatHeaderInfo = props.uiData.ucUiStore.getChatHeaderInfo({
          chatType: panel.panelType,
          chatCode: panel.panelCode,
        })
        let buddyUserForUi = {}
        let status = 32767
        let degree = undefined
        let tabTitle = ''
        let tabTitleTitle = ''
        if (key === props.uiData.currentSelectedTab) {
          frontTab = key
          hasSelectedTab = true
        } else if (key === this.currentFrontTab && !hasSelectedTab) {
          frontTab = key
        } else if (!frontTab) {
          frontTab = key
        }
        if (key === this.currentFrontTab) {
          lastFrontTab = key
        }
        if (panel.panelType === 'CHAT') {
          try {
            const buddy = JSON.parse(panel.panelCode)
            buddyUserForUi =
              props.uiData.ucUiStore.getBuddyUserForUi(buddy) || {}
            if (buddyUserForUi.isBuddy) {
              const currentBuddyStatus =
                props.uiData.getCurrentBuddyStatus(buddy) || {}
              status = currentBuddyStatus.status
              degree = currentBuddyStatus.degree
            }
          } catch (e) {}
          tabTitle = tabTitleTitle = chatHeaderInfo.title
        } else if (panel.panelType === 'CONFERENCE') {
          const conf_id = string(
            props.uiData.ucUiStore.getChatHeaderInfo({
              chatType: panel.panelType,
              chatCode: panel.panelCode,
            }).conf_id,
          )
          const conference = props.uiData.ucUiStore
            .getChatClient()
            .getConference(conf_id)
          const isTalking =
            conference.conf_type === 'webchat'
              ? props.uiData.ucUiStore.getWebchatQueue({ conf_id: conf_id })
                  .isTalking
              : conference.conf_status === Constants.CONF_STATUS_JOINED
          if (isTalking) {
            status = Constants.STATUS_AVAILABLE
          } else {
            status = Constants.STATUS_OFFLINE
          }
          tabTitle = chatHeaderInfo.title
          tabTitleTitle =
            chatHeaderInfo.title + '\n' + chatHeaderInfo.guestProfinfo
        } else if (panel.panelType === 'PREFERENCE') {
          tabTitle = tabTitleTitle = uawMsgs.TAB_PREFERENCE
        } else if (panel.panelType === 'WEBCHATQUEUE') {
          tabTitle = tabTitleTitle = uawMsgs.TAB_WEBCHATQUEUE
        } else if (panel.panelType === 'EXTERNALCALL') {
          tabTitle = tabTitleTitle = string(
            (props.uiData.externalCallWorkTable &&
              props.uiData.externalCallWorkTable[panel.panelCode] &&
              props.uiData.externalCallWorkTable[panel.panelCode]
                .display_name) ||
              panel.panelCode,
          )
        } else if (panel.panelType === 'HISTORYSUMMARIES') {
          tabTitle = tabTitleTitle = uawMsgs.TAB_HISTORYSUMMARIES
        } else if (panel.panelType === 'HISTORYDETAIL') {
          tabTitle = tabTitleTitle =
            uawMsgs.TAB_HISTORYDETAIL +
            string(
              (
                (props.uiData.historyDetailWorkTable &&
                  props.uiData.historyDetailWorkTable[panel.panelCode]) ||
                {}
              ).historyDetailName,
            )
        }
        try {
          chatBgColorList.some(element => {
            const bgInfo = element || {}
            if (bgInfo.type === 'conf_type') {
              if (panel.panelType === 'CONFERENCE') {
                if (new RegExp(bgInfo.data).test(chatHeaderInfo.confType)) {
                  bgColorTable[key] = bgInfo.color
                  return true
                }
              }
            } else if (bgInfo.type === 'subject') {
              if (panel.panelType === 'CONFERENCE') {
                if (new RegExp(bgInfo.data).test(chatHeaderInfo.subject)) {
                  bgColorTable[key] = bgInfo.color
                  return true
                }
              }
            } else if (bgInfo.type === 'group') {
              if (panel.panelType === 'CHAT') {
                if (new RegExp(bgInfo.data).test(buddyUserForUi.group)) {
                  bgColorTable[key] = bgInfo.color
                  return true
                }
              }
            } else if (bgInfo.type === 'user_id') {
              if (panel.panelType === 'CHAT') {
                if (new RegExp(bgInfo.data).test(buddyUserForUi.user_id)) {
                  bgColorTable[key] = bgInfo.color
                  return true
                }
              }
            } else if (bgInfo.type === 'name') {
              if (panel.panelType === 'CHAT') {
                if (new RegExp(bgInfo.data).test(buddyUserForUi.name)) {
                  bgColorTable[key] = bgInfo.color
                  return true
                }
              }
            } else if (bgInfo.type === 'tag') {
              const dataArray = string(bgInfo.data).split('|')
              const tagTypeData = dataArray.shift()
              const tagKeyData = dataArray.shift()
              const tagValueData = dataArray.join('|')
              if (panel.panelType === 'CONFERENCE') {
                if (
                  (chatHeaderInfo.conf_tags || []).some(
                    tag =>
                      tagTypeData === tag.tag_type &&
                      tagKeyData === tag.tag_key &&
                      new RegExp(tagValueData).test(tag.tag_value),
                  )
                ) {
                  bgColorTable[key] = bgInfo.color
                  return true
                }
              }
            }
          })
        } catch (ex) {
          props.uiData.ucUiStore.getLogger().log('warn', ex)
        }
        const dndInfoCode = string(props.position) + '|' + key

        if (!this.tabRefs[key]) {
          this.tabRefs[key] = React.createRef()
        }
        console.log('#Duy Phan console status user', status)

        tabLinkList.push({
          key,
          status,
          degree,
          tabTitle,
          panel,
          dndInfoCode,
          bgColorTable,
        })

        tabMenuItemList.push(
          <MenuItem
            key={key}
            className={
              'brMainTabMenuItem' +
              (props.uiData.blinkingTabs[key] ? ' brBlinking' : '') +
              (key === props.uiData.currentSelectedTab ? ' brSelected' : '')
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              ...(key === this.state.activeTab ? styles.brSelected : {}),
            }}
            onPress={() => {
              props.uiData.fire.bind(
                props.uiData,
                'tabMenuItem_onClick',
                panel.panelType,
                panel.panelCode,
              )
              this.setState({
                activeTab: key,
              })
            }}
          >
            <StatusIcon status={status} degree={degree} />
            <Text style={styles.brMainTabMenuItemTitle}>
              {tabTitle || '\u2002'}
            </Text>
          </MenuItem>,
        )
        console.log(
          '#Duy Phan console renderPanelArea',
          this.state.activeTab === key,
        )
        tabContentList.push(
          <View
            key={key}
            style={[
              styles.tabContent,
              this.state.activeTab === key
                ? styles.tabContentActive
                : styles.tabContentInactive,
            ]}
          >
            <PanelArea
              uiData={props.uiData}
              panelType={panel.panelType}
              panelCode={panel.panelCode}
            />
          </View>,
        )
      })
    if (props.uiData.backgroundTabs[frontTab]) {
      delete props.uiData.backgroundTabs[frontTab]
    }
    if (
      lastFrontTab &&
      lastFrontTab !== frontTab &&
      !props.uiData.backgroundTabs[lastFrontTab]
    ) {
      props.uiData.backgroundTabs[lastFrontTab] = { time: Date.now() }
    }
    this.currentFrontTab = frontTab
    console.log('#Duy Phan console tabContentList', tabContentList.length)

    return (
      <View
        ref={this.mainTabsRef}
        style={[styles.brMainTabs]}
        // pointerEvents='box-none'
      >
        <ScrollView
          ref={this.mainTabLinksRef}
          style={styles.brMainTabLinks}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={() => this.componentDidUpdate()}
          scrollEnabled={!this.state.isDragging}
          bounces={false}
          decelerationRate='fast'
        >
          <DraggableFlatList
            data={tabLinkList}
            keyExtractor={item => item.key}
            renderItem={this.renderItem}
            horizontal
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
            activationDistance={15}
            containerStyle={styles.draggableList}
            scrollEnabled={false}
            dragHitSlop={{ top: 10, bottom: 10, left: 15, right: 15 }}
          />
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.brMainTabMenu,
            this.state.showsTabMenu ? {} : styles.brMainTabMenuHidden,
            this.state.blinksTabMenu ? styles.brMainTabMenuBlinking : {},
          ]}
          onPress={
            this.state.showsTabMenu
              ? this.handleMainTabMenuClick.bind(this)
              : () => {}
          }
        >
          <TriangleDownIcon />
        </TouchableOpacity>
        <DndableSafe
          uiData={props.uiData}
          className='brMainTabLinksLastDndable'
          style={{ left: Math.max(1, this.state.tabDndableLeft) }}
          onCheckCanDrop={ev =>
            ev.dragSourceInfo &&
            ev.dragSourceInfo.dragSourceInfoType === 'mainTabLinkSpan' &&
            string(props.position).indexOf(
              string(ev.dragSourceInfo.dragSourceInfoCode).split('|')[0],
            ) === -1
          }
          onDrop={props.uiData.fire.bind(
            props.uiData,
            'mainTabsDndable_onDrop',
            {
              dropTargetInfoType: 'mainTabLinksLast',
              dropTargetInfoCode: string(props.position),
            },
          )}
        />
        <View
          style={[
            styles.brMainTabContent,
            hasSelectedTab && bgColorTable[frontTab]
              ? { backgroundColor: bgColorTable[frontTab] }
              : {},
          ]}
          onTouchStart={this.handleMainTabContentTouchStart.bind(this)}
          onTouchEnd={this.handleMainTabContentTouchEnd.bind(this)}
          pointerEvents='box-none'
        >
          {tabContentList}
        </View>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
            this.state.tabMenuShowingDialogVersion
          }
          style={styles.brMainTabMenuBalloonDialog}
        >
          {tabMenuItemList}
        </MenuBalloonDialog>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
            this.state.tabLinkContextMenuShowingDialogVersion
          }
          className='brMainTabLinkContextMenuBalloonDialog'
          style={this.state.mainTabLinkContextMenuBalloonDialogStyle}
        >
          <MenuItem
            className='brMainTabLinkContextMenuItem'
            onPress={props.uiData.fire.bind(
              props.uiData,
              'tabLinkHideButton_onClick',
              this.state.mainTabLinkContextMenuPanelType,
              this.state.mainTabLinkContextMenuPanelCode,
            )}
          >
            {uawMsgs.LBL_TAB_LINK_HIDE_MENU}
          </MenuItem>
          <MenuItem
            className='brMainTabLinkContextMenuItem brTabLinkMoveHContextMenuItem'
            hidden={props.uiData.mainAreaSplitters === 0}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'tabLinkMoveHContextMenuItem_onClick',
              this.state.mainTabLinkContextMenuPanelType,
              this.state.mainTabLinkContextMenuPanelCode,
            )}
          >
            {string(props.position).indexOf('east') !== -1 ||
            string(props.position).indexOf('se') !== -1
              ? uawMsgs.LBL_TAB_LINK_MOVE_LEFT_MENU
              : uawMsgs.LBL_TAB_LINK_MOVE_RIGHT_MENU}
          </MenuItem>
          <MenuItem
            className='brMainTabLinkContextMenuItem brTabLinkMoveVContextMenuItem'
            hidden={props.uiData.mainAreaSplitters !== 2}
            onPress={props.uiData.fire.bind(
              props.uiData,
              'tabLinkMoveVContextMenuItem_onClick',
              this.state.mainTabLinkContextMenuPanelType,
              this.state.mainTabLinkContextMenuPanelCode,
            )}
          >
            {string(props.position).indexOf('south') !== -1 ||
            string(props.position).indexOf('se') !== -1
              ? uawMsgs.LBL_TAB_LINK_MOVE_UP_MENU
              : uawMsgs.LBL_TAB_LINK_MOVE_DOWN_MENU}
          </MenuItem>
        </MenuBalloonDialog>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  brMainTabs: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },

  brMainTabsSelected: {},
  brMainTabLinks: {
    position: 'absolute',
    left: 0,
    top: 14,
    right: 23,
    height: 25,
  },
  brMainTabLinkSpan: {
    paddingLeft: 5,
    paddingRight: 1,
  },
  brMainTabLinkSpanFirst: {
    marginLeft: 1,
  },
  tabLink: {
    position: 'relative',
    marginRight: -1,
    height: 25,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: 0,
    paddingHorizontal: 8,
    backgroundColor: '#F6F6F6',
    color: '#666666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabLinkActive: {
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabLinkActiveSelected: {
    backgroundColor: '#FFFFFF',
    color: '#1A2B2B',
    borderBottomColor: 'transparent',
  },
  tabContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabContentActive: {
    display: 'flex',
  },
  tabContentInactive: {
    display: 'none',
  },
  brStatusIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  brTabLinkTitle: {
    maxWidth: 80,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 17.6,
    letterSpacing: 0.3,
    marginLeft: 5,
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
    width: 27,
    height: 25,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#F6F6F6',
  },
  brMainTabMenuHidden: {
    display: 'none',
  },
  brMainTabMenuBlinking: {},
  brMainTabMenuBalloonDialog: {
    position: 'absolute',
    right: 2,
    top: 39,
    maxWidth: '90%',
    zIndex: 9999,
  },
  brMainTabMenuItemSelected: {
    borderLeftWidth: 3,
    borderLeftColor: '#48D1CC',
  },
  brMainTabMenuItemTitle: {
    fontSize: 13,
  },
  brMainTabLinkContextMenuBalloonDialog: {
    position: 'absolute',
    zIndex: 9999,
  },
  brMainTabLinksLastDndable: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 14,
    height: 25,
  },
  brMainTabLinksLastDndableCanDrop: {
    display: 'block',
  },
  brMainTabLinksLastDndableIsOverCanDrop: {
    borderWidth: 3,
    borderColor: '#48D1CC',
  },
  brMainTabContent: {
    position: 'absolute',
    width: '100%',
    top: 39,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#FFFFFF',
  },
  brMainTabContentSelected: {
    backgroundColor: '#FFFFFF',
  },
  brSelected: {
    borderLeftWidth: 2,
    borderLeftColor: '#4bc5de',
  },
  draggableList: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 2,
  },
  dragging: {
    opacity: 0.7,
    elevation: 5,
    zIndex: 999,
    transform: [{ scale: 1.05 }],
  },
})
