// /**
//  * @author Luuxis
//  * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
//  */

// 'use strict'

// import { logger, database, changePanel } from '../utils.js'

// const { Launch, Status } = require('minecraft-java-core')
// const { ipcRenderer } = require('electron')
// const launch = new Launch()
// const pkg = require('../package.json')
// const path = require('path')

// const dataDirectory =
// 	process.env.APPDATA ||
// 	(process.platform == 'darwin'
// 		? `${process.env.HOME}/Library/Application Support`
// 		: process.env.HOME)

// class Home {
// 	static id = 'home'
// 	async init(config, news) {
// 		this.config = config
// 		this.news = await news
// 		this.database = await new database().init()
// 		this.initNews()
// 		this.initLaunch()
// 		// this.initStatusServer()
// 		this.initBtn()
// 		this.bkgrole();
//         this.initLinks();

// 	}
// 	async function getPlayerAvatar(uuid) {
// 		try {
// 			const response = await fetch(`http://localhost/launcherx/public/avatar/player/${uuid}`);
// 			if (response.ok) {
// 				const data = await response.json();
// 				updatePlayerAvatar(data.avatarUrl);
// 			} else {
// 				throw new Error('Network response was not ok.');
// 			}
// 		} catch (error) {
// 			console.error('There was a problem with the fetch operation:', error);
// 		}
// 	}
	
// 	function updatePlayerAvatar(avatarUrl) {
// 		const playerHeadImg = document.querySelector('.player-head');
// 		playerHeadImg.src = avatarUrl;
// 	}
	
// 	async initNews() {
// 			let news = document.querySelector('.news-list')
// 			if (this.news) {
// 				if (!this.news.length) {
// 					let blockNews = document.createElement('div')
// 					blockNews.classList.add('news-block', 'opacity-1')
// 					blockNews.innerHTML = `
// 		                <div class="news-header">
// 		                    <div class="header-text">
// 		                        <div class="title">No news available.</div>
// 		                    </div>
// 		                </div>
// 		                <div class="news-content">
// 		                    <div class="bbWrapper">
// 		                        <p>There is no All news related to the server will be displayed here. available.</p>
// 		                    </div>
// 		                </div>`
// 					news.appendChild(blockNews)
// 				} else {
// 					for (let News of this.news) {
// 						let date = await this.getdate(News.publish_date)
// 						let blockNews = document.createElement('div')
// 						blockNews.classList.add('news-block')
// 						blockNews.innerHTML = `
// 		                    <div class="news-header">
// 		                        <div class="header-text">
// 		                            <div class="title">${News.title}</div>
// 		                        </div>
// 		                        <div class="date">
// 		                            <div class="day">${date.day}</div>
// 		                            <div class="month">${date.month}</div>
// 		                        </div>
// 		                    </div>
// 		                    <div class="news-content">
// 		                        <div class="bbWrapper">
// 		                            <p>${News.content.replace(/\n/g, '</br>')}</p>
// 		                            <p class="news-author">Autor,<span> ${News.author}</span></p>
// 		                        </div>
// 		                    </div>`
// 						news.appendChild(blockNews)
// 					}
// 				}
// 			} else {
// 				let blockNews = document.createElement('div')
// 				blockNews.classList.add('news-block', 'opacity-1')
// 				blockNews.innerHTML = `
// 		            <div class="news-header">
// 		                <div class="header-text">
// 		                    <div class="title">Error.</div>
// 		                </div>
// 		            </div>
// 		            <div class="news-content">
// 		                <div class="bbWrapper">
// 		                    <p>No information could be obtained.</p>
// 		                </div>
// 		            </div>`
// 				news.appendChild(blockNews)
// 			}
// 		// Create a function to fetch the changelog version asynchronously
// 		async function fetchChangelog() {
// 			try {
// 				// Make a GET request to fetch the changelog data from the JSON file
// 				const response = await fetch('http://localhost/launcher/launcher/launcher/changelog.json');
// 				// Parse the JSON response
// 				const data = await response.json();
// 				// Return the changelog data
// 				return data;
// 			} catch (error) {
// 				console.error('Error fetching changelog:', error);
// 				return null; // Return null in case of error
// 			}
// 		}

