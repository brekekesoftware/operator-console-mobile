import React from 'react'
import uawMsgs from '../utilities/uawmsgs.js'
import Constants from '../utilities/constants.js'
import { int, string } from '../utilities/strings.js'
import '../utilities/disableamd.js'
import DatePicker from 'react-datepicker'
import '../utilities/restoreamd.js'
import 'moment/locale/ja'
import 'moment/locale/zh-cn'
import moment from 'moment'
moment.locale('en')
uawMsgs.registerMoment(moment)

/**
 * SearchConditionsArea
 * props.uiData
 * props.uiData.ucUiAction
 * props.uiData.ucUiStore
 * props.panelType
 * props.panelCode
 */
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleDatePickerChange(searchConditionIndex, isEnd, moment) {
    const props = this.props
    const searchConditions = props.uiData.ucUiStore.getSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })
    if (searchConditions && searchConditions[searchConditionIndex]) {
      const startEnd = string(
        searchConditions[searchConditionIndex].conditionValue,
      ).split('-')
      if (!isEnd) {
        startEnd[0] = string(moment && moment.startOf('day').valueOf())
        startEnd[1] = string(startEnd[1])
      } else {
        startEnd[0] = string(startEnd[0])
        startEnd[1] = string(moment && moment.endOf('day').valueOf())
      }
      searchConditions[searchConditionIndex].conditionValue = startEnd.join('-')
    }
    props.uiData.ucUiAction.setSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
      searchConditions: searchConditions,
    })
    this.render()
  }
  handleSelectChange(searchConditionIndex, ev) {
    const props = this.props
    if (ev && ev.target) {
      this.changeSearchCondition(searchConditionIndex, ev.target.value)
      this.render()
    }
  }
  handleInputChange(searchConditionIndex, ev) {
    const props = this.props
    if (ev && ev.target) {
      // cache value to state not to store
      const s = {}
      s['input' + searchConditionIndex] = ev.target.value
      this.setState(s)
    }
  }
  handleInputBlur(searchConditionIndex, ev) {
    const props = this.props
    if (ev && ev.target) {
      // clear cached value in state
      const s = {}
      s['input' + searchConditionIndex] = null
      this.setState(s)
      // save value to store
      this.changeSearchCondition(searchConditionIndex, ev.target.value)
      this.render()
    }
  }
  handleInputKeyDown(searchConditionIndex, ev) {
    const props = this.props
    if (ev && ev.keyCode === 13 && !ev.shiftKey) {
      if (ev && ev.target) {
        // clear cached value in state
        const s = {}
        s['input' + searchConditionIndex] = null
        this.setState(s)
        // save value to store
        this.changeSearchCondition(searchConditionIndex, ev.target.value)
        this.render()
        // do search
        props.uiData.ucUiAction.doSearch({
          chatType: props.panelType,
          chatCode: props.panelCode,
          emphasize: true,
        })
      }
    }
  }
  handleDoSearchClick(ev) {
    const props = this.props
    // do search
    props.uiData.ucUiAction.doSearch({
      chatType: props.panelType,
      chatCode: props.panelCode,
      emphasize: true,
    })
  }
  changeSearchCondition(searchConditionIndex, value) {
    const props = this.props
    const searchConditions = props.uiData.ucUiStore.getSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })
    if (searchConditions && searchConditions[searchConditionIndex]) {
      searchConditions[searchConditionIndex].conditionValue = value
    }
    props.uiData.ucUiAction.setSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
      searchConditions: searchConditions,
    })
  }
  render() {
    const props = this.props
    const searchConditions = props.uiData.ucUiStore.getSearchConditions({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })
    const searchWorkData = props.uiData.ucUiStore.getSearchWorkData({
      chatType: props.panelType,
      chatCode: props.panelCode,
    })
    const rows = searchConditions.map((searchCondition, i) => {
      const conditionLabel =
        searchCondition.conditionLabel ||
        (searchCondition.conditionKey === '_content'
          ? uawMsgs.LBL_SEARCH_CONDITION_CONTENT
          : searchCondition.conditionKey === '_datetime'
            ? uawMsgs.LBL_SEARCH_CONDITION_DATETIME
            : searchCondition.conditionKey === '_webchatIds'
              ? uawMsgs.LBL_SEARCH_CONDITION_WEBCHATIDS
              : '')
      let input = ''
      if (searchCondition.conditionKey === '_datetime') {
        const startEnd = string(searchCondition.conditionValue).split('-')
        const startMoment = startEnd[0] ? moment(int(startEnd[0])) : null
        const endMoment = startEnd[1] ? moment(int(startEnd[1])) : null
        input = (
          <span className='brSearchConditionDatetime'>
            <DatePicker
              className='brSearchConditionValueStartDatePicker'
              selected={startMoment}
              isClearable={true}
              showMonthDropdown
              showYearDropdown
              onChange={this.handleDatePickerChange.bind(this, i, false)}
            />
            <span className='brSeparator'>-</span>
            <DatePicker
              className='brSearchConditionValueEndDatePicker'
              selected={endMoment}
              isClearable={true}
              showMonthDropdown
              showYearDropdown
              onChange={this.handleDatePickerChange.bind(this, i, true)}
            />
          </span>
        )
      } else {
        const className =
          searchCondition.conditionKey === '_content'
            ? ' brSearchConditionContent'
            : searchCondition.conditionKey === '_webchatIds'
              ? ' brSearchConditionWebchatIds'
              : ''
        if (searchCondition.options && searchCondition.options.length) {
          const options = searchCondition.options.map((option, j) => (
            <option key={j} value={option.optionValue}>
              {option.optionLabel}
            </option>
          ))
          input = (
            <select
              className={'brSearchConditionValueSelect' + className}
              value={searchCondition.conditionValue}
              onChange={this.handleSelectChange.bind(this, i)}
            >
              {options}
            </select>
          )
        } else {
          input = (
            <input
              type='text'
              className={'brSearchConditionValueInput' + className}
              value={
                typeof this.state['input' + i] === 'string'
                  ? this.state['input' + i]
                  : searchCondition.conditionValue
              }
              onChange={this.handleInputChange.bind(this, i)}
              onBlur={this.handleInputBlur.bind(this, i)}
              onKeyDown={this.handleInputKeyDown.bind(this, i)}
            />
          )
        }
      }
      return (
        <tr key={i} className={searchCondition.hidden ? 'brHidden' : ''}>
          <td className='brSearchConditionLabelColumn'>{conditionLabel}</td>
          <td className='brSearchConditionInputColumn'>{input}</td>
        </tr>
      )
    })
    return (
      <div className='brSearchConditionsArea'>
        <table className='brSearchConditionsTable'>
          <tbody>
            {rows}
            <tr>
              <td className='brDoSearchColumn' colSpan='2'>
                <button
                  className={
                    'brDoSearchButton' +
                    (searchWorkData.searching ? ' brDisabled' : '')
                  }
                  title={uawMsgs.LBL_SEARCH_DO_BUTTON_TOOLTIP}
                  onClick={this.handleDoSearchClick.bind(this)}
                >
                  {uawMsgs.LBL_SEARCH_DO_BUTTON}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
