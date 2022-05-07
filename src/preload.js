const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  webServerApi: {
    sendNotification(message) {
      ipcRenderer.send('notify', message);
    }
  }
})
