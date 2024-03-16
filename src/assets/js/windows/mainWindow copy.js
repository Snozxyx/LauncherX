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
    const iconPath = isDarkMode ? `./src/assets/images/icon${os.platform() === "win32" ? "ico" : "png"}` : `/./src/assets/images/Launcher_Logo.${os.platform() === "win32" ? "ico" : "png"}`;
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

module.exports = {
    getWindow,
    createWindow,
    destroyWindow,
};
