document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipeForm");
  const ingredientsDiv = document.getElementById("ingredients");
  const instructionsDiv = document.getElementById("instructions");
  const errorDiv = document.getElementById("error");

  // === Add ingredient ===
  document.getElementById("addIngredient").onclick = () => {
    const group = document.createElement("div");
    group.classList.add("ingredient-group");
    group.innerHTML = `
      <input type="number" placeholder="Qty" step="any" required>
      <input type="text" placeholder="Unit" required>
      <input type="text" placeholder="Ingredient" required>
    `;
    ingredientsDiv.appendChild(group);
  };

  // === Add instruction step ===
  document.getElementById("addInstruction").onclick = () => {
    const step = document.createElement("input");
    step.type = "text";
    step.placeholder = "Instruction step";
    step.required = true;
    instructionsDiv.appendChild(step);
  };

  // === Handle form submission ===
  form.addEventListener("submit", e => {
    e.preventDefault();
    errorDiv.textContent = "";

    const name = document.getElementById("name").value.trim();

    // Handle both URL and uploaded images
    const imageInput = document.getElementById("imageFile");
    let image = "";

    if (imageInput.files.length > 0) {
      image = URL.createObjectURL(imageInput.files[0]);
    } else {
      image = document.getElementById("image").value.trim() || "https://placehold.co/150x150";
    }

    const servings = parseInt(document.getElementById("servings").value) || 1;
    const preparationTime = document.getElementById("prepTime").value.trim();
    const cookingTime = document.getElementById("cookTime").value.trim();
    const difficulty = document.getElementById("difficulty").value;

    // Required fields validation
    if (!name || !preparationTime || !cookingTime || !difficulty || servings < 1) {
      errorDiv.textContent = "⚠️ Please fill in all required fields!";
      return;
    }

    const ingredients = [...ingredientsDiv.querySelectorAll(".ingredient-group")].map(g => {
      const [qty, unit, item] = g.querySelectorAll("input");
      return {
        quantity: parseFloat(qty.value) || 0,
        unit: unit.value.trim(),
        item: item.value.trim()
      };
    });

    if (ingredients.length === 0) {
      errorDiv.textContent = "⚠️ Please add at least one ingredient.";
      return;
    }

    const instructions = [...instructionsDiv.querySelectorAll("input")]
      .map(i => i.value.trim())
      .filter(Boolean);

    if (instructions.length === 0) {
      errorDiv.textContent = "⚠️ Please add at least one instruction.";
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name,
      image,
      servings,
      preparationTime,
      cookingTime,
      difficulty,
      ingredients,
      instructions
    };

    // Save to localStorage
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    alert("✅ Recipe added successfully!");
    window.location.href = "index.html";
  });
});
