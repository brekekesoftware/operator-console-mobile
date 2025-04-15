import React, { createContext, useContext, useRef, useState } from 'react'

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
      console.warn(`No view found with id: ${id}`)
    }
  }

  return (
    <ViewRegistryContext.Provider value={{ register, unregister, renderTo }}>
      {children}
    </ViewRegistryContext.Provider>
  )
}

export const useViewRenderer = () => useContext(ViewRegistryContext)
