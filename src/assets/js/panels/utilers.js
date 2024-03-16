const path = require('path');
const fs = require('fs');

const MODS_DIR = path.join(process.env.APPDATA, 'launcherx', 'mods');

function enableFile() {
  const fileNameInput = document.getElementById('fileNameInput');
  const fileName = fileNameInput.value.trim();
  
  if (fileName !== '') {
    const filePath = path.join(MODS_DIR, fileName);
    const newFilePath = path.join(MODS_DIR, fileName + '.jar');
    
    fs.rename(filePath, newFilePath, (err) => {
      if (err) {
        console.error('Error renaming file:', err);
        alert('Error renaming file. Please check console for details.');
      } else {
        console.log(`File ${fileName} enabled.`);
        alert('File enabled successfully.');
      }
    });
  } else {
    alert('Please enter a valid file name.');
  }
}

function disableFile() {
  const fileNameInput = document.getElementById('fileNameInput');
  const fileName = fileNameInput.value.trim();
  
  if (fileName !== '') {
    const filePath = path.join(MODS_DIR, fileName + '.jar');
    const newFilePath = path.join(MODS_DIR, fileName + '_disabled.jar');
    
    fs.rename(filePath, newFilePath, (err) => {
      if (err) {
        console.error('Error renaming file:', err);
        alert('Error renaming file. Please check console for details.');
      } else {
        console.log(`File ${fileName} disabled.`);
        alert('File disabled successfully.');
      }
    });
  } else {
    alert('Please enter a valid file name.');
  }
}
