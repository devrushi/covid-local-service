
const app = require("tns-core-modules/application");
const { Frame } = require("tns-core-modules/ui/frame");
const SettingsViewModel = require("./settings-view-model");
var page
function onLoad(args) {
   page  = args.object;
    page.bindingContext = new SettingsViewModel();
}

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

    // const drawerComponent = application.getRootView();
    // drawerComponent.closeDrawer();
    
}

// function onDrawerButtonTap(args) {
//     const sideDrawer = app.getRootView();
//     sideDrawer.showDrawer();
// }
exports.onSave = function(){
    const Kinvey = require('kinvey-nativescript-sdk');
    const currentUser = Kinvey.User.getActiveUser();
    var mobile = page.getViewById("mobile");
    var location = page.getViewById("location");
    var police = page.getViewById("police");
alert("here");
    var sub = currentUser.update({
        mobile :mobile.text,
        currentLocation : location.text,
        nearestPoliceStation :police.text
    }).then(function(entity) {
        alert("Details are updated!");        
      })
      .catch(function(error){
  });





}
exports.onNavigationItemTap = onNavigationItemTap;
exports.onLoad = onLoad;
// exports.onDrawerButtonTap = onDrawerButtonTap;
