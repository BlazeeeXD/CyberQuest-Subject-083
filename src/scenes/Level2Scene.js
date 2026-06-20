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


import order from '../assets/images/order.png'



export class Level2Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level2Scene' }); 
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

        
        this.load.image('item_order', order);
    }

   create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        
        this.add.image(0, 0, 'bg_building').setOrigin(0, 0).setDisplaySize(width, height * 0.4);
        this.add.image(0, height * 0.4, 'bg_road').setOrigin(0, 0).setDisplaySize(width, height * 0.3);
        this.add.image(0, height * 0.7, 'bg_street').setOrigin(0, 0).setDisplaySize(width, height * 0.3);

        
        
        
        
   
        

        
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

        
        
        const btn1 = this.createButton(420, -40, 'Confirm','#ffffffa1'); 
        btn1.setAlpha(0).disableInteractive(); 

        
        const btn2 = this.createButton(420, 40, 'Cancel','#ffffffa1');
        btn2.setAlpha(0).disableInteractive(); 

        
        btn1.on('pointerdown', () => {
            
            btn1.disableInteractive();
            btn2.disableInteractive();
            
            
            this.scene.start('DeathScene', { deathId: 'phishing_death' }); 
        });

        
        btn2.on('pointerdown', () => {
            
            btn1.disableInteractive();
            btn2.disableInteractive();

            
            if (this.promptContainer) {
                this.tweens.add({
                    targets: this.promptContainer,
                    y: -200,
                    duration: 400,
                    ease: 'Back.in'
                });
            }

            
            if (this.cardContainer) {
                this.tweens.add({
                    targets: this.cardContainer,
                    scale: 0,
                    duration: 400,
                    ease: 'Back.in'
                });
            }

            
            this.stickman.play('stickman_walk');

            
            this.tweens.add({
                targets: this.stickman,
                x: -100, 
                duration: 3000, 
                ease: 'Linear',
                onComplete: () => {
                    this.cameras.main.fadeOut(500, 0, 0, 0);
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('Level3Scene'); 
                    });
                }
            });
        });

        this.promptContainer.add([bg, divider, promptText, btn1, btn2]);
        
        
        this.promptContainer.y = -200; 
        this.tweens.add({
            targets: this.promptContainer,
            y: 140, 
            duration: 600,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                const fullText = "Well. That was unexpectedly sensible.\nSubject 083 continues his day. A routine\nemail arrives claiming to be from Amazon.\nCurious. They suddenly require account\nconfirmation. A touching display of concern,\nconsidering they already have his money.\nBob would simply close the email.";
                
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
        
        this.cardContainer = this.add.container(300, height / 2 + 50);

        
        const bg = this.add.rectangle(0, 0, 400, 600, 0xffffff).setStrokeStyle(6, 0x000000);

        
        
        const itemImg = this.add.image(0, 0, 'item_order').setDisplaySize(400, 600);

        
        this.cardContainer.add([bg, itemImg]);

        
        this.cardContainer.setScale(0);
        this.tweens.add({
            targets: this.cardContainer,
            scale: 1,
            duration: 400,
            ease: 'Back.out(1.5)',
            delay: 200 
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
