define(()=>{
    // const waterfallEmitter = {
    //     "alpha": {
    //         "start": 1,
    //         "end": 1
    //     },
    //     "scale": {
    //         "start": 1,
    //         "end": 1.5,
    //         "minimumScaleMultiplier": 1.3
    //     },
    //     "color": {
    //         "start": "#ffffff",
    //         "end": "#fff86b"
    //     },
    //     "speed": {
    //         "start": 300,
    //         "end": 700,
    //         "minimumSpeedMultiplier": 1
    //     },
    //     "acceleration": {
    //         "x": 0,
    //         "y": 600
    //     },
    //     "maxSpeed": 0,
    //     "startRotation": {
    //         "min": 70,
    //         "max": 120
    //     },
    //     "noRotation": false,
    //     "rotationSpeed": {
    //         "min": 0,
    //         "max": 0
    //     },
    //     "lifetime": {
    //         "min": 2,
    //         "max": 3
    //     },
    //     "blendMode": "normal",
    //     "frequency": 0.006,
    //     "emitterLifetime": 2.3,
    //     "maxParticles": 1000,
    //     "pos": {
    //         "x": 0,
    //         "y": 10
    //     },
    //     "addAtBack": true,
    //     "spawnType": "rect",
    //     "spawnRect": {
    //         "x": 100,
    //         "y": -200,
    //         "w": 1400,
    //         "h": 0
    //     }
    // };
    const waterfallEmitter = {
        "alpha": {
            "start": 1,
            "end": 1
        },
        "scale": {
            "start": 0.8,
            "end": 1.2,
            "minimumScaleMultiplier": 1.7
        },
        "color": {
            "start": "#ffffff",
            "end": "#fff86b"
        },
        "speed": {
            "start": 0,
            "end": 0,
            "minimumSpeedMultiplier": 1
        },
        "acceleration": {
            "x": 0,
            "y": 1000
        },
        "maxSpeed": 0,
        "startRotation": {
            "min": -90,
            "max": -90
        },
        "noRotation": true,
        "rotationSpeed": {
            "min": 20,
            "max": -20
        },
        "lifetime": {
            "min": 3,
            "max": 3
        },
        "blendMode": "normal",
        "frequency": 0.004,
        // "frequency": 0.1,
        "emitterLifetime": 1.2,
        "maxParticles": 1000,
        "pos": {
            "x": 0,
            "y": 0
        },
        "addAtBack": true,
        "spawnType": "rect",
        "spawnRect": {
            "x": 0,
            "y": -600,
            "w": 1440,
            "h": 500
        }
    };
    return {
        waterfallEmitter,
    };
});