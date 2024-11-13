const countries = [
    "USA", "Canada", "Brazil", "India",
    "France", "Germany", "Japan", "Australia",
    "Mexico", "Italy", "Russia", "China",
    "USA", "Canada", "Brazil", "India",
    "France", "Germany", "Japan", "Australia",
    "Mexico", "Italy", "Russia", "China"
];

let shuffledCountries = [];
let flippedCards = [];
let matchedCards = 0;
let canFlip = true;
let moves = 0;  // Initialize move count
let timer = 0;  // Initialize timer
let timerInterval = null;  // Store the interval for the timer
let gameStarted = false;  // Track if the game has started

// Shuffle countries and create game cards
function shuffleAndSetupGame() {
    shuffledCountries = shuffle(countries);
    const grid = document.querySelector(".grid");
    grid.innerHTML = ""; // Clear the grid

    shuffledCountries.forEach((country, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.country = country;
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    });
}

// Shuffle function to randomize the country names
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Start the timer
function startTimer() {
    timer = 0; // Reset the timer
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById("timer").textContent = `Time: ${timer}s`;
    }, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);  // Stop the timer interval
}

// Flip the card when clicked
function flipCard(event) {
    if (!canFlip || event.target.classList.contains("flipped") || event.target.classList.contains("matched")) return;

    const card = event.target;
    card.textContent = card.dataset.country;
    card.classList.add("flipped");

    if (!gameStarted) {
        gameStarted = true;  // Start the game after the first click
        startTimer();  // Start the timer on first card click
    }

    flippedCards.push(card);

    // Increment the move count
    moves++;
    document.getElementById("moves").textContent = `Moves: ${moves}`;

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check if the two flipped cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.country === secondCard.dataset.country) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCards += 2;
        flippedCards = [];
        checkGameOver();
    } else {
        canFlip = false;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.textContent = "";
            secondCard.textContent = "";
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// Check if all cards are matched (game over)
function checkGameOver() {
    if (matchedCards === shuffledCountries.length) {
        stopTimer();  // Stop the timer when the game is over
        document.getElementById("result").textContent = `Congratulations! You matched all the countries in ${moves} moves and ${timer} seconds!`;
    }
}

// Initialize the game
shuffleAndSetupGame();
