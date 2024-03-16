/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
 */

const pkg = require('../package.json');
const fetch = require("node-fetch");
const convert = require("xml-js");

let settings_url = pkg.user ? `${pkg.settings}/${pkg.user}` : pkg.settings;
let config = `${settings_url}/utils/api`;

class Config {
    GetConfig() {
        return new Promise((resolve, reject) => {
            fetch(config)
                .then((config) => {
                    return resolve(config.json());
                })
                .catch((error) => {
                    document.querySelector('.loader_bg').innerHTML = 'Connection Failed';
                    return reject(error);
                });
        });
    }

    async GetNews() {
        try {
            this.config = await this.GetConfig();
            let url = `${this.config.azauth}/api`;
            let newsUrl = `https://raw.githubusercontent.com/Snozxyx/essentials/main/launcher/news.json`;
            let news = await fetch(newsUrl);
            if (news.status === 200) {
                try {
                    let newsData = await news.json();
                    return newsData;
                } catch (error) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    }
}

export default new Config();
