define(require => {
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const gameConfig = require("skbJet/componentManchester/standardIW/gameConfig");
    const coffinBonus = require("game/components/coffinBonus");
    const organBonus = require("game/components/organBonus");
    const transition = require("game/components/transition");
    const bonusWinPlaque = require("game/components/bonusWinPlaque");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const bonusMeter = require("game/components/bonusMeter");
    const autoPlay = require("skbJet/componentManchester/standardIW/autoPlay");

    require("com/gsap/TweenMax");
    const Tween = window.TweenMax;

    let coffinBonusStatus, organBonusStatus;

    function init() {
        displayList.OB_MeterResult.alpha = 0;
        displayList.CB_MeterResult.alpha = 0;
        displayList.organBonus.interactiveChildren = false;
        displayList.coffinBonus.interactiveChildren = false;
        reset();
    }

    function reset() {
        coffinBonusStatus = "INACTIVE";
        organBonusStatus = "INACTIVE";
        displayList.OB_MeterResult.alpha = 0;
        displayList.CB_MeterResult.alpha = 0;
    }

    async function startCoffinBonus() {
        msgBus.publish("Game.activeGame", "coffinBonus");
        coffinBonusStatus = "STARTED";

        await transition.to("coffinBonus", gameConfig.delayBeforeTransitionToBonus);

        if(gameConfig.pauseAutoplayBetweenGames) {
            autoPlay._enabled = false;
        }

        msgBus.publish("UI.updateButtons", {
            help: false,
            autoPlay: false
        });
        msgBus.publish("IXFConsole.disableAll");

        Tween.fromTo(displayList.autoPlayStartButton, gameConfig.defaultFade, {alpha: 0}, {alpha: 1});

        await coffinBonus.startBonus();
        
        await bonusWinPlaque.show();

        bonusMeter.coffinReturn();
        coffinBonusStatus = "FINISHED";

        await transition.to("baseGame", gameConfig.bonusHoldOnCompleteWin);

        displayList.coffinBonus.interactiveChildren = false;

        msgBus.publish("Game.activeGame", "baseGame");
    }

    async function startOrganBonus() {
        msgBus.publish("Game.activeGame", "organBonus");
        organBonusStatus = "STARTED";

        await transition.to("organBonus", gameConfig.delayBeforeTransitionToBonus);

        if(gameConfig.pauseAutoplayBetweenGames) {
            autoPlay._enabled = false;
        }

        msgBus.publish("UI.updateButtons", {
            help: false,
            autoPlay: false
        });
        msgBus.publish("IXFConsole.disableAll");
        Tween.fromTo(displayList.autoPlayStartButton, gameConfig.defaultFade, {alpha: 0}, {alpha: 1});

        await organBonus.startBonus();
        
        await bonusWinPlaque.show();

        bonusMeter.organReturn();
        organBonusStatus = "FINISHED";
        displayList.organBonus.interactiveChildren = false;

        await transition.to("baseGame", gameConfig.bonusHoldOnCompleteWin);
    }

    function coffinBonusDone() {
        return coffinBonusStatus === "FINISHED";
    }

    function organBonusDone() {
        return organBonusStatus === "FINISHED";
    }

    return {
        init: init,
        reset: reset,
        startCoffinBonus,
        startOrganBonus,
        coffinBonusDone,
        organBonusDone
    };
});