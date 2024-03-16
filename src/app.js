/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0
 */

const { app, ipcMain, nativeTheme } = require('electron');
const { Microsoft } = require('minecraft-java-core');
const { autoUpdater } = require('electron-updater')

const path = require('path');
const fs = require('fs');

const UpdateWindow = require("./assets/js/windows/updateWindow.js");
const MainWindow = require("./assets/js/windows/mainWindow.js");

const {  BrowserWindow, shell, dialog } = require('electron/main')

let dev = process.env.NODE_ENV === 'dev';

let mainWindow

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('launcherx', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('launcherx')
}

// function setAppIcon() {
//     const isDarkMode = nativeTheme.shouldUseDarkColors;
//     const iconPath = isDarkMode ? 'src/assets/images/icon.png' : 'src/assets/images/LauncherLogo.png';
//     mainWindow.setIcon(iconPath);
// }
  // Set initial app icon

  // Listen for changes in system theme and update app icon accordingly
//   app.on('ready', () => {
//     // mainWindow = new BrowserWindow({
//     //     width: 800,
//     //     height: 600,
//     //     webPreferences: {
//     //         nodeIntegration: true
//     //     }
//     // });

//     // // Load your HTML file

//     // // Set initial app icon

//     // Listen for changes in system theme and update app icon accordingly
// });
// setAppIcon();
// nativeTheme.on('updated', setAppIcon);



// const gotTheLock = app.requestSingleInstanceLock()

// if (!gotTheLock) {
//   app.quit()
// } else {
// //   app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
//     if (mainWindow) {
//       if (mainWindow.isMinimized()) mainWindow.restore()
//       mainWindow.focus()
//     }

//     // dialog.showErrorBox('Welcome Back', `You arrived from: ${commandLine.pop().slice(0, -1)}`)
//   })

//   // Create mainWindow, load the rest of the app, etc...
// //   app.whenReady().then(() => {
// //     createWindow()
// //   })

// //   app.on('open-url', (event, url) => {
//     dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
//   })




// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

const { Client } = require('discord-rpc');

// Initialize Discord RPC client
const clientId = '933968794949415042'; // Replace with your Discord application client ID
const rpc = new Client({ transport: 'ipc' });

// Function to update Discord Rich Presence
const updatePresence = () => {
    rpc.setActivity({
        details: "Playing LauncherX",
        state: "HomeScreen",
        startTimestamp: new Date(),
        largeImageKey: 'launcher_logo', // Replace with your image key
        largeImageText: 'LauncherX',
        smallImageKey: 'tenxmc_rounded', // Replace with your image key
        smallImageText: 'TenXMC',
        instance: false,
        buttons: [
                                { label: 'TenXmc', url: "https://tenxmc.me" },
                                { label: 'LauncherX', url: "https://launcher.tenxmc.me"},
                            ],
        
    });
};

// Electron app ready
// app.on('ready', () => {
//     // Create a new browser window
//     const mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             nodeIntegration: true
//         }
//     });

//     // Load your HTML file
//     mainWindow.loadFile('index.html');

//     // Initialize Discord RPC
//     rpc.login({ clientId }).catch(console.error);
// });
rpc.login({ clientId }).catch(console.error);

// Update presence every 15 seconds
setInterval(() => {
    updatePresence();
}, 15000);

// const rpc = require('discord-rpc');
// let client = new rpc.Client({ transport: 'ipc' });

// ipcMain.on('new-status-discord', async () => {
//     client.login({ clientId: '933968794949415042' });
//     client.on('ready', () => {
//         client.request('SET_ACTIVITY', {
//             pid: process.pid,
//             activity: {
//                 details: 'status',
//                 assets: {
//                     large_image: 'launcher_logo',
//                     large_text: 'LauncherX',
//                 },
//                 buttons: [
//                     { label: 'TenXmc', url: "https://tenxmc.me" },
//                     { label: 'LauncherX', url: "https://launcher.tenxmc.me"},
//                 ],
//                 instance: false,
//                 timestamps: {
//                     start: startedAppTime
//                 }
//             },
//         });
//     });
// });


// ipcMain.on('new-status-discord-jugando', async (event, status) => {
//     console.log(status)
//     if(client) await client.destroy();
//     client.login({ clientId: '933968794949415042' });
//     client.on('ready', () => {
//         client.request('SET_ACTIVITY', {
//             pid: process.pid,
//             activity: {
//                 details: status,
//                 assets: {
//                     large_image: 'launcher_logo',
//                     large_text: 'LauncherX',
//                 },
//                 buttons: [
//                     { label: 'TenXmc', url: "https://tenxmc.me" },
//                     { label: 'LauncherX', url: "https://launcher.tenxmc.me"},
//                 ],
//                 instance: false,
//                 timestamps: {
//                     start: startedAppTime
//                 }
//             },
//         });
//     });
// });

// ipcMain.on('delete-and-new-status-discord', async () => {
//     if(client) client.destroy();
//     client = new rpc.Client({ transport: 'ipc' });
//     client.login({ clientId: '933968794949415042' });
//     client.on('ready', () => {
//         client.request('SET_ACTIVITY', {
//             pid: process.pid,
//             activity: {
//                 details: 'On the menu',
//                 assets: {
//                     large_image: 'launcher_logo',
//                     large_text: 'LauncherX',
//                 },
//                 buttons: [
//                     { label: 'Boton', url: "https://tenxmc.me" },
//                     { label: 'LauncherX', url: "https://launcher.tenxmc.me"},

