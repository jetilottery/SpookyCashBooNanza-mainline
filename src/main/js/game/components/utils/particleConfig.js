/**
 * particle Configs
 */
define(function module() {
    //by returning this from a function, it means we can do e.g. "new coinFountain()",
    //and have multiples, rather than changing settings for one, and ending up with the same settings for all
    const bats = function () {
        return {
            //custom particle config settings
            bigWinSettings: {
                animatedParticlePrefix: "showerParticle/showerParticle_00",
                startFrame: 0,
                endFrame: 23,
                isAnimated: true,
                nonAnimatedImages: [],
                frameRate: 24,
                scale: {
                    start: 0.2,
                    end: 5,
                    minimumScaleMultiplier: 0.8
                },
            },

            //Normal Particle config settings
            "alpha": {
                "start": 1,
                "end": 1
            },
            "scale": {
                "start": 0.2,
                "end": 5,
                "minimumScaleMultiplier": 0.8
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": 1100,
                "end": 1500,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": -160,
                "max": -20
            },
            "noRotation": true,
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 6,
                "max": 6
            },
            "blendMode": "normal",
            "frequency": 0.05,
            "emitterLifetime": 3,
            "maxParticles": 2400,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "rect",
            "spawnRect": {
                "x": -514,
                "y": 405,
                "w": 1028,
                "h": 50
            }
        };
    };

    const background = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.01,
            "end": 2,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ff0000",
            "end": "#ff0000"
        },
        "speed": {
            "start": 10,
            "end": 5,
            "minimumSpeedMultiplier": 10
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 10,
        "startRotation": {
            "min": 270,
            "max": 270
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 1,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 30
        },
        "blendMode": "screen",
        "extraData": {
            "path": "cos(x/50) * (2 * (sqrt(x) / 2))"
        },
        "frequency": 0.1,
        "emitterLifetime": -1,
        "maxParticles": 1000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": true,
        "spawnType": "rect",
        "spawnRect": {
            "x": -1000,
            "y": 0,
            "w": 2000,
            "h": 0
        }
    };

    var flyingBonus = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 3,
            "end": 1,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ffffff",
            "end": "#ffffff"
        },
        "speed": {
            "start": 0,
            "end": 0,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 10
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.5,
            "max": 0.5
        },
        "blendMode": "add",
        "frequency": 0.03,
        "emitterLifetime": -1,
        "maxParticles": 500,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
            "x": 0,
            "y": 0,
            "r": 12
        }
    };

    var winningBonus = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 4,
            "end": 2,
            "minimumScaleMultiplier": 2
        },
        "color": {
            "start": "#ffffff",
            "end": "#ffffff"
        },
        "speed": {
            "start": 0,
            "end": 0,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": 0,
            "max": 10
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.5,
            "max": 0.5
        },
        "blendMode": "add",
        "frequency": 0.02,
        "emitterLifetime": -1,
        "maxParticles": 2000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
            "x": 0,
            "y": 0,
            "r": 12
        }
    };

    var spark = {
        "alpha": {
            "start": 0.6,
            "end": 0.2
        },
        "scale": {
            "start": 0.4,
            "end": 0.1,
            "minimumScaleMultiplier": 2
        },
        "color": {
            "start": "#ffee22",
            "end": "#ffee22"
        },
        "speed": {
            "start": 20,
            "end": 200,
            "minimumSpeedMultiplier": 3
        },
        "acceleration": {
            "x": 30,
            "y": 30
        },
        "maxSpeed": 200,
        "startRotation": {
            "min": 0,
            "max": 180
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.7,
            "max": 1
        },
        "blendMode": "add",
        "frequency": 0.01,
        "emitterLifetime": -1,
        "maxParticles": 40,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "circle",
        "spawnCircle": {
            "x": 0,
            "y": 0,
            "r": 5
        }
    };

    var whisp = {
        "alpha": {
            "start": 1,
            "end": 0.5
        },
        "scale": {
            "start": 0.2,
            "end": 0.5,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ffd66e",
            "end": "#ffbb0f"
        },
        "speed": {
            "start": 0,
            "end": 0,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 200,
        "startRotation": {
            "min": 265,
            "max": 275
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.3,
            "max": 0.3
        },
        "blendMode": "normal",
        "frequency": 0.002,
        "emitterLifetime": -1,
        "maxParticles": 1000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "point",
    };

    var coffinLightParticle = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.1,
            "end": 0.4,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ae00ff",
            "end": "#9100ff"
        },
        "speed": {
            "start": 1,
            "end": 200,
            "minimumSpeedMultiplier": 0.1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 1,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 1
        },
        "blendMode": "add",
        "frequency": 0.001,
        "emitterLifetime": -1,
        "maxParticles": 500,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "point"
    };

    var organLightParticle = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.1,
            "end": 0.4,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#10ff00",
            "end": "#10ff00"
        },
        "speed": {
            "start": 1,
            "end": 200,
            "minimumSpeedMultiplier": 0.1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 1,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 1
        },
        "blendMode": "add",
        "frequency": 0.001,
        "emitterLifetime": -1,
        "maxParticles": 500,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "point"
    };

    var wheelLightParticle = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.1,
            "end": 0.4,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ffffff",
            "end": "#ffffff"
        },
        "speed": {
            "start": 1,
            "end": 200,
            "minimumSpeedMultiplier": 0.1
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 1,
        "startRotation": {
            "min": 0,
            "max": 360
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 0,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 1
        },
        "blendMode": "add",
        "frequency": 0.001,
        "emitterLifetime": -1,
        "maxParticles": 500,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": false,
        "spawnType": "point"
    };

    const baseBGConfig = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.01,
            "end": 3,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#1b9ddb",
            "end": "#1b9ddb"
        },
        "speed": {
            "start": 5,
            "end": 2.5,
            "minimumSpeedMultiplier": 10
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 10,
        "startRotation": {
            "min": 270,
            "max": 270
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 1,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 70
        },
        "blendMode": "normal",
        "extraData": {
            "path": "cos(x/50) * (2 * (sqrt(x) / 2))"
        },
        "frequency": 0.25,
        "emitterLifetime": -1,
        "maxParticles": 1000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": true,
        "spawnType": "rect",
        "spawnRect": {
            "x": -1000,
            "y": 0,
            "w": 2000,
            "h": 0
        }
    };

    const bonusBGConfig = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.01,
            "end": 3,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#1b9ddb",
            "end": "#1b9ddb"
        },
        "speed": {
            "start": 5,
            "end": 2.5,
            "minimumSpeedMultiplier": 10
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 10,
        "startRotation": {
            "min": 270,
            "max": 270
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 1,
            "max": 0
        },
        "lifetime": {
            "min": 0.1,
            "max": 70
        },
        "blendMode": "normal",
        "extraData": {
            "path": "cos(x/50) * (2 * (sqrt(x) / 2))"
        },
        "frequency": 0.25,
        "emitterLifetime": -1,
        "maxParticles": 1000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": true,
        "spawnType": "rect",
        "spawnRect": {
            "x": -1000,
            "y": 0,
            "w": 2000,
            "h": 0
        }
    };

    const bonusConfig = {
        "alpha": {
            "start": 1,
            "end": 0
        },
        "scale": {
            "start": 0.01,
            "end": 1,
            "minimumScaleMultiplier": 1
        },
        "color": {
            "start": "#ffffff",
            "end": "#ff0400"
        },
        "speed": {
            "start": 10,
            "end": 5,
            "minimumSpeedMultiplier": 10
        },
        "acceleration": {
            "x": 0,
            "y": 0
        },
        "maxSpeed": 10,
        "startRotation": {
            "min": 270,
            "max": 270
        },
        "noRotation": false,
        "rotationSpeed": {
            "min": 1,
            "max": 100
        },
        "lifetime": {
            "min": 0.1,
            "max": 30
        },
        "blendMode": "add",
        "extraData": {
            "path": "cos(x/50) * (2 * (sqrt(x) / 2))"
        },
        "frequency": 0.5,
        "emitterLifetime": -1,
        "maxParticles": 1000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": true,
        "spawnType": "rect",
        "spawnRect": {
            "x": -1000,
            "y": 0,
            "w": 2000,
            "h": 0
        }
    };

    return {
        bats: bats,
        spark: spark,
        whisp: whisp,
        background: background,
        flyingBonus: flyingBonus,
        winningBonus: winningBonus,
        coffinLightParticle: coffinLightParticle,
        organLightParticle: organLightParticle,
        wheelLightParticle: wheelLightParticle,
        baseBGConfig: baseBGConfig,
        bonusBGConfig: bonusBGConfig,
        bonusConfig: bonusConfig
    };
});