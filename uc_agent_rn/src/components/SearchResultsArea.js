import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import ChatList from './ChatList.js'
import { formatTopicDate } from '../utilities/strings.js'

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
    }
  }
  handleResultClick(searchResultId, ev) {
    const props = this.props
    props.uiData.ucUiAction.expandSearchResult({
      chatType: props.panelType,
      chatCode: props.panelCode,
      searchResultIds: [searchResultId],
    })
  }
  handleSelectClick(searchResultId, ev) {
    const props = this.props
    props.uiData.ucUiAction.selectSearchResult({
      chatType: props.panelType,
      chatCode: props.panelCode,
      selectIds: [],
      unselectIds: [],
      reverseIds: [searchResultId],
    })
    ev.stopPropagation()
  }
  handleSelectMouseEnter(resultIndex, ev) {
    const rowNode = ReactDOM.findDOMNode(
      this.refs['searchResultRow' + resultIndex],
    )
    if (rowNode && rowNode.className) {
      rowNode.className += ' brNotHover'
    }
  }
  handleSelectMouseLeave(resultIndex, ev) {
    const rowNode = ReactDOM.findDOMNode(
      this.refs['searchResultRow' + resultIndex],
    )
    if (rowNode && rowNode.className) {
      rowNode.className = rowNode.className.replace(' brNotHover', '')
    }
  }
  handleSelectAllClick(ev) {
    const props = this.props
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
  handleDoSearchMoreClick(ev) {
    const props = this.props
    // do search
    props.uiData.ucUiAction.doSearch({
      chatType: props.panelType,
      chatCode: props.panelCode,
      searchMore: true,
      emphasize: true,
    })
  }
  render() {
    const props = this.props
    const searchResults = props.uiData.ucUiStore.getSearchResults({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })
    const searchWorkData = props.uiData.ucUiStore.getSearchWorkData({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })
    const rows = searchResults.reduce((rows, searchResult, i) => {
      rows.push(
        <tr key={i} ref={'searchResultRow' + i} className='brSearchResultRow'>
          <td
            className='brSearchResultColumn brSearchResultCheck'
            onClick={this.handleResultClick.bind(
              this,
              searchResult.searchResultId,
            )}
          >
            <button
              className={
                'brCheckSearchResultButton' +
                (searchResult.selected ? ' brSelected' : '')
              }
              title={uawMsgs.LBL_SEARCH_SELECT_BUTTON_TOOLTIP}
              onClick={this.handleSelectClick.bind(
                this,
                searchResult.searchResultId,
              )}
              onMouseEnter={this.handleSelectMouseEnter.bind(this, i)}
              onMouseLeave={this.handleSelectMouseLeave.bind(this, i)}
            >
              {uawMsgs.LBL_SEARCH_SELECT_BUTTON}
            </button>
          </td>
          <td
            className='brSearchResultColumn brSearchResultTime'
            onClick={this.handleResultClick.bind(
              this,
              searchResult.searchResultId,
            )}
          >
            {formatTopicDate(searchResult.customerStartTime)}
          </td>
          <td
            className='brSearchResultColumn brSearchResultName'
            onClick={this.handleResultClick.bind(
              this,
              searchResult.searchResultId,
            )}
          >
            {searchResult.customerName}
          </td>
          <td
            className='brSearchResultColumn brSearchResultSummary'
            onClick={this.handleResultClick.bind(
              this,
              searchResult.searchResultId,
            )}
          >
            <span dangerouslySetInnerHTML={{ __html: searchResult.summary }} />
          </td>
          <td
            className='brSearchResultColumn brSearchResultSelect'
            onClick={this.handleResultClick.bind(
              this,
              searchResult.searchResultId,
            )}
          >
            <button
              className={
                'brSelectSearchResultButton' +
                (searchResult.selected ? ' brSelected' : '')
              }
              title={uawMsgs.LBL_SEARCH_SELECT_BUTTON_TOOLTIP}
              onClick={this.handleSelectClick.bind(
                this,
                searchResult.searchResultId,
              )}
              onMouseEnter={this.handleSelectMouseEnter.bind(this, i)}
              onMouseLeave={this.handleSelectMouseLeave.bind(this, i)}
            >
              {uawMsgs.LBL_SEARCH_SELECT_BUTTON}
            </button>
          </td>
        </tr>,
      )
      rows.push(
        <tr
          key={searchResults.length + i}
          className={
            'brSearchResultDetailRow' +
            (searchResult._expanded ? ' brExpanded' : '')
          }
        >
          <td className='brSearchResultDetailColumn' colSpan='5'>
            <ChatList
              uiData={props.uiData}
              panelType='SEARCHRESULTDETAIL'
              panelCode={searchResult.searchResultId}
            />
          </td>
        </tr>,
      )
      return rows
    }, [])
    return (
      <div
        className={
          'brSearchResultsArea' +
          (props.selectable ? ' brSelectable' : '') +
          (props.allSelectable && searchResults.length
            ? ' brAllSelectable'
            : '') +
          (props.checkBox ? ' brCheckBox' : '') +
          (props.emphasize ? ' brEmphasize' : '')
        }
      >
        <div className='brSearchResultsHeader'>
          <button
            className={
              'brSelectAllSearchResultButton' +
              (this.state.selectedAll ? ' brSelected' : '')
            }
            title={uawMsgs.LBL_SEARCH_SELECT_ALL_BUTTON_TOOLTIP}
            onClick={this.handleSelectAllClick.bind(this)}
          >
            {uawMsgs.LBL_SEARCH_SELECT_ALL_BUTTON}
          </button>
        </div>
        <div className='brSearchResultsScrollable'>
          <table
            className={
              'brSearchResultsTable' + (searchResults.length ? '' : ' brHidden')
            }
          >
            <tbody>{rows}</tbody>
          </table>
          <div
            className={
              'brErrorArea' + (searchWorkData.errorType ? '' : ' brHidden')
            }
          >
            <span className='brErrorMessage'>
              {(uawMsgs[searchWorkData.errorType] || searchWorkData.errorType) +
                (searchWorkData.errorDetail
                  ? ' (' + searchWorkData.errorDetail + ')'
                  : '')}
            </span>
          </div>
          <div
            className={
              'brDoSearchMoreArea' + (searchWorkData.hasMore ? '' : ' brHidden')
            }
          >
            <button
              className='brDoSearchMoreButton'
              title={uawMsgs.LBL_SEARCH_MORE_BUTTON_TOOLTIP}
              onClick={this.handleDoSearchMoreClick.bind(this)}
            >
              {uawMsgs.LBL_SEARCH_MORE_BUTTON}
            </button>
          </div>
          <div
            className={
              'brSearchingArea' +
              (searchWorkData.searching && !searchWorkData.clearing
                ? ''
                : ' brHidden')
            }
          >
            <span className='brSearchingIcon'></span>
            <span className='brSearchingMessage'>
              {uawMsgs.LBL_SEARCH_SEARCHING}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
