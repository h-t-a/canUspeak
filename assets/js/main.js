const inputSpeech = document.querySelector('#speech');
const micBtn = document.querySelector(".btn");
const micIcon = micBtn.querySelector("i");

var p = inputSpeech.querySelector('p');
//use Web Speech API 
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

//answer and question
var quest = [
    { question: 'who are you', answer: "I'm Webae" },
    { question: 'thank you', answer: "You're welcome"},
    { question: 'nice to meet you', answer: "nice to meet you too"},
    { question: "what's your name", answer: "My name is Webae" },
    { question: 'can you speak', answer: "No, I can listen to you" },
    { question: "what are you", answer: "My name is Webae. I have the ability to identify words spoken aloud and convert them into readable text using Web Speech API." },
    { question: "how are you", answer: "i'm fine" },
    { question: 'what can you do for me', answer: "I can Listen for you, whatever you want to speak. I'll be here for you." }
];

recognition.interimResults = true; // catch users speech while they are speaking
recognition.continuous = true;

// mic button event
micBtn.addEventListener("click", function () {
    if (micIcon.classList.contains('fa-microphone'))    
    {   
        //start speech recognition
        recognition.start();
    }
    else 
    {
        //stop speech recognition
        recognition.stop();

    }
});

recognition.onstart = () => {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
}

recognition.onend = () => {
    p.innerText = " ";
    reply.innerText = " ";
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
   
}


var reply = document.createElement('p');
reply.classList.add("reply");
inputSpeech.appendChild(reply);

//speech result
recognition.onresult = (event) => {
   reply.innerText = " ";

    var speech =  Array.from(event.results)
       .map(result => result[0])
       .map(result => result.transcript)
       .join('');
       
   p.innerText = speech;

   for (let i = 0; i < event.results.length; i++) {
        for (let j = 0; j < quest.length; j++) {
            var test = event.results[i][0].transcript;
            if(test.includes(quest[j].question)){
                reply.innerText = quest[j].answer;
            }
        }
   }
   
}

