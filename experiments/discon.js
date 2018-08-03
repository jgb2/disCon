var preloadItems = ["car", "truck", "train", "bus", "airplane", "boat", "strawberry", "apple", "banana", "grapes", "orange", "melon", "dog", "cat", "horse", "bear", "cow", "monkey", "bottle", "cup", "bowl", "box", "plate", "glass", "bed", "chair", "table", "closet", "drawer", "sofa", "lamp", "shoes", "socks", "pants","shirt", "jacket", "dress", "N1_vehicles", "N1_fruits", "N1_mammals", "N1_containers", "N1_furniture", "N1_clothes", "N2_vehicles", "N2_fruits", "N2_mammals", "N2_containers", "N2_furniture", "N2_clothes", "N3_vehicles", "N3_fruits", "N3_mammals", "N3_containers", "N3_furniture", "N3_clothes", "bread", "tv", "pencil"];

var images = new Array();
for (i = 0; i < preloadItems.length; i++) {
    images[i] = new Image();
    images[i].src = "images/" + preloadItems[i] + ".png";
}

var backgroundImages = new Array();
for (i = 1; i <= 10; i++) {
    backgroundImages[i] = new Image();
    backgroundImages[i].src = "images/backgrounds/back" + i + ".jpg";
}

$("#button").click(function() {
    //disable accept button if in turk preview mode
    if (turk.previewMode) {
        showSlide("instructions");
        alert("Please accept HIT to view");
    } else {
        showSlide('introAll')
    }
});

