import { Text } from 'react-native'

import { Input } from '../../../../common/Input'
import { i18n } from '../../../../i18n'
import { LegacyButtonEditorSubWidgetSettings } from './LegacyButtonEditorSubWidgetSettings'

export class LegacyButtonEditorSubWidgetSettings_parkCallButton extends LegacyButtonEditorSubWidgetSettings {
  constructor(
    legacyButtonEditorWidgetSettingsAsParent,
    legacyButtonEditorSubWidgetData,
  ) {
    super(
      legacyButtonEditorWidgetSettingsAsParent,
      legacyButtonEditorSubWidgetData,
    )
  }

  _onChangeLabel(e) {
    const label = e.currentTarget.value
    this._LegacyButtonEditorSubWidgetData.setLabel(label)
    this._LegacyButtonEditorWidgetSettingsAsParent
      .getEditScreenViewAsParent()
      .setState({ rerender: true })
  }

  _onChangeNumber(e) {
    const number = e.currentTarget.value
    this._LegacyButtonEditorSubWidgetData.setNumber(number)
    this._LegacyButtonEditorWidgetSettingsAsParent
      .getEditScreenViewAsParent()
      .setState({ rerender: true })
  }

  // !override
  getRenderJsx() {
    const subtypeName =
      this._LegacyButtonEditorSubWidgetData.getLegacyButtonWidgetSubTypeName()
    let sLabel
    if (this._LegacyButtonEditorSubWidgetData.getLabel()) {
      sLabel = this._LegacyButtonEditorSubWidgetData.getLabel()
    } else {
      sLabel = ''
    }

    let sNumber
    if (this._LegacyButtonEditorSubWidgetData.getNumber()) {
      sNumber = this._LegacyButtonEditorSubWidgetData.getNumber()
    } else {
      sNumber = ''
    }

    return (
      <>
        <Text>{i18n.t('label')}</Text>
        <Input
          placeholder={i18n.t(`legacy_button_label.${subtypeName}`)}
          allowClear
          value={sLabel}
          defaultValue={sLabel}
          onChange={e => this._onChangeLabel(e)}
        />
        <Text>{i18n.t('number')}</Text>
        <Input
          allowClear
          defaultValue={sNumber}
          onChange={e => this._onChangeNumber(e)}
        />
      </>
    )
  }
}
