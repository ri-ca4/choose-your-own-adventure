const storyDiv   = document.getElementById('story');
const optionsDiv = document.getElementById('options');

var inventory = [];
var page      = 1;

const story = {
    1: {
        prompt: "You find yourself deep in a forest. The sun is shining through the trees and there is a path before you. You…",
        choices: [
            {
                option: "Take a closer look at your surroundings",
                progress: 2,
            },
            {
                option: "Follow the path",
                progress: 5,
            }
        ]
    },
    2: {
        prompt: "There are trees as far as you can see. To your right you can hear birds singing and to your left you see a patch of mushrooms growing. You…",
        choices: [
            {
                option: "Investigate the mushrooms",
                progress: 3,
            },
            {
                option: "Follow the path",
                progress: 5,
            }
        ]
    },
    3: {
        prompt: "The mushrooms are small and yellow, and they smell sweet. You…",
        choices: [
            {
                option: "Take the mushrooms. They could be valuable.",
                progress: 4,
                item: "mushrooms"
            },
            {
                option: "Leave the mushrooms there. They could be poisonous.",
                progress: 5,
            }
        ]
    },
    4: {
        prompt: "A squirrel runs past you down the path, reminding you that it is time to go. You...",
        choices: [
            {
                option: "Follow the path",
                progress: 5,
            },
        ]
    },
    5: {
        prompt: "A cool breeze follows you as you stroll down the path. After some time you come to a fork in the road. The road to the left looks warm and inviting and the road to the right is covered in shade from the density of the trees surrounding it. You…",
        choices: [
            {
                option: "Take the sunlit path to the left",
                /*progress: , */
            },
            {
                option: "Take the shady path to the right",
                progress: 6,
            }
        ]
    },
    6: {
        prompt: "You can hear the wind start to pick up as it rustles the leaves in the trees. As you walk, the path grows narrower and the forest around you seems to come to life. Animals run about in the shadows and you can hear birds conversing in earnest in the trees above. After some time you begin to grow tired. You…",
        choices: [
            {
                option: "Take a break",
                progress: 7, 
            },
            {
                option: "Keep pushing forward",
                progress: 9,
            }
        ]
    },
}

function dispGame(){
    storyDiv.innerHTML   = story[page].prompt;
    optionsDiv.innerHTML = '';

    for(i=0; i<story[page].choices.length; i++){
        if(story[page].choices[i].reqItem){
            if(inventory.includes(story[page].choices[i].reqItem)){
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
    page = story[page].choices[x].progress
    dispGame();
}