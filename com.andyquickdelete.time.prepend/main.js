const uxp = require('uxp');
const fs = uxp.storage.localFileSystem;
const { app, core } = require("photoshop");
// const img = app.activeDocument;


function appendTimestamp() {	
    var now = new Date();

    year = now.getFullYear();
    month = now.getMonth() + 1;
    month = (month <10?'0':'') + month;
    day = (now.getDate() <10?'0':'') + now.getDate();
    hour = (now.getHours() <10?'0':'') + now.getHours();
    minutes = (now.getMinutes() <10?'0':'') + now.getMinutes();
    seconds = (now.getSeconds() <10?'0':'') + now.getSeconds();

    var myDate = year.toString() + "-" + month.toString() + "-" + day.toString();
    var myTime = hour.toString() + "." + minutes.toString() + "." + seconds.toString();

    var timestamp = myDate + "_" + myTime;
    return timestamp;
}


async function exportMyFile() {
    await core.executeAsModal(async () => {
        try {
            const img = app.activeDocument;
            const folderPath = path.dirname(img.path);
            const folder = await fs.getEntryWithUrl(folderPath);

            var myfilename = img.name;
            var myfilenameCount = myfilename.length;
            if (myfilenameCount > 19) {
                var myfilename = myfilename.substring(20, myfilenameCount);
                const file = await folder.createFile(appendTimestamp() + "-" + myfilename);
                await img.saveAs.psd(file);
            } else {
                const file = await folder.createFile(appendTimestamp() + "-" + myfilename);
                await img.saveAs.psd(file);
            }
            //await img.saveAs.jpg(file, { quality: 8 });
        } catch (e) {
            core.showAlert(e.message);
            console.log(e);
        }
    });
    window.location.reload();
}

document.getElementById("btnSaveDoc").addEventListener("click",  exportMyFile);







