var foodTitle = document.querySelector("#recipe-title");
var foodImage = document.querySelector("#recipe-image");
var foodDescription = document.querySelector("#recipe-description");
var recipeLink = document.querySelector("#recipe-link");
var recipeNutrientList = document.querySelector("#nutrient-list");
var saveButton = document.querySelector("#save-recipe-button");

function init() {
    var foodName = window.localStorage.getItem("RecipeName");
    var foodImgSrc = window.localStorage.getItem("RecipeImage");
    var foodDescriptionStuff = window.localStorage.getItem("RecipeDescription")
    var splitDesc = foodDescriptionStuff.split(",")
    var firstLetter = splitDesc[0].charAt(0);
    foodDescription.textContent = determineaOrAn(firstLetter) + " " + splitDesc[0] + " " + splitDesc[1] + " meal, typically eaten for " + splitDesc[2] + ".";
    var recipeLinkItem = window.localStorage.getItem("RecipeLink");
    recipeLink.textContent = "Link to recipe";
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

function makeNutrientList(ingredients) {
    var parseNutrients = JSON.parse(ingredients)
    console.log(parseNutrients);

    for (var i = 0; i < parseNutrients.length; i++) {
        var newListItem = document.createElement("li");
        var nutrientLabel = parseNutrients[i].label;
        var nutrientAmount = parseNutrients[i].total;
        var nutrientUnit = parseNutrients[i].unit;

        var cutDecimals = nutrientAmount.toFixed(1);

        newListItem.textContent = nutrientLabel + ": " + cutDecimals + nutrientUnit;
        newListItem.setAttribute("class", "nutrient-li");
        recipeNutrientList.appendChild(newListItem);
    }

}

makeIngredientList(window.localStorage.getItem("RecipeIngredients"));
makeNutrientList(window.localStorage.getItem("RecipeNutrients"));

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

saveButton.addEventListener("click", saveObject);

function saveObject() {
    if (saveButton.getAttribute("data-activated") === "no") {
        saveButton.setAttribute("data-activated", "yes");
        saveButton.textContent = "Remove";
        var savedObjArray = JSON.parse(window.localStorage.getItem("SavedFoods")) || [];
        var savedObject = {
            foodName: document.querySelector("#recipe-title").textContent,
            foodDescription: document.querySelector("#recipe-description").textContent,
            foodImage: document.querySelector("#recipe-image").getAttribute("src"),
            foodIngredients: getIngr(),
            foodNutrients: getNutr(),
            foodRecipe: recipeLink.getAttribute("href")
        };
        savedObjArray.push(savedObject);
        window.localStorage.setItem("SavedFoods", JSON.stringify(savedObjArray));
    } else {
        saveButton.setAttribute("data-activated", "no");
        saveButton.textContent = "Save For Later";
        var info = JSON.parse(window.localStorage.getItem("SavedFoods"));
        var recipeTitle =  document.querySelector("#recipe-title");
        for (var i = 0; i < info.length; i++) {
            var foodName = info[i].foodName;
            console.log(foodName);
            if (foodName === recipeTitle.textContent) {
                info.splice(i, 1);
                window.localStorage.setItem("SavedFoods", JSON.stringify(info));
            }
        }
    }
}

function getIngr() {
    var ingredientList = document.querySelector("#recipe-list");
    var ingredientChildren = ingredientList.childElementCount;
    var ingredientArray = [];
    for (var i = 0; i < ingredientChildren; i++) {
        var ingredientTextContent = ingredientList.children[i].textContent;
        ingredientArray.push(ingredientTextContent);
    } return ingredientArray;
}
function getNutr() {
    var nutriList = document.querySelector("#nutrient-list");
    var nutriChildren = nutriList.childElementCount;
    var nutriArray = [];
    for (var i = 0; i < nutriChildren; i++) {
        var nutriTextContent = nutriList.children[i].textContent;
        nutriArray.push(nutriTextContent);
    } 
    return nutriArray;
}

function grabSavedObjs(saved) {
    if (saved === null) {
    }
}