class ElementManager {
  constructor() {
    this.elements = new Map()
    this.children = new Map()
  }

  createElement(key) {
    if (!this.elements.has(key)) {
      this.elements.set(key, {
        key,
        component: null,
        parent: null,
      })
      this.children.set(key, [])
    }
    return this.elements.get(key)
  }

  appendChild(parentKey, childKey) {
    const parent = this.elements.get(parentKey)
    const child = this.elements.get(childKey)

    if (parent && child) {
      // Remove from old parent if exists
      if (child.parent) {
        const oldParentChildren = this.children.get(child.parent)
        const index = oldParentChildren.indexOf(childKey)
        if (index > -1) {
          oldParentChildren.splice(index, 1)
        }
      }

      // Add to new parent
      child.parent = parentKey
      this.children.get(parentKey).push(childKey)
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
      }
    }
  }

  getChildren(parentKey) {
    return this.children.get(parentKey) || []
  }

  setComponent(key, component) {
    const element = this.elements.get(key)
    if (element) {
      element.component = component
    }
  }

  getComponent(key) {
    const element = this.elements.get(key)
    return element ? element.component : null
  }

  renderComponent(key) {
    const element = this.elements.get(key)
    if (!element || !element.component) return null

    const Component = element.component
    const children = this.getChildren(key)
    const childComponents = children.map(childKey =>
      this.renderComponent(childKey),
    )

    return <Component key={key}>{childComponents}</Component>
  }
}

export default new ElementManager()