function showSlide(id) {
    // Hide all slides
    $(".slide").hide();
    // Show just the slide we want to show
    $("#"+id).show();
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function showAgent(id, orient) {
    $(".agent").hide();
    $(".agent_transition").hide();
    $("#"+id+"_"+orient).show();
}

function sourceRightItem(a) {
    document.getElementById("item_r").src=a;
}

function showRightItem() {
    document.getElementById('item_r').style.visibility='visible';
}

function hideRightItem() {
    document.getElementById('item_r').style.visibility='hidden';
}

function sourceMiddleItem(a) {
    document.getElementById("item_m").src=a;
}

function showMiddleItem() {
    document.getElementById('item_m').style.visibility='visible';
}

function hideMiddleItem() {
    document.getElementById('item_m').style.visibility='hidden';
}

function sourceLeftItem(a) {
    document.getElementById("item_l").src=a;
}

function showLeftItem() {
    document.getElementById('item_l').style.visibility='visible';
}

function hideLeftItem() {
    document.getElementById('item_l').style.visibility='hidden';
}

function sourceSound(c) {
    document.getElementById("sound").src=c;
}

function playSound() {
    document.getElementById("sound").play();
}

function background(x) {
    document.getElementById("background").src=x;
}

function background2(x) {
    document.getElementById("background2").src=x;
}

function shuffleProperties(obj) {
    var new_obj = {};
    var keys = getKeys(obj);
    shuffle(keys);
    for (var key in keys){
        if (key == "shuffle") continue; // skip our prototype method
        new_obj[keys[key]] = obj[keys[key]];
    }
    return new_obj;
}

function getKeys(obj){
    var arr = new Array();
    for (var key in obj)
        arr.push(key);
    return arr;
}

showSlide("instructions");

var slides = [1, 2, 3, 4, 5, 6, "choice"]

var trials = [0, 1, 2, 3, 4, 5]

var trialType = shuffle(["preference", "statistical"])

var currTrialType = trialType[0];

var backgrounds = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

var vehiclesF = shuffle(["car", "truck", "train", "bus", "airplane", "boat"])
var fruitsF = shuffle(["strawberry", "apple", "banana", "grapes", "orange", "melon"])
var mammalsF = shuffle(["dog", "cat", "horse", "bear", "cow", "monkey"])
var containersF = shuffle(["bottle", "cup", "bowl", "box", "plate", "glass"])
var furnitureF = shuffle(["bed", "chair", "table", "closet", "drawer", "sofa", "lamp"])
var clothesF = shuffle(["shoes", "socks", "pants","shirt", "jacket", "dress"])

var vehiclesN = shuffle(["N1_vehicles", "N2_vehicles", "N3_vehicles"])
var fruitsN = shuffle(["N1_fruits", "N2_fruits", "N3_fruits"])
var mammalsN = shuffle(["N1_mammals", "N2_mammals", "N3_mammals"])
var containersN = shuffle(["N1_containers", "N2_containers", "N3_containers"])
var furnitureN = shuffle(["N1_furniture", "N2_furniture", "N3_furniture"])
var clothesN = shuffle(["N1_clothes", "N2_clothes", "N3_clothes"])

var allFamiliar = {
    vehicles: vehiclesF,
    fruits: fruitsF,
    mammals: mammalsF,
    containers: containersF,
    furniture: furnitureF,
    clothes: clothesF
}

var allNovel = {
    vehicles: vehiclesN,
    fruits: fruitsN,
    mammals: mammalsN,
    containers: containersN,
    furniture: furnitureN,
    clothes: clothesN
}

// map of category names to category arrays for familiar items
var familiarItems = shuffleProperties(allFamiliar);

// map of category names to category arrays for novel items
var novelItems = shuffleProperties(allNovel);

var categoryNames = getKeys(familiarItems);

var trackRepeats = new Map();

for (i=0; i < categoryNames.length; i++) {
    trackRepeats.set(categoryNames[i], 3); 
}

function checkCategory (category) {
    if (trackRepeats.get(category) > 0) {
        return true;
    } else {
        return false;
    }
}

//names of all possible targets, also orderedTargetNames1
var posTargetNames = shuffle(categoryNames);

//arrays of all possible targets, in order
var targetsF = new Array();

for (var nTarget = 0; nTarget < posTargetNames.length; nTarget++) {
    targetsF.push(familiarItems[posTargetNames[nTarget]].slice())
    shuffle(targetsF[nTarget]);
}

var targetsF2 = new Array();

var posTargetNames2 = posTargetNames.slice();

var orderedTargetNames2 = new Array();

function orderTargetsF2 (posTargetNames2, posTargetNames) {
    var tempPosTargetNames2 = posTargetNames2.slice();
    var tempPosTargetNames = posTargetNames.slice();
    orderTargetsF2Helper(tempPosTargetNames2, tempPosTargetNames, posTargetNames2, posTargetNames);
}

function orderTargetsF2Helper (tempPosTargetNames2, tempPosTargetNames, posTargetNames2,                               posTargetNames) {
    if(tempPosTargetNames2.length == 1) {
        if (tempPosTargetNames2[0] != tempPosTargetNames[0]
            && checkCategory(tempPosTargetNames2[0])) {
            targetsF2.push(shuffle(familiarItems[tempPosTargetNames2[0]].slice()));
            orderedTargetNames2.push(tempPosTargetNames2[0]);
            trackRepeats[tempPosTargetNames2[0]]--;
        } else {
            targetsF2 = [];
            tempPosTargetNames2 = posTargetNames2.slice();
            tempPosTargetNames = posTargetNames.slice();
        }
        return;
    } else {
        if (tempPosTargetNames2[0] != tempPosTargetNames[0] 
            && checkCategory(tempPosTargetNames2[0])) {
            targetsF2.push(shuffle(familiarItems[tempPosTargetNames2[0]].slice()));
            orderedTargetNames2.push(tempPosTargetNames2[0]);
            tempPosTargetNames2.shift();
            tempPosTargetNames.shift();
            trackRepeats[posTargetNames2[0]]--;
        } else {
            var temp = tempPosTargetNames2.shift();
            tempPosTargetNames2.push(temp);
        }
        orderTargetsF2Helper(tempPosTargetNames2, tempPosTargetNames, posTargetNames2,                       posTargetNames);
    }
}

while (targetsF2.length < 6) {
    orderTargetsF2(posTargetNames2, posTargetNames);
}

var targetsF3 = new Array();

var posTargetNames3 = posTargetNames.slice();

var orderedTargetNames3 = new Array();

function orderTargetsF3 (posTargetNames3, orderedTargetNames2, posTargetNames) {
    var tempPosTargetNames3 = posTargetNames3.slice();
    var tempPosTargetNames2 = orderedTargetNames2.slice();
    var tempPosTargetNames = posTargetNames.slice();
    orderTargetsF3Helper (tempPosTargetNames3, tempPosTargetNames2, tempPosTargetNames,                       posTargetNames3, orderedTargetNames2, posTargetNames);
}

function orderTargetsF3Helper (tempPosTargetNames3, tempPosTargetNames2,                                                tempPosTargetNames, posTargetNames3, orderedTargetNames2,                                posTargetNames) {
    if(tempPosTargetNames3.length == 1) {
        if (tempPosTargetNames2[0] != tempPosTargetNames[0]
            && tempPosTargetNames3[0] != tempPosTargetNames2[0]
            && checkCategory(tempPosTargetNames3[0])) {
            targetsF2.push(shuffle(familiarItems[tempPosTargetNames3[0]].slice()));
            orderedTargetNames3.push(tempPosTargetNames3[0]);
            trackRepeats[tempPosTargetNames3[0]]--;
        } else {
            targetsF3 = [];
            tempPosTargetNames3 = posTargetNames3.slice();
            tempPosTargetNames2 = orderedTargetNames2.slice();
            tempPosTargetNames = posTargetNames.slice();
        }
        return;
    } else {
        if (tempPosTargetNames3[0] != tempPosTargetNames[0] 
            && tempPosTargetNames3[0] != tempPosTargetNames2[0]
            && checkCategory(tempPosTargetNames3[0])) {
            targetsF3.push(shuffle(familiarItems[tempPosTargetNames3[0]].slice()));
            orderedTargetNames3.push(tempPosTargetNames3[0]);
            tempPosTargetNames3.shift();
            tempPosTargetNames2.shift();
            tempPosTargetNames.shift();
            trackRepeats[posTargetNames3[0]]--;
        } else {
            var temp = tempPosTargetNames3.shift();
            tempPosTargetNames3.push(temp);
        }
        orderTargetsF3Helper (tempPosTargetNames3, tempPosTargetNames2,                                       tempPosTargetNames, posTargetNames3, orderedTargetNames2,                       posTargetNames);
    }
}

while (targetsF3.length < 6) {
    orderTargetsF3 (posTargetNames3, orderedTargetNames2, posTargetNames);
}

// array of category names for each trial, to create trainingDist
// [[3 cats used in trial 1], [3 cats used in trial 2], ...]
var trialTargets = new Array();

for (var nTrial = 0; nTrial < trials.length; nTrial++) {
    trialTargets.push([]);
    trialTargets[nTrial].push(posTargetNames[nTrial]);
    trialTargets[nTrial].push(orderedTargetNames2[nTrial]);
    trialTargets[nTrial].push(orderedTargetNames3[nTrial]);
}

var trialFamiliarItems = new Array();

for (nTrial = 0; nTrial < trials.length; nTrial++) {
    var familiarItemsMap = new Map();
    familiarItemsMap.set(trialTargets[nTrial][0], targetsF[nTrial]);
    familiarItemsMap.set(trialTargets[nTrial][1], targetsF2[nTrial]);
    familiarItemsMap.set(trialTargets[nTrial][2], targetsF3[nTrial]);
    trialFamiliarItems.push(familiarItemsMap);
}

var posDist = shuffle([[4, 2, 0], [6, 0, 0], [2, 2, 2], [4, 2, 0], [6, 0, 0], [2, 2, 2]]);

//distribution for each trial
var trainingDist = new Array();

for (var i=0; i < trials.length; i++) {
    trainingDist.push([]);
    for (var j=0; j < posDist[i].length; j++) {
        for (var k=0; k < posDist[i][j]; k++) {
            trainingDist[i].push(trialTargets[i][j]);
        }
    }
    shuffle(trainingDist[i]);
}

var novelWords = shuffle(["oskot", "kepel", "tuta", "wiso", "urbe", "modi", "gazzer", "glipsa", "ticon", "toma", "zoyar", "subi"])

var posAgents = shuffle(["Bear", "Beaver", "Bunny", "Cat", "Dog", "Elephant", "Frog", "Monkey", "Mouse", "Pig", "Sheep", "Tiger"])

var trainingAgents = new Array();
for (var m=0; m < trials.length; m++) {
    trainingAgents.push(posAgents[m]);
}

function findCategory (pick) {
    for (var i = 0; i < categoryNames.length; i++) {
        var categoryArray = categoryNames[i]+"F";
        if (eval(categoryArray).includes(pick))  {
            return categoryNames[i];
        }
    }
}

var experiment = {
    slides: slides.slice(),
    trials: trials,
    currTrialType: currTrialType,

    targetsF: targetsF, 
    targetsF2: targetsF2,
    targetsF3: targetsF3,

    trialTargets: trialTargets,
    trialFamiliarItems: trialFamiliarItems,
    novelItems: novelItems,

    novelWords: novelWords, 

    posDist: posDist,
    trainingDist: trainingDist,

    trainingAgents: trainingAgents,
    backgrounds: backgrounds,

    position: [], 

    lastInputCat: "",

    data: [], 

    introAll: function() {
        showSlide("introAll");
        // statistical
        if (experiment.currTrialType == "statistical") { 
            document.getElementById("text_introAll").innerHTML = "These little animals will request things from you. You can give them something by clicking on it."
            document.getElementById("text_introAll_2").innerHTML = "First, they will name things you already know the names for. Later, they will name things you don't know the names for. Try your best to find the correct one.";
            // preference
        } else {
            document.getElementById("text_introAll").innerHTML = "These little animals like to play with their favorite things. There are always 3 things, and the animals will tell you which one is their favorite. You can give them their favorite by clicking on it. Make sure you give them the right one, because they only want to play with their favorite."
            document.getElementById("text_introAll_2").innerHTML = "First, they will ask for things you already know the names for. Later, they will name things you don't know the names for. Try your best to find out what the animals want.";
        }
    },

    intro: function () {
        background2("images/backgrounds/back" + backgrounds[0] + ".jpg");

        showSlide("transition");

        showAgent(trainingAgents[trials[0]], "transition");

        // statistical
        if (experiment.currTrialType == "statistical") { 
            document.getElementById("text_intro").innerHTML = "Hi, I'm " + trainingAgents[trials[0]] + ".";
            // preference
        } else {
            document.getElementById("text_intro").innerHTML = "Hi, I'm " + trainingAgents[trials[0]] + ". I'm looking for my favorite things.";
        }

        document.getElementById("text_transition").innerHTML = "";

        $(".agent_transition").click(experiment.train);  
    },

    train : function () {
        document.getElementById("text_correctItem").style.visibility = "hidden";

        document.getElementById("next-input").style.visibility = "hidden";        
        document.getElementById("next-novel").style.visibility = "hidden";

        $(".agent_transition").unbind("click");

        if (experiment.slides[0] == "choice") {
            experiment.choice();
            return;
        }

        experiment.position = shuffle([experiment.targetsF[0][0], experiment.targetsF2[0][0], experiment.targetsF3[0][0]]);

        background("images/backgrounds/back" + backgrounds[0] + ".jpg");

        showSlide("input");

        showAgent(trainingAgents[trials[0]], "straight");

        sourceLeftItem("images/" + experiment.position[0] + ".png");
        hideLeftItem();

        sourceMiddleItem("images/" + experiment.position[1] + ".png");
        hideMiddleItem();

        sourceRightItem("images/" + experiment.position[2] + ".png");
        hideRightItem();

        // pause for 1s before images appear
        setTimeout(function() {
            document.getElementById("text_correctItem").style.visibility = "visible";
            document.getElementById("text_correctItem").innerHTML = "Let's see...";
            showLeftItem();
            showMiddleItem();
            showRightItem();
        }, 1000);

        // pause for 1.5s before "next" button appears.
        setTimeout(function() {
            document.getElementById("next-input").style.visibility = "visible";
        }, 2500);
    },

    train2 : function() {

        document.getElementById("next-input").style.visibility = "hidden";        

        var correctCategory = trialFamiliarItems[trials[0]].get(trainingDist[trials[0]][0]);
        var correctItem = correctCategory[0];

        // statistical
        if (experiment.currTrialType == "statistical") { 
            document.getElementById("text_correctItem").innerHTML = correctItem;  
            // preference
        } else {
            document.getElementById("text_correctItem").innerHTML = "Oh cool, can you give me the " + correctItem + "?";
        }

        //        sourceSound("sounds/" + correctItem + ".mp3");
        //        playSound();


        $(".item").click(function() {
            var clickedItem = event.target;

            var pickId = event.target.id;

            if(pickId == "item_l") {
                var pick = experiment.position[0];
            } else if(pickId == "item_m") {
                var pick = experiment.position[1];
            } else if (pickId == "item_r") {
                var pick = experiment.position[2];
            }

            // compare to correct item of input
            if (pick == correctItem) {
                var correct_item = 1;
            } else {
                var correct_item = 0;
            }
            
            // stores category of the final input slide
            if (experiment.slides[0] == 6) {
                experiment.lastInputCat = findCategory(pick);
            }

            $(".item").unbind("click");
            clickedItem.style.border = '5px solid blue';

            data = {
                experiment: "distribution",
                trial: trials[0] + 1,
                trialType: currTrialType,
                agent: trainingAgents[trials[0]],
                phase: "training",
                slide: experiment.slides[0],

                distribution: posDist[trials[0]],
                target1: trialTargets[trials[0]][0],
                target2: trialTargets[trials[0]][1],
                target3: trialTargets[trials[0]][2],

                item_l: experiment.position[0],
                item_m: experiment.position[1],
                item_r: experiment.position[2],

                correctItem: correctItem,
                pick: pick,
                pickPos: pickId,
                pickCat: findCategory(pick),
                correct_item: correct_item
            }

            experiment.data.push(data);

            experiment.targetsF[0].shift();
            experiment.targetsF2[0].shift();
            experiment.targetsF3[0].shift();

            experiment.trainingDist[trials[0]].shift();

            experiment.slides.shift();

            setTimeout(function() {
                clickedItem.style.border = '0px';
                experiment.train();
            }, 1500);
        });
    },

    choice : function () {
        document.getElementById("text_correctItem").style.visibility = "hidden";

        document.getElementById("next-input").style.visibility = 'hidden';
        document.getElementById("next-novel").style.visibility = 'hidden';

        background("images/backgrounds/back" + backgrounds[0] + ".jpg");

        var targets = trialTargets[trials[0]];
        experiment.position = [];
        for (var i = 0; i < targets.length; i++) {
            experiment.position.push(experiment.novelItems[targets[i]].shift());
        }
        experiment.position = shuffle(experiment.position)

        showSlide("input"); 
        showAgent(trainingAgents[trials[0]], "straight");

        sourceLeftItem("images/" + experiment.position[0] + ".png");
        hideLeftItem();

        sourceMiddleItem("images/" + experiment.position[1] + ".png");
        hideMiddleItem();

        sourceRightItem("images/" + experiment.position[2] + ".png");
        hideRightItem();

        // pause for 1s before items appear.
        setTimeout(function() {
            document.getElementById("text_correctItem").style.visibility = "visible";
            // statistical
            if (experiment.currTrialType == "statistical") { 
                document.getElementById("text_correctItem").innerHTML = "Here are some new ones." 
                // preference
            } else {
                document.getElementById("text_correctItem").innerHTML = "Oh nice! Here are some new ones!";
            }
            showLeftItem();
            showMiddleItem();
            showRightItem();
        }, 1000);

        // pause for 1.5s before "next" button appears.
        setTimeout(function() {
            document.getElementById("next-novel").style.visibility = 'visible';
        }, 2500);
    },

    choice2 : function() {
        document.getElementById("next-novel").style.visibility = "hidden";    

        // statistical
        if (experiment.currTrialType == "statistical") { 
            document.getElementById("text_correctItem").innerHTML = novelWords[trials[0]];  
            // preference
        } else {
            document.getElementById("text_correctItem").innerHTML = "Oh cool, can you give me the " + novelWords[trials[0]] + "?";
        }

        $(".item").click(function() {
            var clickedItem = event.target;

            var pickId = event.target.id;

            if(pickId == "item_l") {
                var pick = experiment.position[0];
            } else if(pickId == "item_m") {
                var pick = experiment.position[1];
            } else if (pickId == "item_r") {
                var pick = experiment.position[2];
            }

            var pickCat = pick.substring(3);

            // compare to 1st target
            if (pickCat == trialTargets[trials[0]][0]) {
                var correct_target1 = 1;
            } else {
                var correct_target1 = 0;
            }

            // compare to 2nd target
            if (pickCat == trialTargets[trials[0]][1]) {
                var correct_target2 = 1;
            } else {
                var correct_target2 = 0;
            }
            
            if (pickCat == trialTargets[trials[0]][2]) {
                var correct_target3 = 1;
            } else {
                var correct_target3 = 0;
            }
            
            if (pickCat == experiment.lastInputCat) {
                var same_lastInput = 1;
            } else {
                var same_lastInput = 0;
            }

            $(".item").unbind("click");
            clickedItem.style.border = '5px solid blue';

            data = {
                experiment: "distribution",
                trial: trials[0] + 1,
                trialType: currTrialType,
                agent: trainingAgents[trials[0]],
                phase: "test",
                slide: experiment.slides[0],

                distribution: posDist[trials[0]],
                target1: trialTargets[trials[0]][0],
                target2: trialTargets[trials[0]][1],
                target3: trialTargets[trials[0]][2],

                item_l: experiment.position[0],
                item_m: experiment.position[1],
                item_r: experiment.position[2],

                novelWord: novelWords[trials[0]],

                pick: pick,
                pickPos: pickId,
                pickCat: pickCat, 

                correct_target1: correct_target1,
                correct_target2: correct_target2,
                correct_target3: correct_target3,
                
                lastInputCat: experiment.lastInputCat,
                same_lastInput: same_lastInput
            }
            experiment.data.push(data);
            
            experiment.lastInputCat = "";

            setTimeout(function() {
                clickedItem.style.border = '0px';
                experiment.transition();
            }, 1500);
        });
    },

    transition: function() {
        background2("images/backgrounds/back" + backgrounds[0] + ".jpg");

        showSlide("transition");
        showAgent(trainingAgents[trials[0]], "transition");

        document.getElementById("text_intro").innerHTML = "";

        document.getElementById("text_transition").innerHTML = "Thank you for playing with me!";

        experiment.trials.shift();

        if (experiment.trials.length == 0) {
            setTimeout(function() { turk.submit(experiment) }, 5000);
            showSlide("finished");
            return;
        }

        experiment.targetsF.shift();
        experiment.targetsF2.shift();
        experiment.targetsF3.shift();

        //        experiment.trialNovelItems.shift();

        experiment.backgrounds.shift();

        experiment.slides = slides.slice();

        $(".agent_transition").click(experiment.intro); 
    },
}