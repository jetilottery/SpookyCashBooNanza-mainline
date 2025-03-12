"use strict";

define({
    _BASE_APP: {
        children: ["backgrounds", "logoContainer", "playerNumbers", "infoArea", "transitions", "organBonus", "coffinBonus", "bonusTutorialContainer", "bonusWinPlaqueContainer", "particles"]
    },

    /*
     * BACKGROUND
     */
    backgrounds: {
        type: "container",
        children: ["baseGameBG"]
    },
    baseGameBG: {
        type: "container",
        portrait: {
            x: 405,
            y: 710
        },
        landscape: {
            x: 720,
            y: 390
        }
    },
    logoContainer: {
        type: "container",
        children: ["logo"]
    },

    /*
     * LOGO
     */
    logo: {
        type: "sprite",
        anchor: 0.5,
        landscape: {
            texture: "landscape_gameLogo",
            x: 700,
            y: 70,
            scale: {
                x: 0.75,
                y: 0.75
            }
        },
        portrait: {
            texture: "portrait_gameLogo",
            x: 395,
            y: 90 // scale: {
            //   x: 1.2,
            //   y: 1.2
            // }

        }
    },
    infoArea: {
        type: "container",
        children: ["OB_Meter", "CB_Meter", "bPips", "cPips", "OB_MeterResult", "CB_MeterResult", "coffinBonusText", "organBonusText", "winUpTo"],
        landscape: {
            y: 0
        },
        portrait: {
            y: 0
        }
    },
    bPips: {
        type: "container",
        children: ["bPip_1", "bPip_2", "bPip_3"],
        landscape: {
            x: 442,
            y: 75,
            scale: 1
        },
        portrait: {
            x: 189,
            y: 200,
            scale: 1.3
        }
    },
    bPip_1: {
        x: 0,
        y: 0
    },
    bPip_2: {
        x: 34,
        y: 0
    },
    bPip_3: {
        x: 68,
        y: 0
    },
    cPips: {
        type: "container",
        children: ["cPip_1", "cPip_2", "cPip_3"],
        landscape: {
            x: 927,
            y: 75,
            scale: 1
        },
        portrait: {
            x: 532,
            y: 200,
            scale: 1.3
        }
    },
    cPip_1: {
        x: 0,
        y: 0
    },
    cPip_2: {
        x: 34,
        y: 0
    },
    cPip_3: {
        x: 68,
        y: 0
    },
    OB_Meter: {
        type: "container",
        landscape: {
            x: 1020,
            y: 95,
            scale: 1.2
        },
        portrait: {
            x: 650,
            y: 220,
            scale: 1.5
        }
    },
    OB_MeterResult: {
        type: "container",
        landscape: {
            x: 956,
            y: 69,
            scale: 1
        },
        portrait: {
            x: 566,
            y: 187,
            scale: 1.3
        },
        children: ["OB_ResultPlaque", "OB_ResultText"]
    },
    OB_ResultPlaque: {
        type: "sprite",
        texture: "plaque_tiny",
        anchor: 0.5,
        scale: 0.6
    },
    OB_ResultText: {
        type: "text",
        style: "tinyPlaqueWin",
        maxWidth: 160,
        anchor: 0.5
    },
    CB_Meter: {
        type: "container",
        landscape: {
            x: 415,
            y: 95,
            scale: 1.2
        },
        portrait: {
            x: 160,
            y: 220,
            scale: 1.5
        }
    },
    CB_MeterResult: {
        type: "container",
        landscape: {
            x: 479,
            y: 69,
            scale: 1
        },
        portrait: {
            x: 242,
            y: 187,
            scale: 1.3
        },
        children: ["CB_ResultPlaque", "CB_ResultText"]
    },
    CB_ResultPlaque: {
        type: "sprite",
        texture: "plaque_tiny",
        anchor: 0.5,
        scale: 0.6
    },
    CB_ResultText: {
        type: "text",
        style: "tinyPlaqueWin",
        maxWidth: 160,
        anchor: 0.5
    },
    coffinBonusText: {
        type: "text",
        style: "bonusPrize",
        anchor: 0.5,
        visible: false,
        maxWidth: 120,
        landscape: {
            x: 487,
            y: 78
        },
        portrait: {
            x: 271,
            y: 204
        }
    },
    organBonusText: {
        type: "text",
        style: "bonusPrize",
        anchor: 0.5,
        visible: false,
        maxWidth: 120,
        landscape: {
            x: 952,
            y: 78
        },
        portrait: {
            x: 533,
            y: 204
        }
    },

    /*
     * WIN UP TO
     */
    winUpTo: {
        type: "container",
        children: ["winUpToIn", "winUpToOut"],
        landscape: {
            x: 720,
            y: 150
        },
        portrait: {
            x: 405,
            y: 280
        }
    },
    winUpToIn: {
        type: "container",
        children: ["winUpToInText"]
    },
    winUpToInText: {
        type: "text",
        portrait: {
            style: "winUpToLarge"
        },
        landscape: {
            style: "winUpTo"
        },
        string: "winUpTo",
        anchor: 0.5,
        maxWidth: 400
    },
    winUpToOut: {
        type: "container",
        children: ["winUpToOutText"]
    },
    winUpToOutText: {
        type: "text",
        portrait: {
            style: "winUpToLarge"
        },
        landscape: {
            style: "winUpTo"
        },
        string: "winUpTo",
        anchor: 0.5,
        maxWidth: 400
    },

    /*
     * PLAYER NUMBERS
     */
    playerNumbers: {
        type: "container",
        children: ["playerNumber1", "playerNumber2", "playerNumber3", "playerNumber4", "playerNumber5", "playerNumber6", "playerNumber7", "playerNumber8", "playerNumber9", "playerNumber10", "playerNumber11", "playerNumber12", "playerNumber13", "playerNumber14", "playerNumber15", "playerNumber16"],
        landscape: {
            x: 50,
            y: 200
        },
        portrait: {
            x: 100,
            y: 400
        }
    },
    /////////////////////////////
    playerNumber1: {
        type: "container",
        children: ["playerNumberChest1"],
        landscape: {
            x: 235,
            y: 65
        },
        portrait: {
            x: 45,
            y: 70
        }
    },
    playerNumberChest1: {
        type: "container",
        landscape: {
            scale: {
                x: -0.7,
                y: 0.7
            },
            rotation: -0.4
        },
        portrait: {
            scale: {
                x: -0.75,
                y: 0.7
            },
            rotation: -0.25
        }
    },
    playerNumber2: {
        type: "container",
        children: ["playerNumberChest2"],
        landscape: {
            x: 430,
            y: 10
        },
        portrait: {
            x: 180,
            y: -20
        }
    },
    playerNumberChest2: {
        type: "container",
        landscape: {
            scale: {
                x: -0.7,
                y: 0.7
            },
            rotation: 0
        },
        portrait: {
            scale: {
                x: -0.68,
                y: 0.68
            },
            rotation: 0.25
        }
    },
    playerNumber3: {
        type: "container",
        children: ["playerNumberChest3"],
        landscape: {
            x: 660,
            y: 35
        },
        portrait: {
            x: 400,
            y: -30
        }
    },
    playerNumberChest3: {
        type: "container",
        landscape: {
            scale: {
                x: -0.7,
                y: 0.7
            },
            rotation: -0.25
        },
        portrait: {
            scale: {
                x: 0.65,
                y: 0.65
            },
            rotation: 0
        }
    },
    playerNumber4: {
        type: "container",
        children: ["playerNumberChest4"],
        landscape: {
            x: 837,
            y: 20
        },
        portrait: {
            x: 420,
            y: 105
        }
    },
    playerNumberChest4: {
        type: "container",
        landscape: {
            scale: {
                x: -0.7,
                y: 0.7
            }
        },
        portrait: {
            scale: {
                x: -0.85,
                y: 0.85
            }
        }
    },
    playerNumber5: {
        type: "container",
        children: ["playerNumberChest5"],
        landscape: {
            x: 1050,
            y: 28
        },
        portrait: {
            x: 230,
            y: 110
        }
    },
    playerNumberChest5: {
        type: "container",
        landscape: {
            scale: {
                x: 0.8,
                y: 0.8
            }
        },
        portrait: {
            scale: {
                x: -0.85,
                y: 0.85
            }
        }
    },
    playerNumber6: {
        type: "container",
        children: ["playerNumberChest6"],
        landscape: {
            x: 1188,
            y: 130
        },
        portrait: {
            x: 600,
            y: 200
        }
    },
    playerNumberChest6: {
        type: "container",
        landscape: {
            scale: {
                x: 0.8,
                y: 0.8
            },
            rotation: 0.2
        },
        portrait: {
            scale: {
                x: 0.9,
                y: 0.9
            },
            rotation: 0.2
        }
    },
    playerNumber7: {
        type: "container",
        children: ["playerNumberChest7"],
        landscape: {
            x: 100,
            y: 200
        },
        portrait: {
            x: 400,
            y: 280
        }
    },
    playerNumberChest7: {
        type: "container",
        landscape: {
            scale: {
                x: -1,
                y: 1
            }
        },
        portrait: {
            scale: {
                x: -0.9,
                y: 0.9
            }
        }
    },
    playerNumber8: {
        type: "container",
        children: ["playerNumberChest8"],
        landscape: {
            x: 360,
            y: 170
        },
        portrait: {
            x: 340,
            y: 450
        }
    },
    playerNumberChest8: {
        type: "container",
        landscape: {
            scale: {
                x: -0.8,
                y: 0.8
            },
            rotation: 0.35
        },
        portrait: {
            scale: {
                x: 1,
                y: 1
            },
            rotation: 0
        }
    },
    playerNumber9: {
        type: "container",
        children: ["playerNumberChest9"],
        landscape: {
            x: 545,
            y: 170
        },
        portrait: {
            x: 70,
            y: 440
        }
    },
    playerNumberChest9: {
        type: "container",
        landscape: {
            scale: {
                x: -0.8,
                y: 0.8
            },
            rotation: -0.25
        },
        portrait: {
            scale: {
                x: -0.85,
                y: 0.85
            },
            rotation: -0.3
        }
    },
    playerNumber10: {
        type: "container",
        children: ["playerNumberChest10"],
        landscape: {
            x: 770,
            y: 170
        },
        portrait: {
            x: 200,
            y: 260
        }
    },
    playerNumberChest10: {
        type: "container",
        scale: {
            x: -0.85,
            y: 0.85
        },
        landscape: {
            rotation: -0.2
        },
        portrait: {
            rotation: -0.3
        }
    },
    playerNumber11: {
        type: "container",
        children: ["playerNumberChest11"],
        landscape: {
            x: 950,
            y: 182
        },
        portrait: {
            x: 310,
            y: 640
        }
    },
    playerNumberChest11: {
        type: "container",
        landscape: {
            scale: {
                x: -0.8,
                y: 0.8
            },
            rotation: 0
        },
        portrait: {
            scale: {
                x: -1,
                y: 1
            },
            rotation: 0.3
        }
    },
    playerNumber12: {
        type: "container",
        children: ["playerNumberChest12"],
        landscape: {
            x: 280,
            y: 320
        },
        portrait: {
            x: 30,
            y: 620
        }
    },
    playerNumberChest12: {
        type: "container"
    },
    playerNumber13: {
        type: "container",
        children: ["playerNumberChest13"],
        landscape: {
            x: 510,
            y: 350
        },
        portrait: {
            x: -10,
            y: 230
        }
    },
    playerNumberChest13: {
        type: "container",
        landscape: {
            scale: {
                x: 1,
                y: 1
            },
            rotation: 0
        },
        portrait: {
            scale: {
                x: 0.8,
                y: 0.8
            },
            rotation: -0.2
        }
    },
    playerNumber14: {
        type: "container",
        children: ["playerNumberChest14"],
        landscape: {
            x: 730,
            y: 330
        },
        portrait: {
            x: 600,
            y: 40
        }
    },
    playerNumberChest14: {
        type: "container",
        landscape: {
            scale: {
                x: 1,
                y: 1
            },
            rotation: 0
        },
        portrait: {
            scale: {
                x: 0.75,
                y: 0.75
            },
            rotation: 0.3
        }
    },
    playerNumber15: {
        type: "container",
        children: ["playerNumberChest15"],
        landscape: {
            x: 960,
            y: 350
        },
        portrait: {
            x: 580,
            y: 620
        }
    },
    playerNumberChest15: {
        type: "container"
    },
    playerNumber16: {
        type: "container",
        children: ["playerNumberChest16"],
        landscape: {
            x: 1185,
            y: 280
        },
        portrait: {
            x: 590,
            y: 430
        }
    },
    playerNumberChest16: {
        type: "container"
    },
    //////////////////////////////////////
    transitions: {
        type: "container",
        children: ["organTitle", "coffinTitle"],
        landscape: {
            x: 720,
            y: 405
        },
        portrait: {
            x: 405,
            y: 720
        }
    },
    organTitle: {
        type: "sprite",
        texture: "bonusTitle_organDonor",
        anchor: 0.5,
        x: 0,
        y: 0
    },
    coffinTitle: {
        type: "sprite",
        texture: "bonusTitle_coffinCapers",
        anchor: 0.5,
        x: 0,
        y: 0
    },
    organBonus: {
        type: "container",
        children: ["organBack", "organWhiteKeys", "organBlackKeys", "organCashMeter", "organMultiplierMeter", "organCollect", "organMessage"]
    },
    organBack: {
        type: "container"
    },
    organWhiteKeys: {
        type: "container"
    },
    organBlackKeys: {
        type: "container"
    },
    organCashMeter: {
        type: "container",
        landscape: {
            x: -740,
            y: -350,
            scale: 1.5
        },
        portrait: {
            x: -300,
            y: -600,
            scale: 1
        }
    },
    organMultiplierMeter: {
        type: "container",
        landscape: {
            x: 700,
            y: -350,
            scale: 1.5
        },
        portrait: {
            x: 300,
            y: -600,
            scale: 1
        }
    },
    organCollect: {
        type: "container",
        children: ["organCollectPlaque", "organCollectTitle"]
    },
    organCollectPlaque: {
        type: "sprite",
        texture: "plaque_collect",
        anchor: 0.5
    },
    organCollectTitle: {
        type: "text",
        style: "organCollectTitle",
        string: "collect",
        anchor: 0.5,
        maxWidth: 400
    },
    organMessage: {
        type: "container"
    },
    coffinBonus: {
        type: "container",
        children: ["coffinWheel", "coffinMeter", "coffinGhost", "coffinMessageA", "coffinMessageB"]
    },
    coffinMeter: {
        type: "container",
        children: ["coffinMeterPrize1", "coffinMeterPrize2", "coffinMeterPrize3", "coffinMeterPrize4", "coffinMeterPrize5"],
        landscape: {
            x: 700,
            y: 85,
            scale: 1
        },
        portrait: {
            x: 385,
            y: 160,
            scale: 1.3
        }
    },
    coffinMeterPrize1: {
        type: "text",
        string: "testWin",
        style: "coffinBonusMeter",
        anchor: 0.5,
        maxWidth: 120,
        x: -105,
        y: -44
    },
    coffinMeterPrize2: {
        type: "text",
        string: "testWin",
        style: "coffinBonusMeter",
        anchor: 0.5,
        maxWidth: 120,
        x: -19,
        y: 51
    },
    coffinMeterPrize3: {
        type: "text",
        string: "testWin",
        style: "coffinBonusMeter",
        anchor: 0.5,
        maxWidth: 120,
        x: 70,
        y: -44
    },
    coffinMeterPrize4: {
        type: "text",
        string: "testWin",
        style: "coffinBonusMeter",
        anchor: 0.5,
        maxWidth: 120,
        x: 160,
        y: 51
    },
    coffinMeterPrize5: {
        type: "text",
        string: "testWin",
        style: "coffinBonusMeter",
        anchor: 0.5,
        maxWidth: 120,
        x: 250,
        y: -44
    },
    coffinWheel: {
        type: "container",
        landscape: {
            x: 720,
            y: 433,
            scale: 1
        },
        portrait: {
            x: 405,
            y: 770,
            scale: 1.1
        }
    },
    coffinGhost: {
        type: "container",
        landscape: {
            x: 720,
            y: 430
        },
        portrait: {
            x: 405,
            y: 720
        }
    },
    coffinMessageA: {
        type: "text",
        style: "coffinMessage",
        string: "",
        anchor: 0.5,
        portrait: {
            x: 405,
            y: 1200,
            maxWidth: 800
        },
        landscape: {
            x: 720,
            y: 620,
            fontSize: 37,
            maxWidth: 800
        }
    },
    coffinMessageB: {
        type: "text",
        style: "coffinMessage",
        string: "",
        anchor: 0.5,
        portrait: {
            x: 405,
            y: 1200,
            maxWidth: 800
        },
        landscape: {
            x: 720,
            y: 620,
            fontSize: 37,
            maxWidth: 800
        }
    },
    particles: {
        type: "container"
    },

    /**
     * Bonus tutorial
     */
    bonusTutorialContainer: {
        type: "container",
        children: ["bonusTutorialOverlay", "bonusTutorialBackground", "bonusTutorialTitle", "bonusTutorialText", "bonusTutorialClose"],
        portrait: {
            y: 100
        },
        landscape: {
            y: 0
        }
    },
    bonusTutorialOverlay: {
        type: "sprite",
        landscape: {
            texture: "landscape_tutorialOverlay",
            y: 0
        },
        portrait: {
            texture: "portrait_tutorialOverlay",
            y: -100
        }
    },
    bonusTutorialBackground: {
        type: "sprite",
        alpha: 0.5,
        scale: 0.8,
        anchor: {
            x: 0.5
        },
        landscape: {
            x: 720,
            y: 98,
            texture: "landscape_tutorialBackground"
        },
        portrait: {
            x: 405,
            y: 198,
            texture: "portrait_tutorialBackground"
        }
    },
    bonusTutorialTitle: {
        type: "text",
        string: "",
        style: "howToPlayTitle",
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 178
        },
        portrait: {
            x: 405,
            y: 278
        }
    },
    bonusTutorialText: {
        type: "text",
        string: "",
        style: "howToPlayText",
        wordWrap: true,
        anchor: 0.5,
        align: "center",
        landscape: {
            x: 720,
            y: 350,
            wordWrapWidth: 900,
            maxHeight: 273
        },
        portrait: {
            x: 405,
            y: 580,
            wordWrapWidth: 600,
            maxHeight: 500
        }
    },
    bonusTutorialClose: {
        type: "button",
        string: "button_ok",
        landscape: {
            x: 720,
            y: 541
        },
        portrait: {
            x: 405,
            y: 881
        },
        textures: {
            enabled: "mainButtonEnabled",
            over: "mainButtonOver",
            pressed: "mainButtonPressed",
            disabled: "mainButtonDisabled"
        },
        style: {
            enabled: "mainButtonEnabled",
            over: "mainButtonOver",
            pressed: "mainButtonPressed",
            disabled: "mainButtonDisabled"
        }
    },

    /**
     * Bonus Win Plaque
     */
    bonusWinPlaqueContainer: {
        type: "container",
        children: ["bonusWinPlaqueOverlay", "bonusWinPlaqueBackground", "bonusWinPlaqueOrganMultiContainer", "bonusWinPlaqueOrganCashContainer", "bonusWinPlaqueOrganMessage", "bonusWinPlaqueOrganValue", "bonusWinPlaqueCoffinMessage", "bonusWinPlaqueCoffinValue"]
    },
    bonusWinPlaqueOverlay: {
        type: "sprite",
        landscape: {
            texture: "landscape_EndOfGameMessageOverlay",
            y: 0
        },
        portrait: {
            texture: "portrait_EndOfGameMessageOverlay",
            y: -90
        }
    },
    bonusWinPlaqueBackground: {
        type: "sprite",
        texture: "winPlaque",
        anchor: {
            x: 0.5
        },
        landscape: {
            scale: 0.8,
            x: 720,
            y: 100
        },
        portrait: {
            scale: 0.8,
            x: 405,
            y: 430
        }
    },
    bonusWinPlaqueOrganMultiContainer: {
        type: "container",
        landscape: {
            x: 720,
            y: 220
        },
        portrait: {
            x: 400,
            y: 560
        },
        children: ["bonusWinPlaqueOrganMulti"]
    },
    bonusWinPlaqueOrganMulti: {
        type: "text",
        style: "organMultiplier",
        string: "",
        anchor: {
            x: 1,
            y: 0.5
        },
        maxWidth: 260
    },
    bonusWinPlaqueOrganCashContainer: {
        type: "container",
        landscape: {
            x: 740,
            y: 220
        },
        portrait: {
            x: 410,
            y: 560
        },
        children: ["bonusWinPlaqueOrganCash"]
    },
    bonusWinPlaqueOrganCash: {
        type: "text",
        style: "organCash",
        string: "",
        anchor: {
            x: 0,
            y: 0.5
        },
        maxWidth: 260
    },
    bonusWinPlaqueOrganMessage: {
        type: "text",
        string: "bonusWin",
        style: "bonusPlaqueTotalWin",
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 308
        },
        portrait: {
            x: 405,
            y: 648
        },
        maxWidth: 490
    },
    bonusWinPlaqueOrganValue: {
        type: "text",
        string: "",
        style: "bonusPlaqueWinAmount",
        anchor: 0.5,
        align: "center",
        landscape: {
            x: 720,
            y: 420
        },
        portrait: {
            x: 405,
            y: 760
        },
        maxWidth: 490
    },
    bonusWinPlaqueCoffinMessage: {
        type: "text",
        string: "bonusWin",
        style: "bonusPlaqueTotalWin",
        anchor: 0.5,
        landscape: {
            x: 720,
            y: 258
        },
        portrait: {
            x: 405,
            y: 608
        },
        maxWidth: 490
    },
    bonusWinPlaqueCoffinValue: {
        type: "text",
        string: "",
        style: "bonusPlaqueWinAmount",
        anchor: 0.5,
        align: "center",
        landscape: {
            x: 720,
            y: 400
        },
        portrait: {
            x: 405,
            y: 740
        },
        maxWidth: 490
    },

    /*
     * How To Play
     */
    howToPlayContainer: {
        type: "container",
        children: ["howToPlayOverlay", "howToPlayBackground", "howToPlayPages", "versionText", "audioButtonContainer", "howToPlayPrevious", "howToPlayNext", "howToPlayClose", "howToPlayIndicators"],
        portrait: {
            y: 100
        },
        landscape: {
            y: 0
        }
    },
    howToPlayOverlay: {
        type: "sprite",
        landscape: {
            texture: "landscape_tutorialOverlay",
            y: 0
        },
        portrait: {
            texture: "portrait_tutorialOverlay",
            y: -100
        }
    },
    howToPlayBackground: {
        type: "sprite",
        anchor: {
            x: 0.5
        },
        y: 98,
        landscape: {
            x: 720,
            texture: "landscape_tutorialBackground"
        },
        portrait: {
            x: 405,
            texture: "portrait_tutorialBackground"
        }
    },
    versionText: {
        type: "text",
        style: "versionText",
        landscape: {
            x: 720,
            y: 130
        },
        portrait: {
            x: 410,
            y: 130
        },
        alpha: 0.5,
        maxWidth: 400
    },
    howToPlayClose: {
        type: "button",
        string: "button_ok",
        landscape: {
            x: 720,
            y: 671
        },
        portrait: {
            x: 405,
            y: 951
        },
        textures: {
            enabled: "mainButtonEnabled",
            over: "mainButtonOver",
            pressed: "mainButtonPressed",
            disabled: "mainButtonDisabled"
        },
        style: {
            enabled: "mainButtonEnabled",
            over: "mainButtonOver",
            pressed: "mainButtonPressed",
            disabled: "mainButtonDisabled"
        }
    },
    howToPlayPrevious: {
        type: "button",
        landscape: {
            x: 125,
            y: 418
        },
        portrait: {
            x: 70,
            y: 568
        },
        textures: {
            enabled: "tutorialLeftButtonEnabled",
            disabled: "tutorialLeftButtonDisabled",
            over: "tutorialLeftButtonOver",
            pressed: "tutorialLeftButtonPressed"
        }
    },
    howToPlayNext: {
        type: "button",
        landscape: {
            x: 1320,
            y: 418
        },
        portrait: {
            x: 740,
            y: 568
        },
        textures: {
            enabled: "tutorialRightButtonEnabled",
            disabled: "tutorialRightButtonDisabled",
            over: "tutorialRightButtonOver",
            pressed: "tutorialRightButtonPressed"
        }
    },
    howToPlayIndicators: {
        type: "container",
        children: ["howToPlayIndicatorActive", "howToPlayIndicatorInactive"],
        landscape: {
            x: 720,
            y: 600
        },
        portrait: {
            x: 405,
            y: 870
        }
    },
    audioButtonContainer: {
        type: "container",
        landscape: {
            x: 79,
            y: 671
        },
        portrait: {
            x: 108,
            y: 951
        }
    },
    howToPlayPages: {
        type: "container",
        children: ["howToPlayPage1", "howToPlayPage2", "howToPlayPage3"]
    },
    howToPlayPage1: {
        type: "container",
        children: ["howToPlayTitle1", "howToPlayPageText1", "howToPlayBonusCoins1"]
    },
    howToPlayTitle1: {
        type: "text",
        string: "howToPlay",
        style: "howToPlayTitle",
        anchor: 0.5,
        y: 178,
        landscape: {
            x: 720
        },
        portrait: {
            x: 405
        }
    },
    howToPlayPageText1: {
        type: "text",
        string: "page1",
        style: "howToPlayText",
        fontSize: 30,
        wordWrap: true,
        anchor: 0.5,
        align: "center",
        landscape: {
            x: 720,
            y: 380,
            wordWrapWidth: 1000,
            maxHeight: 245
        },
        portrait: {
            x: 405,
            y: 520,
            wordWrapWidth: 500,
            maxHeight: 500
        }
    },
    howToPlayBonusCoins1: {
        type: "container",
        landscape: {
            x: 720,
            y: 490
        },
        portrait: {
            x: 405,
            y: 670
        }
    },
    howToPlayPage2: {
        type: "container",
        children: ["howToPlayTitle2", "howToPlayPageText2"]
    },
    howToPlayTitle2: {
        type: "text",
        string: "coffinBonus",
        style: "howToPlayTitle",
        anchor: 0.5,
        y: 178,
        landscape: {
            x: 720
        },
        portrait: {
            x: 405
        }
    },
    howToPlayPageText2: {
        type: "container",
        children: ["howToPlayPageText2Text1", "howToPlayPageText2Text2", "howToPlayPageText2Text3"]
    },
    howToPlayPageText2Text1: {
        type: "text",
        style: "howToPlayTextL1",
        portrait: {
            maxWidth: 300
        },
        landscape: {
            maxWidth: 240
        }
    },
    howToPlayPageText2Text2: {
        type: "text",
        style: "howToPlayTextL1",
        portrait: {
            maxWidth: 500
        },
        landscape: {
            maxWidth: 240
        }
    },
    howToPlayPageText2Text3: {
        type: "text",
        style: "howToPlayText",
        portrait: {
            maxHeight: 500
        },
        landscape: {
            maxHeight: 240
        }
    },
    howToPlayPage3: {
        type: "container",
        children: ["howToPlayTitle3", "howToPlayPageText3"]
    },
    howToPlayTitle3: {
        type: "text",
        string: "organBonus",
        style: "howToPlayTitle",
        anchor: 0.5,
        y: 178,
        landscape: {
            x: 720
        },
        portrait: {
            x: 405
        }
    },
    howToPlayPageText3: {
        type: "container",
        children: ["howToPlayPageText3Text1", "howToPlayPageText3Text2", "howToPlayPageText3Text3"]
    },
    howToPlayPageText3Text1: {
        type: "text",
        style: "howToPlayTextL1",
        portrait: {
            maxWidth: 300
        },
        landscape: {
            maxWidth: 240
        }
    },
    howToPlayPageText3Text2: {
        type: "text",
        style: "howToPlayTextL1",
        portrait: {
            maxWidth: 500
        },
        landscape: {
            maxWidth: 240
        }
    },
    howToPlayPageText3Text3: {
        type: "text",
        style: "howToPlayText",
        portrait: {
            maxHeight: 500
        },
        landscape: {
            maxHeight: 240
        }
    },
    resultPlaquesContainer: {
        type: "container",
        children: ["resultPlaqueOverlay", "winPlaqueBG", "winPlaqueSpineBG", "bigWinCoins", "winPlaqueSpine", "losePlaqueSpine", "winPlaqueMessage", "winPlaqueMessage_default", "winPlaqueMessage_multi", "winPlaqueValue", "winPlaqueValue_default", "winPlaqueValue_multi", "winPlaqueCloseButton", "losePlaqueBG", "losePlaqueMessage", "losePlaqueCloseButton"],
        landscape: {
            x: 720,
            y: 377
        },
        portrait: {
            x: 405,
            y: 725
        }
    },
    resultPlaqueOverlay: {
        type: "sprite",
        anchor: 0.5
    },
    winPlaqueSpineBG: {
        type: "container",
        anchor: 0.5
    },
    bigWinCoins: {
        type: "container",
        landscape: {
            x: -720,
            y: -377
        },
        portrait: {
            x: -405,
            y: -725
        }
    },
    winPlaqueSpine: {
        type: "container",
        anchor: 0.5
    },
    winPlaqueBG: {
        type: "container",
        anchor: 0.5
    },
    winPlaqueMessage: {
        type: "text",
        string: "message_win",
        style: "winPlaqueBody",
        portrait: {
            x: 0,
            y: -38
        },
        landscape: {
            x: 0,
            y: 12
        },
        anchor: 0.5,
        maxWidth: 550,
        maxHeight: 120
    },
    winPlaqueValue: {
        type: "text",
        style: "winPlaqueValue",
        portrait: {
            x: 0,
            y: 66
        },
        landscape: {
            x: 0,
            y: 116
        },
        anchor: 0.5,
        maxWidth: 550
    },
    winPlaqueMessage_default: {
        type: "container",
        portrait: {
            x: 0,
            y: -50
        },
        landscape: {
            x: 0,
            y: 0
        }
    },
    winPlaqueMessage_multi: {
        type: "container",
        portrait: {
            x: 0,
            y: -38
        },
        landscape: {
            x: 0,
            y: 12
        }
    },
    winPlaqueValue_default: {
        type: "container",
        portrait: {
            x: 0,
            y: 50
        },
        landscape: {
            x: 0,
            y: 100
        }
    },
    winPlaqueValue_multi: {
        type: "container",
        portrait: {
            x: 0,
            y: 66
        },
        landscape: {
            x: 0,
            y: 116
        }
    },
    winPlaqueCloseButton: {
        type: "button",
        alpha: 0,
        textures: {
            enabled: "winPlaque",
            over: "winPlaque",
            pressed: "winPlaque"
        },
        y: -1000
    },
    losePlaqueSpine: {
        type: "container",
        anchor: 0.5
    },
    losePlaqueBG: {
        type: "container",
        anchor: 0.5
    },
    losePlaqueMessage: {
        type: "text",
        string: "message_nonWin",
        style: "losePlaqueBody",
        anchor: 0.5,
        portrait: {
            x: 0,
            y: -70
        },
        landscape: {
            x: 0,
            y: -20
        },
        maxWidth: 550,
        maxHeight: 200
    },
    losePlaqueCloseButton: {
        type: "button",
        alpha: 0,
        textures: {
            enabled: "winPlaque",
            over: "winPlaque",
            pressed: "winPlaque"
        },
        y: -1000
    },
    errorMessage: {
        type: 'text',
        style: 'errorMessage',
        anchor: 0.5,
        wordWrap: true,
        landscape: {
            x: 720,
            y: 360,
            wordWrapWidth: 750
        },
        portrait: {
            x: 405,
            y: 580,
            wordWrapWidth: 700
        }
    },
    errorExit: {
        type: 'button',
        string: 'button_exit',
        landscape: {
            x: 720,
            y: 560
        },
        portrait: {
            x: 405,
            y: 775
        },
        style: {
            enabled: "mainButtonEnabled",
            over: "mainButtonOver",
            pressed: "mainButtonDisabled"
        },
        textures: {
            enabled: 'timeOutButtonEnabled',
            over: 'timeOutButtonOver',
            pressed: 'timeOutButtonPressed'
        }
    },
    timeoutExit: {
        type: "button",
        landscape: {
            x: 585,
            y: 560
        },
        portrait: {
            x: 270,
            y: 745
        },
        style: {
            enabled: "mainButtonEnabled",
            over: "mainButtonOver",
            pressed: "mainButtonDisabled"
        },
        textures: {
            enabled: "timeOutButtonEnabled",
            over: "timeOutButtonOver",
            pressed: "timeOutButtonPressed",
            disabled: "timeOutButtonDisabled"
        }
    },
    timeoutContinue: {
        type: "button",
        landscape: {
            x: 855,
            y: 560
        },
        portrait: {
            x: 540,
            y: 745
        },
        style: {
            enabled: "mainButtonEnabled",
            over: "mainButtonOver",
            pressed: "mainButtonDisabled"
        },
        textures: {
            enabled: "timeOutButtonEnabled",
            over: "timeOutButtonOver",
            pressed: "timeOutButtonPressed",
            disabled: "timeOutButtonDisabled"
        }
    },
    buyButtonAnim: {
        type: "sprite",
        anchor: 0.5,
        x: 0,
        y: 0
    },
    tryButtonAnim: {
        type: "sprite",
        anchor: 0.5,
        x: 0,
        y: 0
    },
    buyButton: {
        type: "button",
        string: "button_buy",
        textures: {
            enabled: "mainButtonEnabled",
            over: "mainButtonOver",
            pressed: "mainButtonPressed",
            disabled: "mainButtonDisabled"
        },
        style: {
            enabled: "buyButtonEnabled",
            over: "buyButtonOver",
            pressed: "buyButtonPressed",
            disabled: "buyButtonDisabled"
        }
    },
    tryButton: {
        type: "button",
        string: "button_try",
        textures: {
            enabled: "mainButtonEnabled",
            over: "mainButtonOver",
            pressed: "mainButtonPressed",
            disabled: "mainButtonDisabled"
        },
        style: {
            enabled: "buyButtonEnabled",
            over: "buyButtonOver",
            pressed: "buyButtonPressed",
            disabled: "buyButtonDisabled"
        }
    },
    autoPlayStartButton: {
        type: 'button',
        string: 'button_autoPlay',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },
    autoPlayStopButton: {
        type: 'button',
        string: 'button_stop',
        textures: {
            enabled: 'mainButtonStopEnabled',
            over: 'mainButtonStopOver',
            pressed: 'mainButtonStopPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    },
    autoPlayButton_default: {
        type: "point",
        landscape: {
            x: 720,
            y: 699
        },
        portrait: {
            x: 405,
            y: 1300
        }
    },
    autoPlayButton_multi: {
        type: "point",
        landscape: {
            x: 888,
            y: 699
        },
        portrait: {
            x: 405,
            y: 1300
        }
    },
    ticketSelectBarSmall: {
        type: "container",
        landscape: {
            x: 552,
            y: 699
        },
        portrait: {
            x: 405,
            y: 1205
        },
        children: ["ticketSelectBarBG", "ticketSelectCostValue", "ticketCostDownButtonStatic", "ticketCostUpButtonStatic", "ticketCostDownButton", "ticketCostUpButton", "ticketCostIndicators"]
    },
    ticketCostDownButton: {
        type: "button",
        portrait: {
            x: -208
        },
        landscape: {
            x: -125
        },
        textures: {
            enabled: "minusButtonEnabled",
            disabled: "minusButtonDisabled",
            over: "minusButtonOver",
            pressed: "minusButtonPressed"
        }
    },
    ticketCostUpButton: {
        type: "button",
        portrait: {
            x: 208
        },
        landscape: {
            x: 125
        },
        textures: {
            enabled: "plusButtonEnabled",
            disabled: "plusButtonDisabled",
            over: "plusButtonOver",
            pressed: "plusButtonPressed"
        }
    },
    ticketCostDownButtonStatic: {
        type: "sprite",
        anchor: 0.5,
        portrait: {
            x: -208
        },
        landscape: {
            x: -125
        },
        texture: "minusButtonDisabled"
    },
    ticketCostUpButtonStatic: {
        type: "sprite",
        anchor: 0.5,
        portrait: {
            x: 208
        },
        landscape: {
            x: 125
        },
        texture: "plusButtonDisabled"
    },
    buttonBar: {
        type: "container",
        landscape: {
            x: 0,
            y: 649
        },
        portrait: {
            x: 0,
            y: 1250
        },
        children: ["helpButtonStatic", "helpButton", "homeButtonStatic", "homeButton", "exitButton", "playAgainButton", "tryAgainButton", "buyButton", "buyButtonAnim", "tryButton", "tryButtonAnim", "moveToMoneyButton", "retryButton"]
    },
    footerContainer: {
        type: "container",
        children: ["footerBG", "balanceMeter", "ticketCostMeter", "winMeter", "divider_1_3", "divider_2_3", "divider_1_2"],
        landscape: {
            y: 761
        },
        portrait: {
            y: 1349
        }
    },
    footerBG: {
        type: "sprite",
        landscape: {
            texture: "landscape_footerBar",
            y: 5
        },
        portrait: {
            texture: "portrait_footerBar",
            y: 5
        }
    },

    /*
     * BUTTON POSITION POINTS
     */
    buy_default: {
        type: 'point',
        landscape: {
            x: 720,
            y: 50
        },
        portrait: {
            x: 405,
            y: 50
        }
    },
    try_default: {
        type: 'point',
        landscape: {
            x: 720,
            y: 50
        },
        portrait: {
            x: 555,
            y: 50
        }
    },
    playForMoney_default: {
        type: 'point',
        landscape: {
            x: 552,
            y: 50
        },
        portrait: {
            x: 255,
            y: 50
        }
    },
    buy_multi: {
        type: 'point',
        landscape: {
            x: 888,
            y: 50
        },
        portrait: {
            x: 405,
            y: 50
        }
    },
    try_multi: {
        type: 'point',
        landscape: {
            x: 888,
            y: 50
        },
        portrait: {
            x: 555,
            y: 50
        }
    },
    try_fixed: {
        type: 'point',
        landscape: {
            x: 888,
            y: 50
        },
        portrait: {
            x: 555,
            y: 50
        }
    },
    playForMoney_multi: {
        type: 'point',
        landscape: {
            x: 1188,
            y: 50
        },
        portrait: {
            x: 255,
            y: 50
        }
    },
    tryAgainButton: {
        type: 'button',
        landscape: {
            x: 888,
            y: 50
        },
        portrait: {
            x: 555,
            y: 50
        },
        string: 'button_tryAgain',
        textures: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        },
        style: {
            enabled: 'mainButtonEnabled',
            over: 'mainButtonOver',
            pressed: 'mainButtonPressed',
            disabled: 'mainButtonDisabled'
        }
    }
});