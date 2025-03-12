define((require) => {
    const prizeData = require("skbJet/componentManchester/standardIW/prizeData");

    return function scenarioTransform(scenarioString) {
        // scenario example: "CKEAHJDIBGF|XAFIAEAHGYIHBJIK|TWUPWWZ|W2";
        // scenarioString = "2X12XX1X||";
        // scenarioString = "2X12AX2X||";
        // scenarioString = "A2X12X2X||S6,M,M,S8,S11,S2,M,S1,M,S8,X"; // Organ Bonus
        //scenarioString = "X122X1X1|I11,115,57,59:I9,242,68,61:I7,354,67,49:I5,487,63,65:I2,616,61,67|"; // coffin Bonus
        // scenarioString = "XX21112N|I11,110,62,48:I10,210,44,63:I8,341,69,61:I4,504,60,92:I1,632,0,0|";
        const scenarioArr = scenarioString.split("|");

        const mockPrizeTable = {
            A: 100000,
            B: 15000,
            C: 5000,
            D: 2500,
            E: 1250,
            F: 1000,
            G: 750,
            H: 500,
            I: 400,
            J: 300,
            K: 250,
            L: 200,
            M: 150,
            N: 100,
            O: 50,
            I1: 100000,
            I2: 15000,
            I3: 5000,
            I4: 2500,
            I5: 1250,
            I6: 1000,
            I7: 750,
            I8: 500,
            I9: 400,
            I10: 250,
            I11: 150,
            I12: 100,
            S1: 500,
            S2: 375,
            S3: 250,
            S4: 200,
            S5: 175,
            S6: 150,
            S7: 125,
            S8: 100,
            S9: 75,
            S10: 50,
            S11: 25,
        };

        let debug = false;
        let symbols = [];
        let symbolPrizes = [];
        let revealOrder = [];
        let organBonus;
        let coffinBonus;
        let coffinBonusPrizes = [];
        let coffinBonusTargets = [];
        let coffinBonusNum1s = [];
        let coffinBonusNum2s = [];

        //basegame symbol order
        symbols = scenarioArr[0].split("");

        //basegame push prize data to *symbolPrizes*
        symbolPrizes = symbols.map(e => {
            return prizeData.prizeTable[e];
        });

        revealOrder = scenarioArr[0].split("");

        // If we have organBonus string, get the prizedata

        if (scenarioArr[2] !== "") {
            organBonus = scenarioArr[2].split(",").map(prize => {
                return prize === "M" || prize === "X" ? prize : (debug ? mockPrizeTable[prize] : prizeData.prizeTable[prize]);
            });
        } else {
            organBonus = false;
        }

        // scenarioString = "X122X1X1|I11,115,57,59:I9,122,68,61:I7,114,67,49:I5,487,63,65:I2,616,61,67|"
        coffinBonus = scenarioArr[1] !== "" ? scenarioArr[1] : false;

        //I11,115,57,59:I9,122,68,61:I7,114,67,49:I5,487,63,65:I2,616,61,67
        if (coffinBonus) {
            let coffinLevels = coffinBonus.split(":"); //["I11,115,57,59","I9,122,68,61","I7,114,67,49","I5,487,63,65","I2,616,61,67"]
            coffinLevels.forEach((lvl) => {
                lvl = lvl.split(","); //[I11,115,57,59]
                coffinBonusPrizes.push(debug ? mockPrizeTable[lvl[0]] : prizeData.prizeTable[lvl[0]]);
                coffinBonusTargets.push(parseInt(lvl[1]));
                coffinBonusNum1s.push(parseInt(lvl[2]));
                coffinBonusNum2s.push(parseInt(lvl[3]));
            });
        }

        return {
            symbols,
            symbolPrizes,
            revealOrder,
            organBonus,
            coffinBonus,
            coffinBonusTargets,
            coffinBonusNum1s,
            coffinBonusNum2s,
            coffinBonusPrizes
        };
    };
});
