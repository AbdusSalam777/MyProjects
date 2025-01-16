        function computer_move(){
            let random_number=0;
        random_number= Math.random();
        
            let computermove=``;

        if(random_number>=0 && random_number<1/3){

        computermove=`Rock`;
        return computermove;


        }

        else if(random_number>1/3 && random_number<2/3){

        computermove=`Paper`;
        return computermove;

        }

        else if(random_number>2/3 && random_number<1){

        computermove=`Scissors`;
        return computermove;

        }

        return 0;

        }

        //Js function to track the result

        let win=0;
        let tie=0;
        let lose=0;

        function tracker(result){

        if(result==='You Win'){

        win=win+1;

        }

        else if(result==='You Lose'){

        lose=lose+1;

        }

        else if(result==='Tie'){

        tie=tie+1;

        }
         
        document.querySelector('.score p').innerHTML = `Wins: ${win} Losses: ${lose} Ties: ${tie}`;       

        }
        

        function reset_score(){

        win=0;
        tie=0;
        lose=0;

        document.querySelector('.score p').innerHTML = `Wins: ${win} Losses: ${lose} Ties: ${tie}`;       


        }
