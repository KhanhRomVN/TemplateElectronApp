import { ElectronAPI } from '@electron-toolkit/preload'

interface API {}
interface ElectronIpcRenderer {}

declare global {
  interface Window {
    electron: ElectronAPI & {
      ipcRenderer: ElectronIpcRenderer
    }
    api: API
    electronAPI: API
  }
}
