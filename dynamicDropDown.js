// Store original teams
const originalTeams = ["Chiefs", "Raiders", "Cubs"];
for (let i = 0; i < originalTeams.length; i++) {
  document.write("<option value='" + originalTeams[i] + "'>" + originalTeams[i] + "</option>");
}

// Arrays
const cookies = ["Chocolate Chip Cookie", "Sugar Cookie", "Peanut Butter Cookie"];
const candies = ["M&Ms", "Baby Ruth", "Snickers"];

// Wait until DOM is ready
window.onload = function () {
  // Show selected team
  document.getElementById("teamNames").addEventListener("change", function () {
    document.getElementById("outputName").textContent = this.value;
  });

  // Add new team
  document.getElementById("addBtn").addEventListener("click", function () {
    let newTeam = document.getElementById("newTeamName").value.trim();
    if (newTeam === "") {
      alert("Please enter a team name!");
      return;
    }
    let option = document.createElement("option");
    option.value = newTeam;
    option.textContent = newTeam;
    document.getElementById("teamNames").appendChild(option);
    document.getElementById("newTeamName").value = "";
  });

  // Populate products dropdown
  function populateProducts(products) {
    let productSelect = document.getElementById("productDisplay");
    productSelect.innerHTML = "";
    let defaultOption = document.createElement("option");
    defaultOption.value = "none";
    defaultOption.text = "Select a Product";
    productSelect.appendChild(defaultOption);

    products.forEach(item => {
      let option = document.createElement("option");
      option.value = item;
      option.text = item;
      productSelect.appendChild(option);
    });
  }

  // Show selected product
  document.getElementById("productDisplay").addEventListener("change", function () {
    document.getElementById("outputProduct").textContent = this.value;
  });

  // Radio buttons
  document.getElementById("displayCookies").addEventListener("change", function () {
    if (this.checked) populateProducts(cookies);
  });

  document.getElementById("displayCandy").addEventListener("change", function () {
    if (this.checked) populateProducts(candies);
  });

  // RESET FUNCTION: Reset both dropdowns
  document.getElementById("resetBtn").addEventListener("click", function () {
    // Reset teams
    let teamSelect = document.getElementById("teamNames");
    teamSelect.innerHTML = "<option value=''>Select a team</option>";
    originalTeams.forEach(team => {
      let option = document.createElement("option");
      option.value = team;
      option.text = team;
      teamSelect.appendChild(option);
    });
    document.getElementById("outputName").textContent = "";

    // Reset products
    let productSelect = document.getElementById("productDisplay");
    productSelect.innerHTML = "<option value='none'>Select a Product</option>";
    document.getElementById("outputProduct").textContent = "";

    // Reset radios
    document.getElementById("displayCookies").checked = false;
    document.getElementById("displayCandy").checked = false;

    // Reset text field
    document.getElementById("newTeamName").value = "";
  });
};
