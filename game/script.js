// --- INITIAL STATE ---
const basket = document.querySelector("#basket");
const scoreboard = document.querySelector("#scoreboard");
const liveboard = document.querySelector("#lives");
let basketX = window.innerWidth / 2 - 130; // Center the 260px basket
let score = 0;
let lives = 5;

// Set initial basket position
basket.style.left = basketX + "px";

// --- BASKET MOVEMENT ---
window.addEventListener("keydown", (event) => {
    const step = 40;
    // Boundary check: screen width minus the 260px basket width
    if (event.key === "ArrowLeft" && basketX > 0) {
        basketX -= step;
    } else if (event.key === "ArrowRight" && basketX < window.innerWidth - 260) {
        basketX += step;
    }
    basket.style.left = basketX + "px";
});

// --- HORSE SPAWNING ---
function spawnHorse() {
    const horse = document.createElement("img");
    horse.src = "horseicon.png";
    horse.className = "falling-horse";
    
    // Ensure 180px horse stays within screen bounds
    let horseX = Math.floor(Math.random() * (window.innerWidth - 180));
    let horseY = -200; // Start off-screen

    horse.style.left = horseX + "px";
    horse.style.top = horseY + "px";
    document.body.appendChild(horse);

    const fallTimer = setInterval(() => {
        horseY += 6; // Gravity speed
        horse.style.top = horseY + "px";

        // --- UPDATED COLLISION DETECTION ---
        // Checks if horse is at the height of the basket (lowered)
        const basketTop = window.innerHeight - 150; 
        
        // Horizontal math: Check if centers are roughly aligned
        // Comparing the left side of the horse (horseX) 
        // to the center area of the basket (basketX)
        const horseCenter = horseX + 90;
        const basketCenter = basketX + 130;
        const dist = Math.abs(horseCenter - basketCenter);

        if (horseY > basketTop && dist < 100) {
            score++;
            scoreboard.innerText = "Score: " + score;
            clearInterval(fallTimer);
            horse.remove();
        }

        // CLEANUP (If player misses)
        if (horseY > window.innerHeight) {
            clearInterval(fallTimer);
            horse.remove();
            lives--;
            liveboard.innerText = "Lives: " + lives;
            
            if (lives <= 0) {
                alert("Game Over! Score: " + score);
                location.reload();
            }
        }
    }, 20);
}

// Spawn rate
setInterval(spawnHorse, 1200);
