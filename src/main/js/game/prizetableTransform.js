define(require => {
    const SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');
    const resources = require('skbJet/component/pixiResourceLoader/pixiResourceLoader');

    function formatPrizeValue(data) {
        var prize = SKBeInstant.formatCurrency(data.prize).formattedAmount;
        return prize.replace(" ", "\u00A0");
    }

    return data => ({
        cells: {
            prizeLevel: data.division,
            description: checkPrizeDivision(data.division), //data.division < 11 ? resources.i18n.Paytable.descriptionText1 : resources.i18n.Paytable.descriptionText2,
            prizeValue: formatPrizeValue(data), //SKBeInstant.formatCurrency(data.prize).formattedAmount,
        },
    });

    function checkPrizeDivision(value) {

        var text;

        if (value > 0 && value < 16) {
            text = resources.i18n.Paytable.descriptionText1;
        } else if (value > 15 && value < 28) {
            text = resources.i18n.Paytable.descriptionText2;
        } else {
            text = resources.i18n.Paytable.descriptionText3;
        }

        return text;
    }
});