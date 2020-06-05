const observableModule = require("tns-core-modules/data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const SelectedPageService = require("../shared/selected-page-service");
const Kinvey = require('kinvey-nativescript-sdk');

function SearchViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Search");


    
    var dataStore = Kinvey.DataStore.collection("serviceAvailable",Kinvey.DataStoreType.Auto);
    var activeUser = Kinvey.User.getActiveUser();
    var serviceNeedList = new ObservableArray ();
    var serviceAvailList = new ObservableArray();
    var sub = dataStore.find()
    .then(function(entities) {
        // ...
        
            entities.forEach(function(entity){
              
              if(activeUser["_id"] == entity["_acl"]["creator"]){
                console.log(entity);
                serviceNeedList.push("Service Name : "+entity["essentialServiceNeeded"]+"\n Track ID : "+entity["_id"]+"\n Service Date : "+entity["_kmd"]["lmt"]);
                // serviceAvailList.push(entity["essentialServiceNeeded"]);
                
              }
             

            });  
            
             
      }, function(error) {
        // ...
      }, function() {
        // ...
      });
         
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
            serviceNeed : serviceNeedList,
            serviceAvailList :["Meat","Water supply"]
    });
    
    return viewModel;
}

module.exports = SearchViewModel;
