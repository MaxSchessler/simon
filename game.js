const buttoncolors = ["red", "green", "blue", "yellow"];

const gamePattern = [];

const getSequence = () => {
    const randomNum = Math.floor(Math.random() * 3);
    const randomChosenColor = buttoncolors[randomNum];
    gamePattern.push(randomChosenColor);
    flash(randomChosenColor);
}

const flash = color => {
    const button = $("#" + color);
    button.toggleClass("pressed");
    new Audio(`sounds/${color}.mp3`).play();
    setTimeout(() => {
        button.toggleClass("pressed");
    }, 75);
}

$("input[type='button']").click((evt) => {
    const userChosenColor = $(evt.currentTarget).attr("id");
    userClickedPatter.push(userChosenColor);
    flash(userChosenColor);
})

$("#green").click(() => {
    console.log("clicked");
})