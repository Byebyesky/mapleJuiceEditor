let summaryDefinition = {
    "name"          : { "offset": 0,    "dataType": "string"},
    "unk"           : { "offset": 18,   "dataType": 16      },
    "year"          : { "offset": 20,   "dataType": 16      },
    "month"         : { "offset": 22,   "dataType": 8       },
    "day"           : { "offset": 23,   "dataType": 8       },
    "hour"          : { "offset": 24,   "dataType": 8       },
    "minute"        : { "offset": 25,   "dataType": 8       },
    "chapter"       : { "offset": 26,   "dataType": 8       },
    "level"         : { "offset": 27,   "dataType": 8       },
    "robe"          : { "offset": 32,   "dataType": 32      },
    "hat"           : { "offset": 36,   "dataType": 32      },
    "weapon"        : { "offset": 40,   "dataType": 32      },
    "boots"         : { "offset": 44,   "dataType": 32      },
    "ring"          : { "offset": 48,   "dataType": 32      },
    "earring"       : { "offset": 52,   "dataType": 32      },
    "medal"         : { "offset": 56,   "dataType": 32      },
    "playtime"      : { "offset": 60,   "dataType": 32      }
}

let mainQuestDefinition = {
    "mainquest"     : { "offset": 0,    "dataType": 32      }
}

let inventoryDefinition = {
    "quickSlot1"    : { "offset": 0,        "dataType": 32              },
    "quickSlot2"    : { "offset": 4,        "dataType": 32              },
    "money"         : { "offset": 8,        "dataType": 32              },
    "armor"         : { "offset": 12,       "dataType": "itemlist"      },
    "accessory"     : { "offset": "var",    "dataType": "itemlist"      },
    "weapon"        : { "offset": "var",    "dataType": "itemlist"      },
    "shoes"         : { "offset": "var",    "dataType": "itemlist"      },
    "rings"         : { "offset": "var",    "dataType": "itemlist"      },
    "earrings"      : { "offset": "var",    "dataType": "itemlist"      },
    "medals"        : { "offset": "var",    "dataType": "itemlist"      },
    "consumables"   : { "offset": "var",    "dataType": "itemlist"      }
}

let playerDataDefinition = {
    "level"    : { "offset": 0,        "dataType": 8              },
}