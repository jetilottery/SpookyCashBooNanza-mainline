define(require => {
    const PIXI = require("com/pixijs/pixi");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const resLib = require("skbJet/component/resourceLoader/resourceLib");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");

    let organPips = [];
    let coffinPips = [];

    let organPipIndex = 0;
    let coffinPipIndex = 0;

    let organBonusMeter, coffinBonusMeter;

    function init() {
        organBonusMeter = new PIXI.spine.Spine(resLib.spine["BonusMeters"].spineData);
        coffinBonusMeter = new PIXI.spine.Spine(resLib.spine["BonusMeters"].spineData);

        window.coffinBonusMeter = coffinBonusMeter;
        window.organBonusMeter = organBonusMeter;

        displayList.OB_Meter.addChildAt(organBonusMeter, 0);
        displayList.CB_Meter.addChildAt(coffinBonusMeter, 0);

        let bPip_1 = new PIXI.spine.Spine(resLib.spine["BonusMeters"].spineData);
        displayList.bPip_1.alpha = 0;
        displayList.bPip_1.addChild(bPip_1);
        let bPip_2 = new PIXI.spine.Spine(resLib.spine["BonusMeters"].spineData);
        displayList.bPip_2.alpha = 0;
        displayList.bPip_2.addChild(bPip_2);
        let bPip_3 = new PIXI.spine.Spine(resLib.spine["BonusMeters"].spineData);
        displayList.bPip_3.alpha = 0;
        displayList.bPip_3.addChild(bPip_3);

        coffinPips.push(bPip_1, bPip_2, bPip_3);

        let cPip_1 = new PIXI.spine.Spine(resLib.spine["BonusMeters"].spineData);
        displayList.cPip_1.alpha = 0;
        displayList.cPip_1.addChild(cPip_1);
        let cPip_2 = new PIXI.spine.Spine(resLib.spine["BonusMeters"].spineData);
        displayList.cPip_2.alpha = 0;
        displayList.cPip_2.addChild(cPip_2);
        let cPip_3 = new PIXI.spine.Spine(resLib.spine["BonusMeters"].spineData);
        displayList.cPip_3.alpha = 0;
        displayList.cPip_3.addChild(cPip_3);
        organPips.push(cPip_1, cPip_2, cPip_3);

        pauseAtFirstFrame();

        msgBus.subscribe("Bonus.Transition", onTransition);
    }

    function pauseAtFirstFrame() {
        // organBonusMeter.state.clearTrack(0);
        // coffinBonusMeter.skeleton.setToSetupPose();
        // organBonusMeter.state.clearTrack(0);
        // coffinBonusMeter.skeleton.setToSetupPose();
        coffinBonusMeter.state.setAnimation(0, "COFFINIdle", false);
        coffinBonusMeter.state.timeScale = 0;
        organBonusMeter.state.setAnimation(0, "ORGANIdle", false);
        organBonusMeter.state.timeScale = 0;
    }

    function idle() {
        coffinBonusMeter.state.setAnimation(0, "COFFINIdle", true);
        coffinBonusMeter.state.timeScale = 1;
        organBonusMeter.state.setAnimation(0, "ORGANIdle", true);
        organBonusMeter.state.timeScale = 1;
    }

    function addPipToCoffin() {
        var pip = coffinPips[coffinPipIndex];
        pip.parent.alpha = 1;
        pip.timeScale = 0.8;
        pip.state.setAnimation(0, "PIP_Trigger_coffin", false);
        pip.state.addListener({
            complete: (entry) => {
                if (entry.animation.name === "PIP_Trigger_coffin") {
                    pip.state.setAnimation(0, "PIP_Loop_coffin", true);
                    pip.state.listeners.forEach((sp) => {
                        pip.state.removeListener(sp);
                    });
                }
            }
        });

        coffinBonusMeter.state.setAnimation(0, "COFFINTrigger", false);
        coffinBonusMeter.timeScale = 0.8;
        coffinBonusMeter.state.addListener({
            complete: function (entry) {
                if (entry.animation.name === "COFFINTrigger") {
                    coffinBonusMeter.state.setAnimation(0, "COFFINIdle", true);
                    coffinBonusMeter.state.listeners.forEach((sp) => {
                        coffinBonusMeter.state.removeListener(sp);
                    });
                }
            }
        });
        coffinPipIndex++;
        audio.playSequential("bonus_icon"/* + coffinPipIndex*/, false, 0.7);
    }

    function addPipToOrgan() {
        var pip = organPips[organPipIndex];
        pip.parent.alpha = 1;
        pip.timeScale = 0.8;
        pip.state.setAnimation(0, "PIP_Trigger_organ", false);
        pip.state.addListener({
            complete: (entry) => {
                if (entry.animation.name === "PIP_Trigger_organ") {
                    pip.state.setAnimation(0, "PIP_Loop_organ", true);
                    pip.state.listeners.forEach((sp) => {
                        pip.state.removeListener(sp);
                    });
                }
            }
        });

        organBonusMeter.state.setAnimation(0, "ORGANTrigger", false);
        organBonusMeter.state.timeScale = 0.8;
        organBonusMeter.state.addListener({
            complete: function (entry) {
                if (entry.animation.name === "ORGANTrigger") {
                    organBonusMeter.state.setAnimation(0, "ORGANIdle", true);
                    organBonusMeter.state.listeners.forEach((sp) => {
                        organBonusMeter.state.removeListener(sp);
                    });
                }
            }
        });
        organPipIndex++;
        audio.playSequential("bonus_icon" /*+ organPipIndex*/, false, 0.7);
    }

    function onTransition(data) {
        let pips = data.nextGame === "coffinBonus" ? coffinPips : organPips;
        let anim = "PIP_transition_" + (data.nextGame === "coffinBonus" ? "coffin" : "organ");
        pips.forEach(pip => {
            pip.state.setAnimation(0, anim, true);
        });
    }

    function organsFilled() {
        //audio.play("bonus_triggered", false);
        organBonusMeter.state.setAnimation(0, "ORGANFilled", true);
    }

    function coffinsFilled() {
        //audio.play("bonus_triggered", false);
        coffinBonusMeter.state.setAnimation(0, "COFFINFilled", true);
    }

    function coffinReturn(value) {
        coffinBonusMeter.state.setAnimation(0, "COFFINIdle_BLANK", false);
        displayList.coffinBonusText.visible = true;
        displayList.coffinBonusText.text = value;
        displayList.CB_MeterResult.alpha = 1;
        displayList.CB_ResultText.text = displayList.bonusWinPlaqueCoffinValue.text;
        displayList.CB_ResultText.maxWidth = 100;
        
        coffinPips.forEach(pip => {
            pip.state.clearTrack(0);
            pip.skeleton.setToSetupPose();
            pip.parent.alpha = 0;
        });
    }
    function organReturn(value) {
        organBonusMeter.state.setAnimation(0, "ORGANIdle_BLANK", false);
        displayList.organBonusText.visible = true;
        displayList.organBonusText.text = value;
        displayList.OB_MeterResult.alpha = 1;
        displayList.OB_ResultText.text = displayList.bonusWinPlaqueOrganValue.text;
        displayList.OB_ResultText.maxWidth = 100;

        organPips.forEach(pip => {
            pip.state.clearTrack(0);
            pip.skeleton.setToSetupPose();
            pip.parent.animationalpha = 0;
        });
    }

    function reset() {
        organPips.forEach(pip => {
            pip.state.clearTrack(0);
            pip.skeleton.setToSetupPose();
            pip.parent.alpha = 0;
        });
        coffinPips.forEach(pip => {
            pip.state.clearTrack(0);
            pip.skeleton.setToSetupPose();
            pip.parent.alpha = 0;
        });

        pauseAtFirstFrame();

        displayList.coffinBonusText.visible = false;
        displayList.organBonusText.visible = false;

        displayList.coffinBonusText.text = " ";
        displayList.organBonusText.text = " ";

        organPipIndex = 0;
        coffinPipIndex = 0;
    }

    return {
        init,
        reset,
        idle,
        addPipToOrgan,
        addPipToCoffin,
        organsFilled,
        coffinsFilled,
        coffinReturn,
        organReturn,
        pause: pauseAtFirstFrame,
        organsCollected: () => { return organPipIndex; },
        coffinsCollected: () => { return coffinPipIndex; },
    };
});