import { Text, View } from 'react-native'

import { i18n } from '../../../i18n'
import { OCUtil } from '../../../OCUtil'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { OperatorConsoleStyles } from '../../../OperatorConsoleStyles'
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

    const className = OCUtil.getExtensionStatusClassName(
      ext?.id,
      extensionsStatus,
    )

    return (
      <View>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <View
            style={[
              {
                width: extensionStatusLampSize,
                height: extensionStatusLampSize,
              },
              OperatorConsoleStyles[className],
            ]}
          ></View>
        </View>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: extensionStatusExtensionTextTopMargin,
          }}
        >
          <Text
            style={{
              fontSize: extensionStatusExtensionFontSize,
              color: extensionStatusFgColor,
            }}
          >
            {ext?.name || extension || i18n.t('extension_status')}
          </Text>
        </View>
      </View>
    )
  }
}
