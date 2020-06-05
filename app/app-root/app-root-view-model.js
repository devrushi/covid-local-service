const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");
var Kinvey = require('kinvey-nativescript-sdk');


function AppRootViewModel() {
    
    
    // var currentUser = Kinvey.User.getActiveUser();
    // if(currentUser.me()){
        var uname;// = currentUser.data["username"];
        var fname;// = currentUser.data["fullname"];    
    // }
        
    
    
    

    const viewModel = observableModule.fromObject({
        selectedPage: "",
        username: uname,
        fullname: fname, 
    });

    SelectedPageService.getInstance().selectedPage$
    .subscribe((selectedPage) => { viewModel.selectedPage = selectedPage; });

    return viewModel;
}

module.exports = AppRootViewModel;
