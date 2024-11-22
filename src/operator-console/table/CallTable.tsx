import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Row, Table } from 'react-native-table-component'

import { i18n } from '../i18n'
import { Util } from '../Util'

const CALL_TABLE_TH_HEIGHT = 50
const CALL_TABLE_TD_HEIGHT = 45

export const CallTable = props => {
  const operatorConsoleAsParent = props.operatorConsoleAsParent
  let context = props.context
  let currentCallIndex
  let isEditMode
  let callInfoArray
  if (!context) {
    // in edit mode
    isEditMode = true
    context = {}
    const tableHeight = props.height
    const rowCount = Math.ceil(
      (tableHeight - CALL_TABLE_TH_HEIGHT) / CALL_TABLE_TD_HEIGHT,
    )
    callInfoArray = new Array(rowCount)
    for (let i = 0; i < rowCount; i++) {
      callInfoArray[i] = null
    }
    // callById = {};
    currentCallIndex = -1
  } else {
    // Not in edit mode
    isEditMode = false
    // callIds = context.callIds;
    // if( !callIds ){
    //     callIds = [];
    // }
    // callById = context.callById;
    // if( !callById ){
    //     callById = {};
    // }
    const callInfos = operatorConsoleAsParent.getPhoneClient().getCallInfos()
    callInfoArray = callInfos.getCallInfoArray()
    // currentCallIndex = context.currentCallIndex;
    currentCallIndex = callInfos.getCurrentCallIndex()
  }

  const idKey = 0

  const CallTableColumns = [
    // !overhead
    {
      key: 'getPartyNumber',
      title: i18n.t('PartyNumber'),
      formatter: v => v + '',
    },
    { key: 'getPartyName', title: i18n.t('PartyName'), formatter: v => v + '' },
    {
      key: 'getIsIncoming',
      title: i18n.t('Incoming'),
      formatter: v => (v ? '✓' : ''),
    },
    {
      key: 'getIsAnswered',
      title: i18n.t('Answered'),
      formatter: v => (v ? '✓' : ''),
    },
    {
      key: 'getIsHolding',
      title: i18n.t('Holding'),
      formatter: v => (v ? '✓' : ''),
    },
    {
      key: 'getIsRecording',
      title: i18n.t('Recording'),
      formatter: v => (v ? '✓' : ''),
    },
    {
      key: 'getIsMuted',
      title: i18n.t('Muted'),
      formatter: v => (v ? '✓' : ''),
    },
    {
      key: 'getAnsweredAt',
      title: i18n.t('AnsweredAt'),
      formatter: v => (v ? new Date(v).toLocaleTimeString() : ''),
    },
  ]

  const callTableThFontSize = 10
  const callTableTdFontSize = 12
  const activeButtonFontSize = 9

  const outerBorderRadius = props.calltableOuterBorderRadius
    ? props.calltableOuterBorderRadius
    : 0 // !default
  const outerBorderThickness = props.calltableOuterBorderThickness
    ? props.calltableOuterBorderThickness
    : 0 // !default
  const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(
    props.calltableOuterBorderColor,
    'rgba(0,0,0,0)',
  )
  const headerFgColor = Util.getRgbaCSSStringFromAntdColor(
    props.calltableHeaderFgColor,
    '',
  )
  const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(
    props.calltableBodyFgColor,
    '',
  )
  const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor(
    props.calltableBodyActiveRowBgColor,
    '#B9DFA9',
  ) // !default
  const backgroundColor = Util.getRgbaCSSStringFromAntdColor(
    props.calltableBgColor,
    '',
  )
  const headerRowUnderlineThickness = props.calltableHeaderRowUnderlineThickness
    ? props.calltableHeaderRowUnderlineThickness
    : 1 // !default
  const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
    props.calltableHeaderRowUnderlineColor,
    '#e0e0e0',
  ) // !default
  const bodyRowUnderlineThickness = props.calltableBodyRowUnderlineThickness
    ? props.calltableBodyRowUnderlineThickness
    : 1 // !default
  const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
    props.calltableBodyRowUnderlineColor,
    '#e0e0e0',
  ) // !default
  const callTableTheadRowHeight = 44
  const callTableTbodyRowHeight = 44
  const cellCount = CallTableColumns.length + 1 // 1 is active botton

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <Table>
          <Row
            data={[...CallTableColumns, { title: i18n.t('activeButton') }]}
            style={{
              height: callTableTheadRowHeight,
              borderColor: headerRowUnderlineColor,
              borderWidth: headerRowUnderlineThickness,
              borderStyle: 'solid',
            }}
            textStyle={{ color: headerFgColor, fontSize: callTableThFontSize }}
          />
          {callInfoArray.map((callInfo, i) => {
            let tdActive
            if (isEditMode) {
              tdActive = '\u00A0'
            } else if (i === currentCallIndex) {
              tdActive = '\u00A0'
            } else {
              tdActive = (
                <View style={{ width: 42, height: 42, margin: 0 }}>
                  <TouchableOpacity onPress={() => context.switchCallIndex(i)}>
                    <Text>{i18n.t('active')}</Text>
                  </TouchableOpacity>
                </View>
              )
            }

            const row: any = []

            CallTableColumns.forEach((column, i) => {
              let borderRadiusTD
              const isFirstTD = i == 0
              if (isFirstTD === true) {
                borderRadiusTD = '0 ' + outerBorderRadius + 'px 0 0'
              } else {
                borderRadiusTD = '' // "0"
              }
              borderRadiusTD = '' // "0"

              const key = column.key
              const formatter = column.formatter
              let v
              if (!callInfo) {
                v = '\u00A0' // for edit mode
              } else {
                v = formatter(callInfo[key]())
              }
              row.push(v)
            })

            row.push(tdActive)

            return (
              <Row
                data={row}
                textStyle={{ color: bodyFgColor }}
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  borderColor: bodyRowUnderlineColor,
                  borderWidth: bodyRowUnderlineThickness,
                  borderStyle: 'solid',
                  height: callTableTbodyRowHeight,
                }}
              />
            )
          })}
        </Table>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
  },
})