// // Call the fetchChangelogVersion function to get the changelog version
// fetchChangelog()
//     .then(changelogData => {
//         // Create the title element with the fetched changelog version
//         let titleChangelog = document.createElement("div");
//         titleChangelog.innerHTML = `<div>${changelogData.changelog_version}</div>`;
//         document.querySelector('.title-change').appendChild(titleChangelog);
//         if (!changelogData.changelog_version) {
//             document.querySelector(".title-change").style.display = "none";
//         }

//         // Create the content element with the fetched changelog content
//         let bbWrapperChange = document.createElement("div");
//         bbWrapperChange.innerHTML = `<div>${changelogData.changelog_new}</div>`;
//         document.querySelector('.bbWrapperChange').appendChild(bbWrapperChange);
//         if (!changelogData.changelog_new) {
//             document.querySelector(".bbWrapperChange").style.display = "none";
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching changelog:', error);
//     });

// 		}
// 		async bkgrole () {
// 			let uuid = (await this.database.get('1234', 'accounts-selected')).value;
// 			let account = (await this.database.get(uuid.selected, 'accounts')).value;
		
// 			if (this.config.whitelist_activate === true) {
// 			if (!this.config.whitelist.includes(account.name)) {
// 				document.querySelector(".play-btn").style.backgroundColor = "#696969"; // Couleur de fond grise
// 				document.querySelector(".play-btn").style.pointerEvents = "none"; // Désactiver les événements de souris
// 				document.querySelector(".play-btn").style.boxShadow = "none";
// 				document.querySelector(".play-btn").textContent = "Indisponible";        
// 			}
// 		}}

// 	async initLaunch() {
// 		document.querySelector('.play-btn').addEventListener('click', async () => {
// 			let urlpkg = pkg.user ? `${pkg.url}/${pkg.user}` : pkg.url
// 			let uuid = (await this.database.get('1234', 'accounts-selected')).value
// 			let account = (await this.database.get(uuid.selected, 'accounts')).value
// 			let ram = (await this.database.get('1234', 'ram')).value
// 			let Resolution = (await this.database.get('1234', 'screen')).value
// 			let launcherSettings = (await this.database.get('1234', 'launcher')).value

// 			let playBtn = document.querySelector('.play-btn')
// 			let info = document.querySelector('.text-download')
// 			let progressBar = document.querySelector('.progress-bar')

// 			// if (Resolution.screen.width == '<auto>') {
// 			// 	screen = false
// 			// 	if (account.user_info.role.name === this.config.role_data.role1.name) {
// 			// 		document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role1.background}) black no-repeat center center scroll`;
// 			// 	}
// 			// 	if (account.user_info.role.name === this.config.role_data.role2.name) {
// 			// 		document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role2.background}) black no-repeat center center scroll`;
// 			// 	}
// 			// 	if (account.user_info.role.name === this.config.role_data.role3.name) {
// 			// 		document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role3.background}) black no-repeat center center scroll`;
// 			// 	}
// 			// 	if (account.user_info.role.name === this.config.role_data.role4.name) {
// 			// 		document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role4.background}) black no-repeat center center scroll`;
// 			// 	}
// 			// 	if (account.user_info.role.name === this.config.role_data.role5.name) {
// 			// 		document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role5.background}) black no-repeat center center scroll`;
// 			// 	}
// 			// 	if (account.user_info.role.name === this.config.role_data.role6.name) {
// 			// 		document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role6.background}) black no-repeat center center scroll`;
// 			// 	}
// 			// 	if (account.user_info.role.name === this.config.role_data.role7.name) {
// 			// 		document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role7.background}) black no-repeat center center scroll`;
// 			// 	}
// 			// 	if (account.user_info.role.name === this.config.role_data.role8.name) {
// 			// 		document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role8.background}) black no-repeat center center scroll`;
// 			// 	}
// 			// } else {
// 			// 	screen = {
// 			// 		width: Resolution.screen.width,
// 			// 		height: Resolution.screen.height,
// 			// 	}
// 			// }

