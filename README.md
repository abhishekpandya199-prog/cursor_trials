# Favorite Files Search

A professional VS Code extension that allows you to quickly search and open files from a predefined list, perfect for large workspaces with thousands of files.

## Features

- 🚀 **Dedicated Search**: Specialized search command for your favorite files
- 📝 **Customizable**: Configure your own list of frequently used files
- 🎯 **Smart Search**: Search by both filename and full path simultaneously
- ⚡ **Quick Access**: Use `Cmd+Shift+F` for instant access
- ✅ **File Validation**: Only shows files that actually exist
- 🎨 **Professional UI**: Clean, modern interface that matches VS Code's design
- 🌐 **Workspace Independent**: Works with files outside your current workspace

## Installation

### From Source (Development)

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile the extension:
   ```bash
   npm run compile
   ```
4. Press `F5` in VS Code to run the extension in a new Extension Development Host window

### From VSIX (Production)

1. Package the extension:
   ```bash
   npm install -g vsce
   vsce package
   ```
2. Install the generated `.vsix` file in VS Code

## Configuration

### 1. Create Your Favorite Files List

Create a text file (e.g., `~/favorite-files.txt`) with one file path per line:

```
/sad/sdfsf/fgd/rwe/rwt/ge/fil1.sv
/sad/sdfsf//fdghfdhfgd/rwe/rwt/ge/fil1.sv
/sad/sdfsf/fgd/rwe/rsdsaf/dsfsdfg/gfdghdgwt/ge/fil1.sv
/sad/sd/sdgsfgdsfsf/fgd/rwe/rwt/ge/fil1.sv
/sad/sdfsf/wt/ge/fil1.sv
```

### 2. Configure the Extension

Open VS Code settings and configure:

- **File List Path**: Path to your text file (default: `~/favorite-files.txt`)
- **Max Results**: Maximum number of search results (default: 50)
- **Search Mode**: Choose between filename, full path, or both

## Usage

### Method 1: Keyboard Shortcut (Recommended)
- **Mac**: `Cmd+Shift+F`
- **Windows/Linux**: `Ctrl+Shift+F`

### Method 2: Command Palette
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Search Favorite Files"
3. Select the command

### Method 3: Refresh Command
1. Use "Refresh Favorite Files List" command to reload your file list

### Search Interface
- Type to search through your favorite files
- Results show filename, full path, and existence status
- Click or press Enter to open a file

## Settings

| Setting | Description | Default |
|---------|-------------|---------|
| `favoriteFilesSearch.fileListPath` | Path to your favorite files list | `~/favorite-files.txt` |
| `favoriteFilesSearch.maxResults` | Maximum search results to display | `50` |
| `favoriteFilesSearch.searchMode` | Search mode (filename/fullpath/both) | `both` |

## Features in Detail

### Dedicated Search Command
- Specialized search interface for your favorite files
- Search by both filename and full path simultaneously
- Works independently of VS Code's native file search

### Smart File Validation
- Only displays files that actually exist on your system
- Shows visual indicators for file existence
- Handles missing files gracefully

### Workspace Independent
- Works with files outside your current workspace
- Supports absolute paths anywhere on your system
- No workspace restrictions

### Professional UI
- Matches VS Code's native design language
- Smooth animations and transitions
- Clear visual hierarchy

### Error Handling
- Graceful handling of missing configuration files
- Clear error messages
- Fallback behaviors

### Search Capabilities
- Search by filename (e.g., "fil1.sv")
- Search by full path (e.g., "/sad/sdfsf/fgd/rwe/rwt/ge/fil1.sv")
- Search by partial path components
- Real-time filtering as you type

## Development

### Project Structure
```
├── src/
│   └── extension.ts      # Main extension logic
├── package.json          # Extension manifest
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Building
```bash
npm run compile          # Build the extension
npm run watch            # Watch for changes
npm run lint             # Run linting
```

### Testing
```bash
npm run test             # Run tests
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

If you encounter any issues or have feature requests, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include your VS Code version and OS details

## Changelog

### v0.1.0
- Initial release
- Basic file search functionality
- Configuration options
- Professional UI design
