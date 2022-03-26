export default class InteractiveHandler{
    constructor(scene, GameHandler){

        this.GameHandler = GameHandler;
        scene.currentlySelected = null;
        scene.nextButton.on('pointerdown', () => {
            scene.socket.emit('NextScene', scene.socket.id);
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
                if(scene.currentlySelected==null){
                    this.GameHandler.drawSelectedCar(i);
                    // this.GameHandler.hideCustomers();
                    // this.GameHandler.createDots();
                    scene.currentlySelected = i;
                    // scene.socket.emit('createDots');
                }else{
                    this.GameHandler.removeSelectedCar();
                    if(scene.currentlySelected==i){
                        scene.currentlySelected = null;
                        // this.GameHandler.destroyDots();
                        // this.GameHandler.showCustomers();
                    }else{
                        this.GameHandler.drawSelectedCar(i);
                        // this.GameHandler.destroyDots();
                        // this.GameHandler.createDots();
                        scene.currentlySelected = i;
                        // scene.socket.emit('createDots');
                    }
                }
                console.log('Clicked car index: '+ i);
            })
        }



        for(let i=0; i< scene.Maps[0].customers.length; i++){
            console.log('Customers: ', i);
            scene.Maps[scene.currentMap].customers[i].instance.on('pointerdown', () => {
                // scene.socket.emit("selectedCustomer", i);
                console.log('Clicked customer index: '+ i);
                this.GameHandler.removeSelectedCustomer();
                this.GameHandler.drawSelectedCustomer(i);
                this.GameHandler.hideAnyPath();
                    this.GameHandler.removeOutputPath();
                    if(scene.currentlySelected!=null){
                        scene.Maps[scene.currentMap].cars[scene.currentlySelected].drawIndividualPath(i);
                        this.GameHandler.promptOutputPath(scene.currentlySelected,i);
                        this.GameHandler.handleButton(scene.currentlySelected,i);
                    }
            })
        }

        
    }
}