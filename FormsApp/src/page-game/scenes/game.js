import NewMap from '../helpers/NewMap'
import UIHandler from "../helpers/UIHandler"
import InteractiveHandler from "../helpers/InteractiveHandler"
import SocketHandler from "../helpers/SocketHandler"
import GameHandler from "../helpers/GameHandler"
import carImg from '../assets/car.jpeg'
import customerImg from '../assets/customer.jpeg'
import carImgBW from '../assets/carBW.jpg'
import customerImgBW from '../assets/customerBW.jpg'
import roadImg from '../assets/road.jpeg'
import wallImg from '../assets/wall.jpeg'
import redBoy from '../assets/redBoy.jpg'
import blueBoy from '../assets/blueBoy.jpg'
import greenCar from '../assets/greenCar.jpg'
import yellowCar from '../assets/yellowCar.jpg'
import input1 from '../assets/1.json'
import input2 from '../assets/2.json'
import input3 from '../assets/3.json'
import input4 from '../assets/4.json'


/**
 * Phaser Scene CLass initialized here.
 * It contains initialization of all 
 * the important classes which in running during the game.
 */
export default class Game extends Phaser.Scene {

    /**
     * This the constructor for the Game.
     */
    constructor() {
        super({
            key: 'Game'
        });
    }

    /**
     * This function is normally used to update
     * wait times for all customers as well as cars.
     * However, in the latest version, it is redundant
     * as that eature is removed. However, It is still
     * displaying the wait times.
     */
    updateWaitTime() {
        console.log('updating wait time!!');
        if(this.timeRemaining!=null){
            this.timeRemaining.destroy();
        }
        if(this.sceneTime!=0){
            this.sceneTime-=1;
            this.timeRemaining = this.add.text(1670,900, this.sceneTime).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
        }else{
            this.timeRemaining = this.add.text(1670,900, 0).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
        }
        if(this.sceneTime==0){
            this.socket.emit('NextScene', this.socket.id);
            // this.sceneTime = 50;
        }
        for(let i=0; i<this.customerWaitingTime.length; i++){
            if(this.customerColor.length > i){
                if(this.customerColor[i]==1){
                    if(this.blueCustomerText!=null){
                        this.blueCustomerText.destroy();
                    }
                    if(!this.hideBlueText){
                        this.blueCustomerText = this.add.text(1500,260,this.customerWaitingTime[i]).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
                    }
                    //blue
                }else{
                    if(this.redCustomerText!=null){
                        this.redCustomerText.destroy();
                    }
                    if(!this.hideRedText){
                        this.redCustomerText = this.add.text(1500,410,this.customerWaitingTime[i]).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
                    }
                    //red
                }
            }
        }
        for(let i=0; i<this.carWaitingTime.length; i++){
            if(this.carColor.length > i){
                if(this.carColor[i]==1){
                    if(this.yellowCarText!=null){
                        this.yellowCarText.destroy();
                    }
                    if(!this.hideYellowText){
                        this.yellowCarText = this.add.text(1820,260,this.carWaitingTime[i]).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
                    }
                    //yellow
                }else{
                    if(this.greenCarText!=null){
                        this.greenCarText.destroy();
                    }
                    if(!this.hideGreenText){
                        this.greenCarText = this.add.text(1820,410,this.carWaitingTime[i]).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
                    }
                    //green
                }
            }
        }
    }

    /**
     * This function processes the input and
     * returns the Map.
     */
    findMat(input) {
        return input["scene"]["matrix"];
    }

    /**
     * This function processes the input and
     * processes for information involving car
     *  and customers.
     */
    findData(input) {
        let data = {
            "Id": input["scene"]["Id"], 
            "cordX": input["scene"]["cordX"],
            "cordY": input["scene"]["cordY"],
            "isCar": input["scene"]["isCar"],
            "isCustomer": input["scene"]["isCustomer"],
            "isRed": input["scene"]["isRed"],
            "isBlue": input["scene"]["isBlue"],
            "WaitingTime": input["scene"]["WaitingTime"]
        }
        return data;
    }

    /**
     * This is the necessary preload function for 
     * loading all the files to the cache of the browser.
     * Here, necessary changes as per README need to done
     * whenever a new scene is added. More on this can be read from 
     * Phaser Documentation.
     */
    preload() {
        this.load.image('car', carImg);
        this.load.image('customer', customerImg);
        this.load.image('carBW', carImgBW);
        this.load.image('customerBW', customerImgBW);
        this.load.image('road', roadImg);
        this.load.image('wall', wallImg);
        this.load.image('blueBoy', blueBoy);
        this.load.image('redBoy', redBoy);
        this.load.image('greenCar', greenCar); //isRed
        this.load.image('yellowCar', yellowCar); //
        this.load.json('input1', input1);
        this.load.json('input2', input2);
        this.load.json('input3', input3);
        this.load.json('input4', input4);
    }

    /**
     * This is most important part for a Phasor game.
     * It includes reading the input, making gloabal
     * initializations, for all the classes, and calling 
     * appropriate functions to start the game. More 
     * about the use of this function, can be read from
     * Phasor Documentation.
     */

    create() {

        // enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        let input_data_1 = this.cache.json.get('input1');
        let input_data_2 = this.cache.json.get('input2');
        let input_data_3 = this.cache.json.get('input3');
        let input_data_4 = this.cache.json.get('input4');
        

        this.Maps = [];
        let fmap = new NewMap(this,this.findMat(input_data_1),this.findData(input_data_1));
        this.Maps.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_2),this.findData(input_data_2));
        this.Maps.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_3),this.findData(input_data_3));
        this.Maps.push(fmap);
        fmap = new NewMap(this,this.findMat(input_data_4),this.findData(input_data_4));
        this.Maps.push(fmap);
        //current Map index
        this.currentMap = 0; ;
        
        /**
         * Initializations of different variables 
         * and classes. All of the Declarations 
         * are self-recognisable.
         */
        this.finalCustomerSelected = [];
        this.finalCarSelected = []; 
        this.customerWaitingTime = [];
        this.customerColor = [];
        this.carColor = [];
        this.carWaitingTime = [];
        this.Maps[0].show(this);
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
        this.GameHandler = new GameHandler(this);
        this.GameHandler.promptWaitTimeCustomer();
        this.GameHandler.promptWaitTimeCar();
        this.InteractiveHandler = new InteractiveHandler(this,this.GameHandler);
        this.SocketHandler = new SocketHandler(this,this.GameHandler);
        this.updateTime = 0;
        this.inputCount = 0;
        this.hideBlueText = false;
        this.hideRedText = false;
        this.hideGreenText = false;
        this.hideYellowText = false;
        this.sceneTime = 11;
        this.timeRemainingSign = this.add.text(1500,900, 'Time Remaining: ').setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
        this.updateWaitTime();
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }

    /**
     * This the update functoin of a Phaser Scene.
     * It is use to update the scene with time, It
     * is right now only used for the countdown Timer.
     * Previously It was also used for updating the 
     * wait-times for the customers.
     */
    update() {
        // this.updateWaitTime();
        this.updateTime += 1;
        // this.updateTime++;
        if(this.updateTime%100==0){
            this.updateWaitTime();
            
            for(let i=0; i<this.customerWaitingTime.length; i++){
                
                // this.customerWaitingTime[i]+=1;
                // this.carWaitingTime[i]+=1;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.enter) && this.currentlySelectedCustomer!=null && this.currentlySelectedCar!=null)
        {
            console.log('Path Selected!!');
            this.socket.emit("selectedCustomer",this.currentlySelectedCar,this.currentlySelectedCustomer);
        }
    }
}