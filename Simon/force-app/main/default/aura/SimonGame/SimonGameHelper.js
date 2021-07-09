({
    // clears game 
    init : function(component) {
        console.log('made it here');
        var rows = [];
        component.set("v.GeneratedList",rows);
        component.set("v.CurrIndex",0);
    },
    startGame : function(component, event) {
        console.log('startedGame'); 
        
        //document.getElementById('IDYellow').style.setProperty('opacity', '0');
        component.set("v.GameStarted",true);
        
        
        var divCard = document.getElementById("DisplayText");
        
        var countdown = 5; 
        var context = this;
        divCard.innerHTML = countdown;
        countdown--;
        
        
        this.recursiveStartGame(context, countdown, divCard, component);
    },
    // a timer countdown that recursively calls itself
    recursiveStartGame : function(helper, countdown, divCard, component){
        window.setTimeout(function(){
            divCard.innerHTML = countdown;
            countdown--;
            if(countdown>=0){
                helper.recursiveStartGame(helper,countdown, divCard, component);
            }else{
                console.log("here");
                divCard.innerHTML = "GO!";
                
                helper.incDiff(component);	
                helper.playSequence(component);
            }
        },1000);
    },
    // playSequence -> flashIconUp (x times) -> flashIconDown (x times) -> playSequence
    playSequence : function(component){
        var rows = component.get("v.GeneratedList");
        this.flashIconUp(component, this.returnColor(rows[0]), 100, .4, this, this.testFunc) // uses the number at the index to get the ID using the helper method
        //component.set("v.ButtonsNotPushable",false);
    },
    testFunc : function(component){
        console.log('works');
        component.set("v.ButtonsNotPushable",false);

    },
    incDiff : function(component){
        var rows = component.get("v.GeneratedList");
        rows.push(Math.floor(Math.random()*4));
        
        component.set("v.GeneratedList",rows);
        console.log(rows);
    },
    handlePlayerInput : function(component, userInput){
        if(component.get("v.GameStarted")){
            console.log(this.returnColor(userInput));
            
            var index = component.get("v.CurrIndex");
            var rows = component.get("v.GeneratedList");
            
            if(userInput==rows[index]){
                console.log("correct!");
                
                // Decides if game increase diff or resets
                if(index+1>=rows.length){
                    this.incDiff(component);
                    component.set("v.CurrIndex",0);
                }else{
                    index++;
                    component.set("v.CurrIndex",index);
                }
                
            }else{
                console.log("incorrect!");
                this.gameEnd(component)
            }
        }
    },
    gameEnd : function(component){
        component.set("v.GameStarted",false);
        this.init(component);
    },
    // play animation to inc opacity, and leads into flashIconDown (below)
    flashIconUp : function(component, iconID, time, opacity, helper, func){
        console.log('made it in');
        window.setTimeout(function(){
            document.getElementById(iconID).style.setProperty('opacity', opacity);
            opacity+=.05
            if(opacity>=1){
                helper.flashIconDown(component, iconID, time, opacity, helper, func);
            }else{
                helper.flashIconUp(component, iconID, time, opacity, helper, func);
            }
        }, time);
    },    
    flashIconDown : function(component, iconID, time, opacity, helper, func){
        console.log('made it here')
        window.setTimeout(function(){
            document.getElementById(iconID).style.setProperty('opacity', opacity);
            opacity-=.05
            if(opacity<=.4){
                //helper.flashIconDown(component, iconID, 500, opacity);
                console.log('done');
                func(component);
            }else{
                helper.flashIconDown(component, iconID, time, opacity, helper, func);
            }
        }, time);
    },
    returnColor : function(num){
        let color = "IDRed";
        switch(num){
            case 0:
                color = "IDRed";
                break;
            case 1:
                color = "IDBlue";
                break;
            case 2:
                color = "IDGreen";
                break;
            case 3:
                color = "IDYellow";
                break;
        }
        return color;
    }
})