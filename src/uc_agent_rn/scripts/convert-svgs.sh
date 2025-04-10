#!/bin/bash

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if prettier is installed
if ! command -v npx &> /dev/null; then
    echo "Error: npx is not installed. Please install Node.js first."
    exit 1
fi

# Create directories if they don't exist
mkdir -p ../src/svg
mkdir -p ../src/icons

# Clean up any existing files with hyphens in their names
echo "Cleaning up existing files with hyphens..."
find ../src/icons -name "*-*Icon.js" -type f -delete

# Check if there are any SVG files
if [ ! "$(ls -A ../src/svg/*.svg 2>/dev/null)" ]; then
    echo "Error: No SVG files found in ../src/svg/"
    echo "Please place your SVG files in the ../src/svg/ directory"
    exit 1
fi

# Run the SVG conversion script
echo "Converting SVG files to React Native components..."
node convertSvgToComponent.js

# Check if the conversion was successful
if [ $? -eq 0 ]; then
    echo "SVG conversion completed successfully!"
    
    # Format the generated files
    echo "Formatting generated files..."
    npx prettier --write "../src/icons/*.js"
    
    echo "All done! Check the ../src/icons/ directory for your converted components."
else
    echo "Error: SVG conversion failed. Please check the error messages above."
    exit 1
fi 