import { Component } from 'react'
import { Text, View } from 'react-native'

import { Button } from '../../../common/Button'
import { Popconfirm } from '../../../common/Popconfirm'
import { i18n } from '../../../i18n'
import type { EditScreenView } from '../../EditScreenView'

// !abstract
type Props = {
  editScreenViewAsParent: EditScreenView
  widgetData: any
}
type State = {
  nameOptions: any
}
export class EditorWidgetSettings extends Component<Props, State> {
  _EditScreenViewAsParent
  constructor(props) {
    super(props)
    this._EditScreenViewAsParent = props['editScreenViewAsParent']
  }

  _getWidgetData() {
    return this.props['widgetData']
  }

  _getRenderMainJsx(): React.ReactNode {
    throw new Error('Not implemented.')
  }

  componentDidUpdate() {
    // empty( for subclass )
  }

  componentDidMount() {
    // empty( for subclass )
  }

  getEditScreenViewAsParent() {
    return this._EditScreenViewAsParent
  }

  render() {
    const widgetData = this._getWidgetData()
    const widgetNameForII18n = widgetData.getWidgetNameForI18n()
    const jsx = (
      <>
        <View style={{ paddingTop: 12, paddingRight: 12, paddingLeft: 12 }}>
          <Text> {i18n.t(`widget_description.${widgetNameForII18n}`)}</Text>
        </View>
        <View
          style={{
            overflow: 'scroll',
            flexGrow: 1,
            height: 0,
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          {this._getRenderMainJsx()}
        </View>
        <View style={{ paddingBottom: 12, paddingRight: 12, paddingLeft: 12 }}>
          <Popconfirm
            title={i18n.t('are_you_sure')}
            onConfirm={() =>
              this._EditScreenViewAsParent.onConfirmOkRemoveEditorWidget(
                widgetData,
              )
            }
            okText={i18n.t('yes')}
            cancelText={i18n.t('no')}
          >
            <Button type='warning'>{i18n.t('remove')}</Button>
          </Popconfirm>
        </View>
      </>
    )
    return jsx
  }
}