//                 ],
//                 instance: false,
//                 timestamps: {
//                     start: startedAppTime
//                 }
//             },
//         });
//     });
// });


// Handle window controls via IPC
ipcMain.on('shell:open', () => {
  const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked')
  const pagePath = path.join('file://', pageDirectory, 'index.html')
  shell.openExternal(pagePath)
})
if (dev) {
    let appPath = path.resolve('./data/Launcher').replace(/\\/g, '/');
    let appdata = path.resolve('./data').replace(/\\/g, '/');
    if (!fs.existsSync(appPath)) fs.mkdirSync(appPath, { recursive: true });
    if (!fs.existsSync(appdata)) fs.mkdirSync(appdata, { recursive: true });
    app.setPath('userData', appPath);
    app.setPath('appData', appdata)
}

if (!app.requestSingleInstanceLock()) app.quit();
else app.whenReady().then(() => {
    if (dev) return MainWindow.createWindow()
    UpdateWindow.createWindow()
});

ipcMain.on('main-window-open', () => MainWindow.createWindow())
ipcMain.on('main-window-dev-tools', () => MainWindow.getWindow().webContents.openDevTools({ mode: 'detach' }))
ipcMain.on('main-window-dev-tools-close', () => MainWindow.getWindow().webContents.closeDevTools())
ipcMain.on('main-window-close', () => MainWindow.destroyWindow())
ipcMain.on('main-window-reload', () => MainWindow.getWindow().reload())
ipcMain.on('main-window-progress', (event, options) => MainWindow.getWindow().setProgressBar(options.progress / options.size))
ipcMain.on('main-window-progress-reset', () => MainWindow.getWindow().setProgressBar(-1))
ipcMain.on('main-window-progress-load', () => MainWindow.getWindow().setProgressBar(2))
ipcMain.on('main-window-minimize', () => MainWindow.getWindow().minimize())

ipcMain.on('update-window-close', () => UpdateWindow.destroyWindow())
ipcMain.on('update-window-dev-tools', () => UpdateWindow.getWindow().webContents.openDevTools({ mode: 'detach' }))
ipcMain.on('update-window-progress', (event, options) => UpdateWindow.getWindow().setProgressBar(options.progress / options.size))
ipcMain.on('update-window-progress-reset', () => UpdateWindow.getWindow().setProgressBar(-1))
ipcMain.on('update-window-progress-load', () => UpdateWindow.getWindow().setProgressBar(2))

ipcMain.handle('path-user-data', () => app.getPath('userData'))
ipcMain.handle('appData', e => app.getPath('appData'))

ipcMain.on('main-window-maximize', () => {
    if (MainWindow.getWindow().isMaximized()) {
        MainWindow.getWindow().unmaximize();
    } else {
        MainWindow.getWindow().maximize();
    }
})

ipcMain.on('main-window-hide', () => MainWindow.getWindow().hide())
ipcMain.on('main-window-show', () => MainWindow.getWindow().show())

ipcMain.handle('Microsoft-window', async (_, client_id) => {
    return await new Microsoft(client_id).getAuth();
})

ipcMain.handle('is-dark-theme', (_, theme) => {
    if (theme === 'dark') return true
    if (theme === 'light') return false
    return nativeTheme.shouldUseDarkColors;
})

app.on('window-all-closed', () => app.quit());

autoUpdater.autoDownload = false;

ipcMain.handle('update-app', async () => {
    return await new Promise(async (resolve, reject) => {
        autoUpdater.checkForUpdates().then(res => {
            resolve(res);
        }).catch(error => {
            reject({
                error: true,
                message: error
            })
        })
    })
})

autoUpdater.on('update-available', () => {
    const updateWindow = UpdateWindow.getWindow();
    if (updateWindow) updateWindow.webContents.send('updateAvailable');
});

ipcMain.on('start-update', () => {
    autoUpdater.downloadUpdate();
})

autoUpdater.on('update-not-available', () => {
    const updateWindow = UpdateWindow.getWindow();
    if (updateWindow) updateWindow.webContents.send('update-not-available');
});

autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall();
});

autoUpdater.on('download-progress', (progress) => {
    const updateWindow = UpdateWindow.getWindow();
    if (updateWindow) updateWindow.webContents.send('download-progress', progress);
})

autoUpdater.on('error', (err) => {
    const updateWindow = UpdateWindow.getWindow();
    if (updateWindow) updateWindow.webContents.send('error', err);
});
ipcMain.on('disable-file', (event, fileName) => {
    const directoryPath = path.join(process.env.APPDATA, '.launcherx', 'instances', 'launcherx', 'mods');

    const filePath = path.join(directoryPath, fileName);
    const newFilePath = `${filePath}.disabled`;

    fs.rename(filePath, newFilePath, (err) => {
        if (err) {
            console.error('Error disabling file:', err);
            dialog.showErrorBox('Error', 'Failed to disable file.');
        } else {
            event.reply('file-disabled', fileName);
        }
    });
});

ipcMain.on('enable-file', (event, fileName) => {
    const directoryPath = path.join(process.env.APPDATA, '.launcherx', 'instances', 'launcherx', 'mods');

    const filePath = path.join(directoryPath, fileName);
    const newFilePath = filePath.replace('.disabled', '');

    fs.rename(filePath, newFilePath, (err) => {
        if (err) {
            console.error('Error enabling file:', err);
            dialog.showErrorBox('Error', 'Failed to enable file.');
        } else {
            event.reply('file-enabled', fileName);
        }
    });
});
