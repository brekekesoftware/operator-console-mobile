import { Input } from '@ant-design/react-native'
import { Text } from 'react-native'

import { i18n } from '../../../../i18n'
import { LegacyButtonEditorSubWidgetSettings } from './LegacyButtonEditorSubWidgetSettings'

export class LegacyButtonEditorSubWidgetSettings_lineButton extends LegacyButtonEditorSubWidgetSettings {
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

  _onChangeLine(e) {
    const line = e.currentTarget.value
    this._LegacyButtonEditorSubWidgetData.setLine(line)
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
    let sLine
    if (this._LegacyButtonEditorSubWidgetData.getLine()) {
      sLine = this._LegacyButtonEditorSubWidgetData.getLine()
    } else {
      sLine = ''
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
        <Text>{i18n.t('line')}</Text>
        <Input
          allowClear
          defaultValue={sLine}
          onChange={e => this._onChangeLine(e)}
        />
      </>
    )
  }
}
