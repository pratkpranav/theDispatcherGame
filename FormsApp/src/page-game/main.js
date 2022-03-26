import Phaser from 'phaser';
import Game from './scenes/game'



const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1600,
        height: 1024
    },
    scene: [
        Game
    ]
};

const game = new Phaser.Game(config);
