require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 4000;
const {app: electronApp, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const env = process.env.NODE_ENV || 'production';

// If development environment use hot reload
if (env === 'development') {
  try {
    require('electron-reloader')(module, {
      debug: true,
      watchRenderer: true,
    });
  } catch (_) {
    console.log('Error');
  }
}

const webServer = () => {
  app.use(express.static('dist/js'));
  app.use(express.static('src/preview'));
  const server = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
  process.on('SIGTERM', () => {
    server.close(() => {
      console.log('Process terminated');
    });
  });
}

const createMainWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('src/main/index.html').
      then(() => console.log('Main window Loaded.'));

  // If development environment show DevTools
  if (env === 'development') {
    // Open the DevTools.
    win.webContents.openDevTools();
  }
};

electronApp.whenReady().then(createMainWindow);

// Quit when all windows are closed.
electronApp.on('window-all-closed', () => {
  // On macOS it is common for applications and their
  // menu bar to stay active until the user quits
  // explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    electronApp.quit();
  }
});

electronApp.on('activate', () => {
  // On macOS it's common to re-create a window in the
  // app when the dock icon is clicked and there are no
  // other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

ipcMain.on('notify', (_, message) => {
  switch (message) {

    case 'start':
      console.log('Starting Server!');
      webServer();
      break;
    case 'stop':
      console.log('Mock Stopping Server!');
      process.kill(process.pid, 'SIGTERM');
      break;
    default:
      console.log('Noop');
  }
});
