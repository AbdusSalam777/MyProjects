//JS Code starts here

let word,syn,exmp,def,part;


async function show(){
    const text=document.getElementById("text").value;
    word=text;

    await fetchData(word);

    document.getElementById("syn").textContent=syn;
    document.getElementById("ant").textContent=exmp;
    document.getElementById("exam").textContent=def;
   document.getElementById("part").textContent=part;
}

async function fetchData(word){
    const word_data=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data_json=await word_data.json();
    console.log(data_json);

    syn = data_json[0].meanings[0].synonyms;  // Array of synonyms
    exmp = data_json[0].meanings[0].definitions[0].example;  // Array of antonyms
    def = data_json[0].meanings[0].definitions[0].definition;  // Definition text
    part = data_json[0].meanings[0].partOfSpeech;  // Part of speech
}
