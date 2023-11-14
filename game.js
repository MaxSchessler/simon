const buttoncolors = ["red", "green", "blue", "yellow"];

const gamePattern = [];

const getSequence = () => {
    const randomNum = Math.floor(Math.random() * 3);
    const randomChosenColor = buttoncolors[randomNum];
    gamePattern.push(randomChosenColor);
}

const flash = color => {
    const button = $("#" + color);
    button.toggleClass("pressed");
    new Audio(`sounds/${color}.mp3`).play();
    setTimeout(() => {
        button.toggleClass("pressed");
    }, 75);
}