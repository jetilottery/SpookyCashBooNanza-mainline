define(require => {
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");

    function enableHelp(enabled) {
        msgBus.publish('toPlatform', { channel: 'Game', topic: 'Game.Control',  data: { name: 'howToPlay', event: 'enable', params: [enabled ? 1 : 0] } });
    }

    function enablePaytable(enabled) {
        msgBus.publish('toPlatform', { channel: 'Game', topic: 'Game.Control',  data: { name: 'paytable', event: 'enable', params: [enabled ? 1 : 0] } });
    }

    function enableAll(enabled) {
        enableHelp(enabled);
        enablePaytable(enabled);
    }

    return {
        enableHelp,
        enablePaytable,
        enableAll
    };
});