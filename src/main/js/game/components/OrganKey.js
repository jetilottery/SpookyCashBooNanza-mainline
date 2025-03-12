define(require => {
    const PIXI = require("com/pixijs/pixi");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    //const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const resLib = require("skbJet/component/resourceLoader/resourceLib");
    //const orientation = require("skbJet/componentManchester/standardIW/orientation");
    const Pressable = require("skbJet/componentManchester/standardIW/components/pressable");
    const autoPlay = require("skbJet/componentManchester/standardIW/autoPlay");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    
    require("com/gsap/TweenMax");
    const Tween = window.TweenMax;

    class OrganKey extends Pressable {
        constructor(keyId, hitArea) {
            super();

            this.keyId = keyId;
            this.keySpine = new PIXI.spine.Spine(resLib.spine["organBonus"].spineData);

            /*let g = new PIXI.Graphics();
            g.beginFill(0xFF0000, 0.5);
            g.drawRect(hitArea.x, hitArea.y, hitArea.width, hitArea.height);
            g.endFill();*/

            this.addChild(this.keySpine);

            this.keySpine.alpha = 0;

            // State
            this.hovering = false;
            this.idle = false;
            this.alphaTween = undefined;

            // Interactivity
            this.hitArea = hitArea;
            this.on("press", () => {
                if (!autoPlay.enabled) {
                    this.onPress();
                }
            });
            this.off("pointerover");
            this.on("pointerover", () => {
                this.onOver();
            });
            this.off("pointerout");
            this.on("pointerout", () => {
                this.onOut();
            });

            msgBus.subscribe("OrganKey.Idle", () => {
                this.idle = true;
                this.playIdle();
            });

            msgBus.subscribe("OrganKey.CancelIdle", () => {
                this.cancelAnims();
            });

            msgBus.subscribe("OrganKey.AutoPress", (data) => {
                if(data.keyId === this.keyId) {
                    this.onPress();
                }
            });
        }

        onPress() {
            if(!this.pressed) {
                this.pressed = true;
                this.enabled = false;
                this.killAlphaTween();
                this.keySpine.alpha = 1;
                this.keySpine.state.setAnimation(0, "PRESS/" + this.keyId, false);            
                msgBus.publish("OrganKey.CancelIdle");
                audio.playRandom("keyPress", false);
                msgBus.publish("OrganKey.Press", {id: this.keyId});
            }
        }

        onOver() {
            if(!this.pressed) {
                msgBus.publish("OrganKey.CancelIdle");
                this.cancelAnims();
                this.playHover();    
            }
        }

        onOut() {
            if(!this.pressed) {
                this.cancelAnims();
                msgBus.publish("OrganKey.Idle");    
            }
        }

        playHover() {
            if(!this.hovering && !this.pressed) {
                this.hovering = true;
                this.killAlphaTween();
                this.keySpine.alpha = 1;
                this.keySpine.state.setAnimation(0, "OVER/" + this.keyId, true);
            }
        }

        playIdle() {
            if(this.idle && !this.pressed) {
                this.killAlphaTween();
                this.keySpine.alpha = 1;
                this.keySpine.state.setAnimation(0, "IDLE/" + this.keyId, true);
            }
        }

        cancelAnims() {
            this.killAlphaTween();
            if(this.pressed) {
                this.alpha = 1;
            } else {
                this.alphaTween = Tween.to(this.keySpine, 0.5, {alpha: 0});
            }
            this.idle = false;
            this.hovering = false;
        }

        killAlphaTween() {
            if(this.alphaTween) {
                this.alphaTween.kill();
                this.alphaTween = undefined;
            }
        }

        reset() {
            msgBus.publish("OrganKey.CancelIdle");
            this.idle = false;
            this.hovering = false;
            this.pressed = false;
            this.enabled = true;
            this.keySpine.alpha = 0;
        }

        static fromContainer(container, keyId, hitArea) {
            const key = new OrganKey(keyId, hitArea);
            container.addChild(key);
            return key;
        }
    }

    return OrganKey;
});