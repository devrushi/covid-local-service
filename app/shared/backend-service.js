const init = require("kinvey-nativescript-sdk").init;
const kinveyAppKey = "kid_HkXq2k1FI";
const kinveyAppSecret = "c614f0bfc19d4633bd6121c5c90546d5";
const kinveyUsername = "admin";
const kinveyPassword = "admin";

exports.setup = function () {
    init({
        appKey: kinveyAppKey,
        appSecret: kinveyAppSecret
    });
};
