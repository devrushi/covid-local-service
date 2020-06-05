const app = require("tns-core-modules/application");
const SurveyViewModel = require("./service-survey-view-model");
var Kinvey = require('kinvey-nativescript-sdk');
const observableModule = require("tns-core-modules/data/observable");
const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
var locInfo = new SurveyViewModel();
const { Frame } = require("tns-core-modules/ui/frame");
var addArray = new ObservableArray();


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







exports.addItem = function(args){
  
  const page = args.view.bindingContext;
  var add = args.object; 
  var query = new Kinvey.Query();
  var addtext = add.getViewById('addBtn');
  var count=0;
  var found=false;
  
  var dataStore = Kinvey.DataStore.collection("serviceAvailable",Kinvey.DataStoreType.Auto);
  
    dataStore.find()
    .then(function(entities){  
     
      entities.forEach(function(entity){  
        if(entity["essentialServiceNeeded"].trim() == page.name.trim()){
          found =true;
          
        }
        
        
      });
      count++;
        if(count == 1 && found == false){
          
          var sub = dataStore.save({
                    essentialServiceNeeded :  page.name
                  })
                  .then(function(entity) {
                    alert(page.name+" is added to the list!");      
                    addtext.visibility = "collapsed";
                  })
                  .catch(function(error){
              });
              
        }
        else{
            alert(page.name+" is already added! ");   
            
            addtext.visibility = "collapsed";
        }
        
        
        count=0;
        
      
  });
} 
  
  function onNavigatingTo(args) {

    const page = args.object;
    
   
    page.bindingContext = locInfo;
}






function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}
exports.onNavigationItemTap = onNavigationItemTap;
exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;





//This should used for storing the input in an Array
// exports.saveData = function(){
//   var dataStore = Kinvey.DataStore.collection("serviceAvailable");
//   var sub = dataStore.save({
    
//     essentialServiceNeeded :  addArray+","
//   })
//     .then(function(entity) {
//         alert("Needed Services items are stored!");
//         console.log(entity);
//         addArray ="";        
//   })
//   .catch(function(error){

//   });

// }



