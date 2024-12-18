import { Text } from 'react-native'

import { Input } from '../../../../common/Input'
import { i18n } from '../../../../i18n'
import { LegacyButtonEditorSubWidgetSettings } from './LegacyButtonEditorSubWidgetSettings'

export class LegacyButtonEditorSubWidgetSettings_keypadButton extends LegacyButtonEditorSubWidgetSettings {
  constructor(
    legacyButtonEditorWidgetSettingsAsParent,
    legacyButtonEditorSubWidgetData,
  ) {
    super(
      legacyButtonEditorWidgetSettingsAsParent,
      legacyButtonEditorSubWidgetData,
    )
  }

  _onChangeSymbol(e) {
    const symbol = e.currentTarget.value
    this._LegacyButtonEditorSubWidgetData.setSymbol(symbol)
    this._LegacyButtonEditorWidgetSettingsAsParent
      .getEditScreenViewAsParent()
      .setState({ rerender: true })
  }

  // !override
  getRenderJsx() {
    const subtypeName =
      this._LegacyButtonEditorSubWidgetData.getLegacyButtonWidgetSubTypeName()
    let sSymbol
    if (this._LegacyButtonEditorSubWidgetData.getSymbol()) {
      sSymbol = this._LegacyButtonEditorSubWidgetData.getSymbol()
    } else {
      sSymbol = ''
    }
    return (
      <>
        <Text>{i18n.t('symbol')}</Text>
        <Input
          maxLength={1}
          allowClear
          value={sSymbol}
          defaultValue={sSymbol}
          onChange={e => this._onChangeSymbol(e)}
        />
      </>
    )
  }
}
