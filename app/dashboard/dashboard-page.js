const app = require("tns-core-modules/application");
const { Frame } = require("tns-core-modules/ui/frame");
const DashboardViewModel = require("./dashboard-view-model");

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



function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new DashboardViewModel();
}

function onDrawerButtonTap(args) {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.onNavigatingTo = onNavigatingTo;
exports.onDrawerButtonTap = onDrawerButtonTap;
exports.onNavigationItemTap = onNavigationItemTap;
