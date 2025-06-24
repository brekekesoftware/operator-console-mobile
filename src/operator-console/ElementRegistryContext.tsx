import React, { createContext, useContext, useRef } from 'react'

const ElementRegistryContext = createContext({})

export const ElementRegistryProvider = ({ children }) => {
  const registryRef = useRef({})

  const register = (id, ref) => {
    registryRef.current[id] = ref
  }

  const unregister = id => {
    delete registryRef.current[id]
  }

  const get = id => registryRef.current[id]

  return (
    <ElementRegistryContext.Provider value={{ register, unregister, get }}>
      {children}
    </ElementRegistryContext.Provider>
  )
}

export const ElementRegistryContextRef = ElementRegistryContext
