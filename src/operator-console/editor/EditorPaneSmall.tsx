import { forwardRef, useEffect, useRef } from 'react'
import {
  Keyboard,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { GridLines } from '../common/GridLines'
import { dndEventEmiter } from '../lib/rnd/DndEventEmiter'
import { Util } from '../Util'
import { EditorWidgetFactory } from './widget/editor/EditorWidgetFactory'

export const EditorPaneSmall = forwardRef((props: any, ref: any) => {
  const refEditor = useRef<View | null>()
  const refScroll = useRef<View | HTMLElement | null>(null)

  const isDropZone = (gesture, measure) => {
    if (measure) {
      return (
        gesture.moveX > measure.px &&
        gesture.moveX < measure.px + measure.width &&
        gesture.moveY > measure.py &&
        gesture.moveY < measure.py + measure.height
      )
    }
    return false
  }

  useEffect(() => {
    const paneData = props['paneData']
    dndEventEmiter.on('drop', d => {
      if (!paneData.getEnableTabs()) {
        refEditor?.current?.measure((fx, fy, width, height, px, py) => {
          if (
            isDropZone(
              { moveX: d.nX, moveY: d.nY },
              { fx, fy, width, height, px, py },
            )
          ) {
            console.log('#Duy Phan console drop', Date.now())
            props._onDrop({ ...d, px, py })
          }
        })
      }
    })
  }, [])

  useEffect(() => {
    const { width: w, height: h } = Util.caculateCanvasSize(
      props.widgetDataArray,
    )
    refEditor?.current?.measure((fx, fy, width, height, px, py) => {
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
          console.log('#Duy Phan console htmlW', w, h, width, height)
          el.style.width = w < width ? `${width}px` : `${w}px`
          el.style.height = h < height ? `${height}px` : `${h}px`
        }
      }
    })
  })

  return (
    <View
      data-br-container-id={props.paneData.getPaneNumber()}
      ref={r => {
        refEditor.current = r
        ref.current = r
      }}
      collapsable={false}
      style={[{ width: '100%', height: '100%' }, props.style, props.css]}
    >
      <GridLines
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
        strokeWidth={2}
        cellWidth={props.editingScreenGrid * 10}
        cellWidth2={props.editingScreenGrid}
        cellHeight={props.editingScreenGrid * 10}
        cellHeight2={props.editingScreenGrid}
      >
        <ScrollView
          horizontal
          bounces={false}
          keyboardShouldPersistTaps='handled'
          style={Util.getStyleScrollBar()}
        >
          <ScrollView bounces={false} keyboardShouldPersistTaps='handled'>
            <TouchableWithoutFeedback
              onPress={() => {
                props.editScreenView.onMouseDownEditorPaneInSettingsMode(
                  props.paneData.getPaneNumber(),
                )
                Keyboard.dismiss()
              }}
              accessible={false}
            >
              <View ref={refScroll}>
                {props.widgetDataArray.map((widgetData, index) => {
                  const widgetJsx =
                    EditorWidgetFactory.getStaticEditorWidgetFactoryInstance().getEditorWidgetJsx(
                      {
                        editorPane: props.editorPane,
                        widgetData,
                        jsxKey: widgetData._widgetUuid,
                      },
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
})
