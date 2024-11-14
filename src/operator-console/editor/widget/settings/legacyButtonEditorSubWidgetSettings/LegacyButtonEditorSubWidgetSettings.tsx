// !abstract
export class LegacyButtonEditorSubWidgetSettings {
  _LegacyButtonEditorWidgetSettingsAsParent
  _LegacyButtonEditorSubWidgetData
  constructor(
    legacyButtonEditorWidgetSettingsAsParent,
    legacyButtonEditorSubWidgetData,
  ) {
    this._LegacyButtonEditorWidgetSettingsAsParent =
      legacyButtonEditorWidgetSettingsAsParent
    this._LegacyButtonEditorSubWidgetData = legacyButtonEditorSubWidgetData
  }

  // !abstract
  getRenderJsx() {
    throw new Error('Not implemented.')
  }
}
