define(require => {
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const gameState = require("game/components/state");
    const resources = require("skbJet/component/pixiResourceLoader/pixiResourceLoader");
    const transition = require("game/components/transition");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
    
    function init() {
        //displayList.bonusTutorialContainer.on("pointerdown", hide);
        displayList.bonusTutorialContainer.alpha = 0;
        displayList.bonusTutorialContainer.visible = false;

        displayList.bonusTutorialClose.on("press", hide);

        msgBus.subscribe("GameSize.OrientationChange", orientationChanged);
    }

    async function show() {
        switch(gameState.activeGame) {
            case "organBonus":
                displayList.bonusTutorialTitle.text = resources.i18n.Game.organBonus;
                displayList.bonusTutorialText.text = resources.i18n.Game.organBonusTutorial;
                break;
            case "coffinBonus":
                displayList.bonusTutorialTitle.text = resources.i18n.Game.coffinBonus;
                displayList.bonusTutorialText.text = resources.i18n.Game.coffinBonusTutorial;
                break;
            default:
                displayList.bonusTutorialContainer.visible = false;
        }
        displayList.bonusTutorialText.insertIcons();
        await transition.fade(null, displayList.bonusTutorialContainer);
        displayList.bonusTutorialClose.enabled = true;
        displayList.bonusTutorialContainer.interactive = true;
        msgBus.publish("UI.updateButtons", {
            autoPlay: {enabled: false, visible: SKBeInstant.config.autoRevealEnabled }
        });
        displayList.autoPlayStopButton.enabled = false;
        msgBus.publish("Bonus.TutorialOpened");
    }

    async function hide() {
        audio.play("click", false);
        displayList.bonusTutorialContainer.interactive = false;
        displayList.bonusTutorialClose.enabled = false;
        await transition.fade( displayList.bonusTutorialContainer, null);
        msgBus.publish("Bonus.TutorialClosed");
    }

    function orientationChanged() {
        displayList.bonusTutorialText.removeChildren();
        if(gameState.activeGame === "coffinBonus") {
            displayList.bonusTutorialText.text = resources.i18n.Game.coffinBonusTutorial;
            displayList.bonusTutorialText.insertIcons();
        }
    }

    return {
        init,
        show,
        hide
    };
});