import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import { Tabs, TabLink, TabContent } from 'react-tabs-redux'
import ButtonIconic from './ButtonIconic.js'
import DndableSafe from './DndableSafe.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'
import PanelArea from './PanelArea.js'
import StatusIcon from './StatusIcon.js'
import animate from '../utilities/animate.js'

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
    }
  }
  componentDidUpdate() {
    const props = this.props
    const parent = ReactDOM.findDOMNode(this.refs['mainTabLinks'])
    if (parent && parent.childNodes) {
      const newState = {}
      let newScrollLeft = parent.scrollLeft
      const selectedChild = ReactDOM.findDOMNode(
        this.refs[this.currentFrontTab],
      )
      if (selectedChild) {
        if (
          parent.scrollLeft <
          Math.min(
            parent.scrollWidth - parent.clientWidth,
            selectedChild.offsetLeft +
              selectedChild.offsetWidth -
              parent.clientWidth +
              20,
          )
        ) {
          newScrollLeft = Math.min(
            parent.scrollWidth - parent.clientWidth,
            selectedChild.offsetLeft +
              selectedChild.offsetWidth -
              parent.clientWidth +
              20,
          )
        } else if (
          parent.scrollLeft > Math.max(0, selectedChild.offsetLeft - 20)
        ) {
          newScrollLeft = Math.max(0, selectedChild.offsetLeft - 20)
        }
      }
      const childrenWidth = Array.prototype.reduce.call(
        parent.childNodes,
        (p, node) => Math.max(p, int(node.offsetLeft) + int(node.offsetWidth)),
        0,
      )
      if (childrenWidth > parent.clientWidth) {
        if (!this.state.showsTabMenu) {
          newState.showsTabMenu = true
        }
        if (this.state.tabDndableLeft !== parent.clientWidth) {
          newState.tabDndableLeft = parent.clientWidth
        }
      } else {
        if (this.state.showsTabMenu) {
          newState.showsTabMenu = false
        }
        if (this.state.tabDndableLeft !== childrenWidth) {
          newState.tabDndableLeft = childrenWidth
        }
      }
      if (
        childrenWidth > parent.clientWidth &&
        Object.keys(props.uiData.blinkingTabs).some(key => {
          const child = ReactDOM.findDOMNode(this.refs[key])
          return (
            child &&
            (newScrollLeft + parent.clientWidth <= child.offsetLeft ||
              child.offsetLeft + child.offsetWidth <= newScrollLeft)
          )
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
        return
      }
      if (newScrollLeft !== parent.scrollLeft) {
        animate(parent, 'scrollLeft', newScrollLeft)
      }
    }
  }
  handleMainTabLinkSpanContextMenu(panelType, panelCode, ev) {
    const props = this.props
    const mainTabs = ReactDOM.findDOMNode(this.refs['mainTabs'])
    const mainTabsRect = mainTabs && mainTabs.getBoundingClientRect()
    if (mainTabsRect) {
      const mainTabLinkContextMenuBalloonDialogStyle = {
        top: ev.clientY - mainTabsRect.top + 'px',
      }
      if (ev.clientX < (mainTabsRect.left + mainTabsRect.right) / 2) {
        mainTabLinkContextMenuBalloonDialogStyle.left =
          ev.clientX - mainTabsRect.left + 'px'
      } else {
        mainTabLinkContextMenuBalloonDialogStyle.right =
          mainTabsRect.right - ev.clientX + 'px'
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
      ev.preventDefault()
      ev.stopPropagation()
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
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleMainTabContentMouseDown(ev) {
    if (ev.button === 0) {
      this.mainTabContentClicking = ev.clientX
    }
  }
  handleMainTabContentMouseUp(ev) {
    const props = this.props
    if (
      this.mainTabContentClicking === ev.clientX &&
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
  render() {
    const props = this.props
    const tabLinkList = []
    const tabMenuItemList = []
    const tabContentList = []
    let frontTab = ''
    let lastFrontTab = ''
    let hasSelectedTab = false
    const isIE =
      typeof navigator !== 'undefined'
        ? string(navigator.userAgent)
            .toLowerCase()
            .match(/(msie|trident)/)
        : false
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
        tabLinkList.push(
          <DndableSafe
            key={'span_' + key}
            ref={key}
            uiData={props.uiData}
            className={
              'brMainTabLinkSpan' +
              (tabLinkList.length ? '' : ' brFirst') +
              (props.uiData.blinkingTabs[key] ? ' brBlinking' : '') +
              (props.uiData.backgroundTabs[key] &&
              props.uiData.backgroundTabs[key].discarded
                ? ' brDiscarded'
                : '')
            }
            dragSourceInfo={{
              dragSourceInfoType: 'mainTabLinkSpan',
              dragSourceInfoCode: dndInfoCode,
            }}
            onCheckCanDrop={ev =>
              ev.dragSourceInfo &&
              ev.dragSourceInfo.dragSourceInfoType === 'mainTabLinkSpan'
            }
            onDrop={props.uiData.fire.bind(
              props.uiData,
              'mainTabsDndable_onDrop',
              {
                dropTargetInfoType: 'mainTabLinkSpan',
                dropTargetInfoCode: dndInfoCode,
              },
            )}
          >
            <TabLink
              key={key}
              to={key}
              style={
                bgColorTable[key] ? { backgroundColor: bgColorTable[key] } : {}
              }
            >
              <StatusIcon status={status} degree={degree} />
              <span
                className='brTabLinkTitle'
                title={tabTitleTitle}
                onContextMenu={this.handleMainTabLinkSpanContextMenu.bind(
                  this,
                  panel.panelType,
                  panel.panelCode,
                )}
              >
                {tabTitle || '\u2002'}
              </span>
              <ButtonIconic
                className='brTabLinkHideButton br_bi_icon_cancel_svg'
                title={uawMsgs.LBL_TAB_LINK_HIDE_BUTTON_TOOLTIP}
                onClick={props.uiData.fire.bind(
                  props.uiData,
                  'tabLinkHideButton_onClick',
                  panel.panelType,
                  panel.panelCode,
                )}
              ></ButtonIconic>
            </TabLink>
          </DndableSafe>,
        )
        tabMenuItemList.push(
          <MenuItem
            key={key}
            className={
              'brMainTabMenuItem' +
              (props.uiData.blinkingTabs[key] ? ' brBlinking' : '') +
              (key === props.uiData.currentSelectedTab ? ' brSelected' : '')
            }
            onClick={props.uiData.fire.bind(
              props.uiData,
              'tabMenuItem_onClick',
              panel.panelType,
              panel.panelCode,
            )}
          >
            <StatusIcon status={status} degree={degree} />
            <span className='brMainTabMenuItemTitle'>
              {tabTitle || '\u2002'}
            </span>
          </MenuItem>,
        )
        tabContentList.push(
          <TabContent key={key} for={key}>
            <PanelArea
              uiData={props.uiData}
              panelType={panel.panelType}
              panelCode={panel.panelCode}
            />
          </TabContent>,
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
    return (
      <Tabs
        ref='mainTabs'
        className={
          'brMainTabs' +
          (hasSelectedTab ? ' brSelected' : '') +
          (isIE ? ' brInternetExplorer' : '')
        }
        handleSelect={props.uiData.fire.bind(
          props.uiData,
          'mainArea_handleSelect',
        )}
        selectedTab={this.currentFrontTab}
      >
        <div ref='mainTabLinks' className='brMainTabLinks'>
          {tabLinkList}
        </div>
        <div
          className={
            'brMainTabMenu' +
            (this.state.showsTabMenu
              ? ' br_bi_icon_triangle_down_svg'
              : ' brHidden') +
            (this.state.blinksTabMenu ? ' brBlinking' : '')
          }
          onClick={
            this.state.showsTabMenu
              ? this.handleMainTabMenuClick.bind(this)
              : () => {}
          }
        ></div>
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
        <div
          className='brMainTabContent'
          style={
            hasSelectedTab && bgColorTable[frontTab]
              ? { backgroundColor: bgColorTable[frontTab] }
              : {}
          }
          onMouseDown={this.handleMainTabContentMouseDown.bind(this)}
          onMouseUp={this.handleMainTabContentMouseUp.bind(this)}
        >
          {tabContentList}
        </div>
        <MenuBalloonDialog
          showing={
            props.uiData.showingDialogVersion ===
            this.state.tabMenuShowingDialogVersion
          }
          className='brMainTabMenuBalloonDialog'
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
            onClick={props.uiData.fire.bind(
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
            onClick={props.uiData.fire.bind(
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
            onClick={props.uiData.fire.bind(
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
      </Tabs>
    )
  }
}
