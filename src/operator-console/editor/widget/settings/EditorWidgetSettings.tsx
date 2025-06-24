import { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { Button } from '../../../common/Button'
import { Popconfirm } from '../../../common/Popconfirm'
import { i18n } from '../../../i18n'
import { Util } from '../../../Util'
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
            flex: 1,
            paddingLeft: 12,
            paddingRight: 12,
          }}
        >
          <ScrollView
            persistentScrollbar
            contentContainerStyle={{ gap: 16 }}
            style={Util.getStyleScrollBar()}
          >
            {this._getRenderMainJsx()}
          </ScrollView>
        </View>
        <View
          style={{
            paddingBottom: 12,
            paddingRight: 12,
            paddingLeft: 12,
            // height: 150,
          }}
        >
          <Popconfirm
            title={i18n.t('are_you_sure')}
            onConfirm={() =>
              this._EditScreenViewAsParent.onConfirmOkRemoveEditorWidget(
                widgetData,
              )
            }
            okText={i18n.t('yes')}
            cancelText={i18n.t('no')}
            popStyle={{ bottom: undefined, top: -80 }}
          >
            <Button disabled style={{ minWidth: 80 }}>
              {i18n.t('remove')}
            </Button>
          </Popconfirm>
        </View>
      </>
    )
    return jsx
  }
}
