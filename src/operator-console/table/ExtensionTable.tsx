import { StyleSheet } from 'react-native'

import { Cell, Table, TableWrapper } from '../common/Table'
import { i18n } from '../i18n'
import { Util } from '../Util'

const EXTENSION_TABLE_TH_HEIGHT = 25 // 25px
const EXTENSION_TABLE_TD_HEIGHT = 30 // 30px

export const ExtensionTable = props => {
  let context = props.context
  let isEditmode
  let extensions
  let extensionsStatus
  if (!context) {
    // in edit mode
    context = {}
    const tableHeight = props.height
    const rowCount = Math.ceil(
      (tableHeight - EXTENSION_TABLE_TH_HEIGHT) / EXTENSION_TABLE_TD_HEIGHT,
    )
    extensions = new Array(rowCount)
    for (let i = 0; i < extensions.length; i++) {
      extensions[i] = { name: '\u00A0' }
    }
    extensionsStatus = {}
  } else {
    // Not in edit mode
    extensions = context.extensions
    extensionsStatus = context.extensionsStatus
    if (!extensions) {
      extensions = []
    }
    if (!extensionsStatus) {
      extensionsStatus = {}
    }
  }

  const outerBorderRadius = props.extensiontableOuterBorderRadius
    ? props.extensiontableOuterBorderRadius
    : 0 // !default
  const outerBorderThickness = props.extensiontableOuterBorderThickness
    ? props.extensiontableOuterBorderThickness
    : 0 // !default
  const outerBorderColor = Util.getRgbaCSSStringFromAntdColor(
    props.extensiontableOuterBorderColor,
    'rgb(0,0,0,0)',
  )
  const headerFgColor = Util.getRgbaCSSStringFromAntdColor(
    props.extensiontableHeaderFgColor,
    '',
  )
  const bodyFgColor = Util.getRgbaCSSStringFromAntdColor(
    props.extensiontableBodyFgColor,
    '',
  )
  // const bodyActiveRowBgColor = Util.getRgbaCSSStringFromAntdColor( props.extensiontableBodyActiveRowBgColor, "'#B9DFA9'" );   //!default
  const backgroundColor = Util.getRgbaCSSStringFromAntdColor(
    props.extensiontableBgColor,
    '',
  )
  const headerRowUnderlineThickness =
    props.extensiontableHeaderRowUnderlineThickness
      ? props.extensiontableHeaderRowUnderlineThickness
      : 1 // !default
  const headerRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
    props.extensiontableHeaderRowUnderlineColor,
    "'#e0e0e0'",
  ) // !default
  const bodyRowUnderlineThickness =
    props.extensiontableBodyRowUnderlineThickness
      ? props.extensiontableBodyRowUnderlineThickness
      : 1 // !default
  const bodyRowUnderlineColor = Util.getRgbaCSSStringFromAntdColor(
    props.extensiontableBodyRowUnderlineColor,
    "'#e0e0e0'",
  ) // !default

  const key = 0

  return (
    <Table
      style={{
        backgroundColor,
        borderWidth: outerBorderThickness,
        borderStyle: 'solid',
        borderColor: outerBorderColor,
      }}
    >
      <TableWrapper
        style={[
          styles.row,
          {
            backgroundColor,
            borderBottomWidth: headerRowUnderlineThickness,
            borderStyle: 'solid',
            borderColor: headerRowUnderlineColor,
          },
        ]}
      >
        <Cell
          data={i18n.t('id')}
          textStyle={{ textTransform: 'uppercase' }}
          style={{
            height: EXTENSION_TABLE_TH_HEIGHT,
            borderTopLeftRadius: outerBorderRadius,
            borderBottomLeftRadius: outerBorderRadius,
          }}
        />
        <Cell
          data={i18n.t('name')}
          textStyle={{ textTransform: 'uppercase' }}
          style={{
            height: EXTENSION_TABLE_TH_HEIGHT,
          }}
        />
        <Cell
          data={i18n.t('id')}
          textStyle={{ textTransform: 'uppercase' }}
          style={{
            height: EXTENSION_TABLE_TH_HEIGHT,
            borderTopRightRadius: outerBorderRadius,
            borderBottomRightRadius: outerBorderRadius,
          }}
        />
      </TableWrapper>
      {extensions.map(ext => (
        <TableWrapper
          style={[
            styles.row,
            {
              borderBottomWidth: bodyRowUnderlineThickness,
              borderStyle: 'solid',
              borderColor: bodyRowUnderlineColor,
            },
          ]}
        >
          <Cell
            style={{
              height: EXTENSION_TABLE_TD_HEIGHT,
              borderTopRightRadius: outerBorderRadius,
              borderBottomRightRadius: outerBorderRadius,
            }}
            data={ext?.id}
          />
          <Cell
            style={{
              height: EXTENSION_TABLE_TD_HEIGHT,
            }}
            data={ext?.name}
          />
          <Cell
            style={{
              height: EXTENSION_TABLE_TD_HEIGHT,
              borderTopLeftRadius: outerBorderRadius,
              borderBottomLeftRadius: outerBorderRadius,
            }}
            data={Object.values(
              extensionsStatus?.[ext?.id]?.callStatus || {},
            ).join(',')}
          />
        </TableWrapper>
      ))}
    </Table>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  row: {
    flexDirection: 'row',
  },
})
