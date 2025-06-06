import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { useViewRenderer } from './ViewRegistryProvider'

export const DynamicView = ({ viewId, style }) => {
  const [child, setChild] = useState(null)
  const { register, unregister } = useViewRenderer()

  useEffect(() => {
    register(viewId, setChild)
    return () => unregister(viewId)
  }, [viewId])

  return <View style={style}>{child}</View>
}
