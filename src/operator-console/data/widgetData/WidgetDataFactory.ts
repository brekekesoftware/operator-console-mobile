import { CallPanelWidgetData } from './CallPanelWidgetData'
import { CallTableWidgetData } from './CallTableWidgetData'
import { ExtensionTableWidgetData } from './ExtensionTableWidgetData'
import { LegacyExtensionStatusWidgetData } from './LegacyExtensionStatusWidgetData'
import { LegacyUccacWidgetData } from './LegacyUccacWidgetData'
import { LineTableWidgetData } from './LineTableWidgetData'
import { LegacyButtonWidgetData } from './LogacyButtonWidgetData'
import { NoteWidgetData } from './NoteWidgetData'
import { TextWidgetData } from './TextWidgetData'
import { WidgetData } from './WidgetData'

export class WidgetDataFactory {
  // !private
  constructor() {}

  static getStaticWidgetDataFactoryInstance() {
    return _INSTANCE
  }

  newWidgetDataInstance(options) {
    let widgetTypeId = options['widgetTypeId']
    if (widgetTypeId === undefined) {
      const oWidgetData = options.oWidgetData
      if (oWidgetData) {
        widgetTypeId = oWidgetData['widgetTypeId']
      }
    }
    let widgetData
    switch (widgetTypeId) {
      case WidgetData.WIDGET_TYPE_IDS.legacyButton:
        widgetData = new LegacyButtonWidgetData(options)
        break
      case WidgetData.WIDGET_TYPE_IDS.callPanel:
        widgetData = new CallPanelWidgetData(options)
        break
      case WidgetData.WIDGET_TYPE_IDS.legacyExtensionStatus:
        widgetData = new LegacyExtensionStatusWidgetData(options)
        break
      case WidgetData.WIDGET_TYPE_IDS.text:
        widgetData = new TextWidgetData(options)
        break
      case WidgetData.WIDGET_TYPE_IDS.callTable:
        widgetData = new CallTableWidgetData(options)
        break
      case WidgetData.WIDGET_TYPE_IDS.extensionTable:
        widgetData = new ExtensionTableWidgetData(options)
        break
      case WidgetData.WIDGET_TYPE_IDS.note:
        widgetData = new NoteWidgetData(options)
        break
      case WidgetData.WIDGET_TYPE_IDS.lineTable:
        widgetData = new LineTableWidgetData(options)
        break
      case WidgetData.WIDGET_TYPE_IDS.legacyUccac:
        widgetData = new LegacyUccacWidgetData(options)
        break
      default:
        console.error(
          'Widget data could not be created because the widgetTypeId is invalid. widgetTypeId=' +
            widgetTypeId,
        )
        widgetData = null
      // throw new Error("Widget data could not be created because the widgetTypeId is invalid. widgetTypeId=" + widgetTypeId );
    }
    return widgetData
  }
}
const _INSTANCE = new WidgetDataFactory()
