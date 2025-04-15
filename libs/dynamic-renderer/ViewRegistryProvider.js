import React, { createContext, useContext, useEffect, useRef } from 'react'

import { setGlobalRenderer } from './globalRenderer'

const ViewRegistryContext = createContext(null)

export const ViewRegistryProvider = ({ children }) => {
  const registry = useRef(new Map())

  const register = (id, setChild) => {
    registry.current.set(id, setChild)
  }

  const unregister = id => {
    registry.current.delete(id)
  }

  const renderTo = (id, element) => {
    const setChild = registry.current.get(id)
    if (setChild) {
      setChild(() => element)
    } else {
      console.warn(`[DynamicRenderer] can not find view "${id}"`)
    }
  }

  useEffect(() => {
    setGlobalRenderer(renderTo)
  }, [])

  return (
    <ViewRegistryContext.Provider value={{ register, unregister, renderTo }}>
      {children}
    </ViewRegistryContext.Provider>
  )
}

export const useViewRenderer = () => {
  const context = useContext(ViewRegistryContext)
  if (!context) {
    throw new Error(
      'useViewRenderer must be used within a ViewRegistryProvider',
    )
  }
  return context
}
