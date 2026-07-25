/* ==========================================
   SCRIPT.JS PART 1
   Basic Navigation & Opening Story
========================================== */


/* =========================
   Loading Screen
========================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loading-screen");

    setTimeout(() => {

        if(loader){
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            },1000);
        }

    },4000);

});



/* =========================
   Page Navigation System
========================= */

function openPage(pageId){

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target = document.getElementById(pageId);


    if(target){

        target.classList.add("active");

    }

}



/* =========================
   Start Our Story Button
========================= */

const startButton =
document.getElementById("startStory");


if(startButton){

    startButton.addEventListener("click",()=>{

        openPage("envelopePage");

    });

}



/* =========================
   Envelope Opening
========================= */


const envelope =
document.querySelector(".envelope");


if(envelope){

    envelope.addEventListener("click",()=>{


        envelope.classList.add("open");


        setTimeout(()=>{

            openPage("letterPage");

        },1200);


    });

}



/* =========================
   Continue Buttons
========================= */


const continue1 =
document.getElementById("continue1");


if(continue1){

    continue1.addEventListener("click",()=>{

        openPage("cakePage");

    });

}
/* ==========================================
   SCRIPT.JS PART 2
   Letter Animation & Cake Flow
========================================== */


/* =========================
   Love Letter Typewriter
========================= */

const typewriter =
document.getElementById("typewriter");


if(typewriter){

    const textElements =
    typewriter.querySelectorAll("p");


    textElements.forEach((item,index)=>{

        item.style.opacity="0";

        setTimeout(()=>{

            item.style.opacity="1";

        }, index * 900);

    });

}



/* =========================
   Continue To Celebration
========================= */


const continue2 =
document.getElementById("continue2");


if(continue2){

    continue2.addEventListener("click",()=>{

        openPage("cakePage");

    });

}



/* =========================
   Candle Button
========================= */


const micButton =
document.getElementById("micButton");


if(micButton){

    micButton.addEventListener("click",()=>{


        const flames =
        document.querySelectorAll(".flame");


        flames.forEach(flame=>{

            flame.style.animation="none";

            flame.style.opacity="0";

        });


        setTimeout(()=>{

            openPage("celebrationPage");

        },1500);


    });

}



/* =========================
   Celebration Effects
========================= */


function createConfetti(){


    const container =
    document.getElementById("confetti");


    if(!container) return;


    for(let i=0;i<80;i++){


        let piece =
        document.createElement("span");


        piece.innerHTML="🎉";


        piece.style.position="absolute";

        piece.style.left =
        Math.random()*100+"%";


        piece.style.top="-20px";


        piece.style.fontSize =
        (15+Math.random()*25)+"px";


        piece.style.animation =
        `fall ${3+Math.random()*3}s linear infinite`;


        container.appendChild(piece);


    }

}


createConfetti();



/* =========================
   Continue To Gallery
========================= */


const continueGallery =
document.getElementById("continueGallery");


if(continueGallery){

    continueGallery.addEventListener("click",()=>{

        openPage("galleryPage");

    });

}



/* =========================
   Firework Helper
========================= */


function createFirework(){


    const firework =
    document.createElement("div");


    firework.innerHTML="✨";


    firework.style.position="fixed";

    firework.style.left =
    Math.random()*100+"%";


    firework.style.top =
    Math.random()*80+"%";


    firework.style.fontSize="40px";


    firework.style.animation=
    "fadeIn 1s";


    document.body.appendChild(firework);


    setTimeout(()=>{

        firework.remove();

    },1000);


}


setInterval(()=>{

    createFirework();

},800);
/* ==========================================
   SCRIPT.JS PART 3
   Cake + Candle Blow + Celebration
========================================== */


/* =========================
   Cake Continue Button
========================= */

const continueCake =
document.getElementById("continue2");


if(continueCake){

    continueCake.addEventListener("click",()=>{

        openPage("cakePage");

    });

}



/* =========================
   Candle Blow System
========================= */


let candlesBlown = false;



function blowCandles(){

    if(candlesBlown) return;


    candlesBlown = true;


    const flames =
    document.querySelectorAll(".flame");


    flames.forEach(flame=>{

        flame.style.animation = "none";

        flame.style.opacity = "0";

    });



    setTimeout(()=>{


        const candles =
        document.querySelector(".candles");


        if(candles){

            candles.innerHTML +=
            "<div class='smoke'>💨</div>";

        }


    },500);



    setTimeout(()=>{

        openPage("celebrationPage");

        createConfetti();

    },2000);


}



/* =========================
   Microphone Blow Detection
========================= */


