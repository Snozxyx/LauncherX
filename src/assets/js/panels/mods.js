// // const fs = require('fs');
// // const path = require('path');
// // const { ipcRenderer } = require('electron');
// // const axios = require('axios');

// // const modsDirectory = path.join(process.env.APPDATA, '.sakura', 'instances', 'launcherx', 'mods');
// // let lockedFiles = [];

// // async function loadLockedFilesFromConfig() {
// //     try {
// //         const response = await axios.get('http://localhost/launcher/launcher/launcher/config.json'); // Replace with your actual URL
// //         lockedFiles = response.data.lockedFiles || [];
// //         console.log('Locked files loaded:', lockedFiles);
// //     } catch (error) {
// //         console.error('Error loading locked files:', error);
// //     }
// // }

// // function loadMods() {
// //     fs.readdir(modsDirectory, (err, files) => {
// //         if (err) {
// //             console.error(err);
// //             return;
// //         }

// //         const modsList = document.getElementById('mods-list');
// //         modsList.innerHTML = '';

// //         const unlockedMods = [];
// //         const lockedMods = [];

// //         files.forEach(file => {
// //             if (path.extname(file) === '.jar') {
// //                 const isDisabled = file.endsWith('-disabled.jar');
// //                 const modName = isDisabled ? file.replace('-disabled.jar', '') : file;

// //                 const modItem = document.createElement('div');
// //                 modItem.classList.add('mod');

// //                 const modNameSpan = document.createElement('span');
// //                 modNameSpan.textContent = modName;

// //                 if (!lockedFiles.includes(file)) {
// //                     if (isDisabled) {
// //                         const enableButton = document.createElement('button');
// //                         enableButton.textContent = 'Enable';
// //                         enableButton.addEventListener('click', () => toggleMod(file, true));
// //                         modItem.appendChild(enableButton);
// //                     } else {
// //                         const disableButton = document.createElement('button');
// //                         disableButton.textContent = 'Disable';
// //                         disableButton.addEventListener('click', () => toggleMod(file, false));
// //                         modItem.appendChild(disableButton);
// //                     }
// //                     unlockedMods.push(modItem);
// //                 } else {
// //                     modItem.classList.add('locked');
// //                     lockedMods.push(modItem);
// //                 }

// //                 modItem.appendChild(modNameSpan);
// //             }
// //         });

// //         const unlockedSection = document.createElement('div');
// //         unlockedSection.classList.add('mod-section');
// //         unlockedSection.innerHTML = '<h2 style="font-family: Verdana, Geneva, Tahoma, sans-serif;">Unlocked Mods</h2>';
// //         unlockedMods.forEach(modItem => unlockedSection.appendChild(modItem));
// //         modsList.appendChild(unlockedSection);

// //         const lockedSection = document.createElement('div');
// //         lockedSection.classList.add('mod-section');
// //         lockedSection.innerHTML = '<h2 style="font-family: Verdana, Geneva, Tahoma, sans-serif;">Locked Mods</h2>';
// //         lockedMods.forEach(modItem => lockedSection.appendChild(modItem));
// //         modsList.appendChild(lockedSection);
// //     });
// // }

// // function toggleMod(fileName, enable) {
// //     if (lockedFiles.includes(fileName)) {
// //         console.log(`"${fileName}" is locked and cannot be enabled or disabled.`);
// //         return;
// //     }

// //     const filePath = path.join(modsDirectory, fileName);
// //     const newFileName = enable ? fileName.replace('-disabled.jar', '.jar') : fileName.replace('.jar', '-disabled.jar');
// //     const newFilePath = path.join(modsDirectory, newFileName);

// //     fs.rename(filePath, newFilePath, err => {
// //         if (err) {
// //             console.error(err);
// //             return;
// //         }
// //         loadMods();
// //     });
// // }

// // window.onload = async () => {
// //     await loadLockedFilesFromConfig();
// //     loadMods();
// // };

// // document.querySelector('.frame').classList.toggle('hide');
// // document.querySelector('.dragbar').classList.toggle('hide');

