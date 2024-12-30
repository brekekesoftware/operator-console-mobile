import { forwardRef, useEffect, useRef } from 'react'
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native'

import { GridLines } from '../common/GridLines'
import { dndEventEmiter } from '../lib/rnd/DndEventEmiter'
import { EditorWidgetFactory } from './widget/editor/EditorWidgetFactory'

export const EditorPaneSmall = forwardRef((props: any, ref: any) => {
  const refEditor = useRef<View | null>()

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
          console.log('#Duy Phan console s', d)
          console.log('#Duy Phan console s', fx, fy, width, height, px, py)
          if (
            isDropZone(
              { moveX: d.nX, moveY: d.nY },
              { fx, fy, width, height, px, py },
            )
          ) {
            props._onDrop({ ...d, px, py })
          }
        })
      }
    })
  }, [])

  return (
    <View
      data-br-container-id={props.paneData.getPaneNumber()}
      ref={r => {
        refEditor.current = r
        ref.current = r
      }}
      collapsable={false}
      // parent-container={this.state.parentContainer}
      // className={className}
      // style={}

      style={[{ width: '100%', height: '100%' }, props.style, props.css]}
    >
      <TouchableWithoutFeedback
        onPress={ev =>
          props.editScreenView.onMouseDownEditorPaneInSettingsMode(
            props.paneData.getPaneNumber(),
          )
        }
      >
        <GridLines
          style={{
            width: '100%',
            height: '100%',
          }}
          strokeWidth={2}
          cellWidth={props.editingScreenGrid * 10}
          cellWidth2={props.editingScreenGrid}
          cellHeight={props.editingScreenGrid * 10}
          cellHeight2={props.editingScreenGrid}
        >
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            {props.widgetDataArray.map((widgetData, index) => {
              const widgetJsx =
                EditorWidgetFactory.getStaticEditorWidgetFactoryInstance().getEditorWidgetJsx(
                  {
                    editorPane: props.editorPane,
                    widgetData: props.widgetDataArray[index],
                    jsxKey: index,
                  },
                )
              return widgetJsx
            })}
          </ScrollView>
        </GridLines>
      </TouchableWithoutFeedback>
    </View>
  )
})
