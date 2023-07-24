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
                })
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
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query-input').value;
    searchRecipes(query);
});


function initSavedItems(info) {
    var saveContainer = document.querySelector("#saved-container");
    for (var i = 0; i < info.length; i++) {
        var savedName = info[i].foodName;
        var savedImg = info[i].foodImage;

        var createDiv = document.createElement("div");
        createDiv.setAttribute("class", "saved-item");

        var createImg = document.createElement("img");
        createImg.setAttribute("class", "saved-image");

        var createInfoDiv = document.createElement("div");
        createInfoDiv.setAttribute("class", "saved-info");

        var createSaveTitle = document.createElement("h3");
        createSaveTitle.setAttribute("class", "saved-header");

        var createButton = document.createElement('button');
        createButton.setAttribute("class", "saved-unsaved");
        createButton.textContent = "Remove";

        createSaveTitle.textContent = savedName;
        createImg.setAttribute("src", savedImg);

        createInfoDiv.appendChild(createSaveTitle);
        createInfoDiv.appendChild(createButton);

        createDiv.appendChild(createImg);
        createDiv.appendChild(createInfoDiv);
        
        saveContainer.appendChild(createDiv);
    }
    saveContainer.addEventListener("click", function(event) {
        var target = event.target;
        var info = JSON.parse(window.localStorage.getItem("SavedFoods"));
        for (var i = 0; i < info.length; i++) {
            var recipeName = info[i].foodName;
            if (target.textContent === recipeName) {
                console.log(recipeName);

                var savedName = info[i].foodName;
                var savedImg = info[i].foodImage;
                var savedIngr = info[i].foodIngredients;
                var savedDesc = info[i].foodDescription;
                var savedLink = info[i].foodRecipe;
                var savedNutr = info[i].foodNutrients;

                window.localStorage.setItem("RecipeName", savedName);
                window.localStorage.setItem("RecipeImage", savedImg);
                window.localStorage.setItem("RecipeIngredients", JSON.stringify(savedIngr));
                window.localStorage.setItem("RecipeDescription", savedDesc);
                window.localStorage.setItem("RecipeLink", savedLink);
                window.localStorage.setItem("RecipeNutrients", JSON.stringify(savedNutr));
                window.location.replace("recipe.html");
            }
        }
    })
    saveContainer.addEventListener("click", function(event) {
        var target = event.target;
        var savedItems = JSON.parse(window.localStorage.getItem("SavedFoods"));
        var isButton = target.classList.contains('saved-unsaved');
        if (isButton) {
            var parentEle = target.parentElement;
            var savedIngrTitle = parentEle.children[0].textContent;
            for (var i = 0; i < savedItems.length; i++) {
                var compareTitle = savedItems[i].foodName;
                if (savedIngrTitle === compareTitle) {
                    savedItems.splice(i, 1);
                    window.localStorage.setItem("SavedFoods", JSON.stringify(savedItems));
                    window.location.reload();
                }
            }
        }
    })
}



initSavedItems(JSON.parse(window.localStorage.getItem("SavedFoods")));