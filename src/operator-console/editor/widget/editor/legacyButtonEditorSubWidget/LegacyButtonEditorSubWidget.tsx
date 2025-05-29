import type {
  IconName,
  IconPrefix,
  IconProp,
} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Image } from 'react-native'

// !abstract
import { LegacyButtonWidgetSubData } from '../../../../data/widgetData/legacyButtonWidgetSubData/LegacyButtonWidgetSubData'
import { i18n } from '../../../../i18n'

export class LegacyButtonEditorSubWidget {
  _LegacyButtonEditorWidgetAsParent
  _LegacyButtonWidgetSubTypeId
  _LegacyButtonEditorSubWidgetData

  constructor(
    legacyButtonEditorWidgetAsParent,
    legacyButtonEditorSubWidgetData,
  ) {
    this._LegacyButtonEditorWidgetAsParent = legacyButtonEditorWidgetAsParent
    this._LegacyButtonWidgetSubTypeId =
      legacyButtonEditorSubWidgetData.getLegacyButtonWidgetSubTypeId()
    this._LegacyButtonEditorSubWidgetData = legacyButtonEditorSubWidgetData
  }

  _getLegacyButtonWidgetSubTypeName() {
    const subtypeName =
      LegacyButtonWidgetSubData.getLegacyButtonWidgetSubtypeName(
        this._LegacyButtonWidgetSubTypeId,
      )
    return subtypeName
  }

  getLegacyButtonSubWidgetData() {
    return this._LegacyButtonEditorSubWidgetData
  }

  // !abstract
  getRenderJsx() {
    throw new Error('Not implemented.')
  }

  _getIconJsx(icon: string = '', label = '') {
    const widgetData =
      this._LegacyButtonEditorSubWidgetData.getLegacyButtonWidgetDataAsParent()
    if (!icon) {
      icon = widgetData.getIcon()
    }

    if (!label && this._LegacyButtonEditorSubWidgetData.getLabel) {
      label = this._LegacyButtonEditorSubWidgetData.getLabel()
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
      let size: number | undefined = 30
      if (iconWidth !== undefined && iconWidth !== null) {
        oStyle['width'] = iconWidth
        size = undefined
      }
      if (iconHeight !== undefined && iconHeight !== null) {
        oStyle['height'] = iconHeight
        size = undefined
      }
      const [prefix, name] = icon.split(' ')
      const [_, iconName] = name.split('fa-')
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
