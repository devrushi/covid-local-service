const LoginViewModel = require("./login-view-model");
const backendService = require("../shared/backend-service");
const loginViewModel = new LoginViewModel();
const ListViewEventData = require("nativescript-ui-listview");
backendService.setup();

exports.onNavigatingTo = function (args) {
    const page = args.object;
    page.bindingContext = loginViewModel;
    
}

