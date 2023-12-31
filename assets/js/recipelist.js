let recipesData = []; // Global variable to store the recipes data

// Function to handle the recipe search
function searchRecipes(query) {
    const appId = '9267bdde'; 
    const appKey = '4529adbb76333a4f1081930cfc2af312';
    const from = 0; // Starting index change here
    const to = 25; // Ending index change here
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`; // URL with from and to parameters ^^^

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.count > 0) {
                recipesData = data.hits.map(hit => hit.recipe);
                displayRecipes(recipesData);
            } else {
                console.log("No recipes found.");
                recipesData = [];
                displayRecipes([]);
            }
        })
        .catch(error => {
            console.log(`Request failed with error: ${error}`);
        });
}

// Function to display recipes
function displayRecipes(recipes) {
    const recipesList = document.getElementById('recipeList');
    recipesList.innerHTML = ''; // Clear previous results

    recipes.forEach(recipe => {
        // Create HTML elements for the recipe details
        const columnEl = document.createElement('div');
        columnEl.classList.add('columns');

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('card');
        recipeCard.setAttribute("class", "card m-4 p-4 is-clickable");

        const recipeName = document.createElement('h3');
        recipeName.classList.add("recipe-title");
        recipeName.setAttribute("class", "mb-5 title is-6");
        recipeName.textContent = recipe.label;
        recipeCard.appendChild(recipeName);

        // Add click event listener to redirect to the recipe.html page
        const recipeImage = document.createElement('img');
        recipeImage.classList.add("recipe-image");
        recipeImage.src = recipe.image;
        recipeImage.addEventListener('click', () => {
            // Store the recipe details in session storage to pass to recipe.html
            sessionStorage.setItem('recipeDetails', JSON.stringify(recipe));
            window.location.href = 'recipe.html'; // Redirect to recipe.html
        });
        recipeCard.appendChild(recipeImage);

        // Ingredients will not be shown in the recipe list
        // You can add them to the individual recipe page (recipe.html) instead

        const recipeCookingTime = document.createElement('p');
        recipeCookingTime.classList.add('cooking-time');
        recipeCookingTime.textContent = 'Cooking Time: ' + recipe.totalTime + ' minutes';
        recipeCard.appendChild(recipeCookingTime);

        const recipeCalories = document.createElement('p');
        recipeCalories.classList.add('calories');
        recipeCalories.textContent = 'Calories: ' + Math.round(recipe.calories);
        recipeCard.appendChild(recipeCalories);

        // Add the recipe card to the recipes list
        recipesList.appendChild(recipeCard);

        recipeCard.addEventListener("click", function() {
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
}

// Event listener for form submission
document.querySelector('.search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    searchRecipes(query);
});

// Event listener for form submission
document.querySelector('.search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    searchRecipes(query);
});

// Function to filter recipes based on cooking time
function filterByCookingTime(cookingTime) {
    const filteredRecipes = recipesData.filter(recipe => recipe.totalTime <= cookingTime);
    displayRecipes(filteredRecipes);
}

// Function to filter recipes based on calories
function filterByCalories(calories) {
    const filteredRecipes = recipesData.filter(recipe => Math.round(recipe.calories) <= calories);
    displayRecipes(filteredRecipes);
}

// Event listener for "Filter Recipes" button
document.getElementById('filterButton').addEventListener('click', function() {
    const cookingTime = parseInt(document.getElementById('cookingTimeInput').value);
    const calories = parseInt(document.getElementById('caloriesInput').value);

    filterByCookingTime(cookingTime);
    filterByCalories(calories);
});

// Event listener for "Sort By Cooking Time" button
document.getElementById('sortByCookingTime').addEventListener('click', function() {
    const sortedRecipes = recipesData.slice().sort((a, b) => a.totalTime - b.totalTime);
    displayRecipes(sortedRecipes);
});

// Event listener for "Sort By Calories" button
document.getElementById('sortByCalories').addEventListener('click', function() {
    const sortedRecipes = recipesData.slice().sort((a, b) => Math.round(a.calories) - Math.round(b.calories));
    displayRecipes(sortedRecipes);
});