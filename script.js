// --- Core Elements ---
const loader = document.getElementById('loader');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

// --- Initialization & Smart Features ---
window.onload = () => {
    // Smart Greeting based on Time
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('smart-greeting');
    if (hour < 12) greetingEl.innerText = "Good Morning,";
    else if (hour < 18) greetingEl.innerText = "Good Afternoon,";
    else greetingEl.innerText = "Good Evening,";

    // Dynamic Relationship Day Counter (Edit your date here: YYYY-MM-DD)
    const startDate = new Date('2022-01-01');
    const diffDays = Math.ceil(Math.abs(new Date() - startDate) / (1000 * 60 * 60 * 24));
    document.getElementById('day-counter').innerText = diffDays;

    // Remove Loader smoothly
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.classList.add('hidden');
            mainContent.classList.remove('hidden');
            createParticles();
        }, 1000);
    }, 3500);
};

// --- Cursor Heart Trail (Memory Leak Prevented) ---
const createTrailHeart = (x, y) => {
    if(Math.random() > 0.8) { 
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart trail-heart';
        heart.style.left = x + 'px'; 
        heart.style.top = y + 'px';
        document.body.appendChild(heart);
        // Destroy element after animation finishes to prevent lag
        setTimeout(() => heart.remove(), 1000);
    }
};

document.addEventListener('mousemove', (e) => createTrailHeart(e.clientX, e.clientY));
document.addEventListener('touchmove', (e) => createTrailHeart(e.touches[0].clientX, e.touches[0].clientY));

// --- Scroll Reveal Animations ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); 
        }
    });
}, { threshold: 0.1 });

// --- Music & Flow Control ---
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

document.getElementById('open-surprise-btn').addEventListener('click', () => {
    bgMusic.play().catch(e => console.log("Audio autoplay blocked by browser, user needs to interact again."));
    isPlaying = true; 
    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    document.getElementById('hero').classList.add('hidden');
    document.getElementById('envelope-section').classList.remove('hidden');
});

// --- Envelope Typewriter ---
const envelope = document.getElementById('envelope');
const typewriterText = document.getElementById('typewriter-text');
const continueBtn = document.getElementById('continue-btn');
const letterContent = `My love, thank you for being the most beautiful part of my life. I wanted to build something special just for you. Every line of code here is filled with love and respect. 💖`;

envelope.addEventListener('click', () => {
    if (!envelope.classList.contains('open')) {
        envelope.classList.add('open');
        
        // Wait for CSS envelope animation to finish before typing
        setTimeout(() => {
            let i = 0;
            function typeWriter() {
                if (i < letterContent.length) {
                    typewriterText.innerHTML += letterContent.charAt(i); 
                    i++;
                    setTimeout(typeWriter, 40);
                } else { 
                    setTimeout(() => continueBtn.classList.remove('hidden'), 1000); 
                }
            }
            typeWriter();
        }, 1500);
    }
});

continueBtn.addEventListener('click', () => {
    document.getElementById('envelope-section').classList.add('hidden');
    document.getElementById('journey-content').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Start observing sections for the scroll animation
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

// --- Lightbox Gallery Zoom ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.zoomable').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
    });
});

document.querySelector('.close-lightbox').addEventListener('click', () => lightbox.classList.add('hidden'));
lightbox.addEventListener('click', (e) => { 
    if (e.target !== lightboxImg) lightbox.classList.add('hidden'); 
});

// --- Lucky Wheel Mini-Game ---
const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spin-btn');
const wheelResult = document.getElementById('wheel-result');
let currentRotation = 0;
const prizes = ["Movie 🎬", "Dinner 🍝", "Hug 🤗", "Kiss 😘"]; // Mapped to CSS segments

spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true;
    const spins = Math.floor(Math.random() * 5) + 5; // 5 to 10 full spins
    const extraDegree = Math.floor(Math.random() * 360);
    currentRotation += (spins * 360) + extraDegree;
    
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    
    setTimeout(() => {
        // Calculate which segment is at the top
        const normalizedDegree = (currentRotation % 360);
        // Adjusting index so it corresponds visually to the top pointer
        let index = Math.floor(((360 - normalizedDegree) % 360) / 90);
        
        wheelResult.innerText = `You won: ${prizes[index]}! 🎉`;
        wheelResult.classList.remove('hidden');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        spinBtn.disabled = false;
    }, 4000); // Waits for CSS transition (4s)
});

// --- Runaway "No" Button Mini-Game ---
const btnNo = document.getElementById('btn-no');
const btnYes = document.getElementById('btn-yes');
const interactiveSection = document.getElementById('interactive-question');

function moveNoButton() {
    const btnRect = btnNo.getBoundingClientRect();
    const sectionRect = interactiveSection.getBoundingClientRect();
    
    // Boundaries to keep the button inside the glass panel
    const maxX = sectionRect.width - btnRect.width - 20; 
    const maxY = sectionRect.height - btnRect.height - 20;
    
    // Random translation coordinates
    const randomX = Math.floor(Math.random() * maxX) - (maxX / 2);
    const randomY = Math.floor(Math.random() * maxY) - (maxY / 2) + 20; 
    
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Support for both mouse (desktop) and touch (mobile)
btnNo.addEventListener('mouseover', moveNoButton);
btnNo.addEventListener('touchstart', (e) => { 
    e.preventDefault(); 
    moveNoButton(); 
});

btnYes.addEventListener('click', () => {
    document.getElementById('promise-text').classList.remove('hidden');
    btnNo.style.display = 'none'; // Hide the "No" button entirely
    confetti({ particleCount: 150, spread: 100, colors: ['#ff758c', '#ff7eb3', '#ffd700'] });
});

// --- Birthday Cake Blow ---
document.getElementById('blow-candle-btn').addEventListener('click', function() {
    document.getElementById('flame').style.display = 'none';
    this.classList.add('hidden');
    document.getElementById('wish-text').classList.remove('hidden');
    confetti({ particleCount: 100, spread: 60 });
});

// --- Grand Finale Fireworks ---
document.getElementById('finale-btn').addEventListener('click', () => {
    var duration = 15 * 1000; // 15 seconds of fireworks
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      
      if (timeLeft <= 0) return clearInterval(interval);
      
      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
});

// --- Background Particles (Stars & Petals) ---
function createParticles() {
    const bg = document.getElementById('background-effects');
    const emojis = ['✨', '🌸', '💫'];
    
    for (let i = 0; i < 35; i++) {
        let p = document.createElement('div');
        p.className = 'particle';
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.fontSize = Math.random() * 10 + 10 + 'px';
        p.style.animationDuration = Math.random() * 5 + 6 + 's'; // 6 to 11 seconds
        p.style.animationDelay = Math.random() * 5 + 's';
        p.style.opacity = Math.random() * 0.4 + 0.2;
        bg.appendChild(p);
    }
}
