import { i18n } from '../../../i18n'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { Util } from '../../../Util'
import { EditorWidget } from './EditorWidget'

export class LegacyExtensionStatusEditorWidget extends EditorWidget {
  constructor(props) {
    super(props)
  }

  // !overload
  _getRenderMainJsx() {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    const extensions = oc.getExtensions()
    const extensionsStatus = oc.getExtensionsStatus()
    const widgetData = this.getWidgetData()
    const extension = widgetData.getExtension()
    const ext = extensions.find(({ id }) => id == extension)
    const status = Object.values(extensionsStatus?.[ext?.id]?.callStatus || {})
    const extensionStatusFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getExtensionStatusFgColor(),
      '',
    )
    const extensionStatusLampSize = widgetData.getExtensionStatusLampSize()
      ? widgetData.getExtensionStatusLampSize()
      : 16 // !defaultValue
    const extensionStatusExtensionFontSize =
      widgetData.getExtensionStatusExtensionFontSize()
        ? widgetData.getExtensionStatusExtensionFontSize()
        : 12 // !defaultValue
    const extensionStatusExtensionTextTopMargin =
      widgetData.getExtensionStatusExtensionTextTopMargin()
        ? widgetData.getExtensionStatusExtensionTextTopMargin()
        : 12 // !defaultValue

    return (
      <div
        className='led-box'
        style={{
          color: extensionStatusFgColor,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: extensionStatusLampSize,
              height: extensionStatusLampSize,
            }}
            className={
              (status.find(s => s === 'talking') && 'led-red') ||
              (status.find(s =>
                ['holding', 'calling', 'ringing'].includes(s),
              ) &&
                'led-yellow') ||
              (extensionsStatus?.[ext?.id]?.registered
                ? 'led-green'
                : 'led-grey')
            }
          ></div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: extensionStatusExtensionTextTopMargin,
          }}
        >
          <span style={{ fontSize: extensionStatusExtensionFontSize }}>
            {ext?.name || extension || i18n.t('extension_status')}
          </span>
        </div>
      </div>
    )
  }
}
