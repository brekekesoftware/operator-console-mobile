import { ScrollView, View } from 'react-native'

import { Cell, Table, TableWrapper } from '../../../common/Table'
import { i18n } from '../../../i18n'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
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
      '#f8f8f8',
    )
    const headerRowUnderlineThickness =
      widgetData.getExtensiontableHeaderRowUnderlineThickness() ||
      widgetData.getExtensiontableHeaderRowUnderlineThickness() === 0
        ? widgetData.getExtensiontableHeaderRowUnderlineThickness()
        : 1 // !default
    const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getExtensiontableHeaderRowUnderlineColor(),
      '#e0e0e0',
    ) // !default
    const bodyRowUnderlineThickness =
      widgetData.getExtensiontableBodyRowUnderlineThickness() ||
      widgetData.getExtensiontableBodyRowUnderlineThickness() === 0
        ? widgetData.getExtensiontableBodyRowUnderlineThickness()
        : 1 // !default
    const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getExtensiontableBodyRowUnderlineColor(),
      '#e0e0e0',
    ) // !default
    const headerFontSize = widgetData.getExtensiontableHeaderFontSize()
      ? widgetData.getExtensiontableHeaderFontSize()
      : 14
    const bodyFontSize = widgetData.getExtensiontableBodyFontSize()
      ? widgetData.getExtensiontableBodyFontSize()
      : 14

    let key = 0
    return (
      <Table
        style={{
          borderRadius: outerBorderRadius,
          backgroundColor,
          borderWidth: outerBorderThickness,
          borderStyle: 'solid',
          borderColor: outerBorderColor,
          flex: 1,
        }}
      >
        <TableWrapper
          style={{
            borderBottomWidth: headerRowUnderlineThickness,
            borderStyle: 'solid',
            borderColor: headerRowUnderlineColor,
          }}
        >
          <Cell
            style={{
              borderTopRightRadius: outerBorderRadius,
              borderTopLeftRadius: outerBorderRadius,
            }}
            textStyle={{
              color: headerFgColor,
              fontSize: headerFontSize,
              textTransform: 'uppercase',
            }}
            data={i18n.t('id')}
          ></Cell>
          <Cell
            textStyle={{
              fontSize: headerFontSize,
              textTransform: 'uppercase',
              color: headerFgColor,
            }}
            data={i18n.t('name')}
          ></Cell>
          <Cell
            textStyle={{
              color: headerFgColor,
              fontSize: headerFontSize,
              textTransform: 'uppercase',
            }}
            style={{
              borderTopRightRadius: outerBorderRadius,
              borderBottomRightRadius: outerBorderRadius,
            }}
            data={i18n.t('status')}
          ></Cell>
        </TableWrapper>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            {extensions.map(ext => (
              <TableWrapper
                key={key++}
                style={{
                  borderBottomWidth: bodyRowUnderlineThickness,
                  borderStyle: 'solid',
                  borderColor: bodyRowUnderlineColor,
                }}
              >
                <Cell
                  textStyle={{ fontSize: bodyFontSize, color: bodyFgColor }}
                  style={{
                    borderTopRightRadius: outerBorderRadius,
                    borderBottomRightRadius: outerBorderRadius,
                  }}
                  data={ext?.id}
                ></Cell>
                <Cell
                  textStyle={{ fontSize: bodyFontSize, color: bodyFgColor }}
                  data={ext?.name}
                ></Cell>
                <Cell
                  textStyle={{ fontSize: bodyFontSize, color: bodyFgColor }}
                  style={{
                    borderTopRightRadius: outerBorderRadius,
                    borderBottomRightRadius: outerBorderRadius,
                  }}
                  data={Object.values(
                    extensionsStatus?.[ext?.id]?.callStatus || {},
                  ).join(',')}
                ></Cell>
              </TableWrapper>
            ))}
          </ScrollView>
        </View>
      </Table>
    )
  }
}
