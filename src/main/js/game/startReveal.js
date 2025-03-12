define(function (require) {
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
    const playerNumbers = require("game/components/playerNumbers");
    const bonusController = require("game/components/bonusController");
    const revealAll = require("game/revealAll");
    const gameState = require("game/components/state");
    const config = require("skbJet/componentManchester/standardIW/gameConfig");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const audioPlayer = require("skbJet/component/howlerAudioPlayer/howlerAudioSpritePlayer");  
    const audio = require("skbJet/componentManchester/standardIW/audio");
    const ixfConsole = require("game/components/utils/ixfConsole");
    const meterData = require("skbJet/componentManchester/standardIW/meterData");

    async function startReveal() {
        displayList.autoPlayStartButton.alpha = 1;

        setTimeout(() => {
            msgBus.publish("UI.updateButtons", {
                autoPlay: true,
                ticketSelect: { enabled: false, visible: config.ticketCostMeterVisibleWhilePlaying && meterData.ticketCosts.length > 1 }
            });
            msgBus.publish("IXFConsole.enableAll");    
        }, 100);

        // Enable all of the winning numbers and player numbers, wait until they are all revealed
        msgBus.publish("Game.activeGame", "baseGame");

        await Promise.all([
            ...playerNumbers.enable()
        ]);

        msgBus.publish("UI.updateButtons", {
            autoPlay: false,
            ticketSelect: { enabled: false, visible: config.ticketCostMeterVisibleWhilePlaying && meterData.ticketCosts.length > 1 }
        });

        if(config.pauseAutoplayBetweenGames) {
            revealAll.stop(gameState.activeGame);
        }

        if (gameState.organBonus && !bonusController.organBonusDone()) {            
            msgBus.publish("UI.updateButtons", {
                autoPlay: false,
                ticketSelect: false,
                help: false
            });
            msgBus.publish("IXFConsole.disableAll");

            await bonusController.startOrganBonus();
        }

        if(config.pauseAutoplayBetweenGames) {
            revealAll.stop(gameState.activeGame);
        }

        if (gameState.coffinBonus && !bonusController.coffinBonusDone()) {
            msgBus.publish("UI.updateButtons", {
                autoPlay: false,
                ticketSelect: false,
                help: false
            });
            msgBus.publish("IXFConsole.disableAll");

            await bonusController.startCoffinBonus();
        }

        msgBus.publish("UI.updateButtons", {
            autoPlay: false,
            ticketSelect: { enabled: false, visible: meterData.ticketCosts.length > 1 && config.ticketCostMeterVisibleWhilePlaying },
            help: { enabled: false, visible: true }
        });
        msgBus.publish("IXFConsole.disableAll");

        msgBus.publish("Game.activeGame", "end");

        playerNumbers.greyOutGraves();
        
        gameFlow.next("REVEAL_COMPLETE");
        // continue to the next state
    }

    // Listen for ticket price changes so we can use non-standard audio
    msgBus.subscribe("TicketSelect.CostUp", audio.playSequential.bind(audio, "ticketCostUp"));
    msgBus.subscribe("TicketSelect.CostDown", audio.playSequential.bind(audio, "ticketCostDown"));

    // Listen for autoplay activation which triggers the remaining cards to reveal automatically
    msgBus.subscribe("Game.AutoPlayStart", () => {
        revealAll.start(gameState.activeGame);
    });

    // Listen for autoplay deactivation which cancels the revealAll timeline
    msgBus.subscribe("Game.AutoPlayStop", () => {
        revealAll.stop(gameState.activeGame);
    });

    // Listen for IXFConsole help/paytable activation
    msgBus.subscribe("IXFConsole.enableAll", () => {
        ixfConsole.enableAll(true);
    });

    // Listen for IXFConsole help/paytable deactivation
    msgBus.subscribe("IXFConsole.disableAll", () => {
        ixfConsole.enableAll(false);
    });

    // SDLX-130: For some reason the background music sometimes plays when you turn the sound on at game start. Force audio to switch off if this happens.
    let cycleAudio = () => {
        msgBus.unsubscribe("Game.AudioOn", cycleAudio);

        // kill all audio and re-enable
        audioPlayer.stopAll();
        audio.enable();

        //set music loop if required
        switch(gameState.activeGame) {
            case "baseGame":
                config.backgroundMusicEnabled && audio.play("BG_music", true);
                break;
            case "organBonus":
            case "coffinBonus":
                config.backgroundMusicEnabled && audio.play("bonus_music", true);
        }
    };
    msgBus.subscribe("Game.AudioOn", cycleAudio);

    gameFlow.handle(startReveal, "START_REVEAL");
});