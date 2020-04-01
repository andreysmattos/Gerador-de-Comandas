const { app, BrowserWindow } = require('electron');

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile(__dirname + '/index.html');
};

app.once('ready', () => {
  createMainWindow();
  mainWindow.webContents.once('did-finish-load', () => mainWindow.show());
})
