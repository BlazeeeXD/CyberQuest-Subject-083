import Phaser from 'phaser';

import { MenuScene } from './scenes/MenuScene.js';
import { GalleryScene } from './scenes/GalleryScene.js';
import { DeathScene } from './scenes/DeathScene.js';

import { Level1Scene } from './scenes/Level1Scene.js';
import { Level2Scene } from './scenes/Level2Scene.js';
import { Level3Scene } from './scenes/Level3Scene.js';
import { Level4Scene } from './scenes/Level4Scene.js';
import { Level5Scene } from './scenes/Level5Scene.js';
import { EndingScene } from './scenes/EndingScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'game-container',
    backgroundColor: '#000000',
    
    
    resolution: window.devicePixelRatio || 1,
    
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        MenuScene, 
        Level1Scene, Level2Scene, Level3Scene, Level4Scene, Level5Scene, 
        DeathScene, GalleryScene, EndingScene
    ] 
};

const game = new Phaser.Game(config);
