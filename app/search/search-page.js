
const { Frame } = require("tns-core-modules/ui/frame");
const observableModule = require("tns-core-modules/data/observable");
const SearchViewModel = require("./search-view-model");
const fromObject = require("tns-core-modules/data/observable").fromObject;
var page;
var state ;
var district ;
var statename;
var districtname;
var confirmedSpeople;
var confirmedDpeople;
var countConf = "0";
var zone;

function onNavigationItemTap(args) {
    const component = args.object;
    const componentRoute = component.route;
    const componentTitle = component.title;
    const bindingContext = component.bindingContext;
    
    
    
    bindingContext.set("selectedPage", componentTitle);

    Frame.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });
    
}

exports.pageLoaded = function(args){
    page = args.object;
    
}

exports.onSearch= function(){
    
    state = page.getViewById('state');
    district = page.getViewById('district');
    if (state.text.trim() === "" || district.text.trim() === "") {
        alert("Please provide both state and district.");
        return;
    }

    fetch("https://api.covid19india.org/v2/state_district_wise.json")
    .then(res => dataArray = res.json())
    .then(data => {  
        data.forEach(function(item){
            countConf=0;
            
            if(item["state"] == state.text.trim()){
                
                var districtData = item["districtData"];
                districtData.forEach(function(area){
                    countConf +=  area["confirmed"]; 
                    // console.log(area["district"]+ area["district"].length +" ----- "+district.text.trim()+district.text.trim().length);
                    if(area["district"] == district.text.trim()){
                        // alert(area["district"]+" ----- "+district.text);
                        
                        statename=  item["state"]; 
                        districtname = "District : "+area["district"]; 
                        confirmedDpeople = area["district"]+" District Confirmed Cases : "+area["confirmed"];          
                    }
                });
        
                confirmedSpeople = item["state"]+" State Confirmed Cases : "+countConf;
            }   
        });
    });
    var searchResult = new observableModule.fromObject({
        statename : statename,
        confirmedStatepeople : confirmedSpeople,
        districtname : districtname,
        confirmedDistrictpeople : confirmedDpeople
    
    });
    
    page.bindingContext =  searchResult;
}





exports.onNavigationItemTap = onNavigationItemTap;