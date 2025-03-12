define(require => {
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
    const resources = require("skbJet/component/pixiResourceLoader/pixiResourceLoader");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const prizeData = require("skbJet/componentManchester/standardIW/prizeData");
    const autoPlay = require("skbJet/componentManchester/standardIW/autoPlay");
    const playerNumbers = require("game/components/playerNumbers");
    const meterData = require("skbJet/componentManchester/standardIW/meterData");
    const config = require("skbJet/componentManchester/standardIW/gameConfig");
    const gameState = require("game/components/state");
    require("com/gsap/plugins/PixiPlugin");

    require("com/gsap/TimelineMax");
    require("com/gsap/easing/EasePack");
    const Timeline = window.TimelineMax;

    const FADE_DURATION = 0.5;
    const MIN_SCALE = 0.5;
    const MAX_SCALE = 1.5;

    let outValue = 0;
    let lastStr = "";
    let finished = false;

    function setWinUpTo() {
        const inValue = prizeData.prizeStructure[0];
        const inFormatted = SKBeInstant.formatCurrency(inValue).formattedAmount;
        const inString = resources.i18n.Game.winUpTo.replace("{0}", inFormatted);

        const outFormatted = SKBeInstant.formatCurrency(outValue).formattedAmount;
        const outString = resources.i18n.Game.winUpTo.replace("{0}", outFormatted);

        displayList.winUpToInText.text = inString;
        displayList.winUpToOutText.text = outString;

        // If outValue is 0 winUpTo is not yet set, so display the in value and skip the timeline
        if (outValue === 0 || outValue === inValue) {
            outValue = inValue;
            displayList.winUpToOutText.alpha = 0;
            return;
        }

        const updateTimeline = new Timeline();
        const outScale = inValue > outValue ? MAX_SCALE : MIN_SCALE;
        const inScale = inValue > outValue ? MIN_SCALE : MAX_SCALE;

        // update outValue for next time
        outValue = inValue;
        lastStr = displayList.winUpToInText.text;

        updateTimeline.fromTo(
            displayList.winUpToIn,
            FADE_DURATION,
            {
                pixi: { scaleX: inScale, scaleY: inScale },
                alpha: 0,
            },
            {
                pixi: { scaleX: 1, scaleY: 1 },
                alpha: 1,
            },
            0
        );

        updateTimeline.fromTo(
            displayList.winUpToOut,
            FADE_DURATION,
            {
                pixi: { scaleX: 1, scaleY: 1 },
                alpha: 1,
            },
            {
                pixi: { scaleX: outScale, scaleY: outScale },
                alpha: 0,
            },
            0
        );
        finished = false;
    }

    function switchToPicks() {
        if(gameState.activeGame === "baseGame") {
            updatePicks();
        }
    }

    function switchToAutoPlay() {
        if(gameState.activeGame === "baseGame") {
            switchToString(resources.i18n.Game.button_autoPlay);
        }
    }

    function hide() {
        switchToString("");
    }

    function show() {
        switchToString(lastStr);
    }

    function switchToString(inString) {
        lastStr = displayList.winUpToInText.text;
        displayList.winUpToInText.text = inString;

        const updateTimeline = new Timeline();
        const outScale = MAX_SCALE;
        const inScale = MIN_SCALE;

        // update outValue for next time
        updateTimeline.fromTo(
            displayList.winUpToIn,
            FADE_DURATION,
            {
                pixi: { scaleX: inScale, scaleY: inScale },
                alpha: 0,
            },
            {
                pixi: { scaleX: 1, scaleY: 1 },
                alpha: 1,
            },
            0
        );

        updateTimeline.fromTo(
            displayList.winUpToOut,
            FADE_DURATION,
            {
                pixi: { scaleX: 1, scaleY: 1 },
                alpha: 1,
            },
            {
                pixi: { scaleX: outScale, scaleY: outScale },
                alpha: 0,
            },
            0
        );
    }

    function updatePicks() {
        let inValue = playerNumbers.picksRemaining;

        if(inValue === 0 && !finished) {
            finished = true;
            msgBus.publish("UI.updateButtons", {
                autoPlay: false,
                ticketSelect: { enabled: false, visible: ["init", "baseGame", "end"].indexOf(gameState.activeGame) > -1 && config.ticketCostMeterVisibleWhilePlaying && meterData.ticketCosts.length > 1 },
                help: false
            });
            msgBus.publish("IXFConsole.disableAll");
            msgBus.publish("Game.StopIdle");
            displayList.winUpToInText.text = " ";
            displayList.winUpToOutText.text = " ";
        } else if (inValue > 0) {
            finished = false;
        }

        if(autoPlay.enabled) {
            return;
        }
        const inString = resources.i18n.Game.picksLeft.replace("{0}", inValue);

        const outString = resources.i18n.Game.picksLeft.replace("{0}", outValue);

        displayList.winUpToInText.text = inString;
        displayList.winUpToOutText.text = outString;

        const updateTimeline = new Timeline();
        const outScale = inValue > outValue ? MAX_SCALE : MIN_SCALE;
        const inScale = inValue > outValue ? MIN_SCALE : MAX_SCALE;

        // update outValue for next time
        outValue = inValue;
        lastStr = displayList.winUpToInText.text;

        updateTimeline.fromTo(
            displayList.winUpToIn,
            FADE_DURATION,
            {
                pixi: { scaleX: inScale, scaleY: inScale },
                alpha: 0,
            },
            {
                pixi: { scaleX: 1, scaleY: 1 },
                alpha: 1,
            },
            0
        );

        updateTimeline.fromTo(
            displayList.winUpToOut,
            FADE_DURATION,
            {
                pixi: { scaleX: 1, scaleY: 1 },
                alpha: 1,
            },
            {
                pixi: { scaleX: outScale, scaleY: outScale },
                alpha: 0,
            },
            0
        );
    }

    function reset() {
        if(gameState.activeGame === "init") {
            setWinUpTo();
        } else {
            hide();
        }
    }

    msgBus.subscribe("Game.AutoPlayStart", switchToAutoPlay);
    msgBus.subscribe("Game.AutoPlayStop", switchToPicks);
    msgBus.subscribe("PrizeData.PrizeStructure", setWinUpTo);
    msgBus.subscribe("Game.switchToPicks", switchToPicks);
    msgBus.subscribe("Game.updatePicks", updatePicks);
    msgBus.subscribe("UI.hideResult", setWinUpTo);

    return {
        reset,
        hide,
        show,
        switchToPicks,
        switchToAutoPlay,
        updatePicks,
    };
});
