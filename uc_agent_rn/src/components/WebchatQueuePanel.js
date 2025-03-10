import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import WebchatQueueTable from './WebchatQueueTable.js'

/**
 * WebchatQueuePanel
 * props.uiData
 */
export default props => {
  return (
    <div className='brWebchatQueuePanel'>
      <WebchatQueueTable
        uiData={props.uiData}
        bigStyle={true}
        resizerName='webchatQueuePanel'
      />
    </div>
  )
}
