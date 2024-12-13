import type { ViewStyle } from 'react-native'
import { View } from 'react-native'

import { Cell, Table, TableWrapper } from '../../../common/Table'
import { WidgetButton } from '../../../common/WidgetButton'
import { i18n } from '../../../i18n'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { Util } from '../../../Util'
import { EditorWidget } from './EditorWidget'

const _getEditorLightClassname_ver2 = (line = {}) => {
  const oc = BrekekeOperatorConsole.getStaticInstance()
  const myParksStatus = oc.getMyParksStatus()
  const linesStatus = oc.getLinesStatus()
  const parksStatus = oc.getParksStatus()
  const loginUser = oc.getLoginUser()
  const { line_talker, room_id, status } = linesStatus[line] || {}
  let lightClassname = ''
  if (status === 'on') {
    const callInfo = room_id
      ? oc
          .getPhoneClient()
          .getCallInfos()
          .getCallInfoWherePbxRoomIdEqual(room_id)
      : null
    const park = parksStatus[line]

    if (line_talker === loginUser?.pbxUsername) {
      lightClassname = 'kbc-button-success-flash'
    } else if (park) {
      lightClassname = myParksStatus[line]
        ? 'kbc-button-success-flash-slow'
        : 'kbc-button-danger-flash-slow'
    } else if (callInfo) {
      if (callInfo.getIsIncoming() && !callInfo.getIsAnswered()) {
        lightClassname = 'kbc-button-danger-flash'
      } else {
        lightClassname = 'kbc-button-success'
      }
    } else {
      lightClassname = 'kbc-button-danger'
    }
  }

  return lightClassname
}

const EditorLineButton_ver2 = ({
  label,
  line,
  width,
  height,
  color,
  backgroundColor,
  borderStyle,
  borderWidth,
  borderColor,
  borderRadius,
  fontSize,
}) => {
  ;<WidgetButton
    style={{
      padding: 1,
      marginBottom: 12,
      backgroundColor,
      borderStyle,
      borderWidth,
      borderColor,
      borderRadius,
      width,
      height,
    }}
    textStyle={{ color, fontSize }}
    // onPress={() => oc.handleLine(line)}
    disabled={true}
  >
    {label}
  </WidgetButton>
}

const EditorTransferCancelButton_ver2 = ({
  lineInfo,
  callInfo,
  transferCancelButtonFgColor,
  transferCancelButtonBgColor,
  transferCancelButtonOuterBorderColor,
  transferCancelButtonOuterBorderRadius,
  transferCancelButtonOuterBorderThickness,
  transferCancelButtonWidth,
  transferCancelButtonHeight,
  transferCancelButtonFontSize,
}) => {
  const transferCancelButtonColor = Util.isAntdRgbaProperty(
    transferCancelButtonFgColor,
  )
    ? Util.getRgbaCSSStringFromAntdColor(transferCancelButtonFgColor)
    : ''
  const transferCancelButtonBackgroundColor = Util.isAntdRgbaProperty(
    transferCancelButtonBgColor,
  )
    ? Util.getRgbaCSSStringFromAntdColor(transferCancelButtonBgColor)
    : ''
  const transferCancelButtonBorder =
    Util.isNumeric(transferCancelButtonOuterBorderThickness) &&
    Util.isAntdRgbaProperty(transferCancelButtonOuterBorderColor)

  const transferCancelButtonBorderRadius = Util.isNumber(
    transferCancelButtonOuterBorderRadius,
  )
    ? transferCancelButtonOuterBorderRadius
    : 0

  return (
    <WidgetButton
      style={{
        padding: 1,
        marginBottom: 12,
        backgroundColor: transferCancelButtonBackgroundColor,
        borderRadius: transferCancelButtonBorderRadius,
        width: transferCancelButtonWidth,
        height: transferCancelButtonHeight,
        ...Util.getBorderStyle({
          isShowBorder: transferCancelButtonBorder,
          borderWidth: transferCancelButtonOuterBorderThickness,
          borderColor: transferCancelButtonOuterBorderColor,
        }),
      }}
      textStyle={{
        color: transferCancelButtonColor,
        fontSize: transferCancelButtonFontSize,
      }}
      disabled={true}
    >
      {i18n.t('cancel')}
    </WidgetButton>
  )
}

