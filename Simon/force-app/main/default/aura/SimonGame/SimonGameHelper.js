/////////////////////////////////////////////////
//
//  Name: SimonGameController
//  Author: Kameron Fincher
//  Description: Helper for SimonGame that 
//  handles all logic and input for the game.
//
/////////////////////////////////////////////////

({
    // clears game/reinits everything
    init : function(component, helper) {
        var rows = [];
        component.set("v.GeneratedList",rows);
        component.set("v.CurrIndex",0);
        component.set("v.CurrDispIndex",0);
        component.set("v.CurrCombo",0);
        component.set("v.ButtonsNotPushable",true);
        component.set("v.GameStarted",false);
    },
    
    // start sequence of events that eventually leads to enableInput
    startGame : function(component, event) {
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
            if(component.get("v.GameStarted")){
                divCard.innerHTML = countdown;
                countdown--;
                if(countdown>=0){
                    helper.recursiveStartGame(helper,countdown, divCard, component);
                }else{
                    divCard.innerHTML = "Showing Sequence..."; 
                    helper.incDiff(component);	
                    helper.playSequence(component, helper);
                }
            }
        },1000); 
    },
    
    // This shows all of the colors that are contained within the accumulated list (GeneratedList)
    // the recursive calls are as follows until no more colors need to be shown:
    // playSequence -> flashIconUp (x times) -> flashIconDown (x times) -> playSequence
    playSequence : function(component, helper){
        if(component.get("v.GameStarted")){
            var rows = component.get("v.GeneratedList");
            var index = component.get("v.CurrDispIndex");
            if(index<rows.length){
                helper.flashIconUp(component, helper.returnColor(rows[index]), 75, .4, helper, helper.playSequence) // uses the number at the index to get the ID using the helper method
            }else{
                helper.enableInput(component, helper);
            }
        }
    },
    
    // Enables the player to start playing
    enableInput : function(component, helper){
        var divCard = document.getElementById("DisplayText");
        divCard.innerHTML = "Go!";
        component.set("v.ButtonsNotPushable",false);
    },
    
    // Adds one more color to end of array/queue
    incDiff : function(component){
        if(component.get("v.GameStarted")){
            var rows = component.get("v.GeneratedList");
            rows.push(Math.floor(Math.random()*4));
            component.set("v.GeneratedList",rows);
        }
    },
    
    // plays animation based on input
    handlePlayerInput : function(component, userInput, helper){
        helper.flashIconUp(component, helper.returnColor(userInput), 20, .4, helper, helper.handlePlayerInputPart2, userInput)
    },
    
    // handles logic portion to check for validity of player input
    handlePlayerInputPart2 : function(component, helper, userInput){
        if(component.get("v.GameStarted")){
            
            var index = component.get("v.CurrIndex");
            var rows = component.get("v.GeneratedList");
            
            if(userInput==rows[index]){
                var divCard = document.getElementById("DisplayText");
                divCard.innerHTML = "Correct color!";
                
                // Decides if game increase diff or continues
                if(index+1>=rows.length){
                    helper.incDiff(component);
                    component.set("v.CurrDispIndex",0);
                    component.set("v.CurrIndex",0);
                    component.set("v.ButtonsNotPushable",true);
                    component.set("v.CurrCombo",component.get("v.CurrCombo") + 1);
                    
                    var divCard = document.getElementById("ComboText");
                    divCard.innerHTML = "Sequences cleared: "+component.get("v.CurrCombo");
                    divCard = document.getElementById("DisplayText");
                    divCard.innerHTML = "Showing Sequence..."; 
                    
                    helper.playSequence(component, helper);
                }else{
                    index++;
                    component.set("v.CurrIndex",index);
                }
                
            }else{
                helper.gameEnd(component, helper)
            }
        }
    },
    
    // First portion of reset that clears everything out
    gameEnd : function(component, helper){
        var divCard = document.getElementById("ComboText");
        divCard.innerHTML = "Sequences cleared: 0";
        divCard = document.getElementById("DisplayText");
        divCard.innerHTML = "Click Start to Play!";
        for(var i = 0;i<4;i++)
            document.getElementById(helper.returnColor(i)).style.setProperty('opacity', .4);
        this.init(component, helper);
    },
    
    // Plays an animation to inc opacity, and leads into flashIconDown (below)
    // Used by both playSequence and handlePlayerInput
    // func is used as a reference to both handlePlayerInput and playSequence
    // userInput cannot be used for playSequence, but is required for handlePlayerInput to be called
    flashIconUp : function(component, iconID, time, opacity, helper, func, userInput){
        window.setTimeout(function(){
            if(component.get("v.GameStarted")){
                document.getElementById(iconID).style.setProperty('opacity', opacity);
                opacity+=.05
                if(opacity>=.95){
                    helper.flashIconDown(component, iconID, time, opacity, helper, func, userInput);
                }else{
                    helper.flashIconUp(component, iconID, time, opacity, helper, func, userInput);
                }
            }
        }, time);
    },  
    
    // Always called by flashIconUp (above)
    // Fades back down to .4 and calls the relevant function to go to the next series of events
    flashIconDown : function(component, iconID, time, opacity, helper, func, userInput){
        window.setTimeout(function(){
            if(component.get("v.GameStarted")){
                document.getElementById(iconID).style.setProperty('opacity', opacity);
                opacity-=.05
                if(opacity<=.4){
                    //helper.flashIconDown(component, iconID, 500, opacity);
                    component.set("v.CurrDispIndex",component.get("v.CurrDispIndex") + 1);
                    if(userInput!=null)
                        func(component, helper, userInput); // handlePlayerInput
                    else
                        func(component, helper, userInput); // playSequence
                }else{
                    helper.flashIconDown(component, iconID, time, opacity, helper, func, userInput);
                }
            }
        }, time);
    },
    
    // used for converting indexed numbers to the appropriate ID
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