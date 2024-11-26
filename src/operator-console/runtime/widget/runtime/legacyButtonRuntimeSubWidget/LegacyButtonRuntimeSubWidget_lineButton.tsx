import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

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
    const cStyle = Util.getLegacyButtonEditorStyle(widgetData)

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

    const iconJsx = this._getIconJsx()
    return (
      <WidgetButton
        // className={clsx('kbc-button kbc-button-fill-parent', light)}
        style={cStyle.s}
        textStyle={cStyle.tStyle}
        onPress={() => oc.handleLine(line)}
      >
        {iconJsx}
      </WidgetButton>
    )
  }
}
