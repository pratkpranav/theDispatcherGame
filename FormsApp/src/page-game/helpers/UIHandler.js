/**
 * This class starts the basic UI on the screen
 * which includes the text boxes, grid and the 
 * different prompts.
 */

export default class UIHandler{
    constructor(scene){

        /**
         * This function creates the instance for text "Next Map"
         */
        this.buildGameText = () => {
            scene.nextButton = scene.add.text(1380,900,"Next Map").setFontSize(20).setFontFamily('Trebuchet MS');
            // scene.closeButton = scene.add.text(1380,600,"Close").setFontSize(20).setFontFamily('Trebuchet MS');
        }
        /**
         * This function builds the rectangle background for the prompts
         */

        this.buildPrompt = () => {
            scene.promptScreen = scene.add.rectangle(1600,700,600,300);
            scene.promptScreen.setStrokeStyle(4, 0xff69b4);
        }

        /**
         * This function bult the rectangular background 
         * for the waiting time prompt.
         */
        this.buildWaitingTimePrompt = () => {
            scene.waitTimePrompt = scene.add.rectangle(1600,300,600,400);
            scene.waitTimePrompt.setStrokeStyle(4, 0xff69b4);
        }

        /**
         * This the master function to call all the above function
         *  to create the basic UI.
         */
        this.buildUI = () => {
            this.buildGameText();
            this.buildPrompt();
            this.buildWaitingTimePrompt();
        }
    }
}