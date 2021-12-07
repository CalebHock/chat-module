const { app, BrowserWindow, remote } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 600,
    height: 800,
    minWidth: 600,
    minHeight: 800,
    maxWidth: 600,
    maxHeight: 800,
    webPreferences: {
      contextIsolation: true
    }
  })
  win.removeMenu()
  win.loadFile('index.html')
  // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
