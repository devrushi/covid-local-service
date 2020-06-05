const observableModule = require("tns-core-modules/data/observable");
const dialogsModule = require("tns-core-modules/ui/dialogs");
const { Frame } = require("tns-core-modules/ui/frame");
const geolocation = require("nativescript-geolocation");
const Accuracy = require("tns-core-modules/ui/enums");
const userService = require("../shared/user-service");

geolocation.enableLocationRequest();
    
    
    

function LoginViewModel() {
    const viewModel = observableModule.fromObject({
        email: "",
        password: "",
        confirmPassword: "",
        fullname:"",
        age:"",
        gender:"",
        mobile:"",
        currentLocation:"",
        nearestPoliceStation:"",
        isLoggingIn: true,
        processing: false,

        toggleForm() {
            this.isLoggingIn = !this.isLoggingIn;

            if(!this.isLoggingIn){
                this.set("processing", true);
                geolocation.getCurrentLocation({ 
                    desiredAccuracy:Accuracy.high, 
                    maximumAge: 5000, 
                    timeout: 20000 })
                .then(loc => {
                    
                    fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + loc.latitude + "," + loc.longitude + "&key=<USER KEY>")
                    .then(response => response.json())
                     .then(res => {
                        this.set("processing", false);
                        this.set("currentLocation", res.results[0].address_components[1].long_name +", "+res.results[0].address_components[3].long_name+", "+res.results[0].address_components[4].long_name);
                   });
                    
                });
                

            }
        },
        submit() {
            if (this.email.trim() === "" || this.password.trim() === "") {
                alert("Please provide both an email address and password.");
                return;
            }

            
            if (this.isLoggingIn) {
                this.login();
            } else {
                this.register();
            }
        },
        login() {
            
            userService.login({
                email: this.email,
                password: this.password
            }).then(() => {
                this.set("processing", false);
                
                Frame.topmost().navigate({
                    moduleName: "/home/home-page",
                    transition: {
                        name: "fade"
                    }
                });
            }).catch((e) => {
                this.set("processing", false);
                console.log(e);
                alert("Unfortunately we could not find your account.");
            });
        },
        register() {
            if (this.password != this.confirmPassword) {
                alert("Your passwords do not match.");
                return;
            }
           
            
            userService.register({
                email: this.email,
                password: this.password,
                fullname: this.fullname,
                age: this.age,
                gender: this.gender,
                mobile: this.mobile,
                currentLocation: this.currentLocation,
                nearestPoliceStation: this.nearestPoliceStation
            }).then(() => {
                this.set("processing", false);
                alert("Your account was successfully created. You can now login.");
                this.isLoggingIn = true;
            })
                .catch(() => {
                    this.set("processing", false);
                    alert("Unfortunately we were unable to create your account.");
                });
        },
        forgotPassword() {
            dialogsModule.prompt({
                title: "Forgot Password",
                message: "Enter the email address you used to register for APP NAME to reset your password.",
                inputType: "email",
                defaultText: "",
                okButtonText: "Ok",
                cancelButtonText: "Cancel"
            }).then((data) => {
                if (data.result) {
                    userService.resetPassword(data.text.trim())
                        .then(() => {
                            alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                        }).catch(() => {
                            alert("Unfortunately, an error occurred resetting your password.");
                        });
                }
            });

        },
        

        
    });

    return viewModel;
}

module.exports = LoginViewModel;
