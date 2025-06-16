import { useEffect, useRef } from 'react'
import {
  InteractionManager,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { GridLines } from '../common/GridLines'
import { Util } from '../Util'
import { EditorWidgetFactory } from './widget/editor/EditorWidgetFactory'

export const EditorTabChildren = ({
  widgetDataArray,
  editingScreenGrid,
  tabId,
  editorPaneAsParent,
  editScreenView,
  paneData,
}) => {
  const refLayout = useRef<View | null>(null)
  const refScroll = useRef<View | HTMLElement | null>(null)

  useEffect(() => {
    const { width: w, height: h } = Util.caculateCanvasSize(widgetDataArray)
    InteractionManager.runAfterInteractions(() => {
      refLayout?.current?.measure((fx, fy, width, height, px, py) => {
        if (refScroll.current) {
          if (Platform.OS !== 'web') {
            const el = refScroll.current as View
            el.setNativeProps({
              style: {
                width: w < width ? width : w,
                height: h < height ? height : h,
              },
            })
          } else {
            const el = refScroll.current as HTMLElement
            el.style.width = w < width ? `${width}px` : `${w}px`
            el.style.height = h < height ? `${height}px` : `${h}px`
          }
        }
      })
    })
  })

  return (
    <View
      style={[{ width: '100%', height: '100%', flex: 1 }]}
      // onLayout={e => (refLayout.current = e.nativeEvent.layout)}
      ref={refLayout}
      collapsable={false}
    >
      <GridLines
        data-broc-tab-id={tabId}
        style={{ flex: 1, overflow: 'hidden' }}
        strokeWidth={2}
        cellWidth={editingScreenGrid * 10}
        cellWidth2={editingScreenGrid}
        cellHeight={editingScreenGrid * 10}
        cellHeight2={editingScreenGrid}
      >
        <ScrollView horizontal bounces={false}>
          <ScrollView bounces={false}>
            <TouchableWithoutFeedback
              onPress={() => {
                editScreenView.onMouseDownEditorPaneInSettingsMode(
                  paneData.getPaneNumber(),
                )
              }}
              accessible={false}
            >
              <View ref={refScroll}>
                {widgetDataArray.map((widgetData, index) => {
                  const options = {
                    editorPane: editorPaneAsParent,
                    widgetData,
                    jsxKey: widgetData._widgetUuid,
                  }
                  const widgetJsx =
                    EditorWidgetFactory.getStaticEditorWidgetFactoryInstance().getEditorWidgetJsx(
                      options,
                    )
                  return widgetJsx
                })}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </ScrollView>
      </GridLines>
    </View>
  )
}
