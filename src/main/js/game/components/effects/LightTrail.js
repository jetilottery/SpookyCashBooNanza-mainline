define(require => {

    const PIXI = require('com/pixijs/pixi');
    const particleConfig = require('game/components/utils/particleConfig');

    require('com/gsap/TweenMax');
    const Tween = window.TweenMax;

    class LightTrail extends PIXI.Container {
        constructor() {
            super();

            this.particleEmitters = {
                'COFFIN': new PIXI.particles.Emitter(
                    this,
                    [PIXI.Texture.from('background-particle')],
                    particleConfig.coffinLightParticle
                ),
                'ORGAN': new PIXI.particles.Emitter(
                    this,
                    [PIXI.Texture.from('background-particle')],
                    particleConfig.organLightParticle
                ),
                "WHEEL": new PIXI.particles.Emitter(
                    this,
                    [PIXI.Texture.from("background-particle")],
                    particleConfig.wheelLightParticle
                )
            };

            Object.keys(this.particleEmitters).forEach(e => {
                this.particleEmitters[e].emit = false;
                this.particleEmitters[e].autoUpdate = true;
            });
        }

        bezierConfig(data) {
            let bezierConfig;
            switch(data.config) {
                case 1: {
                    bezierConfig = [
                        {x: (data.pos.x / 4), y: (data.pos.y / 4)},
                        {x: (data.pos.x / 2), y: (data.pos.y / 2 + 100)},
                        {x: data.pos.x, y: data.pos.y},
                    ];
                    break;
                }
                case 2: {
                    bezierConfig = [
                        {x: (data.pos.x / 4), y: (data.pos.y / 4)},
                        {x: (data.pos.x / 2), y: (data.pos.y / 2 - 100)},
                        {x: data.pos.x, y: data.pos.y},
                    ];
                    break;
                }
                case 3: {
                    bezierConfig = [
                        {x: (data.pos.x / 4), y: (data.pos.y / 4)},
                        {x: (data.pos.x / 2), y: (data.pos.y / 2 + 200)},
                        {x: data.pos.x, y: data.pos.y},
                    ];
                    break;
                }
            }
            return bezierConfig;
        }

        goto(data) {
            let _this = this;
            let particle = data.particleType;

            this.particleEmitters[particle].emit = true;

            this.particleEmitters[particle].spawnPos = new PIXI.Point(data.start.x, data.start.y);

            Tween.to(this.particleEmitters[particle].spawnPos, typeof data.duration === "number" ? data.duration : 1, {
                x:data.pos.x,
                y:data.pos.y,
                onComplete: () => {
                    _this.particleEmitters[particle].emit = false;
                    if (data.cb !== undefined) {
                        data.cb();
                    }
                }
            });
        }
    }

    return LightTrail;
});