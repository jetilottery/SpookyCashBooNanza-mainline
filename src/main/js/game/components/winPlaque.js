define(require => {
    const PIXI = require("com/pixijs/pixi");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const resLib = require("skbJet/component/resourceLoader/resourceLib");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const meterData = require("skbJet/componentManchester/standardIW/meterData");
    const gameConfig = require("skbJet/componentManchester/standardIW/gameConfig");
    const orientation = require("skbJet/componentManchester/standardIW/orientation");
    const winUpTo = require("game/components/winUpTo");
    const bigWin = require("game/components/bigWin");
    const audio = require("skbJet/componentManchester/standardIW/audio");

    require("com/gsap/TimelineLite");
    var Timeline = window.TimelineLite;

    let plaqueActive = false;
    let winPlaqueAnimBG;
    let winPlaqueAnim;
    let showing;
    let hiding;
    let enabled;

    const plaqueHitArea = new PIXI.Rectangle(-300, -200, 600, 400);

    function init() {
        winPlaqueAnimBG = new PIXI.spine.Spine(resLib.spine["BigWin"].spineData);

        displayList.winPlaqueSpineBG.addChildAt(winPlaqueAnimBG, 0);
        displayList.winPlaqueSpineBG.visible = false;

        winPlaqueAnim = new PIXI.spine.Spine(resLib.spine["WinPlaque"].spineData);

        displayList.winPlaqueSpine.addChild(winPlaqueAnim);
        displayList.winPlaqueSpine.on("pointerup", (e) => {
            if(enabled) {
                msgBus.publish("UI.hideResult", e);
            }
        });
        displayList.winPlaqueValue.on("pointerup", (e) => {
            if(enabled) {
                msgBus.publish("UI.hideResult", e);
            }
        });
        displayList.winPlaqueMessage.on("pointerup", (e) => {
            if(enabled) {
                msgBus.publish("UI.hideResult", e);
            }
        });
        displayList.winPlaqueCloseButton.on("pointerup", (e) => {
            if(enabled) {
                msgBus.publish("UI.hideResult", e);
            }
        });
        updateCursor(null);
        displayList.winPlaqueSpine.hitArea = plaqueHitArea;

        msgBus.subscribe("GameSize.OrientationChange", orientationChanged);
    }

    function lightning() {
        if(plaqueActive) {
            audio.play("lightning", false);
            playAnim(winPlaqueAnimBG, "Loop_bigWin", () => {
                playAnim(winPlaqueAnimBG, "Loop", null, true);
            }, false);    
        }
    }

    function updateCursor(cursor) {
        displayList.winPlaqueSpine.cursor = cursor;
        displayList.winPlaqueValue.cursor = cursor;
        displayList.winPlaqueMessage.cursor = cursor;
        displayList.winPlaqueCloseButton.cursor = cursor;
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
        if (gameConfig.showResultScreen) {
            displayList.winPlaqueSpineBG.visible = true;
            displayList.winPlaqueSpine.visible = true;
        }
        if (meterData.totalWin > 0) {
            if (gameConfig.showResultScreen) {
                displayList.winPlaqueSpineBG.visible = true;
                displayList.winPlaqueSpine.visible = true;
            }
    
            winPlaqueAnim.visible = true;
            winPlaqueAnimBG.visible = true;
            playAnim(winPlaqueAnim, "Intro", () => {
                playAnim(winPlaqueAnim, "Loop", null, true);
            }, false);
            playAnim(winPlaqueAnimBG, "Intro", () => {
                if(bigWin.findPrizeLevel() == Object.keys(gameConfig.bigWinThresholds).length) { //highest big win level
                    new Timeline()
                        .call(lightning, null, this, 0)
                        .call(lightning, null, this, 3);
                } else {
                    playAnim(winPlaqueAnimBG, "Loop", null, true);
                }
            }, false);
        } else {
            displayList.winPlaqueSpineBG.visible = false;
            displayList.winPlaqueSpine.visible = false;
        }
        displayList.winPlaqueSpine.interactive = true;
        displayList.winPlaqueMessage.interactive = true;
        displayList.winPlaqueValue.interactive = true;
        displayList.winPlaqueCloseButton.interactive = false;
        plaqueActive = true;

        let multi = displayList.winPlaqueMessage.height > 82;
        displayList.winPlaqueMessage.y = multi ? displayList.winPlaqueMessage_multi.y : displayList.winPlaqueMessage_default.y;
        displayList.winPlaqueValue.y = multi ? displayList.winPlaqueValue_multi.y : displayList.winPlaqueValue_default.y;

        setTimeout(updateCursor, gameConfig.secondsDelayDismissResult * 1000, "pointer");
    }

    function playAnim(anim, name, then, loop) {
        console.log("PLAY ANIM: " + name);
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
            anim.state.tracks[0].time = 0;
            anim.state.tracks[0].trackTime = 0;
        }
    }

    function orientationChanged() {
        if (plaqueActive) {
            playAnim(winPlaqueAnimBG, "Loop", null, true);
            playAnim(winPlaqueAnim, "Loop", null, true);
        }
        let multi = displayList.winPlaqueMessage.height > 82;
        displayList.winPlaqueMessage.y = multi ? displayList.winPlaqueMessage_multi.y : displayList.winPlaqueMessage_default.y;
        displayList.winPlaqueValue.y = multi ? displayList.winPlaqueValue_multi.y : displayList.winPlaqueValue_default.y;
    }

    function hide() {
        if(hiding) {
            return;
        }
        showing = false;
        if(plaqueActive) {
            plaqueActive = false;

            winPlaqueAnim.state.clearListeners();
            winPlaqueAnimBG.state.clearListeners();
            
            hiding = true;
            playAnim(winPlaqueAnim, "Outro", null, false);
            playAnim(winPlaqueAnimBG, "Outro", null, false);
        } else {
            displayList.winPlaqueSpine.visible = false;
            displayList.winPlaqueSpineBG.visible = false;
        }
        displayList.winPlaqueSpine.interactive = false;    
        displayList.winPlaqueMessage.interactive = false;
        displayList.winPlaqueValue.interactive = false;
        displayList.winPlaqueCloseButton.interactive = false;
        updateCursor(null);
    }

    msgBus.subscribe("UI.showResult", () => {
        if(meterData.win > 0) {
            console.log("SHOWRESULT");
            show();
        }
    });
    msgBus.subscribe("UI.hideResult", () => {
        if(meterData.win > 0) {
            console.log("HIDERESULT");
            hide();
        }
    });

    return {
        init,
        lightning,
        show,
        hide,
        playAnim
    };
});