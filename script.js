/* ❤️ CONFIGURATION ❤️
  You can change the text and images here!
*/
const CONFIG = {
    // Page 3: The "Sad" images when she clicks No
    // You can use Giphy links or local images
    sadImages: [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDIwZHIxN3Z0ZnF3Ynd2Y2IxZm41aW14NWZ5Ynh6Y214aDF3aG0yMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/CM1rHbKDMH2BW/giphy.gif", // Shocked
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTVwZHIxN3Z0ZnF3Ynd2Y2IxZm41aW14NWZ5Ynh6Y214aDF3aG0yMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/OPU6KKavdyODgDiRk/giphy.gif", // Crying
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODJ3ZHIxN3Z0ZnF3Ynd2Y2IxZm41aW14NWZ5Ynh6Y214aDF3aG0yMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/d2lcHJTG5Tscg/giphy.gif"  // Sobbing
    ],

    // Page 3: The "Guilt Trip" texts
    noTexts: [
        "Are you sure?",
        "Really sure?",
        "Pookie please...",
        "Don't do this to me :(",
        "I'm gonna cry...",
        "You're breaking my heart! 💔"
    ]
};

/* --- LOGIC START --- */

// Variables to track state
let noClickCount = 0;
let yesButtonScale = 1;

// Audio
const audio = document.getElementById('bgMusic');

// --- PAGE 1: Runaway Button ---
function moveButton(btn) {
    // Make the button jump to a random spot
    const x = Math.random() * (window.innerWidth - btn.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight - 20);

    btn.style.position = 'fixed';
    btn.style.left = `${x}px`;
    btn.style.top = `${y}px`;
}

// Mobile support: If they try to tap it on phone, it moves
document.getElementById('runawayBtn').addEventListener('touchstart', function (e) {
    e.preventDefault(); // Stop it from clicking
    moveButton(this);
});

function goToPage2() {
    document.getElementById('page1').classList.add('hidden');
    document.getElementById('page2').classList.remove('hidden');
    // Try to play audio (might be blocked by browser policies)
    audio.play().catch(e => console.log("Audio needs interaction"));
}

// --- PAGE 2: Love Slider ---
const slider = document.getElementById('loveSlider');
const loveText = document.getElementById('loveText');

slider.addEventListener('input', function () {
    const val = this.value;
    if (val < 20) loveText.innerText = "Only this much? 🥺";
    else if (val < 50) loveText.innerText = "Getting there...";
    else if (val < 80) loveText.innerText = "Almost...";
    else if (val < 100) loveText.innerText = "I love you too! ❤️";
    else loveText.innerText = "TO INFINITY AND BEYOND! 🚀";
});

function goToPage3() {
    document.getElementById('page2').classList.add('hidden');
    document.getElementById('page3').classList.remove('hidden');
}

// --- PAGE 3: The Proposal (Sad Mode) ---

function handleFinalNo() {
    noClickCount++;
    const mainImage = document.getElementById('mainImage');
    const subText = document.getElementById('subText');
    const finalYesBtn = document.getElementById('finalYesBtn');
    const rainContainer = document.getElementById('rainContainer');

    // 1. Change Text
    const textIndex = Math.min(noClickCount - 1, CONFIG.noTexts.length - 1);
    subText.textContent = CONFIG.noTexts[textIndex];

    // 2. Change Image
    const imgIndex = Math.min(noClickCount - 1, CONFIG.sadImages.length - 1);
    mainImage.src = CONFIG.sadImages[imgIndex];

    // 3. Make Yes Button Grow
    yesButtonScale += 0.3;
    finalYesBtn.style.transform = `scale(${yesButtonScale})`;

    // 4. Trigger Rain & Dark Mode
    document.body.classList.add('sad-mode');
    rainContainer.style.display = 'block';

    // Add rain drops
    createRain();
}

function handleFinalYes() {
    // Clean up Sad Mode
    document.body.classList.remove('sad-mode');
    document.getElementById('rainContainer').style.display = 'none';

    // Go to Success Page
    document.getElementById('page3').classList.add('hidden');
    document.getElementById('page4').classList.remove('hidden');

    // Celebration Effects
    audio.play();
    createConfetti();
}

// --- EFFECTS ---

function createRain() {
    const rainContainer = document.getElementById('rainContainer');
    // Create 10 drops per click
    for (let i = 0; i < 10; i++) {
        const drop = document.createElement('div');
        drop.classList.add('drop');
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.animationDuration = Math.random() * 0.5 + 0.5 + 's';
        rainContainer.appendChild(drop);

        // Remove drops after animation to keep DOM light
        setTimeout(() => {
            drop.remove();
        }, 1000);
    }
}

function createConfetti() {
    // Simple confetti explosion
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.innerText = ['❤️', '🎉', '🌹', '🧸'][Math.floor(Math.random() * 4)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.fontSize = '20px';
        confetti.style.animation = `rain 3s linear forwards`; // Reusing rain animation
        document.body.appendChild(confetti);
    }
}