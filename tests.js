




const voiceno = document.createElement("h1");
document.body.appendChild(voiceno);


let index = 0;

async function speakbeast(text, pitch = 1.0, rate = 1.0){
    const voices = window.speechSynthesis.getVoices();
    if(voices.length===0){
        return false;
    }
    if(index>=voices.length){
        index = 0;
    }

    const voice = voices[index++];
    voiceno.innerText = "voice number "+index.toString()+" "+voice.name+" lang:"+voice.lang;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.volume = 1.0;
    //utterance.lang = "en-GB";
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.voice = voice;

    if(window.speechSynthesis.speaking){
        window.speechSynthesis.cancel();
    }
    window.speechSynthesis.speak(utterance);

    return true;
}






const testbtn = document.createElement("button");

async function buttonfunc(event){
    testbtn.style.display = "none";
    if(await speakbeast("Oi mate, said it wo good!")===false){
        index = 0;
        window.speechSynthesis.onvoiceschanged = (event)=>{
            buttonfunc();
        }
    } else {
        testbtn.style.display = "block";
    }
}


testbtn.innerText = "test";
testbtn.onclick = buttonfunc;
document.body.appendChild(testbtn);




