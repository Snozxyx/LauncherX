/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
 */

'use strict';
import { config } from './utils.js';

const { ipcRenderer } = require('electron');

class Splash {
    constructor() {
        this.splash = document.querySelector(".splash");
        this.splashMessage = document.querySelector(".splash-message");
        this.splashAuthor = document.querySelector(".splash-author");
        this.message = document.querySelector(".message");
        this.progress = document.querySelector("progress");
        document.addEventListener('DOMContentLoaded', () => this.startAnimation());
    }

    async startAnimation() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/Snozxyx/essentials/main/launcher/spalash.json'); // Replace with URL to your JSON file
            const splashes = await response.json();

            let splash = splashes[Math.floor(Math.random() * splashes.length)];

            this.splashMessage.textContent = splash.message;
            this.splashAuthor.children[0].textContent = "@" + splash.author;
        } catch (error) {
            console.error('Error fetching splash messages:', error);
            this.splashMessage.textContent = "Server is not accessible";

        }

        await sleep(100);
        document.querySelector("#splash").style.display = "block";
        await sleep(500);
        this.splash.classList.add("opacity");
        await sleep(500);
        this.splash.classList.add("translate");
        this.splashMessage.classList.add("opacity");
        this.splashAuthor.classList.add("opacity");
        this.message.classList.add("opacity");
        await sleep(1000);
        this.maintenanceCheck();
    }

    async maintenanceCheck() {
        if (process.env.NODE_ENV === 'dev') return this.startLauncher();
        try {
            const res = await config.GetConfig();
            if (res.maintenance) return this.shutdown(res.maintenance_message);
            else this.checkUpdate();
        } catch (e) {
            console.error(e);
            return this.shutdown("No Internet access");
        }
    }

    async checkUpdate() {
        this.setStatus(`Checking for updates...`);
        ipcRenderer.send('update-app');

        ipcRenderer.on('updateAvailable', () => {
            this.setStatus(`Update available!`);
            this.toggleProgress();
            ipcRenderer.send('start-update');
        });

        ipcRenderer.on('download-progress', (event, progress) => {
            this.setProgress(progress.transferred, progress.total);
        });

        ipcRenderer.on('update-not-available', () => {
            this.startLauncher();
        });
    }
    async maintenanceCheck() {
        config.GetConfig().then(res => {
            if (res.maintenance) return this.shutdown(res.maintenance_message);
            this.startLauncher();
        }).catch(e => {
            console.error(e);
            return this.shutdown("No internet connection detected,<br>please try again later.");
        })
    }

    startLauncher() {
        this.setStatus(`Starting launcher`);
        ipcRenderer.send('main-window-open');
        ipcRenderer.send('update-window-close');
    }

    shutdown(text) {
        this.setStatus(`${text}<br>Shutting down in 5s`);
        let i = 4;
        setInterval(() => {
            this.setStatus(`${text}<br>Shutting down in ${i--}s`);
            if (i < 0) ipcRenderer.send('update-window-close');
        }, 1000);
    }

    setStatus(text) {
        this.message.innerHTML = text;
    }

    toggleProgress() {
        if (this.progress.classList.toggle("show")) this.setProgress(0, 1);
    }

    setProgress(value, max) {
        this.progress.value = value;
        this.progress.max = max;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73 || e.keyCode == 123) {
        ipcRenderer.send("update-window-dev-tools");
    }
})
new Splash();
