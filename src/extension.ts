import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

interface FileEntry {
    path: string;
    filename: string;
    exists: boolean;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Favorite Files Search extension is now active!');

    let disposable = vscode.commands.registerCommand('favorite-files-search.searchFiles', async () => {
        try {
            const files = await loadFavoriteFiles();
            if (files.length === 0) {
                vscode.window.showWarningMessage('No favorite files found. Please check your configuration.');
                return;
            }

            const selectedFile = await showFilePicker(files);
            if (selectedFile) {
                await openFile(selectedFile);
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    });

    context.subscriptions.push(disposable);

    // Register refresh command
    const refreshCommand = vscode.commands.registerCommand('favorite-files-search.refresh', async () => {
        vscode.window.showInformationMessage('Favorite files list refreshed!');
    });

    context.subscriptions.push(refreshCommand);
}

async function loadFavoriteFiles(): Promise<FileEntry[]> {
    const config = vscode.workspace.getConfiguration('favoriteFilesSearch');
    const fileListPath = config.get<string>('fileListPath', '~/favorite-files.txt');
    
    // Expand ~ to home directory
    const expandedPath = fileListPath.startsWith('~') 
        ? path.join(os.homedir(), fileListPath.slice(1))
        : fileListPath;

    if (!await fs.pathExists(expandedPath)) {
        throw new Error(`Favorite files list not found at: ${expandedPath}`);
    }

    const content = await fs.readFile(expandedPath, 'utf-8');
    const lines = content.split('\n')
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0 && !line.startsWith('#'));

    const files: FileEntry[] = [];
    
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

async function showFilePicker(files: FileEntry[]): Promise<FileEntry | undefined> {
    const config = vscode.workspace.getConfiguration('favoriteFilesSearch');
    const maxResults = config.get<number>('maxResults', 50);

    const quickPick = vscode.window.createQuickPick<vscode.QuickPickItem>();
    quickPick.placeholder = 'Search your favorite files by filename or path...';
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
            } else {
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

async function openFile(fileEntry: FileEntry): Promise<void> {
    try {
        const uri = vscode.Uri.file(fileEntry.path);
        const document = await vscode.workspace.openTextDocument(uri);
        await vscode.window.showTextDocument(document, { preview: false });
        
        vscode.window.showInformationMessage(`Opened: ${fileEntry.filename}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to open file: ${fileEntry.path}`);
    }
}

export function deactivate() {}
