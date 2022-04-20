import io from 'socket.io-client';
import 'survey-react/survey.css';
import * as Survey from "survey-jquery";
import $ from "jquery";
import './defaultV2.css';

export default class SocketHandler{
    constructor(scene, GameHandler){

        this.placeSceneFunction = () => {
        console.log('Placing next scene');
        /**
         * Initializations of scene for each Map
         */
        scene.sceneTime = 50;
        scene.currentlySelectedCar = null;
        scene.finalCustomerSelected=[];
        scene.finalCarSelected=[];
        scene.customerWaitingTime = [];
        scene.customerColor = [];
        scene.carColor = [];
        // this.GameHandler.hideAnyPath();
        this.GameHandler.promptWaitTimeCustomer();
        this.GameHandler.promptWaitTimeCar();
        this.GameHandler.removeOutputPath();
        this.GameHandler.dots = [];
        this.GameHandler.carId = null;
        this.GameHandler.customerId = null;
        this.GameHandler.infoDist = null;
        this.GameHandler.pathButton = null;
        this.GameHandler.selectedCar = null;
        scene.hideBlueText = false;
        scene.hideRedText = false;
        scene.hideYellowText = false;
        scene.hideGreenText = false;
        scene.inputCount = 0;
        // this.GameHandler.hideAnyPath();
        scene.currentMap = index-1;
        scene.Maps[index-1].show(scene);
        scene.updateWaitTime();
        for(let i=0; i< scene.Maps[scene.currentMap].cars.length; i++){
            scene.Maps[scene.currentMap].cars[i].instance.on('pointerdown', () => {
                this.GameHandler.hideAnyPath(); 
                this.GameHandler.removeOutputPath();
                scene.socket.emit("selectedCar", i);
                if(scene.currentlySelectedCar==null){
                    this.GameHandler.drawSelectedCar(i);
                    // this.GameHandler.hideCustomers();
                    // this.GameHandler.createDots();
                    scene.currentlySelectedCar = i;
                    // scene.socket.emit('createDots');
                }else{
                    this.GameHandler.removeSelectedCar();
                    if(scene.currentlySelectedCar==i){
                        scene.currentlySelectedCar = null;
                        // this.GameHandler.destroyDots();
                        // this.GameHandler.showCustomers();
                    }else{
                        this.GameHandler.drawSelectedCar(i);
                        // this.GameHandler.destroyDots();
                        // this.GameHandler.createDots();
                        scene.currentlySelectedCar = i;
                        // scene.socket.emit('createDots');
                    }
                }
                this.GameHandler.hideAnyPath();
                this.GameHandler.removeOutputPath();
                if(scene.currentlySelectedCustomer!=null){
                    scene.Maps[scene.currentMap].cars[scene.currentlySelectedCar].drawIndividualPath(scene.currentlySelectedCustomer);
                    this.GameHandler.promptOutputPath(scene.currentlySelectedCar,scene.currentlySelectedCustomer);
                    this.GameHandler.handleButton(scene.currentlySelectedCar,scene.currentlySelectedCustomer);
                }
                console.log('Clicked car index: '+ i);
            })
        }
        for(let i=0; i< scene.Maps[scene.currentMap].customers.length; i++){
            scene.Maps[scene.currentMap].customers[i].instance.on('pointerdown', () => {
                console.log('Clicked customer index: '+ i);
                scene.currentlySelectedCustomer = i;
                this.GameHandler.hideAnyPath();
                this.GameHandler.removeOutputPath();
                if(scene.currentlySelectedCar!=null){
                    scene.Maps[scene.currentMap].cars[scene.currentlySelectedCar].drawIndividualPath(scene.currentlySelectedCustomer);
                    this.GameHandler.promptOutputPath(scene.currentlySelectedCar,scene.currentlySelectedCustomer);
                    this.GameHandler.handleButton(scene.currentlySelectedCar,scene.currentlySelectedCustomer);
                }
            })
        }
    }
        this.GameHandler =  GameHandler;
        this.currentlySelectedDot = null;
        scene.socket =  io('http://localhost:3000/');
        scene.socket.on('connect', () => {
            console.log('Connected!');
            scene.nextButton.setInteractive();
            scene.nextButton.setColor('#00ffff');
            // scene.closeButton.setInteractive();
            // scene.closeButton.setColor('#00ffff');
        })


        scene.socket.on('couponCode', (message)=> {
            alert(message);
        });

        scene.socket.on('placeScene', (index) =>{
            this.placeSceneFunction();
        })

        scene.socket.on('makeDotsWork', () => {
            for(let i=0; i<this.GameHandler.dots.length; i++){
                this.GameHandler.dots[i].on('pointerdown', () => {
                    this.GameHandler.hideAnyPath();
                    console.log('Clicked Dot Id: ', i);
                    this.GameHandler.removeOutputPath();
                    if(scene.currentlySelectedCar!=null){
                        scene.Maps[scene.currentMap].cars[scene.currentlySelectedCar].drawIndividualPath(i);
                        this.GameHandler.promptOutputPath(scene.currentlySelectedCar,i);
                        this.GameHandler.handleButton(scene.currentlySelectedCar,i);
                    }
                    
                })
            }
            

        })

        scene.socket.on('deleteNext',() => {
            scene.nextButton.destroy();
            Survey.StylesManager.applyTheme("defaultV2");
            
            var surveyJSON = {
            "title": "Survey",
            "logoPosition": "right",
            "pages": [
            {
            "name": "page1",
            "elements": [
                {
                "type": "radiogroup",
                "name": "question1",
                "title": "To Which gender identity do you most identify?",
                "isRequired": true,
                "choices": [
                {
                "value": "item1",
                "text": "Male"
                },
                {
                "value": "item2",
                "text": "Female"
                },
                {
                "value": "item3",
                "text": "Other"
                }
                ],
                "hasOther": true,
                "otherText": "Prefer not to answer"
                },
                {
                "type": "radiogroup",
                "name": "question2",
                "title": "How old are you?",
                "isRequired": true,
                "choices": [
                {
                "value": "item1",
                "text": "18-24"
                },
                {
                "value": "item2",
                "text": "25-34"
                },
                {
                "value": "item3",
                "text": "35-44"
                },
                {
                "value": "item4",
                "text": "45-54"
                },
                {
                "value": "item5",
                "text": ">54"
                },
                {
                "value": "item6",
                "text": "Prefer not to answer"
                }
                ]
                },
                {
                "type": "radiogroup",
                "name": "question3",
                "title": "What is the highest level of education you have completed?",
                "isRequired": true,
                "choices": [
                {
                "value": "item1",
                "text": "Less than high school diploma"
                },
                {
                "value": "item2",
                "text": "High school diploma"
                },
                {
                "value": "item3",
                "text": "Undergraduate degree"
                },
                {
                "value": "item4",
                "text": "Masters degree"
                },
                {
                "value": "item5",
                "text": "PhD degree"
                },
                {
                "value": "item6",
                "text": "Prefer not to answer"
                }
                ]
                },
                {
                "type": "radiogroup",
                "name": "question4",
                "title": "What is your total household income?",
                "isRequired": true,
                "choices": [
                {
                "value": "item1",
                "text": "Less than $10,000"
                },
                {
                "value": "item2",
                "text": "$10,000 to $29,999"
                },
                {
                "value": "item3",
                "text": "$30,000 to $59,999"
                },
                {
                "value": "item4",
                "text": "$60,000 to $89,999"
                },
                {
                "value": "item5",
                "text": "$90,000 to $119,999"
                },
                {
                "value": "item6",
                "text": "$120,000 or more"
                },
                {
                "value": "item7",
                "text": "Prefer not to answer"
                }
                ]
                    }
                ]
                }
                ]
            };

            var survey = new Survey.Model(surveyJSON);
            function sendDataToServer(survey, options) {
                scene.socket.emit('survey-data', survey.data);

            }

            scene.surveyButton = scene.add.text(1380,900,"Take Survey").setFontSize(20).setFontFamily('Trebuchet MS');
            scene.surveyButton.setInteractive();
            scene.surveyButton.setColor('#00ffff');
            scene.surveyButton.on('pointerdown', () => {
                scene.scene.remove();
                $("#surveyContainer").Survey({
                    model: survey,
                    onComplete: sendDataToServer
                });
                console.log('Clicked');
            })
    
            scene.surveyButton.on('pointerover', () => {
                scene.surveyButton.setColor('#ff69b4');
            })
    
            scene.surveyButton.on('pointerout', () => {
                scene.surveyButton.setColor('#00ffff');
            })
    
            

        })


        scene.socket.on('disableCarCustomerInteractivity',(inp) => {
            scene.Maps[scene.currentMap].cars[inp[0]].instance.disableInteractive();
            scene.Maps[scene.currentMap].customers[inp[1]].instance.disableInteractive();
            scene.inputCount += 1;
            this.GameHandler.removeOutputPath();
            this.GameHandler.removeSelectedCar();
            this.GameHandler.removeSelectedCustomer();
            this.GameHandler.hideAnyPath();
            scene.currentlySelectedCar = null;
            scene.currentlySelectedCustomer = null;
            scene.finalCustomerSelected.push(inp[1]);
            scene.finalCarSelected.push(inp[0]);
            if(scene.customerColor[inp[1]]===0){
                scene.hideRedText = true;
                if(this.GameHandler.redWaitingCustomer!=null){
                    this.GameHandler.redWaitingCustomer.destroy();
                    // scene.updateWaitTime();
                }
                if(scene.redCustomerText!=null){
                    scene.redCustomerText.destroy();
                }
            }else{
                scene.hideBlueText = true;
                if(this.GameHandler.blueWaitingCustomer!=null){
                    this.GameHandler.blueWaitingCustomer.destroy();
                    // scene.updateWaitTime();
                }
                if(scene.blueCustomerText!=null){
                    scene.blueCustomerText.destroy();
                }
            }
            if(scene.carColor[inp[1]]===0){
                scene.hideGreenText = true;
                if(this.GameHandler.greenWaitingCustomer!=null){
                    this.GameHandler.greenWaitingCustomer.destroy();
                    // scene.updateWaitTime();
                }
                if(scene.greenCustomerText!=null){
                    scene.greenCustomerText.destroy();
                }
            }else{
                scene.hideYellowText = true;
                if(this.GameHandler.yellowWaitingCustomer!=null){
                    this.GameHandler.yellowWaitingCustomer.destroy();
                    // scene.updateWaitTime();
                }
                if(scene.yellowCustomerText!=null){
                    scene.yellowCustomerText.destroy();
                }
            }
            let carSelected = scene.Maps[scene.currentMap].cars[inp[0]];
            let customerSelected = scene.Maps[scene.currentMap].customers[inp[1]];
            let v1 = scene.add.image(carSelected.screenX,carSelected.screenY, 'carBW');
            let v2 = scene.add.image(customerSelected.screenX,customerSelected.screenY, 'customerBW');
            v1.setScale(scene.scalefactor);
            v2.setScale(scene.scalefactor);
            // scene.Maps[scene.currentMap].cars[inp[0]].drawAssignedPath(inp[1]);
        })


    }
}
