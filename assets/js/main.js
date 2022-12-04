const inputSpeech = document.querySelector('#speech');
const micBtn = document.querySelector(".btn");
const micIcon = micBtn.querySelector("i");

var p = inputSpeech.querySelector('p');
// var p = document.createElement('p');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.interimResults = true;
recognition.continuous = true;

// mic button event
micBtn.addEventListener("click", function () {
    if (micIcon.classList.contains('fa-microphone'))    //start speech recognition
    {
        recognition.start();
    }
    else //stop speech recognition
    {
        recognition.stop();
    }
});
//answer and question
var quest = [
    { question: "how are you", answer: "i'm fine" },
    { question: 'who are you', answer: "I'm Webae" },
    { question: 'can you speak', answer: "I can listen" },
    {question: "What's your name", answer: "My name is Webae" },
    { question: 'What can you do for me', answer: "I can Listen for you, whatever you want to speak. I'll bee heare for you" }
];

//speech result to show
recognition.onresult = (event) => {
    const speech = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    p.innerText = speech;
    
    if (event.results[0].isFinal) {
        for (let i = 0; i < quest.length; i++) {
            if (speech.includes(quest[i].question)) {
                var reply = document.createElement('p');
                reply.classList.add("reply");
                inputSpeech.appendChild(reply);
                reply.innerText = quest[i].answer;
                break;
            }else if(speech.includes("all clear")|| speech.includes("delete all")){
                p.innerText = " ";
                reply.innerText = " ";
            }
        }
        // reply.innerText = " ";
    }
}

recognition.onstart = () => {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
}

recognition.onend = () => {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
}