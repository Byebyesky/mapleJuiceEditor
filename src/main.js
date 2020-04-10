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

let summaryData;
let achivementData;
let globalFlagData;
let subQuestData;
let mainQuestData;
let inventoryData;
let playerData;

//First time init
function init() {
    //Populate Chapter Names
    for(const [index, element] of chaptersEN.entries()) {
        let option = document.createElement('option');
        option.text = element;
        option.value = index;
        summaryChapter.add(option)
    }

    //Populate Main Quest Names
    for(const [index, element] of mainQuestsEN.entries()) {
        let option = document.createElement('option');
        option.text = element;
        option.value = index;
        questsMainQuest.add(option)
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

//Upload files
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
            } else if (element.name === 'mainQuest.dat' && element.size === 4) {
                parseMainQuest(binaryData);
            } else if (element.name === 'playerData.dat') {
                parsePlayerData(binaryData);
            } else if (element.name === 'subQuest.dat') {
                parseSubQuest(binaryData);
            }
        })
    });
    editArea.style.display = "flex";
    dropArea.style.display = "none";
    init();
}

//Classes
class saveFile {
    constructor(data, definition, selector) {
        this.selector = selector;
        let lastOffset = 0;
        for(const property in definition) {
            let offset = definition[property].offset
            if(definition[property].dataType == "string") {
                this[property] = "";
                for(let index = offset; index < offset + 16; index+=2) {
                    let char = read16(data, index);
                    if(char === 0) break;
                    this[property] += String.fromCharCode(char)
                    
                }
            }

            else if (typeof(definition[property].dataType) === "number") {
                this[property] = readNumber(data, offset, definition[property].dataType);
            }

            else if (definition[property].dataType === "itemlist") {
                if(offset === "var") {
                    let keys = Object.keys(this);
                    offset = lastOffset + this[keys[keys.length-1]].size;
                }
                let size = read32(data, offset);
                offset += 4;
                let items = [];
                if(size) {
                    for(let i = 0; i < size; i+=12) {
                        let id = read32(data, offset+i);
                        let amount = read32(data, offset+i+4);
                        let isNew = read32(data, offset+i+8);
                        items.push(new item(id, amount, isNew));
                        console.log(i);
                    }
                }
                this[property] = new itemlist(size, items);
            }
            lastOffset = offset;
        }
    }

    showData() {
        let content = document.getElementById(this.selector+"-content");
        content.style.display = "block";
    }

    initData() {
        let inputFields = document.querySelectorAll("."+this.selector+"Input");
        for(const property in this) {
            for(element of inputFields) {
                if(element.id.toLowerCase().includes(property)) {
                    element.value = this[property];
                    break;
                }
            }
        }
    }
}

function createEventlisteners(saveFileObject, querrySelector) {
    let inputFields = document.querySelectorAll("."+querrySelector+"Input");
    for(const property in saveFileObject) {
        for(element of inputFields) {
            if(element.id.toLowerCase().includes(property)) {
                element.addEventListener("change", function () {
                    typeof(saveFileObject[property]) === "number" ? saveFileObject[property] = parseInt(this.value,10) : saveFileObject[property] = this.value; 
                });
                break;
            }
        }
    }
}

//Wrapper for testing purposes
function parseSummary(data) {
    summaryData = new saveFile(data, summaryDefinition, "summary");
    createEventlisteners(summaryData, summaryData.selector);
    summaryData.initData();
}

function parseArchivement(data) {
    
}

function parseGlobalFlag(data) {

}

function parseInventory(data) {
    inventoryData = new saveFile(data, inventoryDefinition, "inventory");
    createEventlisteners(inventoryData, inventoryData.selector);
    inventoryData.initData();
}

function parseMainQuest(data) {
    mainQuestData = new saveFile(data, mainQuestDefinition, "quests");
    createEventlisteners(mainQuestData, mainQuestData.selector);
    mainQuestData.initData();
}

function parsePlayerData(data) {
    
}

function parseSubQuest(data) {

}

function hideAll() {
    let contents = document.querySelectorAll(".content-element");
    for(element of contents) {element.style.display = "none"}
}

function showSummary() {
    hideAll();
    summaryData.showData()
    contents.style.display = "flex";
}

function showQuests() {
    hideAll();
    mainQuestData.showData()
    contents.style.display = "flex";
}

function saveFiles() {
}