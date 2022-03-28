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


export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }


    updateWaitTime() {
        console.log('updating wait time!!');
        for(let i=0; i<this.customerWaitingTime.length; i++){
            if(this.customerColor.length > i){
                if(this.customerColor[i]==1){
                    if(this.blueCustomerText!=null){
                        this.blueCustomerText.destroy();
                    }
                    if(!this.hideBlueText){
                        this.blueCustomerText = this.add.text(1500,560,this.customerWaitingTime[i]).setFontSize(20).setFontFamily('Trebuchet MS');
                    }
                    //blue
                }else{
                    if(this.redCustomerText!=null){
                        this.redCustomerText.destroy();
                    }
                    if(!this.hideRedText){
                        this.redCustomerText = this.add.text(1500,710,this.customerWaitingTime[i]).setFontSize(20).setFontFamily('Trebuchet MS');
                    }
                    //red
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
    }


    create() {
        const mat1 = [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1]];
        //second input
        const data1 = {
            "cordX": [1, 1, 2, 5],
            "cordY": [1, 4, 4, 5],
            "isCar": [1, 0, 1, 0],
            "isCustomer": [0, 1, 0, 1],
            "isRed": [0, 0, 0, 1],
            "isBlue": [0, 1, 0, 0],
            "customerWaitingTime": [0,20,0,30]
        };
        const mat2 = [[1, 0, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 0, 0]];
        //second input
        const data2 = {
            "cordX": [1, 1, 2, 8],
            "cordY": [1, 4, 1, 6],
            "isCar": [1, 0, 1, 0],
            "isCustomer": [0, 1, 0, 1],
            "isRed": [0, 0, 0, 1],
            "isBlue": [0, 1, 0, 0],
            "customerWaitingTime": [0,10,0,5]
        };
        const mat3 = [[1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1]];
        //second input
        const data3 = {
            "cordX": [1, 3],
            "cordY": [1, 8],
            "isCar": [1, 0],
            "isCustomer": [0, 1],
            "isRed": [0, 0],
            "isBlue": [0, 1],
            "customerWaitingTime": [0,13]
        };

        const mat0 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1], [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1], [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1], [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0]];
        //second input
        const data0 = {
            "cordX": [1, 3, 8, 15],
            "cordY": [1, 8, 8, 16],
            "isCar": [1, 0, 0, 1],
            "isCustomer": [0, 1, 1, 0],
            "isRed": [0, 0, 1, 0],
            "isBlue": [0, 1, 0, 0],
            "customerWaitingTime": [0,8,45,0]
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
        this.Maps[0].show(this);
        this.UIHandler = new UIHandler(this);
        this.UIHandler.buildUI();
        this.GameHandler = new GameHandler(this);
        this.GameHandler.promptWaitTime();
        this.InteractiveHandler = new InteractiveHandler(this,this.GameHandler);
        this.SocketHandler = new SocketHandler(this,this.GameHandler);
        this.updateTime = 0;
        this.hideBlueText = false;
        this.hideRedText = false;
        this.updateWaitTime();
    }
    update() {
        // this.updateWaitTime();
        this.updateTime += 1;
        // this.updateTime++;
        if(this.updateTime%600==0){
            this.updateWaitTime();
            
            for(let i=0; i<this.customerWaitingTime.length; i++){
                
                this.customerWaitingTime[i]+=1;
            }
        }
    }
}