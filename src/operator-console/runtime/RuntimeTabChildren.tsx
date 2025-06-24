import { useEffect, useRef } from 'react'
import { Platform, ScrollView, View } from 'react-native'

import { Util } from '../Util'
import { RuntimeWidgetFactory } from './widget/runtime/RuntimeWidgetFactory'

export const RuntimeTabChildren = ({
  widgetDataArray,
  runtimePaneAsParent,
}) => {
  const refLayout = useRef<View | null>(null)
  const refScroll = useRef<View | HTMLElement | null>(null)

  useEffect(() => {
    const { width: w, height: h } = Util.caculateCanvasSize(widgetDataArray)
    refLayout?.current?.measure((fx, fy, width, height, px, py) => {
      console.log('#Duy Phan console wh12', w, h, width, height)
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

  return (
    <View style={{ flex: 1 }} ref={refLayout} collapsable={false}>
      <ScrollView horizontal bounces={false} style={Util.getStyleScrollBar()}>
        <ScrollView bounces={false}>
          <View ref={refScroll}>
            {widgetDataArray.map((widgetData, index) => {
              const options = {
                runtimePane: runtimePaneAsParent,
                widgetData,
                jsxKey: widgetData._widgetUuid,
              }
              const widgetJsx =
                RuntimeWidgetFactory.getStaticRuntimeWidgetFactoryInstance().getRuntimeWidgetJsx(
                  options,
                )
              return widgetJsx
            })}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  )
}
