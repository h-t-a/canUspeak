const inputSpeech = document.querySelector('#speech');
const micBtn = document.querySelector(".btn");
const micIcon = micBtn.querySelector("i");

var p = inputSpeech.querySelector('p');
//use Web Speech API 
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.interimResults = true; // catch users speech while they are speaking
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

    { question: 'who are you', answer: "I'm Webae" },
    { question: "what's your name", answer: "My name is Webae" },
    { question: 'can you speak', answer: "No, I can listen" },
    { question: "what are you", answer: "My name is Webae. I have the ability to identify words spoken aloud and convert them into readable text using Web Speech API." },
    { question: "how are you", answer: "i'm fine" },
    { question: 'what can you do for me', answer: "I can Listen for you, whatever you want to speak. I'll be here for you." },

];
// show on screen reply messages or answers
var reply = document.createElement('p');
reply.classList.add("reply");
inputSpeech.appendChild(reply);

//speech result
recognition.onresult = (event) => {
    var speech = " ";

     speech = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
    const res = Array.from(event.results).map(results => results.transcript)
    console.log("full result", res);
    p.innerText = speech;
    reply.innerText = " ";

    // console.log(result1)
    var last = speech.length > 1;
    for (let i = 0; i < quest.length; i++) {
        if (speech.includes(quest[i].question)) {
            reply.innerText = quest[i].answer;
            console.log("array list" ,quest[i].question, quest[i].answer)

        }
        if (speech.includes("how many questions do you have")) {
            var test = quest.map(q => q.question).join('\n');
            console.log("testing",test);
            reply.innerText = "I have a few questions for you:\n"+ test;
        }
        console.log("Result :", last.valueOf())    

    }
}
// function check(param){
//     quest.forEach(element){
//         param = element.question
//     }
// }
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