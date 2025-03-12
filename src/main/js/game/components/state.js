define(require => {
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const gameData = require("game/data/gameData");

    const _state = {
        winning: [],
        player: [],
        coffinBonus: false,
        organBonus: false,
        activeGame: "init"
    };

    function reset() {
        _state.winning = [];
        _state.player = [];
        _state.coffinBonus = false;
        _state.organBonus = false;
        _state.activeGame = "init";
        msgBus.publish("transition.positionButtons", _state.activeGame);
    }

    msgBus.subscribe("Game.WinningNumber", index => _state.winning.push(index));
    msgBus.subscribe("Game.PlayerNumber", index => _state.player.push(index));
    msgBus.subscribe("Game.activeGame", game => {
        if(gameData.gameTypes.indexOf(game) > -1) {
            _state.activeGame = game;        
            msgBus.publish("transition.positionButtons", _state.activeGame);
        } else {
            throw new Error("invalid game! :" + String(game));
        }
    });
    msgBus.subscribe("Game.organBonus", ob => _state.organBonus = !!ob);
    msgBus.subscribe("Game.coffinBonus", cb => _state.coffinBonus = !!cb);

    return {
        get winning() {
            return {
                numbers: _state.winning,
            };
        },
        get player() {
            return _state.player;
        },
        get activeGame() {
            return _state.activeGame;
        },
        get coffinBonus() {
            return _state.coffinBonus;
        },
        get organBonus() {
            return _state.organBonus;
        },
        reset,
    };
});
