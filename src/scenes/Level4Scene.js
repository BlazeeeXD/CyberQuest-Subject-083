import Phaser from 'phaser';


import idle1Img from '../assets/images/idle1.png';
import idle2Img from '../assets/images/idle2.png';
import idle3Img from '../assets/images/idle3.png';
import idle4Img from '../assets/images/idle4.png';
import idle5Img from '../assets/images/idle5.png';
import idle6Img from '../assets/images/idle6.png';
import idle7Img from '../assets/images/idle7.png';
import idle8Img from '../assets/images/idle8.png';


import walk1Img from '../assets/images/walk1.png';
import walk2Img from '../assets/images/walk2.png';
import walk3Img from '../assets/images/walk3.png';
import walk4Img from '../assets/images/walk4.png';
import walk5Img from '../assets/images/walk5.png';
import walk6Img from '../assets/images/walk6.png';
import walk7Img from '../assets/images/walk7.png';
import walk8Img from '../assets/images/walk8.png';


import building from '../assets/images/building.png'; 
import road from '../assets/images/road.png'; 
import street from '../assets/images/street2.png'; 


import usb_large from '../assets/images/usb_large.png'



export class Level4Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level4Scene' }); 
    }


    preload() {
        
        this.load.image('idle1', idle1Img);
        this.load.image('idle2', idle2Img);
        this.load.image('idle3', idle3Img);
        this.load.image('idle4', idle4Img);
        this.load.image('idle5', idle5Img);
        this.load.image('idle6', idle6Img);
        this.load.image('idle7', idle7Img);
        this.load.image('idle8', idle8Img);

        
        this.load.image('walk1', walk1Img);
        this.load.image('walk2', walk2Img);
        this.load.image('walk3', walk3Img);
        this.load.image('walk4', walk4Img);
        this.load.image('walk5', walk5Img);
        this.load.image('walk6', walk6Img);
        this.load.image('walk7', walk7Img);
        this.load.image('walk8', walk8Img);

        
        this.load.image('bg_building', building);
        this.load.image('bg_road', road);
        this.load.image('bg_street', street);

        
        this.load.image('item_usb_large', usb_large);
    }

   create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        
        this.add.image(0, 0, 'bg_building').setOrigin(0, 0).setDisplaySize(width, height * 0.4);
        this.add.image(0, height * 0.4, 'bg_road').setOrigin(0, 0).setDisplaySize(width, height * 0.3);
        this.add.image(0, height * 0.7, 'bg_street').setOrigin(0, 0).setDisplaySize(width, height * 0.3);

        
        
        
        
        const USB_Y = (height * 0.8) - 50; 
        
        const usb = this.add.rectangle(750, USB_Y, 80, 30, 0x000000);
        this.add.text(750, USB_Y, 'USB', { fontSize: '14px', fill: '#ffffff' }).setOrigin(0.5);

        
        this.anims.create({
            key: 'stickman_idle',
            frames: [
                { key: 'idle1' }, { key: 'idle2' }, { key: 'idle3' }, { key: 'idle4' },
                { key: 'idle5' }, { key: 'idle6' }, { key: 'idle7' }, { key: 'idle8' }
            ],
            frameRate: 8, 
            repeat: -1
        });

        this.anims.create({
            key: 'stickman_walk',
            frames: [
                { key: 'walk1' }, { key: 'walk2' }, { key: 'walk3' }, { key: 'walk4' },
                { key: 'walk5' }, { key: 'walk6' }, { key: 'walk7' }, { key: 'walk8' }
            ],
            frameRate: 12, 
            repeat: -1
        });

        
        this.showPromptBox(width, height);

        
        this.stickman = this.add.sprite(1950, height * 0.65, 'idle1');
        this.stickman.setFlipX(true);
        this.stickman.play('stickman_walk');

        
        this.tweens.add({
            targets: this.stickman,
            x: 850, 
            duration: 4500, 
            ease: 'Linear',
            onComplete: () => {
                this.stickman.play('stickman_idle'); 
                
                
                this.showItemCard(width, height);
            }
        });
    }

   showPromptBox(width, height) {
        this.promptContainer = this.add.container(width / 2, 140);
        
        const bg = this.add.rectangle(0, 0, 1160, 210, 0xffffff).setStrokeStyle(6, 0x000000);
        const divider = this.add.rectangle(250, 0, 6, 210, 0x000000);
        
        
        const promptText = this.add.text(-560, -85, '', {
            fontFamily: 'Courier New, Courier, monospace', 
            fontSize: '28px', 
            color: '#000000',
            wordWrap: { width: 780 }, 
            align: 'left', 
            fontWeight: 'bold'
        }).setOrigin(0, 0); 

        
        const btn1 = this.createButton(420, -40, 'option 1', '#22b14c');
        btn1.setAlpha(0).disableInteractive(); 

        const btn2 = this.createButton(420, 40, 'option 2', '#e62020');
        btn2.setAlpha(0).disableInteractive(); 

        btn1.on('pointerdown', () => {
            if (this.promptContainer) this.promptContainer.destroy();
            this.stickman.play('stickman_walk');
            this.tweens.add({
                targets: this.stickman,
                x: -100, 
                duration: 3000, 
                ease: 'Linear',
                onComplete: () => {
                    this.cameras.main.fadeOut(500, 0, 0, 0);
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        
                        this.scene.start('Level5Scene'); 
                    });
                }
            });
        });

        btn2.on('pointerdown', () => {
            this.scene.start('DeathScene', { deathId: 'usb_death' });
        });

        this.promptContainer.add([bg, divider, promptText, btn1, btn2]);
        
        
        this.promptContainer.y = -200; 
        this.tweens.add({
            targets: this.promptContainer,
            y: 140, 
            duration: 600,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                const fullText = "This is Bob. Subject 083. Try not to get too\nattached. The previous eighty-two attempts\nwere... educational. Today Bob has discovered\na USB labeled 'Bitcoin Wallet 2012.' An\nunexpected act of generosity from a complete\nstranger. Bob would naturally ignore the USB\ndrive and continue on his way.";
                
                let i = 0;
                this.time.addEvent({
                    delay: 25, 
                    repeat: fullText.length - 1,
                    callback: () => {
                        promptText.text += fullText[i];
                        i++;

                        
                        if (i === fullText.length) {
                            this.tweens.add({
                                targets: [btn1, btn2],
                                alpha: 1, 
                                duration: 300,
                                onComplete: () => {
                                    
                                    btn1.setInteractive({ useHandCursor: true });
                                    btn2.setInteractive({ useHandCursor: true });
                                }
                            });
                        }
                    }
                });
            }
        });
    }

    showItemCard(width, height) {
        
        this.cardContainer = this.add.container(width / 2, height / 2 - 15);

        const bg = this.add.rectangle(0, 0, 400, 350, 0xffffff).setStrokeStyle(6, 0x000000);
        const itemImg = this.add.image(0, -60, 'item_usb_large').setDisplaySize(200, 200);

        const descText = this.add.text(0, 90, 'A mysterious 64GB USB flash drive found Looks brand new.', {
            fontFamily: 'Arial',
            fontSize: '22px',
            color: '#000000',
            wordWrap: { width: 340 },
            align: 'center'
        }).setOrigin(0.5);

        this.cardContainer.add([bg, itemImg, descText]);

        this.cardContainer.setScale(0);
        this.tweens.add({
            targets: this.cardContainer,
            scale: 1,
            duration: 400,
            ease: 'Back.out(1.5)'
        });
    }

    createButton(x, y, label, color) {
        const button = this.add.text(x, y, label, {
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '24px', 
            fontWeight: 'bold',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 15, y: 15 },
            fixedWidth: 260, 
            align: 'center'
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        button.on('pointerover', () => button.setStyle({ fill: color }));
        button.on('pointerout', () => button.setStyle({ fill: '#ffffff' }));

        return button;
    }
}
