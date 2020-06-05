const observableModule = require("tns-core-modules/data/observable");
const Kinvey = require('kinvey-nativescript-sdk');
const SelectedPageService = require("../shared/selected-page-service");
const currentUser = Kinvey.User.getActiveUser();
var statename;
var districtname;
var confirmedSpeople;
var confirmedDpeople;
var countConf = 0;
var userState;
var userDistrict;    
var zone;
var processing= false;
    
function HomeViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Home");


    processing= true;
    if(currentUser.data != ""){
        var curlocation = currentUser.data["currentLocation"];
        curlocation = curlocation.split(",");
        userState = curlocation[2].trim();
        userDistrict = curlocation[1].trim();
    }

    fetch("https://api.covid19india.org/zones.json")
    .then(res => dataArray = res.json())
    .then(zoneData => {
        // console.log("zoneD "+zoneData["zones"]);
        zoneData["zones"].forEach(function(zoneItem){
            if(zoneItem["district"] == userDistrict && zoneItem["state"]== userState){
                zone = zoneItem["zone"];
            }
        });
        
    });
    fetch("https://api.covid19india.org/v2/state_district_wise.json")
    .then(res => dataArray = res.json())
    .then(data => {

                    data.forEach(function(item){
                        countConf=0;
                        if(item["state"] == userState){
                           
                            var districtData = item["districtData"];
                            districtData.forEach(function(area){
                                
                                    countConf +=  area["confirmed"]; 
                                
                            
                                
                                if(area["district"] == userDistrict){
                                    // alert(userState+" - "+userDistrict);
                                    statename =  "State : "+item["state"]; 
                                    districtname = "District : "+area["district"]; 
                                    confirmedDpeople = area["district"]+" District Confirmed Cases : "+area["confirmed"];          
                                    
                                    // if(confirmedDpeople >)
                                }
                                
                            });
                            // console.log(countConf);
                            confirmedSpeople = item["state"]+" State Confirmed Cases : "+countConf;
                        }
                        processing=false;

                    });
                });

        const viewModel = observableModule.fromObject({
            
                            statename: statename,
                            districtname: districtname,
                            confirmedStatepeople: confirmedSpeople,
                            confirmedDistrictpeople : confirmedDpeople,
                            zone :zone
                            
                        });
        
        return viewModel;               
    
}

module.exports = HomeViewModel;
