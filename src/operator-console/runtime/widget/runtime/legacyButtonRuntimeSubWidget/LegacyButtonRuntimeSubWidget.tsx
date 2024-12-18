import type {
  IconName,
  IconPrefix,
  IconProp,
} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Image } from 'react-native'

import { LegacyButtonWidgetSubData } from '../../../../data/widgetData/legacyButtonWidgetSubData/LegacyButtonWidgetSubData'
import { i18n } from '../../../../i18n'

// !abstract
export class LegacyButtonRuntimeSubWidget {
  _LegacyButtonRuntimeWidgetAsParent
  _LegacyButtonWidgetSubTypeId: string
  _LegacyButtonRuntimeSubWidgetData
  constructor(
    legacyButtonRuntimeWidgetAsParent,
    legacyButtonRuntimeSubWidgetData,
  ) {
    this._LegacyButtonRuntimeWidgetAsParent = legacyButtonRuntimeWidgetAsParent
    this._LegacyButtonWidgetSubTypeId =
      legacyButtonRuntimeSubWidgetData.getLegacyButtonWidgetSubTypeId()
    this._LegacyButtonRuntimeSubWidgetData = legacyButtonRuntimeSubWidgetData
  }

  getLegacyButtonSubWidgetData() {
    return this._LegacyButtonRuntimeSubWidgetData
  }

  _getLegacyButtonWidgetSubTypeName() {
    const subtypeName =
      LegacyButtonWidgetSubData.getLegacyButtonWidgetSubtypeName(
        this._LegacyButtonWidgetSubTypeId,
      )
    return subtypeName
  }

  // !abstract
  getRenderJsx() {
    throw new Error('Not implemented.')
  }

  _getIconJsx(icon: string = '', label = '') {
    const widgetData =
      this._LegacyButtonRuntimeSubWidgetData.getLegacyButtonWidgetDataAsParent()
    if (!icon) {
      icon = widgetData.getIcon()
    }

    if (!label && this._LegacyButtonRuntimeSubWidgetData.getLabel) {
      label = this._LegacyButtonRuntimeSubWidgetData.getLabel()
    }

    if (!label) {
      const subtypeName = this._getLegacyButtonWidgetSubTypeName()
      label = i18n.t(`legacy_button_label.${subtypeName}`)
    }

    let iconJsx
    if (!icon) {
      iconJsx = label
    } else if (icon.startsWith('PATH:')) {
      const src = icon.substring(5, icon.length) // 5 is path:
      const iconWidth = widgetData.getIconWidth()
        ? widgetData.getIconWidth()
        : 32
      const iconHeight = widgetData.getIconHeight()
        ? widgetData.getIconHeight()
        : 32
      iconJsx = (
        <Image source={{ uri: src }} width={iconWidth} height={iconHeight} />
      )
    } else {
      const iconWidth = widgetData.getIconWidth()
      const iconHeight = widgetData.getIconHeight()
      const oStyle = {}
      let size: number | null = 30
      if (iconWidth !== undefined && iconWidth !== null) {
        oStyle['width'] = iconWidth
        size = null
      }
      if (iconHeight !== undefined && iconHeight !== null) {
        oStyle['height'] = iconHeight
        size = null
      }
      const [prefix, name] = icon.split(' ')
      const [_, iconName] = name.split('-')
      const fIcon = [prefix, iconName] as [IconPrefix, IconName]
      if (size === null) {
        iconJsx = <FontAwesomeIcon style={oStyle} icon={fIcon} />
      } else {
        iconJsx = <FontAwesomeIcon size={size} icon={fIcon} />
      }
    }
    return iconJsx
  }
}
