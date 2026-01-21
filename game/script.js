// 1. GAME SETUP
const basket = document.querySelector("#basket");
let basketX = window.innerWidth / 2; // Start basket in the middle
let score = 0;

// 2. MOVE THE BASKET (Event Listener)
window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && basketX > 0) {
        basketX -= 25;
    } else if (event.key === "ArrowRight" && basketX < window.innerWidth - 100) {
        basketX += 25;
    }
    // Update visual position
    basket.style.left = basketX + "px";
});

// 3. THE HORSE "FACTORY" (Function to spawn one horse)
function spawnHorse() {
    const horse = document.createElement("img");
    horse.src = "./image/horse_icon.png"; 
    horse.className = "falling-horse";
    
    // Random horizontal start
    let horseX = Math.floor(Math.random() * (window.innerWidth - 50));
    horse.style.left = horseX + "px";
    
    document.body.appendChild(horse);

    // Individual gravity for this specific horse
    let horseY = -50;
    const fallTimer = setInterval(() => {
        horseY += 5; // Gravity speed
        horse.style.top = horseY + "px";

        // SIMPLE COLLISION CHECK (Logic)
        // Check if horse Y is near basket Y AND horse X is near basket X
        if (horseY > window.innerHeight - 100 && Math.abs(horseX - basketX) < 60) {
            score++;
            console.log("Score: " + score);
            clearInterval(fallTimer);
            horse.remove();
        }

        // CLEANUP (If missed)
        if (horseY > window.innerHeight) {
            clearInterval(fallTimer);
            horse.remove();
        }
    }, 20);
}

// 4. THE GAME LOOP (Spawn a new horse every 1.5 seconds)
setInterval(spawnHorse, 1500);
