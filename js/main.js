const storyDiv   = document.getElementById('story');
const optionsDiv = document.getElementById('options');

var inventory = [];
var stats     = [];
var page      = 0;

const story = {
    0: {
        prompt: "you find a sword",
        choices: [
            {
                option: "pick it up",
                item: "sword",
                progress: 1,
            },
            {
                option: "leave it there",
                progress: 1,
            }
        ]
    },
    1: {
        prompt: "there is an enemy",
        choices: [
            {
                option: "fight it",
                item: "gold",
                reqItem: "sword",
                stat: "killed enemy",
                progress: 2
            },
            {
                option: "run away",
                progress: 2
            }
        ]
    },
    2: {
        prompt: "Did you kill it?",
        choices: [
            {
                option: "yes",
                reqStat: "killed enemy"
            },
            {
                option: "no",
            }
        ]
    }
}

function dispGame(){
    storyDiv.innerHTML   = story[page].prompt;
    optionsDiv.innerHTML = '';

    for(i=0; i<story[page].choices.length; i++){
        if(story[page].choices[i].reqItem){
            if(inventory.includes(story[page].choices[i].reqItem)){
                optionsDiv.innerHTML+= `<button onClick="subOption(${i})">${story[page].choices[i].option}</button>`
            }
        }else if(story[page].choices[i].reqStat){
            if(stats.includes(story[page].choices[i].reqStat)){
                optionsDiv.innerHTML+= `<button onClick="subOption(${i})">${story[page].choices[i].option}</button>`
            }
        }else{
            optionsDiv.innerHTML+= `<button onClick="subOption(${i})">${story[page].choices[i].option}</button>`
        }
    }
}

dispGame();

function subOption(x){
    console.log(story[page].choices[x]);
    if(story[page].choices[x].item){
        inventory.push(story[page].choices[x].item);
    }
    console.log(inventory)
    if(story[page].choices[x].stat){
        stats.push(story[page].choices[x].stat);
    }
    console.log(stats)
    page = story[page].choices[x].progress
    dispGame();
}