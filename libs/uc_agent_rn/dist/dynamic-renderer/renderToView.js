import { renderToGlobal } from './globalRenderer'

export const renderToView = (viewId, Component, props = {}) => {
  renderToGlobal(viewId, Component, props)
}
