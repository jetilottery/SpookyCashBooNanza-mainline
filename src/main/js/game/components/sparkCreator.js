define(require => {
    const PIXI = require("com/pixijs/pixi");
    const particleConfig = require("game/components/utils/particleConfig");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const app = require("skbJet/componentManchester/standardIW/app");

    require("com/gsap/TweenMax");
    const Tween = window.TweenMax;

    let emitter;
    class spark {
        constructor(graveType) {
            let _this = this;
            emitter = new PIXI.particles.Emitter(displayList.particles, [PIXI.Texture.from("background-particle")], (graveType === "COFFIN" ? particleConfig.coffinLightParticle : particleConfig.organLightParticle));
            _this.emitter = emitter;
            _this.enabled = true;

            let ticker = app.ticker;
            let tickHandler = function () { if (_this.enabled) { _this.emitter.update(ticker.elapsedMS * 0.001); } };
            ticker.add(tickHandler);

            _this.emitter.kill = () => {
                _this.emitter.emit = false;
                new Tween.to({}, 1, { //set to 1 for nice dissapation
                    onComplete: () => {
                        _this.enabled = false;
                        _this.emitter.cleanup();
                        _this.emitter.destroy();
                    }
                });
            };
        }

        animate(startPoint, endPoint, duration, complete) {
            let _this = this;
            new Tween.fromTo(_this.emitter.spawnPos, duration, { x: startPoint.x }, {
                ease: "Power3.easeOut", x: endPoint.x
            });
            new Tween.fromTo(_this.emitter.spawnPos, duration, { y: startPoint.y }, {
                y: endPoint.y, onComplete: () => {
                    _this.emitter.kill();
                    if (complete) {
                        complete();
                    }
                }
            });
        }
    }

    return spark;
});