const observableModule = require("tns-core-modules/data/observable");
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const Kinvey = require('kinvey-nativescript-sdk');
var currentUser = Kinvey.User.getActiveUser();
var userState;
var userDistrict;    
var orgDetails = new ObservableArray();
var orgWeblink = new ObservableArray();
var orgContact = new ObservableArray();
   
    
   


const SelectedPageService = require("../shared/selected-page-service");

if(currentUser.data != ""){
    var curlocation = currentUser.data["currentLocation"];
    curlocation = curlocation.split(",");
    userState = curlocation[2].trim();
    userDistrict = curlocation[1].trim();
}

function FeaturedViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Featured");
    fetch("https://api.covid19india.org/resources/resources.json")
    .then(res => dataArray = res.json())
    .then(orgData => {
        orgDetails.splice(0);
        orgData["resources"].forEach(function(orgItem){
            
            if(orgItem["city"]== userDistrict && orgItem["state"] == userState ){
                
                orgDetails.push(orgItem);
                // orgWeblink.push("Weblink : "+ orgItem["contact"]);
            }
            
        });
        
            
    });
    
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        org: orgDetails
        // link : orgWeblink        
    });

    return viewModel;
}

module.exports = FeaturedViewModel;
