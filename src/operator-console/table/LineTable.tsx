import { useState } from 'react'
import type { ViewStyle } from 'react-native'
import { StyleSheet, View } from 'react-native'

import { Button } from '../common/Button'
import { DropdownMenu } from '../common/DropdownMenu'
import { Modal } from '../common/Modal'
import { Notification } from '../common/Notification'
import { Popconfirm } from '../common/Popconfirm'
import { Cell, Table, TableWrapper } from '../common/Table'
import { WidgetButton } from '../common/WidgetButton'
import { i18n } from '../i18n'
import { OCUtil } from '../OCUtil'
import { OperatorConsoleStyles } from '../OperatorConsoleStyles'
import { Util } from '../Util'

const _getLightClassname = (line, context = {}) => {
  const {
    myParksStatus = {},
    linesStatus = {},
    parksStatus = {},
    loginUser,
  } = context
  const { line_talker, room_id, status } = linesStatus[line] || {}
  let lightClassname = ''
  if (status === 'on') {
    const oc = context.operatorConsole
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

const LineButton = ({
  label,
  line,
  width,
  height,
  color,
  backgroundColor,
  borderColor,
  borderWidth,
  borderStyle,
  borderRadius,
  context = {},
}) => (
  <WidgetButton
    style={{
      padding: 1,
      marginBottom: 12,
      backgroundColor,
      borderColor,
      borderWidth,
      borderStyle,
      borderRadius,
      width,
      height,
    }}
    textStyle={{ color }}
    onPress={() => context.handleLine(line)}
  >
    {label}
  </WidgetButton>
)

const TransferCancelButton = ({
  context,
  lineInfo,
  callInfo,
  transferCancelButtonFgColor,
  transferCancelButtonBgColor,
  transferCancelButtonOuterBorderColor,
  transferCancelButtonOuterBorderRadius,
  transferCancelButtonOuterBorderThickness,
  transferCancelButtonWidth,
  transferCancelButtonHeight,
}) => {
  const confirm = () => {
    const oc = context.operatorConsole
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
        textStyle={{ color: transferCancelButtonColor }}
      >
        {i18n.t('cancel')}
      </WidgetButton>
    </Popconfirm>
  )
}

const TransferButton = ({
  context,
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
}) => {
  const [open, setOpen] = useState(false)

  const oc = context.operatorConsole
  const handleMenuClick = e => {
    const oc = context.operatorConsole
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

  let extensions = oc.state.extensions
  if (!extensions) {
    extensions = new Array()
  }
  const myExtensionId = oc.state.loginUser.pbxUsername

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

    const extensionsStatus = oc.state.extensionsStatus
    const statusClassName = OCUtil.getExtensionStatusClassName(
      extensionCallNumber,
      extensionsStatus,
    )
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
    <>
      <DropdownMenu
        key='dropdown'
        menu={{ items, onPress: handleMenuClick }}
        open={open}
      >
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
          textStyle={{ color: transferButtonColor }}
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
              style={styles.marginLeftButton}
            >
              {i18n.t('activateAndStartBlindTransfer')}
            </Button>
            <Button
              key='back'
              onPress={handleModalCancel}
              style={styles.marginLeftButton}
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
              style={styles.marginLeftButton}
            >
              {i18n.t('campOn')}
            </Button>
            <Button
              key='backForBusy'
              onPress={handleModalForBusyCancel}
              style={styles.marginLeftButton}
            >
              {i18n.t('cancel')}
            </Button>
          </View>,
        ]}
      >
        {i18n.t('confirmTransferForBusy')}
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
  context = {},
}) => {
  const lightClassname = _getLightClassname(lineInfo.line, context)
  const title = lineInfo.lineLabel ? lineInfo.lineLabel : lineInfo.line
  const oc = context.operatorConsole
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
        {
          borderBottomWidth: bodyRowUnderlineThickness,
          borderStyle: 'solid',
          borderColor: bodyRowUnderlineColor,
        },
        lightStyle[lightClassname],
      ]}
    >
      <Cell
        style={{
          borderTopRightRadius: outerBorderRadius,
          borderBottomRightRadius: outerBorderRadius,
        }}
        textStyle={{ color: bodyFgColor }}
        data={title}
      ></Cell>
      <Cell data={lineInfo.talker}></Cell>

      <Cell
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
            context={context}
          ></LineButton>
        }
      ></Cell>
      <Cell
        data={
          callInfo &&
          (callInfo.getIsIncoming() && !callInfo.getIsAnswered()) === false &&
          lineInfo.talker ? (
            callInfo.camponDstExtensionId ? (
              <TransferCancelButton
                context={context}
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
              ></TransferCancelButton>
            ) : (
              <TransferButton
                context={context}
                lineInfo={lineInfo}
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
              ></TransferButton>
            )
          ) : (
            ''
          )
        }
      ></Cell>
      <Cell
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

