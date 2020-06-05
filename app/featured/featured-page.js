const app = require("tns-core-modules/application");
const { Frame } = require("tns-core-modules/ui/frame");
const FeaturedViewModel = require("./featured-view-model");
const permission = require('nativescript-permissions');
const TNSphone = require('nativescript-phone');
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;


function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = new FeaturedViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
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

exports.submitRequest = function(args){
    
    const page = args.view.bindingContext;
    alert(page.category +'\n'+ page.contact+'\n'+page.phonenumber);
}

exports.onCall= function(args){
    const page = args.view.bindingContext;
    var mobile = page.phonenumber.split(",");
    
    mobile.forEach(function(mobileItem){
        TNSphone.dial(mobileItem,true)
    })
    
    

}
exports.onNavigatingTo = onNavigatingTo;
exports.onNavigationItemTap = onNavigationItemTap;
exports.onDrawerButtonTap = onDrawerButtonTap;
