const observableModule = require("tns-core-modules/data/observable");
const dialogsModule = require("tns-core-modules/ui/dialogs");
const view = require("tns-core-modules/ui/core/view");
const topmost = require("tns-core-modules/ui/frame").topmost;
const userService = require("../shared/user-service");
const SelectedPageService = require("../shared/selected-page-service");






function ServiceSurveyViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("ServiceSurvey");
    
    // console.log(area_value);
    const viewModel = observableModule.fromObject({
        /* Add your view model properties here */
      
         
        
            food: [
                  {name: "Vegetables"},
                  {name: "Meat"},
                  {name: "Fruits"},
                  {name: "Milk/Bread"},
                  {name: "Others"}
                ],

            home: [
                     {name: "Toiletries"},
                     {name:"Home Cleaning"},
                     {name:"Electric Items (Bulbs, CFL etc)"},
                     {name:"Others"}
                ],
            medicalServices : [
                            {name:"Availability of doctors"},
                            {name: "Operational timings of doctors"},
                            {name:"Timings of Medical Stores"},
                            {name:"Government hospitals"},
                            {name:"Private hospitals"},
                            {name:"Private Clinics"}
                ],
                OtherEssential :[
                                {name:"Gas"},   
                                {name:"Electricity"},
                                {name:"Water supply"},
                                {name:"Internet"},
                                {name:"Electricians"},
                                {name:"Plumbers"},
                                {name:"Others"}
                ]

            
            
        
    });

 

    return viewModel;
}

module.exports = ServiceSurveyViewModel;
