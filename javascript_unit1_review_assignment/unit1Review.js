// ----------------------------------------------------------
// Dynamic Arrays Provided
// ----------------------------------------------------------
const gameTypes = ["board", "video", "tabletop", "rpg"];
const gameTypeAbb = ["b", "v", "t", "r"];

const gameDifficulty = ["Easy", "Moderate", "Difficult", "Hard"];
const gameOptions = ["Good for Kids", "Multiplayer", "Fast Play", "Long Game", "Solitaire"];

// ----------------------------------------------------------
// Create Game Class and Game Library
// ----------------------------------------------------------
class Game {
    constructor(name, type, players, difficulty, options) {
        this.name = name;
        this.type = type;
        this.players = players;
        this.difficulty = difficulty;
        this.options = options;
    }
}

const gameLibrary = {
    games: []
};

// ----------------------------------------------------------
// Populate Game Type <select>
// ----------------------------------------------------------
function loadGameTypes() {
    const select = document.getElementById("gameType");

    gameTypes.forEach((type, index) => {
        let option = document.createElement("option");
        option.value = gameTypeAbb[index];
        option.textContent = type;
        select.appendChild(option);
    });
}

// ----------------------------------------------------------
// Create Radio Buttons for Difficulty
// ----------------------------------------------------------
function loadDifficulty() {
    const field = document.querySelector("fieldset p:nth-of-type(4)");

    gameDifficulty.forEach((level) => {
        let lbl = document.createElement("label");
        let rb = document.createElement("input");

        rb.type = "radio";
        rb.name = "difficulty";
        rb.value = level;

        lbl.appendChild(rb);
        lbl.append(" " + level);

        field.appendChild(lbl);
        field.appendChild(document.createElement("br"));
    });
}

// ----------------------------------------------------------
// Create Checkboxes for Game Options
// ----------------------------------------------------------
function loadOptions() {
    const field = document.querySelector("fieldset p:nth-of-type(5)");

    gameOptions.forEach((opt) => {
        let lbl = document.createElement("label");
        let cb = document.createElement("input");

        cb.type = "checkbox";
        cb.name = "options";
        cb.value = opt;

        lbl.appendChild(cb);
        lbl.append(" " + opt);

        field.appendChild(lbl);
        field.appendChild(document.createElement("br"));
    });
}

// ----------------------------------------------------------
// VALIDATION
// ----------------------------------------------------------
function validateForm() {
    const name = document.getElementById("gameName").value.trim();
    const type = document.getElementById("gameType").value;
    const players = document.getElementById("gamePlayers").value.trim();

    const difficulty = document.querySelector("input[name='difficulty']:checked");
    const options = Array.from(document.querySelectorAll("input[name='options']:checked"))
        .map(opt => opt.value);

    // Game name request
    if (name === "" || name.length > 50) {
        alert("Game Name is required and must be less than 50 characters.");
        return false;
    }

    // Game type request
    if (type === "") {
        alert("Select a Game Type.");
        return false;
    }

    // Players selection
    let num = Number(players);
    if (isNaN(num) || num < 1 || num > 20 || !Number.isInteger(num)) {
        alert("Players must be a whole number between 1 and 20.");
        return false;
    }

    // Difficulty option
    if (!difficulty) {
        alert("Select a Difficulty Rating.");
        return false;
    }

    if (options.includes("Fast Play") && options.includes("Long Game")) {
        alert("Fast Play and Long Game cannot both be selected.");
        return false;
    }

    return {
        name,
        type,
        players: num,
        difficulty: difficulty.value,
        options
    };
}

// ----------------------------------------------------------
// Display Game Library
// ----------------------------------------------------------
function displayGameLibrary() {
    const displayArea = document.querySelector(".displayGameLibrary");

    displayArea.innerHTML = "<h3>Game Library</h3>";

    if (gameLibrary.games.length === 0) {
        displayArea.innerHTML += "<p>No games added yet.</p>";
        return;
    }

    gameLibrary.games.forEach((game, index) => {
        let div = document.createElement("div");
        div.style.border = "1px solid #333";
        div.style.padding = "10px";
        div.style.margin = "10px 0";
        div.style.background = "#fff3d6";

        div.innerHTML = `
            <strong>Game #${index + 1}</strong><br>
            Name: ${game.name}<br>
            Type: ${game.type}<br>
            Players: ${game.players}<br>
            Difficulty: ${game.difficulty}<br>
            Options: ${game.options.join(", ") || "None"}
        `;

        displayArea.appendChild(div);
    });
}

// ----------------------------------------------------------
// Form Submit Handler
// ----------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {

    // Load all dynamic content
    loadGameTypes();
    loadDifficulty();
    loadOptions();

    // Add Game
    document.querySelector("input[value='Add Game to Library']").addEventListener("click", (e) => {
        e.preventDefault();

        let formData = validateForm();
        if (!formData) return;

        // Create a new game object
        const newGame = new Game(
            formData.name,
            formData.type,
            formData.players,
            formData.difficulty,
            formData.options
        );

        console.log("New Game Object:", newGame);
        gameLibrary.games.push(newGame);
        console.log("Updated Game Library:", gameLibrary.games);

        alert("Game successfully added!");
    });

    // Display Library
    document.querySelector("input[value='Display Game Library']").addEventListener("click", (e) => {
        e.preventDefault();
        displayGameLibrary();
    });

    // Start Over — Clear everything
    document.querySelector("input[value='Start Over']").addEventListener("click", () => {
        gameLibrary.games = [];
        displayGameLibrary();
    });

    // Update copyright year
    document.querySelector("footer p").innerHTML =
        `Copyright ${new Date().getFullYear()} DMACC All rights reserved.`;
});
