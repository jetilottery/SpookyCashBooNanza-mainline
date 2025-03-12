define(function (require) {
	const gameFlow = require("skbJet/componentManchester/standardIW/gameFlow");
	const meterData = require("skbJet/componentManchester/standardIW/meterData");
	const audio = require("skbJet/componentManchester/standardIW/audio");
	const gameConfig = require("skbJet/componentManchester/standardIW/gameConfig");
	const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
	const displayList = require("skbJet/componentManchester/standardIW/displayList");
	const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
	const bigWin = require("game/components/bigWin");

	require("com/gsap/TweenMax");
	const Tween = window.TweenMax;

	function resultScreen() {
		// ResultPlaques template component handles populating and showing the result screen
		// All that needs doing here is playing the result screen audio
		audio.stop("BG_music");
		audio.stop("bonus_music");

		// Roll up the win value here
		if (meterData.totalWin > 0) {
			audio.play("winTerminator", false);
			if(gameConfig.rollUpTotalWin && bigWin.findPrizeLevel() > 1) {
				Tween.to({ curr: 1 }, gameConfig.totalWinRollupInSeconds, {
					curr: meterData.totalWin, onStart: function () {
						msgBus.publish("Result.RollupStarted");
					}, onUpdate: function () {
						displayList.winPlaqueValue.text = SKBeInstant.formatCurrency(this.target.curr).formattedAmount;
					}, onComplete: function () {
						msgBus.publish("Result.RollupComplete");
						if (gameConfig.pulseTotalWinAfterRollup) {
							Tween.fromTo(displayList.winPlaqueValue.scale, gameConfig.pulseTotalWinDuration, { x: 1, y: 1 }, { x: 1.25, y: 1.25, yoyo: true, repeat: 1});
						}
						displayList.winPlaqueBG.interactive = true;
					}
				});	
			} else {
				displayList.winPlaqueValue.text = SKBeInstant.formatCurrency(meterData.totalWin).formattedAmount;
				if (gameConfig.pulseTotalWinAfterRollup) {
					Tween.fromTo(displayList.winPlaqueValue.scale, gameConfig.pulseTotalWinDuration, { x: 1, y: 1 }, { x: 1.25, y: 1.25, yoyo: true, repeat: 1});
				}
				displayList.winPlaqueBG.interactive = true;
			}
		} else if (meterData.totalWin === 0) {
			audio.play("loseTerminator");
			displayList.losePlaqueBG.interactive = true;
		}
	}


	gameFlow.handle(resultScreen, "RESULT_SCREEN");
});
