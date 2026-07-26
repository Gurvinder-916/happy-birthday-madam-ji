/* =========================
   WAIT FOR PAGE LOAD
========================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("mainContent");

    setTimeout(() => {

        loader.style.display = "none";
        mainContent.classList.remove("hidden");
        mainContent.classList.add("show");

    }, 2500);

});


/* =========================
   MUSIC CONTROL
========================= */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;


musicBtn.addEventListener("click", () => {


    if (musicPlaying) {

        music.pause();

        musicBtn.innerHTML =
        '<i class="fa-solid fa-music"></i>';

        musicPlaying = false;

    }

    else {

        music.play();

        musicBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

        musicPlaying = true;

    }


});


/* =========================
   START BUTTON
========================= */


const startBtn = document.getElementById("startBtn");
const envelopeSection = document.getElementById("envelopeSection");


startBtn.addEventListener("click", () => {

    envelopeSection.scrollIntoView({
        behavior:"smooth"
    });

});



/* =========================
   ENVELOPE OPENING
========================= */


const envelope = document.getElementById("envelope");
const letterSection = document.getElementById("letterSection");


envelope.addEventListener("click", () => {


    envelope.classList.add("open");


    setTimeout(()=>{


        envelopeSection.classList.add("hidden");

        letterSection.classList.remove("hidden");

        letterSection.classList.add("show");


        startTyping();


    },1000);



});



/* =========================
   TYPEWRITER EFFECT
========================= */


const message = `Happy Birthday ❤️

You are a truly special person.
Your smile makes every moment brighter.

I hope your day is filled with happiness,
love and beautiful memories.

Always keep smiling ✨`;


let typingIndex = 0;


function startTyping(){


    const textBox =
    document.getElementById("typewriter");


    textBox.innerHTML = "";

    typingIndex = 0;


    function type(){


        if(typingIndex < message.length){


            textBox.innerHTML +=
            message.charAt(typingIndex);


            typingIndex++;

            setTimeout(type,40);


        }


    }


    type();


}
/* =========================
   GALLERY BUTTON
========================= */

const nextGallery = document.getElementById("nextGallery");

const gallerySection =
document.getElementById("gallerySection");


nextGallery.addEventListener("click",()=>{


    letterSection.classList.add("hidden");


    gallerySection.classList.remove("hidden");

    gallerySection.classList.add("show");


    gallerySection.scrollIntoView({
        behavior:"smooth"
    });


});



/* =========================
   CAKE BUTTON
========================= */


const nextCake =
document.getElementById("nextCake");


const cakeSection =
document.getElementById("cakeSection");


nextCake.addEventListener("click",()=>{


    gallerySection.classList.add("hidden");


    cakeSection.classList.remove("hidden");

    cakeSection.classList.add("show");


    cakeSection.scrollIntoView({
        behavior:"smooth"
    });


});



/* =========================
   BLOW CANDLES
========================= */


const blowBtn =
document.getElementById("blowCandlesBtn");


const candles =
document.querySelectorAll(".candle");


blowBtn.addEventListener("click",()=>{


    candles.forEach(candle=>{

        candle.classList.add("off");

    });


    createConfetti();


    setTimeout(()=>{


        document
        .getElementById("countdownSection")
        .classList.remove("hidden");


        document
        .getElementById("countdownSection")
        .scrollIntoView({
            behavior:"smooth"
        });


    },1000);


});



/* =========================
   CONFETTI FUNCTION
========================= */


function createConfetti(){


    for(let i=0;i<80;i++){


        let piece =
        document.createElement("div");


        piece.className="confetti";


        piece.style.left =
        Math.random()*100+"vw";


        piece.style.animationDelay =
        Math.random()*2+"s";


        piece.style.background =
        randomColor();


        document.body.appendChild(piece);



        setTimeout(()=>{

            piece.remove();

        },4000);


    }


}



function randomColor(){


    let colors=[

        "#ff4d6d",
        "#ffd166",
        "#06d6a0",
        "#118ab2",
        "#8338ec"

    ];


    return colors[
        Math.floor(Math.random()*colors.length)
    ];

}
/* =========================
   COUNTDOWN TIMER
========================= */


