define({
    // UI
    click: ["Click", 4],
    buy: ["Buy", 0],


    
    costMax: ["MaxBet", 0],
    ticketCostDown0: ["Minus1", 4],
    ticketCostDown1: ["Minus2", 12],
    ticketCostDown2: ["Minus3", 13],
    ticketCostUp0: ["Plus1", 5],
    ticketCostUp1: ["Plus2", 12],
    ticketCostUp2: ["Plus3", 13],

    // BaseGame
    BG_music: ["BaseGameLoop", 17],
    BG_gravePick1: ["GravestonePick1", 2],
    BG_gravePick2: ["GravestonePick2", 11],
    BG_gravePick3: ["GravestonePick3", 14],
    instantWin: ["InstantWin", 6],
    skeleton_reveal: ["Skeleton", 6],
    zombie_reveal: ["Zombie", 9],
    ghost_reveal1: ["Boo1", 7],
    ghost_reveal2: ["Boo2", 12],
    ghost_reveal3: ["Boo3", 13],
    ghost_reveal4: ["Yeah1", 8],
    ghost_reveal5: ["Yeah2", 1],
    ghost_reveal6: ["Yeah3", 3],
    
    //Bonus games
    bonus_icon1: ["BonusIcon1", 4],
    bonus_icon2: ["BonusIcon2", 15],
    bonus_icon3: ["BonusIcon3", 16],
    bonus_music: ["BonusLoop", 1],
    bonus_plaque: ["BonusEndPlaque", 4],
    bonus_swoosh: ["SparkSwoosh", 9],
    bonus_candle: ["CandleIgnite", 10],

    //Organ Bonus
    keyPress1: ["KeyPress1", 6],
    keyPress2: ["KeyPress2", 6],
    keyPress3: ["KeyPress3", 6],
    keyPress4: ["KeyPress4", 6],
    keyPress5: ["KeyPress5", 6],
    keyPress6: ["KeyPress6", 6],
    organ_multi: ["OrganMultiplier", 2],
    organ_cash1: ["OrganWin1", 3],
    organ_cash2: ["OrganWin2", 3],
    organ_cash3: ["OrganWin3", 3],
    organ_swoosh: ["NumberSwoosh", 7],
    organ_collect: ["Collect", 14],

    //Coffin Bonus
    coffin_lid: ["Lid", 6],
    coffin_shake: ["CoffinShake", 7],
    skeleton_shake: ["SkeletonShakeLoop", 8],
    ghost_swoosh1: ["Spirit1", 9],
    ghost_swoosh2: ["Spirit2", 10],
    ghost_swoosh3: ["Spirit3", 7],
    ghost_swoosh4: ["Spirit4", 6],
    ghost_swoosh5: ["Spirit5", 5],
    spirit_grow1: ["SpiritMeterGrow1", 4],
    spirit_grow2: ["SpiritMeterGrow2", 3],
    spirit_grow3: ["SpiritMeterGrow3", 2],
    spirit_win: ["SpiritMeterWin", 10],
    wheel_start: ["WheelStart", 6],
    wheel_turn: ["WheelLoop", 6],
    wheel_end: ["WheelEnd", 6],

    //Transition
    bonus_transition: ["BonusTransition", 2],
    bonus_transitionToBase: ["TransitionToBase", 3],
    bonus_scream1: ["Scream1", 5],
    bonus_scream2: ["Scream2", 5],
    bonus_scream3: ["Scream3", 5],
    
    //Result
    lightning: ["Lightning", 3],
    winTerminator: ["Win", 2],
    loseTerminator: ["Lose", 4],
    bats: ["Bats", 4]

    /*
     * Audio groups
     * A game can include multiple variations of each of these sounds. Ensure each variation starts
     * with the same name plus some kind of ordered suffix. Each time a sound group plays the next 
     * item in the group will be used.
     */

});
