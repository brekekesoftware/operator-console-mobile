import { useState } from 'react'
import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { ScrollView, Text, View } from 'react-native'

import { Button } from '../../../common/Button'
import { DropdownMenu } from '../../../common/DropdownMenu'
import { Modal } from '../../../common/Modal'
import { Notification } from '../../../common/Notification'
import { Popconfirm } from '../../../common/Popconfirm'
import { Cell, Table, TableWrapper } from '../../../common/Table'
import { WidgetButton } from '../../../common/WidgetButton'
import { i18n } from '../../../i18n'
import { OCUtil } from '../../../OCUtil'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { OperatorConsoleStyles } from '../../../OperatorConsoleStyles'
import { Util } from '../../../Util'
import { RuntimeWidget } from './RuntimeWidget'

const LineButton = ({
  label,
  line,
  width,
  height,
  color,
  backgroundColor,
  borderStyle,
  borderColor,
  borderWidth,
  borderRadius,
  fontSize,
}) => {
  const oc = BrekekeOperatorConsole.getStaticInstance()
  return (
    <WidgetButton
      style={{
        padding: 1,
        // marginBottom: 12,
        backgroundColor,
        borderRadius,
        width,
        height,
        borderStyle,
        borderColor,
        borderWidth,
      }}
      stretch={false}
      textStyle={{ fontSize, color }}
      onPress={() => oc.handleLine(line)}
    >
      {label}
    </WidgetButton>
  )
}

