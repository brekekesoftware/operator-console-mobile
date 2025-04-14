import React from 'react'
import { View } from 'react-native'

class ElementManager {
  constructor() {
    this.elements = new Map()
    this.children = new Map()
    this.props = new Map()
    this.updateCallbacks = new Map()
  }

  createElement(key) {
    if (!this.elements.has(key)) {
      this.elements.set(key, {
        key,
        component: null,
        parent: null,
      })
      this.children.set(key, [])
      this.props.set(key, {})
      this.updateCallbacks.set(key, [])
    }
    return this.elements.get(key)
  }

  appendChild(parentKey, childKey) {
    const parent = this.elements.get(parentKey)
    const child = this.elements.get(childKey)

    if (parent && child) {
      if (child.parent) {
        const oldParentChildren = this.children.get(child.parent)
        const index = oldParentChildren.indexOf(childKey)
        if (index > -1) {
          oldParentChildren.splice(index, 1)
        }
      }

      child.parent = parentKey
      this.children.get(parentKey).push(childKey)

      this.triggerUpdate(parentKey)
    }
  }

  removeChild(parentKey, childKey) {
    const children = this.children.get(parentKey)
    if (children) {
      const index = children.indexOf(childKey)
      if (index > -1) {
        children.splice(index, 1)
        const child = this.elements.get(childKey)
        if (child) {
          child.parent = null
        }

        this.triggerUpdate(parentKey)
      }
    }
  }

  getChildren(parentKey) {
    return this.children.get(parentKey) || []
  }

  setComponent(key, component, props = {}) {
    const element = this.elements.get(key)
    if (element) {
      element.component = component
      this.props.set(key, props)

      this.triggerUpdate(key)
    }
  }

  getComponent(key) {
    const element = this.elements.get(key)
    return element ? element.component : null
  }

  getProps(key) {
    return this.props.get(key) || {}
  }

  updateProps(key, newProps) {
    const currentProps = this.props.get(key) || {}
    const updatedProps = { ...currentProps, ...newProps }
    this.props.set(key, updatedProps)

    this.triggerUpdate(key)
  }

  registerUpdateCallback(key, callback) {
    if (!this.updateCallbacks.has(key)) {
      this.updateCallbacks.set(key, [])
    }
    this.updateCallbacks.get(key).push(callback)
  }

  unregisterUpdateCallback(key, callback) {
    if (this.updateCallbacks.has(key)) {
      const callbacks = this.updateCallbacks.get(key)
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  triggerUpdate(key) {
    if (this.updateCallbacks.has(key)) {
      this.updateCallbacks.get(key).forEach(callback => callback())
    }

    const element = this.elements.get(key)
    if (element && element.parent) {
      this.triggerUpdate(element.parent)
    }
  }

  renderComponent(key) {
    const element = this.elements.get(key)
    if (!element || !element.component) return null

    const Component = element.component
    const props = this.getProps(key)
    const children = this.getChildren(key)

    const childComponents = []
    for (let i = 0; i < children.length; i++) {
      const childKey = children[i]
      const childComponent = this.renderComponent(childKey)
      if (childComponent) {
        childComponents.push(childComponent)
      }
    }

    const WrapperComponent = () => {
      const [, forceUpdate] = React.useState({})

      React.useEffect(() => {
        const updateCallback = () => {
          forceUpdate({})
        }

        this.registerUpdateCallback(key, updateCallback)

        return () => {
          this.unregisterUpdateCallback(key, updateCallback)
        }
      }, [])

      return React.createElement(Component, { ...props, key }, childComponents)
    }

    return React.createElement(WrapperComponent, { key: `wrapper-${key}` })
  }
}

const elementManager = new ElementManager()

if (
  typeof window !== 'undefined' &&
  window.Brekeke &&
  window.Brekeke.ElementManager
) {
  Object.getOwnPropertyNames(ElementManager.prototype).forEach(method => {
    if (method !== 'constructor') {
      window.Brekeke.ElementManager[method] =
        elementManager[method].bind(elementManager)
    }
  })

  Object.keys(elementManager).forEach(prop => {
    window.Brekeke.ElementManager[prop] = elementManager[prop]
  })
}

export default elementManager
