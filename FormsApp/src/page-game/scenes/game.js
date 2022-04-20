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


export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }


    updateWaitTime() {
        console.log('updating wait time!!');
        if(this.timeRemaining!=null){
            this.timeRemaining.destroy();
        }
        this.timeRemaining = this.add.text(1670,900, this.sceneTime).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
        this.sceneTime-=1;
        if(this.sceneTime==0){
            this.SocketHandler.placeSceneFunction();
            // this.sceneTime = 50;
        }
        for(let i=0; i<this.customerWaitingTime.length; i++){
            if(this.customerColor.length > i){
                if(this.customerColor[i]==1){
                    if(this.blueCustomerText!=null){
                        this.blueCustomerText.destroy();
                    }
                    if(!this.hideBlueText){
                        this.blueCustomerText = this.add.text(1500,560,this.customerWaitingTime[i]).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
                    }
                    //blue
                }else{
                    if(this.redCustomerText!=null){
                        this.redCustomerText.destroy();
                    }
                    if(!this.hideRedText){
                        this.redCustomerText = this.add.text(1500,710,this.customerWaitingTime[i]).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
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
                        this.yellowCarText = this.add.text(1820,560,this.carWaitingTime[i]).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
                    }
                    //yellow
                }else{
                    if(this.greenCarText!=null){
                        this.greenCarText.destroy();
                    }
                    if(!this.hideGreenText){
                        this.greenCarText = this.add.text(1820,710,this.carWaitingTime[i]).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
                    }
                    //green
                }
            }
        }
    }


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
        this.load.image('yellowCar', yellowCar); //isBlue
    }


    create() {

        // enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        const mat0 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]];
        //second input
        const data0 = {
            "cordX": [1, 3, 16, 5],
            "cordY": [1, 3, 13, 5],
            "isCar": [1, 0, 0, 1],
            "isCustomer": [0, 1, 1, 0],
            "isRed": [1, 0, 1, 0],
            "isBlue": [0, 1, 0, 1],
            "WaitingTime": [6,20,20,13]
        };

        const mat1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]];
        //second input
        const data1 = {
            "cordX": [2, 9, 9, 15],
            "cordY": [8, 2, 14, 8],
            "isCar": [1, 0, 0, 1],
            "isCustomer": [0, 1, 1, 0],
            "isRed": [0, 0, 1, 1],
            "isBlue": [1, 1, 0, 0],
            "WaitingTime": [7,5,50,19]
        };
        
        const mat2 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]];
        //second input
        const data2 = {
            "cordX": [3, 12, 12, 5],
            "cordY": [10, 9, 11, 10],
            "isCar": [1, 0, 0, 1],
            "isCustomer": [0, 1, 1, 0],
            "isRed": [0, 0, 1, 1],
            "isBlue": [1, 1, 0, 0],
            "WaitingTime": [4,5,15,10]
        };
        
        const mat3 = [[0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1], [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1], [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], 
        [0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1], [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0], [1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0], 
        [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1], [1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0], [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0]];
        //second input
        const data3 = {
            "cordX": [10, 2, 4, 8],
            "cordY": [7, 13, 11, 9],
            "isCar": [1, 0, 0, 1],
            "isCustomer": [0, 1, 1, 0],
            "isRed": [1, 0, 1, 0],
            "isBlue": [0, 1, 0, 1],
            "WaitingTime": [19,4,13,20]
        };
        
        
        // let map1 = this.cache.json.get('FileA');
        // map2 = this.add.tilemap('fileB', 16, 16);
        // console.log(map1);
        // console.log(map2);

        this.Maps = [];
        let fmap = new NewMap(this,mat0,data0);
        this.Maps.push(fmap);
        fmap = new NewMap(this,mat1,data1);
        this.Maps.push(fmap);
        fmap = new NewMap(this,mat2,data2);
        this.Maps.push(fmap);
        fmap = new NewMap(this,mat3,data3);
        this.Maps.push(fmap);
        //current Map index
        this.currentMap = 0; ;
        // this.GameHandler.createDots();
        
        /**
         * Initializations
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
        this.sceneTime = 50;
        this.timeRemainingSign = this.add.text(1500,900, 'Time Remaining: ').setFontSize(20).setFontFamily('Trebuchet MS').setColor('#000000');
        this.updateWaitTime();
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    }
    update() {
        // this.updateWaitTime();
        this.updateTime += 1;
        // this.updateTime++;
        if(this.updateTime%100==0){
            this.updateWaitTime();
            
            for(let i=0; i<this.customerWaitingTime.length; i++){
                
                this.customerWaitingTime[i]+=1;
                this.carWaitingTime[i]+=1;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.enter) && this.currentlySelectedCustomer!=null && this.currentlySelectedCar!=null)
        {
            console.log('Path Selected!!');
            this.socket.emit("selectedCustomer",this.currentlySelectedCustomer,this.currentlySelectedCar);
        }
    }
}