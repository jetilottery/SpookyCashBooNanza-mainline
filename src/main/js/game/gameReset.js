define(function (require) {
    const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
    const playerNumbers = require("game/components/playerNumbers");
    const winUpTo = require("game/components/winUpTo");
    const bonusData = require("game/data/bonusData");
    const bonusMeter = require("game/components/bonusMeter");
    const bonusController = require("game/components/bonusController");
    const coffinBonus = require("game/components/coffinBonus");
    const organBonus = require("game/components/organBonus");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    const numberState = require("game/components/state");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const gameState = require("game/components/state");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");

    function prepareOrReset() {
        resetAll();
        gameFlow.next();
    }
    function resetAll() {
        playerNumbers.reset();
        coffinBonus.reset();
        organBonus.reset();
        bonusMeter.reset();
        bonusData.reset();
        bonusController.reset();
        numberState.reset();
        winUpTo.reset();
        gameState.reset();

        displayList.autoPlayStartButton.alpha = 1;
        displayList.autoPlayStopButton.alpha = 1;

        // Make sure we hide the result
        msgBus.publish("UI.hideResult");

        // Fade out the win/lose terminator in case it is still playing
        if (audio.isPlaying("winTerminator")) {
            audio.fadeOut("winTerminator", 1);
        }
    }

    // Subscribe to Ticket Cost +/- as we will not be in GAME_RESET when these are called
    msgBus.subscribe("TicketSelect.CostUp", resetAll);
    msgBus.subscribe("TicketSelect.CostDown", resetAll);
    msgBus.subscribe("TicketSelect.CostMax", resetAll);

    gameFlow.handle(prepareOrReset, "GAME_RESET");
    gameFlow.handle(prepareOrReset, "GAME_PREPARE");
});
