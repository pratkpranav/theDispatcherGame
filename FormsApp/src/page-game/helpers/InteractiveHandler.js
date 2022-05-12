export default class InteractiveHandler{
    constructor(scene, GameHandler){

        this.GameHandler = GameHandler;
        scene.currentlySelectedCar = null;
        scene.nextButton.on('pointerdown', () => {
            console.log('Count: ', scene.inputCount)
            if(scene.inputCount!=2){
                this.GameHandler.promptMessage('Match Each Pair!');
            }else{
                scene.socket.emit('NextScene', scene.socket.id);
            }

            console.log('Clicked');
        })

        scene.nextButton.on('pointerover', () => {
            scene.nextButton.setColor('#ff69b4');
        })

        scene.nextButton.on('pointerout', () => {
            scene.nextButton.setColor('#00ffff');
        })

        // scene.closeButton.on('pointerdown', () => {
        //     console.log('Close the Game');
        // })

        // scene.closeButton.on('pointerover', () => {
        //     scene.closeButton.setColor('#ff69b4');
        // })

        // scene.closeButton.on('pointerout', () => {
        //     scene.closeButton.setColor('#00ffff');
        // })

        for(let i=0; i< scene.Maps[0].cars.length; i++){
            scene.Maps[scene.currentMap].cars[i].instance.on('pointerdown', () => {   
                this.GameHandler.hideAnyPath(); 
                this.GameHandler.removeOutputPath();
                this.GameHandler.removeSelectedCustomer();
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
                console.log('Clicked car index: '+ i);
                this.GameHandler.hideAnyPath();
                this.GameHandler.removeOutputPath();
                if(scene.currentlySelectedCustomer!=null){
                    scene.Maps[scene.currentMap].cars[scene.currentlySelectedCar].drawIndividualPath(scene.currentlySelectedCustomer);
                    this.GameHandler.promptOutputPath(scene.currentlySelectedCar,scene.currentlySelectedCustomer);
                    this.GameHandler.handleButton(scene.currentlySelectedCar,scene.currentlySelectedCustomer);
                }
            })
        }



        for(let i=0; i< scene.Maps[0].customers.length; i++){
            console.log('Customers: ', i);
            scene.Maps[scene.currentMap].customers[i].instance.on('pointerdown', () => {
                scene.currentlySelectedCustomer = i;
                console.log('Clicked customer index: '+ i);
                this.GameHandler.removeSelectedCustomer();
                this.GameHandler.drawSelectedCustomer(i);
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
}