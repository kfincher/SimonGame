({
	init : function(component, event, helper) {
		helper.init(component, helper);
	},
    startGame : function(component, event, helper) {
		helper.startGame(component, event);
	},
    
    // Input block that's tied to the color buttons
    userInputRed : function(component, event, helper) {
		helper.handlePlayerInput(component, 0, helper);
	},
    userInputBlue : function(component, event, helper) {
		helper.handlePlayerInput(component, 1, helper);
	},
    userInputGreen : function(component, event, helper) {
		helper.handlePlayerInput(component, 2, helper);
	},
    userInputYellow : function(component, event, helper) {
		helper.handlePlayerInput(component, 3, helper);
	},
    gameEnd: function(component, event, helper) {
		helper.gameEnd(component, helper);
	},
    
    
})