const EditorTransferButton_ver2 = ({
  lineInfo,
  callInfo,
  title,
  transferButtonWidth,
  transferButtonHeight,
  transferButtonFgColor,
  transferButtonBgColor,
  transferButtonOuterBorderColor,
  transferButtonOuterBorderRadius,
  transferButtonOuterBorderThickness,
  transferButtonFontSize,
}) => {
  const transferButtonColor = Util.isAntdRgbaProperty(transferButtonFgColor)
    ? Util.getRgbaCSSStringFromAntdColor(transferButtonFgColor)
    : ''
  const transferButtonBackgroundColor = Util.isAntdRgbaProperty(
    transferButtonBgColor,
  )
    ? Util.getRgbaCSSStringFromAntdColor(transferButtonBgColor)
    : ''
  const transferButtonBorder =
    Util.isNumeric(transferButtonOuterBorderThickness) &&
    Util.isAntdRgbaProperty(transferButtonOuterBorderColor)

  const transferButtonBorderRadius = Util.isNumber(
    transferButtonOuterBorderRadius,
  )
    ? transferButtonOuterBorderRadius
    : 0

  return (
    <WidgetButton
      style={{
        padding: 1,
        marginBottom: 12,
        backgroundColor: transferButtonBackgroundColor,
        borderRadius: transferButtonBorderRadius,
        width: transferButtonWidth,
        height: transferButtonHeight,
        ...Util.getBorderStyle({
          isShowBorder: transferButtonBorder,
          borderWidth: transferButtonOuterBorderThickness,
          borderColor: transferButtonOuterBorderColor,
        }),
      }}
      textStyle={{
        color: transferButtonColor,
        fontSize: transferButtonFontSize,
      }}
      // onClick={() => alert("onClick campon button!") }
      disabled={true}
    >
      {i18n.t('transfer')}
    </WidgetButton>
  )
}

