define(require => {
    const PIXI = require("com/pixijs/pixi");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const resLib = require("skbJet/component/resourceLoader/resourceLib");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const meterData = require("skbJet/componentManchester/standardIW/meterData");
    const gameConfig = require("skbJet/componentManchester/standardIW/gameConfig");
    const orientation = require("skbJet/componentManchester/standardIW/orientation");
    const winUpTo = require("game/components/winUpTo");

    let plaqueActive = false;
    let losePlaqueAnim;
    let showing;
    let hiding;
    let enabled;
    
    const plaqueHitArea = new PIXI.Rectangle(-300, -200, 600, 400);

    function init() {
        displayList.losePlaqueSpine.visible = false;

        losePlaqueAnim = new PIXI.spine.Spine(resLib.spine["WinPlaque"].spineData);

        displayList.losePlaqueSpine.addChild(losePlaqueAnim);
        displayList.losePlaqueSpine.on("pointerup", (e) => {
            if(enabled) {
                msgBus.publish("UI.hideResult", e);
            }
        });
        displayList.losePlaqueMessage.on("pointerup", (e) => {
            if(enabled) {
                msgBus.publish("UI.hideResult", e);
            }
        });
        displayList.losePlaqueCloseButton.on("pointerup", (e) => {
            if(enabled) {
                msgBus.publish("UI.hideResult", e);
            }
        });
        updateCursor(null);
        displayList.losePlaqueSpine.hitArea = plaqueHitArea;

        msgBus.subscribe("GameSize.OrientationChange", orientationChanged);
    }

    function updateCursor(cursor) {
        displayList.losePlaqueSpine.cursor = cursor;
        displayList.losePlaqueMessage.cursor = cursor;
        displayList.losePlaqueCloseButton.cursor = cursor;
        if(cursor === "pointer") {
            enabled = true;
        }
    }

    function show() {
        enabled = false;
        updateCursor(null);
        if(showing) {
            return;
        }
        showing = true;
        hiding = false;
        winUpTo.reset();
        if (gameConfig.showResultScreen && !gameConfig.suppressNonWinResultPlaque) {
            displayList.losePlaqueSpine.visible = true;
        }
        if (meterData.totalWin === 0) {
            if (gameConfig.showResultScreen && !gameConfig.suppressNonWinResultPlaque) {
                displayList.losePlaqueSpine.visible = true;
                losePlaqueAnim.visible = true;
                playAnim(losePlaqueAnim, "noWin_Intro", () => {
                    playAnim(losePlaqueAnim, "noWin_Loop", null, true);
                }, false);
            }
        } else {
            displayList.losePlaqueSpine.visible = false;
        }
        displayList.losePlaqueSpine.interactive = true;
        displayList.losePlaqueMessage.interactive = true;
        displayList.losePlaqueCloseButton.interactive = false;
        plaqueActive = true;
        setTimeout(updateCursor, gameConfig.secondsDelayDismissResult * 1000, "pointer");
    }

    function playAnim(anim, name, then, loop) {
        let subStr;
        if (orientation.get() === "landscape") {
            subStr = "Land";
        } else {
            subStr = "Port";
        }
        anim.state.setEmptyAnimations();
        if(typeof then === "function") {
            anim.state.setAnimation(0, subStr + "/" + subStr + "_" + name, false);
            anim.state.tracks[0].time = 0;
            anim.state.tracks[0].trackTime = 0;
            anim.state.addListener({
                complete: () => {
                    anim.state.clearListeners();
                    then();
                }
            });
        } else {
            anim.state.setAnimation(0, subStr + "/" + subStr + "_" + name, loop);            
        }
    }

    function orientationChanged() {
        if (plaqueActive) {
            playAnim(losePlaqueAnim, "noWin_Loop", null, true);
        }
    }

    function hide() {
        if(hiding) {
            return;
        }
        showing = false;
        if(plaqueActive) {
            plaqueActive = false;

            losePlaqueAnim.state.clearListeners();
            playAnim(losePlaqueAnim, "noWin_Outro", null, false);   
        } else {
            displayList.losePlaqueSpine.visible = false;
        }
        displayList.losePlaqueBG.interactive = false; 
        displayList.losePlaqueMessage.interactive = false;
        updateCursor(null);
    }

    msgBus.subscribe("UI.showResult", () => {
        if(meterData.win === 0) {
            console.log("SHOWRESULT");
            show();
        }
    });
    msgBus.subscribe("UI.hideResult", () => {
        if(meterData.win === 0) {
            console.log("HIDERESULT");
            hide();
        }
    });

    return {
        init,
    };
});