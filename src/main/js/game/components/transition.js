define(require => {
    const PIXI = require("com/pixijs/pixi");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const resLib = require("skbJet/component/resourceLoader/resourceLib");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    //const utils = require("game/components/utils/utils");
    const orientation = require("skbJet/componentManchester/standardIW/orientation");
    const config = require("skbJet/componentManchester/standardIW/gameConfig");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const winUpTo = require("game/components/winUpTo");
    const utils = require("game/components/utils/utils");
    const meterData = require("skbJet/componentManchester/standardIW/meterData");
    const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
    const gameState = require("game/components/state");

    require("com/gsap/TweenMax");
    const Tween = window.TweenMax;

    require("com/gsap/TimelineLite");
    const Timeline = window.TimelineLite;

    const transitionNames = {
        "coffinBonus": "Transition_Coffin",
        "organBonus": "Transition_Organ",
    };

    const orientationNames = {
        "portrait": "port/",
        "landscape": "land/"
    };

    let transitionSpine;

    let currentGame = "baseGame";
    let nextGame = "baseGame";

    function init() {
        displayList.organTitle.alpha = 0;
        displayList.coffinTitle.alpha = 0;
        displayList.coffinBonus.alpha = 0;
        displayList.coffinBonus.visible = false;
        displayList.organBonus.alpha = 0;
        displayList.organBonus.visible = false;

        //bind spine textures
        utils.bindSpine("Transition");

        msgBus.subscribe("transition.positionButtons", positionButtons);
        msgBus.subscribe("GameSize.OrientationChange", orientationChanged);
        msgBus.subscribe("UI.endNetworkActivity", () => {
            setTimeout(positionButtons, 0); //trigger on BUY screen, don't call the function till AFTER buy handler returns and stupidly shows the ticket select bar.
        });

        positionButtons(gameState.activeGame);
    }

    async function makeTransitionSpine() {
        transitionSpine = new PIXI.spine.Spine(resLib.spine["Transition"].spineData);
        transitionSpine.state.timeScale = 0.8;
        transitionSpine.state.addListener({
            complete: (entry) => {
                if(!entry.loop && nextGame !== "baseGame") {
                    currentGame = nextGame;
                    transitionSpine.state.setAnimation(0, orientationNames[orientation.get()] + transitionNames[currentGame] + "_loop", true);
                }
            }
        });
        displayList.transitions.addChildAt(transitionSpine, 0);
        transitionSpine.alpha = 0;
        await new Promise(resolve => setTimeout(resolve, 10));
        transitionSpine.alpha = 1;
    }

    async function to(nextView, delay) {
        displayList.autoPlayStartButton.enabled = false;
        nextGame = nextView;

        msgBus.publish("UI.updateButtons", {
            autoPlay: false,
            ticketSelect: false,
            help: false
        });
        msgBus.publish("IXFConsole.disableAll");
    
        await new Promise(resolve => {
            Tween.delayedCall(delay, resolve);
        });

        await new Promise(async resolve => {
            switch (nextGame) {
                case "baseGame":
                    audio.play("bonus_transitionToBase", false);
                    displayList.coffinWheel.cacheAsBitmap = true;
                    //displayList.organBonus.cacheAsBitmap = true;

                    winUpTo.hide();

                    new Timeline({
                        onComplete: () => {
                            config.backgroundMusicEnabled && audio.play("BG_music", true);
                            displayList.transitions.removeChild(transitionSpine);
                            transitionSpine = undefined;
                            currentGame = nextGame;
                            displayList.coffinWheel.cacheAsBitmap = false;
                            positionButtons(nextGame);
                            resolve();
                        }
                    })
                        .to(displayList.coffinBonus, 1.5, {pixi: {alpha : 0}}, 0)
                        .to(displayList.organBonus, 1.5, {pixi: {alpha : 0}}, 0)
                        .call(() => {
                            displayList.infoArea.visible = true;
                            displayList.coffinBonus.visible = false;
                            displayList.organBonus.visible = false;
                            displayList.autoPlayStartButton.visible = false;
                            displayList.autoPlayStartButton.alpha = 0;
                            displayList.autoPlayStopButton.alpha = 0;
                        }, null, 1.5)
                        .to(transitionSpine, 0.75, {alpha: 0}, 1.5)
                        .to(displayList.logo, 0.75, {alpha: 1}, 1.5);
                    break;
                case "coffinBonus":
                    await new Promise(resolve => {
                        audio.fadeOut("BG_music", 0.2);
                        setTimeout(resolve, 200);
                    });
                    await makeTransitionSpine();
                    displayList.organBonus.visible = false;
                    displayList.coffinBonus.visible = true;
                    displayList.coffinBonus.alpha = 0;
                    audio.play("bonus_transition", false);
                    transitionSpine.visible = true;
                    transitionSpine.alpha = 1;
                    transitionSpine.state.setAnimation(0, orientationNames[orientation.get()] + transitionNames[nextGame], false);
                    msgBus.publish("Bonus.Transition", {nextGame: nextGame});

                    new Timeline({
                        onComplete: () => {
                            config.backgroundMusicEnabled && audio.play("bonus_music", true);
                            resolve();
                        }
                    })
                        .to(displayList.coffinTitle, 1.5, {alpha: 1}, 1.5)
                        .call(() => {
                            displayList.infoArea.visible = false;
                        }, null, 1.5)
                        .to(displayList.logo, 0.5, {alpha: 0}, 1.5)
                        .to(displayList.coffinBonus, 0.5, {alpha: 1}, 3)
                        .to(displayList.coffinTitle, 0.5, {alpha: 0}, 3)
                        .call(() => { audio.playRandom("bonus_scream", false); })
                        .call(() => { 
                            positionButtons(nextGame);
                        }, null, 3)
                        .to(displayList.autoPlayButton, 0.5, {alpha: 1}, 3);
                    break;
                case "organBonus":
                    await new Promise(resolve => {
                        audio.fadeOut("BG_music", 0.2);
                        setTimeout(resolve, 200);
                    });
                    await makeTransitionSpine();
                    audio.play("bonus_transition", false);
                    displayList.coffinBonus.visible = false;
                    displayList.organBonus.visible = true;
                    displayList.organBonus.alpha = 0;
                    transitionSpine.visible = true;
                    transitionSpine.alpha = 1;
                    transitionSpine.state.setAnimation(0, orientationNames[orientation.get()] + transitionNames[nextGame], false); 
                    msgBus.publish("Bonus.Transition", {nextGame: nextGame});

                    new Timeline({
                        onComplete: () => {
                            config.backgroundMusicEnabled && audio.play("bonus_music", true);
                            resolve();
                        }
                    })
                        .to(displayList.organTitle, 1.5, {alpha: 1}, 1.5)
                        .call(() => {
                            //displayList.baseGameBG.visible = false;
                            displayList.infoArea.visible = false;
                        }, null, 1.5)
                        .to(displayList.logo, 0.5, {alpha: 0}, 1.5)
                        .to(displayList.organBonus, 0.5, {alpha: 1}, 3)
                        .call(() => { audio.playRandom("bonus_scream", false); })
                        .call(() => { 
                            positionButtons(nextGame);
                        }, null, 3)
                        .to(displayList.autoPlayButton, 0.5, {alpha: 1}, 3);
                    break;
            }    
        });
    }

    function orientationChanged() {
        if(transitionSpine) {
            //switch to the intro or loop animation as required
            if(currentGame === nextGame) {
                //already in a loop
                transitionSpine.state.setAnimation(0, orientationNames[orientation.get()] + transitionNames[currentGame] + "_loop", true);
            } else {
                //mid-transition. switch animations and set time
                let currentBonus = currentGame === "baseGame" ? nextGame : currentGame;
                let time = transitionSpine.state.tracks[0].time;
                transitionSpine.state.setAnimation(0, orientationNames[orientation.get()] + transitionNames[currentBonus], false);
                transitionSpine.state.tracks[0].time = time;
            }

            positionButtons(nextGame);
        }
    }

    function positionButtons(nextGame) {
        nextGame = nextGame || gameState.activeGame;

        // auto play
        if(["init", "baseGame", "end"].indexOf(nextGame) > -1 && meterData.ticketCosts.length > 1 && config.ticketCostMeterVisibleWhilePlaying && SKBeInstant.config.jLotteryPhase == 2) {
            displayList.autoPlayButton.x = displayList.autoPlayButton_multi.x;
        } else {
            displayList.autoPlayButton.x = displayList.autoPlayButton_default.x;
        }

        // Buy/Try, move to money
        if("init" === nextGame && meterData.ticketCosts.length > 1 && SKBeInstant.config.jLotteryPhase == 2) {
            displayList.buyButton.x = displayList.buy_multi.x;
            displayList.tryButton.x = displayList.try_multi.x;
            displayList.moveToMoneyButton.x = displayList.playForMoney_multi.x;
        } else if("end" === nextGame && meterData.ticketCosts.length > 1 && config.ticketCostMeterVisibleWhilePlaying) {
            displayList.buyButton.x = displayList.buy_multi.x;
            displayList.tryButton.x = displayList.try_multi.x;
            displayList.moveToMoneyButton.x = displayList.playForMoney_multi.x;
        } else {
            displayList.buyButton.x = displayList.buy_default.x;
            displayList.tryButton.x = displayList.try_default.x;
            displayList.moveToMoneyButton.x = displayList.playForMoney_default.x;
        }

        //ticket select
        if(meterData.ticketCosts.length <= 1) {
            displayList.ticketSelectBarSmall.visible = false;
            displayList.ticketSelectBarSmall.alpha = 0;
            displayList.tryButton.x = displayList.try_fixed.x;
            displayList.moveToMoneyButton.x = displayList.playForMoney_default.x;
        }
        msgBus.publish("buyAnim.position");
    }

    /**
     * We can use the "from" (and leave "to" as null) parameter alone to just fadeOut.
     * We can use the "to" (and leave "from" as null) parameter alone to just fadeIn.
     * staggerDelay is the delay between from and to, default is 0.5. 
     */
    function fade(from, to, staggerDelay, duration) {
        let fromComplete = false,
            toComplete = false;
        return new Promise(resolve => {
            staggerDelay = staggerDelay ? staggerDelay : 0.5;
            duration = duration ? duration : config.defaultFade;
            if (from) {
                from.visible = true;
                from.alpha = 1;

                Tween.to(from, duration, {
                    alpha: 0,
                    onComplete: () => {
                        from.visible = false;
                        fromComplete = true;
                        if(toComplete) {
                            resolve();
                        }
                    },
                    delay: staggerDelay,
                });
            } else {
                fromComplete = true;
                if(toComplete) {
                    resolve();
                }
            }

            if (to) {
                to.visible = true;
                to.alpha = 0;
                Tween.to(to, duration, {
                    alpha: 1,
                    onComplete: () => {
                        toComplete = true;
                        if(fromComplete) {
                            resolve();
                        }
                    }
                });
            } else {
                toComplete = true;
                if(fromComplete) {
                    resolve();
                }
            }
        });
    }

    /**
     * Simplified "to" but no tween
     */
    function swap(from, to) {
        if (from) {
            from.visible = false;
            from.alpha = 1;
        }
        if (to) {
            to.visible = true;
            to.alpha = 1;
        }
    }

    return {
        init,
        to,
        fade,
        swap
    };
});