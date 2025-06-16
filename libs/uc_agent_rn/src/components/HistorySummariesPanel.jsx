import React from 'react'
import uawMsgs from '../utilities/uawmsgs'
import Constants from '../utilities/constants'
import { int, string } from '../utilities/strings'
import ButtonIconic from './ButtonIconic'
import DropDownMenu from './DropDownMenu'
import HistoryDetailArea from './HistoryDetailArea'
import MenuBalloonDialog from './MenuBalloonDialog'
import MenuItem from './MenuItem'
import NameEmbeddedSpan from './NameEmbeddedSpan'
import { formatMessageDateTime } from '../utilities/strings'
import moment from 'moment'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  Animated,
  Easing,
} from 'react-native'
import { DatePicker as DateTimePicker } from '../components/DatePicker'
import NewWindowIcon from '../icons/NewWindowIcon'
import ReplyIcon from '../icons/ReplyIcon'
import InternetIcon from '../icons/InternetIcon'
import ConferenceIcon from '../icons/ConferenceForegroundSelectedIcon'
import UserIcon from '../icons/UserIcon'
import ChevronUpIcon from '../icons/ChevronUpIcon'
import ChevronDownIcon from '../icons/ChevronDownIcon'
import UploadIcon from '../icons/UploadIcon'
import DownloadIcon from '../icons/DownloadIcon'
import PhoneIcon from '../icons/PhoneIcon'
import JobIcon from '../icons/JobIcon'
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
    this.historySummariesAreaRef = React.createRef()
    this.historyProgressRef = React.createRef()
    this.progressAnimation = new Animated.Value(0)
  }

  // componentDidUpdate() {
  //   if (this.historySummariesAreaRef.current) {
  //     this.historySummariesAreaRef.current.measure((x, y, width, height) => {
  //       if (this.state.areaHeight !== height) {
  //         this.setState({ areaHeight: height })
  //         return
  //       }
  //       this.checkAndSearchMore()
  //     })
  //   }
  // }

  handleContentSizeChange = (contentWidth, height) => {
    this.setState({ areaHeight: height })
  }

  handleHistorySummariesAreaScroll = () => {
    this.checkAndSearchMore()
  }

  handleHistorySummaryExpandButtonClick = searchResultId => {
    this.props.uiData.ucUiAction.expandSearchResult({
      chatType: this.props.panelType,
      chatCode: this.props.panelCode,
      searchResultIds: [searchResultId],
    })
  }

  handleHistoryReplyWebchatButtonClick = (searchResultId, ev) => {
    if (
      this.props.uiData.showingDialogVersion !==
        this.state.showingReplyDialogVersion ||
      searchResultId !== this.state.showingReplyDialogSearchResultId
    ) {
      this.setState({
        showingReplyDialogVersion: ++this.props.uiData.showingDialogVersion,
        showingReplyDialogSearchResultId: searchResultId,
      })
      this.props.uiData.fire('showingDialog_update')
    }
  }

  handleSearchConditionsDatePickerChange = (isEnd, moment) => {
    const searchConditions =
      this.props.uiData.ucUiStore.getSearchConditions({
        chatType: this.props.panelType,
        chatCode: this.props.panelCode,
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
        }
        return false
      })
    ) {
      searchConditions.push({
        conditionKey: '_datetime',
        conditionValue: isEnd
          ? '-' + string(moment && moment.endOf('day').valueOf())
          : string(moment && moment.startOf('day').valueOf()) + '-',
      })
    }

    this.props.uiData.ucUiAction.setSearchConditions({
      chatType: this.props.panelType,
      chatCode: this.props.panelCode,
      searchConditions: searchConditions,
    })

    this.props.uiData.ucUiAction.doSearch({
      chatType: this.props.panelType,
      chatCode: this.props.panelCode,
      emphasize: true,
      queueing: true,
    })
  }

  handleSearchConditionsWebchatItemClick = index => {
    const searchConditions =
      this.props.uiData.ucUiStore.getSearchConditions({
        chatType: this.props.panelType,
        chatCode: this.props.panelCode,
      }) || []

    this.props.uiData.ucUiAction.setSearchConditions({
      chatType: this.props.panelType,
      chatCode: this.props.panelCode,
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

    this.props.uiData.ucUiAction.doSearch({
      chatType: this.props.panelType,
      chatCode: this.props.panelCode,
      emphasize: true,
      queueing: true,
    })
  }

  checkAndSearchMore = () => {
    if (
      this.historySummariesAreaRef.current &&
      this.historyProgressRef.current
    ) {
      this.historySummariesAreaRef.current.measure(
        (x, y, width, height, pageX, pageY) => {
          this.historyProgressRef.current.measure((x2, y2, width2, height2) => {
            const scrollInfo = {
              scrollTop: pageY,
              scrollHeight: height,
              offsetHeight: height2,
            }

            if (
              scrollInfo.scrollTop >
              scrollInfo.scrollHeight - scrollInfo.offsetHeight - height2
            ) {
              const searchWorkData =
                this.props.uiData.ucUiStore.getSearchWorkData({
                  chatType: this.props.panelType,
                  chatCode: this.props.panelCode,
                }) || {}

              if (searchWorkData.hasMore && !searchWorkData.searching) {
                this.props.uiData.ucUiAction.doSearch({
                  chatType: this.props.panelType,
                  chatCode: this.props.panelCode,
                  searchMore: true,
                  emphasize: true,
                })
              }
            }
          })
        },
      )
    }
  }

  startProgressAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.progressAnimation, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  convertSummary = (summary, isMe) => {
    const parts = summary.split(/(<span[^>]*>.*?<\/span>)/g)

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {parts.map((part, index) => {
          if (!part) return null
          if (!part.trim()) return null
          console.log('#Duy Phan console part', part)

          if (part.startsWith('<span')) {
            const content = part.replace(/<span[^>]*>|<\/span>/g, '')

            const isEmphasized = /class="[^"]*brEmphasized[^"]*"/.test(part)
            const isFileRequest = /class="[^"]*brFileRequest[^"]*"/.test(part)
            const isCallResult = /class="[^"]*brCallResult[^"]*"/.test(part)
            const isObject = /class="[^"]*brObject[^"]*"/.test(part)

            if (isEmphasized) {
              return (
                <Text key={index} style={styles.brEmphasized}>
                  {content}
                </Text>
              )
            }
            if (isFileRequest) {
              return (
                <>
                  {isMe ? <UploadIcon /> : <DownloadIcon />}
                  <Text>{content}</Text>
                </>
              )
            }
            if (isCallResult) {
              return (
                <>
                  <PhoneIcon />
                  <Text>{content}</Text>
                </>
              )
            }
            if (isObject) {
              return (
                <>
                  <JobIcon />
                  <Text>{content}</Text>
                </>
              )
            }
          } else {
            return <Text>{part}</Text>
          }
        })}
      </View>
    )
  }

  render() {
    const { props } = this
    console.log('#Duy Phan console areaHeight', this.state.areaHeight)
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
        <View
          key={string(searchResult.searchResultId)}
          style={styles.brHistorySummaryEntry}
        >
          <View style={styles.brHistoryOpenDetailArea}>
            <ButtonIconic
              style={styles.brHistoryOpenDetailButton}
              iconSource={<NewWindowIcon />}
              accessibilityLabel={
                uawMsgs.LBL_HISTORY_OPEN_DETAIL_BUTTON_TOOLTIP
              }
              onPress={props.uiData.fire.bind(
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

            {replyOptions.length > 0 && (
              <ButtonIconic
                style={styles.brHistoryReplyWebchatButton}
                iconSource={<ReplyIcon />}
                accessibilityLabel={uawMsgs.LBL_HISTORY_REPLY_BUTTON_TOOLTIP}
                onPress={
                  replyOptions.length === 1
                    ? replyOptions[0].event
                    : () =>
                        this.handleHistoryReplyWebchatButtonClick(
                          searchResult.searchResultId,
                        )
                }
              />
            )}

            <MenuBalloonDialog
              style={styles.brHistoryReplyWebchatBalloonDialog}
              showing={
                props.uiData.showingDialogVersion ===
                  this.state.showingReplyDialogVersion &&
                searchResult.searchResultId ===
                  this.state.showingReplyDialogSearchResultId
              }
            >
              {replyOptions.map((option, i) => (
                <MenuItem
                  key={i}
                  style={[
                    styles.brHistoryReplyWebchatMenuItem,
                    styles[option.className],
                  ]}
                  accessibilityLabel={option.label}
                  onPress={option.event}
                >
                  <Text>{option.label}</Text>
                </MenuItem>
              ))}
            </MenuBalloonDialog>
          </View>
          <View
            style={[
              styles.brHistorySummary,
              searchResult._expanded && styles.brExpanded,
            ]}
            // onClick={
            //   searchResult._expanded
            //     ? () => {}
            //     : this.handleHistorySummaryExpandButtonClick.bind(
            //         this,
            //         searchResult.searchResultId,
            //       )
            // }
          >
            <View
              style={[
                {
                  flexDirection: 'row',
                  position: 'relative',
                },
              ]}
            >
              <View style={{ alignItems: 'flex-start', gap: 3 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.brHistorySummaryName}>
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
                  </Text>
                  <Text style={styles.brHistorySummaryTime}>
                    {searchResult.customerStartTime
                      ? formatMessageDateTime(searchResult.customerStartTime)
                      : ''}
                  </Text>
                </View>

                {searchResult._profinfoFormatted ? (
                  <Text style={styles.brHistorySummaryProfinfo}>
                    {string(searchResult._profinfoFormatted)}
                  </Text>
                ) : null}

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
                    searchResult._topic.content_sender_user_id) ? null : (
                  <Text>
                    {string(
                      (
                        (searchResult._topic &&
                          props.uiData.ucUiStore.getBuddyUserForUi({
                            tenant: searchResult._topic.content_sender_tenant,
                            user_id: searchResult._topic.content_sender_user_id,
                          })) ||
                        {}
                      ).name,
                    )}
                  </Text>
                )}

                <Text style={styles.brHistorySummarySummary}>
                  {/* {string(searchResult.summary)
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
                    )} */}
                  {this.convertSummary(
                    searchResult.summary,
                    (
                      (searchResult._topic &&
                        props.uiData.ucUiStore.getBuddyUserForUi({
                          tenant: searchResult._topic.content_sender_tenant,
                          user_id: searchResult._topic.content_sender_user_id,
                        })) ||
                      {}
                    ).isMe,
                  )}
                </Text>
              </View>

              {/* <View style={styles.brHistorySummaryExpandDummy} /> */}
            </View>
            {searchResult._expanded && (
              <View style={styles.brHistorySummaryMarker} />
            )}

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
                <View
                  style={[
                    styles.brHistorySummaryImage,
                    profile_image_url
                      ? string(profile_image_url).indexOf(
                          Constants.PROFILE_IMAGE_URL_DOWNLOAD,
                        ) === -1
                        ? styles.brMyProfileImageUrl
                        : {}
                      : styles.brWithIcon,
                  ]}
                >
                  <View style={styles.brIcon}>
                    <InternetIcon />
                  </View>
                </View>
              )
            ) : searchResult.chatType === 'userchatconf' ? (
              <View style={styles.brHistorySummaryImage}>
                <View style={styles.brIcon}>
                  <ConferenceIcon />
                </View>
              </View>
            ) : (
              ((profile_image_url = string(
                (
                  props.uiData.ucUiStore.getBuddyUserForUi(
                    searchResult._topic && searchResult._topic.peer,
                  ) || {}
                ).profile_image_url,
              )) &&
                false) || (
                <View
                  style={[
                    styles.brHistorySummaryImage,
                    profile_image_url
                      ? string(profile_image_url).indexOf(
                          Constants.PROFILE_IMAGE_URL_DOWNLOAD,
                        ) === -1
                        ? styles.brMyProfileImageUrl
                        : {}
                      : styles.brNoImage,
                  ]}
                >
                  <Image
                    source={{ uri: profile_image_url }}
                    style={styles.brHistorySummaryImage}
                  />
                </View>
              )
            )}
            <ButtonIconic
              style={styles.brHistorySummaryExpandButton}
              iconSource={
                searchResult._expanded ? <ChevronUpIcon /> : <ChevronDownIcon />
              }
              accessibilityLabel={uawMsgs.LBL_HISTORY_SUMMARY_EXPAND_BUTTON}
              onPress={this.handleHistorySummaryExpandButtonClick.bind(
                this,
                searchResult.searchResultId,
              )}
            />

            {searchResult._expanded && (
              <View style={{ flex: 1 }}>
                <HistoryDetailArea
                  uiData={props.uiData}
                  hasMore={searchWorkData.hasMore}
                  panelType='SEARCHRESULTDETAIL'
                  panelCode={searchResult.searchResultId}
                />
              </View>
            )}
          </View>
        </View>
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
    console.log('#Duy Phan console count expands', entries.length)
    return (
      <View
        style={[
          styles.brHistorySummariesPanel,
          props.withHeader && styles.brWithHeader,
        ]}
      >
        <ScrollView
          ref={this.historySummariesAreaRef}
          style={[
            styles.brHistorySummariesArea,
            props.uiData.currentSelectedTab ===
              props.panelType + '_' + props.panelCode && styles.brSelected,
            searchResults.some(result => result._expanded) &&
              styles.brDetailClosed,

            searchWorkData.searching && styles.brSearching,
            searchWorkData.hasMore && styles.brHasMore,
            searchWorkData.errorType && styles.brError,
          ]}
          contentContainerStyle={[entries.length === 0 && styles.brNoEntries]}
          onScroll={this.handleHistorySummariesAreaScroll}
          onContentSizeChange={this.handleContentSizeChange}
          nestedScrollEnabled
        >
          {entries.length > 0 && (
            <View
              style={[
                styles.brHistorySummariesAreaMarker,
                { height: this.state.areaHeight },
              ]}
            />
          )}

          <View style={styles.brHistorySummariesList}>
            {entries}

            {entries.length === 0 && (
              <Text style={styles.brHistoryNoResults}>
                {uawMsgs.LBL_HISTORY_NO_RESULTS}
              </Text>
            )}

            {searchWorkData.errorType && (
              <Text style={styles.brHistoryError}>
                {(uawMsgs[searchWorkData.errorType] ||
                  searchWorkData.errorType) +
                  (searchWorkData.errorDetail
                    ? ` (${searchWorkData.errorDetail})`
                    : '')}
              </Text>
            )}

            <View
              ref={this.historyProgressRef}
              style={styles.brHistoryProgress}
            >
              <Animated.View
                style={[
                  styles.brHistoryProgressInner,
                  {
                    transform: [
                      {
                        rotate: this.progressAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0deg', '360deg'],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          </View>
        </ScrollView>
        {props.withHeader && (
          <View style={styles.brHistorySummariesHeader}>
            <Text style={styles.brHistorySummariesHeaderDateLabel}>
              {uawMsgs.LBL_HISTORY_DATE}
            </Text>
            <CustomDatePicker
              style={[styles.brSearchConditionsDatePicker]}
              value={startMoment ? startMoment : null}
              onChange={date => {
                this.handleSearchConditionsDatePickerChange(false, date ?? null)
              }}
            />
            <View style={styles.brHistorySummariesHeaderDateSeparator}>
              <Text>-</Text>
            </View>
            <CustomDatePicker
              style={[styles.brSearchConditionsDatePicker]}
              value={endMoment ? endMoment : null}
              onChange={date => {
                this.handleSearchConditionsDatePickerChange(true, date ?? null)
              }}
            />
            <DropDownMenu
              uiData={props.uiData}
              style={styles.brSearchConditionsWebchatMenu}
              dialogStyle={{ minWidth: 160, left: 16, top: 32 }}
              dia
              text={
                string(conditions._onlyMe.conditionValue) === '2'
                  ? uawMsgs.LBL_HISTORY_YOUR_CHATS
                  : string(conditions._chatType.conditionValue) === 'webchat'
                    ? uawMsgs.LBL_HISTORY_WEBCHATS
                    : ''
              }
            >
              <MenuItem
                style={styles.brSearchConditionsWebchatItem}
                dropDown={true}
                onPress={this.handleSearchConditionsWebchatItemClick.bind(
                  this,
                  0,
                )}
              >
                <Text>{uawMsgs.LBL_HISTORY_YOUR_CHATS}</Text>
              </MenuItem>
              <MenuItem
                style={styles.brSearchConditionsWebchatItem}
                dropDown={true}
                onPress={this.handleSearchConditionsWebchatItemClick.bind(
                  this,
                  1,
                )}
              >
                <Text>{uawMsgs.LBL_HISTORY_WEBCHATS}</Text>
              </MenuItem>
            </DropDownMenu>
          </View>
        )}
      </View>
    )
  }
}

const CustomDatePicker = ({ value, onChange, style }) => {
  const [show, setShow] = React.useState(false)
  const displayDate = value ? moment(value).format('YYYY-MM-DD') : 'Select date'

  if (Platform.OS === 'web') {
    return (
      <DatePicker
        className='brSearchConditionsDatePicker brSearchConditionsStartDatePicker'
        selected={value?.toDate() ?? new Date()}
        style={style}
        // isClearable={true}
        showMonthDropdown
        showYearDropdown
        onChange={d => onChange(moment(d))}
      />
    )
  }

  return (
    <View style={style}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={styles.datePickerButton}
      >
        <Text style={styles.datePickerButtonText}>{displayDate}</Text>
      </TouchableOpacity>

      <DateTimePicker
        date={value ? value.toDate() : new Date()}
        open={show}
        mode='date'
        modal
        onConfirm={selectedDate => {
          setShow(false)
          onChange(moment(selectedDate))
        }}
        onCancel={() => setShow(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  brHistorySummariesPanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  brHistorySummariesArea: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    padding: 4,
    backgroundColor: '#F5F5F5',
  },

  brWithHeader: {
    paddingTop: 48,
  },

  brSelected: {
    backgroundColor: '#FFFFFF',
  },

  brDetailClosed: {
    backgroundColor: '#FFFFFF',
  },

  brHistorySummariesAreaMarker: {
    position: 'absolute',
    width: 40,
    borderRightWidth: 1,
    borderRightColor: '#F0F0F0',
    marginLeft: -4,
    marginTop: -4,
  },

  brHistorySummaryEntry: {
    position: 'relative',
  },

  brHistoryOpenDetailArea: {
    position: 'relative',
    zIndex: 1,
    height: 0,
  },

  brHistoryOpenDetailButton: {
    position: 'absolute',
    right: 48,
    width: 32,
    top: 8,
    height: 32,
  },

  brHistoryReplyWebchatButton: {
    position: 'absolute',
    right: 88,
    width: 32,
    top: 8,
    height: 32,
  },

  brHistoryReplyWebchatBalloonDialog: {
    position: 'absolute',
    right: 120,
    top: 8,
  },

  brHistorySummary: {
    position: 'relative',
    minHeight: 64,
    flexDirection: 'column',
    zIndex: 0,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 65,
    // backgroundColor: 'blue',
  },

  brExpanded: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },

  brHistorySummaryMarker: {
    position: 'absolute',
    left: -8,
    width: 37,
    top: -1,
    bottom: -1,
    borderRightWidth: 2,
    borderRightColor: '#40E0D0',
    backgroundColor: '#F5F5F5',
  },

  brHistorySummaryImage: {
    position: 'absolute',
    left: 4,
    top: 7,
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  brNoImage: {
    backgroundColor: '#F5F5F5',
  },

  brMyProfileImageUrl: {
    backgroundColor: 'transparent',
  },

  brWithIcon: {
    backgroundColor: '#E5E5E5',
  },

  brIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 4.79,
  },

  brHistorySummaryName: {
    fontSize: 13,
    fontWeight: '500',
    // lineHeight: 1.6 * 13,
    letterSpacing: 0.3,
  },

  brHistorySummaryProfinfo: {
    fontSize: 9,
    fontWeight: '400',
    // lineHeight: 1.6 * 9,
    letterSpacing: 1.3,
    paddingLeft: 26,
    color: '#666666',
  },

  brHistorySummaryTime: {
    fontSize: 9,
    fontWeight: '400',
    // lineHeight: 1.6 * 9,
    letterSpacing: 1.3,
    paddingLeft: 26,
    color: '#666666',
  },

  brHistorySummarySenderName: {
    fontSize: 13,
    fontWeight: '500',
    // lineHeight: 1.6 * 13,
    letterSpacing: 0.3,
  },

  brHistorySummarySummary: {
    fontSize: 13,
    fontWeight: '400',
    // lineHeight: 1.6 * 13,
    letterSpacing: 0.3,
    paddingVertical: 1,
  },

  brHistorySummariesHeader: {
    position: 'absolute',
    right: 0,
    width: '100%',
    top: -1,
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingRight: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    zIndex: 0,
  },

  brHistorySummariesHeaderDateLabel: {
    paddingRight: 16,
    fontSize: 16,
    fontWeight: '400',
    // lineHeight: 1.6 * 16,
    letterSpacing: 0.3,
  },

  brHistorySummariesHeaderDateSeparator: {
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 1.6 * 16,
    letterSpacing: 0.3,
  },

  brSearchConditionsDatePicker: {
    width: 120,
    height: 32,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 4,
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0.3,
    color: '#1A2421',
  },

  brSearchConditionsStartDatePicker: {
    right: 300,
  },

  brSearchConditionsEndDatePicker: {
    right: 50,
  },

  brSearchConditionsWebchatMenu: {
    width: 160,
    marginLeft: 16,
    // alignItems: 'flex-start',
  },

  brHistoryProgress: {
    height: 28,
    alignItems: 'center',
    display: 'none',
  },

  brHistoryProgressInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#40E0D0',
  },

  brEmphasized: {
    fontWeight: 'bold',
    color: '#40E0D0',
  },

  brHistoryDetailArea: {
    overflow: 'hidden',
    maxHeight: 0,
  },

  brHistoryDetailAreaExpanded: {
    maxHeight: '50%',
  },

  brNoEntries: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  brSearching: {
    opacity: 0.5,
  },

  brHasMore: {
    paddingBottom: 32,
  },

  brError: {
    backgroundColor: '#FFE4E1',
  },

  brHistorySummariesList: {
    padding: 8,
  },

  brHistoryNoResults: {
    textAlign: 'center',
    padding: 16,
    marginTop: 30,
    color: '#666666',
  },

  brHistoryError: {
    padding: 16,
    color: '#FF0000',
  },

  brManualContinuation: {
    backgroundColor: '#82C341', // @mantis color
  },

  brContinuation: {
    backgroundColor: '#4CAF50', // @green color
  },

  brHistorySummaryExpandDummy: {
    height: 32,
  },

  brHistorySummaryExpandButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 32,
    height: 32,
    // backgroundColor: '#82C341',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  brHistoryReplyWebchatMenuItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },

  datePickerButton: {
    height: 32,
    // paddingHorizontal: 8,
    // backgroundColor: '#FFFFFF',
    // borderWidth: 1,
    // borderColor: '#E5E5E5',
    // borderRadius: 4,
    justifyContent: 'center',
  },

  datePickerButtonText: {
    fontSize: 14,
    color: '#212121',
  },

  datePickerIOS: {
    height: 120,
    width: 320,
  },
})
