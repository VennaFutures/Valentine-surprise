let userName = "";
let noCount = 0;

const bgMusic = document.getElementById("bgMusic");

document.getElementById("startBtn").onclick = function () {
  const input = document.getElementById("username");

  if (input.value.trim() === "") {
    document.getElementById("nameError").textContent =
      "Princess… I need your name first 🥺";
    return;
  }

  userName = input.value.trim();
  bgMusic.volume = 0.3;
  bgMusic.play();

  document.getElementById("questionText").textContent =
    `${userName}… will you be my Valentine?`;

  showPage("page1");
};

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

document.getElementById("yesBtn").onclick = function () {
  confetti({ particleCount: 200, spread: 100 });
  showPage("page2");
};

document.getElementById("noBtn").onclick = function () {
  noCount++;
  document.getElementById("noMessage").textContent =
    "Just press yes, my love 💕";

  this.style.position = "absolute";
  this.style.left = Math.random() * 80 + "vw";
  this.style.top = Math.random() * 80 + "vh";
};

document.getElementById("pressMeBtn").onclick = function () {
  showPage("page3");
  typeLetter();
};

function typeLetter() {
  const text = `Dear ${userName},

From the moment you stepped into my world, something shifted softly and beautifully.

And if I had to choose again…
I would still choose you.

Every time. 💗`;

  let i = 0;
  const el = document.getElementById("letterText");

  function type() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(type, 40);
    }
  }

  type();
}



