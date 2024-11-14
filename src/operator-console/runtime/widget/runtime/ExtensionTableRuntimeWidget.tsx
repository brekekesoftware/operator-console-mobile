import { i18n } from '../../../i18n'
import BrekekeOperatorConsole from '../../../OperatorConsole'
import { Util } from '../../../Util'
import { RuntimeWidget } from './RuntimeWidget'

const EXTENSION_TABLE_TH_HEIGHT = 25 // 25px
const EXTENSION_TABLE_TD_HEIGHT = 30 // 30px

export class ExtensionTableRuntimeWidget extends RuntimeWidget {
  constructor(props) {
    super(props)
  }

  // !overload
  _getRenderMainJsx() {
    const oc = BrekekeOperatorConsole.getStaticInstance()
    let extensions = oc.getExtensions()
    let extensionsStatus = oc.getExtensionsStatus()
    if (!extensions) {
      extensions = []
    }
    if (!extensionsStatus) {
      extensionsStatus = {}
    }

    const widgetData = this.getWidgetData()
    const outerBorderRadius =
      widgetData.getExtensiontableOuterBorderRadius() ||
      widgetData.getExtensiontableOuterBorderRadius() === 0
        ? widgetData.getExtensiontableOuterBorderRadius()
        : 0 // !default
    const outerBorderThickness =
      widgetData.getExtensiontableOuterBorderThickness() ||
      widgetData.getExtensiontableOuterBorderThickness() === 0
        ? widgetData.getExtensiontableOuterBorderThickness()
        : 0 // !default
    const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getExtensiontableOuterBorderColor(),
      'rgb(0,0,0,0)',
    )
    const headerFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getExtensiontableHeaderFgColor(),
      '',
    )
    const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getExtensiontableBodyFgColor(),
      '',
    )
    // const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( props.extensiontableBodyActiveRowBgColor, "'#B9DFA9'" );   //!default
    const backgroundColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getExtensiontableBgColor(),
      '',
    )
    const headerRowUnderlineThickness =
      widgetData.getExtensiontableHeaderRowUnderlineThickness() ||
      widgetData.getExtensiontableHeaderRowUnderlineThickness() === 0
        ? widgetData.getExtensiontableHeaderRowUnderlineThickness()
        : 1 // !default
    const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getExtensiontableHeaderRowUnderlineColor(),
      "'#e0e0e0'",
    ) // !default
    const bodyRowUnderlineThickness =
      widgetData.getExtensiontableBodyRowUnderlineThickness() ||
      widgetData.getExtensiontableBodyRowUnderlineThickness() === 0
        ? widgetData.getExtensiontableBodyRowUnderlineThickness()
        : 1 // !default
    const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getExtensiontableBodyRowUnderlineColor(),
      "'#e0e0e0'",
    ) // !default
    const headerFontSize = widgetData.getExtensiontableHeaderFontSize()
      ? widgetData.getExtensiontableHeaderFontSize()
      : 14
    const bodyFontSize = widgetData.getExtensiontableBodyFontSize()
      ? widgetData.getExtensiontableBodyFontSize()
      : 14

    let key = 0
    return (
      <table
        className='brOCExtensiontable'
        style={{
          borderRadius: outerBorderRadius,
          border: outerBorderThickness + 'px solid ' + outerBorderColor,
          backgroundColor,
        }}
      >
        <thead>
          <tr
            style={{
              color: headerFgColor,
              borderBottom:
                headerRowUnderlineThickness +
                'px solid ' +
                headerRowUnderlineColor,
            }}
          >
            <th
              style={{
                fontSize: headerFontSize + 'px',
                textTransform: 'uppercase',
                // height:EXTENSION_TABLE_TH_HEIGHT,
                borderRadius: outerBorderRadius + 'px 0 0 0',
              }}
            >
              {i18n.t('id')}
            </th>
            <th
              style={{
                fontSize: headerFontSize + 'px',
                textTransform: 'uppercase',
                // height:EXTENSION_TABLE_TH_HEIGHT,
              }}
            >
              {i18n.t('name')}
            </th>
            <th
              style={{
                fontSize: headerFontSize + 'px',
                textTransform: 'uppercase',
                // height:EXTENSION_TABLE_TH_HEIGHT,
                borderRadius: '0 ' + outerBorderRadius + 'px 0 0',
              }}
            >
              {i18n.t('status')}
            </th>
          </tr>
        </thead>
        <tbody
          style={{
            color: bodyFgColor,
          }}
        >
          {extensions.map(ext => (
            <tr
              key={key++}
              style={{
                color: bodyFgColor,
                borderBottom:
                  bodyRowUnderlineThickness +
                  'px solid ' +
                  bodyRowUnderlineColor,
              }}
            >
              <td
                style={{
                  fontSize: bodyFontSize + 'px',
                  // height:EXTENSION_TABLE_TD_HEIGHT,
                  borderRadius: '0 ' + outerBorderRadius + 'px 0 0',
                }}
              >
                {ext?.id}
              </td>
              <td
                style={{
                  fontSize: bodyFontSize + 'px',
                  // height:EXTENSION_TABLE_TD_HEIGHT
                }}
              >
                {ext?.name}
              </td>
              <td
                style={{
                  fontSize: bodyFontSize + 'px',
                  // height:EXTENSION_TABLE_TD_HEIGHT,
                  borderRadius: '0 ' + outerBorderRadius + 'px 0 0 ',
                }}
              >
                {Object.values(
                  extensionsStatus?.[ext?.id]?.callStatus || {},
                ).join(',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
