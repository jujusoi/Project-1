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

                recipeName.addEventListener("click", function() {
                    console.log("works"); 
                    var descriptionArray = [recipe.cuisineType, recipe.dishType, recipe.mealType]; // Create description array
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
            console.log("No recipes found."); // Console will log "No recipes found"
        }
    })
    .catch(error => {
        console.log(`Request failed with error: ${error}`); // Console will log "Request failed with error: error"
    });
}

// Event listener for form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting
    const query = document.getElementById('query-input').value; // Get the query
    searchRecipes(query); // Call the searchRecipes function
});
