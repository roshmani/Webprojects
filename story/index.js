const readline = require("readline");
const chalk = require("chalk");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let story = {
    q: "Welcome to The Land Of Wizards! Would you like to play?",
    answers: {
        yes: {
            q:
                "You are alone in a dark forest and facing a fork in the road. Which direction do you turn?",
            answers: {
                left: {
                    q:
                        "There's a scary wizard! He asks you a tough question. What's 1+1?",
                    answers: {
                        "2": "congratulations!"
                    }
                },
                right: "This was not the right choice. Goodbye!"
            }
        },
        no: "Alright then. Enjoy your day!"
    }
};

function askQuestion(adventure) {
    rl.question(adventure.q, function(answer) {
        //checks the key in the object
        if (adventure.answers[answer]) {
            if (typeof adventure.answers[answer] == "object") {
                const newAdventure = adventure.answers[answer];
                askQuestion(newAdventure);
            } else {
                console.log(adventure.answers[answer]);
                rl.close();
            }
        } else {
            askQuestion(adventure);
        }
    });
}
function greet() {
    rl.question("Please Enter your name:", function(name) {
        if (name.length > 0) {
            console.log("Good Day!..", name);
        } else {
            greet();
        }
        askQuestion(story);
    });
}

greet();
