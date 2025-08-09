#!/bin/bash

# FileRocket Publishing Script
echo "🚀 FileRocket Publishing Script"
echo "================================"

# Use npx to run vsce (no global install needed)
echo "✅ Using npx to run vsce"

echo "📋 Pre-publishing checks..."

# Compile the extension
echo "🔨 Compiling TypeScript..."
npm run compile

if [ $? -ne 0 ]; then
    echo "❌ Compilation failed!"
    exit 1
fi

# Run linting
echo "🔍 Running linter..."
npm run lint

if [ $? -ne 0 ]; then
    echo "⚠️  Linting issues found, but continuing..."
fi

# Package the extension
echo "📦 Packaging extension..."
npx vsce package

if [ $? -ne 0 ]; then
    echo "❌ Packaging failed!"
    exit 1
fi

echo "✅ Extension packaged successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Test locally: Install the .vsix file in VS Code"
echo "2. Login to marketplace: npx vsce login abhishekpandya199"
echo "3. Publish: npx vsce publish"
echo ""
echo "🚀 Ready to launch FileRocket!"
