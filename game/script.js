const basket = document.querySelector("#basket");
const scoreboard = document.querySelector("#scoreboard");
const liveboard = document.querySelector("#lives");
let basketX = window.innerWidth / 2 - 90; // Centered for 180px width
let score = 0;
let lives = 5;

basket.style.left = basketX + "px";


const leftBtn = document.querySelector("#left-btn");
const rightBtn = document.querySelector("#right-btn");

// Function to handle the actual movement
function moveLeft() {
    if (basketX > 0) {
        basketX -= 40;
        basket.style.left = basketX + "px";
    }
}

function moveRight() {
    if (basketX < window.innerWidth - 180) {
        basketX += 40;
        basket.style.left = basketX + "px";
    }
}

// Mobile Touch Listeners
leftBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Prevents zooming/scrolling
    moveLeft();
});

rightBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveRight();
});

// Keep your existing Keydown listener but use the functions
window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveLeft();
    if (event.key === "ArrowRight") moveRight();
});

// --- BASKET MOVEMENT ---
window.addEventListener("keydown", (event) => {
    const step = 40;
    // Stops the 180px basket at the edge
    if (event.key === "ArrowLeft" && basketX > 0) {
        basketX -= step;
    } else if (event.key === "ArrowRight" && basketX < window.innerWidth - 180) {
        basketX += step;
    }
    basket.style.left = basketX + "px";
});

// --- HORSE SPAWNING ---
function spawnHorse() {
    const horse = document.createElement("img");
    horse.src = "horseicon.png";
    horse.className = "falling-horse";
    
    // Randomize X within screen bounds for a 120px horse
    let horseX = Math.floor(Math.random() * (window.innerWidth - 120));
    let horseY = -150; 

    horse.style.left = horseX + "px";
    horse.style.top = horseY + "px";
    document.body.appendChild(horse);

    const fallTimer = setInterval(() => {
        horseY += 6; 
        horse.style.top = horseY + "px";

        // --- COLLISION DETECTION ---
        // Height check: Lowered for the basket position
        const basketTop = window.innerHeight - 120; 
        
        // Horizontal distance check
        // (horseX + 60) is the center of the horse
        // (basketX + 90) is the center of the basket
        const horseCenter = horseX + 60;
        const basketCenter = basketX + 90;
        const dist = Math.abs(horseCenter - basketCenter);

        // A distance of < 70 is a fair catch for these sizes
        if (horseY > basketTop && dist < 70) {
            score++;
            scoreboard.innerText = "Score: " + score;
            clearInterval(fallTimer);
            horse.remove();
        }

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
