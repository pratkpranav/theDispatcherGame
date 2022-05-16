/**
 * This class handles ouputting many messages and also 
 * handles game with its input.
 */
export default class GameHandler{
    constructor(scene){
        // Entry Size  (1240-1440) (50-350)
        this.dots = [];
        this.carId = null;
        this.customerId = null;
        this.infoDist = null;
        this.pathButton = null;
        this.selectedCar = null;
        this.selectedCustomer = null;
        this.waitingTimeHeaderCustomer = null;
        this.waitingTimeHeaderCar = null;
        this.blueWaitingCustomer = null;
        this.redWaitingCustomer = null;
        this.yellowWaitingCustomer = null;
        this.greenWaitingCustomer = null;
        this.promptMessageText = null;

        /**
         * This function is prompting the details of path between 
         * customer and car indicated by customerId and carId. The 
         * details include carId, customerId and the distance between
         * car and the custome. It also shows a button to select that
         *  path.
         * 
         * @param {*} carId carId for the path to be selected
         * @param {*} customerId customerId for the path to be selected
         */
        this.promptOutputPath = (carId,customerId) => {
            this.carId = scene.add.text(1320,600, "Car id: " + carId).setColor('#000000');
            this.customerId = scene.add.text(1320,630, "Customer id: " + customerId).setColor('#000000');
            let arr = scene.Maps[scene.currentMap].outputCars[carId];
            for(let i=0; i<arr.length; i++){
                if(arr[i][0]==customerId){
                    this.infoDist = scene.add.text(1320, 660, "Distance: " + arr[i][1]).setColor('#000000');
                    break;
                }
            }
            this.pathButton = scene.add.text(1320,800,"CLICK HERE OR PRESS ENTER").setFontSize(20).setFontFamily('Trebuchet MS');
            this.pathButton.setInteractive();
            this.pathButton.setColor('#00ffff');
        }

        /**
         * This function just prompts the waiting time for
         * each of the customers.
         */
        this.promptWaitTimeCustomer = () => {
            this.waitingTimeHeaderCustomer = scene.add.text(1380,120,"Waiting Time Customer").setFontSize(20).setFontFamily('Trebuchet MS');
            this.waitingTimeHeaderCustomer.setColor('#00ffff');
            this.blueWaitingCustomer = scene.add.image(1400, 260 , 'blueBoy');
            this.redWaitingCustomer = scene.add.image(1400, 410 , 'redBoy');
        }

        /**
         * This function just prompts the waiting time for
         *  each of the cars
         */
        this.promptWaitTimeCar = () => {
            this.waitingTimeHeaderCar = scene.add.text(1700,120,"Waiting Time Car").setFontSize(20).setFontFamily('Trebuchet MS');
            this.waitingTimeHeaderCar.setColor('#00ffff');
            this.yellowWaitingCustomer = scene.add.image(1700, 260 , 'yellowCar');
            this.greenWaitingCustomer = scene.add.image(1700, 410 , 'greenCar');
        }

        /**
         * This function is used to prompt the message to the
         * users, These are alert messages, need to shown only
         *  when use does something bad.
         * 
         * @param {} msg String message need to be shown
         */
        this.promptMessage = (msg) => {
            console.log(msg);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            this.promptMessageText = scene.add.text(1320,600,msg).setColor('#8B0000');
            this.promptMessageText.setFontSize(50);
        }
        
        /**
         * This function highlights a car whenever it is
         *  selected by the user. The color used for 
         * highlighting the square used right now is red.
         * 
         * @param {*} carId carId for car to be highlighted
         */
        this.drawSelectedCar = (carId) => {
            let carSelected = scene.Maps[scene.currentMap].cars[carId];
            let rect = scene.add.rectangle(carSelected.screenX,carSelected.screenY,scene.dimX,scene.dimY);
            rect.setStrokeStyle(4, 0xff0000);
            this.selectedCar = rect;
        }

        /**
         * This function highlights a car whenever it is
         *  selected by the user. The color used for 
         * highlighting the square used right now is red.
         * 
         * @param {*} customerId customerId for the customer to be highlighted
         */
        this.drawSelectedCustomer = (customerId) => {
            let customerSelected = scene.Maps[scene.currentMap].customers[customerId];
            let rect = scene.add.rectangle(customerSelected.screenX,customerSelected.screenY,scene.dimX,scene.dimY);
            rect.setStrokeStyle(4, 0xff0000);
            this.selectedCustomer = rect;
        }

        /**
         * This function is to remove a car from the 
         * scene once it is selected
         */
        this.removeSelectedCar = () =>{
            if(this.selectedCar!=null){
                this.selectedCar.destroy();
            }
        }
        
        /**
         * This function is to remoe a customer from
         * the scene once it is selected
         */
        this.removeSelectedCustomer = () => {
            if(this.selectedCustomer!=null){
                this.selectedCustomer.destroy();
            }
        }

        /**
         * This function is used to remove content 
         * from the information box.
         */
        this.removeOutputPath = () => {
            if(this.carId != null){
                this.carId.destroy();
            }
            if(this.customerId != null){
                this.customerId.destroy();
            }
            if(this.infoDist != null){
                this.infoDist.destroy();
            }
            if(this.pathButton != null){
                this.pathButton.destroy();
            }
            if(this.promptMessageText != null){
                this.promptMessageText.destroy();
            }
        }

        

        /**
         * This function changes the color of PATH 
         * SELECTED button on pressing it
         */

        this.handleButton = (carId, cusomerId) => {
            this.pathButton.on('pointerover', () => {
                this.pathButton.setColor('#ff69b4');
            })
            this.pathButton.on('pointerout', () => {
                this.pathButton.setColor('#00ffff');
            })
            this.pathButton.on('pointerdown', () => {
                console.log('Path Selected!!');
                scene.socket.emit("selectedCustomer",carId,cusomerId);
            })
        }

        /**
         * This is a redundant function now, earlier used in
         * earlier version to place dots in place of customers.
         */

        this.hideCustomers = () => {
            console.log('Hiding Customers!!');
            let arr = scene.Maps[scene.currentMap].customers;
            for(let i=0; i<arr.length; i++){
                arr[i].instance.visible = false;
            }
        }

        /**
         * This is also a reduntant function, used earlier to 
         * convert the dots back to customers
         */

        this.showCustomers = () => {
            console.log('Showing Customers!!');
            let arr = scene.Maps[scene.currentMap].customers;
            for(let i=0; i<arr.length; i++){
                arr[i].instance.visible = true;
            }
        }

        /**
         * This is a redundant function, used earlier to place dots in pace of customers.
         */

        this.createDots = () => {
            let arr = scene.Maps[scene.currentMap].customers;
            let radius = Math.min(scene.dimX,scene.dimY)/4;
            for(let i=0; i<arr.length; i++){
                // console.log(arr[i].x,arr[i].y);
                let dot = scene.add.circle(arr[i].screenX ,arr[i].screenY, radius,0xff0000);
                let ch = true;
                for(let j=0; j<scene.finalCustomerSelected.length; j++){
                    if(scene.finalCustomerSelected[j]==i){
                        ch = false;
                    }
                }
                // print(ch)
                if(ch){
                    dot.setInteractive();
                }
                // dot.setInteractive();
                this.dots.push(dot);
            }
        }

        /**
         * This is a redundant function now, earlier used to
         * destroy the dots created by the last function.
         */
        this.destroyDots = () =>{
            for(let i=0; i<this.dots.length; i++){
                this.dots[i].destroy();
            }
            this.dots = [];
        }
        /**
         * This function is used to hide any path if it is there. 
         * This function is called before a new path is shown on 
         * the screen to clear old paths.
         */

        this.hideAnyPath = () =>{
            for(let i=0; i<scene.Maps[scene.currentMap].cars.length; i++){
                scene.Maps[scene.currentMap].cars[i].hideAllPaths();
            }
        }
    }

    
}