define(require => {
    const PIXI = require("com/pixijs/pixi");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const orientation = require("skbJet/componentManchester/standardIW/orientation");

    const layoutEngine = require('skbJet/componentManchester/standardIW/layout/engine');
    const templateLayout = require('game/template/layout');
    const layout = require('skbJet/componentManchester/standardIW/layout');

    const displayList = require("skbJet/componentManchester/standardIW/displayList");


    function init(){
        langFixes();
        msgBus.subscribe("GameSize.OrientationChange", onOrientationChange);
    }

    function preload(app, callback) {
        // Sprite sheets
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache["backgrounds_image"]);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache["game_image"]);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache["i18n_image"]);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache["numbers_image"]);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache["plaques-0_image"]);        
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache["plaques-1_image"]);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache["plaques-2_image"]);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache["plaques-3_image"]);
        app.renderer.plugins.prepare.add(PIXI.utils.BaseTextureCache["uiControls_image"]);
        //Preload

        app.renderer.plugins.prepare.upload(callback);
    }

    function langFixes() {
        if(displayList.winPlaqueValue.style.fontFamily === "KOMTITP__") {
            if(orientation.get() === orientation.LANDSCAPE) {
                displayList.winPlaqueValue.scale.set(0.8);
            } else {
                displayList.winPlaqueValue.scale.set(1);
            }
        }
    }

    function onOrientationChange() {
        layoutEngine.update(
            templateLayout._BASE_APP,
            layout.layouts,
            orientation.get()
        );

        langFixes();
    }

    return {
        init,
        preload,
    };    
});