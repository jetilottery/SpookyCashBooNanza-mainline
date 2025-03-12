define(require => {
    "use strict";
    const PIXI = require("com/pixijs/pixi");
    const msgBus = require("skbJet/component/gameMsgBus/GameMsgBus");
    const displayList = require("skbJet/componentManchester/standardIW/displayList");
    const resLib = require("skbJet/component/resourceLoader/resourceLib");
    const orientation = require("skbJet/componentManchester/standardIW/orientation");
    const OrganKey = require("game/components/OrganKey");
    const FittedText = require("skbJet/componentManchester/standardIW/components/fittedText");
    const textStyles = require("skbJet/componentManchester/standardIW/textStyles");
    const SKBeInstant = require("skbJet/component/SKBeInstant/SKBeInstant");
    const audio = require("skbJet/componentManchester/standardIW/audio");
    const autoPlay = require("skbJet/componentManchester/standardIW/autoPlay");
    const bonusTutorial = require("game/components/bonusTutorial");
    const meterData = require("skbJet/componentManchester/standardIW/meterData");
    const config = require("skbJet/componentManchester/standardIW/gameConfig");
    const gameState = require("game/components/state");
    
    require("com/gsap/TimelineLite");
    const Timeline = window.TimelineLite;

    require("com/gsap/easing/EasePack");
    const Back = window.Back;
    const Power3 = window.Power3;
    const CustomEase = require("com/gsap/easing/CustomEase");

    const wiggle = CustomEase.create("custom", "M0,0,C0,0,0,0.568,0.001,0.568,0.003,0.568,0.003,-0.745,0.005,-0.745,0.006,-0.745,0.006,0.914,0.008,0.914,0.01,0.914,0.01,-1,0.011,-1,0.013,-1,0.013,1,0.015,1,0.016,1,0.016,-1,0.018,-1,0.02,-1,0.02,1,0.021,1,0.023,1,0.023,-1,0.025,-1,0.026,-1,0.026,1,0.028,1,0.03,1,0.03,-1,0.031,-1,0.033,-1,0.033,1,0.035,1,0.036,1,0.036,-1,0.038,-1,0.04,-1,0.04,1,0.041,1,0.043,1,0.043,-1,0.045,-1,0.046,-1,0.046,1,0.048,1,0.05,1,0.05,-1,0.051,-1,0.053,-1,0.053,1,0.055,1,0.056,1,0.056,-1,0.058,-1,0.06,-1,0.06,1,0.061,1,0.063,1,0.063,-1,0.065,-1,0.066,-1,0.066,1,0.068,1,0.069,1,0.069,-1,0.071,-1,0.073,-1,0.073,1,0.074,1,0.076,1,0.076,-1,0.078,-1,0.079,-1,0.079,1,0.081,1,0.083,1,0.083,-1,0.084,-1,0.086,-1,0.086,1,0.088,1,0.089,1,0.089,-1,0.091,-1,0.093,-1,0.093,1,0.094,1,0.096,1,0.096,-1,0.098,-1,0.099,-1,0.099,1,0.101,1,0.103,1,0.103,-1,0.104,-1,0.106,-1,0.106,1,0.108,1,0.109,1,0.109,-1,0.111,-1,0.113,-1,0.113,1,0.114,1,0.116,1,0.116,-1,0.118,-1,0.119,-1,0.119,1,0.121,1,0.123,1,0.123,-1,0.124,-1,0.126,-1,0.126,1,0.128,1,0.129,1,0.129,-1,0.131,-1,0.133,-1,0.133,1,0.134,1,0.136,1,0.136,-1,0.138,-1,0.139,-1,0.139,1,0.141,1,0.143,1,0.143,-1,0.144,-1,0.146,-1,0.146,1,0.148,1,0.149,1,0.149,-1,0.151,-1,0.153,-1,0.153,1,0.154,1,0.156,1,0.156,-1,0.158,-1,0.159,-1,0.159,1,0.161,1,0.163,1,0.163,-1,0.164,-1,0.166,-1,0.166,1,0.168,1,0.169,1,0.169,-1,0.171,-1,0.173,-1,0.173,1,0.174,1,0.176,1,0.176,-1,0.178,-1,0.179,-1,0.179,1,0.181,1,0.183,1,0.183,-1,0.184,-1,0.186,-1,0.186,1,0.188,1,0.189,1,0.189,-1,0.191,-1,0.193,-1,0.193,1,0.194,1,0.196,1,0.196,-1,0.198,-1,0.199,-1,0.199,1,0.201,1,0.203,1,0.203,-1,0.204,-1,0.206,-1,0.206,1,0.208,1,0.209,1,0.209,-1,0.211,-1,0.213,-1,0.213,1,0.214,1,0.216,1,0.216,-1,0.218,-1,0.219,-1,0.219,1,0.221,1,0.223,1,0.223,-1,0.224,-1,0.226,-1,0.226,1,0.228,1,0.229,1,0.229,-1,0.231,-1,0.233,-1,0.233,1,0.234,1,0.236,1,0.236,-1,0.238,-1,0.239,-1,0.239,1,0.241,1,0.243,1,0.243,-1,0.244,-1,0.246,-1,0.246,1,0.248,1,0.249,1,0.249,-1,0.251,-1,0.253,-1,0.253,1,0.254,1,0.256,1,0.256,-1,0.258,-1,0.259,-1,0.259,1,0.261,1,0.263,1,0.263,-1,0.264,-1,0.266,-1,0.266,1,0.268,1,0.269,1,0.269,-1,0.271,-1,0.273,-1,0.273,1,0.274,1,0.276,1,0.276,-1,0.278,-1,0.279,-1,0.279,1,0.281,1,0.283,1,0.283,-1,0.284,-1,0.286,-1,0.286,1,0.288,1,0.289,1,0.289,-1,0.291,-1,0.293,-1,0.293,1,0.294,1,0.296,1,0.296,-1,0.298,-1,0.299,-1,0.3,1,0.301,1,0.303,1,0.303,-1,0.305,-1,0.306,-1,0.306,1,0.308,1,0.31,1,0.31,-1,0.311,-1,0.313,-1,0.313,1,0.315,1,0.316,1,0.316,-1,0.318,-1,0.32,-1,0.32,1,0.321,1,0.323,1,0.323,-1,0.325,-1,0.326,-1,0.326,1,0.328,1,0.33,1,0.33,-1,0.331,-1,0.333,-1,0.333,1,0.335,1,0.336,1,0.336,-1,0.338,-1,0.34,-1,0.34,1,0.341,1,0.343,1,0.343,-1,0.345,-1,0.346,-1,0.346,1,0.348,1,0.35,1,0.35,-1,0.351,-1,0.353,-1,0.353,1,0.355,1,0.356,1,0.356,-1,0.358,-1,0.36,-1,0.36,1,0.361,1,0.363,1,0.363,-1,0.365,-1,0.366,-1,0.366,1,0.368,1,0.37,1,0.37,-1,0.371,-1,0.373,-1,0.373,1,0.375,1,0.376,1,0.376,-1,0.378,-1,0.38,-1,0.38,1,0.381,1,0.383,1,0.383,-1,0.385,-1,0.386,-1,0.386,1,0.388,1,0.39,1,0.39,-1,0.391,-1,0.393,-1,0.393,1,0.395,1,0.396,1,0.396,-1,0.398,-1,0.4,-1,0.4,1,0.401,1,0.403,1,0.403,-1,0.405,-1,0.406,-1,0.406,1,0.408,1,0.41,1,0.41,-1,0.411,-1,0.413,-1,0.413,1,0.415,1,0.416,1,0.416,-1,0.418,-1,0.42,-1,0.42,1,0.421,1,0.423,1,0.423,-1,0.425,-1,0.426,-1,0.426,1,0.428,1,0.43,1,0.43,-1,0.431,-1,0.433,-1,0.433,1,0.435,1,0.436,1,0.436,-1,0.438,-1,0.44,-1,0.44,1,0.441,1,0.443,1,0.443,-1,0.445,-1,0.446,-1,0.446,1,0.448,1,0.45,1,0.45,-1,0.451,-1,0.453,-1,0.453,1,0.455,1,0.456,1,0.456,-1,0.458,-1,0.46,-1,0.46,1,0.461,1,0.463,1,0.463,-1,0.465,-1,0.466,-1,0.466,1,0.468,1,0.47,1,0.47,-1,0.471,-1,0.473,-1,0.473,1,0.475,1,0.476,1,0.476,-1,0.478,-1,0.48,-1,0.48,1,0.481,1,0.483,1,0.483,-1,0.485,-1,0.486,-1,0.486,1,0.488,1,0.49,1,0.49,-1,0.491,-1,0.493,-1,0.493,1,0.495,1,0.496,1,0.496,-1,0.498,-1,0.5,-1,0.5,1,0.501,1,0.503,1,0.503,-1,0.505,-1,0.506,-1,0.506,1,0.508,1,0.51,1,0.51,-1,0.511,-1,0.513,-1,0.513,1,0.515,1,0.516,1,0.516,-1,0.518,-1,0.52,-1,0.52,1,0.521,1,0.523,1,0.523,-1,0.525,-1,0.526,-1,0.526,1,0.528,1,0.53,1,0.53,-1,0.531,-1,0.533,-1,0.533,1,0.535,1,0.536,1,0.536,-1,0.538,-1,0.54,-1,0.54,1,0.541,1,0.543,1,0.543,-1,0.545,-1,0.546,-1,0.546,1,0.548,1,0.55,1,0.55,-1,0.551,-1,0.553,-1,0.553,1,0.555,1,0.556,1,0.556,-1,0.558,-1,0.56,-1,0.56,1,0.561,1,0.563,1,0.563,-1,0.565,-1,0.566,-1,0.566,1,0.568,1,0.57,1,0.57,-1,0.571,-1,0.573,-1,0.573,1,0.575,1,0.576,1,0.576,-1,0.578,-1,0.58,-1,0.58,1,0.581,1,0.583,1,0.583,-1,0.585,-1,0.586,-1,0.586,1,0.588,1,0.59,1,0.59,-1,0.591,-1,0.593,-1,0.593,1,0.595,1,0.596,1,0.596,-1,0.598,-1,0.6,-1,0.6,1,0.601,1,0.603,1,0.603,-1,0.605,-1,0.606,-1,0.606,1,0.608,1,0.61,1,0.61,-1,0.611,-1,0.613,-1,0.613,1,0.615,1,0.616,1,0.616,-1,0.618,-1,0.62,-1,0.62,1,0.621,1,0.623,1,0.623,-1,0.625,-1,0.626,-1,0.626,1,0.628,1,0.63,1,0.629,-1,0.631,-1,0.633,-1,0.633,1,0.634,1,0.636,1,0.636,-1,0.638,-1,0.639,-1,0.639,1,0.641,1,0.643,1,0.643,-1,0.644,-1,0.646,-1,0.646,1,0.648,1,0.649,1,0.649,-1,0.651,-1,0.653,-1,0.653,1,0.654,1,0.656,1,0.656,-1,0.658,-1,0.659,-1,0.659,1,0.661,1,0.663,1,0.663,-1,0.664,-1,0.666,-1,0.666,1,0.668,1,0.669,1,0.669,-1,0.671,-1,0.673,-1,0.673,1,0.674,1,0.676,1,0.676,-1,0.678,-1,0.679,-1,0.679,1,0.681,1,0.683,1,0.683,-1,0.684,-1,0.686,-1,0.686,1,0.688,1,0.689,1,0.689,-1,0.691,-1,0.693,-1,0.693,1,0.694,1,0.696,1,0.696,-1,0.698,-1,0.699,-1,0.699,1,0.701,1,0.703,1,0.703,-1,0.704,-1,0.706,-1,0.706,1,0.708,1,0.709,1,0.709,-1,0.711,-1,0.713,-1,0.713,1,0.714,1,0.716,1,0.716,-1,0.718,-1,0.719,-1,0.719,1,0.721,1,0.723,1,0.723,-1,0.724,-1,0.726,-1,0.726,1,0.728,1,0.729,1,0.729,-1,0.731,-1,0.733,-1,0.733,1,0.734,1,0.736,1,0.736,-1,0.738,-1,0.739,-1,0.739,1,0.741,1,0.743,1,0.743,-1,0.744,-1,0.746,-1,0.746,1,0.748,1,0.749,1,0.749,-1,0.751,-1,0.753,-1,0.753,1,0.754,1,0.756,1,0.756,-1,0.758,-1,0.759,-1,0.759,1,0.761,1,0.763,1,0.763,-1,0.764,-1,0.766,-1,0.766,1,0.768,1,0.769,1,0.769,-1,0.771,-1,0.773,-1,0.773,1,0.774,1,0.776,1,0.776,-1,0.778,-1,0.779,-1,0.779,1,0.781,1,0.783,1,0.783,-1,0.784,-1,0.786,-1,0.786,1,0.788,1,0.789,1,0.789,-1,0.791,-1,0.793,-1,0.793,1,0.794,1,0.796,1,0.796,-1,0.798,-1,0.799,-1,0.799,1,0.801,1,0.803,1,0.803,-1,0.804,-1,0.806,-1,0.806,1,0.808,1,0.809,1,0.809,-1,0.811,-1,0.813,-1,0.813,1,0.814,1,0.816,1,0.816,-1,0.818,-1,0.819,-1,0.819,1,0.821,1,0.823,1,0.823,-1,0.824,-1,0.826,-1,0.826,1,0.828,1,0.829,1,0.829,-1,0.831,-1,0.833,-1,0.833,1,0.834,1,0.836,1,0.836,-1,0.838,-1,0.839,-1,0.839,1,0.841,1,0.843,1,0.843,-1,0.844,-1,0.846,-1,0.846,1,0.848,1,0.849,1,0.849,-1,0.851,-1,0.853,-1,0.853,1,0.854,1,0.856,1,0.856,-1,0.858,-1,0.859,-1,0.859,1,0.861,1,0.863,1,0.863,-1,0.864,-1,0.866,-1,0.866,1,0.868,1,0.869,1,0.869,-1,0.871,-1,0.873,-1,0.873,1,0.874,1,0.876,1,0.876,-1,0.878,-1,0.879,-1,0.879,1,0.881,1,0.883,1,0.883,-1,0.884,-1,0.886,-1,0.886,1,0.888,1,0.889,1,0.889,-1,0.891,-1,0.893,-1,0.893,1,0.894,1,0.896,1,0.896,-1,0.898,-1,0.899,-1,0.899,1,0.901,1,0.903,1,0.903,-1,0.904,-1,0.906,-1,0.906,1,0.908,1,0.909,1,0.909,-1,0.911,-1,0.913,-1,0.913,1,0.914,1,0.916,1,0.916,-1,0.918,-1,0.919,-1,0.919,1,0.921,1,0.923,1,0.923,-1,0.924,-1,0.926,-1,0.926,1,0.928,1,0.929,1,0.929,-1,0.931,-1,0.933,-1,0.933,1,0.934,1,0.936,1,0.936,-1,0.938,-1,0.939,-1,0.939,1,0.941,1,0.943,1,0.943,-1,0.944,-1,0.946,-1,0.946,1,0.948,1,0.949,1,0.949,-1,0.951,-1,0.953,-1,0.953,1,0.954,1,0.956,1,0.956,-1,0.958,-1,0.959,-1,0.959,1,0.961,1,0.963,1,0.963,-1,0.964,-1,0.966,-1,0.966,1,0.968,1,0.969,1,0.969,-1,0.971,-1,0.973,-1,0.973,1,0.974,1,0.976,1,0.976,-1,0.978,-1,0.979,-1,0.979,1,0.981,1,0.983,1,0.983,-1,0.984,-1,0.986,-1,0.986,1,0.988,1,0.989,1,0.989,-1,0.991,-1,0.993,-1,0.993,1,0.994,1,0.996,1,0.996,-1,0.998,-1,0.999,-1,0.999,0,1,0");
    const collectFloat = CustomEase.create("custom", "M0,0 C0,0 0,-0.052 0.076,-0.094 0.126,-0.121 0.136,-0.134 0.224,-0.146 0.318,-0.158 0.374,-0.141 0.41,-0.128 0.48,-0.102 0.487,-0.093 0.522,-0.078 0.559,-0.063 0.585,-0.04 0.617,-0.012 0.641,0.008 0.653,0.026 0.672,0.052 0.693,0.081 0.706,0.099 0.722,0.13 0.762,0.211 0.787,0.26 0.82,0.345 0.86,0.452 0.879,0.515 0.91,0.626 0.949,0.771 1,1 1,1");
    //const cashMultiFloat = CustomEase.create("custom", "M0,0,C0.012,0,0.025,0.062,0.05,0.062,0.1,0.062,0.1,-0.204,0.15,-0.204,0.2,-0.204,0.2,0.549,0.25,0.549,0.3,0.549,0.3,-0.834,0.35,-0.834,0.399,-0.834,0.399,0.984,0.449,0.984,0.499,0.984,0.499,-0.969,0.549,-0.969,0.6,-0.969,0.599,0.701,0.649,0.701,0.7,0.701,0.699,-0.33,0.749,-0.33,0.799,-0.33,0.799,0.118,0.849,0.118,0.899,0.118,0.899,-0.025,0.95,-0.025,0.974,-0.025,0.974,0,1,0");

    let pipeSpine, organSpine, whiteKeys, blackKeysSpine, cashMeterSpine, multiplierMeterSpine, collectSpine;
    const organKeyIds = ["t1", "t2", "t3", "t4", "t5", "t6", "b1", "b2", "b3", "b4", "b5", "b6"];
    const organKeyAreas = [
        new PIXI.Rectangle(-293, 110, 100, 140),
        new PIXI.Rectangle(-192, 110, 90, 140),
        new PIXI.Rectangle(-99, 110, 100, 140),
        new PIXI.Rectangle(6, 110, 100, 140),
        new PIXI.Rectangle(109, 110, 90, 140),
        new PIXI.Rectangle(205, 110, 97, 140),
        new PIXI.Rectangle(-324, 303, 108, 140),
        new PIXI.Rectangle(-212, 303, 99, 140),
        new PIXI.Rectangle(-110, 303, 110, 140),
        new PIXI.Rectangle(8, 303, 110, 140),
        new PIXI.Rectangle(122, 303, 100, 140),
        new PIXI.Rectangle(226, 303, 110, 140)
    ];
    const organPipePos = [
        {x: -320, y: -170},
        {x: -235, y: -250},
        {x: -125, y: -305},
        {x: 5, y: -375},
        {x: 135, y: -305},
        {x: 245, y: -250},
        {x: 330, y: -170}
    ];
    const organCashMeterCoords = {portrait: {x: -299, y: -601}, landscape: {x: -739, y: -351}};
    const organMultiMeterCoords = {portrait: {x: 299, y: -600}, landscape: {x: 700, y: -350}};
    const organCollectCoords = {portrait: {x: 5, y: 0}, landscape: {x: 5, y: 0}};
    const organPipeAnims = [
        "pipes/pipe_1_ANIM",
        "pipes/pipe_2_ANIM",
        "pipes/pipe_3_ANIM",
        "pipes/pipe_4_ANIM",
        "pipes/pipe_5_ANIM",
        "pipes/pipe_6_ANIM",
        "pipes/pipe_7_ANIM"
    ];
    let pipeIndex;

    let cashWinText, cashWinTextContainer, cashTotalText, multiWinText, multiWinTextContainer, multiTotalText;

    let cashWinAmount, multiWinAmount;

    let started, pressInProgress, tutorialOpen, organScenario, organProm, startingWin;

    function init() {
        pipeSpine = new PIXI.spine.Spine(resLib.spine["organBonus"].spineData);
        pipeSpine.state.timeScale = 2;
        pipeSpine.state.addListener({ 
            complete: () => {
                if(pipeSpine.state.tracks[0].animation.name === "pipes/shakeSmoke_START") {
                    pipeSpine.state.setAnimation(0, "pipes/shakeSmoke_LOOP", true);
                }
            }
        });

        organSpine = new PIXI.spine.Spine(resLib.spine["organBonus"].spineData);
        blackKeysSpine = new PIXI.spine.Spine(resLib.spine["organBonus"].spineData);        
        cashMeterSpine = new PIXI.spine.Spine(resLib.spine["organBonus"].spineData);
        multiplierMeterSpine = new PIXI.spine.Spine(resLib.spine["organBonus"].spineData);
        collectSpine = new PIXI.spine.Spine(resLib.spine["organCollectAnim"].spineData);

        whiteKeys = [];
        for(let i = 0; i < organKeyIds.length; i++) {
            whiteKeys.push(OrganKey.fromContainer(displayList.organWhiteKeys, organKeyIds[i], organKeyAreas[i]));
            whiteKeys[i].interactive = false;
        }        

        displayList.organBack.addChild(pipeSpine, organSpine);
        displayList.organBlackKeys.addChild(blackKeysSpine);

        displayList.organCashMeter.addChild(cashMeterSpine);
        displayList.organMultiplierMeter.addChild(multiplierMeterSpine);

        displayList.organCollect.addChild(collectSpine);

        cashTotalText = new FittedText("", textStyles.organCash);
        cashTotalText.maxWidth = 200;
        cashWinText = new FittedText("", textStyles.organCash);
        cashWinText.maxWidth = 200;
        cashWinTextContainer = new PIXI.Container();
        cashWinTextContainer.addChild(cashWinText);

        multiTotalText = new FittedText("1x", textStyles.organMultiplier);
        multiTotalText.maxWidth = 200;
        multiWinText = new FittedText("", textStyles.organMultiplier);
        multiWinText.maxWidth = 200;
        multiWinTextContainer = new PIXI.Container();
        multiWinTextContainer.addChild(multiWinText);

        cashTotalText.anchor.set(0.5);
        cashWinText.anchor.set(0.5);

        multiWinText.anchor.set(0.5);
        multiTotalText.anchor.set(0.5);

        displayList.organCashMeter.addChild(cashTotalText);
        displayList.organMultiplierMeter.addChild(multiTotalText);

        displayList.organMessage.addChild(cashWinTextContainer, multiWinTextContainer);

        cashMeterSpine.state.addListener({
            complete: () => {
                cashMeterSpine.state.setAnimation(0, "meters/multiplierMeters", true);
            }
        });
        cashMeterSpine.state.setAnimation(0, "meters/multiplierMeters", true);

        multiplierMeterSpine.state.addListener({
            complete: () => {
                multiplierMeterSpine.state.setAnimation(0, "meters/multiplierMeters", true);
            }    
        });
        multiplierMeterSpine.state.setAnimation(0, "meters/multiplierMeters", true);
        collectSpine.alpha = 0;

        window.organSpine = organSpine;
        window.pipeSpine = pipeSpine;
        window.whiteKeys = whiteKeys;
        started = false;

        orientationChanged();
        msgBus.subscribe("GameSize.OrientationChange", orientationChanged);
        msgBus.subscribe("OrganKey.Press", onOrganKeyPress);
        msgBus.subscribe("Bonus.RevealAllStarted", onRevealAll);
        msgBus.subscribe("Bonus.RevealAllStopped", onStopRevealAll); //This has to be last on the subscriber queue. UI.updateButtons was a mistake

        msgBus.subscribe("Bonus.TutorialOpened", () => {
            msgBus.publish("OrganKey.CancelIdle");
            tutorialOpen = true;
            displayList.organWhiteKeys.interactiveChildren = false; 
        });
        msgBus.subscribe("Bonus.TutorialClosed", () => {
            tutorialOpen = false;
            if(autoPlay.enabled) {
                onRevealAll();
            } else {
                msgBus.publish("OrganKey.Idle");
                displayList.organWhiteKeys.interactiveChildren = true;
            }
        });

        cashTotalText.maxWidth = 200;
        cashWinText.maxWidth = 200;
        multiWinText.maxWidth = 200;
        multiTotalText.maxWidth = 200;

        this.reset();
    }

    function onRevealAll() {
        if(started) {
            //disable interaction
            displayList.organWhiteKeys.interactiveChildren = false; 
            displayList.autoPlayStartButton.enabled = false;

            //reveal one unpressed key if not already doing so
            if(!pressInProgress) {
                let unPressed = whiteKeys.filter(key => !key.pressed);
                msgBus.publish("OrganKey.AutoPress", { keyId: unPressed[Math.floor(Math.random() * unPressed.length)].keyId });    
            }        
        }
    }

    function onStopRevealAll() {
        _onStopRevealAll();
        msgBus.subscribe("UI.updateButtons", _onStopRevealAll);
    }

    function _onStopRevealAll() {
        if(gameState.activeGame === "organBonus") {
            displayList.helpButton.enabled = false;
        }
        msgBus.unsubscribe("UI.updateButtons", _onStopRevealAll);
    }

    function enableAutoPlay() {
        const autoPlayInUse = SKBeInstant.config.autoRevealEnabled && (config.toggleAutoPlay || !autoPlay.enabled);
        msgBus.publish("UI.updateButtons", {
            autoPlay: { enabled: autoPlayInUse, visible: SKBeInstant.config.autoRevealEnabled },
            help: { enabled: !autoPlay.enabled, visible: !autoPlay.enabled }
        });
        msgBus.publish("IXFConsole.enableAll");
        msgBus.unsubscribe("Bonus.TutorialClosed", enableAutoPlay);
    }

    async function startBonus() {
        msgBus.subscribe("Bonus.TutorialClosed", enableAutoPlay);
        
        if(!autoPlay.enabled && !tutorialOpen) {
            msgBus.publish("OrganKey.Idle");
        }

        new Timeline({})
            .to(displayList.organTitle, 0.5, {alpha: 0}, 0)
            .to(displayList.organBack, 0.5, {alpha: 1}, 0)
            .to(displayList.organWhiteKeys, 0.5, {alpha: 1}, 0)
            .to(displayList.organBlackKeys, 0.5, {alpha: 1}, 0)
            .to(displayList.organCashMeter, 0.5, {alpha: 1}, 0.25)
            .to(displayList.organMultiplierMeter, 0.5, {alpha: 1}, 0.25)
            .call(() => { displayList.organBonus.interactiveChildren = true; }, null, 1);

        started = true;
        startingWin = meterData.win;

        bonusTutorial.show();

        for(let i = 0; i < organKeyIds.length; i++) {
            whiteKeys[i].interactive = true;
        }
        displayList.organWhiteKeys.interactiveChildren = false;
        await new Promise(resolve => {
            organProm = resolve;
        });
        msgBus.unsubscribe("Game.AutoPlayStop", onStopRevealAll);
    }

    async function onOrganKeyPress() {
        pressInProgress = true;
        displayList.organWhiteKeys.interactiveChildren = false;
        const nextData = organScenario.shift();

        msgBus.publish("UI.updateButtons", {
            help: false
        });
        msgBus.publish("IXFConsole.disableAll");

        if(nextData === "X") { //collect
            await collectWin();
            msgBus.publish("UI.updateButtons", {
                autoPlay: { enabled: false, visible: SKBeInstant.config.autoRevealEnabled },
                help: false
            });
            msgBus.publish("IXFConsole.disableAll");
            organProm();
        } else {
            if(typeof nextData === "number") { //cash win
                await cashWin(nextData);
            } else { //increment multiplier ("M")
                await multiplierWin();
            }
            msgBus.publish("UI.updateButtons", {
                help: true
            });
            msgBus.publish("IXFConsole.enableAll");
            pressInProgress = false;
            if(autoPlay.enabled && !tutorialOpen) {
                onRevealAll();
                // SDLX-265 check button alpha
                if(config.toggleAutoPlay && SKBeInstant.config.autoRevealEnabled) {
                    msgBus.publish("UI.updateButtons", {
                        autoPlay: true
                    });
                }
            } else {
                msgBus.publish("OrganKey.Idle");
                displayList.organWhiteKeys.interactiveChildren = true;
                enableAutoPlay();
            }
        }
    }

    async function cashWin(win) {
        cashWinTextContainer.alpha = 0;
        cashWinAmount += win;
        cashWinText.text = SKBeInstant.formatCurrency(win).formattedAmount;
        
        pipeIndex = Math.floor(Math.random() * 3);
        cashWinTextContainer.x = organPipePos[pipeIndex].x;
        cashWinTextContainer.y = organPipePos[pipeIndex].y;
        cashWinTextContainer.scale.set(0.5);

        return new Promise(resolve => {
            new Timeline({
                onComplete: () => {
                    cashTotalText.maxWidth = 200;
                    meterData.win = startingWin + (multiWinAmount * cashWinAmount);
                    resolve();
                }
            })
                .call(() => {
                    pipeSpine.state.setAnimation(0, "pipes/shakeSmoke_START", false); 
                }, null, 0)
                .to(organSpine, 1.75, {pixi: {rotation: 0.5}, ease: wiggle}, 0)
                .to(blackKeysSpine, 1.75, {pixi: {rotation: 0.5}, ease: wiggle}, 0)
                .to(displayList.organWhiteKeys, 1.75, {pixi: {rotation: 0.5}, ease: wiggle}, 0)
                .to(pipeSpine, 1.5, {pixi: {rotation: 2}, ease: wiggle}, 0.25)
                .call(() => { pipeSpine.state.setAnimation(0, organPipeAnims[pipeIndex], false); }, null, 1.25)
                .call(() => audio.play("organ_swoosh", false), null, 1.25)
                .to(cashWinTextContainer, 0.1, {alpha: 1}, 1.9)
                .to(cashWinTextContainer, 0.4, {
                    pixi: {
                        y: organCollectCoords[orientation.get()].y
                    },
                    ease: Back.easeOut.config(1)
                }, 2)
                .to(cashWinTextContainer, 0.38, {
                    pixi: {
                        x: organCollectCoords[orientation.get()].x,
                        scaleX: 3,
                        scaleY: 3
                    },
                    ease: Power3.easeOut
                }, 2.1)
                .to(cashWinTextContainer, 0.6, {
                    pixi: {
                        x: organCashMeterCoords[orientation.get()].x,
                        y: organCashMeterCoords[orientation.get()].y,
                        scaleX: displayList.organCashMeter.scale.x,
                        scaleY: displayList.organCashMeter.scale.y
                    },
                    ease: Back.easeIn.config(1)
                }, 2.7)
                .call(() => cashMeterSpine.state.setAnimation(0, "meters/meterUpdate", false), null, 3.1)
                .to(cashWinTextContainer, 0.3, {alpha: 0}, 3.3)
                .call(() => cashTotalText.text = SKBeInstant.formatCurrency(cashWinAmount).formattedAmount, null, 3.3)
                .to(cashTotalText, 0.125, {pixi: {scaleX: 1.8, scaleY: 1.8}, alpha: 1}, 3.3)
                .call(() => audio.playSequential("organ_cash", false), null, 3.3)
                .to(cashTotalText, 0.125, {pixi: {scaleX: 1, scaleY: 1}}, 3.425);

        });
    }

    async function multiplierWin() {
        multiWinTextContainer.alpha = 0;
        multiWinAmount++;
        multiWinText.text = "+1x";

        pipeIndex = 4 + Math.floor(Math.random() * 3);
        multiWinTextContainer.x = organPipePos[pipeIndex].x;
        multiWinTextContainer.y = organPipePos[pipeIndex].y;
        multiWinTextContainer.scale.set(0.5);

        return new Promise(resolve => {
            new Timeline({
                timeScale: 10,
                onComplete: () => {
                    multiTotalText.maxWidth = 200;
                    meterData.win = startingWin + (multiWinAmount * cashWinAmount);
                    resolve();
                }
            })
                .call(() => {
                    pipeSpine.state.setAnimation(0, "pipes/shakeSmoke_START", false);
                 }, null, 0)
                .to(organSpine, 1.75, {pixi: {rotation: 0.5}, ease: wiggle}, 0)
                .to(blackKeysSpine, 1.75, {pixi: {rotation: 0.5}, ease: wiggle}, 0)
                .to(displayList.organWhiteKeys, 1.75, {pixi: {rotation: 0.5}, ease: wiggle}, 0)
                .to(pipeSpine, 1.5, {pixi: {rotation: 2}, ease: wiggle}, 0.25)
                .call(() => { pipeSpine.state.setAnimation(0, organPipeAnims[pipeIndex], false); }, null, 1.25)
                .call(() => audio.play("organ_swoosh", false), null, 1.25)
                .to(multiWinTextContainer, 0.1, {alpha: 1}, 1.9)
                .to(multiWinTextContainer, 0.4, {
                    pixi: {
                        y: organCollectCoords[orientation.get()].y,
                    },
                    ease: Back.easeOut.config(1)
                }, 2)
                .to(multiWinTextContainer, 0.38, {
                    pixi: {
                        x: organCollectCoords[orientation.get()].x,
                        scaleX: 3,
                        scaleY: 3
                    },
                    ease: Power3.easeOut
                }, 2.1)
                .to(multiWinTextContainer, 0.6, {
                    pixi: {
                        x: organMultiMeterCoords[orientation.get()].x,
                        y: organMultiMeterCoords[orientation.get()].y,
                        scaleX: displayList.organMultiplierMeter.scale.x,
                        scaleY: displayList.organMultiplierMeter.scale.y
                    },
                    ease: Back.easeIn.config(1)
                }, 2.7)
                .call(() => multiplierMeterSpine.state.setAnimation(0, "meters/meterUpdate", false), null, 3.1)
                .call(() => multiTotalText.text = multiWinAmount + "x", null, 3.3)
                .to(multiWinTextContainer, 0.3, {alpha: 0}, 3.3)
                .to(multiTotalText, 0.125, {pixi: {scaleX: 1.8, scaleY: 1.8}, alpha: 1}, 3.3)
                .call(() => audio.play("organ_multi", false), null, 3.3)
                .to(multiTotalText, 0.125, {pixi: {scaleX: 1, scaleY: 1}}, 3.425);
        });
    }

    async function collectWin() {
        displayList.bonusWinPlaqueOrganMulti.text = multiTotalText.text;
        displayList.bonusWinPlaqueOrganCash.text = cashTotalText.text;
        displayList.bonusWinPlaqueOrganValue.text = SKBeInstant.formatCurrency(multiWinAmount * cashWinAmount).formattedAmount;
        displayList.bonusWinPlaqueOrganValue.maxWidth = 490;
        displayList.bonusWinPlaqueOrganCash.maxWidth = 260;

        return new Promise(resolve => {
            new Timeline({
                onComplete: () => {
                    meterData.win = startingWin + (multiWinAmount * cashWinAmount);
                    resolve();
                }
            })
                .call(() => {
                    pipeSpine.state.setAnimation(0, "pipes/shakeSmoke_START", false);
                }, null, 0)
                .to(organSpine, 1.75, {pixi: {rotation: 0.5}, ease: wiggle}, 0)
                .to(blackKeysSpine, 1.75, {pixi: {rotation: 0.5}, ease: wiggle}, 0)
                .to(displayList.organWhiteKeys, 1.75, {pixi: {rotation: 0.5}, ease: wiggle}, 0)
                .to(pipeSpine, 1.5, {pixi: {rotation: 2}, ease: wiggle}, 0.25)
                .call(() => { pipeSpine.state.setAnimation(0, "pipes/pipe_4_ANIM", false); }, null, 1.25)
                .call(() => audio.play("organ_swoosh", false), null, 1.25)
                .call(() => audio.play("organ_collect", false), null, 2)
                .call(() => { 
                    msgBus.publish("UI.updateButtons", {
                        autoPlay: { enabled: false, visible: SKBeInstant.config.autoRevealEnabled }
                    });
                }, null, 1.25)
                .fromTo(displayList.organCollect, 1.5, {x: 5, y: -375}, {x: organCollectCoords[orientation.get()].x, y: organCollectCoords[orientation.get()].y, ease: collectFloat}, 2)
                .fromTo(displayList.organCollect, 1.5, {pixi: {scaleX: 0.3, scaleY: 0.3}}, {pixi: {scaleX: 1, scaleY: 1}}, 2)
                .fromTo(displayList.organCollect, 0.25, {alpha: 0}, {alpha: 1}, 2)
                .call(() => {
                    collectSpine.alpha = 1;
                    collectSpine.state.setAnimation(0, "organCollectAnim", true);
                }, null, 3.5)
                .to(displayList.organCollect, 0.5, {alpha: 1}, 5.75);
        });
    }
    
    function orientationChanged() {
        const l = orientation.get() === "landscape";
        displayList.organBonus.alpha = started ? 1 : 0;
        displayList.organBonus.scale.set(l ? 0.66 : 1);
        displayList.organBonus.x = l ? 720 : 405;
        displayList.organBonus.y = l ? 335 : 720;
    }

    function populate(scenario) {
        organScenario = scenario.organBonus;
    }

    function reset() {
        displayList.organBonus.alpha = 0;
        displayList.organBack.alpha = 0;
        displayList.organWhiteKeys.alpha = 0;
        displayList.organBlackKeys.alpha = 0;
        displayList.organCashMeter.alpha = 0;
        displayList.organMultiplierMeter.alpha = 0;
        displayList.organCollect.alpha = 0;
        pipeSpine.state.setAnimation(0, "pipes/STATIC");
        organSpine.state.setEmptyAnimations(0);
        blackKeysSpine.state.setAnimation(0, "blackKeys");
        whiteKeys.forEach(key => key.reset());
        organScenario = [];
        cashWinAmount = 0;
        multiWinAmount = 1;
        organProm = undefined;
        started = false;
        cashWinText.text = "";
        cashTotalText.text = "";
        multiWinText.text = "";
        multiTotalText.text = "1x";
        displayList.organWhiteKeys.interactiveChildren = true;
        displayList.bonusWinPlaqueOrganMulti.text = "";
        displayList.bonusWinPlaqueOrganCash.text = "";
        displayList.bonusWinPlaqueOrganValue.text = "$XXXX.XX";
        startingWin = 0;
        pressInProgress = false;
    }

    return {
        init,
        startBonus,
        populate,
        reset
    };
});