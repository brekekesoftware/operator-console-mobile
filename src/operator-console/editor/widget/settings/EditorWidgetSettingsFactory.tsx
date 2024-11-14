import { WidgetData } from '../../../data/widgetData/WidgetData'
import { CallPanelEditorWidgetSettings } from './CallPanelEditorWidgetSettings'
import { CallTableEditorWidgetSettings } from './CallTableEditorWidgetSettings'
import { ExtensionTableEditorWidgetSettings } from './ExtensionTableEditorWidgetSettings'
import { LegacyButtonEditorWidgetSettings } from './LegacyButtonEditorWidgetSettings'
import { LegacyExtensionStatusEditorWidgetSettings } from './LegacyExtensionStatusEditorWidgetSettings'
import { LegacyUccacEditorWidgetSettings } from './LegacyUccacEditorWidgetSettings'
import { LineTableEditorWidgetSettings } from './LineTableEditorWidgetSettings'
import { NoteEditorWidgetSettings } from './NoteEditorWidgetSettings'
import { TextEditorWidgetSettings } from './TextEditorWidgetSettings'

export class EditorWidgetSettingsFactory {
  // !private
  constructor() {}

  static getStaticEditorWidgetSettingsFactoryInstance() {
    return _INSTANCE
  }

  getRenderJsx(editScreenViewAsParent, widgetData) {
    const widgetTypeId = widgetData.getWidgetTypeId()
    let jsx
    switch (widgetTypeId) {
      case WidgetData.WIDGET_TYPE_IDS.legacyButton:
        jsx = (
          <LegacyButtonEditorWidgetSettings
            editScreenViewAsParent={editScreenViewAsParent}
            widgetData={widgetData}
          ></LegacyButtonEditorWidgetSettings>
        )
        break
      case WidgetData.WIDGET_TYPE_IDS.callPanel:
        jsx = (
          <CallPanelEditorWidgetSettings
            editScreenViewAsParent={editScreenViewAsParent}
            widgetData={widgetData}
          ></CallPanelEditorWidgetSettings>
        )
        break
      case WidgetData.WIDGET_TYPE_IDS.legacyExtensionStatus:
        jsx = (
          <LegacyExtensionStatusEditorWidgetSettings
            editScreenViewAsParent={editScreenViewAsParent}
            widgetData={widgetData}
          ></LegacyExtensionStatusEditorWidgetSettings>
        )
        break
      case WidgetData.WIDGET_TYPE_IDS.text:
        jsx = (
          <TextEditorWidgetSettings
            editScreenViewAsParent={editScreenViewAsParent}
            widgetData={widgetData}
          ></TextEditorWidgetSettings>
        )
        break
      case WidgetData.WIDGET_TYPE_IDS.callTable:
        jsx = (
          <CallTableEditorWidgetSettings
            editScreenViewAsParent={editScreenViewAsParent}
            widgetData={widgetData}
          ></CallTableEditorWidgetSettings>
        )
        break
      case WidgetData.WIDGET_TYPE_IDS.extensionTable:
        jsx = (
          <ExtensionTableEditorWidgetSettings
            editScreenViewAsParent={editScreenViewAsParent}
            widgetData={widgetData}
          ></ExtensionTableEditorWidgetSettings>
        )
        break
      case WidgetData.WIDGET_TYPE_IDS.note:
        jsx = (
          <NoteEditorWidgetSettings
            editScreenViewAsParent={editScreenViewAsParent}
            widgetData={widgetData}
          ></NoteEditorWidgetSettings>
        )
        break
      case WidgetData.WIDGET_TYPE_IDS.lineTable:
        jsx = (
          <LineTableEditorWidgetSettings
            editScreenViewAsParent={editScreenViewAsParent}
            widgetData={widgetData}
          ></LineTableEditorWidgetSettings>
        )
        break
      case WidgetData.WIDGET_TYPE_IDS.legacyUccac:
        jsx = (
          <LegacyUccacEditorWidgetSettings
            editScreenViewAsParent={editScreenViewAsParent}
            widgetData={widgetData}
          ></LegacyUccacEditorWidgetSettings>
        )
        break
      default:
        throw new Error(
          'The editor widget settings was not present. widgetTypeId=' +
            widgetTypeId,
        )
    }
    return jsx
  }
}
const _INSTANCE = new EditorWidgetSettingsFactory()
