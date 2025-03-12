define(require => {
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const gameState = require("game/components/state");
    //const resources = require("skbJet/component/pixiResourceLoader/pixiResourceLoader");
    const transition = require("game/components/transition");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    const Timeline = require("com/gsap/TimelineLite");

    let plaqueProm, showTimeout;

    function init() {
        displayList.bonusWinPlaqueContainer.on("pointerdown", hide);
        displayList.bonusWinPlaqueContainer.alpha = 0;
        displayList.bonusWinPlaqueContainer.visible = false;
    }

    async function show() {
        //reset visibility and positions
        displayList.bonusWinPlaqueOrganMulti.alpha = 0; 
        displayList.bonusWinPlaqueOrganMulti.x = 0;
        displayList.bonusWinPlaqueOrganCash.alpha = 0;
        displayList.bonusWinPlaqueOrganCash.x = 0;
        displayList.bonusWinPlaqueOrganMessage.alpha = 0;
        displayList.bonusWinPlaqueOrganValue.alpha = 0;
        displayList.bonusWinPlaqueCoffinMessage.alpha = 0;
        displayList.bonusWinPlaqueCoffinValue.alpha = 0;

        await new Promise(resolve => {
            audio.fadeOut("bonus_music", 0.2);
            setTimeout(resolve, 200);
        });
        audio.play("bonus_plaque", false);

        await transition.fade(null, displayList.bonusWinPlaqueContainer);

        if(gameState.activeGame === "coffinBonus") {
            await new Promise(resolve => {
                new Timeline({onComplete: resolve})
                    .to(displayList.bonusWinPlaqueCoffinMessage, 0.5, {alpha: 1}, 0)
                    .to(displayList.bonusWinPlaqueCoffinValue, 0.5, {alpha: 1}, 0.4);
            });
        } else {
            await new Promise(resolve => {
                const xOffset = (displayList.bonusWinPlaqueOrganMulti.width - displayList.bonusWinPlaqueOrganCash.width) / 2;
                const cashStart = displayList.organCashMeter.getGlobalPosition();
                const multiStart = displayList.organMultiplierMeter.getGlobalPosition();
                const cashEnd = displayList.bonusWinPlaqueOrganCash.getGlobalPosition();
                const multiEnd = displayList.bonusWinPlaqueOrganMulti.getGlobalPosition();

                new Timeline({onComplete: resolve})
                    .fromTo(displayList.bonusWinPlaqueOrganCash, 0.5, {x: cashStart.x - cashEnd.x, y: cashStart.y - cashEnd.y, alpha: 0}, {x: xOffset, y: 0, alpha: 1}, 0)
                    .fromTo(displayList.bonusWinPlaqueOrganMulti, 0.5, {x: multiStart.x - multiEnd.x, y: multiStart.y - multiEnd.y, alpha: 0}, {x: xOffset, y: 0, alpha: 1}, 0)
                    .to(displayList.bonusWinPlaqueOrganMessage, 0.5, {alpha: 1}, 0.4)
                    .to(displayList.bonusWinPlaqueOrganValue, 0.5, {alpha: 1}, 0.8);
            });
        }

        displayList.bonusWinPlaqueContainer.interactive = true;
        showTimeout = setTimeout(hide, 3500);
        return new Promise(resolve => {
            plaqueProm = resolve;
        });
    }

    function hide() {
        clearTimeout(showTimeout);
        transition.fade(displayList.bonusWinPlaqueContainer, null);
        displayList.bonusWinPlaqueContainer.interactive = false;
        if(typeof plaqueProm === "function") {
            plaqueProm();
            plaqueProm = undefined;
        }
    }

    return {
        init,
        show,
        hide
    };
});