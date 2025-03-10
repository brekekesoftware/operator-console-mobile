import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import { formatStr, formatMessageDateTime } from '../utilities/strings.js'

/**
 * TimerSpan
 * props.baseTime
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      now: +new Date(),
    }
    this.interval = null
    this.delay = 500
  }
  tick() {
    const props = this.props
    const now = +new Date()
    this.setState({
      now: now,
    })
    const time = now - props.baseTime
    if (time >= 60000 && this.delay < 30000) {
      this.delay = 30000
      clearInterval(this.interval)
      this.interval = setInterval(this.tick.bind(this), this.delay)
    }
  }
  componentDidMount() {
    const props = this.props
    this.interval = setInterval(this.tick.bind(this), this.delay)
  }
  componentWillUnmount() {
    const props = this.props
    clearInterval(this.interval)
  }
  render() {
    const props = this.props
    const time = this.state.now - props.baseTime
    let output = ''
    if (time >= 86400000) {
      const baseTimeDate = new Date(props.baseTime)
      const year = baseTimeDate.getFullYear()
      const monthNum = baseTimeDate.getMonth() + 1
      const day = baseTimeDate.getDate()
      output = formatStr(
        uawMsgs.CMN_FORMAT_DATE,
        year,
        monthNum,
        day,
        uawMsgs['CMN_MONTH_STR_' + ('0' + monthNum).slice(-2)],
      )
    } else if (time >= 3600000) {
      const hour = int(time / 3600000)
      output = formatStr(uawMsgs.CMN_FORMAT_HOURS_AGO, hour)
    } else if (time >= 60000) {
      const min = int(time / 60000)
      output = formatStr(uawMsgs.CMN_FORMAT_MINUTES_AGO, min)
    } else {
      const min = int(time / 60000)
      const sec = int(time / 1000) % 60
      output = ('0' + min).slice(-2) + ':' + ('0' + sec).slice(-2)
    }
    return <span title={formatMessageDateTime(props.baseTime)}>{output}</span>
  }
}
