
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resultsDiv = document.getElementById('results');

let recognition;

function startSpeechRecognition() {
  if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function () {
      console.log('Voice recognition started. Try speaking into the microphone.');
    }

    recognition.onerror = function (event) {
      console.error('Voice recognition error: ' + event.error);
    }

    recognition.onend = function () {
      console.log('Voice recognition ended.');
    }

    recognition.onresult = function (event) {
      let results = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        let transcript = event.results[i][0].transcript;
        results += transcript;
      }
      resultsDiv.textContent = results;
    }

    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } else {
    console.error('Web speech recognition not supported.');
  }
}

function stopSpeechRecognition() {
  if (recognition) {
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
}

startBtn.addEventListener('click', startSpeechRecognition);
stopBtn.addEventListener('click', stopSpeechRecognition);
