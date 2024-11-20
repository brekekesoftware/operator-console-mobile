import { WidgetData } from '../../../data/widgetData/WidgetData'
import { CallPanelEditorWidgetTemplate } from './CallPanelEditorWidgetTemplate'
import { CallTableEditorWidgetTemplate } from './CallTableEditorWidgetTemplate'
import { ExtensionTableEditorWidgetTemplate } from './ExtensionTableEditorWidgetTemplate'
import { LegacyButtonEditorWidgetTemplate } from './LegacyButtonEditorWidgetTemplate'
import { LegacyExtensionStatusEditorWidgetTemplate } from './LegacyExtensionStatusEditorWidgetTemplate'
import { LegacyUccacEditorWidgetTemplate } from './LegacyUccacEditorWidgetTemplate'
import { LineTableEditorWidgetTemplate } from './LineTableEditorWidgetTemplate'
import { NoteEditorWidgetTemplate } from './NoteEditorWidgetTemplate'
import { TextEditorWidgetTemplate } from './TextEditorWidgetTemplate'

export class EditorWidgetTemplateFactory {
  _EditorWidgetTemplates: object
  // !private
  constructor() {
    // const legacyButtonWidgetTypeId = WidgetData.WIDGET_TYPE_IDS.legacyButton;
    // this._EditorWidgetTemplates = Object.freeze({
    //     legacyButtonWidgetTypeId :   new LegacyButtonEditorWidgetTemplate(this)
    // });

    this._EditorWidgetTemplates = new Object() // !const
    this._EditorWidgetTemplates[WidgetData.WIDGET_TYPE_IDS.legacyButton] =
      new LegacyButtonEditorWidgetTemplate(this)
    this._EditorWidgetTemplates[WidgetData.WIDGET_TYPE_IDS.callPanel] =
      new CallPanelEditorWidgetTemplate(this)
    this._EditorWidgetTemplates[
      WidgetData.WIDGET_TYPE_IDS.legacyExtensionStatus
    ] = new LegacyExtensionStatusEditorWidgetTemplate(this)
    this._EditorWidgetTemplates[WidgetData.WIDGET_TYPE_IDS.text] =
      new TextEditorWidgetTemplate(this)
    this._EditorWidgetTemplates[WidgetData.WIDGET_TYPE_IDS.callTable] =
      new CallTableEditorWidgetTemplate(this)
    this._EditorWidgetTemplates[WidgetData.WIDGET_TYPE_IDS.extensionTable] =
      new ExtensionTableEditorWidgetTemplate(this)
    this._EditorWidgetTemplates[WidgetData.WIDGET_TYPE_IDS.note] =
      new NoteEditorWidgetTemplate(this)
    this._EditorWidgetTemplates[WidgetData.WIDGET_TYPE_IDS.lineTable] =
      new LineTableEditorWidgetTemplate(this)
    this._EditorWidgetTemplates[WidgetData.WIDGET_TYPE_IDS.legacyUccac] =
      new LegacyUccacEditorWidgetTemplate(this)
    Object.freeze(this._EditorWidgetTemplates)
  }

  static getStaticEditorWidgetSettingsFactoryInstance() {
    return _INSTANCE
  }

  getEditorWidgetTemplateArray() {
    const array = Object.values(this._EditorWidgetTemplates)
    return array
  }

  getEditorWidgetTemplateByWidgetTypeId(widgetTypeId) {
    const t = this._EditorWidgetTemplates[widgetTypeId]
    return t
  }
}
const _INSTANCE = new EditorWidgetTemplateFactory()