const EditorLineTableRow_ver2 = ({
  index,
  lineInfo,
  bodyFgColor,
  bodyRowUnderlineThickness,
  bodyRowUnderlineColor,
  outerBorderRadius,
  lineButtonWidth,
  lineButtonHeight,
  lineButtonFgColor,
  lineButtonBgColor,
  lineButtonOuterBorderColor,
  lineButtonOuterBorderRadius,
  lineButtonOuterBorderThickness,
  transferButtonWidth,
  transferButtonHeight,
  transferButtonFgColor,
  transferButtonBgColor,
  transferButtonOuterBorderColor,
  transferButtonOuterBorderRadius,
  transferButtonOuterBorderThickness,
  transferCancelButtonWidth,
  transferCancelButtonHeight,
  transferCancelButtonFgColor,
  transferCancelButtonBgColor,
  transferCancelButtonOuterBorderColor,
  transferCancelButtonOuterBorderRadius,
  transferCancelButtonOuterBorderThickness,
  bodyFontSize,
  lineButtonFontSize,
  transferButtonFontSize,
  transferCancelButtonFontSize,
}) => {
  const lightClassname = _getEditorLightClassname_ver2(lineInfo.line)
  const title = lineInfo.lineLabel ? lineInfo.lineLabel : lineInfo.line
  const oc = BrekekeOperatorConsole.getStaticInstance()
  const callInfo = lineInfo.room_id
    ? oc
        .getPhoneClient()
        .getCallInfos()
        .getCallInfoWherePbxRoomIdEqual(lineInfo.room_id)
    : null

  const lineButtonColor = Util.isAntdRgbaProperty(lineButtonFgColor)
    ? Util.getRgbaCSSStringFromAntdColor(lineButtonFgColor)
    : ''
  const lineButtonBackgroundColor = Util.isAntdRgbaProperty(lineButtonBgColor)
    ? Util.getRgbaCSSStringFromAntdColor(lineButtonBgColor)
    : ''
  const lineButtonBorder =
    Util.isNumeric(lineButtonOuterBorderThickness) &&
    Util.isAntdRgbaProperty(lineButtonOuterBorderColor)
  const lineButtonBorderRadius = Util.isNumber(lineButtonOuterBorderRadius)
    ? lineButtonOuterBorderRadius
    : 0

  const lightStyle: { [key: string]: ViewStyle } = {
    'kbc-button-success-flash': {},
    'kbc-button-success-flash-slow': {},
    'kbc-button-danger-flash-slow': {},
    'kbc-button-danger-flash': {},
    'kbc-button-success': {},
    'kbc-button-danger': {},
  }

  return (
    <TableWrapper
      key={index}
      style={[
        lightStyle[lightClassname],
        {
          borderBottomWidth: bodyRowUnderlineThickness,
          borderStyle: 'solid',
          borderColor: bodyRowUnderlineColor,
          height: 50,
        },
      ]}
    >
      <Cell
        style={{
          borderTopRightRadius: outerBorderRadius,
          borderBottomRightRadius: outerBorderRadius,
        }}
        textStyle={{ color: bodyFgColor, fontSize: bodyFontSize }}
        data={title}
      ></Cell>
      <Cell
        textStyle={{
          fontSize: bodyFontSize,
          color: bodyFgColor,
        }}
        data={lineInfo.talker}
      ></Cell>
      <Cell
        data={
          <EditorLineButton_ver2
            line={lineInfo.line}
            label={lineInfo.label}
            width={lineButtonWidth}
            height={lineButtonHeight}
            color={lineButtonColor}
            backgroundColor={lineButtonBackgroundColor}
            borderStyle={lineButtonBorder ? 'solid' : undefined}
            borderWidth={
              lineButtonBorder ? lineButtonOuterBorderThickness : undefined
            }
            borderColor={
              lineButtonBorder
                ? Util.getRgbaCSSStringFromAntdColor(lineButtonOuterBorderColor)
                : undefined
            }
            borderRadius={lineButtonBorderRadius}
            fontSize={lineButtonFontSize}
          ></EditorLineButton_ver2>
        }
      ></Cell>
      <Cell
        data={
          index % 2 === 0 ? (
            <EditorTransferButton_ver2
              lineInfo={lineInfo}
              callInfo={callInfo}
              title={title}
              transferButtonWidth={transferButtonWidth}
              transferButtonHeight={transferButtonHeight}
              transferButtonFgColor={transferButtonFgColor}
              transferButtonBgColor={transferButtonBgColor}
              transferButtonOuterBorderColor={transferButtonOuterBorderColor}
              transferButtonOuterBorderRadius={transferButtonOuterBorderRadius}
              transferButtonOuterBorderThickness={
                transferButtonOuterBorderThickness
              }
              transferButtonFontSize={transferButtonFontSize}
            ></EditorTransferButton_ver2>
          ) : (
            <EditorTransferCancelButton_ver2
              lineInfo={lineInfo}
              callInfo={callInfo}
              transferCancelButtonWidth={transferCancelButtonWidth}
              transferCancelButtonHeight={transferCancelButtonHeight}
              transferCancelButtonFgColor={transferCancelButtonFgColor}
              transferCancelButtonBgColor={transferCancelButtonBgColor}
              transferCancelButtonOuterBorderColor={
                transferCancelButtonOuterBorderColor
              }
              transferCancelButtonOuterBorderRadius={
                transferCancelButtonOuterBorderRadius
              }
              transferCancelButtonOuterBorderThickness={
                transferCancelButtonOuterBorderThickness
              }
              transferCancelButtonFontSize={transferCancelButtonFontSize}
            ></EditorTransferCancelButton_ver2>
          )
        }
      ></Cell>
      <Cell
        style={{
          borderTopRightRadius: outerBorderRadius,
          borderBottomRightRadius: outerBorderRadius,
        }}
        textStyle={{ fontSize: bodyFontSize, color: bodyFgColor }}
        data={
          callInfo && callInfo.camponDstExtensionId
            ? callInfo.camponDstExtensionId
            : ''
        }
      ></Cell>
    </TableWrapper>
  )
}