// 			let opts = {
// 				url:
// 					this.config.game_url === '' || this.config.game_url === undefined
// 						? `${urlpkg}/files`
// 						: this.config.game_url,
// 				authenticator: account,
// 				timeout: 10000,
// 				path: `${dataDirectory}/${
// 					process.platform == 'darwin'
// 						? this.config.dataDirectory
// 						: `.${this.config.dataDirectory}`
// 				}`,
// 				version: this.config.game_version,
// 				instance: 'launcherx',
// 				detached: launcherSettings.launcher.close === 'close-all' ? false : true,
// 				downloadFileMultiple: 30,

// 				loader: {
// 					type: this.config.loader.type,
// 					build: this.config.loader.build,
// 					enable: this.config.loader.enable,
// 				},

// 				verify: this.config.verify,
// 				ignored: ['loader', ...this.config.ignored],

// 				java: true,

// 				JVM_ARGS: [
// 					`-javaagent:${path.join(
// 						process.cwd(),
// 						process.env.NODE_ENV === 'dev' ? 'src' : 'resources',
// 						'libraries',
// 						'java',
// 						'LauncherX.jar'
// 					)}=:http://localhost/launcherx/public/api/yggdrasil`,
// 					'-Dauthlibinjector.side=client',
// 					'-Dauthlibinjector.yggdrasil.prefetched=ewogICAgIm1ldGEiOiB7CiAgICAgICAgInNlcnZlck5hbWUiOiAiTGF1bmNoZXJYIFNraW4iLAogICAgICAgICJpbXBsZW1lbnRhdGlvbk5hbWUiOiAiWWdnZHJhc2lsIEFQSSBmb3IgQmxlc3NpbmcgU2tpbiIsCiAgICAgICAgImltcGxlbWVudGF0aW9uVmVyc2lvbiI6ICI1LjIuMSIsCiAgICAgICAgImxpbmtzIjogewogICAgICAgICAgICAiaG9tZXBhZ2UiOiAiaHR0cDovL2xvY2FsaG9zdC9wdWJsaWMiLAogICAgICAgICAgICAicmVnaXN0ZXIiOiAiaHR0cDovL2xvY2FsaG9zdC9wdWJsaWMvYXV0aC9yZWdpc3RlciIKICAgICAgICB9LAogICAgICAgICJmZWF0dXJlLm5vbl9lbWFpbF9sb2dpbiI6IHRydWUKICAgIH0sCiAgICAic2tpbkRvbWFpbnMiOiBbCiAgICAgICAgImxvY2FsaG9zdCIKICAgIF0sCiAgICAic2lnbmF0dXJlUHVibGlja2V5IjogIi0tLS0tQkVHSU4gUFVCTElDIEtFWS0tLS0tXG5NSUlDSWpBTkJna3Foa2lHOXcwQkFRRUZBQU9DQWc4QU1JSUNDZ0tDQWdFQXBCMFMzRHRSdHVFSTNOT1pNUnVRXG5TQUxPTUxxL0pqMWF5OXN4Z0RwM2dGMHhXRDVuWmo1dWx3R3BTai8rbkNjODA5dUszZmthem9HZXdxeHdhNjlRXG5QWkYzOTdOZDA3SDRDUGg4MXVPNnMySnJsTEk3N1l4dUhCTGNHVEhlZUJTN3JoVUQvb2RZZjlKbHpsQ3VPUnN0XG5mUWdHZXJNUWxieXk1bWpnRzZzeXd0bTJDVElBY2U2N1lydk5zc1cxWFplayt3RlFXR1ljY3pYTVZQYmIrdVhoXG4vT1VkZ01ySmljcUEyKzE1dXZIR3QvbC9oTHhEV1hhMXpyYXZpZDJaOEYrNTRTVWlSRDh2M2NmM25zNDRmSSs4XG5ScDZtaFRJTTZjNEVvRzFka3FCUk4rTElOalNOd25xOFVzQ25VYXZ2TEZIcWFSa05DYTVHb2IxZU9GRlVPMUxNXG5CeVgrZE9EK0pZVUFwRmEreVA1TC9XMDdWbWVmUWJNcys1akFFSHZXS3o0bzFHaDdjWk1PS01Db0w2Ujc4QlM2XG5jWEVia0dhWjQycGRtOWprUytmWFNZTmsrQzdGY1pEOEpIRG5zYTFxUjRKUXhKQXUrQ1hiK3FDZTRmeWtVb1lhXG5naFJpSUMrODArLzYwKzZQb1hyaGhYY1k4ZHIzdW1hdkN2ZWg5eHgzSFlZSU1BbFA0R0k4dlcwNXJjbTkxbjRqXG42dmkrOWw4VCtrcUdXOVAvaGd6WHgxMmdqMHFnK0g0U1FCWmg2SkpieExXRTJBTmRvOWV5bVNSb1FEODl4bEdsXG5MWXJQSTRLdnhsNGpYN1RxeW5RM3B1UE52YjRZT1dIRWJjdFhBNjJFa0orV3NCc2pLN0UzRkdOeXlwV1hPNVpiXG44ejRxTDF3aE8yeE96V2lBN3BiUHplMENBd0VBQVE9PVxuLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tXG4iCn0=',
// 				],

