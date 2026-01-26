// --- INITIAL STATE ---
const basket = document.querySelector("#basket");
const scoreboard = document.querySelector("#scoreboard");
const liveboard = document.querySelector("#lives");

let basketX = window.innerWidth / 2 - 90;
let score = 0;
let lives = 5;
let keys = {}; // Stores which buttons are currently pressed
let speedMultiplier = 1;   //increase difficulty
let drift = 5


basket.style.left = basketX + "px";

// --- MOBILE BUTTON SETUP (Galaxy Quest Style) ---
const setupBtn = (id, keyName) => {
    const el = document.getElementById(id);
    el.addEventListener("touchstart", (e) => { e.preventDefault(); keys[keyName] = true; });
    el.addEventListener("touchend", (e) => { e.preventDefault(); keys[keyName] = false; });
    // Support for mouse testing
    el.addEventListener("mousedown", () => keys[keyName] = true);
    el.addEventListener("mouseup", () => keys[keyName] = false);
};

setupBtn("leftBtn", "ArrowLeft");
setupBtn("rightBtn", "ArrowRight");

// Keyboard Listeners
window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

// --- SMOOTH MOVEMENT LOOP ---
function updateMovement() {
    const speed = 8;
    if (keys["ArrowLeft"] && basketX > 0) {
        basketX -= speed;
    }
    if (keys["ArrowRight"] && basketX < window.innerWidth - 180) {
        basketX += speed;
    }
    basket.style.left = basketX + "px";
    requestAnimationFrame(updateMovement);
}
requestAnimationFrame(updateMovement);

// --- HORSE SPAWNING ---
function spawnHorse() {
    const horse = document.createElement("img");
    horse.src = "horseicon.png";
    horse.className = "falling-horse";
    
    let horseX = Math.floor(Math.random() * (window.innerWidth - 120));
    let horseY = -150; 

    horse.style.left = horseX + "px";
    horse.style.top = horseY + "px";
    document.body.appendChild(horse);

    const fallTimer = setInterval(() => {
        horseY += 6*speedMultiplier; 
        horse.style.top = horseY + "px";

        // COLLISION DETECTION
        const basketTop = window.innerHeight - 120; 
        const horseCenter = horseX + 60;
        const basketCenter = basketX + 90;
        const dist = Math.abs(horseCenter - basketCenter);

        if (horseY > basketTop && dist < 70) {
            score++;
            scoreboard.innerText = "Score: " + score;
            
            if (score % 5 === 0) {
                speedMultiplier += 0.2
                scoreboard.style.color = "gold";
                setTimeout(() => scoreboard.style.color = "black", 500);

            if (speedMultiplier >= 1.1) {
                // Apply a small random wobble based on current drift level
                let frameDrift = (Math.random() - 0.5) * drift; 
                horseX += frameDrift;

            // Keep horse inside screen boundaries
                if (horseX < 0) horseX = 0;
                if (horseX > window.innerWidth - 120) horseX = window.innerWidth - 120;
                horse.style.left = horseX + "px";
            }

// Keep horse from drifting off-screen
if (horseX < 0) horseX = 0;
if (horseX > window.innerWidth - 120) horseX = window.innerWidth - 120;

horse.style.left = horseX + "px";

                }
            

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
                alert("Game Over! Score: " + score);
                location.reload();
            }
        }
    }, 20);
}

setInterval(spawnHorse, 1200);
