// --- INITIAL STATE ---
const basket = document.querySelector("#basket");
const scoreboard = document.querySelector("#scoreboard");
const liveboard = document.querySelector("#lives");
let basketX = window.innerWidth / 2 - 240; // Center the large basket initially
let score = 0;
let lives = 5;

// --- BASKET MOVEMENT ---
window.addEventListener("keydown", (event) => {
    // 480 is your basket width. This keeps it inside the screen.
    if (event.key === "ArrowLeft" && basketX > 0) {
        basketX -= 50; // Increased speed for big sprites
    } else if (event.key === "ArrowRight" && basketX < window.innerWidth - 480) {
        basketX += 50;
    }
    
    basket.style.left = basketX + "px";
});

// --- HORSE SPAWNING FACTORY ---
function spawnHorse() {
    const horse = document.createElement("img");
    horse.src = "horseicon.png";
    horse.className = "falling-horse";
    
    // Randomize X while keeping the 320px horse on screen
    let horseX = Math.floor(Math.random() * (window.innerWidth - 320));
    let horseY = -350; // Start off-screen
    
    horse.style.left = horseX + "px";
    horse.style.top = horseY + "px";

    document.body.appendChild(horse);
    
    const fallTimer = setInterval(() => {
        horseY += 8; // Slightly faster fall for large sprites
        horse.style.top = horseY + "px";

        // --- COLLISION DETECTION ---
        const basketTop = window.innerHeight - 200; 
        
        // horizontalOffset checks the distance between the left sides
        // 180 is a good "hit zone" for a 480px basket vs 320px horse
        const horizontalOffset = Math.abs(horseX - (basketX + 80)); 

        if (horseY > basketTop && horizontalOffset < 150) {
            score++;
            scoreboard.innerText = "Score: " + score;
            clearInterval(fallTimer);
            horse.remove();
        }

        // CLEANUP
        if (horseY > window.innerHeight) {
            clearInterval(fallTimer);
            horse.remove();
            lives--;
            liveboard.innerText = "Lives: " + lives;
            
            if (lives <= 0) {
                alert("Game Over! Final Score: " + score);
                location.reload(); // Restarts the game
            }
        }
    }, 20);
}

setInterval(spawnHorse, 1200);
