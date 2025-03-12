define(require => {
    "use strict";
    const PIXI = require("com/pixijs/pixi");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const resLib = require("skbJet/component/resourceLoader/resourceLib");
    //const orientation = require("skbJet/componentManchester/standardIW/orientation");
    const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
    const text = require("skbJet/componentManchester/standardIW/layout/text");
    const textStyles = require("skbJet/componentManchester/standardIW/textStyles");
    const LightTrail = require("game/components/effects/LightTrail");
    const audio = require("skbJet/componentManchester/standardIW/audio");

	require("com/gsap/TweenMax");
	const Tween = window.TweenMax;

    require("com/gsap/TimelineLite");
    const Timeline = window.TimelineLite;

    let coffinMeter, meterGhost, meterDividers, meterBone, meterTween, meterScenario, meterCount, winAmount, prizeObj, meterSpark;
    const BONE_MIN = -416;
    const BONE_MAX = 0;
    const DIVIDER_MIN = -56;
    const DIVIDER_MAX = 353.25;
    const LABEL_MIN = -170;
    const LABEL_MAX = 250;

    const meterLabels = ["coffinMeterPrize1", "coffinMeterPrize2", "coffinMeterPrize3", "coffinMeterPrize4", "coffinMeterPrize5"];
    const dividerAnims = ["Meter_LEVEL1", "Meter_LEVEL2", "Meter_LEVEL3", "Meter_LEVEL4", "Meter_LEVEL5"];
    const dividerBonesBlue = ["divBlue_1", "divBlue_2", "divBlue_3", "divBlue_4", "divBlue_5"];
    const dividerBonesRed = ["divRed_1", "divRed_2", "divRed_3", "divRed_4", "divRed_5"];

    function init() {
        coffinMeter = new PIXI.spine.Spine(resLib.spine["BonusIsland_METER"].spineData);
        window.coffinMeter = coffinMeter;

        meterDividers = new PIXI.spine.Spine(resLib.spine["coffinMeterDivs"].spineData);
        window.meterDividers = meterDividers;

        meterGhost = new PIXI.spine.Spine(resLib.spine["BonusMeterGhost"].spineData);
        window.meterGhost = meterGhost;

        meterSpark = new LightTrail();
        window.meterSpark = meterSpark;
        
        displayList.coffinBonus.addChild(meterSpark);

        displayList.coffinMeter.addChildAt(meterDividers, 0);
        displayList.coffinMeter.addChildAt(meterGhost, 0);
        displayList.coffinMeter.addChildAt(coffinMeter, 0);

        coffinMeter.state.setAnimation(0, "Meter_LOOP", true);
        meterDividers.state.setAnimation(0, "Meter_START", false);
        meterGhost.state.setAnimation(0, "ghost_IDLE", true);
        meterGhost.state.addListener({
            complete: (entry) => {
                if(entry.animation.name === "ghost_WIN") {
                    meterGhost.state.setAnimation(0, "ghost_IDLE", true);
                } else if(entry.name === "ghost.noWin") {
                    meterGhost.state.setAnimation(0, "ghost_noWin_IDLE", true);
                }
            },
            event: (entry, event) => {
                if(event.data.name === "wheelGlow") {
                    msgBus.publish("CoffinMeter.TargetReached", {target: meterScenario.targets[0], prize: winAmount});
                }
            }
        });

        meterBone = coffinMeter.skeleton.findBone("Meter_Clip");
        meterBone.x = BONE_MIN;
        meterCount = {
            count: 0,
            target: 0
        };

        msgBus.subscribe("CoffinMeter.Update", onUpdate);
        msgBus.subscribe("CoffinMeter.NonWin", () => {
            meterGhost.state.setAnimation(0, "ghost_noWin", false);
            audio.play("keyPress5", false);
        });
    }

    function populate(data) {
        if(data.prizes.length) {
            //Populate meter scenario object
            meterScenario = {
                prizes: data.prizes.slice(),
                targets: data.targets.slice(),
                prizeObj: meterLabels.slice(),
                dividerAnims: dividerAnims.slice(),
                finalTarget: data.targets[data.targets.length - 1]
            };
            window.meterScenario = meterScenario;

            //Reposition meter dividers and labels to match targets
            const totalTargets = data.targets.length;
            for(let i = 0; i < totalTargets; i++) {
                displayList[meterLabels[i]].text = SKBeInstant.formatCurrency(data.prizes[i]).formattedAmount;
                displayList[meterLabels[i]].x = LABEL_MIN + ((LABEL_MAX - LABEL_MIN) * (meterScenario.targets[i] / meterScenario.finalTarget));
                meterDividers.skeleton.findBone(dividerBonesBlue[i]).x = DIVIDER_MIN + ((DIVIDER_MAX - DIVIDER_MIN) * (meterScenario.targets[i] / meterScenario.finalTarget));
                meterDividers.skeleton.findBone(dividerBonesRed[i]).x = DIVIDER_MIN + ((DIVIDER_MAX - DIVIDER_MIN) * (meterScenario.targets[i] / meterScenario.finalTarget));
            }
        }
    }

    function onUpdate(num) {
        if(num === 0) { return; }
        if(meterGhost.state.tracks[0].animation.name.indexOf("ghost_WIN") === -1) {
            meterGhost.state.setAnimation(0, "ghost_HIT", false);
        }
        meterCount.target += num;
        //console.log("UPDATE: " + meterCount.target + " (+" + num + ")");

        if(meterTween) {
            meterTween.kill(); 
        }
        meterTween = Tween.to(meterCount, 0.5, {count: meterCount.target, onUpdate: () => 
            {
                if(meterCount.count >= meterScenario.targets[0]) {
                    if(meterScenario.targets.length === 1) {
                        //coin shower
                        meterGhost.state.setAnimation(0, "ghost_WIN_ALL", true);
                        audio.play("spirit_win", false);
                    } else {
                        meterGhost.state.setAnimation(0, "ghost_WIN", false);
                        audio.playSequential("spirit_grow", false);
                    }
                    meterDividers.state.setAnimation(0, meterScenario.dividerAnims.shift(), false);
                    meterScenario.targets.shift();
                    winAmount = meterScenario.prizes.shift();
                    if(meterScenario.targets.length === 0) {
                        //last win
                        msgBus.publish("CoffinMeter.TargetReached", {target: meterScenario.targets[0], prize: winAmount, lastPrize: true});
                    }

                    let prevPrizeObj = prizeObj || { alpha: 1 };
                    prizeObj = displayList[meterScenario.prizeObj.shift()];
                    new Timeline({
                        onComplete: () => {
                            /*meterSpark.goto({
                                particleType: "WHEEL",
                                start: {x: prizeObj.getGlobalPosition().x, y: displayList.coffinMeter.getGlobalPosition().y},
                                pos: displayList.coffinWheel.getGlobalPosition(),
                                cb: () => {
                                    msgBus.publish("CoffinMeter.TargetReached", {target: meterScenario.targets[0], prize: winAmount});
                                }
                            });*/
                        }
                    })
                        .to(prevPrizeObj, 0.25, {alpha: 0}, 0)
                        .to(prizeObj, 0.25, {pixi: {scaleX: 1.2, scaleY: 1.2}}, 0)
                        .call(() => {
                            text.update(prizeObj, textStyles.coffinBonusMeterWin);
                        }, null, this, 0.25)
                        .to(prizeObj, 0.25, {pixi: {scaleX: 1, scaleY: 1}}, 0.25)
                        .call(() => {
                            prizeObj.maxWidth = textStyles.coffinBonusMeterWin.maxWidth;
                        }, null, this, 0.5);
                }
                meterBone.x = BONE_MIN + ((BONE_MAX - BONE_MIN) * (meterCount.count / meterScenario.finalTarget));
            }
        });
    }

    function reset() {
        winAmount = 0;
        prizeObj = undefined;
        meterCount.count = 0;
        meterCount.target = 0;
        meterBone.x = BONE_MIN;
        meterScenario = undefined;
        meterDividers.state.setAnimation(0, "Meter_START", false);
        ["coffinMeterPrize1", "coffinMeterPrize2", "coffinMeterPrize3", "coffinMeterPrize4", "coffinMeterPrize5"].forEach((name) => {
            let txt = displayList[name];
            text.update(txt, textStyles.coffinBonusMeter);
            txt.alpha = 1;
            txt.maxWidth = textStyles.coffinBonusMeter.maxWidth;
        });
        meterGhost.state.setAnimation(0, "ghost_IDLE", true);
    }

    return {
        init,
        populate,
        get win() {
            return winAmount;
        },
        reset
    };
});