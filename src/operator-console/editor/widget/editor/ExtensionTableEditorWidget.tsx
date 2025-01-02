import type { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { ScrollView, View } from 'react-native'

import { Cell, Table, TableWrapper } from '../../../common/Table'
import { i18n } from '../../../i18n'
import { Util } from '../../../Util'
import { EditorWidget } from './EditorWidget'

const EXTENSION_TABLE_TH_HEIGHT = 25 // 25px
const EXTENSION_TABLE_TD_HEIGHT = 30 // 30px

export class ExtensionTableEditorWidget extends EditorWidget {
  _Extensions
  _ExtensionsStatus
  constructor(props, context) {
    super(props, context)
    this._Extensions = Object.freeze([
      { id: '12345678', name: i18n.t('DummyExtensionName') + '(1)' },
      { id: '87654321', name: i18n.t('DummyExtensionName') + '(2)' },
    ])
    this._ExtensionsStatus = Object.freeze({
      12345678: 'calling',
      87654321: 'ringing',
    })
  }

  // !overload
  _getRenderMainJsx() {
    const widgetData = this.getWidgetData()
    // const tableHeight = widgetData.getWidgetHeight();
    // const rowCount = Math.ceil( ( tableHeight - EXTENSION_TABLE_TH_HEIGHT ) / EXTENSION_TABLE_TD_HEIGHT  );
    // const extensions =  new Array( rowCount );
    // for( let i = 0; i < extensions.length; i++ ){
    //     extensions[i] = {name:"\u00A0"};
    // }
    // const extensionsStatus = {};

    // const rowCount = EXTENSIONS.length;
    const extensions = this._Extensions
    const extensionsStatus = this._ExtensionsStatus

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
      fontSize: headerFontSize,
      textTransform: 'uppercase',
      color: headerFgColor,
      textAlign: 'center',
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
                borderTopLeftRadius: outerBorderRadius,
                borderTopRightRadius: outerBorderRadius,
              },
              cStyle,
            ]}
            textStyle={hStyle}
            data={i18n.t('id')}
          ></Cell>
          <Cell textStyle={hStyle} data={i18n.t('name')} style={cStyle}></Cell>
          <Cell
            style={{
              borderTopRightRadius: outerBorderRadius,
              borderBottomRightRadius: outerBorderRadius,
            }}
            textStyle={hStyle}
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
                  minHeight: 35,
                }}
              >
                <Cell
                  style={{
                    borderTopRightRadius: outerBorderRadius,
                    borderBottomRightRadius: outerBorderRadius,
                  }}
                  textStyle={{ color: bodyFgColor, fontSize: bodyFontSize }}
                  data={ext?.id}
                ></Cell>
                <Cell
                  textStyle={{
                    fontSize: bodyFontSize,
                    color: bodyFgColor,
                    // height:EXTENSION_TABLE_TD_HEIGHT
                  }}
                  data={ext?.name}
                ></Cell>
                <Cell
                  style={{
                    // height:EXTENSION_TABLE_TD_HEIGHT,
                    borderTopRightRadius: outerBorderRadius,
                    borderBottomRightRadius: outerBorderRadius,
                  }}
                  textStyle={{ color: bodyFgColor, fontSize: bodyFontSize }}
                  data={extensionsStatus[ext.id]}
                ></Cell>
              </TableWrapper>
            ))}
          </ScrollView>
        </View>
      </Table>
    )
  }
}
