import * as dotenv from 'dotenv'
dotenv.config()
import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.maximize()
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])

    // Enable auto-reload in development
    mainWindow.webContents.on('did-fail-load', () => {
      if (mainWindow) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] as string)
      }
    })

    if (is.dev && mainWindow) {
      mainWindow.webContents.on('did-finish-load', () => {
        if (mainWindow) {
          mainWindow.blur()
          mainWindow.webContents.openDevTools({ mode: 'detach' })
        }
      })
    }
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  // Hot reload in development
  if (is.dev) {
    app.on('activate', () => {
      if (mainWindow === null) createWindow()
    })

    if (mainWindow) {
      mainWindow.webContents.on('destroyed', () => {
        mainWindow = null
      })
    }
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
