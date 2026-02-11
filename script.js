let userName = '';
let noCount = 0;

// Music
const bgMusic = document.getElementById('bgMusic');

// Pages
const page0 = document.getElementById('page0');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const page3 = document.getElementById('page3');

const usernameInput = document.getElementById('username');
const startBtn = document.getElementById('startBtn');
const nameError = document.getElementById('nameError');

// PAGE 0
startBtn.addEventListener('click', ()=>{
    if(usernameInput.value.trim()===''){
        nameError.textContent = "Princess… I need your name first 🥺";
    } else {
        userName = usernameInput.value.trim();
        page0.classList.add('hidden');
        page1.classList.remove('hidden');
        document.getElementById('questionText').textContent = `${userName}… will you be my Valentine?`;
        bgMusic.play();
    }
});

// PAGE 1 NO Button
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const noMessage = document.getElementById('noMessage');

noBtn.addEventListener('click', ()=>{
    noCount++;
    const messages = [
        "Oopsie… let’s try that again 🥺",
        "Come onnn 😭💗",
        "You’re breaking my soft princess heart 😔🎀",
        "But imagine saying yes though… 😌✨",
        "This button is getting shy…",
        "Just press yes, my love 💕"
    ];
    noMessage.textContent = messages[Math.min(noCount-1, messages.length-1)];
    noBtn.style.position = "absolute";
    noBtn.style.top = Math.random()*80 + "%";
    noBtn.style.left = Math.random()*80 + "%";
    yesBtn.style.transform = `scale(${1+noCount*0.05})`;
});

// PAGE 1 YES Button
yesBtn.addEventListener('click', ()=>{
    confetti({ particleCount: 200, spread: 70, origin: { y:0.6 }});
    gsap.to(yesBtn, {scale:1.5, duration:0.5, yoyo:true, repeat:1});
    setTimeout(()=>{
        page1.classList.add('hidden');
        page2.classList.remove('hidden');
        startOrbitAnimation();
    },2000);
});

// PAGE 2: Orbit Animation
const center = document.getElementById('centerImage');
const orbitImages = document.querySelectorAll('.orbit');
const pressMeBtn = document.getElementById('pressMeBtn');
const giftText = document.getElementById('giftText');

function startOrbitAnimation(){
    const radius = 150;
    orbitImages.forEach((img,i)=>{
        let angle = i * (Math.PI*2 / orbitImages.length);
        gsap.set(img,{x:radius*Math.cos(angle), y:radius*Math.sin(angle)});
        gsap.to(img,{rotation:360, repeat:-1, duration:15, ease:"linear"});
    });
}

pressMeBtn.addEventListener('click', ()=>{
    orbitImages.forEach((img,i)=>{
        gsap.to(img,{x:0, y:0, scale:0, duration:1.5, delay:i*0.2});
    });
    setTimeout(()=>{
        giftText.textContent = "🎁 Unbox me dear!";
        giftText.style.fontSize="24px";
        giftText.style.color="#5E2B3B";
        giftText.style.textAlign="center";
        giftText.style.marginTop="20px";
    },2500);
    setTimeout(()=>{
        page2.classList.add('hidden');
        page3.classList.remove('hidden');
        typeLetter();
        createScratchCards();
    },3500);
});

// PAGE 3: Handwritten Letter
const letterText = document.getElementById('letterText');
function typeLetter(){
    const letterContent = `Dear ${userName},\n\nFrom the moment you stepped into my world, something shifted softly and beautifully.\n\nYou are not just someone I admire…\nYou are someone who makes ordinary moments feel magical.\n\nYour smile feels like warmth on a quiet morning.\nYour presence feels like peace wrapped in comfort.\nYour heart feels like home.\n\nThank you for being gentle.\nThank you for being real.\nThank you for choosing love in a world that sometimes forgets how.\n\nI see you.\nI appreciate you.\nI cherish you.\n\nAnd if I had to choose again…\nI would still choose you.\nEvery time. 💗`;
    let i=0;
    let interval = setInterval(()=>{
        letterText.textContent += letterContent[i];
        i++;
        if(i>=letterContent.length){ clearInterval(interval); triggerRain(); }
    },30);
}

// SCRATCH CARDS
function createScratchCards(){
    const messages = [
        "You make love feel safe.","You are effortlessly beautiful inside and out.","Your heart is rare and precious.",
        "Sunset picnic with strawberries 🍓","Late night ice cream run under the stars 🌙","Movie night wrapped in blankets 🎬",
        "I will always listen.","I will support your dreams.","I will choose us."
    ];
    const cards = document.querySelectorAll('.scratchCard');
    cards.forEach((card,i)=>{
        card.width = 150;
        card.height = 100;
        const ctx = card.getContext('2d');
        ctx.fillStyle = "#F4A6B8";
        ctx.fillRect(0,0,card.width,card.height);
        card.addEventListener('click',()=>{
            ctx.clearRect(0,0,card.width,card.height);
            ctx.fillStyle = "#FFF5F7";
            ctx.font = "16px Arial";
            ctx.fillText(messages[i],10,50);
        });
    });
}

// RAIN WORDS
function triggerRain(){
    const words = ["forever","us","love","always","the end","my heart","princess"];
    const container = document.getElementById('rainWords');
    for(let i=0;i<50;i++){
        let word = document.createElement('div');
        word.textContent = words[Math.floor(Math.random()*words.length)];
        word.style.position = "absolute";
        word.style.top = "-50px";
        word.style.left = Math.random()*window.innerWidth + "px";
        word.style.fontSize = Math.random()*20 + 16 + "px";
        word.style.color = ["#F8C8DC","#F4A6B8","#C6A75E","#5E2B3B"][Math.floor(Math.random()*4)];
        container.appendChild(word);
        gsap.to(word,{y:window.innerHeight+50, rotation:Math.random()*360, duration:6+Math.random()*4, repeat:-1, ease:"linear"});
    }
}



