# Changelog

All notable changes to the "FileRocket" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-01-15

### Added
- Initial release of FileRocket extension 🚀
- Quick search functionality for predefined list of favorite files
- Configurable file list path (default: ~/favorite-files.txt)
- Smart search by filename and full path
- File existence validation
- Professional QuickPick interface
- Keyboard shortcut: Cmd+Alt+F (Mac) / Ctrl+Alt+F (Windows/Linux)
- Command palette integration
- Refresh command for reloading file list
- Configurable maximum results limit (default: 50)
- Three search modes: filename, full path, or both
- Error handling for missing files and configuration
- Cross-platform support (Windows, Mac, Linux)

### Features
- 🚀 **Dedicated Search**: Specialized search command for your favorite files
- 📝 **Customizable**: Configure your own list of frequently used files
- 🎯 **Smart Search**: Search by both filename and full path simultaneously
- ⚡ **Quick Access**: Use keyboard shortcut for instant access
- ✅ **File Validation**: Only shows files that actually exist
- 🎨 **Professional UI**: Clean interface that matches VS Code's design
- 🌐 **Workspace Independent**: Works with files outside your current workspace

### Configuration Options
- `filerocket.fileListPath`: Path to launch files list (default: ~/favorite-files.txt)
- `filerocket.maxResults`: Maximum search results to display (default: 50)
- `filerocket.searchMode`: Search mode - filename/fullpath/both (default: both)

### Requirements
- VS Code version 1.74.0 or higher
- Node.js runtime for extension execution

## [Unreleased]

### Planned Features
- Cloud sync for favorite files list
- Multiple favorite file lists support
- Recent files integration
- Project-specific favorite files
- Export/import functionality
- Advanced search filters
- File preview in quick pick
- Custom file grouping and categories
