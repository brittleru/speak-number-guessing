const theMessage = document.getElementById("msg");
const randomNumber = getRandomNumber();

console.log("Congratulations you have found a secret! 👌");
console.log(`The secret number is -> ${randomNumber}`);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Get the user voice
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  console.log(`By the way you said -> ${msg}`);

  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  theMessage.innerHTML = `<div>You said: </div> <span class="box">${msg}</span>`;
}

// Check msg against number
function checkNumber(msg) {
  const num = +msg;

  // valid number
  if (Number.isNaN(num)) {
    theMessage.innerHTML += "<div>That is not a valid number!</div>";
    return;
  }

  // valid range
  if (num > 100 || num < 1) {
    theMessage.innerHTML += "<div>Number must be between 1 and 100</div>";
    return;
  }

  // is the secret number?
  if (num === randomNumber) {
    document.body.innerHTML = `<h2>Congratulations! You won! <br><br>
                                   It was ${num}
                               </h2><button class="play-again" id="play-again">Play Again?</button>`;
  }
  else if (num > randomNumber) {
    theMessage.innerHTML += "<div>Go lower!</div>";
  }
  else {
    theMessage.innerHTML += "<div>Go higher!</div>";
  }
}



// The secret number generator
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}


// Speak result
recognition.addEventListener("result", onSpeak);

// End voice recognition
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
