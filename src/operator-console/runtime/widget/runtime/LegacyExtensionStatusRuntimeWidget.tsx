import { Text, View } from 'react-native'

import { i18n } from '../../../i18n'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { OperatorConsoleStyles } from '../../../OperatorConsoleStyles'
import { Util } from '../../../Util'
import { RuntimeWidget } from './RuntimeWidget'

export class LegacyExtensionStatusRuntimeWidget extends RuntimeWidget {
  constructor(props, context) {
    super(props, context)
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
      this.context.fgColor,
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

    const s =
      (status.find(s => s === 'talking') && OperatorConsoleStyles['led-red']) ||
      (status.find(s => ['holding', 'calling', 'ringing'].includes(s)) &&
        OperatorConsoleStyles['led-yellow']) ||
      (extensionsStatus?.[ext?.id]?.registered
        ? 'led-green'
        : OperatorConsoleStyles['led-grey'])

    return (
      <View style={OperatorConsoleStyles['led-box']}>
        <View style={{ display: 'flex', justifyContent: 'center' }}>
          <View
            style={[
              {
                width: extensionStatusLampSize,
                height: extensionStatusLampSize,
              },
              s,
            ]}
          ></View>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
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