// 				memory: {
// 					min: `${ram.ramMin * 1024}M`,
// 					max: `${ram.ramMax * 1024}M`,
// 				},
// 			}


// 			launch.Launch(opts)

// 			launch.on('extract', (extract) => {
// 				console.log(extract)
// 			})

// 			launch.on('progress', (progress, size) => {
// 				document.querySelector(".play-btn").textContent = ` Downloading.. ${((progress / size) * 100).toFixed(0)}%`
// 				ipcRenderer.send('main-window-progress', { progress, size })
// 			});


// 			launch.on('check', (progress, size) => {
// 				document.querySelector(".play-btn").textContent = `checking.. ${((progress / size) * 100).toFixed(0)}%`
// 			});

// 			launch.on('estimated', (time) => {
// 				if (isNaN(time)) {
// 					document.querySelector('.text-download').innerHTML =
// 						'Unexpected error.\nRestart the launcher'
// 					document.querySelector('.text-download').style.margin = '-35%'
// 					return
// 				}
// 				let hours = Math.floor(time / 3600)
// 				let minutes = Math.floor((time - hours * 3600) / 60)
// 				let seconds = Math.floor(time - hours * 3600 - minutes * 60)
// 				console.log(`${hours}h ${minutes}m ${seconds}s`)
// 			})

// 			launch.on('speed', (speed) => {
// 				if (speed == 0) return
// 				console.log(`${(speed / 1067008).toFixed(2)} Mb/s`)
// 			})

// 			launch.on('patch', (patch) => {
// 				console.log(patch)
// 				info.innerHTML = `Patching ..`
// 			})

// 			launch.on('data', (e) => {
// 				new logger('Minecraft', '#36b030')
// 				if (launcherSettings.launcher.close === 'close-launcher')
// 					ipcRenderer.send('main-window-hide')
// 				ipcRenderer.send('main-window-progress-reset')

// 				progressBar.style.display = 'none'
// 				info.innerHTML = `Starting...`
// 				console.log(e)
// 			})

// 			launch.on('close', code => {
// 				if (launcherSettings.launcher.close === 'close-launcher') ipcRenderer.send("main-window-show");
// 				info.textContent = `Verify`
// 				document.getElementById('btn-playee').style.cssText = '';
// 				console.log('Close');
// 			});

// 			launch.on('error', (err) => {
// 				console.log(err)
// 				console.log('trying new Launch...')
// 				launch.Launch(opts)
// 			})
// 		})
// 	}
	

// 	async initStatusServer() {
//         let nameServer = document.querySelector('.server-text .name');
//         let serverMs = document.querySelector('.server-text .desc');
//         let playersConnected = document.querySelector('.etat-text .text');
//         let online = document.querySelector(".etat-text .online");
//         let serverPing = await new Status(this.config.status.ip, this.config.status.port).getStatus();

//         if (!serverPing.error) {
//             nameServer.textContent = this.config.status.nameServer;
//             serverMs.innerHTML = `<span class="green">Opérationnel</span> - ${serverPing.ms}ms`;
//             online.classList.toggle("off");
//             playersConnected.textContent = serverPing.playersConnect;
//         } else if (serverPing.error) {
//             nameServer.textContent = 'Serveur indisponible';
//             serverMs.innerHTML = `<span class="red">Fermé</span>`;
//         }
//     }

//     initLinks(){
//         let status = document.querySelector(".status");
//         status.addEventListener("click", () => {
//             require('electron').shell.openExternal("https://google.com");
//         });

//       }

