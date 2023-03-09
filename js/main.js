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
    7: {
        prompt: "You find a nice tree to lean against (there are almost too many to choose from) and take a seat. You…",
        choices: [
            {
                option: "Take a look at your surroundings",
                progress: 8, 
            },
            {
                option: "Decide to keep moving forward",
                progress: 9,
            }
        ]
    },
    8: {
        prompt: "There are trees as far as you can see. The path is getting slightly overgrown. Where could this path lead? You...",
        choices: [
            {
                option: "Keep moving forward",
                progress: 9, 
            },
        ]
    },
    9: {
        prompt: "You push on as the sun dips below the trees. Fireflies wake up around you and light your path slightly. The forest seems both quieter and somehow more alive in the twilight. Up ahead you notice what appears to be a cabin. You...",
        choices: [
            {
                option: "Investigate the cabin",
                progress: 10, 
            },
            {
                option: "Keep moving",
                progress: 21,
            }
        ]
    },
    10: {
        prompt: "The cabin looks as if it has been in this forest for ages. Vines crawl up the walls and moss grows on the corners and near the ground. There is a soft glow of firelight coming from the windows of the cabin. You…",
        choices: [
            {
                option: "Knock on the door. Someone is obviously home.",
                progress: 11, 
            },
            {
                option: "Keep moving. It’s best not to bother the owner.",
                progress: 21,
            }
        ]
    },
    11: {
        prompt: "You knock on the wooden door. The sound echoes against the trees surrounding you. After a moment a small, old lady with a pinched face appears. She seems a bit flustered. You are immediately overtaken by the smell of something delicious coming from inside and realize for the first time just how hungry you are. She looks at you expectantly. You…",
        choices: [
            {
                option: "Tell her of your journey and ask to come inside",
                progress: 12, 
            },
            {
                option: "Apologize for bothering her and tell her you will be on your way",
                progress: 21,
            }
        ]
    },
    12: {
        prompt: '"You came across yellow mushrooms?!" Her eyes light up, “Please tell me you took some! They are just what my soup needs."',
        choices: [
            {
                option: "Give her the mushrooms",
                progress: 14, 
                reqItem: "mushrooms"
            },
            {
                option: "Keep the mushrooms for yourself",
                progress: 13,
                reqItem: "mushrooms"
            },
            {
                option: '“I don’t have any, I thought they were poisonous"',
                progress: 13, 
                missingItem: 'mushrooms'
            },
            {
                option: '“I’m sorry, I didn’t get any, but I can tell you where they are!”',
                progress: 15,
                missingItem: "mushrooms"
            }
        ]
    },
    13: {
        prompt: "The old lady’s face turns red. “No mushrooms, no entrance!” She slams the door in your face. You…",
        choices: [
            {
                option: "Continue down the path",
                progress: 21, 
            },
        ]
    },
    14: {
        prompt: "The old lady greedily takes the mushrooms and runs into the cabin. Almost as an afterthought she turns to you and tells you that you may enter. You…",
        choices: [
            {
                option: "Enter the cabin",
                progress: 16, 
            },
            {
                option: "Decline the offer and continue down the path",
                progress: 21,
            }
        ]
    },
    15: {
        prompt: "The old lady sighs. “I suppose my soup will be fine without them. It’s getting too late to be out there in these woods.” She turns to enter and then, almost as an afterthought, she invites you in. You…",
        choices: [
            {
                option: "Enter the cabin",
                progress: 17, 
            },
            {
                option: "Decline the offer and continue down the path",
                progress: 21,
            }
        ]
    },
    16: {
        prompt: "She runs to her pot and throws the mushrooms in. After a few stirs she takes a sip. “Perfection!” She invites you to eat with her. You…",
        choices: [
            {
                option: "Accept the food. You are starving after all.",
                progress: 18, 
            },
            {
                option: "Politely refuse",
                progress: 20,
            }
        ]
    },
    17: {
        prompt: "You follow her into the cabin. She quietly stirs the pot of soup for a moment before offering you a bowl. You…",
        choices: [
            {
                option: "Accept the food. You are starving after all.",
                progress: 19, 
            },
            {
                option: "Politely refuse",
                progress: 20,
            }
        ]
    },
    18: {
        prompt: 'As you eat you can feel the strength returning to your body. You’re unsure what is in the soup but whatever it is feels almost magical. After eating in silence, the old lady stands and grabs a lantern from her shelf. She hands it to you. “There. For the mushrooms. You best be on your way now.” You…',
        choices: [
            {
                option: "Leave and continue down the path",
                progress: 21, 
                item: "lantern"
            },
        ]
    },
    19: {
        prompt: 'As you eat you can feel the strength returning to your body. After eating in silence, the old lady stands suddenly and walks to the door. “You best be on your way now.” You…',
        choices: [
            {
                option: "Leave and continue down the path",
                progress: 21, 
            },
        ]
    },
    20: {
        prompt: 'The old lady is offended and kicks you out of the house. You…',
        choices: [
            {
                option: "Leave and continue down the path",
                progress: 21, 
            },
        ]
    },
    21: {
        prompt: "There is just enough light to see in front of you as you continue down the path. As you walk the trees become less dense around you and you can hear a stream bubbling to your right. An owl hoots in the distance. You make out a dark shape against a nearby tree. You…",
        choices: [
            {
                option: "Investigate the shape further",
                progress: 22, 
                reqItem: "lantern"
            },
            {
                option: "Investigate the shape further",
                progress: 24,
                missingItem: "lantern" 
            },
            {
                option: "Keep moving. It could be dangerous",
                progress: 25,
            }
        ]
    },
    22: {
        prompt: "You hold up the lantern to see a leather bag hanging from the lowest branch. You…",
        choices: [
            {
                option: "Leave it there and keep moving",
                progress: 25, 
            },
            {
                option: "Look inside",
                progress: 23,
            }
        ]
    },
    23: {
        prompt: "You find a sack of gold!Congratulations!",
        choices: [
            {
                option: "Keep moving",
                progress: 25,
                item: "gold" 
            },
        ]
    },
    24: {
        prompt: "It’s too dark to see. If only you had a lantern or something…",
        choices: [
            {
                option: "Keep moving",
                progress: 25,
            },
        ]
    },
    25: {
        prompt: "As the trees continue to thin out you see buildings in the distance. You have successfully made it to town, just as the first of the stars begin to shine.",
        choices: [
            {
                option: "The End! (click to start over)",
                progress: 1,
            },
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
        }else if(story[page].choices[i].missingItem){
            if(!inventory.includes(story[page].choices[i].missingItem)){
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