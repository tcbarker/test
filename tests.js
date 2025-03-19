





class voice{
    
    constructor(){
        this.volume = 1.0;
        this.setpeople([
            {
                pitch:0.8, rate:0.8, voice:null, langs:["fr", "de"]
            },
            {
                pitch:1.4, rate:1.4, voice:null,  langs:["es", "ja"]
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
        const voices = window.speechSynthesis.getVoices();
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





async function testpromisething(thing = document.body, name = "requestFullscreen"){
    let resulttext = "trying it: ";

    const typer = (Thing, Name=null)=>{
        if(Name===null){
            resulttext+="{trying:??}";
        } else {
            resulttext+="{trying:?ob?->"+Name+"}";
        }
        const typeofthing = typeof(Thing);
        resulttext+="<"+typeofthing+">";
        if(Name!==null){
            if(typeofthing==="object"){
                resulttext+="{"+Name+" is "+typeof(Thing[Name])+"}";
            } else {
                resulttext+="{NOT AN OBJECT!}";
            }
        }
    }

    try {
        const mer = await undefined;//this is fine. will continue..

        typer(thing,name);
        const result = thing[name]?.();
        typer(result,"then");

        resulttext+="{awaiting}";
        const waited = await result;
        resulttext+="{undefined?}";
        typer(waited);

    } catch (err) {
        resulttext+="{catch:"+err.message+"}";
    }
    return resulttext;
}











const result = document.createElement("div");
result.innerText = "STUFF: ";
document.body.appendChild(result);

async function thingy(){
    result.innerText = await testpromisething(); 
}
//thingy();


const voo = new voice();

const beep = document.createElement("div");
beep.innerText = "meer";
document.body.appendChild(beep);


const fullscreenbutton = document.createElement("button");
fullscreenbutton.innerText = "test 1";
//fullscreenbutton.onclick = thingy;
document.body.appendChild(fullscreenbutton);

fullscreenbutton.onclick = async(e)=>{
    if(document.body.requestFullscreen===undefined){
        //result.innerText+="this is an iphone, yeah?";
        if(beep.requestFullscreen===undefined){
            voo.say({comment:"This is gonna blow my bollocks off."});
        } else {
            voo.say({comment:"David had an idea brewing."});
        }
    } else {
        const thing = document.body.requestFullscreen();
        voo.say({comment:"Bloody hell, send it back."});
    }
};







const speakbutton = document.createElement("button");
speakbutton.innerText = "test 2";
document.body.appendChild(speakbutton);

speakbutton.onclick = async (e) => {
    voo.say({user:true, comment:"JEFF MAN!!! let us go and seed what that strange looking man is doing."});
};


const btn3 = document.createElement("button");
btn3.innerText = "test 3 - do last";
document.body.appendChild(btn3);


btn3.onclick = async (e) => {
    fullscreenbutton.style.display = "none";
    speakbutton.style.display = "none";
    btn3.style.display = "none";
    await new Promise(r => setTimeout(r, 500));
    voo.say({comment:"Oi mate, can you bloody well hear this or not? ehhhh davey!"});
    fullscreenbutton.style.display = "block";
    speakbutton.style.display = "block";
    btn3.style.display = "block";
};
