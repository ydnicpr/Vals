/* ❤️ CONFIGURATION ❤️
  You can change the text and images here!
*/
const CONFIG = {
    // Page 3: The "Sad" images when she clicks No
    // You can use Giphy links or local images
    sadImages: [
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDIwZHIxN3Z0ZnF3Ynd2Y2IxZm41aW14NWZ5Ynh6Y214aDF3aG0yMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/CM1rHbKDMH2BW/giphy.gif", // Shocked
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDBlZW90NWtvYWxqeWR3amU5Z3pxaGY1d2xsNnM5aXNybTM0Nm16MSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/P53TSsopKicrm/giphy.gif", // Crying
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGJ1YzA3OWp6dnN0bDl2amcydWN4MXl3MTR6NGhvM3RubWtvZDM1MyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cdNS8BXPvk0NikBnaw/giphy.gif", // Sobbing
        "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NnU5Zm01MDU2ZGVyYm1kZzIydWRydng4d3R2NXRkZm5xZTJ3bG5ydSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/QW2ccpbEdeI5UBugCh/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExemJxdGxlYjhua3ozOWo2ejN0bXkydzkwZGFwM2Zxa29udTNoMW55ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/4mkcJMSvG73AQ/giphy.gif",
        "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExemJxdGxlYjhua3ozOWo2ejN0bXkydzkwZGFwM2Zxa29udTNoMW55ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/MERLDpJ1MMfCSBknJm/giphy.gif"
    ],

    // Page 3: The "Guilt Trip" texts
    noTexts: [
        "are u sure?",
        "really sure?",
        "baby please...",
        "don't do this to me :(",
        "i'm gonna cry...",
        "oh my god ig this is the end of my life 💔"
    ]
};

/* --- LOGIC START --- */

// Variables to track state
let noClickCount = 0;
let yesButtonScale = 1;

// Audio
const audio = document.getElementById('bgMusic');

// --- PAGE 1: Runaway Button ---
// --- PAGE 1: Runaway Button ---
function moveButton(btn) {
    // FIX: Move the button to the <body> so it escapes the card's boundaries
    // This allows it to position correctly relative to the whole screen
    if (btn.parentNode !== document.body) {
        document.body.appendChild(btn);
    }

    // Make the button jump to a random spot
    // We add Math.max(0, ...) to ensure it never goes off the top/left edge
    const x = Math.random() * (window.innerWidth - btn.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight - 20);

    btn.style.position = 'fixed';
    btn.style.left = `${Math.max(0, x)}px`;
    btn.style.top = `${Math.max(0, y)}px`;

    // Ensure it sits on top of everything
    btn.style.zIndex = "100";
}

// Mobile support: If they try to tap it on phone, it moves
document.getElementById('runawayBtn').addEventListener('touchstart', function (e) {
    e.preventDefault(); // Stop it from clicking
    moveButton(this);
});

function goToPage2() {
    // 1. Hide Page 1
    document.getElementById('page1').classList.add('hidden');

    // 2. Show Page 2
    document.getElementById('page2').classList.remove('hidden');

    // 3. FIX: Hide the Runaway No Button
    // Since we moved it to the body, we must hide it manually
    const runawayBtn = document.getElementById('runawayBtn');
    runawayBtn.style.display = 'none';

    // 4. Play Audio
    audio.play().catch(e => console.log("Audio needs interaction"));
}

// --- PAGE 2: Love Slider ---
const slider = document.getElementById('loveSlider');
const loveText = document.getElementById('loveText');

slider.addEventListener('input', function () {
    const val = this.value;
    if (val < 20) loveText.innerText = "only this much? 🥺";
    else if (val < 50) loveText.innerText = "a little more...";
    else if (val < 80) loveText.innerText = "almost...";
    else if (val < 100) loveText.innerText = "i love u too! ❤️";
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
    // 1. Clean up Sad Mode
    document.body.classList.remove('sad-mode');
    document.getElementById('rainContainer').style.display = 'none';

    // 2. Hide Page 3, Show Page 4
    document.getElementById('page3').classList.add('hidden');
    document.getElementById('page4').classList.remove('hidden');

    // 3. Play Music & Start Effects
    audio.play();

    // START THE FLOATING EMOJIS HERE
    startFloatingEmojis();
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

function startFloatingEmojis() {
    const emojis = ['❤️', '💖', '💝', '💗', '💓', '🧸', '🐻', '🌹'];

    // Create a new emoji every 300 milliseconds (fast stream)
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.classList.add('floating-emoji');

        // Pick random emoji
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        // Random Position (0% to 100% width)
        emoji.style.left = Math.random() * 100 + 'vw';

        // Random Animation Speed (between 5s and 10s)
        emoji.style.animationDuration = Math.random() * 5 + 5 + 's';

        // Random Size
        emoji.style.fontSize = Math.random() * 20 + 20 + 'px';

        document.body.appendChild(emoji);

        // Remove element after it floats off screen to keep browser fast
        setTimeout(() => {
            emoji.remove();
        }, 10000);
    }, 300);
}
