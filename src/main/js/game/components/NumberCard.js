define(require => {
    const PIXI = require("com/pixijs/pixi");
    const Pressable = require("skbJet/componentManchester/standardIW/components/pressable");
    const autoPlay = require("skbJet/componentManchester/standardIW/autoPlay");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const resLib = require("skbJet/component/resourceLoader/resourceLib");
    const utils = require("game/components/utils/utils");
    const bonusMeter = require("game/components/bonusMeter");
    const sparkCreator = require("game/components/sparkCreator");
    const textToSpine = require("game/components/utils/textToSpine");

    require("com/gsap/TweenMax");
    const Tween = window.TweenMax;

    let graveTypes = { "X": "LOSE", 1: "COFFIN", 2: "ORGAN" };

    // let idleQueue = [];

    class NumberCard extends Pressable {
        constructor() {
            super();

            NumberCard.revealing = NumberCard.revealing || 0;
            NumberCard.cards = NumberCard.cards || [];

            NumberCard.cards.push(this);

            this.graveStatic = true;

            this.WIDTH = 154;
            this.HEIGHT = 154;

            this.graveSpine = undefined;

            this.symbol = new PIXI.Container();
            this.symbol.name = "symbol";

            // Add all the result elements to a container
            this.resultContainer = new PIXI.Container();
            this.resultContainer.visible = false;
            this.resultContainer.name = "resultContainer";
            this.resultContainer.width = 200;
            this.resultContainer.height = 90;

            this.symbolContainer = new PIXI.Container();
            this.symbolContainer.addChild(this.symbol);

            this.addChild(this.symbolContainer);

            // State
            this.hovering = false;
            this.revealed = false;
            this.revealing = false;

            // Interactivity
            this.hitArea = new PIXI.Rectangle(
                this.WIDTH / -2,
                this.HEIGHT / -2,
                this.WIDTH,
                this.HEIGHT
            );
            this.on("press", () => {
                if (!autoPlay.enabled) {
                    this.reveal();
                }
            });
            //add the pointerover event
            this.off("pointerover");
            this.on("pointerover", () => {
                this.rollover();
            });
            this.off("pointerout");
            this.on("pointerout", () => {
                this.stopRollover();
            });
        }

        initSpine() {
            const _this = this;
            // Set up spine project
            _this.graveSpine = new PIXI.spine.Spine(resLib.spine["pickPoints"].spineData);
            _this.revealSpine = new PIXI.spine.Spine(resLib.spine["reveals"].spineData);

            _this.graveSpine.state.addListener({
                complete: (entry) => {
                    if(entry.animation.name.indexOf("IDLE_START") > -1) {
                        _this.setSpineState({state: "IDLE", loop: true});
                    }
                }
            });

            _this.graveSpine.scale.set(1, -1);
            _this.revealSpine.scale.set(1, -1);
            
            textToSpine.clearMesh(_this.revealSpine, "value");//spineAnim, slotName, source, flip, clear other meshes

            _this.defaultState = `STATIC`;
            _this.currentState = "idle";

            _this.addChild(_this.graveSpine, _this.revealSpine);

            _this.setSpineState({ state: "STATIC", loop: false });
        }

        enable() {
            bonusMeter.idle();
            return new Promise(resolve => {
                this.reveal = resolve;
                this.enabled = true;
            }).then(() => {
                this.enabled = false;
            });
        }

        populate(chest) {
            this.chestPrize = graveTypes[chest.data];
        }

        prompt() {
            this.currentState = "idle";
        }

        disable() {
            this.enabled = false;
            this.reveal = undefined;
        }

        rollover() {
            msgBus.publish("Game.StopIdle");
            this.hovering = true;
            this.setSpineState({ state: "ROLLOVER", loop: true });
        }

        stopRollover() {
            this.setSpineState({ state: "ROLLOUT", loop: false });
            this.hovering = false;
            msgBus.publish("Game.IdleAll");
        }

        stopIdle() {
            this.setSpineState({ state: "IDLE_STOP", loop: false });
        }

        setSpineState(data) {
            let nextState;
            let doLoop = data.loop || false;
            switch (data.state) {
                case "STATIC":
                    nextState = `STATIC`;
                    break;
                case "IDLE":
                    nextState = `IDLE`;
                    break;
                case "IDLE_START":
                    nextState = `IDLE_START`;
                    break;
                case "INACTIVE":
                    this.graveStatic = false;
                    nextState = `GREY`;
                    break;
                case "INACTIVE_intro":
                    this.graveStatic = false;
                    nextState = `GREY_intro`;
                    break;
                case "ROLLOVER":
                    nextState = `MOUSEOVER`;
                    break;
                case "ROLLOUT":
                    nextState = `STATIC`;
                    break;
                case "OFF":
                    nextState = this.defaultState;
                    break;
                case "IDLE_STOP":
                    nextState = "IDLE_STOP";
                    break;
                default:
                    nextState = this.defaultState;
                    break;
            }

            // Store the interaction state
            this.spineState = nextState;

            utils.log("Changing spine state to: " + nextState);
            this.graveSpine.renderable = data.state !== "OFF";
            if(data.then) {
                this.graveSpine.state.setAnimation(0, `graveAnims_${this.grvDirLand}/${nextState}`, false);
                this.graveSpine.state.addListener({
                    complete: () => {
                        if(Array.isArray(data.then)) {
                            var thn = data.then.slice();
                            this.setSpineState({ state: thn.shift(), loop: doLoop, then: (thn.length > 0 ? thn : undefined) });
                        } else {
                            this.setSpineState({ state: data.then, loop: doLoop });
                        }
                    }
                });
            } else {                
                this.graveSpine.state.setAnimation(0, `graveAnims_${this.grvDirLand}/${nextState}`, doLoop);
                this.graveSpine.state.listeners.forEach(listener => {
                    if(listener.complete) {
                        this.graveSpine.state.removeListener(listener);
                    }
                });
            }

            return `graveAnims_${this.grvDirLand}/${nextState}`;
        }

        setRevealSpineState(data) {
            let nextState;
            let doLoop = data.loop || false;
            let syncTime = data.sync || 0;
            switch (data.state) {
                case "REVEAL_CASH":
                    this.graveStatic = false;
                    nextState = `cashWin_REVEAL`;
                    break;
                case "IDLE_CASH":
                    nextState = `cashWin_IDLE`;
                    break;
                case "RESET_CASH":
                    nextState = `cashWin_RESET`;
                    break;
                case "REVEAL_LOSE":
                    this.graveStatic = false;
                    this.randomNum = Math.ceil(Math.random() * 2);
                    nextState = `noWin_REVEAL_${this.randomNum}`;
                    break;
                case "IDLE_LOSE":
                    nextState = `noWin_IDLE`;
                    break;
                case "RESET_LOSE":
                    nextState = `noWin_RESET`;
                    break;
                case "REVEAL_COFFIN":
                    this.graveStatic = false;
                    nextState = `coffinBonus_REVEAL`;
                    break;
                case "IDLE_COFFIN":
                    nextState = `coffinBonus_IDLE`;
                    break;
                case "RESET_COFFIN":
                    nextState = `coffinBonus_RESET`;
                    break;
                case "REVEAL_ORGAN":
                    this.graveStatic = false;
                    nextState = `organBonus_REVEAL`;
                    break;
                case "IDLE_ORGAN":
                    nextState = `organBonus_IDLE`;
                    break;
                case "RESET_ORGAN":
                    nextState = `organBonus_RESET`;
                    break;
                default:
                    nextState = this.defaultState;
                    break;
            }

            if (data.state !== "INACTIVE") {
                this.revealSpine.state.setAnimation(syncTime, `graveAnims/${nextState}`, doLoop);
            } else {
                this.revealSpine.state.setAnimation(syncTime, `graveAnims/${nextState}`, doLoop);
            }

            return `graveAnims/${nextState}`;
        }

        async uncover() {
            msgBus.publish("Game.updatePicks");
            msgBus.publish("UI.updateButtons", {
                help: false
            });
            msgBus.publish("IXFConsole.disableAll");
            NumberCard.revealing++;

            await new Promise(resolve => {
                this.interactive = false;
                this.revealing = true;
                this.hovering = false;

                var globalScope = this;

                globalScope.resultContainer.visible = true;
                globalScope.resultContainer.alpha = 1;
                globalScope.graveSpine.state.clearListeners();

                this.currentState = "idle";

                this.graveType = graveTypes[this.chestPrize];
                this.graveType = this.graveType ? this.graveType : "CASH"; // If the prize isn't in the graveTypes Arr, it is a cash win

                this.setSpineState({ state: "STATIC", loop: false });
                let animName = this.setRevealSpineState({ state: `REVEAL_${this.graveType}`, loop: false });
                let _this = this;

                // Because the pip isn't added yet but we need to disable the game in manual reveal
                if ((bonusMeter.organsCollected() === 2 && _this.graveType === "ORGAN") || (bonusMeter.coffinsCollected() === 2 && _this.graveType === "COFFIN")) {
                    if (!autoPlay.enabled) {
                        displayList.playerNumbers.interactiveChildren = false;
                    }
                }

                if (_this.graveType === "CASH") {
                    audio.play("instantWin", false);
                    setTimeout(() => {
                        _this.addText(_this.revealSpine);//spineAnim, slotName, source
                    }, 100);
                } else if(animName.indexOf("noWin_REVEAL") > -1) {
                    audio.play(animName.indexOf("1") > -1 ? "zombie_reveal" : "skeleton_reveal", false);
                } else {
                    audio.playRandom("ghost_reveal", false);
                }

                this.revealSpine.state.addListener({
                    complete: async function (entry) {
                        if (entry.animation.name === animName) {

                            _this.revealSpine.state.clearListeners();
                            _this.setRevealSpineState({ state: `IDLE_${_this.graveType}`, loop: true });

                            if (_this.graveType !== "CASH" && _this.graveType !== "LOSE") {
                                let stageX = _this.parent.transform.worldTransform.tx;// _this.parent.x + displayList.playerNumbers.x;
                                let stageY = _this.parent.transform.worldTransform.ty;// _this.parent.y + displayList.playerNumbers.y;
                                let spark;
                                switch (_this.graveType) {
                                    case "COFFIN":
                                        spark = new sparkCreator(_this.graveType);
                                        spark.animate({ x: stageX, y: stageY }, { x: displayList.CB_Meter.x, y: displayList.CB_Meter.y }, 0.5, bonusMeter.addPipToCoffin);
                                        break;
                                    case "ORGAN":
                                        spark = new sparkCreator(_this.graveType);
                                        spark.animate({ x: stageX, y: stageY }, { x: displayList.OB_Meter.x, y: displayList.OB_Meter.y }, 0.5, bonusMeter.addPipToOrgan);
                                        break;
                                }
                                audio.play("bonus_swoosh", false);
                                Tween.delayedCall(0.55, async () => {
                                    audio.play("bonus_candle", false);
                                    if (_this.graveType === "ORGAN" && bonusMeter.organsCollected() === 3) {
                                        bonusMeter.organsFilled();
                                        resolve();
                                    } else if (_this.graveType === "COFFIN" && bonusMeter.coffinsCollected() === 3) {
                                        bonusMeter.coffinsFilled();
                                        resolve();
                                    } else {
                                        resolve();
                                    }
                                });


                            } else {
                                resolve();
                            }


                        }
                    }
                });

                this.resultContainer.visible = true;
                this.revealing = false;
                this.revealed = true;
                this.interactive = false;
            });

            const revealed = NumberCard.cards.reduce((prev, curr) => prev + (curr.revealed ? 1 : 0), 0);
            NumberCard.revealing--;
            if(NumberCard.revealing === 0 && revealed < 8) {
                msgBus.publish("UI.updateButtons", {
                    help: true
                });
                msgBus.publish("IXFConsole.enableAll");    
            } else if(NumberCard.revealing < 0) {
                throw new Error("Unbalanced NumberCard revealing count!");
            }
        }

        reset() {
            let _this = this;
            // if (this.chestPrize !== "" && !chestsStatic) {
            if (!this.graveStatic) {
                // Unique reset animation trigger
                if (!_this.inactive) {
                    _this.setRevealSpineState({ state: `RESET_${_this.graveType}`, loop: false });
                } else {
                    _this.inactive = false;
                    _this.setSpineState({ state: "OFF", loop: false });
                }
                this.graveStatic = true;
                this.randomNum = undefined;
            }

            textToSpine.clearMesh(_this.revealSpine, "value");

            // _this.setSpineState({ state: "OFF", loop: false });
            _this.graveSpine.state.clearListeners();
            _this.revealSpine.state.clearListeners();

            this.graveSpine.renderable = true;
            this.chestPrize = "";
            this.symbolCode = "";
            this.symbolLetter = "";
            this.winAmount.text = "";
            this.enabled = false;
            this.resultContainer.visible = false;
            this.revealed = false;
            this.revealing = false;
            this.opened = false;
            this.number = undefined;
            this.alpha = 1;

            this.currentState = "idle";
        }

    }

    return NumberCard;
});
