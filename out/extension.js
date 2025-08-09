"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
function activate(context) {
    console.log('FileRocket extension is now active! 🚀');
    let disposable = vscode.commands.registerCommand('filerocket.searchFiles', async () => {
        try {
            const files = await loadFavoriteFiles();
            if (files.length === 0) {
                vscode.window.showWarningMessage('No launch files found. Please check your FileRocket configuration.');
                return;
            }
            const selectedFile = await showFilePicker(files);
            if (selectedFile) {
                await openFile(selectedFile);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });
    context.subscriptions.push(disposable);
    // Register refresh command
    const refreshCommand = vscode.commands.registerCommand('filerocket.refresh', async () => {
        vscode.window.showInformationMessage('FileRocket launch list refreshed! 🚀');
    });
    context.subscriptions.push(refreshCommand);
}
exports.activate = activate;
async function loadFavoriteFiles() {
    const config = vscode.workspace.getConfiguration('filerocket');
    const fileListPath = config.get('fileListPath', '~/favorite-files.txt');
    // Expand ~ to home directory
    const expandedPath = fileListPath.startsWith('~')
        ? path.join(os.homedir(), fileListPath.slice(1))
        : fileListPath;
    if (!await fs.pathExists(expandedPath)) {
        throw new Error(`FileRocket launch list not found at: ${expandedPath}`);
    }
    const content = await fs.readFile(expandedPath, 'utf-8');
    const lines = content.split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith('#'));
    const files = [];
    for (const line of lines) {
        const exists = await fs.pathExists(line);
        const filename = path.basename(line);
        files.push({
            path: line,
            filename: filename,
            exists: exists
        });
    }
    return files;
}
async function showFilePicker(files) {
    const config = vscode.workspace.getConfiguration('filerocket');
    const maxResults = config.get('maxResults', 50);
    const quickPick = vscode.window.createQuickPick();
    quickPick.placeholder = '🚀 Launch your files by filename or path...';
    quickPick.matchOnDescription = true;
    quickPick.matchOnDetail = true;
    // Filter files that exist and limit results
    const filteredFiles = files.filter(file => file.exists).slice(0, maxResults);
    quickPick.items = filteredFiles.map(file => ({
        label: file.filename,
        description: file.path,
        detail: file.exists ? '✓ File exists' : '✗ File not found',
        alwaysShow: true
    }));
    return new Promise((resolve) => {
        quickPick.onDidAccept(() => {
            const selected = quickPick.selectedItems[0];
            if (selected) {
                const file = filteredFiles.find(f => f.filename === selected.label && f.path === selected.description);
                resolve(file);
            }
            else {
                resolve(undefined);
            }
            quickPick.hide();
        });
        quickPick.onDidHide(() => {
            resolve(undefined);
        });
        quickPick.show();
    });
}
async function openFile(fileEntry) {
    try {
        const uri = vscode.Uri.file(fileEntry.path);
        const document = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(document, { preview: false });
        vscode.window.showInformationMessage(`🚀 Launched: ${fileEntry.filename}`);
    }
    catch (error) {
        vscode.window.showErrorMessage(`Failed to open file: ${fileEntry.path}`);
    }
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map