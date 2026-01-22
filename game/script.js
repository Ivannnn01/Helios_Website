// --- INITIAL STATE ---
const basket = document.querySelector("#basket");
const scoreboard = document.querySelector("#scoreboard");
const liveboard = document.querySelector("#lives")
let basketX = window.innerWidth / 2;
let score = 0;
let lives = 5;

// --- BASKET MOVEMENT ---
window.addEventListener("keydown", (event) => {
    // Boundary checks to keep basket on screen
    if (event.key === "ArrowLeft" && basketX > 0) {
        basketX -= 30;
    } else if (event.key === "ArrowRight" && basketX < window.innerWidth - 100) {
        basketX += 30;
    }
    
    // Update the visual position
    basket.style.left = basketX + "px";
});

// --- HORSE SPAWNING FACTORY ---
function spawnHorse() {
    const horse = document.createElement("img");
    horse.src = "horseicon.png";
    horse.className = "falling-horse";
    
    // 1. Randomize X
    let horseX = Math.floor(Math.random() * (window.innerWidth - 60));
    horse.style.left = horseX + "px";
    
    // 2. SET POSITION BEFORE APPENDING (Prevents blinking)
    let horseY = -100; 
    horse.style.top = horseY + "px";
    
    // --- INDIVIDUAL GRAVITY LOOP ---
    const fallTimer = setInterval(() => {
        horseY += 5; // Speed of gravity
        horse.style.top = horseY + "px";

        // COLLISION DETECTION (Logic check)
        // Checks if horse is at basket height AND horizontally aligned
        const basketTop = window.innerHeight - 120; 
        if (horseY > basketTop && Math.abs(horseX - basketX) < 70) {
            score++;
            scoreboard.innerText = "Score: " + score;
            clearInterval(fallTimer); // Stop the timer for this horse
            horse.remove(); // Remove the horse from the screen
        }

        // CLEANUP (If player misses)
        if (horseY > window.innerHeight) {
            clearInterval(fallTimer);
            horse.remove();
            console.log(lives);
            lives--;
            liveboard.innerText = "Lives: "+ lives;
        }

    }, 20); // 50 updates per second
}

// --- START SPAWNING HORSES ---
// Spawns a new horse every 1.2 seconds
setInterval(spawnHorse, 1200);
