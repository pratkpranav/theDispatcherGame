
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

        this.promptOutputPath = (carId,customerId) => {
            this.carId = scene.add.text(1300,100, "Car id: " + carId);
            this.customerId = scene.add.text(1300,130, "Customer id: " + customerId);
            let arr = scene.Maps[scene.currentMap].outputCars[carId];
            for(let i=0; i<arr.length; i++){
                if(arr[i][0]==customerId){
                    this.infoDist = scene.add.text(1300, 160, "Distance: " + arr[i][1]);
                    break;
                }
            }
            this.pathButton = scene.add.text(1300,250,"Select Path").setFontSize(20).setFontFamily('Trebuchet MS');
            this.pathButton.setInteractive();
            this.pathButton.setColor('#00ffff');
        }

        this.promptWaitTime = () => {
            this.waitingTImeHeader = scene.add.text(1380,420,"Waiting Time").setFontSize(20).setFontFamily('Trebuchet MS');
            this.waitingTImeHeader.setColor('#00ffff');
            this.blueWaitingCustomer = scene.add.image(1380, 560 , 'redBoy');
            this.redWaitingCustomer = scene.add.image(1380, 710 , 'blueBoy');
        }

        

        this.drawSelectedCar = (carId) => {
            let carSelected = scene.Maps[scene.currentMap].cars[carId];
            let rect = scene.add.rectangle(carSelected.screenX,carSelected.screenY,scene.dimX,scene.dimY);
            rect.setStrokeStyle(4, 0xff0000);
            this.selectedCar = rect;
        }

        this.drawSelectedCustomer = (customerId) => {
            let customerSelected = scene.Maps[scene.currentMap].customers[customerId];
            let rect = scene.add.rectangle(customerSelected.screenX,customerSelected.screenY,scene.dimX,scene.dimY);
            rect.setStrokeStyle(4, 0xff0000);
            this.selectedCustomer = rect;
        }

        this.removeSelectedCar = () =>{
            if(this.selectedCar!=null){
                this.selectedCar.destroy();
            }
        }
        
        this.removeSelectedCustomer = () => {
            if(this.selectedCustomer!=null){
                this.selectedCustomer.destroy();
            }
        }

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
        }

        

        /**
         * This function maintain Button
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
         * This function maintain Button
         */

        /**
         * This function hides the customers
         */
        this.hideCustomers = () => {
            console.log('Hiding Customers!!');
            let arr = scene.Maps[scene.currentMap].customers;
            for(let i=0; i<arr.length; i++){
                arr[i].instance.visible = false;
            }
        }

        /**
         * This function shows customer which are hidden in hideCustomers()
         */
        this.showCustomers = () => {
            console.log('Showing Customers!!');
            let arr = scene.Maps[scene.currentMap].customers;
            for(let i=0; i<arr.length; i++){
                arr[i].instance.visible = true;
            }
        }

        /**
         * This function shows dote in place of customers()
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
         * This function destroys the dots
         */
        this.destroyDots = () =>{
            for(let i=0; i<this.dots.length; i++){
                this.dots[i].destroy();
            }
            this.dots = [];
        }
        /**
         * This function hides all the path if present
         */
        this.hideAnyPath = () =>{
            for(let i=0; i<scene.Maps[scene.currentMap].cars.length; i++){
                scene.Maps[scene.currentMap].cars[i].hideAllPaths();
            }
        }
    }

    
}