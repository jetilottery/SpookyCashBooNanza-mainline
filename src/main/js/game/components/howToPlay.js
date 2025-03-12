define(require => {
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const PIXI = require("com/pixijs/pixi");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const orientation = require("skbJet/componentManchester/standardIW/orientation");
    const resLib = require("skbJet/component/resourceLoader/resourceLib");
    const gameState = require("game/components/state");

    const gameTypes = ["baseGame", "coffinBonus", "organBonus"];

    let p2TopContainer, p3TopContainer, p2TL, p2TR, p2Rest, p3TL, p3TR, p3Rest, pagedPlaque;

    function init() {
        // Page 1
        let bonus_1 = PIXI.Texture.fromFrame("icon_help_coffin");
        bonus_1 = new PIXI.Sprite(bonus_1);
        bonus_1.anchor.x = 0.5;
        bonus_1.anchor.y = 0;
        bonus_1.x = -bonus_1.width * 0.8;
        let bonus_2 = PIXI.Texture.fromFrame("icon_help_organ");
        bonus_2 = new PIXI.Sprite(bonus_2);
        bonus_2.anchor.x = 0.5;
        bonus_2.anchor.y = 0;
        bonus_2.x = bonus_2.width * 0.8;
        displayList.howToPlayBonusCoins1.addChild(bonus_1, bonus_2);


        var smallSpace = 10;

        // ************************** Page 2 ************************** 
        let line1 = resLib.i18n.game.Game.page2.split("{line1complete}")[0];
        let line2n3 = resLib.i18n.game.Game.page2.split("{line1complete}")[1];
        let p2Text = line1.split("{coffinSymbol}");

        p2TL = displayList.howToPlayPageText2Text1;
        p2TL.text = p2Text[0];
        p2TR = displayList.howToPlayPageText2Text2;
        p2TR.text = p2Text[1];
        p2Rest = displayList.howToPlayPageText2Text3;
        p2Rest.text = line2n3;

        let coffinSprite = PIXI.Sprite.fromFrame("icon_help_coffin");

        p2TL.anchor.y = p2TR.anchor.y = p2Rest.anchor.x = coffinSprite.anchor.y = 0.5;

        // Position top line elements
        p2TL.x = 0;

        if (p2TL.width <= 40) {
            smallSpace = 10;
        } else {
            smallSpace = 10;
        }


        coffinSprite.x = p2TL.width + smallSpace;
        p2TR.x = coffinSprite.x + coffinSprite.width + smallSpace;

        p2TopContainer = new PIXI.Container();
        p2TopContainer.addChild(p2TL, coffinSprite, p2TR);

        displayList.howToPlayPageText2.addChild(p2TopContainer, p2Rest);

        // ************************** Page 3 ************************** 
        line1 = resLib.i18n.game.Game.page3.split("{line1complete}")[0];
        line2n3 = resLib.i18n.game.Game.page3.split("{line1complete}")[1];
        let p3Text = line1.split("{organSymbol}");

        p3TL = displayList.howToPlayPageText3Text1;
        p3TL.text = p3Text[0];
        p3TR = displayList.howToPlayPageText3Text2;
        p3TR.text = p3Text[1];
        p3Rest = displayList.howToPlayPageText3Text3;
        p3Rest.text = line2n3;

        let organSprite = PIXI.Sprite.fromFrame("icon_help_organ");

        p3TL.anchor.y = p3TR.anchor.y = p3Rest.anchor.x = organSprite.anchor.y = 0.5;

        // Position top line elements
        p3TL.x = 0;

        if (p3TL.width <= 40) {
            smallSpace = 10;
        } else {
            smallSpace = 10;
        }

        organSprite.x = p3TL.width + smallSpace;
        p3TR.x = organSprite.x + organSprite.width + smallSpace;

        p3TopContainer = new PIXI.Container();
        p3TopContainer.addChild(p3TL, organSprite, p3TR);

        displayList.howToPlayPageText3.addChild(p3TopContainer, p3Rest);

        pagedPlaque = displayList.howToPlayBackground.parent;

        orientationChanged();
        msgBus.subscribe("GameSize.OrientationChange", orientationChanged);
        msgBus.subscribe("UI.showHelp", onShow);
    }

    function orientationChanged() {
        //reset to initial positions
        displayList.howToPlayPageText2.y = 0;
        p2Rest.y = 0;
        displayList.howToPlayPageText3.y = 0;
        p3Rest.y = 0;
        htpTextArrange();
    }

    function htpTextArrange() {
        let containerPos = {
            landscape: {
                x: 720,
                height: 810,
                l1Wrap: 600,
                restOffset: 50,
                restWrap: 1070,
                p1Offset: 210
            },
            portrait: {
                x: 405,
                height: 1440,
                l1Wrap: 400,
                restOffset: 50,
                restWrap: 500,
                p1Offset: 240
            },
        };

        let p1Offset = containerPos[orientation.get()].p1Offset;
        displayList.howToPlayPageText1.anchor.set(0.5, 0);
        displayList.howToPlayPageText1.y = p1Offset;
        updateAllText(displayList.howToPlayPageText1, false);
        let metrics = PIXI.TextMetrics.measureText(displayList.howToPlayPageText1.text, displayList.howToPlayPageText1.style, displayList.howToPlayPageText1.style.wordWrap);
        displayList.howToPlayBonusCoins1.y = p1Offset + metrics.height + 10;

        let vAlign = (displayList.howToPlayIndicators.getBounds().top - displayList.howToPlayBonusCoins1.getBounds().bottom) / 2;
        displayList.howToPlayPageText1.y += vAlign;
        displayList.howToPlayBonusCoins1.y += vAlign;

        p2TR.style.wordWrapWidth = containerPos[orientation.get()].l1Wrap;
        p2Rest.style.wordWrapWidth = containerPos[orientation.get()].restWrap;
        p2TopContainer.x = -p2TopContainer.width / 2;
        p2TopContainer.y = p1Offset + p2TopContainer.height / 2;
        p2Rest.y = p1Offset + p2TopContainer.height + 10;
        displayList.howToPlayPageText2.x = containerPos[orientation.get()].x;
        updateAllText(displayList.howToPlayPageText2, false);
        vAlign = (displayList.howToPlayIndicators.getBounds().top - displayList.howToPlayPageText2.getBounds().bottom) / 2;
        displayList.howToPlayPageText2.y = vAlign;

        p3TR.style.wordWrapWidth = containerPos[orientation.get()].l1Wrap;
        p3Rest.style.wordWrapWidth = containerPos[orientation.get()].restWrap;
        p3TopContainer.x = -p3TopContainer.width / 2;
        p3TopContainer.y = p1Offset + p3TopContainer.height / 2;
        p3Rest.y = p1Offset + p3TopContainer.height + 10;
        displayList.howToPlayPageText3.x = containerPos[orientation.get()].x;
        updateAllText(displayList.howToPlayPageText3, false);
        vAlign = (displayList.howToPlayIndicators.getBounds().top - displayList.howToPlayPageText3.getBounds().bottom) / 2;
        displayList.howToPlayPageText3.y = vAlign;
    }

    function updateAllText(container, respectDirty) {
        if (typeof container.updateText === "function") {
            container.updateText(respectDirty);
        }
        if (container.children && container.children.length) {
            container.children.forEach(child => {
                updateAllText(child, respectDirty);
            });
        }
    }

    function onShow() {
        //set page to current game type
        let page = gameTypes.indexOf(gameState.activeGame);
        pagedPlaque.goToPage(page > -1 ? page : 0);
    }

    return {
        init
    };
});