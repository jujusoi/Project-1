// Function to handle the recipe search
function searchRecipes(query) {
    const appId = '9267bdde'; // App ID
    const appKey = '4529adbb76333a4f1081930cfc2af312'; // API key
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`; // URL

    fetch(url)
    .then(response => response.json()) // Parse response
    .then(data => {
        if (data.count > 0) {
            console.log(data)
            
            const recipesList = document.getElementById('recipes-list');
            recipesList.innerHTML = ''; // Clear previous results
            data.hits.forEach(hit => {
                const recipe = hit.recipe;

                // Create HTML elements for the recipe details
                const recipeCard = document.createElement('div'); // Create recipe card
                recipeCard.classList.add('recipe-card'); // Add class

                const recipeName = document.createElement('h3'); // Create recipe name
                recipeName.textContent = recipe.label; // Add recipe name
                recipeCard.appendChild(recipeName); // Add recipe name to recipe card

                const recipeURL = document.createElement('a');// Create recipe URL
                recipeURL.href = recipe.url;// Add recipe URL
                recipeURL.textContent = recipe.url;// Add recipe URL
                recipeCard.appendChild(recipeURL);// Add recipe URL to recipe card

                const recipeImage = document.createElement('img');// Create recipe image
                recipeImage.src = recipe.image; // Add recipe image
                recipeCard.appendChild(recipeImage);// Add recipe image to recipe card

                const recipeIngredients = document.createElement('p');// Create recipe ingredients
                recipeIngredients.textContent = 'Ingredients: ' + recipe.ingredientLines.join(', ');
                recipeCard.appendChild(recipeIngredients);

                const recipeCookingTime = document.createElement('p');
                recipeCookingTime.textContent = 'Cooking Time: ' + recipe.totalTime + ' minutes';
                recipeCard.appendChild(recipeCookingTime);

                // Add the recipe card to the recipes list
                recipesList.appendChild(recipeCard);
            });
        } else {
            console.log("No recipes found."); // Console will log "No recipes found"
        }
    })
    .catch(error => {
        console.log(`Request failed with error: ${error}`); // Console will log "Request failed with error: error"
    });
}

function initSavedItems(info) {
    var saveContainer = document.querySelector("#recipeCards");
    for (var i = 0; i < info.length; i++) {
        var savedName = info[i].foodName;
        var savedImg = info[i].foodImage;

        var createDiv = document.createElement("div");
        createDiv.setAttribute("class", "column is-one-quarter");
        
        var cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card");

        var cardImgDiv = document.createElement("div");
        cardImgDiv.setAttribute("class", "card-image");

        var cardImgFig = document.createElement("figure");
        cardImgFig.setAttribute("class", "image is-4by3");

        var createImg = document.createElement("img");
        createImg.setAttribute("class", "saved-image");

        createImg.setAttribute("src", savedImg);

        var contentDiv = document.createElement("div");
        contentDiv.setAttribute("class", "card-content");

        var contentTitle = document.createElement("p");
        contentTitle.setAttribute("class", "title");
        contentTitle.textContent = savedName;
        var contentSub = document.createElement("p");
        contentSub.setAttribute("class", "subtitle");

        var createButton = document.createElement('button');
        createButton.setAttribute("class", "saved-unsaved");
        createButton.textContent = "X";

        cardImgFig.appendChild(createImg);
        cardImgDiv.appendChild(cardImgFig);
        
        contentDiv.appendChild(contentTitle);
        contentDiv.appendChild(contentSub);
        contentDiv.appendChild(createButton);

        cardDiv.appendChild(cardImgDiv);
        cardDiv.appendChild(contentDiv);

        createDiv.appendChild(cardDiv);

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

function saveStuff() {
    var info = JSON.parse(window.localStorage.getItem("SavedFoods"));
    if (info === null) {
        return
    } else {
        initSavedItems(info);
    }
}

saveStuff();

// Event listener for form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    const query = document.getElementById('query-input').value; // Get the query
    searchRecipes(query); // Call the searchRecipes function
});
