const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process'); // Required to spawn the Python process

let pythonProcess = null;

//build or test environment path to server.py
function startPythonServer() {
  const pythonExe = app.isPackaged 
    ? path.join(process.resourcesPath, 'app', '.venv', 'Scripts', 'python.exe')
    : path.join(__dirname, '..', '.venv', 'Scripts', 'python.exe');

  const serverPath = app.isPackaged 
    ? path.join(process.resourcesPath, 'app', 'backend', 'server.py')
    : path.join(__dirname, '..', 'backend', 'server.py');

  console.log(`Launching Sigma Engine from: ${pythonExe}`);

  pythonProcess = spawn(pythonExe, [serverPath]);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`Python Output: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python Error: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`Python server exited with code ${code}`);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false, 
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  win.maximize();

  // Window control logic
  ipcMain.on('window-minimize', () => win.minimize());
  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) win.unmaximize();
    else win.maximize();
  });
  ipcMain.on('window-close', () => app.quit());

  if (app.isPackaged) {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    win.loadFile(indexPath).catch(err => {
      win.loadFile(path.join(__dirname, 'index.html'));
    });
  } else {
    win.loadURL('http://localhost:5173');
  }

  win.once('ready-to-show', () => win.show());
}

app.whenReady().then(() => {
  startPythonServer(); 
  createWindow();
});

app.on('will-quit', () => {
  if (pythonProcess) {
    pythonProcess.kill();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});