import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import HistoryDetailArea from './HistoryDetailArea.js'

/**
 * HistoryDetailPanel
 * props.uiData
 * props.panelType
 * props.panelCode
 */
export default class extends React.Component {
  render() {
    const props = this.props
    return (
      <div className='brHistoryDetailPanel'>
        <HistoryDetailArea
          uiData={props.uiData}
          panelType={props.panelType}
          panelCode={props.panelCode}
        />
      </div>
    )
  }
}
