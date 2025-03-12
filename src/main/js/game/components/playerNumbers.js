define(require => {
    const PIXI = require("com/pixijs/pixi");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const resLib = require("skbJet/component/resourceLoader/resourceLib");
    const gameConfig = require("skbJet/componentManchester/standardIW/gameConfig");
    const autoPlay = require("skbJet/componentManchester/standardIW/autoPlay");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    const orientation = require("skbJet/componentManchester/standardIW/orientation");
    const PlayerNumber = require("game/components/PlayerNumber");
    const bonusMeter = require("game/components/bonusMeter");
    const state = require("game/components/state");

    require("com/gsap/TweenMax");
    const Tween = window.TweenMax;

    let background = {};

    let graves;
    let scenario;
    let numGravesRemain = 8;
    let idleTween;

    const L = "L", R = "R";
    const graveDirections = {
        "landscape": [R, R, L, L, L, R, R, L, L, L, L, R, L, R, R, L],
        "portrait": [R, R, L, R, L, L, R, L, L, L, R, R, L, L, R, L],
    };

    function idleManager(data) {
        switch (data.state) {
            case "IdleAll":
                //set the idle animations going on all unrevealed
                if(idleTween) {
                    idleTween.kill();
                }
                idleTween = Tween.delayedCall(gameConfig.delayBeforeStartIdleInSeconds, promptIdle);
                break;
            case "StopIdle":
                //stop the idle animations on all
                stopIdle();
                break;
        }
    }


    function init() {
        background.Anim = new PIXI.spine.Spine(resLib.spine["background"].spineData);
        background.LandAnim = "land/BaseGame_BG_IDLE";
        background.PortAnim = "port/BaseGame_BG_IDLE";
        displayList.baseGameBG.addChild(background.Anim);

        const L_BG = displayList.baseGameBG.children[0]; // Landscape_Background
        const L_BG_SC = displayList.baseGameBG.children[0].slotContainers; // Landscape_Background_SlotContainers

        // Assign all of the graves to a "graves" array
        graves = [
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_1")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_2")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_3")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_4")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_5")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_6")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_7")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_8")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_9")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_10")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_11")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_12")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_13")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_14")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_15")]),
            PlayerNumber.fromContainer(L_BG_SC[L_BG.skeleton.findSlotIndex("grave_16")]),
        ];
        window.graves = graves;

        graves.forEach((c, i) => {
            c.grvDirPort = graveDirections["portrait"][i];
            c.grvDirLand = graveDirections["landscape"][i];
            c.initSpine();
            c.reset();
        });

        bonusMeter.init();

        orientationChanged();
        msgBus.subscribe("GameSize.OrientationChange", orientationChanged);
    }

    function orientationChanged() {
        if (orientation.get() === orientation.LANDSCAPE) {
            background.Anim.visible = true;
            background.Anim.state.setAnimation(0, background.LandAnim, true);
        } else {
            background.Anim.visible = true;
            background.Anim.state.setAnimation(0, background.PortAnim, true);
        }
    }

    function promptIdle() {
        const currentHovers = graves.filter(c => c.hovering);
        if (currentHovers.length === 0) {
            const unrevealed = graves.filter(c => !c.revealed || (!c.revealed && !c.revealing));
            for (let i = 0; i < unrevealed.length; i++) {
                unrevealed[i].setSpineState({ state: "IDLE_START", then: "IDLE", loop: true });
                unrevealed[i].currentState = "idle";
            }
        }
    }

    function stopIdle() {
        if(idleTween) {
            idleTween.kill();
        }
        for (let i = 0; i < graves.length; i++) {
            if(graves[i].spineState === "IDLE") {
                graves[i].setSpineState({ state: "IDLE_STOP", loop: false });
            } else if (graves[i].spineState !== "GREY_intro") { //don't cancel greying out of graves
                graves[i].setSpineState({ state: "STATIC", loop: false });
            }
            graves[i].currentState === "active";
        }
    }

    function populate(data) {
        scenario = data;

        loadState(state.player);
    }

    function loadState(state) {
        state.forEach(index => {
            graves[index].reveal();
        });
    }

    function enable() {
        // Start idle animations
        msgBus.publish("Game.IdleAll");
        msgBus.publish("Game.switchToPicks");

        // Return an array of promises for each grave's lifecycle
        return graves.map(async grave => {
            // Enable the grave and wait for it to be revealed (manually or automatically)
            await grave.enable();

            numGravesRemain--;
            let finalReveal = graves.indexOf(grave);
            if (numGravesRemain < 1) {
                graves.forEach(c => {
                    if (!c.revealed && graves.indexOf(c) !== finalReveal) {
                        c.reveal();
                        c.revealed = true;
                        c.inactive = true;
                        //c.setSpineState({ state: "INACTIVE", loop: false });
                        // Tween.delayedCall(0.5, () => {
                        //     Tween.to(c, 0.5, { alpha: 0.4 });
                        // });
                    }
                });
            }

            // Get the next Winning Number
            const nextData = scenario.revealOrder.shift();
            const prizeVal = scenario.symbolPrizes[scenario.symbols.indexOf(nextData)];

            if (nextData) {
                // Populate the chest with the next Player Number, ready to be uncovered
                grave.populate({ "val": prizeVal, "data": nextData });
                // Play generic grave pick audio
                audio.playSequential("BG_gravePick", false, 0.6);

                // Wait for the uncover animation (if animated)
                await grave.uncover();
                grave.symbolLetter = nextData; // We populate this after the uncover animation finishes so that when we check for match, it only triggers the win once
            }


            // Reset Idle
            if (!autoPlay.enabled) {
                idleManager({ state: "IdleAll" });
            }
            // If the revealed number matches a revealed Winning Number then mark the match

            msgBus.publish("Game.PlayerNumber", graves.indexOf(grave));
            await checkBonusTrigger(nextData, grave);
        });
    }

    function greyOutGraves() {
        const unrevealed = graves.filter(grave => grave.chestPrize === "");
        unrevealed.forEach(grave => grave.setSpineState({ state: "INACTIVE_intro", loop: false }));
    }

    function revealAll() {
        msgBus.publish("Game.StopIdle");
        // Get all the cards yet to be revealed
        const unrevealed = graves.filter(grave => !grave.revealed);
        shuffleArray(unrevealed);
        // Return an array of tweens that calls reveal on each card in turn
        return unrevealed.map(grave => Tween.delayedCall(0, grave.reveal, null, this, grave));
    }

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    function reset() {
        graves.forEach(grave => grave.reset());
        numGravesRemain = 8;
    }

    async function checkBonusTrigger(playerNumber) {
        await new Promise(resolve => {
            const matchedGraves = graves.filter(chest => chest.symbolLetter === playerNumber);
            if (playerNumber === "1" && matchedGraves.length === 3) {
                //Coffin Capers Bonus
                msgBus.publish("Game.coffinBonus", true);
                resolve();
            } else if (playerNumber === "2" && matchedGraves.length === 3) {
                //Organ Donor Bonus
                msgBus.publish("Game.organBonus", true);
                resolve();
            } else {
                // Loss or Prize, either way not a bonus
                resolve();
            }
        });
    }

    msgBus.subscribe("Game.IdleAll", () => {
        idleManager({ state: "IdleAll" });
    });
    msgBus.subscribe("Game.StopIdle", () => idleManager({ state: "StopIdle" }));

    return {
        init,
        enable,
        populate,
        revealAll,
        greyOutGraves,
        reset,
        get picksRemaining() { return numGravesRemain > 0 ? numGravesRemain : 0; },
        get _graves() { return graves; },
    };
});