if(micButton){


micButton.addEventListener("click",async()=>{


try{


const stream =
await navigator.mediaDevices.getUserMedia({

audio:true

});


const audioContext =
new AudioContext();


const microphone =
audioContext.createMediaStreamSource(stream);


const analyser =
audioContext.createAnalyser();


microphone.connect(analyser);


const data =
new Uint8Array(analyser.frequencyBinCount);



function checkVolume(){


analyser.getByteFrequencyData(data);


let volume =
data.reduce((a,b)=>a+b,0)
/
data.length;



if(volume > 45){


blowCandles();


stream.getTracks()
.forEach(track=>track.stop());


}

else{


requestAnimationFrame(checkVolume);


}


}


checkVolume();



}

catch(error){


alert(
"Please allow microphone access to blow the candles ❤️"
);


}



});


}



/* =========================
   Confetti Effect
========================= */


function createConfetti(){


const container =
document.getElementById("confetti");


if(!container) return;



for(let i=0;i<80;i++){


const piece =
document.createElement("span");


piece.innerHTML =
["❤️","✨","🎉","🌸"][

Math.floor(Math.random()*4)

];


piece.style.position="absolute";

piece.style.left =
Math.random()*100+"%";


piece.style.top =
"-20px";


piece.style.fontSize =
(15+Math.random()*20)+"px";


piece.style.animation =
`fall ${3+Math.random()*3}s linear`;



container.appendChild(piece);



}



}
/* ==========================================
   SCRIPT.JS PART 4
   Gallery + Timer + 100 Reasons
========================================== */


/* =========================
   Gallery System
========================= */


const photos = [

"images/1.jpg",
"images/2.jpg",
"images/3.jpg",
"images/4.jpg"

];


const captions = [

"Every picture tells a beautiful story ❤️",

"A special memory that I will always keep close ❤️",

"Every moment with you is priceless ❤️",

"More memories waiting to be created ❤️"

];


let currentPhoto = 0;


const galleryImage =
document.getElementById("galleryImage");


const galleryCaption =
document.getElementById("galleryCaption");



function showPhoto(index){


if(!galleryImage) return;


galleryImage.style.opacity="0";


setTimeout(()=>{


galleryImage.src =
photos[index];


if(galleryCaption){

galleryCaption.innerHTML =
captions[index];

}


galleryImage.style.opacity="1";


},400);


}



const nextPhoto =
document.getElementById("nextPhoto");


const prevPhoto =
document.getElementById("prevPhoto");



if(nextPhoto){

nextPhoto.addEventListener("click",()=>{


currentPhoto++;


if(currentPhoto >= photos.length){

currentPhoto=0;

}


showPhoto(currentPhoto);


});


}



if(prevPhoto){

prevPhoto.addEventListener("click",()=>{


currentPhoto--;


if(currentPhoto < 0){

currentPhoto=photos.length-1;

}


showPhoto(currentPhoto);


});


}




/* =========================
   Relationship Timer
========================= */


const startDate =
new Date("April 7, 2026 00:00:00");



function updateTimer(){


const now =
new Date();


const difference =
now - startDate;



if(difference < 0) return;



const days =
Math.floor(
difference/(1000*60*60*24)
);


const hours =
Math.floor(
(difference/(1000*60*60))%24
);


const minutes =
Math.floor(
(difference/(1000*60))%60
);


const seconds =
Math.floor(
(difference/1000)%60
);



const dayElement =
document.getElementById("days");


const hourElement =
document.getElementById("hours");


const minuteElement =
document.getElementById("minutes");


const secondElement =
document.getElementById("seconds");



if(dayElement)
dayElement.innerHTML=days;


if(hourElement)
hourElement.innerHTML=hours;


if(minuteElement)
minuteElement.innerHTML=minutes;


if(secondElement)
secondElement.innerHTML=seconds;


}



setInterval(updateTimer,1000);

updateTimer();





/* =========================
   100 Reasons System
========================= */


const reasons = [

"You make my world brighter ❤️",

"Your smile is my favourite thing ❤️",

"You always make my days better ❤️",

"Talking to you makes me happy ❤️",

"You are my comfort place ❤️",

"You understand me ❤️",

"You make normal moments special ❤️",

"You are someone I always want to choose ❤️",

"Your happiness matters to me ❤️",

"You are simply you ❤️"

];


// Add remaining reasons here later
// You can expand this list up to 100



let reasonIndex = 0;



const reasonText =
document.getElementById("reasonText");


const reasonNumber =
document.getElementById("reasonNumber");



function showReason(){


if(!reasonText) return;


reasonText.innerHTML =
reasons[reasonIndex];


if(reasonNumber){

reasonNumber.innerHTML =
`${reasonIndex+1} / 100`;

}


}



const nextReason =
document.getElementById("nextReason");



if(nextReason){

nextReason.addEventListener("click",()=>{


reasonIndex++;


if(reasonIndex >= reasons.length){

reasonIndex=0;

}


showReason();


});


}


showReason();
/* ==========================================
   SCRIPT.JS PART 5
   Balloons + Rose + Gifts + Puzzle + Quiz
========================================== */


/* =========================
   Balloon Surprise
========================= */

const balloons =
document.querySelectorAll(".balloon");


