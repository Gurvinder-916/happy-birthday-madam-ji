// --- DOM Elements ---
const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content');
const hero = document.getElementById('hero');
const envelopeSection = document.getElementById('envelope-section');
const envelope = document.getElementById('envelope');
const typewriterText = document.getElementById('typewriter-text');
const continueBtn = document.getElementById('continue-btn');
const journeyContent = document.getElementById('journey-content');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const loveBar = document.getElementById('love-bar');
const giftBox = document.getElementById('gift-box');
const giftMessage = document.getElementById('gift-message');
const blowCandleBtn = document.getElementById('blow-candle-btn');
const flame = document.getElementById('flame');
const wishText = document.getElementById('wish-text');

// --- Initialization ---
window.onload = () => {
    // Remove loader after 3 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            mainContent.classList.remove('hidden');
            createParticles();
        }, 1000);
    }, 3000);
};

// --- Music Control ---
let isPlaying = false;
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// --- Open Surprise (Hero to Envelope) ---
document.getElementById('open-surprise-btn').addEventListener('click', () => {
    // Auto-play music on first interaction
    bgMusic.play().catch(e => console.log("Audio play blocked by browser"));
    isPlaying = true;
    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';

    hero.classList.add('hidden');
    envelopeSection.classList.remove('hidden');
});

// --- Envelope & Typewriter ---
const letterContent = `Happy Birthday to someone incredibly special! I wanted to create something unique just for you. Thank you for your endless support, your care, and the beautiful light you bring into this world. I promise to always try and make you smile, today and always. May God bless you with everything your heart desires. ❤️`;

envelope.addEventListener('click', () => {
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        setTimeout(typeWriter, 1500); // Wait for envelope to open before typing
    }
});

let i = 0;
function typeWriter() {
    if (i < letterContent.length) {
        typewriterText.innerHTML += letterContent.charAt(i);
        i++;
        setTimeout(typeWriter, 40); // Typing speed
    } else {
        // Show continue button when typing is done
        setTimeout(() => {
            continueBtn.classList.remove('hidden');
        }, 1000);
    }
}

// --- Continue to Journey ---
continueBtn.addEventListener('click', () => {
    envelopeSection.classList.add('hidden');
    journeyContent.classList.remove('hidden');
    
    // Animate Love Meter when scrolled into view
    setTimeout(() => {
        loveBar.style.width = '100%';
    }, 500);
    
    // Scroll to top of journey
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Slideshow Logic ---
let slideIndex = 1;
const totalSlides = 10;
const slideImg = document.getElementById('slide-img');
const captions = [
    "Every moment with you is a treasure.",
    "Your smile lights up my world.",
    "Cherishing every laugh we share.",
    "Beautiful memories created together.",
    "You are my favorite thought.",
    "A bond that grows stronger every day.",
    "Through all times, you shine.",
    "Unforgettable moments.",
    "Grateful for your presence.",
    "Here's to a lifetime of happiness."
];
const slideCaption = document.getElementById('slide-caption');

function changeSlide(n) {
    slideIndex += n;
    if (slideIndex > totalSlides) slideIndex = 1;
    if (slideIndex < 1) slideIndex = totalSlides;
    
    // Assuming images are named photo1.jpg to photo10.jpg
    slideImg.src = `images/photo${slideIndex}.jpg`;
    slideCaption.innerText = captions[slideIndex - 1];
    
    // Fallback if image doesn't exist (prevents broken image icon)
    slideImg.onerror = function() {
        this.src = 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80'; // Romantic placeholder
    };
}

// Auto slideshow
setInterval(() => {
    if (!journeyContent.classList.contains('hidden')) {
        changeSlide(1);
    }
}, 4000);

// --- Blow Candle & Celebration ---
blowCandleBtn.addEventListener('click', () => {
    flame.style.display = 'none'; // Extinguish flame
    blowCandleBtn.classList.add('hidden');
    wishText.classList.remove('hidden');
    
    // Fire Confetti
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
});

// --- Secret Gift Box ---
giftBox.addEventListener('click', () => {
    giftBox.classList.add('hidden');
    giftMessage.classList.remove('hidden');
    
    // Small heart burst on gift open
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff758c', '#ff7eb3', '#ffd700']
    });
});

// --- Background Particles (Hearts & Petals) ---
function createParticles() {
    const background = document.getElementById('background-effects');
    const particleColors = ['#ff7eb3', '#ff758c', '#fff'];
    const emojis = ['❤️', '✨', '🌹'];
    
    for (let i = 0; i < 30; i++) {
        let particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Randomize styles
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.fontSize = Math.random() * 15 + 10 + 'px';
        particle.style.animationDuration = Math.random() * 5 + 5 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        background.appendChild(particle);
    }
}

