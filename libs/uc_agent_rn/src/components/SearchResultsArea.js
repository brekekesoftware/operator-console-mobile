import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  FlatList,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ChatList from './ChatList.js'
import { formatTopicDate } from '../utilities/strings.js'
import RadioCheckboxCheckedIcon from '../icons/RadioCheckboxCheckedIcon.js'
import RadioCheckboxUncheckedIcon from '../icons/RadioCheckboxUncheckedIcon.js'
import { ScrollView } from 'react-native-gesture-handler'

const colors = {
  white: '#FFFFFF',
  black: '#000000',
  borderColor: '#DCDCD5',
  backgroundColor: '#F8F8F6',
  hoverColor: '#4BC5DE',
  activeColor: '#CCCCC2',
  textColor: '#888169',
  textHoverColor: '#685947',
  yellow: '#FFFF00',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.borderColor,
    height: '100%',
  },
  header: {
    display: 'none',
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 27,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    zIndex: 1,
  },
  headerVisible: {
    display: 'flex',
  },
  scrollable: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  scrollableWithHeader: {
    marginTop: 27,
  },
  selectAllButton: {
    position: 'absolute',
    right: 4,
    top: 2,
    height: 22,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 1,
    backgroundColor: colors.backgroundColor,
  },
  selectAllButtonText: {
    color: colors.textColor,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  selectAllButtonSelected: {
    backgroundColor: colors.activeColor,
  },
  checkboxButton: {
    position: 'absolute',
    left: 1,
    top: 2,
    width: 18,
    height: 22,
  },
  checkbox: {
    width: 18,
    height: 22,
    resizeMode: 'contain',
  },
  tableContainer: {
    flex: 1,
  },
  tableHidden: {
    display: 'none',
  },
  row: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    backgroundColor: colors.backgroundColor,
    height: 50,
  },
  rowHovered: {
    borderTopColor: colors.hoverColor,
    borderBottomColor: colors.hoverColor,
    backgroundColor: colors.white,
  },
  rowActive: {
    borderTopColor: colors.hoverColor,
    borderBottomColor: colors.hoverColor,
    backgroundColor: colors.activeColor,
  },
  checkCell: {
    padding: 1,
    paddingLeft: 1,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCellHidden: {
    width: 0,
    display: 'none',
  },
  timeCell: {
    width: 60,
    padding: 6,
    paddingLeft: 4,
    paddingRight: 0,
  },
  nameCell: {
    width: 100,
    padding: 6,
    paddingLeft: 4,
    paddingRight: 0,
  },
  nameText: {
    fontWeight: 'bold',
  },
  summaryCell: {
    flex: 1,
    padding: 6,
    paddingLeft: 4,
    paddingRight: 0,
  },
  emphasizedText: {
    color: colors.black,
    backgroundColor: colors.yellow,
    fontWeight: 'bold',
  },
  selectCell: {
    padding: 1,
    paddingRight: 4,
    paddingLeft: 0,
    width: 100,
    alignItems: 'flex-end',
  },
  selectCellHidden: {
    width: 0,
  },
  selectButton: {
    maxWidth: 96,
    height: 22,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButtonText: {
    color: colors.textColor,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  selectButtonSelected: {
    backgroundColor: colors.activeColor,
  },
  detailRow: {
    display: 'none',
  },
  detailRowExpanded: {
    display: 'flex',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    backgroundColor: colors.white,
  },
  errorArea: {
    alignItems: 'center',
    padding: 4,
  },
  errorAreaHidden: {
    display: 'none',
  },
  errorMessage: {
    color: colors.black,
    backgroundColor: colors.yellow,
    fontWeight: 'bold',
  },
  searchMoreArea: {
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    alignItems: 'center',
    padding: 4,
  },
  searchMoreAreaHidden: {
    display: 'none',
  },
  searchMoreButton: {
    height: 30,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 1,
    backgroundColor: colors.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchMoreButtonText: {
    color: colors.textColor,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  searchingArea: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 4,
  },
  searchingAreaHidden: {
    display: 'none',
  },
  searchingIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  searchingMessage: {
    alignSelf: 'center',
  },
  gradientButton: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})

/**
 * SearchResultsArea
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.panelType
 * props.panelCode
 * props.selectable
 * props.allSelectable
 * props.checkBox
 * props.emphasize
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAll: false,
      hoveredRow: null,
      activeRow: null,
    }
  }

  handleResultPress = searchResultId => {
    const { props } = this
    props.uiData.ucUiAction.expandSearchResult({
      chatType: props.panelType,
      chatCode: props.panelCode,
      searchResultIds: [searchResultId],
    })
  }

  handleSelectPress = (searchResultId, event) => {
    const { props } = this
    props.uiData.ucUiAction.selectSearchResult({
      chatType: props.panelType,
      chatCode: props.panelCode,
      selectIds: [],
      unselectIds: [],
      reverseIds: [searchResultId],
    })
  }

  handleSelectAllPress = () => {
    const { props } = this
    if (this.state.selectedAll) {
      this.setState({ selectedAll: false })
      props.uiData.ucUiAction.selectSearchResult({
        chatType: props.panelType,
        chatCode: props.panelCode,
        selectIds: [],
        unselectIds: null,
        reverseIds: [],
      })
    } else {
      this.setState({ selectedAll: true })
      props.uiData.ucUiAction.selectSearchResult({
        chatType: props.panelType,
        chatCode: props.panelCode,
        selectIds: null,
        unselectIds: [],
        reverseIds: [],
      })
    }
  }

  handleSearchMorePress = () => {
    const { props } = this
    props.uiData.ucUiAction.doSearch({
      chatType: props.panelType,
      chatCode: props.panelCode,
      searchMore: true,
      emphasize: true,
    })
  }

  renderCheckbox = selected => {
    return (
      <View style={styles.checkbox}>
        {selected ? (
          <RadioCheckboxCheckedIcon />
        ) : (
          <RadioCheckboxUncheckedIcon />
        )}
      </View>
    )
  }

  renderButton = (text, onPress, selected, style, textStyle) => {
    return (
      <TouchableOpacity
        style={[style, selected && styles.selectButtonSelected]}
        onPress={onPress}
      >
        {/* <LinearGradient
          colors={
            selected
              ? ['#FFFFFF1A', '#FFFFFF73', '#FFFFFFA6']
              : ['#FFFFFFA6', '#FFFFFF73', '#FFFFFF1A']
          }
          style={styles.gradientButton}
        /> */}
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    )
  }

  renderSearchResult = (searchResult, index) => {
    const { props } = this
    const { hoveredRow, activeRow } = this.state
    const isHovered = hoveredRow === index
    const isActive = activeRow === index
    console.log('#Duy Phan console searchResult', searchResult)

    return (
      <React.Fragment key={`result-${index}`}>
        <TouchableOpacity
          style={[
            styles.row,
            isHovered && styles.rowHovered,
            isActive && styles.rowActive,
          ]}
          onPress={() => this.handleResultPress(searchResult.searchResultId)}
          onPressIn={() => this.setState({ hoveredRow: index })}
          onPressOut={() =>
            this.setState({ hoveredRow: null, activeRow: null })
          }
          activeOpacity={1}
        >
          <View
            style={[
              styles.checkCell,
              (!props.selectable || !props.checkBox) && styles.checkCellHidden,
            ]}
          >
            <TouchableOpacity
              onPress={e => {
                this.handleSelectPress(searchResult.searchResultId)
              }}
            >
              {this.renderCheckbox(searchResult.selected)}
            </TouchableOpacity>
          </View>

          <View style={styles.timeCell}>
            <Text>{formatTopicDate(searchResult.customerStartTime)}</Text>
          </View>

          <View style={styles.nameCell}>
            <Text style={styles.nameText}>{searchResult.customerName}</Text>
          </View>

          <View style={styles.summaryCell}>
            <Text>
              {/* TODO: HTML content needs to be parsed properly */}
              {searchResult.summary.replace(/<[^>]*>/g, '')}
            </Text>
          </View>

          <View
            style={[
              styles.selectCell,
              (!props.selectable || props.checkBox) && styles.selectCellHidden,
            ]}
          >
            {props.selectable &&
              !props.checkBox &&
              this.renderButton(
                uawMsgs.LBL_SEARCH_SELECT_BUTTON,
                e => {
                  this.handleSelectPress(searchResult.searchResultId)
                  e.stopPropagation()
                },
                searchResult.selected,
                styles.selectButton,
                styles.selectButtonText,
              )}
          </View>
        </TouchableOpacity>

        <View
          style={[
            styles.detailRow,
            searchResult._expanded && styles.detailRowExpanded,
          ]}
        >
          <ChatList
            uiData={props.uiData}
            panelType='SEARCHRESULTDETAIL'
            panelCode={searchResult.searchResultId}
          />
        </View>
      </React.Fragment>
    )
  }

  render() {
    const { props } = this
    const searchResults = props.uiData.ucUiStore.getSearchResults({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })
    const searchWorkData = props.uiData.ucUiStore.getSearchWorkData({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })

    const containerStyles = [styles.container]

    const headerStyles = [
      styles.header,
      props.allSelectable && searchResults.length && styles.headerVisible,
    ]

    const scrollableStyles = [
      styles.scrollable,
      props.allSelectable &&
        searchResults.length &&
        styles.scrollableWithHeader,
    ]

    return (
      <View style={containerStyles}>
        <View style={headerStyles}>
          {props.checkBox ? (
            <TouchableOpacity
              style={styles.checkboxButton}
              onPress={this.handleSelectAllPress}
            >
              {this.renderCheckbox(this.state.selectedAll)}
            </TouchableOpacity>
          ) : (
            this.renderButton(
              uawMsgs.LBL_SEARCH_SELECT_ALL_BUTTON,
              this.handleSelectAllPress,
              this.state.selectedAll,
              styles.selectAllButton,
              styles.selectAllButtonText,
            )
          )}
        </View>

        <ScrollView style={scrollableStyles}>
          {searchResults.length > 0 && (
            <View style={[styles.tableContainer]}>
              {searchResults.map((result, index) =>
                this.renderSearchResult(result, index),
              )}
            </View>
          )}

          <View
            style={[
              styles.errorArea,
              !searchWorkData.errorType && styles.errorAreaHidden,
            ]}
          >
            <Text style={styles.errorMessage}>
              {(uawMsgs[searchWorkData.errorType] || searchWorkData.errorType) +
                (searchWorkData.errorDetail
                  ? ' (' + searchWorkData.errorDetail + ')'
                  : '')}
            </Text>
          </View>

          {searchWorkData.hasMore && (
            <View style={[styles.searchMoreArea]}>
              <TouchableOpacity
                style={styles.searchMoreButton}
                onPress={this.handleSearchMorePress}
              >
                <Text style={styles.searchMoreButtonText}>
                  {uawMsgs.LBL_SEARCH_MORE_BUTTON}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View
            style={[
              styles.searchingArea,
              !(searchWorkData.searching && !searchWorkData.clearing) &&
                styles.searchingAreaHidden,
            ]}
          >
            <Image
              source={require('../images/progress.gif')}
              style={styles.searchingIcon}
            />
            <Text style={styles.searchingMessage}>
              {uawMsgs.LBL_SEARCH_SEARCHING}
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}
