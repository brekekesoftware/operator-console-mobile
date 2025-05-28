import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import {
  Keyboard,
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
  const refScroll = useRef<View | null>(null)

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
      console.log('#Duy Phan console2', width, height)
      refScroll.current?.setNativeProps({
        style: {
          width: w < width ? width : w,
          height: h < height ? height : h,
        },
      })
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
          // width: '100%',
          // height: '100%',
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
