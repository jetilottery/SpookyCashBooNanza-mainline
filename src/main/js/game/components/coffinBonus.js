define(require => {
    "use strict";
    const PIXI = require("com/pixijs/pixi");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const resLib = require("skbJet/component/resourceLoader/resourceLib");
    const orientation = require("skbJet/componentManchester/standardIW/orientation");
    const coffinMeter = require("game/components/coffinMeter");
    const CoffinSelector = require("game/components/CoffinSelector");
    const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
    const bonusTutorial = require("game/components/bonusTutorial");
    const autoPlay = require("skbJet/componentManchester/standardIW/autoPlay");
	const meterData = require("skbJet/componentManchester/standardIW/meterData");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    const config = require("skbJet/componentManchester/standardIW/gameConfig");
    const gameState = require("game/components/state");

    require("com/gsap/TweenMax");
    const Tween = window.TweenMax;

    require("com/gsap/TimelineLite");
    const Timeline = window.TimelineLite;
    
    let coffinWheel, coffinSelectors, coffinGhost, numPool, turnProms, wheelProm, anticipationProm, fadeDelay;
    let coffinProm, coffinScenario, coffinNumber, targetReached, finalTarget, started, finished, pressInProgress, startingWin;
    /**
     * Coffin wheel animations named as:
     * coffin1to2_anim
     * coffin2to3_anim
     * coffin3to4_anim
     * coffin4to5_anim
     */

    const coffinSlotPrefix = ["coffin1", "coffin2", "coffin", "coffin4", "coffin5"];
    const coffinAnimPrefix = ["coffin_1/", "coffin_2/", "coffin_3/", "coffin_4/", "coffin_5/"];
    const coffinIndices = [[0, 1],[2, 3],[4, 5],[6, 7],[8, 9]];
    const ghostAnims = ["ghostReveal_1", "ghostReveal_2", "ghostReveal_3"];

    function init() {
        started = false;
        finished = false;
        pressInProgress = false;
        startingWin = 0;
        coffinWheel = {
            "landscape" : {
                prefix: "land/",
                spine: new PIXI.spine.Spine(resLib.spine["coffinBonus_wheel"].spineData),
                glowSpine: new PIXI.spine.Spine(resLib.spine["coffinBonus_wheelGlow"].spineData),
                coffinAnim: [],
                coffinSlot: []
            },
            "portrait" : {
                prefix: "port/",
                spine: new PIXI.spine.Spine(resLib.spine["coffinBonus_wheel"].spineData),
                glowSpine: new PIXI.spine.Spine(resLib.spine["coffinBonus_wheelGlow"].spineData),
                coffinAnim: [],
                coffinSlot: []
            }
        };
        for(let wheel in coffinWheel) {
            coffinWheel[wheel].spine.state.addListener({
                complete: () => {
                    if(typeof wheelProm === "function") {
                        wheelProm();
                    }
                },
                event: (entry, event) => {
                    if(event.data.name === "wheelStop") {
                        audio.play("wheel_end", false);
                    }
                }
            });    
        }

        coffinGhost = {
            landscape : {
                prefix: "land/",
                spines: [
                    new PIXI.spine.Spine(resLib.spine["ghostAnims"].spineData),
                    new PIXI.spine.Spine(resLib.spine["ghostAnims"].spineData),
                    new PIXI.spine.Spine(resLib.spine["ghostAnims"].spineData)
                ]
            },
            portrait : {
                prefix: "port/",
                spines: [
                    new PIXI.spine.Spine(resLib.spine["ghostAnims"].spineData),
                    new PIXI.spine.Spine(resLib.spine["ghostAnims"].spineData),
                    new PIXI.spine.Spine(resLib.spine["ghostAnims"].spineData)
                ]
            }
        };
        coffinMeter.init();

        coffinSelectors = [new CoffinSelector(0), new CoffinSelector(1)];
        coffinSelectors.forEach(selector => selector.enabled = false);

        window.coffinSelectors = coffinSelectors;

        displayList.coffinBonus.addChild(coffinSelectors[0], coffinSelectors[1]);
        displayList.coffinWheel.addChild(coffinWheel.landscape.spine, coffinWheel.portrait.spine);
        coffinGhost.landscape.spines.concat(coffinGhost.portrait.spines).forEach(g => {
            displayList.coffinGhost.addChild(g);
            g.alpha = 0;
        });
        window.coffinGhost = coffinGhost;

        addCoffinAnims(coffinWheel.landscape);
        addCoffinAnims(coffinWheel.portrait);

        playWheelAnim("coffin5", false, true);

        window.coffinWheel = coffinWheel;

        displayList.coffinMessageB.alpha = 0;

        orientationChanged();
        msgBus.subscribe("GameSize.OrientationChange", orientationChanged);
        msgBus.subscribe("CoffinSelector.Press", onPress);
        msgBus.subscribe("CoffinSelector.Over", onOver);
        msgBus.subscribe("CoffinSelector.Out", onOut);

        msgBus.subscribe("CoffinMeter.TargetReached", onTargetReached);
        msgBus.subscribe("Bonus.RevealAllStarted", onRevealAll);
        msgBus.subscribe("UI.updateButtons", onUpdateButtons);
    }

    function addCoffinAnims(wheel) {
        /** 
         * So this is the bit where we add coffins to the spine slots
         * I"ve added one here, had issues trying to replace the slot so instead I added the coffin spine as a child the the slot container
         * but took all of the position data from the sprite. It leaves behind the white image, so will need to either take that out of the art/clear it in code
        */
       let coffinIndex = [];
       let coffinSlot = [];
       for(let i = 0; i < coffinSlotPrefix.length; i++) {
           coffinIndex.push(wheel.spine.skeleton.findSlotIndex(coffinSlotPrefix[i] + "_slot1"));
           coffinSlot.push(coffinSlotPrefix[i] + "_slot1");
           coffinIndex.push(wheel.spine.skeleton.findSlotIndex(coffinSlotPrefix[i] + "_slot2"));
           coffinSlot.push(coffinSlotPrefix[i] + "_slot2");
           wheel.spine.hackTextureBySlotName(coffinSlotPrefix[i] + "_slot1", PIXI.Texture.EMPTY);
           wheel.spine.hackTextureBySlotName(coffinSlotPrefix[i] + "_slot2", PIXI.Texture.EMPTY);
       }
       wheel.spine.hackTextureBySlotName("wheelGlow", PIXI.Texture.EMPTY);
       let glowIndex = wheel.spine.skeleton.findSlotIndex("wheelGlow");

       let coffinAnim = [];
       for(let i = 0; i < coffinAnimPrefix.length; i++) {
           coffinAnim.push(new PIXI.spine.Spine(resLib.spine["coffinBonusCoffins"].spineData)); //slot 1
           coffinAnim.push(new PIXI.spine.Spine(resLib.spine["coffinBonusCoffins"].spineData)); //slot 2
       }

       let posData;
       for(let i = 0; i < coffinAnim.length; i++) {
           wheel.spine.slotContainers[coffinIndex[i]].addChild(coffinAnim[i]);
           coffinAnim[i].state.setAnimation(0, coffinAnimPrefix[Math.floor(i / 2)] + "coffin_STATIC", true);
           //Add lid burst SFX on open event
           coffinAnim[i].state.addListener({
                event: (entry, event) => {
                    if(event.data.name === "lidBurst") {
                        audio.play("coffin_lid", false);
                    }
                }
            });

            posData = wheel.spine.slotContainers[coffinIndex[i]].children[0];
            coffinAnim[i].x = posData.x; // assigning the slot position to the spine anim
            coffinAnim[i].y = posData.y;
            coffinAnim[i].rotation = posData.rotation;
            coffinAnim[i].scale.y = posData.scale.y > 0 ? 1 : -1;
        }
        wheel.glowSpine.state.setAnimation(0, "wheelGlow_loop", true);
        wheel.spine.slotContainers[glowIndex].addChild(wheel.glowSpine);
        posData = wheel.spine.slotContainers[glowIndex].children[0];
        //need to hardcode these values, the spine positioning is off somehow
        wheel.glowSpine.position.set(0, -25);
        wheel.glowSpine.scale.set(0.76, -0.76);
        wheel.glowSpine.alpha = 0;

        wheel.coffinAnim = coffinAnim;
        wheel.coffinSlot = coffinSlot;
    }

    function setMessage(messageText) {
        if(messageText === displayList.coffinMessageA.text) {
            return;
        }
        displayList.coffinMessageB.text = messageText;
        new Timeline({
            onComplete: () => {
                displayList.coffinMessageA.text = messageText;
                displayList.coffinMessageB.alpha = 0;
                displayList.coffinMessageA.alpha = 1;
                displayList.coffinMessageA.scale.set(1);
            }
        })
            .fromTo(displayList.coffinMessageA, 0.5, {pixi: {scaleX: 1, scaleY: 1, alpha: 1}}, {pixi: {scaleX: 1.5, scaleY: 1.5, alpha: 0}}, 0)
            .fromTo(displayList.coffinMessageB, 0.5, {pixi: {scaleX: 1.5, scaleY: 1.5, alpha: 0}}, {pixi: {scaleX: 1, scaleY: 1, alpha: 1}}, 0);
    }

    function waitForBonus(cb) {
        let _waitForBonus = function() {
            cb();
            // Be VERY careful calling unsubscribe in a subscriber - if there are other subscribers after it in the queue, the last one will not be called. (array splice)
            msgBus.unsubscribe("Bonus.TutorialClosed", _waitForBonus);    
        };
        msgBus.subscribe("Bonus.TutorialClosed", _waitForBonus);
    }

    async function startBonus() {
        //have to force the listener to the end of the  subscriber queue
        msgBus.unsubscribe("UI.updateButtons", onUpdateButtons);
        msgBus.subscribe("UI.updateButtons", onUpdateButtons);

        started = true;
        finished = false;
        startingWin = meterData.win;
        bonusTutorial.show();
        await new Promise(resolve => {
            waitForBonus(resolve);
        });
        await playWheelAnim("bonusStart_anim", false);
        coffinNumber = 1;
        
        //coffin 1
        targetReached = false;
        finalTarget = false;
        setMessage(resLib.i18n.game.Game.coffinMessageStart);
        playCoffinAnim(0, "coffin_IDLE", true);
        playCoffinAnim(1, "coffin_IDLE", true);

        if(autoPlay.enabled) {
            onRevealAll();
        } else {
            coffinSelectors.forEach(selector => selector.enabled = true);
            displayList.coffinBonus.interactiveChildren = true;
            let autoPlayInUse = coffinNumber < coffinIndices.length && SKBeInstant.config.autoRevealEnabled && (config.toggleAutoPlay || !autoPlay.enabled);
            msgBus.publish("UI.updateButtons", {
                autoPlay: { enabled: autoPlayInUse, visible: autoPlayInUse },
                help: true
            });
            msgBus.publish("IXFConsole.enableAll");    
        }
        await new Promise(resolve => { coffinProm = resolve; });

        if(targetReached) {
            //coffin 2
            targetReached = false;
            coffinNumber++;
            await playWheelAnim("coffin1to2_anim", false);        
            setMessage(resLib.i18n.game.Game.coffinMessageStart);
            if(autoPlay.enabled) {
                onRevealAll();
            } else {
                playCoffinAnim(2, "coffin_IDLE", true);
                playCoffinAnim(3, "coffin_IDLE", true);
                coffinSelectors.forEach(selector => selector.enabled = true);
                displayList.coffinBonus.interactiveChildren = true;
                enableAutoPlay();
            }
            await new Promise(resolve => { coffinProm = resolve; });
        }

        if(targetReached) {
            //coffin 3
            targetReached = false;
            coffinNumber++;
            await playWheelAnim("coffin2to3_anim", false);
            setMessage(resLib.i18n.game.Game.coffinMessageStart);
            if(autoPlay.enabled) {
                onRevealAll();
            } else {
                playCoffinAnim(4, "coffin_IDLE", true);
                playCoffinAnim(5, "coffin_IDLE", true);
                coffinSelectors.forEach(selector => selector.enabled = true);
                displayList.coffinBonus.interactiveChildren = true;
                enableAutoPlay();
            }
            await new Promise(resolve => { coffinProm = resolve; });
        }

        if(targetReached) {
            //coffin 4
            targetReached = false;
            coffinNumber++;
            await playWheelAnim("coffin3to4_anim", false);
            setMessage(resLib.i18n.game.Game.coffinMessageStart);
            if(autoPlay.enabled) {
                onRevealAll();
            } else {
                playCoffinAnim(6, "coffin_IDLE", true);
                playCoffinAnim(7, "coffin_IDLE", true);
                coffinSelectors.forEach(selector => selector.enabled = true);    
                displayList.coffinBonus.interactiveChildren = true;
                enableAutoPlay();
            }
            await new Promise(resolve => { coffinProm = resolve; });
        }

        if(targetReached) {
            //coffin 5
            finalTarget = true;
            targetReached = false;
            coffinNumber++;
            await playWheelAnim("coffin4to5_anim", false);
            setMessage(resLib.i18n.game.Game.coffinMessageStart);
            if(autoPlay.enabled) {
                onRevealAll();
            } else {
                playCoffinAnim(8, "coffin_IDLE", true);
                playCoffinAnim(9, "coffin_IDLE", true);
                coffinSelectors.forEach(selector => selector.enabled = true);
                displayList.coffinBonus.interactiveChildren = true;
                enableAutoPlay();
            }
            await new Promise(resolve => { coffinProm = resolve; });
        }

        finished = true;

        msgBus.publish("UI.updateButtons", {
            autoPlay: false,
            help: false
        });
        displayList.helpButton.enabled = false;

        //show loser ghost if target not reached
        if(!targetReached) {
            // SDLX-146: Add a delay before ending the bonus (33% chance)
            if(Math.random() < 0.333333334 || finalTarget) {
                await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1250));
            }

            msgBus.publish("CoffinMeter.NonWin");
        }

        setMessage(resLib.i18n.game.Game.coffinMessageEnd);

        displayList.bonusWinPlaqueCoffinValue.text = SKBeInstant.formatCurrency(coffinMeter.win).formattedAmount;
        displayList.bonusWinPlaqueCoffinValue.maxWidth = 490;

        await new Promise(resolve => {
            Tween.delayedCall(2, resolve);
        });
    }

    async function onPress(data) {
        pressInProgress = true;
        const other = data.index === 1 ? 0 : 1;
        const pickedIndex = coffinIndices[coffinNumber - 1][data.index];
        const otherIndex = coffinIndices[coffinNumber - 1][other];

        setMessage(resLib.i18n.game.Game.coffinMessageCollecting);

        //disable the other coffin
        playCoffinAnim(otherIndex, "coffin_STATIC_grey", false);
        coffinSelectors[other].enabled = false;

        //disable how to play
        let autoPlayInUse = coffinNumber < coffinIndices.length && SKBeInstant.config.autoRevealEnabled && (config.toggleAutoPlay || !autoPlay.enabled);
        msgBus.publish("UI.updateButtons", {
            help: false,
            autoPlay: { enabled: !finalTarget && autoPlayInUse, visible: !finished && autoPlayInUse } //disable revealAll if on final pick
        });

        msgBus.publish("IXFConsole.disableAll");

        //pop open the selected coffin lid
        audio.play("coffin_shake", false);
        await playCoffinAnim(pickedIndex, "coffin_REVEAL_FULL", false);
        audio.play("skeleton_shake", true);
        playCoffinAnim(pickedIndex, "coffin_REVEAL_FULL_loop", true);

        turnProms = [];

        //fire ghosts out of the opened coffin and fill the meter
        let totalNum = coffinScenario.num1s[coffinNumber - 1] + coffinScenario.num2s[coffinNumber - 1];
        await meterGhostFill(["left/", "right/"][data.index], totalNum);

        //wait for all ghost anims to finish
        await Promise.all(turnProms);
        await new Promise(resolve => {
            setTimeout(resolve, fadeDelay);
        });
        fadeCoffinAnim(pickedIndex, 2);

        //resolve coffinProm
        Tween.delayedCall(1.5, () => {
            pressInProgress = false;
            coffinProm();
        });
    }

    function onOver(data) {
        playCoffinAnim(coffinIndices[coffinNumber - 1][data.index], "coffin_MOUSEOVER", true);
    }

    function onOut(data) {
        playCoffinAnim(coffinIndices[coffinNumber - 1][data.index], "coffin_IDLE", true);
    }

    function onUpdateButtons() {
        if(gameState.activeGame === "coffinBonus") {
            //re-disable help if press in progress
            displayList.autoPlayStartButton.enabled = displayList.autoPlayStartButton.enabled && !finished;
            displayList.autoPlayStopButton.enabled = displayList.autoPlayStopButton.enabled && !finalTarget;
            displayList.helpButton.enabled = !pressInProgress && !autoPlay.enabled;
        }
    }

    function onTargetReached(data) {
        targetReached = true;
        meterData.win = startingWin + data.prize;

        // SDLX-146: if target reached while delaying last ghost, stop delaying
        if(typeof anticipationProm === "function") {
            anticipationProm();
        }

        if(!data.lastPrize) {
            setMessage(resLib.i18n.game.Game.coffinMessageContinue);
            for(let wheel in coffinWheel) {
                Tween.fromTo(coffinWheel[wheel].glowSpine, 1, {alpha: 0}, {alpha: 1, repeat: 1, yoyo: true});
            }    
        }
    }

    function onRevealAll() {
        if(gameState.activeGame === "coffinBonus" && started) {
            //disable interaction
            coffinSelectors.forEach(selector => selector.enabled = false);

            //reveal a random coffin if reveal not in progress
            if(!pressInProgress) {
                onPress({index: Math.random() > 0.5 ? 1 : 0});
            }

            // SDLX-265 check button alpha
            if(config.toggleAutoPlay && SKBeInstant.config.autoRevealEnabled && !config.fastFadeButtons) {
                displayList.autoPlayStopButton.alpha = 1;
            }
        }
    }

    /**
     * Play the landscape and portrait animations at the same time, 
     * so that there are no issues on orientation switching.
     * @param {*} name 
     * @param {*} loop 
     */
    function playWheelAnim(name, loop, mute) {
        return new Promise(resolve => {
            if(!mute) {
                audio.play("wheel_start", false);
                Tween.delayedCall(0.3, () => { audio.play("wheel_turn", false); });
            }
            for(let wheel in coffinWheel) {
                coffinWheel[wheel].spine.state.setAnimation(0, coffinWheel[wheel].prefix + name, loop);
            }
            wheelProm = resolve;
        });
    }

    /**
     * Play the landscape and portrait animations at the same time, 
     * so that there are no issues on orientation switching.
     */
    function playCoffinAnim(index, name, loop) {
        return new Promise(resolve => {
            for(let wheel in coffinWheel) {
                //move coffin to front
                let parentSlot = coffinWheel[wheel].spine.skeleton.findSlot(coffinWheel[wheel].coffinSlot[index]);
                coffinWheel[wheel].spine.skeleton.drawOrder.splice(coffinWheel[wheel].spine.skeleton.drawOrder.indexOf(parentSlot), 1);
                coffinWheel[wheel].spine.skeleton.drawOrder.push(parentSlot);

                coffinWheel[wheel].coffinAnim[index].alpha = 1;
                coffinWheel[wheel].coffinAnim[index].state.setAnimation(0, coffinAnimPrefix[Math.floor(index / 2)] + name, loop);
                if(!loop) {
                    coffinWheel[wheel].coffinAnim[index].state.addListener({ complete: resolve });
                } else {
                    resolve();
                }
            }
        });
    }

    //Fill the meter by playing a number of ghost anims
    function meterGhostFill(lRPrefix, totalNum) {
        const NUM_MIN = 8;
        const NUM_MAX = 20;

        //make a list of amounts to add to the meter per ghost
        numPool = [];
        while(totalNum > 0) {
            let num = NUM_MIN + Math.round(Math.random() * (NUM_MAX - NUM_MIN));
            numPool.push(num);
            totalNum -= num;
        }
        numPool[numPool.length - 1] += totalNum;
        numPool.sort((a, b) => a - b); //sort ascending, so you get more points for each subsequent ghost

        //console.log(numPool);

        //Play ghosts with random delay until the list is finished
        let prom0, prom1, prom2;
        let proms = [
            new Promise(resolve => prom0 = resolve),
            new Promise(resolve => prom1 = resolve),
            new Promise(resolve => prom2 = resolve)
        ];

        playNextGhost(lRPrefix, 0, true, prom0);
        playNextGhost(lRPrefix, 1, false, prom1);
        playNextGhost(lRPrefix, 2, false, prom2);

        return Promise.all(proms);
    }

    //Play a ghost anim if there is a value left in numPool
    async function playNextGhost(lRPrefix, index, noDelay, poolProm) {
        if(numPool.length > 0) {
            let num = numPool.shift();

            // SDLX-146: Add a delay before the final ghost (33% chance)
            if(numPool.length === 0 && meterData.win < meterData.totalWin && (Math.random() < 0.33333334 || finalTarget)) {
                let prom = new Promise(resolve => anticipationProm = resolve);
                setTimeout(() => {
                    if(typeof anticipationProm === "function") {
                        anticipationProm();
                    }
                }, 1000 + Math.random() * 1250);
                await prom;
            }

            await playGhostAnim(lRPrefix, index, num, noDelay ? 0 : Math.random());
        }

        if(numPool.length === 0) {
            poolProm();
        } else {
            playNextGhost(lRPrefix, index, false, poolProm);
        }
    }

    //fade out the skeleton in the coffin
    function fadeCoffinAnim(index, duration) {
        for(let wheel in coffinWheel) {
            Tween.to(coffinWheel[wheel].coffinAnim[index], duration, {alpha: 0});
        }
        audio.fadeOut("skeleton_shake", duration);
    }

    //Play a single ghost anim and update the meter
    function playGhostAnim(lRPrefix, index, amount, delay) {
        //console.log("PLAY: " + index + " AMT: " + amount);
        //Play the landscape and portrait animations at the same time, so that there are no issues on orientation switching.
        let proms = [];
        let anim = ghostAnims.shift();
        let updAmt = amount;

        // SDLX-146: skip last ghost if target reached
        if(targetReached) {
            msgBus.publish("CoffinMeter.Update", updAmt);
            return Promise.all(proms);
        }

        ghostAnims.push(anim);
        proms.push(new Promise(resolve => {
            Tween.delayedCall(delay, () => {
                audio.playSequential("ghost_swoosh", false);
                coffinGhost.portrait.spines[index].alpha = 1;
                coffinGhost.portrait.spines[index].state.setAnimation(0, coffinGhost.portrait.prefix + lRPrefix + anim, false);
                
                coffinGhost.landscape.spines[index].alpha = 1;
                coffinGhost.landscape.spines[index].state.setAnimation(0, coffinGhost.landscape.prefix + lRPrefix + anim, false);
                coffinGhost.landscape.spines[index].state.addListener({
                    complete: resolve,
                    event: (entry, event) => {
                        if(event.data.name === "meterHit") {
                            msgBus.publish("CoffinMeter.Update", updAmt);
                            updAmt = 0;
                        }
                    }
                });
            }); 
        }));
        turnProms.push(...proms);
        return Promise.all(proms);
    }

    function orientationChanged() {
        const O = orientation.get();
        coffinWheel.landscape.spine.scale.set(0);
        coffinWheel.portrait.spine.scale.set(0);
        coffinWheel[O].spine.scale.set(1);

        coffinGhost.landscape.spines.forEach(spine => spine.scale.set(0));
        coffinGhost.portrait.spines.forEach(spine => spine.scale.set(0));
        coffinGhost[O].spines.forEach(spine => spine.scale.set(1));
    }

    function populate(scenario) {
        coffinScenario = {
            num1s: scenario.coffinBonusNum1s,
            num2s: scenario.coffinBonusNum2s
        };

        ///SLDLX-274 - If you don't win the full prize, add some daylight between the meter and the final target
        let total = coffinScenario.num1s.concat(coffinScenario.num2s).reduce((acc, curr) => acc + curr, 0);
        let targets = scenario.coffinBonusTargets;
        let lastIndex = targets.findIndex(elem => elem > total);
        fadeDelay = 0;
        if(lastIndex > -1) {
            targets[lastIndex] += 25;
            fadeDelay = 1000 + Math.random() * 1250; // SLDLX-199 - delay fade on losing ticket
        }

        coffinMeter.populate({
            prizes: scenario.coffinBonusPrizes,
            targets: targets
        });
    }

    function reset() {
        if(!started) { return; }

        coffinNumber = 1;
        coffinScenario = undefined;

        playWheelAnim("coffin5", false, true);
        for(let i = 0; i < coffinWheel.landscape.coffinAnim.length; i++) {
            coffinWheel.landscape.coffinAnim[i].state.setAnimation(0, coffinAnimPrefix[Math.floor(i / 2)] + "coffin_STATIC", true);
            coffinWheel.portrait.coffinAnim[i].state.setAnimation(0, coffinAnimPrefix[Math.floor(i / 2)] + "coffin_STATIC", true);
            coffinWheel.landscape.coffinAnim[i].alpha = 1;
            coffinWheel.portrait.coffinAnim[i].alpha = 1;
        }
        coffinMeter.reset();

        numPool = [];
        turnProms = [];
        coffinProm = undefined;
        started = false;
        pressInProgress = false;

        displayList.coffinMessageA.text = "";
        displayList.bonusWinPlaqueCoffinValue.text = "$XXXX.XX";
    }

    function enableAutoPlay() {
        const autoPlayInUse = SKBeInstant.config.autoRevealEnabled && (config.toggleAutoPlay || !autoPlay.enabled);
        msgBus.publish("UI.updateButtons", {
            autoPlay: { enabled: autoPlayInUse, visible: autoPlayInUse },
            help: true
        });
        msgBus.publish("IXFConsole.enableAll");
    }

    return {
        init,
        startBonus,
        populate,
        reset
    };
});