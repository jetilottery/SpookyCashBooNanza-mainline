define(require => {
    const Timeline = require("com/gsap/TimelineLite");
    const gameConfig = require("skbJet/componentManchester/standardIW/gameConfig");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const playerNumbers = require("game/components/playerNumbers");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");

    let revealAllTimeline;
    let autoPlayActive = false;

    function startBG() {
        const revealPlayer = playerNumbers.revealAll();

        displayList.playerNumbers.interactiveChildren = false;

        //Then the player numbers
        revealAllTimeline = new Timeline({
            tweens: [
                new Timeline({ tweens: revealPlayer, stagger: gameConfig.autoPlayPlayerNumberInterval }),
            ],
            align: "sequence"
        });

        return revealAllTimeline;
    }

    function stopBG() {
        // re-enable all interaction at the parent container level
        displayList.playerNumbers.interactiveChildren = true;
        // kill the revealAll timeline if active
        if (revealAllTimeline) {
            revealAllTimeline.kill();
            revealAllTimeline = undefined;
        }
    }

    function start(gameType) {
        if(gameType === "coffinBonus") {
            msgBus.publish("Bonus.RevealAllStarted");
        } else if(gameType === "organBonus") {
            msgBus.publish("Bonus.RevealAllStarted");
        } else if(gameType === "baseGame") {
            startBG();
        }
        autoPlayActive = true;
    }

    function stop(gameType) {
        if(gameType === "coffinBonus") {
            msgBus.publish("Bonus.RevealAllStopped");
        } else if(gameType === "organBonus") {
            msgBus.publish("Bonus.RevealAllStopped");
        } else if(gameType === "baseGame") {
            stopBG();
        }
        autoPlayActive = false;
    }

    function reset() {
        autoPlayActive = false;
    }

    return {
        start,
        stop,
        reset,
        get autoPlayActive() {
            return autoPlayActive;
        },
    };
});
