let recipes = JSON.parse(localStorage.getItem("recipes")) || [
    { id: 1, title: "Pancakes", ingredients: ["Flour", "Eggs"], instructions: "Mix & Cook", category: "Breakfast", tags: ["easy"], favorite: true },
    { id: 2, title: "Spaghetti", ingredients: ["Pasta", "Cheese"], instructions: "Boil & Mix", category: "Dinner", tags: ["Italian"], favorite: false }
];

function displayRecipes() {
    const list = document.getElementById("recipeList");
    list.innerHTML = "";
    recipes.forEach(recipe => {
        list.innerHTML += `
            <div class="recipe">
                <h3>${recipe.title} <span class="${recipe.favorite ? 'favorite' : ''}">❤</span></h3>
                <p><strong>Category:</strong> ${recipe.category}</p>
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
                <button onclick="editRecipe(${recipe.id})">Edit</button>
                <button onclick="deleteRecipe(${recipe.id})">Delete</button>
            </div>
        `;
    });
}

function showForm(id = null) {
    document.getElementById("recipeForm").style.display = "block";
    if (id) {
        let recipe = recipes.find(r => r.id === id);
        document.getElementById("recipeId").value = recipe.id;
        document.getElementById("title").value = recipe.title;
        document.getElementById("ingredients").value = recipe.ingredients.join(", ");
        document.getElementById("instructions").value = recipe.instructions;
        document.getElementById("category").value = recipe.category;
        document.getElementById("tags").value = recipe.tags.join(", ");
        document.getElementById("favorite").checked = recipe.favorite;
    }
}

function hideForm() { document.getElementById("recipeForm").style.display = "none"; }

function saveRecipe() {
    let id = document.getElementById("recipeId").value;
    let newRecipe = {
        id: id ? parseInt(id) : recipes.length + 1,
        title: document.getElementById("title").value,
        ingredients: document.getElementById("ingredients").value.split(","),
        instructions: document.getElementById("instructions").value,
        category: document.getElementById("category").value,
        tags: document.getElementById("tags").value.split(","),
        favorite: document.getElementById("favorite").checked
    };
    
    if (id) {
        let index = recipes.findIndex(r => r.id == id);
        recipes[index] = newRecipe;
    } else {
        recipes.push(newRecipe);
    }
    localStorage.setItem("recipes", JSON.stringify(recipes));
    hideForm();
    displayRecipes();
}

function deleteRecipe(id) {
    recipes = recipes.filter(r => r.id !== id);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    displayRecipes();
}

function editRecipe(id) { showForm(id); }

function searchRecipe() {
    let query = document.getElementById("search").value.toLowerCase();
    const list = document.getElementById("recipeList");
    list.innerHTML = "";
    recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
    ).forEach(recipe => {
        list.innerHTML += `
            <div class="recipe">
                <h3>${recipe.title} <span class="${recipe.favorite ? 'favorite' : ''}">❤</span></h3>
                <p><strong>Category:</strong> ${recipe.category}</p>
                <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
                <button onclick="editRecipe(${recipe.id})">Edit</button>
                <button onclick="deleteRecipe(${recipe.id})">Delete</button>
            </div>
        `;
    });
}

displayRecipes();