// // document.querySelector('#minimize').addEventListener('click', () => {
// //     ipcRenderer.send('main-window-minimize');
// // });
// const fs = require('fs');
// const path = require('path');
// const axios = require('axios');

// const modsDirectory = path.join(process.env.APPDATA, '.sakura', 'instances', 'launcherx', 'mods');
// let lockedFiles = [];
// let modDescriptions = {};
// let modLogos = {};

// async function loadModDataFromConfig() {
//     try {
//         const response = await axios.get('http://localhost/launcher/launcher/launcher/config.json'); // Replace with your actual URL
//         lockedFiles = response.data.lockedFiles || [];
//         modDescriptions = response.data.descriptions || {};
//         modLogos = response.data.logos || {};
//         console.log('Mod data loaded:', lockedFiles, modDescriptions, modLogos);
//     } catch (error) {
//         console.error('Error loading mod data:', error);
//     }
// }

// function loadMods() {
//     fs.readdir(modsDirectory, (err, files) => {
//         if (err) {
//             console.error(err);
//             return;
//         }

//         const modsList = document.getElementById('mods-list');
//         modsList.innerHTML = '';

//         const unlockedMods = [];
//         const lockedMods = [];

//         files.forEach(file => {
//             if (path.extname(file) === '.jar') {
//                 const isDisabled = file.endsWith('-disabled.jar');
//                 const modName = isDisabled ? file.replace('-disabled.jar', '') : file;
//                 const modDescription = modDescriptions[modName] || "Description not available";
//                 const modLogo = modLogos[modName] || "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png";

//                 const modItem = document.createElement('div');
//                 modItem.classList.add('mod');

//                 const modNameSpan = document.createElement('span');
//                 modNameSpan.textContent = modName;

//                 const modDescriptionPara = document.createElement('p');
//                 modDescriptionPara.textContent = modDescription;
//                 modDescriptionPara.style.display = 'none';

//                 modNameSpan.addEventListener('click', () => {
//                     if (modDescriptionPara.style.display === 'none') {
//                         modDescriptionPara.style.display = 'block';
//                     } else {
//                         modDescriptionPara.style.display = 'none';
//                     }
//                 });

//                 const modLogoImg = document.createElement('img');
//                 modLogoImg.src = modLogo;
//                 modLogoImg.alt = 'Mod Logo';

//                 modItem.appendChild(modLogoImg);
//                 modItem.appendChild(modNameSpan);
//                 modItem.appendChild(modDescriptionPara);

//                 if (!lockedFiles.includes(file)) {
//                     const toggleButton = document.createElement('button');
//                     toggleButton.textContent = isDisabled ? 'Enable' : 'Disable';
//                     toggleButton.addEventListener('click', () => toggleMod(file, !isDisabled));
//                     modItem.appendChild(toggleButton);
//                     unlockedMods.push(modItem);
//                 } else {
//                     modItem.classList.add('locked');
//                     lockedMods.push(modItem);
//                 }
//             }
//         });

//         // Append unlocked mods first
//         unlockedMods.forEach(modItem => modsList.appendChild(modItem));
//         // Append locked mods at the bottom
//         lockedMods.forEach(modItem => modsList.appendChild(modItem));
//     });
// }

// function toggleMod(fileName, enable) {
//     if (lockedFiles.includes(fileName)) {
//         console.log(`"${fileName}" is locked and cannot be enabled or disabled.`);
//         return;
//     }

//     const filePath = path.join(modsDirectory, fileName);
//     const newFileName = enable ? fileName.replace('-disabled.jar', '.jar') : fileName.replace('.jar', '-disabled.jar');
//     const newFilePath = path.join(modsDirectory, newFileName);

//     fs.rename(filePath, newFilePath, err => {
//         if (err) {
//             console.error('Error toggling mod:', err);
//             return;
//         }
//         loadMods();
//     });
// }

// window.onload = async () => {
//     await loadModDataFromConfig();
//     loadMods();
// };
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const modsDirectory = path.join(process.env.APPDATA, '.launcherx', 'mods');
let lockedFiles = [];
let modData = {};

