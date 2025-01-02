import { createContext, useEffect, useRef, useState } from 'react'

export type ColorPaneContextType = {
  fgColor?: string
  bgColor?: string
  setFgColor?: (c: string) => void
  setBgColor?: (c: string) => void
}

export const ColorPaneContext = createContext<ColorPaneContextType>({})

export const ColorPaneContextProvider = ({
  fg,
  bg,
  children,
}: {
  bg?: string
  fg?: string
  children?: any
}) => {
  const [fgColor, setFgColor] = useState(fg)
  const [bgColor, setBgColor] = useState(bg)

  useEffect(() => {
    if (fg) {
      setFgColor(fg)
    }
  }, [fg])

  useEffect(() => {
    if (bg) {
      setBgColor(bg)
    }
  }, [bg])

  return (
    <ColorPaneContext.Provider
      value={{
        setFgColor,
        setBgColor,
        fgColor,
        bgColor,
      }}
    >
      {children}
    </ColorPaneContext.Provider>
  )
}
