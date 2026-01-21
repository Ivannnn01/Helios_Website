let score = 0

const basket = document.querySelector("#Basket")

const horse = document.querySelector("#Horses")

function createFallingHorse() {
    const newHorse = document.createElement("img");
    

    newHorse.src = "image/horse icon.png";
    newHorse.className = "falling-horse";
    
    let randomX = Math.floor(Math.random() * (window.innerWidth - 60));
    newHorse.style.left = randomX + "px";
    document.body.appendChild(newHorse);
    
    startFalling(newHorse);
}

function startFalling(horseElement) {
    let positionY = -100; // Start at the top

    // Run this function every 20 milliseconds
    const fallInterval = setInterval(() => {
        positionY += 5; // The "speed" of gravity
        horseElement.style.top = positionY + "px";

        // Check for "Catch" or "Miss"
        if (positionY > window.innerHeight) {
            clearInterval(fallInterval); // Stop the timer
            horseElement.remove();       // Delete the horse sprite to save memory
        }
    }, 20);
}
