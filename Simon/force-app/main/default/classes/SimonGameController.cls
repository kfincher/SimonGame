/////////////////////////////////////////////////
//
//  Name: SimonGameController
//  Author: Kameron Fincher
//  Description: Server side logic for Simon Game 
//  Returns highest score and inserts new scores
//
/////////////////////////////////////////////////

public class SimonGameController {
    @AuraEnabled
    public static Decimal game(){
        return [SELECT Score__c FROM Simon_Game_Score__c ORDER BY Score__c DESC LIMIT 1].Score__c;
    }
    @AuraEnabled 
    public static void insertScore(Integer num){
        insert new Simon_Game_Score__c(Score__c = num);
    }
}