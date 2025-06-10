// import { Base64 } from "js-base64";
import { Platform } from 'react-native'
import { SvgXml } from 'react-native-svg'

const SIZES = {
  '4A0': [4767.87, 6740.79],
  '2A0': [3370.39, 4767.87],
  A0: [2383.94, 3370.39],
  A1: [1683.78, 2383.94],
  A2: [1190.55, 1683.78],
  A3: [841.89, 1190.55],
  A4: [595.28, 841.89],
  A5: [419.53, 595.28],
  A6: [297.64, 419.53],
  A7: [209.76, 297.64],
  A8: [147.4, 209.76],
  A9: [104.88, 147.4],
  A10: [73.7, 104.88],
  B0: [2834.65, 4008.19],
  B1: [2004.09, 2834.65],
  B2: [1417.32, 2004.09],
  B3: [1000.63, 1417.32],
  B4: [708.66, 1000.63],
  B5: [498.9, 708.66],
  B6: [354.33, 498.9],
  B7: [249.45, 354.33],
  B8: [175.75, 249.45],
  B9: [124.72, 175.75],
  B10: [87.87, 124.72],
  C0: [2599.37, 3676.54],
  C1: [1836.85, 2599.37],
  C2: [1298.27, 1836.85],
  C3: [918.43, 1298.27],
  C4: [649.13, 918.43],
  C5: [459.21, 649.13],
  C6: [323.15, 459.21],
  C7: [229.61, 323.15],
  C8: [161.57, 229.61],
  C9: [113.39, 161.57],
  C10: [79.37, 113.39],
  RA0: [2437.8, 3458.27],
  RA1: [1729.13, 2437.8],
  RA2: [1218.9, 1729.13],
  RA3: [864.57, 1218.9],
  RA4: [609.45, 864.57],
  SRA0: [2551.18, 3628.35],
  SRA1: [1814.17, 2551.18],
  SRA2: [1275.59, 1814.17],
  SRA3: [907.09, 1275.59],
  SRA4: [637.8, 907.09],
  EXECUTIVE: [521.86, 756.0],
  FOLIO: [612.0, 936.0],
  LEGAL: [612.0, 1008.0],
  LETTER: [612.0, 792.0],
  TABLOID: [792.0, 1224.0],
}

export const getPageSize = (formatName = '', orientation = 'portrait') => {
  const f = formatName.toUpperCase()
  if (!SIZES[f]) {
    return null
  }

  const portraitSize = SIZES[f]
  if (orientation.toLowerCase() === 'portrait') {
    return portraitSize
  } else {
    return [portraitSize[1], portraitSize[0]]
  }
}

const getWidthAndHeight = (pageSize, scale) => {
  const k = 1
  if (pageSize) {
    return { width: pageSize[0] * k * scale, height: pageSize[1] * k * scale }
  }
  return null
}

const buildLine = (
  size,
  lineColor,
  strokeWidth,
  dashArray,
  offset = 0,
  isVertical = false,
) => {
  let cell = isVertical
    ? `<line x1='${offset}' y1='0' x2='${offset}' y2='${size}'`
    : `<line x1='0' y1='${offset}' x2='${size}' y2='${offset}'`
  cell += ` stroke="${lineColor}" stroke-width="${strokeWidth}" stroke-dasharray="${dashArray}" />`
  return cell
}
const buildCell = (w, h, lineColor, strokeWidth, dashArray) =>
  buildLine(h, lineColor, strokeWidth, dashArray, 0, true) +
  buildLine(w, lineColor, strokeWidth, dashArray, 0, false)
const buildPage = (w, h, page, pat) => {
  if (!page) {
    return pat
  }

  const p = `<defs>
  <pattern id="Pattern" x="0" y="0" width="${w}" height="${h}" patternUnits="userSpaceOnUse">
    ${pat}
  </pattern>
</defs>
<rect fill="url(#Pattern)" stroke="black" width="${page.width}" height="${page.height}"/>
`
  return p
}
export const buildGridSvg = (
  w,
  h,
  lineColor,
  strokeWidth,
  dashArray,
  w2,
  h2,
  lineColor2,
  strokeWidth2,
  dashArray2,
  scale,
  format,
  orientation,
) => {
  const page = getWidthAndHeight(getPageSize(format, orientation), scale)
  w = w * scale
  h = h * scale
  w2 = w2 * scale
  h2 = h2 * scale
  const cell1 = buildCell(w, h, lineColor, strokeWidth, dashArray)
  let cell2 = ''
  if (w2 && h2) {
    for (let offset = w2; offset < w; offset += w2) {
      cell2 += buildLine(h, lineColor2, strokeWidth2, dashArray2, offset, true)
    }
    for (let offset = h2; offset < h; offset += h2) {
      cell2 += buildLine(w, lineColor2, strokeWidth2, dashArray2, offset, false)
    }
  }
  const pat = buildPage(w, h, page, `${cell1}${cell2}`)

  const svgW = page ? page.width : w
  const svgH = page ? page.height : h
  var svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${svgW}' height='${svgH}'>${pat}</svg>`

  if (Platform.OS === 'web') {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: svg }}
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      />
    )
  }
  return <SvgXml xml={svg} width='100%' height='100%' />
}
