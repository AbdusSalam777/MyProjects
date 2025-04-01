const data=[{
    'question':' Q ) Which of the following is a hypertext language ?',
    'a':'HTML',
    'b':'CSS',
    'c':'PHP',
    'd':'JavaScript',
    'correct':'HTML',
    'correctId':'0'
},   
{
    'question': 'Q ) What does CSS stand for?',
    'a':'Computer Style Sheets',
    'b':'Creative Style System',
    'c':'Cascading Style Sheets',
    'd':'Colorful Style Sheets',
    'correct':'Cascading Style Sheets',
    'correctId':'1'
},

 {
    'question':' What is JavaScript primarily used for?',
    'a':'Styling web pages',
    'b':'Structuring web pages',
    'c':'Adding interactivity to web pages',
    'd':'Managing databases',
    'correct':'Adding interactivity to web pages',
    'correctId':'2'
},

 {
    'question':'What type of database is MongoDB?',
    'a':'Local Storage',
    'b':'SQL',
    'c':'Network',
    'd':'NOSQL',
    'correct':'NOSQL',
    'correctId':'3'
},

 {
    'question':' Which command is used to show all databases in MongoDB?',
    'a':'db',
    'b':'db.dropDatabase()',
    'c':'show dbs',
    'd':'show collections()',
    'correct':'show dbs',
    'correctId':'4'
}

];

let i=0;
let score=0;
score_counter=0;

        showonpage=()=>{
            
        const section=document.getElementById("container"); //section stores HTML of MCQ`s container
        const templateString=`  <!--Question Number-->

         <div class="question-text">Question ${i+1}</div>

            <!--Question-->

            <div class="question">
                ${data[i].question}
            </div>

            <!--Option Buttons-->
            
            <div class="options">
                <button id="button1" onclick="checkOption(this)" class="buttons">${data[i].a}</button>
                <button id="button2" onclick="checkOption(this)" class="buttons">${data[i].b}</button>
                <button id="button3" onclick="checkOption(this)" class="buttons">${data[i].c}</button>
                <button id="button4" onclick="checkOption(this)" class="buttons">${data[i].d}</button>
            </div>

            <button class="next" onclick="nextquestion()">Next</button>

            </div>`;


            section.innerHTML=templateString;
        }

        showonpage();

        let correctButton;

        function nextquestion(){
            i++; 
            score_counter++;
            if(score_counter==5){
                document.getElementById("score").textContent=`Score : ${score}`;
                document.getElementById("score").style.backgroundColor="golden";
             }

            showonpage();

           }

       
           function checkOption(a){
           const id=a.id;

           const option=document.getElementById(id).textContent;
           
            // Get all option buttons
          const buttons = document.querySelectorAll(".buttons");


            let correctButton;
            buttons.forEach(button => {
                if (button.textContent === data[i].correct) {
                    correctButton = button;
                }
            });
                
            if(option===data[i].correct){ 
            document.getElementById(id).style.backgroundColor="Green";
            score++;
           }

            if(option!=data[i].correct){
            
            document.getElementById(id).style.backgroundColor="Red";
            correctButton.style.backgroundColor="Green";
           
           }

             }//end of function
