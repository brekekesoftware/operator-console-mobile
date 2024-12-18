import { Text } from 'react-native'

import { Input } from '../../../../common/Input'
import { Select, SelectOption } from '../../../../common/Select'
import { i18n } from '../../../../i18n'
import { LegacyButtonEditorSubWidgetSettings } from './LegacyButtonEditorSubWidgetSettings'

export class LegacyButtonEditorSubWidgetSettings_oneTouchDialButton extends LegacyButtonEditorSubWidgetSettings {
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
    const sNumber = e.currentTarget.value
    this._LegacyButtonEditorSubWidgetData.setNumber(sNumber)
    this._LegacyButtonEditorWidgetSettingsAsParent
      .getEditScreenViewAsParent()
      .setState({ rerender: true })
  }

  _onChangeOnetouchdialMode(sOnetouchdialMode) {
    // const sOnetouchdialMode = e.currentTarget.value;
    this._LegacyButtonEditorSubWidgetData.setOnetouchdialMode(sOnetouchdialMode)
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
    const sNumber = this._LegacyButtonEditorSubWidgetData.getNumber()
      ? this._LegacyButtonEditorSubWidgetData.getNumber()
      : ''
    const onetouchdialMode =
      this._LegacyButtonEditorSubWidgetData.getOnetouchdialMode()
        ? this._LegacyButtonEditorSubWidgetData.getOnetouchdialMode()
        : 'callOnly'

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
          value={sNumber}
          defaultValue={sNumber}
          onChange={e => this._onChangeNumber(e)}
        />
        <Text>{i18n.t('mode')}</Text>
        <Select
          style={{ width: '100%' }}
          // placeholder="Please select a option"
          value={onetouchdialMode}
          defaultValue={onetouchdialMode}
          onSelect={e => this._onChangeOnetouchdialMode(e)}
          data={[
            { title: i18n.t('callOnly') },
            { title: i18n.t('attendedTransferOrCall') },
            { title: i18n.t('blindTransferOrCall') },
            { title: i18n.t('attendedTransferOnly') },
            { title: i18n.t('blindTransferOnly') },
          ]}
        >
          {/* <SelectOption value='callOnly'>{i18n.t('callOnly')}</SelectOption>
          <SelectOption value='attendedTransferOrCall'>
            {i18n.t('attendedTransferOrCall')}
          </SelectOption>
          <SelectOption value='blindTransferOrCall'>
            {i18n.t('blindTransferOrCall')}
          </SelectOption>
          <SelectOption value='attendedTransferOnly'>
            {i18n.t('attendedTransferOnly')}
          </SelectOption>
          <SelectOption value='blindTransferOnly'>
            {i18n.t('blindTransferOnly')}
          </SelectOption> */}
        </Select>
      </>
    )
  }
}