//     initBtn() {
//         document.querySelector('.settings-btn').addEventListener('click', () => {
//             changePanel('settings');
//         });
//         document.querySelector('.account-btn').addEventListener('click', () => {
//             changePanel('settings');
//         });
//     }

//     async getdate(e) {
//         let date = new Date(e)
//         let year = date.getFullYear()
//         let month = date.getMonth() + 1
//         let day = date.getDate()
//         let allMonth = ['January', 'Ferbuary', 'March', 'April','May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
//         return { year: year, month: allMonth[month - 1], day: day }
//     }
	
// }

// export default Home;
/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
 */

'use strict';

import { logger, database, changePanel} from '../utils.js';

const { Launch, Status } = require('minecraft-java-core');
const { ipcRenderer } = require('electron');
const launch = new Launch();
const pkg = require('../package.json');

const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? `${process.env.HOME}/Library/Application Support` : process.env.HOME)

class Home {
    static id = "home";
    async init(config, news) {
        this.database = await new database().init();
        this.config = config
        this.news = await news
        this.initNews();
        this.initLaunch();
        this.initStatusServer();
        this.initBtn();
        this.bkgrole();
    }
// class Home {
// 	static id = 'home'
// 	async init(config, news) {
// 		this.config = config
// 		this.news = await news
// 		this.database = await new database().init()
// 		this.initNews()
// 		this.initLaunch()
// 		// this.initStatusServer()
// 		this.initBtn()
// 		this.bkgrole();
//         this.initLinks();
// 		await this.getPlayerHead('{account.name}');
// 		// this.IniciarEstadoDiscord();
// 		// Replace 'PLAYER_NAME' with the actual player name
// 	}
    
	// async IniciarEstadoDiscord() {
    //     ipcRenderer.send('new-status-discord');
    //     document.querySelector('.settings-btn').addEventListener('click', e => changePanel('settings'))
    // }
	// async getPlayerHead(playerName) {
	// 	try {
	// 		let url = `http://localhost/public/avatar/player/${playerName}?2d&size=100`;
	// 		let response = await fetch(url);
	// 		if (response.ok) {

	// 			let blob = await response.blob();
	// 			let headImg = document.querySelector('.player-head');
	// 			headImg.src = URL.createObjectURL(blob);
	// 		} else {
	// 			console.error('Failed to fetch player head:', response.status);
	// 		}
	// 	} catch (error) {
	// 		console.error('Error fetching player head:', error);
	// 	}
	// 	getPlayerHead(playerName);

	// }
	

	async initNews() {
			let news = document.querySelector('.news-list')
			if (this.news) {
				if (!this.news.length) {
					let blockNews = document.createElement('div')
					blockNews.classList.add('news-block', 'opacity-1')
					blockNews.innerHTML = `
		                <div class="news-header">
		                    <div class="header-text">
		                        <div class="title">No news available.</div>
		                    </div>
		                </div>
		                <div class="news-content">
		                    <div class="bbWrapper">
		                        <p>There is no All news related to the server will be displayed here. available.</p>
		                    </div>
		                </div>`
					news.appendChild(blockNews)
				} else {
					for (let News of this.news) {
						let date = await this.getdate(News.publish_date)
						let blockNews = document.createElement('div')
						blockNews.classList.add('news-block')
						blockNews.innerHTML = `
		                    <div class="news-header">
		                        <div class="header-text">
		                            <div class="title">${News.title}</div>
		                        </div>
		                        <div class="date">
		                            <div class="day">${date.day}</div>
		                            <div class="month">${date.month}</div>
		                        </div>
		                    </div>
		                    <div class="news-content">
		                        <div class="bbWrapper">
		                            <p>${News.content.replace(/\n/g, '</br>')}</p>
		                            <p class="news-author">Autor,<span> ${News.author}</span></p>
		                        </div>
		                    </div>`
						news.appendChild(blockNews)
					}
				}
			} else {
				let blockNews = document.createElement('div')
				blockNews.classList.add('news-block', 'opacity-1')
				blockNews.innerHTML = `
		            <div class="news-header">
		                <div class="header-text">
		                    <div class="title">Error.</div>
		                </div>
		            </div>
		            <div class="news-content">
		                <div class="bbWrapper">
		                    <p>No information could be obtained.</p>
		                </div>
		            </div>`
				news.appendChild(blockNews)
			}

		async function fetchChangelog() {
			try {
				const response = await fetch('https://raw.githubusercontent.com/Snozxyx/essentials/main/launcher/changelog.json');
				const data = await response.json();
				return data;
			} catch (error) {
				console.error('Error fetching changelog:', error);
				return null;
			}
		}

		fetchChangelog()
		    .then(changelogData => {
		        let titleChangelog = document.createElement("div");
		        titleChangelog.innerHTML = `<div>${changelogData.changelog_version}</div>`;
		        document.querySelector('.title-change').appendChild(titleChangelog);
		        if (!changelogData.changelog_version) {
		            document.querySelector(".title-change").style.display = "none";
		        }

		        let bbWrapperChange = document.createElement("div");
		        bbWrapperChange.innerHTML = `<div>${changelogData.changelog_new}</div>`;
		        document.querySelector('.bbWrapperChange').appendChild(bbWrapperChange);
		        if (!changelogData.changelog_new) {
		            document.querySelector(".bbWrapperChange").style.display = "none";
		        }
		    })
		    .catch(error => {
		        console.error('Error fetching changelog:', error);
		    });
		}

