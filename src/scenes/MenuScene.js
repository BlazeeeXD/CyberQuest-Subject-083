import Phaser from 'phaser';


import idle1Img from '../assets/images/idle1.png';
import idle2Img from '../assets/images/idle2.png';
import idle3Img from '../assets/images/idle3.png';
import idle4Img from '../assets/images/idle4.png';
import idle5Img from '../assets/images/idle5.png';
import idle6Img from '../assets/images/idle6.png';
import idle7Img from '../assets/images/idle7.png';
import idle8Img from '../assets/images/idle8.png';


import buildingImg from '../assets/images/building.png';
import roadImg from '../assets/images/road.png';
import streetImg from '../assets/images/street.png';


import logoImg from '../assets/images/logo.png';

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        
        this.load.image('idle1', idle1Img); this.load.image('idle2', idle2Img);
        this.load.image('idle3', idle3Img); this.load.image('idle4', idle4Img);
        this.load.image('idle5', idle5Img); this.load.image('idle6', idle6Img);
        this.load.image('idle7', idle7Img); this.load.image('idle8', idle8Img);

        
        this.load.image('bg_building', buildingImg);
        this.load.image('bg_road', roadImg);
        this.load.image('bg_street', streetImg);

        
        this.load.image('game_logo', logoImg);
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        
        this.add.image(0, 0, 'bg_building').setOrigin(0, 0).setDisplaySize(width, height * 0.4);
        this.add.image(0, height * 0.4, 'bg_road').setOrigin(0, 0).setDisplaySize(width, height * 0.3);
        this.add.image(0, height * 0.7, 'bg_street').setOrigin(0, 0).setDisplaySize(width, height * 0.3);

        
        this.add.rectangle(0, 0, width, height, 0x000000, 0.75).setOrigin(0, 0);

        
        const logo = this.add.image(width * 0.3, height * 0.3, 'game_logo').setOrigin(0.5);
        
        
        logo.setDisplaySize(848, 300); 

        
        const btnWidth = 400;
        const btnHeight = 120;
        const btnX = (width * 0.3) - (btnWidth / 2);
        const btnY = height * 0.65 - (btnHeight / 2);

        const btnGraphics = this.add.graphics();
        
        const drawButton = (isHovered) => {
            btnGraphics.clear();
            if (isHovered) {
                btnGraphics.fillStyle(0x333333, 1); 
                btnGraphics.fillRoundedRect(btnX, btnY, btnWidth, btnHeight, 10);
            }
            btnGraphics.lineStyle(2, 0xffffff); 
            btnGraphics.strokeRoundedRect(btnX, btnY, btnWidth, btnHeight, 10);
        };

        drawButton(false);

        this.add.text(width * 0.3, height * 0.65, 'START QUEST', {
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '52px',
            color: '#ffffff',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        const startZone = this.add.zone(width * 0.3, height * 0.65, btnWidth, btnHeight)
            .setInteractive({ useHandCursor: true });

        startZone.on('pointerover', () => drawButton(true));
        startZone.on('pointerout', () => drawButton(false));
        startZone.on('pointerdown', () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('Level1Scene');
            });
        });

        
        this.anims.create({
            key: 'menu_idle',
            frames: [
                { key: 'idle1' }, { key: 'idle2' }, { key: 'idle3' }, { key: 'idle4' },
                { key: 'idle5' }, { key: 'idle6' }, { key: 'idle7' }, { key: 'idle8' }
            ],
            frameRate: 8, 
            repeat: -1
        });

        
        this.stickman = this.add.sprite(width * 0.75, height * 0.40, 'idle1');
        
        
        this.stickman.setScale(5); 
        this.stickman.setFlipX(true); 
        
        this.stickman.play('menu_idle');
    }
}
