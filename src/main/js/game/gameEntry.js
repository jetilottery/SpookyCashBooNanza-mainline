define(function (require) {
    require("polyfill");
    const app = require("skbJet/componentManchester/standardIW/app");
    const layout = require("skbJet/componentManchester/standardIW/layout");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const FittedTextExt = require("game/components/FittedTextExt");
    const config = require("skbJet/componentManchester/standardIW/gameConfig");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    const textStyles = require("skbJet/componentManchester/standardIW/textStyles");
    const gameSize = require("skbJet/componentManchester/standardIW/gameSize");
    const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
    const documents = require("skbJet/componentManchester/standardIW/documents");
    const scenarioData = require("skbJet/componentManchester/standardIW/scenarioData");
    const loadController = require("skbJet/componentManchester/standardIW/loadController");
    const spineSubLoader = require("skbJet/componentManchester/spineLoader/SpineSubLoader");
   // const displayList = require("skbJet/componentManchester/standardIW/displayList");
    
    //overrides
    const text = require("skbJet/componentManchester/standardIW/layout/text");
    const utils = require("skbJet/componentManchester/standardIW/layout/utils");
    //

    const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
    const prizestructureTransform = require("game/prizestructureTransform");

    const prizetableTransform = require("game/prizetableTransform");
    const scenarioTransform = require("game/scenarioTransform");

    const templateLayout = require("game/template/layout");
    const gameLayout = require("game/custom/layout");
    const templateConfig = require("game/template/config");
    const gameConfig = require("game/custom/config");
    const templateAudioMap = require("game/template/audioMap");
    const gameAudioMap = require("game/custom/audioMap");
    const templateTextStyles = require("game/template/textStyles");
    const gameTextStyles = require("game/custom/textStyles");
    const dimensions = require("game/template/dimensions");

    const Button = require("skbJet/componentManchester/standardIW/components/button");

    // Require StandardIW component templates
    let buttonBar = require("skbJet/componentManchester/standardIW/ui/buttonBar/template");
    let autoPlayButton = require("skbJet/componentManchester/standardIW/ui/autoPlayButton/template");
    let resultPlaques = require("skbJet/componentManchester/standardIW/ui/resultPlaques/template");
    let howToPlay = require("skbJet/componentManchester/standardIW/ui/howToPlay/template");
    let errorPlaque = require("skbJet/componentManchester/standardIW/ui/errorPlaque/template");
    let ticketSelectBar = require("skbJet/componentManchester/standardIW/ui/ticketSelectBarSmall/template");
    let footer = require("skbJet/componentManchester/standardIW/ui/footer/template");
    let networkActivity = require("skbJet/componentManchester/standardIW/ui/networkActivity/template");
    // Require all game specific components that need initializing
    //const winningNumbers = require("game/components/winningNumbers");
    const playerNumbers = require("game/components/playerNumbers");
    const coffinBonus = require("game/components/coffinBonus");
    const organBonus = require("game/components/organBonus");

    const preload = require("game/components/utils/preload");

    const winPlaque = require("game/components/winPlaque");
    const losePlaque = require("game/components/losePlaque");
    const transition = require("game/components/transition");
    const buyAnim = require("game/components/buyAnim");
    const bigWin = require("game/components/bigWin");
    const h2p = require("game/components/howToPlay");
    const bonusController = require("game/components/bonusController");
    const bonusTutorial = require("game/components/bonusTutorial");
    const bonusWinPlaque = require("game/components/bonusWinPlaque");
   // const gameState = require("game/components/state");
    require("game/components/winUpTo");

    // Require game side state handlers.
    require("game/ticketAcquired");
    require("game/startReveal");
    require("game/endReveal");
    require("game/resultScreen");
    require("game/gameReset");
    require("game/error");

    // override text to use FittedTextExt instead of FittedText
    text.create = function() {
        return new FittedTextExt();
    };
    const oldUpdate = text.update;
    text.update = function(displayObj, layoutObj) {
        oldUpdate(displayObj, layoutObj);
        utils.assignProp(layoutObj, displayObj, "maxHeight");
    };

    // Register template configs and game overrides
    layout.register(templateLayout, gameLayout);
    audio.register(templateAudioMap, gameAudioMap);
    config.register(templateConfig, gameConfig);
    textStyles.register(templateTextStyles, gameTextStyles);
    // Add Spine subLoader (not included in loadController by default)
    loadController.registerSubLoader("spine", new spineSubLoader());

    // Set game size for portrait and landscape
    gameSize.set(dimensions);

    function gameInit() {
        /// register prizetable/structure trasnforms
        if (SKBeInstant.isWLA()){
            documents.registerPrizestructureTransform(prizestructureTransform);
        }
        else{
            documents.registerPrizetableTransform(prizetableTransform);
        }   

        // Register a transform function that can be used to turn the scenario string into useable data
        scenarioData.registerTransform(scenarioTransform);

        // Init StandardIW UI templates
        howToPlay = howToPlay();
        resultPlaques = resultPlaques();
        errorPlaque = errorPlaque();
        buttonBar = buttonBar();
        autoPlayButton = autoPlayButton();
        ticketSelectBar = ticketSelectBar();
        footer = footer();
        networkActivity = networkActivity();

        // Inititialize all game components
        playerNumbers.init();
        coffinBonus.init();
        organBonus.init();

        losePlaque.init();
        winPlaque.init();
        transition.init();
        buyAnim.init();
        bonusController.init();
        bonusTutorial.init();
        bonusWinPlaque.init();

        // prizeTable.init();

        // Add everything to the stage
        app.stage.addChild(
            layout.container,
            resultPlaques,
            buttonBar,
            autoPlayButton,
            ticketSelectBar,
            howToPlay,
            footer,
            errorPlaque,
            networkActivity
        );

        bigWin.init();
        h2p.init();
        
        //pad button labels
        padButtons(app.stage, "    ");

        //position autoPlay & moveToMoney buttons
        msgBus.publish("transition.positionButtons", "init");

        if(config.bypassPlayAgain !== config.ticketCostMeterVisibleWhilePlaying) {
            throw new Error(
                "ERROR: The config bypassPlayAgain: " + String(config.bypassPlayAgain) + 
                " AND ticketCostMeterVisibleWhilePlaying: " + String(config.ticketCostMeterVisibleWhilePlaying) +
                " is not supported!"
            );
        }

        // Once everything is initialized continue to next state

        preload.init();
        gameFlow.next();
    }

    
    //Pad button labels with spaces
    function padButtons(parent, pad) {
        if(parent instanceof Button && parent.label.text.length && parent.label.text.indexOf(pad) != 0) {
            parent.label.text = pad + parent.label.text + pad;
        }
        if(parent.children.length) {
            parent.children.forEach(child => padButtons(child, pad));
        }
    }

    gameFlow.handle(gameInit, "GAME_INIT");
});