		async bkgrole () {
			let uuid = (await this.database.get('1234', 'accounts-selected')).value;
			let account = (await this.database.get(uuid.selected, 'accounts')).value;
		
			if (this.config.whitelist_activate === true) {
			if (!this.config.whitelist.includes(account.name)) {
				document.querySelector(".play-btn").style.backgroundColor = "#696969"; // Couleur de fond grise
				document.querySelector(".play-btn").style.pointerEvents = "none"; // Désactiver les événements de souris
				document.querySelector(".play-btn").style.boxShadow = "none";
				document.querySelector(".play-btn").textContent = "Indisponible";        
			}
		}
			
			if (account.user_info.role.name === this.config.role_data.role1.name) {
				document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role1.background}) black no-repeat center center scroll`;
			}
			if (account.user_info.role.name === this.config.role_data.role2.name) {
				document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role2.background}) black no-repeat center center scroll`;
			}
			if (account.user_info.role.name === this.config.role_data.role3.name) {
				document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role3.background}) black no-repeat center center scroll`;
			}
			if (account.user_info.role.name === this.config.role_data.role4.name) {
				document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role4.background}) black no-repeat center center scroll`;
			}
			if (account.user_info.role.name === this.config.role_data.role5.name) {
				document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role5.background}) black no-repeat center center scroll`;
			}
			if (account.user_info.role.name === this.config.role_data.role6.name) {
				document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role6.background}) black no-repeat center center scroll`;
			}
			if (account.user_info.role.name === this.config.role_data.role7.name) {
				document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role7.background}) black no-repeat center center scroll`;
			}
			if (account.user_info.role.name === this.config.role_data.role8.name) {
				document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${this.config.role_data.role8.background}) black no-repeat center center scroll`;
			}
			
		   
		}
	
		
	
		async initLaunch() {
			document.querySelectorAll('.play-btn').forEach(button => {
				button.addEventListener('click', async () => {
					let urlpkg = pkg.user ? `${pkg.url}/${pkg.user}` : pkg.url;
					let uuid = (await this.database.get('1234', 'accounts-selected')).value;
					let account = (await this.database.get(uuid.selected, 'accounts')).value;
					let ram = (await this.database.get('1234', 'ram')).value;
					let javaPath = (await this.database.get('1234', 'java-path')).value;
					let javaArgs = (await this.database.get('1234', 'java-args')).value;
					let Resolution = (await this.database.get('1234', 'screen')).value;
					let launcherSettings = (await this.database.get('1234', 'launcher')).value;
					let screen;
		
					let info = document.querySelector(".play-btn")
	
	
					info.textContent = `Verifying`
	
					document.getElementById('btn-playee').style.backgroundImage = 'linear-gradient(145deg, var(--box-button-gradient-1) 0%, var(--box-button-gradient-2) 100%)';
		
					if (Resolution.screen.width == '<auto>') {
						screen = false
					} else {
						screen = {
							width: Resolution.screen.width,
							height: Resolution.screen.height
						}
					}
		
					let opts = {
						url: `${pkg.settings}/data`,
						authenticator: account,
						timeout: 10000,
						path: `${dataDirectory}/${process.platform == 'darwin' ? this.config.dataDirectory : `.${this.config.dataDirectory}`}`,
						version: this.config.game_version,
						detached: launcherSettings.launcher.close === 'close-all' ? false : true,
						downloadFileMultiple: 30,
						loader: {
							type: this.config.loader.type,
							build: this.config.loader.build,
							enable: this.config.loader.enable,
						},
						verify: this.config.verify,
						ignored: this.config.ignored,
		
						java: this.config.java,
						memory: {
							min: `${ram.ramMin * 1024}M`,
							max: `${ram.ramMax * 1024}M`
						}
					}
		
					launch.Launch(opts);
		
					launch.on('extract', extract => {
						console.log(extract);
					});
		
					launch.on('progress', (progress, size) => {
						document.querySelector(".play-btn").textContent = `Downloading ${((progress / size) * 100).toFixed(0)}%`
						ipcRenderer.send('main-window-progress', { progress, size })
					});
		
					launch.on('check', (progress, size) => {
						document.querySelector(".play-btn").textContent = `Verification ${((progress / size) * 100).toFixed(0)}%`
					});
		
					launch.on('estimated', (time) => {
						let hours = Math.floor(time / 3600);
						let minutes = Math.floor((time - hours * 3600) / 60);
						let seconds = Math.floor(time - hours * 3600 - minutes * 60);
						console.log(`${hours}h ${minutes}m ${seconds}s`);
					})
		
					launch.on('speed', (speed) => {
						console.log(`${(speed / 1067008).toFixed(2)} Mb/s`)
					})
		
					launch.on('patch', patch => {
						console.log(patch);
						info.textContent = `Patch in progress...`
					});
		
					launch.on('data', (e) => {
						new logger('Minecraft', '#36b030');
						if (launcherSettings.launcher.close === 'close-launcher') ipcRenderer.send("main-window-hide");
						ipcRenderer.send('main-window-progress-reset')
						info.textContent = `Starting up...`
						console.log(e);
					})
		
					launch.on('close', code => {
						if (launcherSettings.launcher.close === 'close-launcher') ipcRenderer.send("main-window-show");
						info.textContent = `Join`
						document.getElementById('btn-playee').style.cssText = '';
						new logger('Launcher', '#7289da');
						console.log('Close');
					});
		
					launch.on('error', err => {
						console.log(err);
					});
				});
			});
		}
	async initStatusServer() {
        let nameServer = document.querySelector('.server-text .name');
        let serverMs = document.querySelector('.server-text .desc');
        let playersConnected = document.querySelector('.etat-text .text');
        let online = document.querySelector(".etat-text .online");
        let serverPing = await new Status(this.config.status.ip, this.config.status.port).getStatus();

        if (!serverPing.error) {
            nameServer.textContent = this.config.status.nameServer;
            serverMs.innerHTML = `<span class="green">Operational</span> - ${serverPing.ms}ms`;
            online.classList.toggle("off");
            playersConnected.textContent = serverPing.playersConnect;
        } else if (serverPing.error) {
            nameServer.textContent = 'Server unavailable';
            serverMs.innerHTML = `<span class="red">Offline</span>`;
        }
    }

    initLinks(){
        let status = document.querySelector(".status");
        status.addEventListener("click", () => {
            require('electron').shell.openExternal("https://tenxmc.me");
        });

      }

    initBtn() {
        document.querySelector('.settings-btn').addEventListener('click', () => {
            changePanel('settings');
        });
        document.querySelector('.account-btn').addEventListener('click', () => {
            changePanel('settings');
        });
    }

    async getdate(e) {
        let date = new Date(e)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let allMonth = ['January', 'Ferbuary', 'March', 'April','May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return { year: year, month: allMonth[month - 1], day: day }
    }
	
}
// function updatePlayerName() {
//     // Prompt the user for their name
//     let playerNames = (${playerName} || prompt("Please enter a username"));

//     if (playerName !== null && playerName !== "") {
//         // Update the <h1> tag with the provided player name
//         let playerNameHeading = document.getElementById("playerNameHeading");
//         playerNameHeading.textContent = playerName;
//     }
// }
export default Home;
