import { i18n } from '../../../../i18n'
import BrekekeOperatorConsole from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import LegacyButtonRuntimeSubWidget from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_lineButton extends LegacyButtonRuntimeSubWidget {
  constructor(
    legacyButtonRuntimeWidgetAsParent,
    legacyButtonRuntimeSubWidgetData,
  ) {
    super(legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData)
  }

  // !override
  getRenderJsx() {
    const widgetData =
      this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent()
    const sButtonFontSize = widgetData.getFontSize()
      ? widgetData.getFontSize() + 'px'
      : '1rem' // !default
    const buttonFgColor = widgetData.getFgColor()
    const buttonBgColor = widgetData.getBgColor()
    const buttonOuterBorderColor = widgetData.getOuterBorderColor()
    const buttonOuterBorderThickness = widgetData.getOuterBorderThickness()
    const buttonOuterBorderRadius = widgetData.getOuterBorderRadius()

    const color = Util.isAntdRgbaProperty(buttonFgColor)
      ? Util.getRgbaCSSStringFromAntdColor(buttonFgColor)
      : ''
    const backgroundColor = Util.isAntdRgbaProperty(buttonBgColor)
      ? Util.getRgbaCSSStringFromAntdColor(buttonBgColor)
      : ''
    const border =
      Util.isNumeric(buttonOuterBorderThickness) &&
      Util.isAntdRgbaProperty(buttonOuterBorderColor)
        ? 'solid ' +
          buttonOuterBorderThickness +
          'px ' +
          Util.getRgbaCSSStringFromAntdColor(buttonOuterBorderColor)
        : ''
    const borderRadius = Util.isNumber(buttonOuterBorderRadius)
      ? buttonOuterBorderRadius + 'px'
      : ''

    const oc = BrekekeOperatorConsole.getStaticInstance()
    const callInfos = oc.getPhoneClient().getCallInfos()
    const myParksStatus = oc.getMyParksStatus()
    const linesStatus = oc.getLinesStatus()
    const parksStatus = oc.getParksStatus()
    const loginUser = oc.getLoginUser()

    const line = this._LegacyButtonRuntimeSubWidgetData.getLine()

    const { line_talker, room_id, status } = linesStatus[line] || {}
    let light = ''
    if (status === 'on') {
      const callInfo = room_id
        ? callInfos.getCallInfoWherePbxRoomIdEqual(room_id)
        : null
      const park = parksStatus[line]

      if (line_talker === loginUser?.pbxUsername) {
        light = 'kbc-button-success-flash'
      } else if (park) {
        light = myParksStatus[line]
          ? 'kbc-button-success-flash-slow'
          : 'kbc-button-danger-flash-slow'
      } else if (callInfo) {
        if (callInfo?.getIsIncoming() && !callInfo?.getIsAnswered()) {
          light = 'kbc-button-danger-flash'
        } else {
          light = 'kbc-button-success'
        }
      } else {
        light = 'kbc-button-danger'
      }
    }

    // if( light && light.length !== 0 ){
    //     //Use default.
    //     color = null;
    //     backgroundColor = null;
    // }

    const subtypeName = this._getLegacyButtonWidgetSubTypeName()
    const iconJsx = this._getIconJsx()
    return (
      <button
        title={i18n.t(`legacy_button_description.${subtypeName}`)}
        className={clsx('kbc-button kbc-button-fill-parent', light)}
        style={{
          fontSize: sButtonFontSize,
          border,
          borderRadius,
          color,
          backgroundColor,
        }}
        onClick={() => oc.handleLine(line)}
      >
        {iconJsx}
      </button>
    )
  }
}
