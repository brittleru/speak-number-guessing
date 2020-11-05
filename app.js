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

  // warningMessage(msg);
  // checkNumber(msg);
}

// The secret number generator
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}


// Speak result
recognition.addEventListener("result", onSpeak);
