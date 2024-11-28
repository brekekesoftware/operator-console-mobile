import { ScrollView, View } from 'react-native'

import { Cell, Table, TableWrapper } from '../../../common/Table'
import { WidgetButton } from '../../../common/WidgetButton'
import { i18n } from '../../../i18n'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { Util } from '../../../Util'
import { RuntimeWidget } from './RuntimeWidget'

const CELL_MARGIN = 4
export class CallTableRuntimeWidget extends RuntimeWidget {
  constructor(props) {
    super(props)
  }

  // !overload
  _getRenderMainJsx() {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const callInfos = oc.getPhoneClient().getCallInfos()
    const callInfoArray = callInfos.getCallInfoArray()
    const currentCallIndex = callInfos.getCurrentCallIndex()

    const widgetData = this.getWidgetData()
    const callTableThFontSize = widgetData.getCalltableHeaderFontSize()
      ? widgetData.getCalltableHeaderFontSize()
      : 10
    const callTableTdFontSize = widgetData.getCalltableBodyFontSize()
      ? widgetData.getCalltableBodyFontSize()
      : 12
    // const callTableTheadRowHeight = 44;
    // const callTableTbodyRowHeight = 44;
    const callTableTheadRowHeight = callTableThFontSize + CELL_MARGIN
    const callTableTbodyRowHeight = callTableTdFontSize + CELL_MARGIN

    let idKey = 0

    const CallTableColumns = [
      // !overhead
      {
        key: 'getPartyNumber',
        title: i18n.t('PartyNumber'),
        formatter: v => v + '',
      },
      {
        key: 'getPartyName',
        title: i18n.t('PartyName'),
        formatter: v => v + '',
      },
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

    const activeButtonWidth = widgetData.getCalltableActiveButtonWidth()
      ? widgetData.getCalltableActiveButtonWidth()
      : 42 // !default
    const activeButtonHeight = widgetData.getCalltableActiveButtonHeight()
      ? widgetData.getCalltableActiveButtonHeight()
      : 42 // !default
    // const activeButtonCellWidth = activeButtonWidth + CELL_MARGIN;
    // const activeButtonCellWidth = 50;
    const activeButtonCellHeight = activeButtonHeight + CELL_MARGIN
    const activeButtonFontSize = widgetData.getCalltableActiveButtonFontSize()
      ? widgetData.getCalltableActiveButtonFontSize()
      : 9

    const outerBorderRadius =
      widgetData.getCalltableOuterBorderRadius() ||
      widgetData.getCalltableOuterBorderRadius() === 0
        ? widgetData.getCalltableOuterBorderRadius()
        : 0 // !default
    const outerBorderThickness =
      widgetData.getCalltableOuterBorderThickness() ||
      widgetData.getCalltableOuterBorderThickness() === 0
        ? widgetData.getCalltableOuterBorderThickness()
        : 0 // !default
    const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getCalltableOuterBorderColor(),
      'rgba(0,0,0,0)',
    )
    const headerFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getCalltableHeaderFgColor(),
      '',
    )
    const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getCalltableBodyFgColor(),
      '',
    )
    const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getCalltableBodyActiveRowBgColor(),
      '#B9DFA9',
    ) // !default
    const backgroundColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getCalltableBgColor(),
      '',
    )
    const headerRowUnderlineThickness =
      widgetData.getCalltableHeaderRowUnderlineThickness() ||
      widgetData.getCalltableHeaderRowUnderlineThickness() === 0
        ? widgetData.getCalltableHeaderRowUnderlineThickness()
        : 1 // !default
    const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getCalltableHeaderRowUnderlineColor(),
      '#e0e0e0',
    ) // !default
    const bodyRowUnderlineThickness =
      widgetData.getCalltableBodyRowUnderlineThickness() ||
      widgetData.getCalltableBodyRowUnderlineThickness() === 0
        ? widgetData.getCalltableBodyRowUnderlineThickness()
        : 1 // !default
    const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getCalltableBodyRowUnderlineColor(),
      '#e0e0e0',
    ) // !default

    const cellCount = CallTableColumns.length + 1 // 1 is active botton

    return (
      <View style={{ width: '100%', height: '100%' }}>
        <ScrollView>
          <Table
            style={{
              borderRadius: outerBorderRadius,
              borderWidth: outerBorderThickness,
              borderStyle: 'solid',
              borderColor: outerBorderColor,
              backgroundColor,
            }}
          >
            <View>
              <TableWrapper
                style={{
                  borderBottomWidth: headerRowUnderlineThickness,
                  borderStyle: 'solid',
                  borderColor: headerRowUnderlineColor,
                  height: callTableTheadRowHeight,
                }}
              >
                {CallTableColumns.map((item, i) => {
                  const key = item.key
                  const title = item.title

                  let borderRadiusTH
                  const isFirstTH = i === 0
                  if (isFirstTH === true) {
                    borderRadiusTH = outerBorderRadius
                  } else {
                    borderRadiusTH = 0 // "0"
                  }

                  return (
                    <Cell
                      key={key}
                      style={{
                        paddingTop: 0,
                        paddingBottom: 0,
                        borderTopRightRadius: borderRadiusTH,
                        borderTopLeftRadius: borderRadiusTH,
                      }}
                      data={title}
                      textStyle={{
                        fontSize: callTableThFontSize,
                        color: headerFgColor,
                      }}
                    ></Cell>
                  )
                })}
                <Cell
                  style={{
                    // width:activeButtonCellWidth,
                    height: activeButtonCellHeight,
                    paddingTop: 0,
                    paddingBottom: 0,
                    borderTopRightRadius: outerBorderRadius,
                    borderBottomRightRadius: outerBorderRadius,
                  }}
                  data={i18n.t('activeButton')}
                  textStyle={{
                    fontSize: callTableThFontSize,
                    color: headerFgColor,
                  }}
                ></Cell>
              </TableWrapper>
            </View>
            <View>
              {callInfoArray.map((callInfo, i) => {
                let tdActive
                if (i === currentCallIndex) {
                  tdActive = '\u00A0'
                } else {
                  tdActive = (
                    <View
                      style={{
                        width: activeButtonWidth,
                        height: activeButtonHeight,
                        margin: 'auto',
                      }}
                    >
                      <WidgetButton
                        textStyle={{ fontSize: activeButtonFontSize }}
                        onPress={() => oc.switchCallIndex(i)}
                      >
                        {i18n.t('active')}
                      </WidgetButton>
                    </View>
                  )
                }
                return (
                  <TableWrapper
                    key={idKey++}
                    style={{
                      backgroundColor:
                        i === currentCallIndex ? bodyActiveRowBgColor : '',
                      paddingTop: 0,
                      paddingBottom: 0,
                      borderBottomWidth: bodyRowUnderlineThickness,
                      borderStyle: 'solid',
                      borderColor: bodyRowUnderlineColor,
                      height: callTableTbodyRowHeight,
                    }}
                  >
                    {CallTableColumns.map((column, i) => {
                      let borderRadiusTD
                      const isFirstTD = i === 0

                      // !forBug //!check //!deadCode
                      if (isFirstTD === true) {
                        borderRadiusTD = outerBorderRadius
                      } else {
                        borderRadiusTD = 0 // "0"
                      }
                      borderRadiusTD = 0 // "0"

                      const key = column.key
                      const formatter = column.formatter
                      let v
                      if (!callInfo) {
                        v = '\u00A0' // for edit mode
                      } else {
                        v = formatter(callInfo[key]())
                      }
                      return (
                        <Cell
                          key={key}
                          style={{
                            paddingTop: 0,
                            paddingBottom: 0,
                            borderTopRightRadius: outerBorderRadius,
                            borderBottomRightRadius: outerBorderRadius,
                          }}
                          textStyle={{
                            fontSize: callTableTdFontSize,
                            color: bodyFgColor,
                          }}
                          data={v}
                        ></Cell>
                      )
                    })}
                    <Cell
                      style={{
                        // width:activeButtonCellWidth,
                        paddingTop: 0,
                        paddingBottom: 0,
                        borderTopRightRadius: outerBorderRadius,
                        borderBottomRightRadius: outerBorderRadius,
                      }}
                      textStyle={{
                        fontSize: callTableTdFontSize,
                        color: bodyFgColor,
                      }}
                      data={tdActive}
                    ></Cell>
                  </TableWrapper>
                )
              })}
              {/* <TableWrapper colSpan={cellCount}></TableWrapper> */}
            </View>
          </Table>
        </ScrollView>
      </View>
    )
  }
}
