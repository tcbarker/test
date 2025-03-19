





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
result.innerText = "result...";
document.body.appendChild(result);

async function thingy(){
    result.innerText = await testpromisething(); 
}

thingy();


const fullscreenbutton = document.createElement("button");
fullscreenbutton.innerText = "mer";
document.body.appendChild(fullscreenbutton);

fullscreenbutton.onclick = thingy;







let resulttext = "";

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

