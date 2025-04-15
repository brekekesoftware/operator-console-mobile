import React from 'react'
import { View } from 'react-native'

class ElementManager {
  constructor() {
    this.elements = new Map()
    this.children = new Map()
    this.props = new Map()
    this.updateCallbacks = new Map()
    this.renderedKeys = new Set()
    this.pendingUpdates = new Map()
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

      // Only trigger update for the parent element to prevent infinite recursion
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

        // Only trigger update for the parent element to prevent infinite recursion
        this.triggerUpdate(parentKey)
      }
    }
  }

  getChildren(parentKey) {
    return this.children.get(parentKey) || []
  }

  setComponent(key, component, props = {}) {
    console.log(`ElementManager: Setting component for key ${key}`)

    const element = this.elements.get(key)
    if (element) {
      // Store the previous component to check if it changed
      const previousComponent = element.component

      // If this key was previously rendered and the component changed from null to a valid component,
      // we need to store the update and trigger a re-render
      if (this.renderedKeys.has(key) && !previousComponent && component) {
        console.log(
          `ElementManager: Component added to previously rendered key ${key}, storing update`,
        )

        // Store the update for the next render
        this.pendingUpdates.set(key, { component, props })

        // Trigger an update to cause a re-render
        this.triggerUpdate(key)
      } else {
        // Normal update
        element.component = component
        this.props.set(key, props)
        this.triggerUpdate(key)
      }
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

  triggerUpdate(key, visited = new Set()) {
    // Prevent infinite recursion by tracking visited elements
    if (visited.has(key)) {
      return
    }
    visited.add(key)

    // First trigger update callbacks for this element
    if (this.updateCallbacks.has(key)) {
      this.updateCallbacks.get(key).forEach(callback => callback())
    }

    // Then trigger updates for all children
    const children = this.getChildren(key)
    children.forEach(childKey => {
      this.triggerUpdate(childKey, visited)
    })

    // Finally, trigger update for parent if it exists
    const element = this.elements.get(key)
    if (element && element.parent) {
      this.triggerUpdate(element.parent, visited)
    }
  }

  renderComponent(key) {
    console.log(`ElementManager: Attempting to render component for key ${key}`)

    // Mark this key as rendered
    this.renderedKeys.add(key)

    // Check if there's a pending update for this key
    if (this.pendingUpdates.has(key)) {
      console.log(
        `ElementManager: Found pending update for key ${key}, applying it`,
      )
      const update = this.pendingUpdates.get(key)
      this.pendingUpdates.delete(key)

      // Apply the pending update
      if (update.component) {
        this.elements.get(key).component = update.component
      }
      if (update.props) {
        this.props.set(key, update.props)
      }
    }

    const element = this.elements.get(key)
    if (!element) {
      console.log(`ElementManager: No element found for key ${key}`)
      return null
    }

    const Component = element.component
    if (!Component) {
      console.log(`ElementManager: No component available for key ${key}`)
      return null
    }

    const props = this.getProps(key)
    const children = this.getChildren(key)

    const childComponents = []
    for (let i = 0; i < children.length; i++) {
      const childKey = children[i]
      console.log(
        `ElementManager: Rendering child component for key ${childKey}`,
      )
      const childComponent = this.renderComponent(childKey)
      if (childComponent) {
        childComponents.push(childComponent)
      }
    }

    // Create a simple wrapper component that will update when needed
    const WrapperComponent = () => {
      const [, forceUpdate] = React.useState({})

      React.useEffect(() => {
        const updateCallback = () => {
          console.log(`ElementManager: Update triggered for key ${key}`)
          forceUpdate({})
        }

        this.registerUpdateCallback(key, updateCallback)
        console.log(`ElementManager: Update callback registered for key ${key}`)

        return () => {
          console.log(`ElementManager: Cleanup for key ${key}`)
          this.unregisterUpdateCallback(key, updateCallback)
        }
      }, [])

      // Get the latest component and props
      const currentElement = this.elements.get(key)
      const currentComponent = currentElement ? currentElement.component : null
      const currentProps = this.getProps(key)

      if (!currentComponent) {
        console.log(`ElementManager: Component became null for key ${key}`)
        return null
      }

      console.log(`ElementManager: Rendering component for key ${key}`)

      // Use React.createElement for all components to ensure proper rendering
      return React.createElement(
        currentComponent,
        { ...currentProps, key },
        childComponents,
      )
    }

    console.log(`ElementManager: Creating WrapperComponent for key ${key}`)
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
