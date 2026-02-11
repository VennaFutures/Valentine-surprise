let userName = "";
let noCount = 0;
let scratched = 0;

const pages = document.querySelectorAll(".page");
const bgMusic = document.getElementById("bgMusic");

function showPage(id){
  pages.forEach(p=>p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("startBtn").onclick = ()=>{
  const input = document.getElementById("username");
  if(!input.value.trim()){
    document.getElementById("nameError").textContent="Princess… I need your name first 🥺";
    gsap.from(input,{x:-10,repeat:3,yoyo:true});
    return;
  }

  userName = input.value.trim();
  bgMusic.volume = 0.3;
  bgMusic.play();

  document.getElementById("question").textContent =
    `${userName}… will you be my Valentine?`;

  showPage("page1");
};

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const noMessage = document.getElementById("noMessage");

noBtn.onclick = ()=>{
  noCount++;

  if(noCount===1){
    gsap.from(noBtn,{x:-10,repeat:3,yoyo:true});
    noMessage.textContent="Oopsie… let’s try that again 🥺";
  }
  else{
    noBtn.style.position="absolute";
    noBtn.style.left=Math.random()*80+"vw";
    noBtn.style.top=Math.random()*80+"vh";
    yesBtn.style.transform=`scale(${1+noCount*0.1})`;
    noMessage.textContent="Just press yes, my love 💕";
  }
};

yesBtn.onclick = ()=>{
  confetti({particleCount:200,spread:120});
  showPage("page2");
  startOrbit();
};

function startOrbit(){
  const images = document.querySelectorAll(".orbit");
  images.forEach((img,i)=>{
    gsap.to(img,{
      duration:10,
      repeat:-1,
      ease:"linear",
      motionPath:{
        path:[
          {x:0,y:-120},
          {x:120,y:0},
          {x:0,y:120},
          {x:-120,y:0},
          {x:0,y:-120}
        ]
      }
    });
  });
}

document.getElementById("pressMeBtn").onclick=()=>{
  showPage("page3");
  typeLetter();
  createScratchCards();
};

function typeLetter(){
  const text = `Dear ${userName},

From the moment you stepped into my world, something shifted softly and beautifully...

And if I had to choose again…
I would still choose you.

Every time. 💗`;

  let i=0;
  const el=document.getElementById("letterText");

  function type(){
    if(i<text.length){
      el.textContent+=text[i];
      i++;
      setTimeout(type,40);
    }
  }
  type();
}

function createScratchCards(){
  const messages=[
    "You make love feel safe.",
    "You are effortlessly beautiful inside and out.",
    "Your heart is rare and precious.",
    "Sunset picnic with strawberries 🍓",
    "Late night ice cream run 🌙",
    "Movie night wrapped in blankets 🎬",
    "I will always listen.",
    "I will support your dreams.",
    "I will choose us."
  ];

  const container=document.querySelector(".scratch-container");

  messages.forEach(msg=>{
    const canvas=document.createElement("canvas");
    container.appendChild(canvas);

    const ctx=canvas.getContext("2d");
    canvas.width=300;
    canvas.height=120;

    ctx.fillStyle="#C6A75E";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#fff";
    ctx.fillText("Scratch Me 🎀",100,60);

    canvas.addEventListener("mousemove",(e)=>{
      if(e.buttons===1){
        ctx.globalCompositeOperation="destination-out";
        ctx.beginPath();
        ctx.arc(e.offsetX,e.offsetY,20,0,Math.PI*2);
        ctx.fill();
      }
    });

    canvas.addEventListener("mouseup",()=>{
      scratched++;
      if(scratched===9) startRain();
    });

    const textDiv=document.createElement("div");
    textDiv.textContent=msg;
    textDiv.style.position="absolute";
    textDiv.style.marginTop="-100px";
    container.appendChild(textDiv);
  });
}

function startRain(){
  const words=["forever","us","love","always","my heart","princess"];

  words.forEach(word=>{
    const span=document.createElement("span");
    span.textContent=word;
    span.style.left=Math.random()*100+"vw";
    span.style.animationDuration=5+Math.random()*5+"s";
    document.getElementById("rainContainer").appendChild(span);
  });
}

