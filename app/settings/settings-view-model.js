const observableModule = require("tns-core-modules/data/observable");
const SelectedPageService = require("../shared/selected-page-service");
const Kinvey = require('kinvey-nativescript-sdk');
const currentUser = Kinvey.User.getActiveUser();
var username;
var fullname;
var age;
var gender;
var mobile;
var curlocation;
var nearPoliceStation;


function SettingsViewModel() {
    

    
        curlocation = currentUser.data["currentLocation"];
        username = currentUser.data["username"];
        fullname = currentUser.data["fullname"];
        age = currentUser.data["age"];
        gender = currentUser.data["gender"];
        mobile = currentUser.data["mobile"];
        nearPoliceStation = currentUser.data["nearestPoliceStation"];

    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
        location : curlocation,
        email : username,
        name : fullname,
        age : age,
        gender : gender,
        mobile : mobile,
        police : nearPoliceStation
    });
    SelectedPageService.getInstance().updateSelectedPage("Settings");
    return viewModel;
}

module.exports = SettingsViewModel;
