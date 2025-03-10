import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
import SearchConditionsArea from './SearchConditionsArea.js'
import SearchResultsArea from './SearchResultsArea.js'

/**
 * HistorySearchPanel
 * props.uiData
 * props.uiData.splitterTop_onChange
 * props.panelType
 * props.panelCode
 * props.panelOption
 * props.selectable
 * props.allSelectable
 * props.checkBox
 * props.emphasize
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      splitterTop: 0,
    }
  }
  componentDidMount() {
    const props = this.props
    const historySearchPanel = ReactDOM.findDOMNode(
      this.refs['historySearchPanel'],
    )
    if (historySearchPanel && historySearchPanel.clientHeight) {
      const maxInitialTop = (historySearchPanel.clientHeight * 7) / 10
      let initialTop = maxInitialTop
      if (
        props.panelOption &&
        typeof props.panelOption.initialSplitterTop === 'number'
      ) {
        initialTop = Math.min(
          props.panelOption.initialSplitterTop,
          maxInitialTop,
        )
      } else if (historySearchPanel.getElementsByClassName) {
        const searchConditionsTable = historySearchPanel.getElementsByClassName(
          'brSearchConditionsTable',
        )[0]
        if (searchConditionsTable && searchConditionsTable.scrollHeight) {
          initialTop = Math.min(
            searchConditionsTable.scrollHeight + 4,
            maxInitialTop,
          )
        }
      }
      this.setState({ splitterTop: initialTop })
    }
  }
  handleDrag(ev, ui) {
    const props = this.props
    const splitterTop = this.state.splitterTop + ui.deltaY
    this.setState({ splitterTop: splitterTop })
    props.uiData.fire(
      'splitterTop_onChange',
      props.panelType,
      props.panelCode,
      splitterTop,
    )
  }
  render() {
    const props = this.props
    return (
      <div className='brHistorySearchPanel' ref='historySearchPanel'>
        <div
          className='brHistorySearchPanelUpper'
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            right: '0px',
            height: this.state.splitterTop + 'px',
          }}
        >
          <SearchConditionsArea
            uiData={props.uiData}
            panelType={props.panelType}
            panelCode={props.panelCode}
          />
        </div>
        <div
          className='brHistorySearchPanelLower'
          style={{
            position: 'absolute',
            left: '0px',
            top: this.state.splitterTop + 5 + 'px',
            right: '0px',
            bottom: '0px',
          }}
        >
          <SearchResultsArea
            uiData={props.uiData}
            panelType={props.panelType}
            panelCode={props.panelCode}
            selectable={Boolean(props.selectable)}
            allSelectable={Boolean(props.allSelectable)}
            checkBox={Boolean(props.checkBox)}
            emphasize={Boolean(props.emphasize)}
          />
        </div>
        <Draggable
          axis='y'
          bounds='.brHistorySearchPanel'
          position={{ x: 0, y: this.state.splitterTop }}
          onDrag={this.handleDrag.bind(this)}
        >
          <div
            className='brHistorySearchPanelSplitter'
            style={{
              position: 'absolute',
              left: '0px',
              right: '0px',
              height: '5px',
            }}
          >
            <div className='brHistorySearchPanelSplitterThumb'></div>
          </div>
        </Draggable>
      </div>
    )
  }
}