const TransferCancelButton = ({
  callInfo,
  transferCancelButtonWidth,
  transferCancelButtonHeight,
  transferCancelButtonFgColor,
  transferCancelButtonBgColor,
  transferCancelButtonOuterBorderColor,
  transferCancelButtonOuterBorderRadius,
  transferCancelButtonOuterBorderThickness,
  transferCancelButtonFontSize,
}) => {
  const confirm = () => {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const campon = oc.getCampon()
    const bSuccess = campon.tryCancelCampOn(callInfo)
    if (bSuccess) {
      callInfo.camponDstExtensionId = null
      oc.setState({ latestCamponCall: null }) // for redraw
    } else {
      oc.setState({ latestCamponCall: callInfo }) // for redraw
      Notification.error({ message: i18n.t('FailedToCancelTransfer') })
    }
  }
  const cancel = () => {}

  const transferCancelButtonColor = Util.isAntdRgbaProperty(
    transferCancelButtonFgColor,
  )
    ? Util.getRgbaCSSStringFromAntdColor(transferCancelButtonFgColor)
    : ''
  const transferCancelButtonBackgroundColor = Util.isAntdRgbaProperty(
    transferCancelButtonBgColor,
  )
    ? Util.getRgbaCSSStringFromAntdColor(transferCancelButtonBgColor)
    : 'white'
  const transferCancelButtonBorder =
    Util.isNumeric(transferCancelButtonOuterBorderThickness) &&
    Util.isAntdRgbaProperty(transferCancelButtonOuterBorderColor)
  transferCancelButtonOuterBorderColor
  const transferCancelButtonBorderRadius = Util.isNumber(
    transferCancelButtonOuterBorderRadius,
  )
    ? transferCancelButtonOuterBorderRadius
    : 8

  return (
    <Popconfirm
      title={i18n.t('cancelTransferTitle')}
      description={i18n.t('AreYouSureToCancelThisTransfer')}
      onConfirm={confirm}
      onCancel={cancel}
      okText={i18n.t('yes')}
      cancelText={i18n.t('no')}
    >
      <WidgetButton
        style={{
          padding: 1,
          // marginBottom: 12,
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
        stretch={false}
        textStyle={{
          fontSize: transferCancelButtonFontSize,
          color: transferCancelButtonColor,
        }}
        // onPress={() => alert("onPress campon button!") }
      >
        {i18n.t('cancel')}
      </WidgetButton>
    </Popconfirm>
  )
}

const TransferButton = ({
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
  const [open, setOpen] = useState(false)

  const oc = BrekekeOperatorConsole.getStaticInstance()
  const handleMenuClick = e => {
    const camponExtension = oc.state.extensions[e.key]
    const extensionsStatus = oc.state.extensionsStatus
    const isBusy = OCUtil.isExtensionBusy(camponExtension.id, extensionsStatus)
    // const es = oc.getExtensionsStatusInstance();
    // const isBusy = es.isBusyByExtensionId( camponExtension.id );
    setOpen(false)
    if (isBusy) {
      showModalForBusy({ camponExtension, callInfo, title })
    } else {
      showModal({ camponExtension, callInfo, title })
    }
  }

  let extensions = oc.getExtensions()
  if (!extensions) {
    extensions = new Array()
  }
  const myExtensionId = oc.getLoginUser().pbxUsername

  const currentCallInfo = oc.getCurrentCallInfo()
  const currentCallNumber = currentCallInfo
    ? currentCallInfo.getPartyNumber()
    : null
  // !optimize!
  const items = new Array()
  for (let i = 0; i < extensions.length; i++) {
    const extension = extensions[i]
    const extensionCallNumber = extension.id
    if (extensionCallNumber === myExtensionId) {
      continue
    }
    if (currentCallNumber === extensionCallNumber) {
      continue
    }

    const extensionsStatus = oc.getExtensionsStatus()
    const statusClassName = OCUtil.getExtensionStatusClassName(
      extensionCallNumber,
      extensionsStatus,
    )
    // const label = extensionCallNumber + " " + (<div className={statusClassName}></div> );
    const label = (
      <>
        {extensionCallNumber}
        <View
          // style={{ display: 'inline-block' }}
          style={OperatorConsoleStyles[statusClassName]}
        ></View>
      </>
    )
    const item = {
      label,
      key: i,
    }
    items.push(item)
  }
  const [modalLoading, setModalLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(null)
  const showModal = ({ camponExtension, callInfo, title }) => {
    setModalOpen({ camponExtension, callInfo, title })
  }

  const handleBlindTransferNow = () => {
    const transferMode = 'attended'
    const camponExtension = modalOpen.camponExtension
    const pbxTalkerId = callInfo.getPbxTalkerId()
    const tenant = undefined
    oc.transferCallCore(
      camponExtension.id,
      transferMode,
      pbxTalkerId,
      tenant,
      (operatorConsoleAsCaller, message) => {
        if (message.startsWith('fail')) {
          Notification.error({ message: i18n.t('failed_to_transfer_call') })
        } else {
          const callInfo = operatorConsoleAsCaller
            .getPhoneClient()
            .getCallInfos()
            .getCallInfoWhereTalkerIdEqual(pbxTalkerId)
          if (!callInfo) {
            Notification.error({ message: i18n.t('failed_to_transfer_call') })
          } else {
            callInfo.hangup()
          }
        }
      },
    )
    setModalOpen(null) // close modal
  }

  const handleActiveAndStartBlindTransferNow = () => {
    const callId = modalOpen.callInfo.getCallId()
    const callIndex = oc
      .getPhoneClient()
      .getCallInfos()
      .getCallIndexByCallId(callId)
    oc.switchCallIndexWithoutHold(callIndex)

    const transferMode = undefined // attended
    const camponExtension = modalOpen.camponExtension
    const pbxTalkerId = callInfo.getPbxTalkerId()
    const tenant = undefined
    oc.transferCallCore(
      camponExtension.id,
      transferMode,
      pbxTalkerId,
      tenant,
      (operatorConsoleAsCaller, message) => {
        if (message.startsWith('fail')) {
          Notification.error({ message: i18n.t('failed_to_transfer_call') })
        } else {
          const callInfo = operatorConsoleAsCaller
            .getPhoneClient()
            .getCallInfos()
            .getCallInfoWhereTalkerIdEqual(pbxTalkerId)
          if (!callInfo) {
            Notification.error({ message: i18n.t('failed_to_transfer_call') })
          } else {
            callInfo.hangup()
          }
        }
      },
    )
    setModalOpen(null) // close modal
  }

  const handleModalCancel = () => {
    setModalOpen(null) // close modal
  }

  const handleOpenChange = flag => {
    setOpen(flag)
  }

  const [modalForBusyOpen, setModalForBusyOpen] = useState(null)
  const showModalForBusy = ({ camponExtension, callInfo, title }) => {
    setModalForBusyOpen({ camponExtension, callInfo, title })
  }

  const handleModalForBusyCancel = () => {
    setModalForBusyOpen(null)
  }

  const handleCamponAuto = () => {
    setModalForBusyOpen(null) // close modal

    const callInfo = modalForBusyOpen.callInfo
    const camponExtension = modalForBusyOpen.camponExtension
    const campon = oc.getCampon()

    const settingData = oc.getSystemSettingsData()
    const timeoutMillis = settingData.getCamponTimeoutMillis()
    const isBlindTransfer = true
    const transferExtensionId = camponExtension.id
    callInfo.camponDstExtensionId = transferExtensionId
    oc.setState({ latestCamponCall: callInfo }) // for redraw
    const title = modalForBusyOpen.title
    const bCampOn = campon.tryStartCamponOrTransfer(
      callInfo,
      isBlindTransfer,
      timeoutMillis,
      title,
    )
  }

  const handleCamponManual = () => {
    setModalForBusyOpen(null) // close modal

    const callInfo = modalForBusyOpen.callInfo
    const camponExtension = modalForBusyOpen.camponExtension
    const campon = oc.getCampon()

    const settingData = oc.getSystemSettingsData()
    const timeoutMillis = settingData.getCamponTimeoutMillis()
    const isBlindTransfer = false
    const transferExtensionId = camponExtension.id
    callInfo.camponDstExtensionId = transferExtensionId
    oc.setState({ latestCamponCall: callInfo }) // for redraw

    const title = modalForBusyOpen.title
    const bCampOn = campon.tryStartCamponOrTransfer(
      callInfo,
      isBlindTransfer,
      timeoutMillis,
      title,
    )
  }

  const transferButtonColor = Util.isAntdRgbaProperty(transferButtonFgColor)
    ? Util.getRgbaCSSStringFromAntdColor(transferButtonFgColor)
    : ''
  const transferButtonBackgroundColor = Util.isAntdRgbaProperty(
    transferButtonBgColor,
  )
    ? Util.getRgbaCSSStringFromAntdColor(transferButtonBgColor)
    : 'white'
  const transferButtonBorder =
    Util.isNumeric(transferButtonOuterBorderThickness) &&
    Util.isAntdRgbaProperty(transferButtonOuterBorderColor)

  const transferButtonBorderRadius = Util.isNumber(
    transferButtonOuterBorderRadius,
  )
    ? transferButtonOuterBorderRadius
    : 8

  return (
    <>
      <DropdownMenu
        key='dropdown'
        menu={{ items, onPress: handleMenuClick }}
        open={open}
      >
        <WidgetButton
          disabled
          style={{
            padding: 1,
            // marginBottom: 12,
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
          stretch={false}
          textStyle={{
            fontSize: transferButtonFontSize,
            color: transferButtonColor,
          }}
          // onPress={() => alert("onPress campon button!") }
        >
          {i18n.t('transfer')}
        </WidgetButton>
      </DropdownMenu>
      <Modal
        key='modal'
        open={modalOpen != null}
        title={i18n.t('transfer')}
        onOk={handleBlindTransferNow}
        onCancel={handleModalCancel}
        width={700}
        footer={[
          <View key='0'>
            <Button
              key='submit'
              type='primary'
              loading={modalLoading}
              onPress={handleBlindTransferNow}
            >
              {i18n.t('blindTransfer')}
            </Button>
            <Button
              key='submit2'
              type='primary'
              loading={modalLoading}
              onPress={handleActiveAndStartBlindTransferNow}
              style={{ marginLeft: 6 }}
            >
              {i18n.t('activateAndStartBlindTransfer')}
            </Button>
            <Button
              key='back'
              onPress={handleModalCancel}
              style={{ marginLeft: 6 }}
            >
              {i18n.t('cancel')}
            </Button>
          </View>,
        ]}
      >
        {i18n.t('confirmTransferNow')}
      </Modal>
      <Modal
        key='modalForBusy'
        open={modalForBusyOpen != null}
        title={i18n.t('transfer')}
        onOk={handleCamponAuto}
        onCancel={handleModalForBusyCancel}
        footer={[
          <View key='1'>
            <Button
              key='submitForBusy'
              type='primary'
              loading={modalLoading}
              onPress={handleCamponAuto}
            >
              {i18n.t('campOnAuto')}
            </Button>
            <Button
              key='submitForBusy2'
              type='primary'
              loading={modalLoading}
              onPress={handleCamponManual}
              style={{ marginLeft: 6 }}
            >
              {i18n.t('campOn')}
            </Button>
            <Button
              key='backForBusy'
              onPress={handleModalForBusyCancel}
              style={{ marginLeft: 6 }}
            >
              {i18n.t('cancel')}
            </Button>
          </View>,
        ]}
      >
        <Text>{i18n.t('confirmTransferForBusy')}</Text>
      </Modal>
    </>
  )
}

const LineTableRow = ({
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
  const lightClassname = _getLightClassname(lineInfo.line)
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
    : 'white'
  const lineButtonBorder =
    Util.isNumeric(lineButtonOuterBorderThickness) &&
    Util.isAntdRgbaProperty(lineButtonOuterBorderColor)

  const lineButtonBorderRadius = Util.isNumber(lineButtonOuterBorderRadius)
    ? lineButtonOuterBorderRadius
    : 8

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
        {
          borderWidth: bodyRowUnderlineThickness,
          borderStyle: 'solid',
          borderColor: bodyRowUnderlineColor,
        },
        lightStyle[lightClassname],
      ]}
    >
      <Cell
        textStyle={{ fontSize: bodyFontSize, color: bodyFgColor }}
        style={{
          borderTopRightRadius: outerBorderRadius,
          borderBottomRightRadius: outerBorderRadius,
        }}
        data={title}
      ></Cell>
      <Cell
        textStyle={{ fontSize: bodyFontSize, color: bodyFgColor }}
        data={lineInfo.talker}
      ></Cell>
      <Cell
        style={{ alignItems: 'center', justifyContent: 'center' }}
        data={
          <LineButton
            line={lineInfo.line}
            label={lineInfo.label}
            width={lineButtonWidth}
            height={lineButtonHeight}
            color={lineButtonColor}
            backgroundColor={lineButtonBackgroundColor}
            {...Util.getBorderStyle({
              isShowBorder: lineButtonBorder,
              borderWidth: lineButtonOuterBorderThickness,
              borderColor: lineButtonOuterBorderColor,
            })}
            borderRadius={lineButtonBorderRadius}
            fontSize={lineButtonFontSize}
          ></LineButton>
        }
      ></Cell>
      {/* <Cell style={{width:100,height:70}}>*/}
      <Cell
        data={
          callInfo &&
          (callInfo.getIsIncoming() && !callInfo.getIsAnswered()) === false &&
          lineInfo.talker ? (
            callInfo.camponDstExtensionId ? (
              <TransferCancelButton
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
              ></TransferCancelButton>
            ) : (
              <TransferButton
                callInfo={callInfo}
                title={title}
                transferButtonWidth={transferButtonWidth}
                transferButtonHeight={transferButtonHeight}
                transferButtonFgColor={transferButtonFgColor}
                transferButtonBgColor={transferButtonBgColor}
                transferButtonOuterBorderColor={transferButtonOuterBorderColor}
                transferButtonOuterBorderRadius={
                  transferButtonOuterBorderRadius
                }
                transferButtonOuterBorderThickness={
                  transferButtonOuterBorderThickness
                }
                transferButtonFontSize={transferButtonFontSize}
              ></TransferButton>
            )
          ) : (
            ''
          )
        }
      ></Cell>
      <Cell
        textStyle={{ fontSize: bodyFontSize, color: bodyFgColor }}
        style={{
          borderTopRightRadius: outerBorderRadius,
          borderBottomRightRadius: outerBorderRadius,
        }}
        data={
          callInfo && callInfo.camponDstExtensionId
            ? callInfo.camponDstExtensionId
            : ''
        }
      ></Cell>
    </TableWrapper>
  )
}

const _getLightClassname = line => {
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

export class LineTableRuntimeWidget extends RuntimeWidget {
  constructor(props, context) {
    super(props, context)
  }

  // !overload
  _getRenderMainJsx() {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const widgetData = this.getWidgetData()

    const myParksStatus = oc.getMyParksStatus()
    const linesStatus = oc.getLinesStatus()
    const parksStatus = oc.getParksStatus()
    const loginUser = oc.getLoginUser()

    const lineDataArray = widgetData.getLineDataArray()
    const lineCount = lineDataArray.length
    const lineInfos = new Array(lineCount)
    for (let i = 0; i < lineCount; i++) {
      const lineData = lineDataArray[i]
      const line = lineData.getResourceName()
      const { line_talker, room_id, line_talker_id } = linesStatus[line] || {}
      const lineInfo = {}
      lineInfo.line = lineData.getResourceName()
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
      this.context.fgColor,
    )
    const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getLinetableBodyFgColor(),
      this.context.fgColor,
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

    const hStyle: StyleProp<TextStyle> = {
      fontSize: headerFontSize,
      color: headerFgColor,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    }
    const cStyle: StyleProp<ViewStyle> = {
      padding: 10,
    }

    return (
      <Table
        style={{
          borderRadius: outerBorderRadius,
          borderWidth: outerBorderThickness,
          borderStyle: 'solid',
          borderColor: outerBorderColor,
          backgroundColor,
          flex: 1,
        }}
      >
        <TableWrapper
          style={{
            borderBottomWidth: headerRowUnderlineThickness,
            borderStyle: 'solid',
            borderColor: headerRowUnderlineColor,
          }}
        >
          <Cell
            textStyle={hStyle}
            style={[
              {
                borderTopRightRadius: outerBorderRadius,
                borderTopLeftRadius: outerBorderRadius,
              },
              cStyle,
            ]}
            data={i18n.t('name')}
          ></Cell>
          <Cell
            textStyle={hStyle}
            style={cStyle}
            data={i18n.t('responder')}
          ></Cell>
          <Cell textStyle={hStyle} style={cStyle} data={i18n.t('line')}></Cell>
          <Cell
            textStyle={hStyle}
            style={cStyle}
            data={i18n.t('transfer')}
          ></Cell>
          <Cell
            textStyle={hStyle}
            style={[
              {
                borderTopRightRadius: outerBorderRadius,
                borderBottomRightRadius: outerBorderRadius,
              },
              cStyle,
            ]}
            data={i18n.t('camponDest')}
          ></Cell>
        </TableWrapper>
        <View style={{ flex: 1 }}>
          <ScrollView>
            {lineInfos.map((lineInfo, index) => (
              <LineTableRow
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
          </ScrollView>
        </View>
      </Table>
    )
  }
}
