// /**
//  * @author Luuxis
//  * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
//  */

// import config from './utils/config.js'
// import database from './utils/database.js'
// import logger from './utils/logger.js'
// import slider from './utils/slider.js'

// export {
// 	config as config,
// 	database as database,
// 	logger as logger,
// 	changePanel as changePanel,
// 	addAccount as addAccount,
// 	addsAccount as addsAccounts,
// 		slider as Slider,
// 	accountSelect as accountSelect,
// }

// function changePanel(id) {
// 	let panel = document.querySelector(`.${id}`)
// 	let active = document.querySelector(`.active`)
// 	if (active) active.classList.toggle('active')
// 	panel.classList.add('active')
// }

// function addAccount(data) {
// 	let div = document.createElement('div')
// 	div.classList.add('account')
// 	div.id = data.uuid
// 	div.innerHTML = `
// 	<div class="account-side" aria-label="Connected">
// 	<img class="account-image" src="http://localhost/launcherx/public/avatar/player/${data.name}?2d&size=100">
//         </div>
//         <div class="account-name">${data.name}</div>
//         <div class="account-uuid">${data.uuid}</div>
//         <div class="account-delete"><div class="icon-account-delete icon-account-delete-btn"></div></div>
//     `
// 	document.querySelector('.accounts').appendChild(div)
// }
// function addsAccount(data) {
// 	let div = document.createElement('div')
// 	div.classList.add('accountt')
// 	div.id = data.uuid
// 	div.innerHTML = `
// 	<div class="account-side" aria-label="Connected">
// 	<img class="account-image" src="http://localhost/launcherx/public/avatar/player/${data.name}?2d&size=100">
//         </div>
       
//     `
// 	document.querySelector('.accountst').appendChild(div)
// }

// function accountSelect(uuid) {
// 	let account = document.getElementById(uuid)
// 	let pseudo = account.querySelector('.account-name').innerText
// 	let activeAccount = document.querySelector('.active-account')

// 	if (activeAccount) activeAccount.classList.toggle('active-account')
// 	account.classList.add('active-account')
// 	headplayer(pseudo)
// }

// function headplayer(pseudo) {
// 	document.querySelector(
// 		'.account-image'
// 	).style.backgroundImage = ` url(http://localhost/launcherx/public/avatar/player/${pseudo}?2d)`
// }
// async function getSkin(acc) {
// 	let breakCache = new Date().getTime();
// 	let res = await fetch(`http://localhost/launcherx/public/${acc.displayName}.json?` + breakCache);

// 	let json = await res.json();
// 	let hash;
// 	if (json.skins.slim != null) {
// 		hash = json.skins.slim;
// 	} else {
// 		hash = json.skins.default;
// 	}
// 	document.getElementById('displayImage').src = `http://localhost/launcherx/public/preview/hash/${hash}?` + breakCache;
// }
// // function openDefaultBrowser() {
// // 	// Require Electron's shell module
// // 	const { shell } = require('electron');
// // 	// Provide the URL you want to open
// // 	const urlToOpen = 'https://example.com';
// // 	// Use shell module to open the URL in the default browser
// // 	shell.openExternal(urlToOpen);
// // }

// // // Sample usage of getSkin function
// // // Replace 'sampleAcc' with your actual account object
// // let sampleAcc = { displayName: 'sampleName' };
// // getSkin(sampleAcc);

// // function updatePlayerName() {
// //     // Prompt the user for their name
// //     let playerName = (${playerName});

// //     if (playerName !== null && playerName !== "") {
// //         // Update the <h1> tag with the provided player name
// //         let playerNameHeading = document.getElementById("playerNameHeading");
// //         playerNameHeading.textContent = playerName;
// //     }
// // }
// // const rpc = require('discord-rpc');
// // let client = new rpc.Client({ transport: 'ipc' });
// // ipcMain.on('new-status-discord-jugando', async (event, status) => {
// //     console.log(status)
// //     if(client) await client.destroy();
// //     client.login({ clientId: '933968794949415042' });
// //     client.on('ready', () => {
// //         client.request('SET_ACTIVITY', {
// //             pid: process.pid,
// //             activity: {
// //                 details: status,
// //                 assets: {
// //                     large_image: 'launcher_logo',
// //                     large_text: 'LauncherX',
// //                 },
// //                 buttons: [
// //                     { label: 'TenXmc', url: "https://tenxmc.me" },
// //                     { label: 'LauncherX', url: "https://launcher.tenxmc.me"},
// //                 ],
// //                 instance: false,
// //                 timestamps: {
// //                     start: startedAppTime
// //                 }
// //             },
// //         });
// //     });
// // });

// // ipcMain.on('delete-and-new-status-discord', async () => {
// //     if(client) client.destroy();
// //     client = new rpc.Client({ transport: 'ipc' });
// //     client.login({ clientId: '933968794949415042' });
// //     client.on('ready', () => {
// //         client.request('SET_ACTIVITY', {
// //             pid: process.pid,
// //             activity: {
// //                 details: 'On the menu',
// //                 assets: {
// //                     large_image: 'launcher_logo',
// //                     large_text: 'LauncherX',
// //                 },
// //                 buttons: [
// //                     { label: 'Boton', url: "https://tenxmc.me" },
// //                     { label: 'LauncherX', url: "https://launcher.tenxmc.me"},

// //                 ],
// //                 instance: false,
// //                 timestamps: {
// //                     start: startedAppTime
// //                 }
// //             },
// //         });
// //     });
// // });
/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
 */

import config from './utils/config.js';
import database from './utils/database.js';
import logger from './utils/logger.js';
import slider from './utils/slider.js';
const pkg = require('../package.json');


export {
    config as config,
    database as database,
    logger as logger,
    changePanel as changePanel,
    addAccount as addAccount,
    slider as Slider,
    accountSelect as accountSelect
}

function changePanel(id) {
    let panel = document.querySelector(`.${id}`);
    let active = document.querySelector(`.active`)
    if (active) active.classList.toggle("active");
    panel.classList.add("active");
}

function addAccount(data) {
    let azauth = config.config.azauth;
    let div = document.createElement("div");
    div.classList.add("account");
    div.id = data.uuid;
    div.innerHTML = `
        <img class="account-image" src="${azauth}/api/skin-api/avatars/face/${data.name}">
        <div class="account-name">${data.name}</div>
        <div class="account-uuid">${data.uuid}</div>
        <div class="account-delete"><div class="icon-account-delete icon-account-delete-btn"></div></div>
    `
    document.querySelector('.accounts').appendChild(div);
}

function accountSelect(uuid) {
    let account = document.getElementById(uuid);
    let pseudo = account.querySelector('.account-name').innerText;
    let activeAccount = document.querySelector('.active-account')

    if (activeAccount) activeAccount.classList.toggle('active-account');
    account.classList.add('active-account');
    headplayer(pseudo);
}

function headplayer(pseudo) {
    let azauth = config.config.azauth;
    document.querySelector(".player-head").style.backgroundImage = `url(${azauth}/api/skin-api/avatars/face/${pseudo})`;
}
