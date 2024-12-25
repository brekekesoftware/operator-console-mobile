import { createContext, useRef } from 'react'

export type DividerContext = {
  refLeft?: any
  refBottom?: any
  refTop?: any
  refRight?: any
  setRefLeft?: (ref: any) => void
  setRefRight?: (ref: any) => void
  setRefTop?: (ref: any) => void
  setRefBottom?: (ref: any) => void
}

export const DividerContext = createContext<DividerContext>({})

export const DividerContextProvider = props => {
  const refLeft = useRef()
  const refBottom = useRef()
  const refTop = useRef()
  const refRight = useRef()

  const setRefLeft = r => {
    refLeft.current = r
  }
  const setRefRight = r => {
    refRight.current = r
  }
  const setRefTop = r => {
    refTop.current = r
  }
  const setRefBottom = r => {
    refBottom.current = r
  }

  return (
    <DividerContext.Provider
      value={{
        setRefLeft,
        setRefRight,
        setRefTop,
        setRefBottom,
        refLeft,
        refBottom,
        refTop,
        refRight,
      }}
    >
      {props.children}
    </DividerContext.Provider>
  )
}
