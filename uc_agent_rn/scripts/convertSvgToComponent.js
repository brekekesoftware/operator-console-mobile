const fs = require('fs')
const path = require('path')

// Function to convert kebab-case to PascalCase
function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

// Function to convert SVG element names to PascalCase
function toPascalCaseElement(str) {
  const elementMap = {
    svg: 'Svg',
    g: 'G',
    path: 'Path',
    rect: 'Rect',
    circle: 'Circle',
    ellipse: 'Ellipse',
    line: 'Line',
    polyline: 'Polyline',
    polygon: 'Polygon',
    text: 'Text',
    tspan: 'Tspan',
    defs: 'Defs',
    use: 'Use',
    mask: 'Mask',
    linearGradient: 'LinearGradient',
    radialGradient: 'RadialGradient',
    stop: 'Stop',
    clipPath: 'ClipPath',
    image: 'Image',
    symbol: 'Symbol',
    marker: 'Marker',
    pattern: 'Pattern',
    filter: 'Filter',
    feGaussianBlur: 'FeGaussianBlur',
    feColorMatrix: 'FeColorMatrix',
    feOffset: 'FeOffset',
    feMerge: 'FeMerge',
    feMergeNode: 'FeMergeNode',
    feFlood: 'FeFlood',
    feComposite: 'FeComposite',
    feBlend: 'FeBlend',
    feImage: 'FeImage',
    feTile: 'FeTile',
    feDisplacementMap: 'FeDisplacementMap',
    feTurbulence: 'FeTurbulence',
    feMorphology: 'FeMorphology',
    feConvolveMatrix: 'FeConvolveMatrix',
    feSpecularLighting: 'FeSpecularLighting',
    feDiffuseLighting: 'FeDiffuseLighting',
    fePointLight: 'FePointLight',
    feSpotLight: 'FeSpotLight',
    feDistantLight: 'FeDistantLight',
    feSurface: 'FeSurface',
    feDistantLight: 'FeDistantLight',
    feSpotLight: 'FeSpotLight',
    fePointLight: 'FePointLight',
    feSpecularLighting: 'FeSpecularLighting',
    feDiffuseLighting: 'FeDiffuseLighting',
    feConvolveMatrix: 'FeConvolveMatrix',
    feMorphology: 'FeMorphology',
    feTurbulence: 'FeTurbulence',
    feDisplacementMap: 'FeDisplacementMap',
    feTile: 'FeTile',
    feImage: 'FeImage',
    feBlend: 'FeBlend',
    feComposite: 'FeComposite',
    feFlood: 'FeFlood',
    feMergeNode: 'FeMergeNode',
    feMerge: 'FeMerge',
    feOffset: 'FeOffset',
    feColorMatrix: 'FeColorMatrix',
    feGaussianBlur: 'FeGaussianBlur',
    feFilter: 'FeFilter',
  }
  return elementMap[str] || toPascalCase(str)
}

// Function to convert SVG attributes to React Native props
function convertAttributes(attributes) {
  const props = {}
  for (const [key, value] of Object.entries(attributes)) {
    switch (key) {
      case 'fill':
      case 'stroke':
        props[key] = value === 'none' ? 'none' : value
        break
      case 'stroke-width':
        props.strokeWidth = value
        break
      case 'stroke-linecap':
        props.strokeLinecap = value
        break
      case 'stroke-linejoin':
        props.strokeLinejoin = value
        break
      case 'stroke-miterlimit':
        props.strokeMiterlimit = value
        break
      case 'fill-rule':
        props.fillRule = value
        break
      case 'clip-rule':
        props.clipRule = value
        break
      case 'xlink:href':
        props.xlinkHref = value
        break
      case 'xmlns:xlink':
        props.xmlnsXlink = value
        break
      case 'xmlns':
        props.xmlns = value
        break
      case 'version':
        props.version = value
        break
      case 'width':
        props.width = value
        break
      case 'height':
        props.height = value
        break
      case 'viewBox':
        props.viewBox = value
        break
      case 'preserveAspectRatio':
        props.preserveAspectRatio = value
        break
      case 'id':
        props.id = value
        break
      case 'class':
        props.className = value
        break
      case 'style':
        props.style = value
        break
      case 'opacity':
        props.opacity = value
        break
      case 'transform':
        props.transform = value
        break
      case 'd':
        props.d = value
        break
      case 'x':
        props.x = value
        break
      case 'y':
        props.y = value
        break
      case 'cx':
        props.cx = value
        break
      case 'cy':
        props.cy = value
        break
      case 'r':
        props.r = value
        break
      case 'rx':
        props.rx = value
        break
      case 'ry':
        props.ry = value
        break
      case 'points':
        props.points = value
        break
      case 'dx':
        props.dx = value
        break
      case 'dy':
        props.dy = value
        break
      case 'text-anchor':
        props.textAnchor = value
        break
      case 'font-size':
        props.fontSize = value
        break
      case 'font-family':
        props.fontFamily = value
        break
      case 'font-weight':
        props.fontWeight = value
        break
      case 'font-style':
        props.fontStyle = value
        break
      case 'text-decoration':
        props.textDecoration = value
        break
      case 'letter-spacing':
        props.letterSpacing = value
        break
      case 'word-spacing':
        props.wordSpacing = value
        break
      case 'mask':
        props.mask = value
        break
      case 'clip-path':
        props.clipPath = value
        break
      case 'filter':
        props.filter = value
        break
      case 'marker-end':
        props.markerEnd = value
        break
      case 'marker-start':
        props.markerStart = value
        break
      case 'marker-mid':
        props.markerMid = value
        break
      case 'patternUnits':
        props.patternUnits = value
        break
      case 'patternContentUnits':
        props.patternContentUnits = value
        break
      case 'gradientUnits':
        props.gradientUnits = value
        break
      case 'gradientTransform':
        props.gradientTransform = value
        break
      case 'offset':
        props.offset = value
        break
      case 'stop-color':
        props.stopColor = value
        break
      case 'stop-opacity':
        props.stopOpacity = value
        break
      default:
        props[key] = value
    }
  }
  return props
}

