define(require => {
  const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
  const orientation = require("skbJet/componentManchester/standardIW/orientation");
  const gameConfig = require("skbJet/componentManchester/standardIW/gameConfig");
  const meterData = require("skbJet/componentManchester/standardIW/meterData");
  const displayList = require("skbJet/componentManchester/standardIW/displayList");
  const resultParticles = require("game/components/utils/resultParticles");
  const PIXI = require("com/pixijs/pixi");
  const audio = require("skbJet/componentManchester/standardIW/audio");
  require("com/pixijs/pixi-particles");

  let _container;
  let _thresholds;

  function init() {
    _container = new PIXI.Container();

    // Grab the thresholds
    _thresholds = gameConfig.bigWinThresholds;

    // Add the container at the very back, so big win sits below all UI (1+), but above the game layout (0)
    displayList.bigWinCoins.addChild(_container);

    _container.visible = false;
    resultParticles.show(false);

    // Set up the result particles
    resultParticles.init(_container);

    // Listen for the result plaque being dismissed, this has no event so let's listen for the buttons/plaque being pressed
    displayList.winPlaqueCloseButton.on("press", () => setState({ level: -1 }));
  }

  function setState(data) {
    if (data.level === -1) {
      if (gameConfig.hideCoinsOnWinDismiss) {
        _container.visible = false;
        resultParticles.show(false);
      }
      return;
    }

    // Show container
    _container.visible = gameConfig.showResultScreen;

    // Toggle coin shower
    particleManager({ mode: 1, level: findPrizeLevel() });
  }

  // function shake(){
  //   TweenMax.to(displayList.backgrounds.parent.parent, 0.1, {x:"+=20", yoyo:true, repeat:5});
  //   TweenMax.to(displayList.backgrounds.parent.parent, 0.1, {x:"-=20", yoyo:true, repeat:5});
  // }

  function findPrizeLevel() {
    // Grab the big win thresholds from the object      
    const totalWin = meterData.totalWin;
    const ticketCost = meterData.ticketCost;
    const numLevels = Object.keys(_thresholds).length;

    // Return -1 if this is a non winner
    if (totalWin === 0) {
      return -1;
    }

    for (var i = 1; i <= numLevels; i++) {
      const thisObj = _thresholds["level" + i];
      const lowerLimitPresent = thisObj.lower || false;
      const upperLimitPresent = thisObj.upper || false;
      let withinUpper = false;
      let withinLower = false;

      if (lowerLimitPresent) {
        if (thisObj.lower.inclusive) {
          if (totalWin >= ticketCost * thisObj.lower.multiplier) {
            withinLower = true;
          }
        } else {
          if (totalWin > ticketCost * thisObj.lower.multiplier) {
            withinLower = true;
          }
        }
      } else {
        //it's the lowest already
        withinLower = true;
      }

      if (upperLimitPresent) {
        if (thisObj.upper.inclusive) {
          if (totalWin <= ticketCost * thisObj.upper.multiplier) {
            withinUpper = true;
          }
        } else {
          if (totalWin < ticketCost * thisObj.upper.multiplier) {
            withinUpper = true;
          }
        }
      } else {
        //it's the highest already
        withinUpper = true;
      }

      if (withinLower && withinUpper) {
        return (i);
      }
    }
  }

  function particleManager(data) {
    if (gameConfig.resultParticleMode === data.mode) {
      // Grab the properties for this level
      let config = gameConfig.resultParticleConfig["level" + data.level];
      // Set properties
      resultParticles.setProps(config);
      // Start particles
      setTimeout(() => {
        resultParticles.show(config.enabled);
        if(data.level > 1) {
          audio.play("bats", false);
        }
      }, 500);
    }
  }

  msgBus.subscribe("jLottery.enterResultScreenState", () => setState({ state: orientation.get(), loop: true, level: findPrizeLevel() }));
  msgBus.subscribe("UI.hideResult", () => setState({ level: -1 }));
  msgBus.subscribe("Result.RollupStarted", () => particleManager({ mode: 2, level: findPrizeLevel() }));
  msgBus.subscribe("Result.RollupComplete", () => particleManager({ mode: 3, level: findPrizeLevel() }));

  return {
    init,
    setState,
    findPrizeLevel,
    particleManager
  };
});