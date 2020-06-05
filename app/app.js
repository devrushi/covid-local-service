const application = require("tns-core-modules/application");
const backendService = require("../app/shared/backend-service");
backendService.setup(); // Initialize Kinvey Backend
application.run({ moduleName: "app-root/app-root" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
