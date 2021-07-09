({
	init : function(component, event, helper) {
		helper.init(component);
	},
    startGame : function(component, event, helper) {
		helper.startGame(component, event);
	},
    
    // Input block that's tied to the color buttons
    userInputRed : function(component, event, helper) {
		helper.handlePlayerInput(component, 0);
	},
    userInputBlue : function(component, event, helper) {
		helper.handlePlayerInput(component, 1);
	},
    userInputGreen : function(component, event, helper) {
		helper.handlePlayerInput(component, 2);
	},
    userInputYellow : function(component, event, helper) {
		helper.handlePlayerInput(component, 3);
	}
    
    
})