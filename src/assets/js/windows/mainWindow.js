const { app, BrowserWindow, Menu, nativeTheme, ipcMain } = require("electron");
const path = require("path");
const os = require("os");

let mainWindow = undefined;
let dev = process.env.DEV_TOOL === 'open';

function getWindow() {
    return mainWindow;
}

function destroyWindow() {
    if (mainWindow) {
        mainWindow.destroy();
        mainWindow = undefined;
    }
}

function setAppIcon() {
    const isDarkMode = nativeTheme.shouldUseDarkColors;
    const iconPath = isDarkMode
    ? path.join(app.getAppPath(), `/src/assets/images/icon.${os.platform() === "win32" ? "ico" : "png"}`)
    : path.join(app.getAppPath(), `/src/assets/images/Launcher_Logo.${os.platform() === "win32" ? "ico" : "png"}`);
  
  console.log(iconPath);
      if (mainWindow) {
        mainWindow.setIcon(path.resolve(__dirname, iconPath));
    }
}

function createWindow() {
    destroyWindow();
    mainWindow = new BrowserWindow({
        title: "LauncherX",
        width: 1280,
        height: 720,
        minWidth: 980,
        minHeight: 552,
        resizable: true,
        icon: `./src/assets/images/icon.${os.platform() === "win32" ? "ico" : "png"}`,
        frame: os.platform() !== 'win32',
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
    });
    Menu.setApplicationMenu(null);
    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile(path.join(`${app.getAppPath()}/src/launcher.html`));
    mainWindow.once('ready-to-show', () => {
        if (mainWindow) {
            if (dev) mainWindow.webContents.openDevTools({ mode: 'detach' });
            mainWindow.show();
        }
    });

    setAppIcon();
    nativeTheme.on('updated', setAppIcon);
}

// Toggling between dark mode and light mode
ipcMain.on('toggle-mode', () => {
    const newTheme = nativeTheme.shouldUseDarkColors ? 'light' : 'dark';
    nativeTheme.themeSource = newTheme;
});

// mainwindow.js


// // IPC listeners for information requests
// ipcMain.on('getBuild', (event) => {
//     // Replace this with your actual logic to get the build information
//     const buildInfo = '6.0.8'; // Example build information
//     event.returnValue = buildInfo;
// });

// // ipcMain.on('getID', (event) => {
// //     // Replace this with your actual logic to get the ID information
// //     const idInfo = '76b136'; // Example ID information
// //     event.returnValue = idInfo;
// // });

// ipcMain.on('getName', (event) => {
//     // Replace this with your actual logic to get the name information
//     const nameInfo = 'LauncherX'; // Example name information
//     event.returnValue = nameInfo;
// });

// ipcMain.on('getOwner', (event) => {
//     // Replace this with your actual logic to get the owner information
//     const ownerInfo = 'Snozxyx'; // Example owner information
//     event.returnValue = ownerInfo;
// });
// ipcMain.on('getCredits', (event) => {
//     // Replace this with your actual logic to get the credits information
//     const creditsInfo = 'https://tenxmc.me/credits'; // Example credits information
//     event.returnValue = creditsInfo;
// });
// ipcMain.on('getUpdate', (event) => {
//     // Replace this with your actual logic to get the update information
//     const updateInfo = '6.0.8'; // Example update information
//     event.returnValue = updateInfo;
// });
// ipcMain.on('getUpdateSync', (event) => {
//     // Replace this with your actual logic to get the update sync information
//     const updateSyncInfo = 'Automatic'; // Example update sync information
//     event.returnValue = updateSyncInfo;
// });

module.exports = {
    getWindow,
    createWindow,
    destroyWindow,
};
