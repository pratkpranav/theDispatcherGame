export default class UIHandler{
    constructor(scene){
        this.buildGameText = () => {
            scene.nextButton = scene.add.text(1380,900,"Next Map").setFontSize(20).setFontFamily('Trebuchet MS');
            // scene.closeButton = scene.add.text(1380,600,"Close").setFontSize(20).setFontFamily('Trebuchet MS');
        }
        this.buildPrompt = () => {
            scene.promptScreen = scene.add.rectangle(1440,200,300,300);
            scene.promptScreen.setStrokeStyle(4, 0xff69b4);
        }
        this.buildWaitingTimePrompt = () => {
            scene.waitTimePrompt = scene.add.rectangle(1440,600,300,400);
            scene.waitTimePrompt.setStrokeStyle(4, 0xff69b4);
        }


        this.buildUI = () => {
            this.buildGameText();
            this.buildPrompt();
            this.buildWaitingTimePrompt();
        }
    }
}