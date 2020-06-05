const Kinvey = require("kinvey-nativescript-sdk");

function handleErrors(error) {
    console.log("error?");
    console.error(error.message);
}

exports.register = function (user) {
    
    return new Promise((resolve, reject) => {
        
        Kinvey.User.logout()
            .then(() => {
                
                Kinvey.User.signup({ 
                username: user.email,
                password: user.password,
                fullname: user.fullname,
                age: user.age,
                gender: user.gender,
                mobile: user.mobile,
                currentLocation: user.currentLocation,
                nearestPoliceStation: user.nearestPoliceStation  
            }).then(resolve)
                    .catch((error) => { handleErrors(error); reject(); })
            })
            .catch((error) => { handleErrors(error); reject(); })
    });
};

exports.login = function (user) {
    return new Promise((resolve, reject) => {
        Kinvey.User.logout()
            .then(() => {
                Kinvey.User.login(user.email, user.password)
                    .then(resolve)
                    .catch((error) => { handleErrors(error); reject(); })
            })
            .catch((error) => { handleErrors(error); reject(); })
    });
};

exports.detail = function (){
    return new Promise((resolve, reject) => {
                        
                Kinvey.User.detail({ fullname: user.fullname, age: user.age, gender: user.gender})
                    .then(resolve => console.log(resolve))
                    .catch((error) => { handleErrors(error); reject(); })
                });
}

// exports.getUserDetails = function(){
//         return new Promise((resolve,reject) =>{
//             Kinvey.User.getActiveUser()
//             .then(resolve => resolve.data)
//             .catch((error)=> {handleErrors(error); reject(); })

//         });
// }

exports.resetPassword = function (email) {
    return Kinvey.User.resetPassword(email)
        .catch(handleErrors);
}
