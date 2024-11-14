import { i18n } from '../../../../i18n'
import BrekekeOperatorConsole from '../../../../OperatorConsole'
import { Util } from '../../../../Util'
import LegacyButtonRuntimeSubWidget from './LegacyButtonRuntimeSubWidget'

export class LegacyButtonRuntimeSubWidget_autoDialButton extends LegacyButtonRuntimeSubWidget {
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

    let color = Util.isAntdRgbaProperty(buttonFgColor)
      ? Util.getRgbaCSSStringFromAntdColor(buttonFgColor)
      : ''
    let backgroundColor = Util.isAntdRgbaProperty(buttonBgColor)
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
    const subWidgetData = this.getLegacyButtonSubWidgetData()
    const subWidgetDatas = oc.getShowAutoDialWidgetSubDatas_ver2()
    const isRedColor =
      subWidgetDatas &&
      BrekekeOperatorConsole._getIndexFromArray(
        subWidgetDatas,
        subWidgetData,
      ) !== -1

    if (isRedColor) {
      // use default
      color = null
      backgroundColor = null
    }

    const subtypeName = this._getLegacyButtonWidgetSubTypeName()
    const iconJsx = this._getIconJsx()
    return (
      <button
        title={i18n.t(`legacy_button_description.${subtypeName}`)}
        className={clsx(
          'kbc-button kbc-button-fill-parent',
          isRedColor && 'kbc-button-danger',
        )}
        style={{
          fontSize: sButtonFontSize,
          border,
          borderRadius,
          color,
          backgroundColor,
        }}
        onClick={() => oc.onClickAutoDialButton_ver2(this)}
      >
        {iconJsx}
      </button>
    )
  }
}