function startCountdown(){


    // Change this date for the birthday date if needed
    const birthdayDate =
    new Date("January 1, 2027 00:00:00").getTime();



    setInterval(()=>{


        const now =
        new Date().getTime();


        const distance =
        birthdayDate - now;



        const days =
        Math.floor(distance /
        (1000*60*60*24));


        const hours =
        Math.floor(
        (distance %
        (1000*60*60*24)) /
        (1000*60*60));


        const minutes =
        Math.floor(
        (distance %
        (1000*60*60)) /
        (1000*60));


        const seconds =
        Math.floor(
        (distance %
        (1000*60)) /
        1000);



        document.getElementById("days").innerHTML =
        String(days).padStart(2,"0");


        document.getElementById("hours").innerHTML =
        String(hours).padStart(2,"0");


        document.getElementById("minutes").innerHTML =
        String(minutes).padStart(2,"0");


        document.getElementById("seconds").innerHTML =
        String(seconds).padStart(2,"0");



    },1000);


}


startCountdown();



/* =========================
   SHOW WISH SECTION
========================= */


const countdownSection =
document.getElementById("countdownSection");


countdownSection.addEventListener("click",()=>{


    const wishes =
    document.getElementById("wishesSection");


    wishes.classList.remove("hidden");

    wishes.classList.add("show");


});



/* =========================
   FINAL SURPRISE BUTTON
========================= */


const finalBtn =
document.getElementById("showFinalBtn");


const finalSection =
document.getElementById("finalSection");


finalBtn.addEventListener("click",()=>{


    document
    .getElementById("wishesSection")
    .classList.add("hidden");


    finalSection.classList.remove("hidden");

    finalSection.classList.add("show");


    finalSection.scrollIntoView({
        behavior:"smooth"
    });


    createFireworks();


});



/* =========================
   GIFT BOX CLICK
========================= */


const giftBox =
document.getElementById("giftBox");


giftBox.addEventListener("click",()=>{


    createFireworks();


    document
    .getElementById("loveSection")
    .classList.remove("hidden");


    document
    .getElementById("loveSection")
    .scrollIntoView({
        behavior:"smooth"
    });


});



/* =========================
   FIREWORKS EFFECT
========================= */


function createFireworks(){


    for(let i=0;i<25;i++){


        let spark =
        document.createElement("div");


        spark.className="firework";


        spark.style.left =
        Math.random()*100+"vw";


        spark.style.top =
        Math.random()*80+"vh";


        spark.style.background =
        randomColor();



        document.body.appendChild(spark);



        setTimeout(()=>{

            spark.remove();

        },1000);


    }


}



/* =========================
   FLOATING HEARTS
========================= */


function createHeart(){


    const heart =
    document.createElement("div");


    heart.className="heart";


    heart.innerHTML="❤️";


    heart.style.left =
    Math.random()*100+"vw";


    heart.style.animationDuration =
    (Math.random()*3+3)+"s";



    document.body.appendChild(heart);



    setTimeout(()=>{

        heart.remove();

    },6000);


}



setInterval(createHeart,500);
/* =========================
   FINAL ERROR PROTECTION
========================= */


// Prevent missing elements from breaking the project

function safeClick(element, action) {

    if(element){

        element.addEventListener("click", action);

    }

}



/* =========================
   AUTO MUSIC START ATTEMPT
========================= */


document.addEventListener("click",()=>{


    if(!musicPlaying && music){

        music.play()
        .then(()=>{

            musicPlaying=true;

        })
        .catch(()=>{

            // Browser blocked autoplay

        });

    }


},{once:true});



/* =========================
   GIFT MESSAGE ANIMATION
========================= */


if(giftBox){


giftBox.addEventListener("click",()=>{


    giftBox.style.transform =
    "scale(1.3) rotate(10deg)";


    setTimeout(()=>{


        giftBox.style.transform =
        "";


    },500);



});


}



/* =========================
   PAGE READY MESSAGE
========================= */


console.log(
"🎂 Birthday Card Project Loaded Successfully ❤️"
);
/* =========================
   ROMANTIC SLIDESHOW
========================= */


const slideImage =
document.getElementById("slideImage");


const photos = [

"images/photo1.jpg",

"images/photo2.jpg",

"images/photo3.jpg",

"images/photo4.jpg",

"images/photo5.jpg",

"images/photo6.jpg"

];


let slideIndex = 0;


if(slideImage){

setInterval(()=>{


    slideIndex++;

    if(slideIndex >= photos.length){

        slideIndex = 0;

    }


    slideImage.style.opacity = 0;


    setTimeout(()=>{

        slideImage.src = photos[slideIndex];

        slideImage.style.opacity = 1;


    },500);



},4000);


}
