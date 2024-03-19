const { ipcRenderer } = require('electron');
const axios = require('axios');
const os = require('os');

// Function to generate a random fixed ID
function generateRandomFixedID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()!~`+=_-}{][|\":;><?/';
    const idLength = 14; // Adjust the ID length as needed
    let randomID = '';

    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomID += characters.charAt(randomIndex);
    }

    return randomID;
}

// Function to send the ID to Discord webhook
function sendIDToDiscord(id) {
    const webhookUrl = 'https://discord.com/api/webhooks/1219036998422106175/3Zz_sMHxskzq4egDM56DIP86T7Qq0xN0SZoGQ_WuAGl0sGwQ7ahY7CZUUGA_ClKLb7HU'; // Replace with your Discord webhook URL
    const ipAddress = getIPAddress();

    // Construct the payload
    const payload = {
        content: `New ID generated: ${id}\nMachine's IP address: ${ipAddress}`
    };

    // Send POST request to Discord webhook
    axios.post(webhookUrl, payload)
        .then(response => {
            console.log('Webhook sent successfully:', response.data);
        })
        .catch(error => {
            console.error('Error sending webhook:', error);
        });
}

// Function to get the machine's IP address
function getIPAddress() {
    const networkInterfaces = os.networkInterfaces();
    let ipAddress = '';

    for (const interfaceName in networkInterfaces) {
        const interfaceArray = networkInterfaces[interfaceName];
        for (const interfaceInfo of interfaceArray) {
            if (!interfaceInfo.internal && interfaceInfo.family === 'IPv4') {
                ipAddress = interfaceInfo.address;
                break;
            }
        }
        if (ipAddress) {
            break;
        }
    }

    return ipAddress;
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if the fixed ID is already set in localStorage
    let fixedID = localStorage.getItem('fixedID');
    if (!fixedID) {
        // Generate a random fixed ID if it's not already set
        fixedID = generateRandomFixedID();
        localStorage.setItem('fixedID', fixedID);
    }

    // Display information
    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = `
     <p>Owner: Snozxyx </P>
     <p>Website: https://www.tenxmc.me <P>
    `;

    // // Update button click event
    // const updateButton = document.getElementById('updateButton');
    // updateButton.addEventListener('click', () => {
    //     ipcRenderer.send('update-app');
    //     const updateStatusDiv = document.getElementById('updateStatus');
    //     updateStatusDiv.innerText = 'Checking for updates...';
    // });

    // // Update status message
    // ipcRenderer.on('updateStatus', (event, message) => {
    //     const updateStatusDiv = document.getElementById('updateStatus');
    //     updateStatusDiv.innerText = message;
    // });

    // // Handle update check failure
    // ipcRenderer.on('updateFailed', () => {
    //     const updateStatusDiv = document.getElementById('updateStatus');
    //     updateStatusDiv.innerText = 'Error checking for updates.';
    //     const manualDownloadButton = document.createElement('button');
    //     manualDownloadButton.textContent = 'Download Update Manually';
    //     manualDownloadButton.addEventListener('click', () => {
    //         // Add your code to manually download the update here
    //         console.log('Downloading update manually...');
    //     });
    //     updateStatusDiv.appendChild(manualDownloadButton);
    // });

    // Display fixed ID and send to Discord
    const fixedIDElement = document.getElementById('fixedID');
    if (fixedIDElement && fixedID) {
        fixedIDElement.textContent = fixedID;
        sendIDToDiscord(fixedID);
    } else {
        console.error('Fixed ID element not found or fixed ID not set.');
    }
});
document.querySelector('.frame').classList.toggle('hide');
document.querySelector('.dragbar').classList.toggle('hide');

document.querySelector('#minimize').addEventListener('click', () => {
    ipcRenderer.send('main-window-minimize');
});
