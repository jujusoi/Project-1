// Function to handle the recipe search
function searchRecipes(query) {
    const appId = '9267bdde';
    const appKey = '4529adbb76333a4f1081930cfc2af312';
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.count > 0) {
            console.log(data)
            
            const recipesList = document.getElementById('recipes-list');
            recipesList.innerHTML = ''; // Clear previous results
            data.hits.forEach(hit => {
                const recipe = hit.recipe;

                // Create HTML elements for the recipe details
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');

                const recipeName = document.createElement('h3');
                recipeName.textContent = recipe.label;
                recipeCard.appendChild(recipeName);

                const recipeURL = document.createElement('a');
                recipeURL.href = recipe.url;
                recipeURL.textContent = recipe.url;
                recipeCard.appendChild(recipeURL);

                const recipeImage = document.createElement('img');
                recipeImage.src = recipe.image;
                recipeCard.appendChild(recipeImage);

                const recipeIngredients = document.createElement('p');
                recipeIngredients.textContent = 'Ingredients: ' + recipe.ingredientLines.join(', ');
                recipeCard.appendChild(recipeIngredients);

                const recipeCookingTime = document.createElement('p');
                recipeCookingTime.textContent = 'Cooking Time: ' + recipe.totalTime + ' minutes';
                recipeCard.appendChild(recipeCookingTime);

                // Add the recipe card to the recipes list
                recipesList.appendChild(recipeCard);

                recipeName.addEventListener("click", function() {
                    console.log("works");
                    var descriptionArray = [recipe.cuisineType, recipe.dishType, recipe.mealType];
                    window.localStorage.setItem("RecipeName", recipe.label);
                    window.localStorage.setItem("RecipeImage", recipe.image);
                    window.localStorage.setItem("RecipeIngredients", JSON.stringify(recipe.ingredients));
                    window.localStorage.setItem("RecipeDescription", descriptionArray);
                    window.localStorage.setItem("RecipeLink", recipe.url);
                    window.localStorage.setItem("RecipeNutrients", JSON.stringify(recipe.digest));
                    window.location.replace("recipe.html");
                });
            });
        } else {
            console.log("No recipes found.");
        }
    })
    .catch(error => {
        console.log(`Request failed with error: ${error}`);
    });
}

// Event listener for form submission
document.querySelector('#searchInput').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    searchRecipes(query);
});

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
    if (window.localStorage.getItem("SavedFoods") === null) {
        return
    } else {
        determineIfSaved();
    }
};

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
            foodDescription: getDesc(),
            foodImage: document.querySelector("#recipe-image").getAttribute("src"),
            foodIngredients: parsIngredients(),
            foodNutrients: parseNutr(),
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

function determineIfSaved() {
    var compareTitle = foodTitle.textContent;
    var info = JSON.parse(window.localStorage.getItem("SavedFoods"));
    for (var i = 0; i < info.length; i++) {
        var foodName = info[i].foodName;
        if (foodName === compareTitle) {
            saveButton.setAttribute("data-activated", "yes");
            saveButton.textContent = "Remove";
        }
    }
}

function parsIngredients() {
    var parsedIngr = JSON.parse(window.localStorage.getItem("RecipeIngredients"));
    return parsedIngr;
}

function parseNutr() {
    var parsedNutr = JSON.parse(window.localStorage.getItem("RecipeNutrients"))
    return parsedNutr;
}

function getDesc() {
    var desc = window.localStorage.getItem("RecipeDescription");
    return desc;
}
