({
    // clears game/reinits everything
    init : function(component, helper) {
        console.log('made it here');
        var rows = [];
        component.set("v.GeneratedList",rows);
        component.set("v.CurrIndex",0);
        component.set("v.CurrDispIndex",0);
        component.set("v.CurrCombo",0);
        component.set("v.ButtonsNotPushable",true);
        component.set("v.GameStarted",false);
        
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
        if(component.get("v.GameStarted")){
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
        }
    },
    // playSequence -> flashIconUp (x times) -> flashIconDown (x times) -> playSequence
    playSequence : function(component, helper){
        if(component.get("v.GameStarted")){
            var rows = component.get("v.GeneratedList");
            var index = component.get("v.CurrDispIndex");
            console.log('nother sequence at index: '+index);
            if(index<rows.length){
                helper.flashIconUp(component, helper.returnColor(rows[index]), 75, .4, helper, helper.playSequence) // uses the number at the index to get the ID using the helper method
            }else{
                console.log('made it here 2');
                helper.testFunc(component, helper);
            }
        }
    },
    testFunc : function(component, helper){
        var divCard = document.getElementById("DisplayText");
        divCard.innerHTML = "Go!";
        component.set("v.ButtonsNotPushable",false);
    },
    removeText : function(component){
        var divCard = document.getElementById("DisplayText");
        
        window.setTimeout(function(){
            if(component.get("v.GameStarted")){
                divCard.innerHTML = "...";
            }
        },500)
    },
    incDiff : function(component){
        if(component.get("v.GameStarted")){
            var rows = component.get("v.GeneratedList");
            rows.push(Math.floor(Math.random()*4));
            component.set("v.GeneratedList",rows);
        }
    },
    
    // plays animation
    handlePlayerInput : function(component, userInput, helper){
        helper.flashIconUp(component, helper.returnColor(userInput), 20, .4, helper, helper.handlePlayerInputPart2, userInput)
    },
    // handles logic to check for player input
    handlePlayerInputPart2 : function(component, helper, userInput){
        if(component.get("v.GameStarted")){
            console.log(helper.returnColor(userInput));
            
            var index = component.get("v.CurrIndex");
            var rows = component.get("v.GeneratedList");
            
            
            
            if(userInput==rows[index]){
                console.log("correct!");
                var divCard = document.getElementById("DisplayText");
                divCard.innerHTML = "Correct color!";
                
                // Decides if game increase diff or resets
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
                console.log("incorrect!");
                helper.gameEnd(component, helper)
            }
        }
    },
    gameEnd : function(component, helper){
        var divCard = document.getElementById("ComboText");
        divCard.innerHTML = "Sequences cleared: 0";
        divCard = document.getElementById("DisplayText");
        divCard.innerHTML = "Click Start to Play!";
        for(var i = 0;i<4;i++)
            document.getElementById(helper.returnColor(i)).style.setProperty('opacity', .4);
        this.init(component, helper);
    },
    // play animation to inc opacity, and leads into flashIconDown (below)
    // Used by both playSequence and handlePlayerInput
    flashIconUp : function(component, iconID, time, opacity, helper, func, userInput){
        if(component.get("v.GameStarted")){
            console.log('made it in');
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
        }
    },    
    flashIconDown : function(component, iconID, time, opacity, helper, func, userInput){
        if(component.get("v.GameStarted")){
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
        }
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