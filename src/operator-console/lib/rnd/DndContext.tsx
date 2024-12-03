import { createContext, useContext } from 'react'

export type DndContextValue = {}

export const DndContext = createContext<DndContextValue>({})

export const useDndContext = () => useContext(DndContext)
