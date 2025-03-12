define(() => {
    let bonusData;
    return bonusData = {
        coffinBonusPrizes: [],
        coffinBonusTargets: [],
        coffinBonusNum1s: [],
        coffinBonusNum2s: [],

        reset() {
            bonusData.coffinBonusPrizes = [];
            bonusData.coffinBonusTargets = [];
            bonusData.coffinBonusNum1s = [];
            bonusData.coffinBonusNum2s = [];
        }
    };
});