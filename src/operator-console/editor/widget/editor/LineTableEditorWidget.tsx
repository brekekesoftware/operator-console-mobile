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
  border,
  borderRadius,
  fontSize,
}) => {
  ;<button
    style={{
      display: 'inline-block',
      padding: 1,
      margin: '0px 0px 0.75rem 0px',
      color,
      backgroundColor,
      border,
      borderRadius,
      width,
      height,
      fontSize: fontSize + 'px',
    }}
    title={i18n.t('legacy_button_description.LegacyLineButton')}
    className={'kbc-button kbc-button-fill-parent'}
    // onClick={() => oc.handleLine(line)}
    disabled={true}
  >
    {label}
  </button>
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
      ? 'solid ' +
        transferCancelButtonOuterBorderThickness +
        'px ' +
        Util.getRgbaCSSStringFromAntdColor(transferCancelButtonOuterBorderColor)
      : ''
  const transferCancelButtonBorderRadius = Util.isNumber(
    transferCancelButtonOuterBorderRadius,
  )
    ? transferCancelButtonOuterBorderRadius + 'px'
    : ''

  return (
    <button
      style={{
        display: 'inline-block',
        padding: 1,
        margin: '0px 0px 0.75rem 0px',
        color: transferCancelButtonColor,
        backgroundColor: transferCancelButtonBackgroundColor,
        border: transferCancelButtonBorder,
        borderRadius: transferCancelButtonBorderRadius,
        width: transferCancelButtonWidth,
        height: transferCancelButtonHeight,
        fontSize: transferCancelButtonFontSize + 'px',
      }}
      title={i18n.t('transferCancelButtonDesc')}
      className={'kbc-button kbc-button-fill-parent'}
      // onClick={() => alert("onClick campon button!") }
      disabled={true}
    >
      {i18n.t('cancel')}
    </button>
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
      ? 'solid ' +
        transferButtonOuterBorderThickness +
        'px ' +
        Util.getRgbaCSSStringFromAntdColor(transferButtonOuterBorderColor)
      : ''
  const transferButtonBorderRadius = Util.isNumber(
    transferButtonOuterBorderRadius,
  )
    ? transferButtonOuterBorderRadius + 'px'
    : ''

  return (
    <button
      style={{
        display: 'inline-block',
        padding: 1,
        margin: '0px 0px 0.75rem 0px',
        color: transferButtonColor,
        backgroundColor: transferButtonBackgroundColor,
        border: transferButtonBorder,
        borderRadius: transferButtonBorderRadius,
        width: transferButtonWidth,
        height: transferButtonHeight,
        fontSize: transferButtonFontSize + 'px',
      }}
      title={i18n.t('transferButtonDesc')}
      className={'kbc-button kbc-button-fill-parent'}
      // onClick={() => alert("onClick campon button!") }
      disabled={true}
    >
      {i18n.t('transfer')}
    </button>
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
      ? 'solid ' +
        lineButtonOuterBorderThickness +
        'px ' +
        Util.getRgbaCSSStringFromAntdColor(lineButtonOuterBorderColor)
      : ''
  const lineButtonBorderRadius = Util.isNumber(lineButtonOuterBorderRadius)
    ? lineButtonOuterBorderRadius + 'px'
    : ''

  return (
    <tr
      key={index}
      className={lightClassname}
      style={{
        color: bodyFgColor,
        borderBottom:
          bodyRowUnderlineThickness + 'px solid ' + bodyRowUnderlineColor,
      }}
    >
      <td
        style={{
          fontSize: bodyFontSize + 'px',
          borderRadius: '0 ' + outerBorderRadius + 'px 0 0',
        }}
      >
        {title}
      </td>
      <td
        style={{
          fontSize: bodyFontSize + 'px',
        }}
      >
        {lineInfo.talker}
      </td>
      {/* <td style={{width:70,height:70}}>*/}
      <td>
        <EditorLineButton_ver2
          line={lineInfo.line}
          label={lineInfo.label}
          width={lineButtonWidth}
          height={lineButtonHeight}
          color={lineButtonColor}
          backgroundColor={lineButtonBackgroundColor}
          border={lineButtonBorder}
          borderRadius={lineButtonBorderRadius}
          fontSize={lineButtonFontSize}
        ></EditorLineButton_ver2>
      </td>
      {/* <td style={{width:100,height:70}}>*/}
      <td>
        {index % 2 === 0 ? (
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
        )}
      </td>
      <td
        style={{
          fontSize: bodyFontSize + 'px',
          borderRadius: '0 ' + outerBorderRadius + 'px 0 0 ',
        }}
      >
        {callInfo && callInfo.camponDstExtensionId
          ? callInfo.camponDstExtensionId
          : ''}
      </td>
    </tr>
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
      const lineInfo = {}
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
      '',
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
      <table
        className='brOCLinetable'
        style={{
          borderRadius: outerBorderRadius,
          border: outerBorderThickness + 'px solid ' + outerBorderColor,
          backgroundColor,
        }}
      >
        <thead>
          <tr
            style={{
              color: headerFgColor,
              borderBottom:
                headerRowUnderlineThickness +
                'px solid ' +
                headerRowUnderlineColor,
            }}
          >
            <th
              style={{
                fontSize: headerFontSize + 'px',
                borderRadius: outerBorderRadius + 'px 0 0 0',
              }}
            >
              {i18n.t('name')}
            </th>
            <th
              style={{
                fontSize: headerFontSize + 'px',
              }}
            >
              {i18n.t('responder')}
            </th>
            {/* <th style={{width:70}}>{i18n.t("line")}</th>*/}
            <th
              style={{
                fontSize: headerFontSize + 'px',
              }}
            >
              {i18n.t('line')}
            </th>
            {/* <th style={{width:120}}>{i18n.t("transfer")}</th>*/}
            <th
              style={{
                fontSize: headerFontSize + 'px',
              }}
            >
              {i18n.t('transfer')}
            </th>
            <th
              style={{
                fontSize: headerFontSize + 'px',
                borderRadius: '0 ' + outerBorderRadius + 'px 0 0',
              }}
            >
              {i18n.t('camponDest')}
            </th>
          </tr>
        </thead>
        <tbody
          style={{
            color: bodyFgColor,
          }}
        >
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
        </tbody>
      </table>
    )
  }
}