// Function to convert SVG attributes string to React Native props
function convertAttributesString(attrString) {
  const props = {}
  const matches = attrString.matchAll(/(\w+[-:]\w+|\w+)="([^"]*)"/g)

  for (const match of matches) {
    const [_, key, value] = match
    const convertedKey = key
      .split('-')
      .map((part, index) =>
        index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1),
      )
      .join('')

    props[convertedKey] = value
  }

  return convertAttributes(props)
}

// Function to convert SVG content to React Native JSX
function convertSvgContent(content) {
  return content.replace(/(<[^>]+>)/g, (match, tag) => {
    // Handle closing tags
    if (tag.startsWith('</')) {
      const tagName = tag.slice(2, -1)
      return `</${toPascalCaseElement(tagName)}>`
    }

    // Handle self-closing tags
    if (tag.endsWith('/>')) {
      const tagContent = tag.slice(1, -2)
      const [tagName, ...attrs] = tagContent.split(' ')
      const attrsString = attrs.join(' ')
      const props = convertAttributesString(attrsString)

      const propsString = Object.entries(props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')

      return `<${toPascalCaseElement(tagName)} ${propsString} />`
    }

    // Handle opening tags with attributes
    if (tag.includes(' ')) {
      const [tagName, ...attrs] = tag.slice(1, -1).split(' ')
      const attrsString = attrs.join(' ')
      const props = convertAttributesString(attrsString)

      const propsString = Object.entries(props)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')

      return `<${toPascalCaseElement(tagName)} ${propsString}>`
    }

    // Handle simple opening tags
    const tagName = tag.slice(1, -1)
    return `<${toPascalCaseElement(tagName)}>`
  })
}

// Function to extract SVG paths
function extractPaths(svgContent) {
  const paths = svgContent.match(/<path[^>]+>/g) || []
  return paths
    .map(path => {
      const id = path.match(/id="([^"]+)"/)?.[1]
      const d = path.match(/d="([^"]+)"/)?.[1]
      return { id, d }
    })
    .filter(path => path.id && path.d)
}

// Function to convert SVG to React Native component
function convertSvgToComponent(svgPath, outputDir) {
  const fileName = path.basename(svgPath, '.svg')
  const componentName = toPascalCase(fileName) + 'Icon'
  const outputPath = path.join(outputDir, `${componentName}.js`)

  // Read SVG content
  const svgContent = fs.readFileSync(svgPath, 'utf8')

  // Extract viewBox
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/)
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24'

  // Extract paths
  const paths = extractPaths(svgContent)

  // Extract groups and convert content
  const groups = svgContent.match(/<g[^>]*>[\s\S]*?<\/g>/g) || []
  const convertedGroups = groups.map(group => {
    const groupContent = group.replace(/<g[^>]*>|<\/g>/g, '')
    return `<G>
      ${convertSvgContent(groupContent)}
    </G>`
  })

  // Generate component code
  const componentCode = `import React from 'react';
import Svg, { Path, G, Mask, Use, Rect, Defs } from 'react-native-svg';

const ${componentName} = ({ width = 24, height = 24, color = '#212121', ...props }) => (
  <Svg width={width} height={height} viewBox="${viewBox}" {...props}>
    ${
      paths.length > 0
        ? `<Defs>
      ${paths
        .map(
          path => `<Path
        id="${path.id}"
        d="${path.d}"
      />`,
        )
        .join('\n')}
    </Defs>`
        : ''
    }
    ${convertedGroups.join('\n')}
  </Svg>
);

export default ${componentName};
`

  // Write component file
  fs.writeFileSync(outputPath, componentCode)
  console.log(`Created ${componentName} at ${outputPath}`)
}

// Function to process directory
function processDirectory(inputDir, outputDir) {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  // Read all SVG files
  const files = fs.readdirSync(inputDir)
  const svgFiles = files.filter(file => file.endsWith('.svg'))

  // Convert each SVG file
  svgFiles.forEach(file => {
    const svgPath = path.join(inputDir, file)
    convertSvgToComponent(svgPath, outputDir)
  })
}

// Main execution
const inputDir = path.join(__dirname, '../src/svg')
const outputDir = path.join(__dirname, '../src/icons')

try {
  processDirectory(inputDir, outputDir)
  console.log('SVG conversion completed successfully!')
} catch (error) {
  console.error('Error converting SVG files:', error)
}
