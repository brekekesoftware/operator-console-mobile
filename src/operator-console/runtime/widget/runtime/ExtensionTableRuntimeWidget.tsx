import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { ScrollView, View } from 'react-native'

import { Cell, Table, TableWrapper } from '../../../common/Table'
import { i18n } from '../../../i18n'
import { BrekekeOperatorConsole } from '../../../OperatorConsole'
import { Util } from '../../../Util'
import { RuntimeWidget } from './RuntimeWidget'

const EXTENSION_TABLE_TH_HEIGHT = 25 // 25px
const EXTENSION_TABLE_TD_HEIGHT = 30 // 30px

export class ExtensionTableRuntimeWidget extends RuntimeWidget {
  constructor(props, context) {
    super(props, context)
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
      this.context.fgColor,
    )
    const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(
      widgetData.getExtensiontableBodyFgColor(),
      this.context.fgColor,
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
    const hStyle: StyleProp<TextStyle> = {
      color: headerFgColor,
      fontSize: headerFontSize,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    }
    const cStyle: StyleProp<ViewStyle> = {
      padding: 10,
    }
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
            style={[
              {
                borderTopRightRadius: outerBorderRadius,
                borderTopLeftRadius: outerBorderRadius,
              },
              cStyle,
            ]}
            textStyle={hStyle}
            data={i18n.t('id')}
          ></Cell>
          <Cell
            textStyle={{
              fontSize: headerFontSize,
              textTransform: 'uppercase',
              color: headerFgColor,
              fontWeight: 'bold',
            }}
            data={i18n.t('name')}
          ></Cell>
          <Cell
            textStyle={hStyle}
            style={[
              {
                borderTopRightRadius: outerBorderRadius,
                borderBottomRightRadius: outerBorderRadius,
              },
              cStyle,
            ]}
            data={i18n.t('status')}
          ></Cell>
        </TableWrapper>
        <View style={{ flex: 1 }}>
          <ScrollView>
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
                  style={[
                    {
                      borderTopRightRadius: outerBorderRadius,
                      borderBottomRightRadius: outerBorderRadius,
                    },
                    cStyle,
                  ]}
                  data={ext?.id}
                ></Cell>
                <Cell
                  textStyle={{ fontSize: bodyFontSize, color: bodyFgColor }}
                  data={ext?.name}
                  style={cStyle}
                ></Cell>
                <Cell
                  textStyle={{ fontSize: bodyFontSize, color: bodyFgColor }}
                  style={[
                    {
                      borderTopRightRadius: outerBorderRadius,
                      borderBottomRightRadius: outerBorderRadius,
                    },
                    cStyle,
                  ]}
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