const balloonMessages = [

"Your smile is my favourite view ❤️",

"You are my happiest thought ❤️",

"Every moment with you is special ❤️",

"You deserve all the happiness ❤️",

"I am always cheering for you ❤️",

"Forever grateful for you ❤️"

];


balloons.forEach((balloon,index)=>{


balloon.addEventListener("click",()=>{


balloon.style.transform =
"scale(0)";


balloon.style.opacity =
"0";



setTimeout(()=>{


alert(balloonMessages[index]);


},500);



});


});



/* =========================
   Virtual Rose
========================= */


const magicRose =
document.getElementById("magicRose");


const roseMessage =
document.getElementById("roseMessage");



if(magicRose){


magicRose.addEventListener("click",()=>{


magicRose.style.transform =
"scale(1.3) rotate(10deg)";


if(roseMessage){

roseMessage.style.display="block";

}


setTimeout(()=>{

magicRose.style.transform =
"scale(1)";

},800);


});


}



/* =========================
   Mystery Gifts
========================= */


const gifts =
document.querySelectorAll(".giftBox");


const giftMessages=[

"🎁 A thousand smiles for you ❤️",

"🎁 A promise to always care ❤️",

"🎁 Unlimited hugs and happiness ❤️"

];



gifts.forEach((gift,index)=>{


gift.addEventListener("click",()=>{


gift.style.transform =
"rotateY(180deg) scale(1.1)";


setTimeout(()=>{


alert(giftMessages[index]);


},600);


});


});



/* =========================
   Heart Puzzle
========================= */


const pieces =
document.querySelectorAll(".piece");


let completedPieces=0;



pieces.forEach(piece=>{


piece.addEventListener("click",()=>{


if(!piece.classList.contains("done")){


piece.classList.add("done");


completedPieces++;


}



if(completedPieces === pieces.length){


alert(
"❤️ Heart completed! Love unlocked ❤️"
);


}


});


});



/* =========================
   Love Quiz
========================= */


const answers =
document.querySelectorAll(".quizAnswer");



answers.forEach(answer=>{


answer.addEventListener("click",()=>{


answer.style.transform =
"scale(1.1)";


setTimeout(()=>{


alert(
"Correct answer ❤️ It's Gurrrr ❤️"
);


},300);



});


});
/* ==========================================
   SCRIPT.JS PART 6
   Secret + Final Ending
========================================== */


/* =========================
   Secret Moon
========================= */

const moon =
document.getElementById("secretMoon");


let moonClicks = 0;


if(moon){

moon.addEventListener("click",()=>{


moonClicks++;


if(moonClicks >= 5){


openPage("bottlePage");


}


});

}



/* =========================
   Bottle Continue
========================= */


const continuePassword =
document.getElementById("continuePassword");


if(continuePassword){

continuePassword.addEventListener("click",()=>{


openPage("passwordPage");


});

}



/* =========================
   Secret Password
========================= */


const passwordButton =
document.getElementById("checkPassword");


if(passwordButton){


passwordButton.addEventListener("click",()=>{


const input =
document.getElementById("passwordInput");


const message =
document.getElementById("passwordMessage");



if(input.value.toLowerCase()==="birdie"){


message.innerHTML =
"❤️ Secret unlocked ❤️";


setTimeout(()=>{


openPage("secretLetterPage");


},1000);



}

else{


message.innerHTML =
"Try again... a little secret is waiting ❤️";


}



});


}




/* =========================
   Secret Letter Continue
========================= */


const continueEnding =
document.getElementById("continueEnding");



if(continueEnding){

continueEnding.addEventListener("click",()=>{


openPage("endingPage");


playMusic();


});


}



/* =========================
   Background Music
========================= */


function playMusic(){


const music =
document.getElementById("backgroundMusic");


if(music){


music.volume = 0.5;


music.play()
.catch(()=>{});


}


}



/* =========================
   Replay Story
========================= */


const replay =
document.getElementById("replay");


if(replay){


replay.addEventListener("click",()=>{


location.reload();


});


}



/* =========================
   Floating Hearts Generator
========================= */


function createFloatingHeart(){


const heart =
document.createElement("div");


heart.innerHTML="❤️";


heart.style.position="fixed";

heart.style.left =
Math.random()*100+"%";


heart.style.bottom =
"-20px";


heart.style.fontSize =
(15+Math.random()*30)+"px";


heart.style.animation =
"heartFloat 6s linear";


heart.style.pointerEvents="none";


document.body.appendChild(heart);



setTimeout(()=>{


heart.remove();


},6000);



}


setInterval(createFloatingHeart,700);



/* =========================
   Fireflies
========================= */


function createFirefly(){


const firefly =
document.createElement("div");


firefly.innerHTML="✨";


firefly.style.position="fixed";


firefly.style.left =
Math.random()*100+"%";


firefly.style.top =
Math.random()*100+"%";


firefly.style.fontSize="20px";


document.body.appendChild(firefly);



setTimeout(()=>{

firefly.remove();

},3000);


}


setInterval(createFirefly,1000);
