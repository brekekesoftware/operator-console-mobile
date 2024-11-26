import { WidgetButton } from '../../../../common/WidgetButton'
import { BrekekeOperatorConsole } from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import { LegacyButtonRuntimeSubWidget } from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_keypadButton extends LegacyButtonRuntimeSubWidget {
  constructor(
    legacyButtonRuntimeWidgetAsParent,
    legacyButtonRuntimeSubWidgetData,
  ) {
    super(legacyButtonRuntimeWidgetAsParent, legacyButtonRuntimeSubWidgetData)
  }

  _getQuickCallDialingBySymbol(symbol, quickCallWidgetSubData) {
    if (!quickCallWidgetSubData) {
      return null
    }
    if (symbol === '0') {
      return quickCallWidgetSubData.getKeypadZero()
    }
    if (symbol === '1') {
      return quickCallWidgetSubData.getKeypadOne()
    }
    if (symbol === '2') {
      return quickCallWidgetSubData.getKeypadTwo()
    }
    if (symbol === '3') {
      return quickCallWidgetSubData.getKeypadThree()
    }
    if (symbol === '4') {
      return quickCallWidgetSubData.getKeypadFour()
    }
    if (symbol === '5') {
      return quickCallWidgetSubData.getKeypadFive()
    }
    if (symbol === '6') {
      return quickCallWidgetSubData.getKeypadSix()
    }
    if (symbol === '7') {
      return quickCallWidgetSubData.getKeypadSeven()
    }
    if (symbol === '8') {
      return quickCallWidgetSubData.getKeypadEight()
    }
    if (symbol === '9') {
      return quickCallWidgetSubData.getKeypadNine()
    }
    if (symbol === '*') {
      return quickCallWidgetSubData.getKeypadAsterisk()
    }
    if (symbol === '#') {
      return quickCallWidgetSubData.getKeypadSharp()
    }
    return null
  }

  // !override
  getRenderJsx() {
    const widgetData =
      this.getLegacyButtonSubWidgetData().getLegacyButtonWidgetDataAsParent()
    const cStyle = Util.getLegacyButtonEditorStyle(widgetData)
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const symbol = this._LegacyButtonRuntimeSubWidgetData.getSymbol()
    const iconJsx = this._getIconJsx('', symbol)
    return (
      <WidgetButton
        style={cStyle.s}
        textStyle={cStyle.tStyle}
        onPress={() => {
          const sDialing = this._getQuickCallDialingBySymbol(
            symbol,
            oc.getCurrentScreenQuickCallWidgetSubDataFromState(),
          )
          if (sDialing) {
            oc.setDialingAndMakeCall(sDialing)
          } else if (symbol) {
            oc.appendKeypadValue(symbol)
          }
        }}
      >
        {iconJsx}
      </WidgetButton>
    )
  }
}