export const LineTable = props => {
  let context = props.context
  if (!context) {
    context = {}
  }

  const widget = context.widget

  let lineInfos
  if (widget) {
    const {
      myParksStatus = {},
      linesStatus = {},
      parksStatus = {},
      loginUser,
    } = context
    const lineCount = widget.lineCount
    lineInfos = new Array(lineCount)
    for (let i = 0; i < lineCount; i++) {
      const line = widget['line' + i]
      const { line_talker, room_id, status, line_talker_id } =
        linesStatus[line] || {}
      const lineInfo = {}
      lineInfo.line = widget['line' + i]
      lineInfo.lineLabel = widget['lineLabel' + i]
      lineInfo.label = i18n.t('line') + ' ' + (i + 1)
      lineInfo.talker = line_talker
      lineInfo.lineTalkerId = line_talker_id
      lineInfo.room_id = room_id
      lineInfos[i] = lineInfo
    }
  } else {
    // Preview
    const { linesStatus = {} } = props
    let lineCount = props.lineCount
    if (!lineCount) {
      lineCount = 0
    }
    lineInfos = new Array(lineCount)
    for (let i = 0; i < lineCount; i++) {
      const line = props['line' + i]
      const { line_talker, room_id, line_talker_id } = linesStatus[line] || {}
      const lineInfo = {}
      lineInfo.line = props['line' + i]
      lineInfo.lineLabel = props['lineLabel' + i]
      lineInfo.label = i18n.t('line') + ' ' + (i + 1)
      lineInfo.talker = line_talker
      lineInfo.lineTalkerId = line_talker_id
      lineInfo.room_id = room_id
      lineInfos[i] = lineInfo
    }
  }

  const outerBorderRadius = props.linetableOuterBorderRadius
    ? props.linetableOuterBorderRadius
    : 0 // !default
  const outerBorderThickness = props.linetableOuterBorderThickness
    ? props.linetableOuterBorderThickness
    : 0 // !default
  const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(
    props.linetableOuterBorderColor,
    'rgb(0,0,0,0)',
  )
  const headerFgColor = Util.getRgbaCSSStringFromAntdColor(
    props.linetableHeaderFgColor,
    '',
  )
  const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(
    props.linetableBodyFgColor,
    '',
  )
  // const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( props.linetableBodyActiveRowBgColor, "#B9DFA9" );   //!default
  const backgroundColor = Util.getRgbaCSSStringFromAntdColor(
    props.linetableBgColor,
    '',
  )
  const headerRowUnderlineThickness = props.linetableHeaderRowUnderlineThickness
    ? props.linetableHeaderRowUnderlineThickness
    : 1 // !default
  const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
    props.linetableHeaderRowUnderlineColor,
    '#e0e0e0',
  ) // !default
  const bodyRowUnderlineThickness = props.linetableBodyRowUnderlineThickness
    ? props.linetableBodyRowUnderlineThickness
    : 1 // !default
  const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
    props.linetableBodyRowUnderlineColor,
    '#e0e0e0',
  ) // !default

  const lineButtonWidth = props.lineButtonWidth ? props.lineButtonWidth : 40 // !default
  const lineButtonHeight = props.lineButtonHeight ? props.lineButtonHeight : 40 // !default

  return (
    <Table
      style={{
        borderRadius: outerBorderRadius,
        borderWidth: outerBorderThickness,
        borderStyle: 'solid',
        borderColor: outerBorderColor,
        backgroundColor,
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
          style={{
            borderTopLeftRadius: outerBorderRadius,
            borderTopRightRadius: outerBorderRadius,
          }}
          textStyle={{ color: headerFgColor }}
          data={i18n.t('name')}
        ></Cell>
        <Cell
          textStyle={{ color: headerFgColor }}
          data={i18n.t('responder')}
        ></Cell>
        <Cell textStyle={{ color: headerFgColor }} data={i18n.t('line')}></Cell>
        <Cell
          textStyle={{ color: headerFgColor }}
          data={i18n.t('transfer')}
        ></Cell>
        <Cell
          style={{
            borderTopRightRadius: outerBorderRadius,
            borderBottomRightRadius: outerBorderRadius,
          }}
          data={i18n.t('camponDest')}
        ></Cell>
      </TableWrapper>
      <View
        style={{
          color: bodyFgColor,
        }}
      >
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
            lineButtonFgColor={props.lineButtonFgColor}
            lineButtonBgColor={props.lineButtonBgColor}
            lineButtonOuterBorderColor={props.lineButtonOuterBorderColor}
            lineButtonOuterBorderRadius={props.lineButtonOuterBorderRadius}
            lineButtonOuterBorderThickness={
              props.lineButtonOuterBorderThickness
            }
            transferButtonWidth={props.transferButtonWidth}
            transferButtonHeight={props.transferButtonHeight}
            transferButtonFgColor={props.transferButtonFgColor}
            transferButtonBgColor={props.transferButtonBgColor}
            transferButtonOuterBorderColor={
              props.transferButtonOuterBorderColor
            }
            transferButtonOuterBorderRadius={
              props.transferButtonOuterBorderRadius
            }
            transferButtonOuterBorderThickness={
              props.transferButtonOuterBorderThickness
            }
            transferCancelButtonWidth={props.transferCancelButtonWidth}
            transferCancelButtonHeight={props.transferCancelButtonHeight}
            transferCancelButtonFgColor={props.transferCancelButtonFgColor}
            transferCancelButtonBgColor={props.transferCancelButtonBgColor}
            transferCancelButtonOuterBorderColor={
              props.transferCancelButtonOuterBorderColor
            }
            transferCancelButtonOuterBorderRadius={
              props.transferCancelButtonOuterBorderRadius
            }
            transferCancelButtonOuterBorderThickness={
              props.transferCancelButtonOuterBorderThickness
            }
            context={context}
          />
        ))}
      </View>
    </Table>
  )
}

const styles = StyleSheet.create({
  marginLeftButton: {
    marginLeft: 6,
  },
})