// Load mod data from configuration file
async function loadModDataFromConfig() {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/Snozxyx/essentials/main/launcher/new_mods.json');
        lockedFiles = response.data.lockedFiles || [];
        modData = response.data.mods || {};
        console.log('Mod data loaded:', lockedFiles, modData);
    } catch (error) {
        console.error('Error loading mod data:', error);
    }
}

// Function to toggle the visibility of mod description
function toggleDescription(modItem) {
    const descriptionPara = modItem.querySelector('p');
    descriptionPara.style.display = descriptionPara.style.display === 'block' ? 'none' : 'block';
}

// Function to load mods
function loadMods() {
    fs.readdir(modsDirectory, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }

        const modsList = document.getElementById('mods-list');
        modsList.innerHTML = '';

        const unlockedMods = [];
        const lockedMods = [];

        files.forEach(file => {
            if (path.extname(file) === '.jar') {
                const isDisabled = file.endsWith('-disabled.jar');
                const modName = isDisabled ? file.replace('-disabled.jar', '') : file;

                const modItem = document.createElement('div');
                modItem.classList.add('mod');

                const modLogoImg = document.createElement('img');
                modLogoImg.src = modData[modName]?.logo || 'https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png';
                modLogoImg.alt = 'Mod Logo';
                modItem.appendChild(modLogoImg);

                const modNameSpan = document.createElement('span');
                modNameSpan.textContent = modName;
                modItem.appendChild(modNameSpan);

                const modDescriptionPara = document.createElement('p');
                modDescriptionPara.textContent = modData[modName]?.description || "Description not available";
                modDescriptionPara.style.display = 'none';
                modItem.appendChild(modDescriptionPara);

                if (!lockedFiles.includes(file)) {
                    if (isDisabled) {
                        const enableButton = document.createElement('button');
                        enableButton.textContent = 'Enable';
                        enableButton.addEventListener('click', () => toggleMod(file, true));
                        modItem.appendChild(enableButton);
                    } else {
                        const disableButton = document.createElement('button');
                        disableButton.textContent = 'Disable';
                        disableButton.addEventListener('click', () => toggleMod(file, false));
                        modItem.appendChild(disableButton);
                    }
                    unlockedMods.push(modItem);
                } else {
                    modItem.classList.add('locked');
                    lockedMods.push(modItem);
                }
            }
        });

        const unlockedSection = document.createElement('div');
        unlockedSection.classList.add('mod-section');
        unlockedSection.innerHTML = '<h2>OptionalMods</h2>';
        unlockedMods.forEach(modItem => unlockedSection.appendChild(modItem));
        modsList.appendChild(unlockedSection);

        const lockedSection = document.createElement('div');
        lockedSection.classList.add('mod-section');
        lockedSection.innerHTML = '<h2>Core Mods</h2>';
        lockedMods.forEach(modItem => lockedSection.appendChild(modItem));
        modsList.appendChild(lockedSection);
    });
}

// Function to toggle mod enable/disable
function toggleMod(fileName, enable) {
    if (lockedFiles.includes(fileName)) {
        console.log(`"${fileName}" is locked and cannot be enabled or disabled.`);
        return;
    }

    const filePath = path.join(modsDirectory, fileName);
    const newFileName = enable ? fileName.replace('-disabled.jar', '.jar') : fileName.replace('.jar', '-disabled.jar');
    const newFilePath = path.join(modsDirectory, newFileName);

    fs.rename(filePath, newFilePath, err => {
        if (err) {
            console.error(err);
            return;
        }
        loadMods();
    });
}

// Event listener to load mods when the window loads
window.onload = async () => {
    await loadModDataFromConfig();
    loadMods();
};

// Event delegation to handle clicks on mod items
document.getElementById('mods-list').addEventListener('click', (event) => {
    const modItem = event.target.closest('.mod');
    if (modItem) {
        toggleDescription(modItem);
    }

});


document.querySelector('.frame').classList.toggle('hide');
document.querySelector('.dragbar').classList.toggle('hide');

document.querySelector('#minimize').addEventListener('click', () => {
    ipcRenderer.send('main-window-minimize');
});
