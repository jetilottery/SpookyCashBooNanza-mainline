define(require => {
    "use strict";

    const PIXI = require("com/pixijs/pixi");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const Pressable = require("skbJet/componentManchester/standardIW/components/pressable");
    //const audio = require("skbJet/componentManchester/standardIW/audio");
    const orientation = require("skbJet/componentManchester/standardIW/orientation");
    
    const hitAreas = { 
        portrait: [
            new PIXI.Polygon([
                134.00,375.00,
                236.50,341.50,
                327.00,426.00,
                397.00,775.50,
                264.50,817.00,
                95.00,498.50
            ]),
            new PIXI.Polygon([
                436.67,430.00,
                531.33,349.33,
                639.33,374.00,
                680.67,482.00,
                542.67,816.67,
                414.67,777.33
            ])
        ],
        landscape: [
            new PIXI.Polygon([
                461.50,314.00,
                491.50,215.50,
                581.00,185.50,
                659.00,252.00,
                699.00,549.00,
                616.00,578.00         
            ]),
            new PIXI.Polygon([
                754.00,254.00,
                837.00,191.00,
                914.00,215.00,
                951.00,296.00,
                836.00,582.00,
                731.00,550.00           
            ])
        ]
    };

    class CoffinSelector extends Pressable {
        constructor(slotIndex) {
            super();

            this.pressed = false;
            this.slotIndex = slotIndex;
            this.hitArea = hitAreas[orientation.get()][slotIndex];

            this.on("press", this.onPress);

            this.on("pointerover", this.onOver);

            this.on("pointerout", this.onOut);

            msgBus.subscribe("GameSize.OrientationChange", this.onOrientationChange.bind(this));
        }

        onPress() {
            msgBus.publish("CoffinSelector.Press", {index: this.slotIndex});
            this.enabled = false;
        }
    
        onOver() {
            msgBus.publish("CoffinSelector.Over", {index: this.slotIndex});
        }
    
        onOut() {
            msgBus.publish("CoffinSelector.Out", {index: this.slotIndex});
        }

        onOrientationChange() {
            this.hitArea = hitAreas[orientation.get()][this.slotIndex];
        }
    }
    return CoffinSelector;
});