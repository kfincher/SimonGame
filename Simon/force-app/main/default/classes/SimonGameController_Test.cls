/////////////////////////////////////////////////
//
//  Name: SimonGameController_Test
//  Author: Kameron Fincher
//  Description: A test for the apex 
//  SimonGameController  
//
/////////////////////////////////////////////////

@isTest
public class SimonGameController_Test {
    @isTest
    static void main(){
        for(Integer i = 0;i<5;i++){
        	SimonGameController.insertScore(i); //normally only one score would be inserted in a short time; only doing this for this test
        }
        
        List<Simon_Game_Score__c> sim = [SELECT Score__c FROM Simon_Game_Score__c];
        
        System.assertEquals(5,sim.size());
        System.assertEquals(4, SimonGameController.game());
    }
}