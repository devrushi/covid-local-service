const app = require("tns-core-modules/application");
const { Frame } = require("tns-core-modules/ui/frame");
const HomeViewModel = require("./home-view-model");
const backendService = require("../shared/backend-service");
// const modalViewModule = "./modal";


// function onNavigatingTo(args) {
        
//     const page = args.object;
//     page.bindingContext = new HomeViewModel();
    
    
// }
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
    page.bindingContext = new HomeViewModel();
    
    
}


exports.onNavigatingTo = onNavigatingTo;
exports.onNavigationItemTap = onNavigationItemTap;
// exports.onDrawerButtonTap = onDrawerButtonTap;

