import { app, BrowserWindow } from 'electron';
import { getUIPath, ipcMainHandle, ipcMainOn, isDev } from './util.js';
import { getStaticData, pollResources } from './resourceManager.js';
import { getPreloadPath } from './pathResolver.js';
import { createTray } from './tray.js';
import { createMenu } from './menu.js';

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
        frame: false,
    });

    if (isDev()) {
        mainWindow.loadURL('http:localhost:5123')
    } else {
        mainWindow.loadFile(getUIPath())
    }

    pollResources(mainWindow);

    ipcMainHandle('getStaticData', () => {
        return getStaticData()
    })

    ipcMainOn('sendFrameAction', (payload) => {
        switch(payload) {
            case 'MINIMIZE':
                mainWindow.minimize();
                break;
        }
    })

    createTray(mainWindow); 
    handleCloseEvents(mainWindow);
    createMenu(mainWindow);
});

function handleCloseEvents(mainWindow: BrowserWindow) {
    let willClose = false;

    mainWindow.on('close', (e) => {
        if (!willClose) {
            e.preventDefault();
            mainWindow.hide();
            if (app.dock) {
                app.dock.hide();
            }
        }
    });

    app.on('before-quit', () => {
        willClose = true;
    });

    mainWindow.on('show', () => {
        willClose = false;
    });
}