export class LineTableEditorWidget extends EditorWidget {
  constructor(props) {
    super(props)
  }

  // !overload
  _getRenderMainJsx() {
    const widgetData = this.getWidgetData()
    const lineDataArray = widgetData.getLineDataArray()
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const linesStatus = oc.getLinesStatus()
    let lineCount = lineDataArray.length
    if (!lineCount) {
      lineCount = 0
    }
    const lineInfos = new Array(lineCount)
    for (let i = 0; i < lineCount; i++) {
      const lineData = lineDataArray[i]
      const line = lineData.getResourceName()
      const { line_talker, room_id, line_talker_id } = linesStatus[line] || {}
      const lineInfo: any = {}
      lineInfo.line = line
      lineInfo.lineLabel = lineData.getLineLabel()
      lineInfo.label = i18n.t('line') + ' ' + (i + 1)
      lineInfo.talker = line_talker
      lineInfo.lineTalkerId = line_talker_id
      lineInfo.room_id = room_id
      lineInfos[i] = lineInfo
    }

    const outerBorderRadius =
      widgetData.getLinetableOuterBorderRadius() ||
      widgetData.getLinetableOuterBorderRadius() === 0
        ? widgetData.getLinetableOuterBorderRadius()
        : 0 // !default
    const outerBorderThickness =
      widgetData.getLinetableOuterBorderThickness() ||
      widgetData.getLinetableOuterBorderThickness() === 0
        ? widgetData.getLinetableOuterBorderThickness()
        : 0 // !default
    const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getLinetableOuterBorderColor(),
      'rgb(0,0,0,0)',
    )
    const headerFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getLinetableHeaderFgColor(),
      '',
    )
    const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getLinetableBodyFgColor(),
      '',
    )
    // const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( props.linetableBodyActiveRowBgColor, "#B9DFA9" );   //!default
    const backgroundColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getLinetableBgColor(),
      '#f8f8f8',
    )
    const headerRowUnderlineThickness =
      widgetData.getLinetableHeaderRowUnderlineThickness() ||
      widgetData.getLinetableHeaderRowUnderlineThickness() === 0
        ? widgetData.getLinetableHeaderRowUnderlineThickness()
        : 1 // !default
    const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getLinetableHeaderRowUnderlineColor(),
      '#e0e0e0',
    ) // !default
    const bodyRowUnderlineThickness =
      widgetData.getLinetableBodyRowUnderlineThickness() ||
      widgetData.getLinetableBodyRowUnderlineThickness() === 0
        ? widgetData.getLinetableBodyRowUnderlineThickness()
        : 1 // !default
    const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getLinetableBodyRowUnderlineColor(),
      '#e0e0e0',
    ) // !default

    const lineButtonWidth =
      widgetData.getLineButtonWidth() || widgetData.getLineButtonWidth() === 0
        ? widgetData.getLineButtonWidth()
        : 40 // !default
    const lineButtonHeight =
      widgetData.getLineButtonHeight() || widgetData.getLineButtonHeight() === 0
        ? widgetData.getLineButtonHeight()
        : 40 // !default

    const headerFontSize = widgetData.getLinetableHeaderFontSize()
      ? widgetData.getLinetableHeaderFontSize()
      : 14 // !default
    const bodyFontSize = widgetData.getLinetableBodyFontSize()
      ? widgetData.getLinetableBodyFontSize()
      : 14 // !default
    const lineButtonFontSize = widgetData.getLineButtonFontSize()
      ? widgetData.getLineButtonFontSize()
      : 14 // !default
    const transferButtonFontSize = widgetData.getTransferButtonFontSize()
      ? widgetData.getTransferButtonFontSize()
      : 14 // !default
    const transferCancelButtonFontSize =
      widgetData.getTransferCancelButtonFontSize()
        ? widgetData.getTransferCancelButtonFontSize()
        : 14 // !default

    return (
      <Table
        style={{
          borderRadius: outerBorderRadius,
          borderWidth: outerBorderThickness,
          borderStyle: 'solid',
          borderColor: outerBorderColor,
          backgroundColor,
          height: 128,
          // backgroundColor: 'white'
        }}
      >
        <TableWrapper
          style={{
            borderBottomWidth: headerRowUnderlineThickness,
            borderStyle: 'solid',
            borderColor: headerRowUnderlineColor,
            height: 60,
          }}
        >
          <Cell
            style={{
              borderTopLeftRadius: outerBorderRadius,
              borderTopRightRadius: outerBorderRadius,
            }}
            textStyle={{
              fontSize: headerFontSize,
              color: headerFgColor,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
            data={i18n.t('name')}
          ></Cell>
          <Cell
            textStyle={{
              fontSize: headerFontSize,
              color: headerFgColor,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
            data={i18n.t('responder')}
          ></Cell>
          <Cell
            textStyle={{
              fontSize: headerFontSize,
              color: headerFgColor,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
            data={i18n.t('line')}
          ></Cell>
          <Cell
            textStyle={{
              fontSize: headerFontSize,
              color: headerFgColor,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
            data={i18n.t('transfer')}
          ></Cell>
          <Cell
            style={{
              borderTopRightRadius: outerBorderRadius,
              borderBottomRightRadius: outerBorderRadius,
            }}
            textStyle={{
              fontSize: headerFontSize,
              color: headerFgColor,
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
            data={i18n.t('camponDest')}
          ></Cell>
        </TableWrapper>

        <View style={{ flex: 1 }}>
          {lineInfos.map((lineInfo, index) => (
            <EditorLineTableRow_ver2
              key={index}
              index={index}
              lineInfo={lineInfo}
              bodyFgColor={bodyFgColor}
              bodyRowUnderlineThickness={bodyRowUnderlineThickness}
              bodyRowUnderlineColor={bodyRowUnderlineColor}
              outerBorderRadius={outerBorderRadius}
              lineButtonWidth={lineButtonWidth}
              lineButtonHeight={lineButtonHeight}
              lineButtonFgColor={widgetData.getLineButtonFgColor()}
              lineButtonBgColor={widgetData.getLineButtonBgColor()}
              lineButtonOuterBorderColor={widgetData.getLineButtonOuterBorderColor()}
              lineButtonOuterBorderRadius={widgetData.getLineButtonOuterBorderRadius()}
              lineButtonOuterBorderThickness={widgetData.getLineButtonOuterBorderThickness()}
              transferButtonWidth={widgetData.getTransferButtonWidth()}
              transferButtonHeight={widgetData.getTransferButtonHeight()}
              transferButtonFgColor={widgetData.getTransferButtonFgColor()}
              transferButtonBgColor={widgetData.getTransferButtonBgColor()}
              transferButtonOuterBorderColor={widgetData.getTransferButtonOuterBorderColor()}
              transferButtonOuterBorderRadius={widgetData.getTransferButtonOuterBorderRadius()}
              transferButtonOuterBorderThickness={widgetData.getTransferButtonOuterBorderThickness()}
              transferCancelButtonWidth={widgetData.getTransferCancelButtonWidth()}
              transferCancelButtonHeight={widgetData.getTransferCancelButtonHeight()}
              transferCancelButtonFgColor={widgetData.getTransferCancelButtonFgColor()}
              transferCancelButtonBgColor={widgetData.getTransferCancelButtonBgColor()}
              transferCancelButtonOuterBorderColor={widgetData.getTransferCancelButtonOuterBorderColor()}
              transferCancelButtonOuterBorderRadius={widgetData.getTransferCancelButtonOuterBorderRadius()}
              transferCancelButtonOuterBorderThickness={widgetData.getTransferCancelButtonOuterBorderThickness()}
              bodyFontSize={bodyFontSize}
              lineButtonFontSize={lineButtonFontSize}
              transferButtonFontSize={transferButtonFontSize}
              transferCancelButtonFontSize={transferCancelButtonFontSize}
            />
          ))}
        </View>
      </Table>
    )
  }
}
