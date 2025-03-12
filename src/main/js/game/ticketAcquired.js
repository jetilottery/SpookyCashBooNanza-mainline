define((require) => {
    const scenarioData = require("skbJet/componentManchester/standardIW/scenarioData");
    const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    const config = require("skbJet/componentManchester/standardIW/gameConfig");

    const playerNumbers = require("game/components/playerNumbers");
    const coffinBonus = require("game/components/coffinBonus");
    const organBonus = require("game/components/organBonus");


    function ticketAcquired() {
        playerNumbers.populate(scenarioData.scenario);
        coffinBonus.populate(scenarioData.scenario);
        organBonus.populate(scenarioData.scenario);

        config.backgroundMusicEnabled && audio.play("BG_music", true);

        gameFlow.next("START_REVEAL");
    }

    gameFlow.handle(ticketAcquired, "TICKET_ACQUIRED");
});
