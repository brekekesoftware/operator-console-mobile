# Operator Console Mobile

A React Native cross-platform application with UC library integration for mobile and web platforms.

## Table of Contents

- [About UC Library](#about-uc-library)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Icon Management](#icon-management)
- [Development](#development)
- [API Reference](#api-reference)
- [Contributing](#contributing)

## About UC Library

The UC (Unified Communications) library is located in `libs/uc_agent_rn` and serves as the core functionality provider for the operator console.

### Key Features

- **Cross-platform compatibility**: Works on iOS, Android, and Web
- **Babel-powered build system**: Optimized JavaScript compilation
- **Component-based architecture**: Modular and reusable UI components
- **SVG icon system**: Scalable vector graphics with automated conversion
- **Dynamic view rendering**: Runtime UI composition based on configuration

### Architecture

The UC library maintains compatibility with the main UC library while providing React Native specific optimizations and mobile-first design patterns.

## Getting Started

### Prerequisites

- Node.js 14+
- Yarn package manager
- React Native development environment

### Quick Start

1. **Install dependencies**

   ```sh
   yarn install
   ```

2. **Build the UC library**

   ```sh
   yarn build:dev
   ```

3. **Install to main project**
   ```sh
   make build-uc
   ```

## Installation

### Building the UC Library

The UC library uses Babel for transpilation and bundling:

```sh
# Development build
npm run build:dev
# or
yarn build:dev

# Production build
npm run build:prod
# or
yarn build:prod
```

After running the build scripts, the compiled bundle will be placed in the `/dist` directory.

### Integration with Main Project

To install the built UC library into your main project:

```sh
make build-uc
```

This command will:

- Copy the built library from `/dist`
- Install it with the new version number
- Update project dependencies

## Usage

### 1. Setup ViewRegistryProvider

Wrap your main application with the `ViewRegistryProvider` context:

```tsx
import React from 'react'
import { ViewRegistryProvider } from 'uc_agent_rn'
import App from './App'

export default function Root() {
  return (
    <ViewRegistryProvider>
      <App />
    </ViewRegistryProvider>
  )
}
```

### 2. Render Dynamic Views

Use the `DynamicView` component to render UC widgets at specific positions:

```tsx
import React from 'react'
import { DynamicView } from 'uc_agent_rn'

export default function Dashboard() {
  return (
    <View>
      <DynamicView viewId='webchatqueue' />
      <DynamicView viewId='callhistory' />
      <DynamicView viewId='contacts' />
    </View>
  )
}
```

**Important Notes:**

- Views will render after UC initialization
- Ensure the `viewId` prop matches the `iconParents` parameter used during UC initialization
- Views are dynamically composed based on UC configuration

### 3. Advanced Configuration

```tsx
import { UCManager } from 'uc_agent_rn'

// Initialize UC with custom configuration
UCManager.initialize({
  iconParents: {
    webchatqueue: { position: 'top-left', visible: true },
    callhistory: { position: 'bottom-right', visible: false },
  },
  theme: 'dark',
  locale: 'en-US',
})
```

## Icon Management

The UC library includes a comprehensive icon system with automated SVG processing.

### Adding Custom Icons

#### Method 1: Manual JSX Creation

1. Create a new JSX file in `src/icons/` following the react-native-svg standard format:

```tsx
// src/icons/CustomIcon.jsx
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const CustomIcon = ({ width = 24, height = 24, color = '#000' }) => (
  <Svg width={width} height={height} viewBox='0 0 24 24'>
    <Path
      d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'
      fill={color}
    />
  </Svg>
)
```

2. Rebuild the library:
   ```sh
   yarn build:dev
   ```

#### Method 2: Automated SVG Conversion

1. Add your SVG files to the `src/svg/` directory

2. Run the conversion script:
   ```sh
   sh convert-svgs.sh
   ```

This will automatically:

- Convert SVG files to JSX components
- Apply React Native SVG formatting
- Generate optimized icon components in `src/icons/`
- Update the icon exports

### Icon Usage

```tsx
import { CustomIcon, PhoneIcon, ChatIcon } from 'uc_agent_rn'

export default function Toolbar() {
  return (
    <View style={styles.toolbar}>
      <CustomIcon width={32} height={32} color='#007AFF' />
      <PhoneIcon width={24} height={24} color='#34C759' />
      <ChatIcon width={24} height={24} color='#FF3B30' />
    </View>
  )
}
```

## Development

### Project Structure

```
libs/uc_agent_rn/
├── src/
│   ├── components/          # React components
│   ├── icons/              # Generated icon components
│   ├── svg/                # Source SVG files
│   ├── utils/              # Utility functions
│   └── index.js            # Main entry point
├── dist/                   # Built library output
├── babel.config.js         # Babel configuration
└── package.json           # Library dependencies
```

### Build Scripts

```sh
# Development build with source maps
yarn build:dev

# Production build (minified)
yarn build:prod

# Watch mode for development
yarn build:watch

# Clean build artifacts
yarn clean

# Convert SVG icons
sh convert-svgs.sh
```

### Testing

```sh
# Run unit tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn test:coverage
```

## API Reference

### Components

#### `<ViewRegistryProvider>`

Context provider for UC library initialization.

**Props:**

- `config?: UCConfig` - Optional UC configuration object

#### `<DynamicView>`

Renders UC widgets dynamically based on viewId.

**Props:**

- `viewId: string` - Unique identifier for the view
- `style?: ViewStyle` - Optional styling
- `onLoad?: () => void` - Callback when view is loaded

### Utilities

#### `UCManager`

Main UC library manager for initialization and configuration.

**Methods:**

- `initialize(config: UCConfig): Promise<void>`
- `getViewConfig(viewId: string): ViewConfig`
- `updateTheme(theme: ThemeConfig): void`

## Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests**
   ```sh
   yarn test
   ```
5. **Build the library**
   ```sh
   yarn build:dev
   ```
6. **Submit a pull request**

### Code Standards

- Follow React Native best practices
- Use TypeScript for new components
- Maintain backward compatibility
- Add unit tests for new features
- Update documentation for API changes

### Icon Contribution

When contributing new icons:

- Use SVG format for scalability
- Ensure icons are optimized (< 2KB)
- Follow the existing naming convention
- Test on multiple screen densities

## License

[License information to be specified]

## Support

For technical support and bug reports, please:

- Check the [troubleshooting guide](./docs/troubleshooting.md)
- Search existing [issues](./issues)
- Create a new issue with detailed reproduction steps
