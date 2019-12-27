//Data imports
let definitionData;
import('./definitions.js').then(definitions => {definitionData = definitions})

//Support Check
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // All the File APIs are supported.
} else {
    dropArea.style.display = 'none';
    let notSupportedElement = document.createElement('div')
    notSupportedElement.textContent = "Your browser is not supported!"
    notSupportedElement.style.textAlign = "center"
    document.body.appendChild(notSupportedElement)
}

//Globals
let fr = new FileReader();
let editArea = document.getElementById('edit-area');
let dropArea = document.getElementById('drop-area');
let contents = document.getElementById('contents');

let summaryName = document.getElementById('summaryName');
let summaryLevel = document.getElementById('summaryLevel');
let summaryChapter = document.getElementById('summaryChapter');
let summaryYear = document.getElementById('summaryYear');
let summaryMonth = document.getElementById('summaryMonth');
let summaryDay = document.getElementById('summaryDay');
let summaryHour = document.getElementById('summaryHour');
let summaryMinute = document.getElementById('summaryMinute');
let summaryPlaytime = document.getElementById('summaryPlaytime');

let summaryData;
let achivementData;
let globalFlagData;
let subQuestData;
let mainQuestData;
let inventoryData;
let playerData;

//First time init
function init() {
    //Setup Summary tab
    summaryName.addEventListener("change", function() {summaryData.name = this.value})
    summaryLevel.addEventListener("change", function() {summaryData.level = parseInt(this.value,10)})
    summaryChapter.addEventListener("change", function() {summaryData.chapter = parseInt(this.value, 10)})
    summaryYear.addEventListener("change", function() { summaryData.year = parseInt(this.value, 10) });
    summaryMonth.addEventListener("change", function() { summaryData.month = parseInt(this.value, 10) });
    summaryDay.addEventListener("change", function() { summaryData.day = parseInt(this.value, 10) });
    summaryHour.addEventListener("change", function() { summaryData.hour = parseInt(this.value, 10) });
    summaryMinute.addEventListener("change", function() { summaryData.minute = parseInt(this.value, 10) });
    summaryPlaytime.addEventListener("change", function() { summaryData.playtime = parseInt(this.value, 10)});

    //Populate Chapter Names
    for(let i = 1; i < definitionData.chaptersEN.length; i++) {
        let option = document.createElement('option');
        option.text = definitionData.chaptersEN[i];
        option.value = i;
        summaryChapter.add(option)
    }
}

//Helper Functions
const readUploadedFileAsBinary = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
    };

    temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
    };
    temporaryFileReader.readAsArrayBuffer(inputFile);
    });
};

function swap16(val) {
    return ((val & 0xFF) << 8)
        | ((val >> 8) & 0xFF);
}

function swap32(val) {
    return ((val & 0xFF) << 24)
        | ((val & 0xFF00) << 8)
        | ((val >> 8) & 0xFF00)
        | ((val >> 24) & 0xFF);
}

//???
function handleFiles(files) {
    if(files.length === 0) {
        alert("No files selected")
        return;
    }
    
    files = [...files]
    files.forEach(function(element, i) {
        readUploadedFileAsBinary(element).then( binaryData => {
            binaryData = new DataView(binaryData)
            if(element.name.includes("summary") && element.size === 64) {
                parseSummary(binaryData)
            } else if (element.name === 'achievement.dat' && element.size === 396) {
                parseArchivement(binaryData)
            } else if (element.name === 'globalFlag.dat' && element.size === 184) {
                parseGlobalFlag(binaryData)
            } else if (element.name === 'inventory.dat') {
                parseInventory(binaryData);
            } else if (element.name === 'mainQuest.dat') {
                parseMainQuest(binaryData);
            } else if (element.name === 'playerData.dat') {
                parsePlayerData(binaryData);
            } else if (element.name === 'subQuest.dat') {
                parseSubQuest(binaryData);
            }
        })
    });
    editArea.style.display = "block";
    dropArea.style.display = "none";
    init()
}

//Classes
class Summary {
    constructor(data) {
        //Character name
        this.name = "";
        for(let index = 0; index < 16; index+=2) {
            let char = swap16(data.getInt16(index));
            if(char === 0) break;
            this.name += String.fromCharCode(char)
        }

        this.unk = data.getInt8(18);
        
        //Last played
        this.year = swap16(data.getUint16(20));
        this.month = data.getUint8(22)
        this.day = data.getUint8(23)
        this.hour = data.getUint8(24)
        this.minute = data.getUint8(25)
        
        //Progress
        this.chapter = data.getUint8(26)
        this.level = data.getUint8(27)
        
        //Equip
        this.robe = swap32(data.getUint32(32));
        this.hat = swap32(data.getUint32(36));
        this.weapon = swap32(data.getUint32(40));
        this.boots = swap32(data.getUint32(44));
        this.ring = swap32(data.getUint32(48));
        this.earring = swap32(data.getUint32(52));
        this.medal = swap32(data.getUint32(56));

        this.playtime = swap32(data.getUint32(60));
    }

    showData() {
        summaryName.value = this.name;
        summaryLevel.value = this.level;
        summaryChapter.value = this.chapter;
        summaryYear.value = this.year;
        summaryMonth.value = this.month;
        summaryDay.value = this.day;
        summaryHour.value = this.hour;
        summaryMinute.value = this.minute;
        summaryPlaytime.value = this.playtime;
    }

    makeBinary() {
        console.log("test");
    }
}

function parseSummary(data) {
    summaryData = new Summary(data);

}

function parseArchivement(data) {
    
}

function parseGlobalFlag(data) {

}

function parseInventory(data) {

}

function parseMainQuest(data) {

}

function parsePlayerData(data) {
    
}

function parseSubQuest(data) {

}

function showSummary() {
    summaryData.showData()
    contents.style.display = "block"
}

function saveFiles() {
    console.log(data[1].length)
    let uri ="data:application/octet-stream,";
    data[1].forEach(element => {
        uri += element;        
    });
    console.log(uri)
    let link = document.createElement('a');
    link.setAttribute("download", "file.dat");
    link.setAttribute("href", uri);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(document.body.lastChild);
}