const texts = document.querySelector('#texts');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.interimResults =true;
recognition.continuous = true;

// if(recognition){
// console.log("I'm Listening");
// recognition.addEventListener("result",(event)=>{
//     // console.log(event.results);
//     const text = Array.from(event.results)
//     .map(result => result[0])
//     .map(result =>result.transcript)
//     .join('');
//     console.log(text);
// });
// }

recognition.onresult = (event) =>{
    console.log(event)
}


recognition.start();
