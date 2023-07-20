// Function to handle the recipe search
function searchRecipes(query) {
    const appId = '9267bdde'; 
    const appKey = '4529adbb76333a4f1081930cfc2af312';
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.count > 0) {
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
