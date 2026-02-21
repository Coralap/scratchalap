const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

let pythonProcess = null;

// --- 1. SMART PYTHON LOCATOR ---
function getPythonPath() {
    const possiblePaths = [
        // 1. Packaged environment (for your friend)
        path.join(process.resourcesPath, 'python_env', 'Scripts', 'python.exe'),
        path.join(process.resourcesPath, '.venv', 'Scripts', 'python.exe'),
        
        // 2. Development environment (for you)
        path.join(__dirname, '..', '.venv', 'Scripts', 'python.exe'),
        path.join(__dirname, '..', 'python_env', 'Scripts', 'python.exe'),
        
        // 3. Root level (if placed manually)
        path.join(app.getAppPath(), '..', '.venv', 'Scripts', 'python.exe')
    ];

    for (let p of possiblePaths) {
        if (fs.existsSync(p)) {
            console.log(`[SIGMA ENGINE]: Found environment at ${p}`);
            return p;
        }
    }

    // 4. Final Fallback: System Python
    console.log("[SIGMA ENGINE]: No venv found. Falling back to system 'python'");
    return 'python'; 
}

function startPythonServer() {
    const pythonExe = getPythonPath();
    let serverPath;

    if (app.isPackaged) {
        serverPath = path.join(process.resourcesPath, 'backend', 'server.py');
    } else {
        serverPath = path.join(__dirname, '..', 'backend', 'server.py');
    }

    // Verify server.py exists before spawning
    if (!fs.existsSync(serverPath)) {
        console.error(`[SIGMA ERROR]: Backend script not found at ${serverPath}`);
        return;
    }

    console.log(`[SIGMA ENGINE]: Spawning ${pythonExe} with ${serverPath}`);

    // shell: true helps resolve 'python' if it's a global command
    pythonProcess = spawn(pythonExe, [serverPath], { shell: false });

    pythonProcess.stdout.on('data', (data) => console.log(`Python: ${data}`));
    pythonProcess.stderr.on('data', (data) => console.error(`Python Error: ${data}`));

    pythonProcess.on('close', (code) => {
        console.log(`Python server exited with code ${code}`);
    });
}

// --- 2. WINDOW CREATION (FIXED BARS) ---
function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        titleBarStyle: 'hidden',
        autoHideMenuBar: true, 
        icon: path.join(__dirname, '..', 'public', 'logo.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    });

    win.maximize();

    // Re-link the UI buttons to the actual window actions
    ipcMain.on('window-minimize', () => win.minimize());
    ipcMain.on('window-maximize', () => {
        if (win.isMaximized()) win.unmaximize();
        else win.maximize();
    });
    ipcMain.on('window-close', () => app.quit());

    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, '../dist/index.html'));
    } else {
        win.loadURL('http://localhost:5173');
    }
}

// --- 3. LIFECYCLE ---
app.whenReady().then(() => {
    startPythonServer();
    createWindow();
});

app.on('will-quit', () => {
    if (pythonProcess) {
        pythonProcess.kill();
    }
});

// --- 4. DIALOGS ---
ipcMain.handle('open-file-dialog', async (event, type) => {
    const filters = type === 'model' 
        ? [{ name: 'Keras Models', extensions: ['keras', 'h5'] }] 
        : [{ name: 'CSV Files', extensions: ['csv'] }];

    const result = await dialog.showOpenDialog({ properties: ['openFile'], filters });
    return result.canceled ? null : result.filePaths[0];
});

ipcMain.handle('save-file-dialog', async (event, defaultName) => {
    const { filePath } = await dialog.showSaveDialog({
        defaultPath: defaultName,
        filters: [{ name: 'Keras Models', extensions: ['keras', 'h5'] }]
    });
    return filePath;
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});