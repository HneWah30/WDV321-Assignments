// Load recipes from localStorage or set default
document.addEventListener("DOMContentLoaded", () => {

  let recipes = JSON.parse(localStorage.getItem("recipes")) || [
    {
      id: 1,
      name: "Pancakes",
      image: "images/pancake-recipe.jpg",
      servings: 4,
      preparationTime: "15 min",
      cookingTime: "10 min",
      difficulty: "Easy",
      ingredients: [
        { quantity: 2, unit: "cups", item: "Flour" },
        { quantity: 1, unit: "cup", item: "Milk" },
        { quantity: 2, unit: "", item: "Eggs" }
      ],
      instructions: [
        "Mix ingredients together.",
        "Cook on skillet until golden.",
        "Serve warm with syrup."
      ]
    },
    {
      id: 2,
      name: "Crockpot Chili",
      image: "https://placehold.co/150x150",
      servings: 6,
      preparationTime: "25 min",
      cookingTime: "6 hours",
      difficulty: "Medium",
      ingredients: [
        { quantity: 2, unit: "tbsp", item: "Cooking oil" },
        { quantity: 1, unit: "cup", item: "Onion" },
        { quantity: 1, unit: "cup", item: "Chopped peppers" },
        { quantity: 4, unit: "tbsp", item: "Chili powder" },
        { quantity: 1, unit: "tsp", item: "Hot chili powder (optional)" },
        { quantity: 1, unit: "lb", item: "Ground beef or chicken" },
        { quantity: 2, unit: "cans", item: "Red Beans" },
        { quantity: 2, unit: "cans", item: "Kidney Beans" },
        { quantity: 2, unit: "cans", item: "Tomato Puree" },
        { quantity: 2, unit: "cans", item: "Tomato Sauce" },
        { quantity: 1, unit: "cup", item: "Shredded cheese (optional)" },
        { quantity: 0.5, unit: "cup", item: "Sour cream (optional)" }
      ],
      instructions: [
        "Heat cooking oil in 2 quart skillet.",
        "Saute onions and peppers for 5 minutes.",
        "Add spices and stir for 30 seconds.",
        "Add meat and cook until browned.",
        "Pour into a 3 quart crockpot.",
        "Rinse beans and add to crockpot.",
        "Add tomato puree and sauce.",
        "Cover and cook on low for 6 hours.",
        "Serve topped with cheese and sour cream."
      ]
    }
  ];

  localStorage.setItem("recipes", JSON.stringify(recipes));

  const recipeList = document.getElementById("recipe-list");
  const details = document.getElementById("recipe-details");

  function displayRecipes() {
    recipeList.innerHTML = "";
    recipes.forEach(r => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${r.name}</h3>
        <img src="${r.image}" width="150" height="150" alt="${r.name}">
        <p><b>Prep:</b> ${r.preparationTime}</p>
        <p><b>Cook:</b> ${r.cookingTime}</p>
        <p><b>Difficulty:</b> ${r.difficulty}</p>
        <button data-id="${r.id}" class="view-btn">View Recipe</button>
      `;
      recipeList.appendChild(card);
    });

    document.querySelectorAll(".view-btn").forEach(btn => {
      btn.addEventListener("click", () => showRecipe(parseInt(btn.dataset.id)));
    });
  }

  function showRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;

    details.classList.remove("hidden");
    details.innerHTML = `
      <h2>${recipe.name}</h2>
      <img src="${recipe.image}" width="200" height="200" alt="${recipe.name}">
      <p><b>Servings:</b> <span id="servingCount">${recipe.servings}</span></p>
      <p><b>Prep Time:</b> ${recipe.preparationTime}</p>
      <p><b>Cook Time:</b> ${recipe.cookingTime}</p>
      <p><b>Difficulty:</b> ${recipe.difficulty}</p>

      <label>Adjust Servings:
        <select id="servingSelect">
          <option value="0.5">Half</option>
          <option value="1" selected>Normal</option>
          <option value="2">Double</option>
        </select>
      </label>

      <button id="toggleIngredients">Show Ingredients</button>
      <ul id="ingredients" class="hidden"></ul>

      <button id="toggleInstructions">Show Instructions</button>
      <ol id="instructions" class="hidden"></ol>

      <button id="closeDetails">Close</button>
    `;

    const ingList = document.getElementById("ingredients");
    const insList = document.getElementById("instructions");
    const select = document.getElementById("servingSelect");

    select.addEventListener("change", e => updateServings(recipe, e.target.value));
    document.getElementById("toggleIngredients").addEventListener("click", () => toggleIngredients(recipe, ingList));
    document.getElementById("toggleInstructions").addEventListener("click", () => toggleInstructions(recipe, insList));
    document.getElementById("closeDetails").addEventListener("click", () => details.classList.add("hidden"));
  }

  function updateServings(recipe, factor) {
    const newServings = recipe.servings * factor;
    document.getElementById("servingCount").textContent = newServings.toFixed(1);

    const ingList = document.getElementById("ingredients");
    if (!engList.classList.contains("hidden")) {
      ingList.innerHTML = recipe.ingredients.map(i =>
        `<li>${(i.quantity * factor).toFixed(2)} ${i.unit} ${i.item}</li>`
      ).join("");
    }
  }

  function toggleIngredients(recipe, list) {
    list.classList.toggle("hidden");
    list.innerHTML = !list.classList.contains("hidden")
      ? recipe.ingredients.map(i => `<li>${i.quantity} ${i.unit} ${i.item}</li>`).join("")
      : "";
  }

  function toggleInstructions(recipe, list) {
    list.classList.toggle("hidden");
    list.innerHTML = !list.classList.contains("hidden")
      ? recipe.instructions.map(s => `<li>${s}</li>`).join("")
      : "";
  }

  displayRecipes();
});
