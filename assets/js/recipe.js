var foodTitle = document.querySelector("#recipe-title");
var foodImage = document.querySelector("#recipe-image");
var foodDescription = document.querySelector("#recipe-description");
var recipeLink = document.querySelector("#recipe-link");

function init() {
    var foodName = window.localStorage.getItem("RecipeName");
    var foodImgSrc = window.localStorage.getItem("RecipeImage");
    var foodDescriptionStuff = window.localStorage.getItem("RecipeDescription")
    var splitDesc = foodDescriptionStuff.split(",")
    var firstLetter = splitDesc[0].charAt(0);
    foodDescription.textContent = determineaOrAn(firstLetter) + " " + splitDesc[0] + " " + splitDesc[1] + " meal, typically eaten for " + splitDesc[2] + ".";
    var recipeLinkItem = window.localStorage.getItem("RecipeLink");
    recipeLink.textContent = recipeLinkItem;
    recipeLink.href = recipeLinkItem;
    foodTitle.textContent = foodName;
    foodImage.setAttribute("src", foodImgSrc);
}

function makeIngredientList(ingredients) {
    var recipeUl = document.querySelector("#recipe-list");
    var parseIngredients = JSON.parse(ingredients);
    console.log(parseIngredients);
    for (var i = 0; i < parseIngredients.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = parseIngredients[i].text;
        listItem.setAttribute("class", "recipe-li");
        recipeUl.appendChild(listItem);
    }
}

makeIngredientList(window.localStorage.getItem("RecipeIngredients"));

function determineaOrAn(startingLetter) {
    var vowels = ["a", "A", "e", "E", "i", "I", "o", "O", "u", "U"];
    var appropriateWord = "";
    for (var i = 0; i < vowels.length; i++) {
        if (startingLetter == vowels[i]) {
            appropriateWord = "An";
            return appropriateWord
        } else {
            appropriateWord = "A";
        }
    } return appropriateWord
}

init();
