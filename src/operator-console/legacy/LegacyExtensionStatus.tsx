import { View } from '@ant-design/react-native'
import { Text } from 'react-native'

import { i18n } from '../i18n'
import { OperatorConsoleStyles } from '../OperatorConsoleStyles'
import { Util } from '../Util'

export const LegacyExtensionStatus = ({
  extension,
  exStatusFgColor,
  context = { extensions: [], extensionsStatus: {} },
}: {
  context?: {
    extensions: Array<{ id: string; name: string }>
    extensionsStatus: Record<
      string,
      { callStatus: Record<string, string>; registered: boolean }
    >
  }
  extension: string
  exStatusFgColor: string
}) => {
  const { extensions, extensionsStatus } = context
  const ext = extensions.find(({ id }) => id == extension)
  const status = Object.values(
    extensionsStatus?.[ext?.id ?? '']?.callStatus || {},
  )
  const color = Util.isAntdRgbaProperty(exStatusFgColor)
    ? Util.getRgbaCSSStringFromAntdColor(exStatusFgColor)
    : ''

  return (
    <View>
      <View
        style={
          (status.find(s => s === 'talking') &&
            OperatorConsoleStyles['led-red']) ||
          (status.find(s => ['holding', 'calling', 'ringing'].includes(s)) &&
            OperatorConsoleStyles['led-yellow']) ||
          (extensionsStatus?.[ext?.id ?? '']?.registered
            ? OperatorConsoleStyles['led-green']
            : OperatorConsoleStyles['led-grey'])
        }
      >
        <Text style={{ color }}>
          {ext?.name || extension || i18n.t('extension_status')}
        </Text>
      </View>
    </View>
  )
}
