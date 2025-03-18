




let resulttext = "";




class voice{
    
    constructor(){
        this.volume = 1.0;
        this.setpeople([
            {
                voice:null, langs:["en"]
            },
            {
                voice:null, langs:["fr"]
            }
        ]);
    }

    setpeople(people){
        this.people = [];
        people.forEach( person=>{
            this.people.push({
                pitch:person.pitch || 1.0,
                rate:person.rate || 1.0,
                voice:null,
                langs:person.langs || ["en"]
            });
        });
        //console.log(this.people);
        this.langs = {};
        this.people.forEach( person=>{
            person.langs.forEach( lang=>{
                this.langs[lang] = {};
            });
        });

        if(window.speechSynthesis.getVoices().length===0){
            window.speechSynthesis.onvoiceschanged = (event)=>{
                //console.log(event);
                this.setvoices();
            }
        } else {
            this.setvoices();
        }
    }

    setvoices(){
        resulttext+=" setting voices.. ";
        const voices = window.speechSynthesis.getVoices();
        resulttext+=voices.length.toString()+" ";
        //console.log(voices);
        for (const [key, value] of Object.entries(this.langs)) {
            value.voices = [];
            for(let voiceno = 0;voiceno<voices.length;voiceno++){
                if(voices[voiceno].lang.startsWith(key)){
                    value.voices.push({voiceno});
                }
            }
        }
        this.people.forEach( person=>{
            for(let i = 0;i<person.langs.length;i++){
                const lang = this.langs[person.langs[i]];
                const count = lang.voices.length;
                if(count>0){
                    person.voice = voices[lang.voices[0].voiceno];
                    break;
                }
            }
        });
        //console.log(this.people);
    }

    setgain(newgain){
        this.volume = newgain;
        if(window.speechSynthesis.speaking){
            window.speechSynthesis.cancel();
            if(this.utterance!==undefined){
                this.utterance.volume = this.volume;
                if(newgain>0){
                    window.speechSynthesis.speak(this.utterance);
                }
            }
        }
    }

    say(userandcomment){
        const person = this.people[userandcomment.user?1:0];
        this.utterance = new SpeechSynthesisUtterance();
        this.utterance.text = userandcomment.comment;
        this.utterance.volume = this.volume;
        //this.utterance.lang = "en-GB";
        this.utterance.pitch = person.pitch;
        this.utterance.rate = person.rate;
        this.utterance.voice = person.voice;
        //console.log(this.utterance);
        if(window.speechSynthesis.speaking){
            window.speechSynthesis.cancel();
        }
        if(this.volume>0){
            window.speechSynthesis.speak(this.utterance);
        }
    }

}



const voo = new voice();



const result = document.createElement("div");
result.innerText = "result...";
document.body.appendChild(result);


const fullscreenbutton = document.createElement("button");
fullscreenbutton.innerText = "test 1";
document.body.appendChild(fullscreenbutton);

fullscreenbutton.onclick = async (e) => {
    resulttext += "TRYING FS... ";
    await document.body.requestFullscreen().then( ()=>{
        resulttext += "said it wo good! ";
    }).catch(err =>{
        //fullscreenerror event will trigger
        resulttext += "OI MATE! ERROR! "+err.message+" ";
    });
    result.innerText = resulttext;    
};



const speakbutton = document.createElement("button");
speakbutton.innerText = "test 2";
document.body.appendChild(speakbutton);

speakbutton.onclick = async (e) => {
    resulttext += "try UT ";
    voo.say({comment:"Snapped... me belt.."});
    result.innerText = resulttext;  
};




const speakbutton2 = document.createElement("button");
speakbutton2.innerText = "test 3";
document.body.appendChild(speakbutton2);

speakbutton2.onclick = async (e) => {
    resulttext += "try UT2 ";
    voo.say({user:true, comment:"Bust... me phone!!!"});
    result.innerText = resulttext;  
};

