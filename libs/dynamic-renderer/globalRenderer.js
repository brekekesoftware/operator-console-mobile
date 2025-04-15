import React from 'react'

let _renderTo = null

export const setGlobalRenderer = fn => {
  _renderTo = fn
}

export const renderToGlobal = (viewId, Component, props = {}) => {
  if (!_renderTo) {
    console.warn('[DynamicRenderer] renderTo is not initialized!')
    return
  }

  const element = Component ? React.createElement(Component, props) : null
  _renderTo(viewId, element)
}
