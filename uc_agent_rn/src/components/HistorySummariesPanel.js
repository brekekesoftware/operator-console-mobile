import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import ButtonIconic from './ButtonIconic.js'
import DropDownMenu from './DropDownMenu.js'
import HistoryDetailArea from './HistoryDetailArea.js'
import MenuBalloonDialog from './MenuBalloonDialog.js'
import MenuItem from './MenuItem.js'
import { formatMessageDateTime } from '../utilities/strings.js'
import '../utilities/disableamd.js'
import DatePicker from 'react-datepicker'
import '../utilities/restoreamd.js'
import 'moment/locale/ja'
import 'moment/locale/zh-cn'
import moment from 'moment'
moment.locale('en')
uawMsgs.registerMoment(moment)

/**
 * HistorySummariesPanel
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.uiData.showingDialog_update
 * props.uiData.historySummariesPanelOpenDetailButton_onClick
 * props.uiData.historySummariesPanelContinuationButton_onClick
 * props.panelType
 * props.panelCode
 * props.withHeader
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      areaHeight: 0,
      showingReplyDialogVersion: null,
      showingReplyDialogSearchResultId: null,
    }
  }
  componentDidUpdate() {
    const props = this.props
    const historySummariesArea = ReactDOM.findDOMNode(
      this.refs['historySummariesArea'],
    )
    if (
      historySummariesArea &&
      this.state.areaHeight !== historySummariesArea.offsetHeight
    ) {
      this.setState({ areaHeight: historySummariesArea.offsetHeight })
      return
    }
    this.checkAndSearchMore()
  }
  handleHistorySummariesAreaScroll(ev) {
    const props = this.props
    this.checkAndSearchMore()
  }
  handleHistorySummaryExpandButtonClick(searchResultId, ev) {
    const props = this.props
    props.uiData.ucUiAction.expandSearchResult({
      chatType: props.panelType,
      chatCode: props.panelCode,
      searchResultIds: [searchResultId],
    })
  }
  handleHistoryReplyWebchatButtonClick(searchResultId, ev) {
    const props = this.props
    if (
      props.uiData.showingDialogVersion !==
        this.state.showingReplyDialogVersion ||
      searchResultId !== this.state.showingReplyDialogSearchResultId
    ) {
      this.setState({
        showingReplyDialogVersion: ++props.uiData.showingDialogVersion,
        showingReplyDialogSearchResultId: searchResultId,
      })
      ev.stopPropagation()
      props.uiData.fire('showingDialog_update')
    }
  }
  handleSearchConditionsDatePickerChange(isEnd, moment) {
    const props = this.props
    const searchConditions =
      props.uiData.ucUiStore.getSearchConditions({
        chatType: props.panelType,
        chatCode: props.panelCode,
      }) || []
    if (
      !searchConditions.some(condition => {
        if (condition.conditionKey === '_datetime') {
          const startEnd = string(condition.conditionValue).split('-')
          if (!isEnd) {
            startEnd[0] = string(moment && moment.startOf('day').valueOf())
            startEnd[1] = string(startEnd[1])
          } else {
            startEnd[0] = string(startEnd[0])
            startEnd[1] = string(moment && moment.endOf('day').valueOf())
          }
          condition.conditionValue = startEnd.join('-')
          return true
        } else {
          return false
        }
      })
    ) {
      searchConditions.push({
        conditionKey: '_datetime',
        conditionValue: isEnd
          ? '-' + string(moment && moment.endOf('day').valueOf())
          : string(moment && moment.startOf('day').valueOf()) + '-',
      })
    }
    props.uiData.ucUiAction.setSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
      searchConditions: searchConditions,
    })
    props.uiData.ucUiAction.doSearch({
      chatType: props.panelType,
      chatCode: props.panelCode,
      emphasize: true,
      queueing: true,
    })
  }
  handleSearchConditionsWebchatItemClick(index, ev) {
    const props = this.props
    const searchConditions =
      props.uiData.ucUiStore.getSearchConditions({
        chatType: props.panelType,
        chatCode: props.panelCode,
      }) || []
    props.uiData.ucUiAction.setSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
      searchConditions: searchConditions
        .filter(
          condition =>
            condition.conditionKey !== '_onlyMe' &&
            condition.conditionKey !== '_chatType',
        )
        .concat(
          index === 1
            ? { conditionKey: '_chatType', conditionValue: 'webchat' }
            : { conditionKey: '_onlyMe', conditionValue: '2' },
        ),
    })
    props.uiData.ucUiAction.doSearch({
      chatType: props.panelType,
      chatCode: props.panelCode,
      emphasize: true,
      queueing: true,
    })
  }
  checkAndSearchMore() {
    const props = this.props
    const historySummariesArea = ReactDOM.findDOMNode(
      this.refs['historySummariesArea'],
    )
    const historyProgress = ReactDOM.findDOMNode(this.refs['historyProgress'])
    if (
      historySummariesArea &&
      historyProgress &&
      historyProgress.offsetHeight > 0 &&
      historySummariesArea.scrollTop >
        historySummariesArea.scrollHeight -
          historySummariesArea.offsetHeight -
          historyProgress.offsetHeight
    ) {
      const searchWorkData =
        props.uiData.ucUiStore.getSearchWorkData({
          chatType: props.panelType,
          chatCode: props.panelCode,
        }) || {}
      if (searchWorkData.hasMore && !searchWorkData.searching) {
        props.uiData.ucUiAction.doSearch({
          chatType: props.panelType,
          chatCode: props.panelCode,
          searchMore: true,
          emphasize: true,
        })
      }
    }
  }
  render() {
    const props = this.props
    const configProperties = props.uiData.ucUiStore.getConfigProperties()
    const searchConditions =
      props.uiData.ucUiStore.getSearchConditions({
        chatType: props.panelType,
        chatCode: props.panelCode,
      }) || []
    const searchResults =
      props.uiData.ucUiStore.getSearchResults({
        chatType: props.panelType,
        chatCode: props.panelCode,
      }) || []
    const searchWorkData =
      props.uiData.ucUiStore.getSearchWorkData({
        chatType: props.panelType,
        chatCode: props.panelCode,
      }) || {}
    let profile_image_url = ''
    // results
    const entries = searchResults.map(searchResult => {
      const replyOptions = []
      const replyTypes = string(searchResult.replyTypes).split(',')
      if ('TRUE' === string(searchResult.webchatContinuable).toUpperCase()) {
        replyOptions.push({
          className: 'brManualContinuation',
          event: props.uiData.fire.bind(
            props.uiData,
            'historySummariesPanelContinuationButton_onClick',
            props.panelType,
            props.panelCode,
            searchResult.searchResultId,
            '',
          ),
          label: uawMsgs.LBL_HISTORY_REPLY_MANUAL_CONTINUATION_MENU,
        })
      }
      if (
        (
          (configProperties.optional_config &&
            configProperties.optional_config.awsl) ||
          []
        ).some(aws => aws.id === searchResult.webchatServiceId && aws.senders)
      ) {
        replyTypes.forEach((replyType, i) => {
          if (replyType) {
            replyOptions.push({
              className: 'brContinuation',
              event: props.uiData.fire.bind(
                props.uiData,
                'historySummariesPanelContinuationButton_onClick',
                props.panelType,
                props.panelCode,
                searchResult.searchResultId,
                replyType,
              ),
              label: replyType,
            })
          }
        })
      }
      return (
        <div
          key={string(searchResult.searchResultId)}
          className='brHistorySummaryEntry'
        >
          <div className='brHistoryOpenDetailArea'>
            <ButtonIconic
              className='brHistoryOpenDetailButton br_bi_icon_new_window_svg'
              title={uawMsgs.LBL_HISTORY_OPEN_DETAIL_BUTTON_TOOLTIP}
              onClick={props.uiData.fire.bind(
                props.uiData,
                'historySummariesPanelOpenDetailButton_onClick',
                props.panelType,
                props.panelCode,
                searchResult.searchResultId,
                searchResult._topic && searchResult._topic.peer,
                searchResult.chatType === 'webchat'
                  ? string(searchResult.customerName)
                  : searchResult.chatType === 'userchatconf'
                    ? string(
                        searchResult._topic &&
                          searchResult._topic.peer &&
                          searchResult._topic.peer.subject,
                      )
                    : string(
                        searchResult._topic &&
                          searchResult._topic.peer &&
                          (searchResult._topic.peer.user_name ||
                            searchResult._topic.peer.user_id),
                      ),
              )}
            />
            <ButtonIconic
              className='brHistoryReplyWebchatButton br_bi_icon_reply_svg'
              title={uawMsgs.LBL_HISTORY_REPLY_BUTTON_TOOLTIP}
              hidden={!replyOptions.length}
              onClick={
                replyOptions.length === 1
                  ? replyOptions[0].event
                  : this.handleHistoryReplyWebchatButtonClick.bind(
                      this,
                      searchResult.searchResultId,
                    )
              }
            />
            <MenuBalloonDialog
              className='brHistoryReplyWebchatBalloonDialog'
              showing={
                props.uiData.showingDialogVersion ===
                  this.state.showingReplyDialogVersion &&
                searchResult.searchResultId ===
                  this.state.showingReplyDialogSearchResultId
              }
            >
              {replyOptions.map((s, i) => (
                <MenuItem
                  key={i}
                  className={'brHistoryReplyWebchatMenuItem ' + s.className}
                  onClick={s.event}
                >
                  {s.label}
                </MenuItem>
              ))}
            </MenuBalloonDialog>
          </div>
          <div
            className={
              'brHistorySummary' + (searchResult._expanded ? ' brExpanded' : '')
            }
            onClick={
              searchResult._expanded
                ? () => {}
                : this.handleHistorySummaryExpandButtonClick.bind(
                    this,
                    searchResult.searchResultId,
                  )
            }
          >
            <div className='brHistorySummaryMarker' />
            {searchResult.chatType === 'webchat' ? (
              ((profile_image_url = string(
                searchResult._topic &&
                  searchResult._topic.tags &&
                  searchResult._topic.tags
                    .filter(
                      tag =>
                        tag.tag_type === '_webchat' &&
                        tag.tag_key === 'myProfileImageUrl',
                    )
                    .sort((tag1, tag2) => tag1.tstamp - tag2.tstamp)
                    .map(tag => tag.tag_value)
                    .pop(),
              )) &&
                false) || (
                <div
                  className={
                    'brHistorySummaryImage' +
                    (profile_image_url ? '' : ' brWithIcon') +
                    (profile_image_url &&
                    string(profile_image_url).indexOf(
                      Constants.PROFILE_IMAGE_URL_DOWNLOAD,
                    ) === -1
                      ? ' brMyProfileImageUrl'
                      : '')
                  }
                  title={
                    profile_image_url
                      ? string(searchResult.customerName)
                      : uawMsgs.LBL_HISTORY_TYPE_WEBCHAT
                  }
                  style={
                    profile_image_url
                      ? { backgroundImage: 'url(' + profile_image_url + ')' }
                      : {}
                  }
                >
                  <div className='brIcon br_bi_icon_internet_svg' />
                </div>
              )
            ) : searchResult.chatType === 'userchatconf' ? (
              <div
                className={'brHistorySummaryImage brWithIcon'}
                title={uawMsgs.LBL_HISTORY_TYPE_CONFERENCE}
              >
                <div className='brIcon br_bi_icon_conference_foreground_selected_svg' />
              </div>
            ) : (
              ((profile_image_url = string(
                (
                  props.uiData.ucUiStore.getBuddyUserForUi(
                    searchResult._topic && searchResult._topic.peer,
                  ) || {}
                ).profile_image_url,
              )) &&
                false) || (
                <div
                  className={
                    'brHistorySummaryImage' +
                    (profile_image_url ? '' : ' brNoImage') +
                    (profile_image_url &&
                    string(profile_image_url).indexOf(
                      Constants.PROFILE_IMAGE_URL_DOWNLOAD,
                    ) === -1
                      ? ' brMyProfileImageUrl'
                      : '')
                  }
                  title={string(
                    searchResult._topic &&
                      searchResult._topic.peer &&
                      (searchResult._topic.peer.user_name ||
                        searchResult._topic.peer.user_id),
                  )}
                  style={
                    profile_image_url
                      ? { backgroundImage: 'url(' + profile_image_url + ')' }
                      : {}
                  }
                />
              )
            )}
            <div className='brHistorySummaryName'>
              {searchResult.chatType === 'webchat'
                ? string(searchResult.customerName)
                : searchResult.chatType === 'userchatconf'
                  ? string(
                      searchResult._topic &&
                        searchResult._topic.peer &&
                        searchResult._topic.peer.subject,
                    )
                  : string(
                      searchResult._topic &&
                        searchResult._topic.peer &&
                        (searchResult._topic.peer.user_name ||
                          searchResult._topic.peer.user_id),
                    )}
            </div>
            <div className='brHistorySummaryProfinfo'>
              {string(searchResult._profinfoFormatted)}
            </div>
            <div className='brHistorySummaryTime'>
              {searchResult.customerStartTime
                ? formatMessageDateTime(searchResult.customerStartTime)
                : ''}
            </div>
            <div className='brHistorySummarySenderName'>
              {(searchResult.chatType === 'webchat' &&
                searchResult._topic &&
                searchResult.customerTenant ===
                  searchResult._topic.content_sender_tenant &&
                searchResult.customerUserId ===
                  searchResult._topic.content_sender_user_id) ||
              (searchResult.chatType === '' &&
                searchResult._topic &&
                searchResult._topic.peer &&
                searchResult._topic.peer.tenant ===
                  searchResult._topic.content_sender_tenant &&
                searchResult._topic.peer.user_id ===
                  searchResult._topic.content_sender_user_id)
                ? ''
                : string(
                    (
                      (searchResult._topic &&
                        props.uiData.ucUiStore.getBuddyUserForUi({
                          tenant: searchResult._topic.content_sender_tenant,
                          user_id: searchResult._topic.content_sender_user_id,
                        })) ||
                      {}
                    ).name,
                  )}
            </div>
            <div className='brHistorySummarySummary'>
              <span
                dangerouslySetInnerHTML={{
                  __html: string(searchResult.summary)
                    .replace(
                      /brFileRequest">/g,
                      'brFileRequest ' +
                        ((
                          (searchResult._topic &&
                            props.uiData.ucUiStore.getBuddyUserForUi({
                              tenant: searchResult._topic.content_sender_tenant,
                              user_id:
                                searchResult._topic.content_sender_user_id,
                            })) ||
                          {}
                        ).isMe
                          ? 'br_bi_icon_upload_svg'
                          : 'br_bi_icon_download_svg') +
                        '" title="' +
                        uawMsgs.LBL_HISTORY_SUMMARY_FILE +
                        '">',
                    )
                    .replace(
                      /brCallResult">/g,
                      'brCallResult br_bi_icon_phone_svg" title="' +
                        uawMsgs.LBL_HISTORY_SUMMARY_CALL +
                        '">',
                    )
                    .replace(
                      /brObject">/g,
                      'brObject br_bi_icon_job_svg" title="' +
                        uawMsgs.LBL_HISTORY_SUMMARY_OBJECT +
                        '">',
                    ),
                }}
              />
            </div>
            <HistoryDetailArea
              uiData={props.uiData}
              panelType='SEARCHRESULTDETAIL'
              panelCode={searchResult.searchResultId}
            />
            <div className='brHistorySummaryExpandDummy br_bi_icon_chevron_down_svg' />
            <ButtonIconic
              className='brHistorySummaryExpandButton br_bi_icon_chevron_up_svg'
              onClick={this.handleHistorySummaryExpandButtonClick.bind(
                this,
                searchResult.searchResultId,
              )}
            />
          </div>
        </div>
      )
    })
    // conditions
    const conditions = { _datetime: {}, _onlyMe: {}, _chatType: {} }
    searchConditions.forEach(
      condition => (conditions[condition.conditionKey] = condition),
    )
    const startEnd = string(conditions._datetime.conditionValue).split('-')
    const startMoment = startEnd[0] ? moment(int(startEnd[0])) : null
    const endMoment = startEnd[1] ? moment(int(startEnd[1])) : null
    return (
      <div
        className={
          'brHistorySummariesPanel' + (props.withHeader ? ' brWithHeader' : '')
        }
      >
        <div
          ref='historySummariesArea'
          className={
            'brHistorySummariesArea' +
            (props.uiData.currentSelectedTab ===
            props.panelType + '_' + props.panelCode
              ? ' brSelected'
              : '') +
            (searchResults.some(searchResult => searchResult._expanded)
              ? ''
              : ' brDetailClosed') +
            (entries.length === 0 ? ' brNoEntries' : '') +
            (searchWorkData.searching ? ' brSearching' : '') +
            (searchWorkData.hasMore ? ' brHasMore' : '') +
            (searchWorkData.errorType ? ' brError' : '')
          }
          onScroll={this.handleHistorySummariesAreaScroll.bind(this)}
        >
          <div
            className='brHistorySummariesAreaMarker'
            style={{ height: this.state.areaHeight }}
          />
          <div className='brHistorySummariesList'>
            {entries}
            <div className='brHistoryNoResults'>
              {uawMsgs.LBL_HISTORY_NO_RESULTS}
            </div>
            <div className='brHistoryError'>
              {(uawMsgs[searchWorkData.errorType] || searchWorkData.errorType) +
                (searchWorkData.errorDetail
                  ? ' (' + searchWorkData.errorDetail + ')'
                  : '')}
            </div>
            <div ref='historyProgress' className='brHistoryProgress'>
              <div className='brHistoryProgressInner' />
            </div>
          </div>
        </div>
        <div className='brHistorySummariesHeader'>
          <span className='brHistorySummariesHeaderDateLabel'>
            {uawMsgs.LBL_HISTORY_DATE}
          </span>
          <DatePicker
            className='brSearchConditionsDatePicker brSearchConditionsStartDatePicker'
            selected={startMoment}
            isClearable={true}
            showMonthDropdown
            showYearDropdown
            onChange={this.handleSearchConditionsDatePickerChange.bind(
              this,
              false,
            )}
          />
          <span className='brHistorySummariesHeaderDateSeparator'>-</span>
          <DatePicker
            className='brSearchConditionsDatePicker brSearchConditionsEndDatePicker'
            selected={endMoment}
            isClearable={true}
            showMonthDropdown
            showYearDropdown
            onChange={this.handleSearchConditionsDatePickerChange.bind(
              this,
              true,
            )}
          />
          <DropDownMenu
            uiData={props.uiData}
            className='brSearchConditionsWebchatMenu'
            text={
              string(conditions._onlyMe.conditionValue) === '2'
                ? uawMsgs.LBL_HISTORY_YOUR_CHATS
                : string(conditions._chatType.conditionValue) === 'webchat'
                  ? uawMsgs.LBL_HISTORY_WEBCHATS
                  : ''
            }
          >
            <MenuItem
              className='brSearchConditionsWebchatItem'
              dropDown={true}
              onClick={this.handleSearchConditionsWebchatItemClick.bind(
                this,
                0,
              )}
            >
              {uawMsgs.LBL_HISTORY_YOUR_CHATS}
            </MenuItem>
            <MenuItem
              className='brSearchConditionsWebchatItem'
              dropDown={true}
              onClick={this.handleSearchConditionsWebchatItemClick.bind(
                this,
                1,
              )}
            >
              {uawMsgs.LBL_HISTORY_WEBCHATS}
            </MenuItem>
          </DropDownMenu>
        </div>
      </div>
    )
  }
}
