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


import coffee_shop from '../assets/images/coffee_shop.png'; 
import wifi from '../assets/images/wifi.png'; 

export class Level3Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level3Scene' });
    }

    preload() {
        
        this.load.image('idle1', idle1Img); this.load.image('idle2', idle2Img);
        this.load.image('idle3', idle3Img); this.load.image('idle4', idle4Img);
        this.load.image('idle5', idle5Img); this.load.image('idle6', idle6Img);
        this.load.image('idle7', idle7Img); this.load.image('idle8', idle8Img);

        this.load.image('walk1', walk1Img); this.load.image('walk2', walk2Img);
        this.load.image('walk3', walk3Img); this.load.image('walk4', walk4Img);
        this.load.image('walk5', walk5Img); this.load.image('walk6', walk6Img);
        this.load.image('walk7', walk7Img); this.load.image('walk8', walk8Img);

        
        this.load.image('bg_coffee_shop', coffee_shop);
        this.load.image('item_wifi', wifi); 
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        
        this.add.image(0, 0, 'bg_coffee_shop')
            .setOrigin(0, 0)
            .setDisplaySize(width, height);

        
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

        
        
        const STICKMAN_Y = height * 0.75; 
        
        this.stickman = this.add.sprite(1950, STICKMAN_Y, 'idle1');
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

        
        this.showPromptBox(width, height);
    }

    showPromptBox(width, height) {
        this.promptContainer = this.add.container(width / 2, 140); 
        
        
        const bg = this.add.rectangle(0, 0, 1220, 240, 0xffffff).setStrokeStyle(6, 0x000000);
        
        
        const divider = this.add.rectangle(150, 0, 6, 240, 0x000000);
        
        
        const promptText = this.add.text(-600, -100, '', {
            fontFamily: 'Courier New, Courier, monospace', 
            fontSize: '28px', 
            color: '#000000',
            wordWrap: { width: 700 }, 
            align: 'left', 
            fontWeight: 'bold'
        }).setOrigin(0, 0); 

        
        const btn1 = this.createButton(265, -45, 'CafeGuest','#ffffffa1');      
        const btn2 = this.createButton(495, -45, 'SAFE_VPN','#ffffffa1');    
        const btn3 = this.createButton(265, 45, 'Free_Coffe_WiFi','#ffffffa1');  
        const btn4 = this.createButton(495, 45, 'Cuppa_Web','#ffffffa1');     

        const allButtons = [btn1, btn2, btn3, btn4];
        allButtons.forEach(btn => btn.setAlpha(0).disableInteractive());

        const lockAllButtons = () => {
            allButtons.forEach(btn => btn.disableInteractive());
        };

        
        const successAction = () => {
            lockAllButtons();

            if (this.promptContainer) {
                this.tweens.add({ targets: this.promptContainer, y: -200, duration: 400, ease: 'Back.in' });
            }

            
            if (this.cardContainer) {
                this.tweens.add({ targets: this.cardContainer, scale: 0, duration: 400, ease: 'Back.in' });
            }

            this.stickman.play('stickman_walk');
            this.tweens.add({
                targets: this.stickman, x: -100, duration: 3000, ease: 'Linear',
                onComplete: () => {
                    this.cameras.main.fadeOut(500, 0, 0, 0);
                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('Level5Scene'); 
                    });
                }
            });
        };

        btn1.on('pointerdown', successAction);
        btn4.on('pointerdown', successAction);

        
        const deathAction = () => {
            lockAllButtons();
            this.scene.start('DeathScene', { deathId: 'public_wifi_death' });
        };

        btn2.on('pointerdown', deathAction);
        btn3.on('pointerdown', deathAction);

        this.promptContainer.add([bg, divider, promptText, ...allButtons]);
        
        
        this.promptContainer.y = -220; 
        this.tweens.add({
            targets: this.promptContainer,
            y: 140, 
            duration: 600,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                const fullText = "The café offered exactly what Bob needed.\nCoffee.\nInternet.\nAnd an unexpectedly generous selection of\nwireless networks. Some of them appeared\nperfectly ordinary. The others tried harder.";
                
                let i = 0;
                this.time.addEvent({
                    delay: 25, 
                    repeat: fullText.length - 1,
                    callback: () => {
                        promptText.text += fullText[i];
                        i++;

                        if (i === fullText.length) {
                            this.tweens.add({
                                targets: allButtons,
                                alpha: 1, 
                                duration: 300,
                                onComplete: () => {
                                    allButtons.forEach(btn => btn.setInteractive({ useHandCursor: true }));
                                }
                            });
                        }
                    }
                });
            }
        });
    }

    
    showItemCard(width, height) {
        this.cardContainer = this.add.container(400, height / 2 + 70);

        const bg = this.add.rectangle(0, 0, 400, 652, 0xffffff).setStrokeStyle(6, 0x000000);
        const itemImg = this.add.image(0, 0, 'item_wifi').setDisplaySize(400, 652);

        this.cardContainer.add([bg, itemImg]);

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
            fontSize: '22px', 
            fontWeight: 'bold',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 5, y: 10 }, 
            fixedWidth: 210, 
            align: 'center'
        })
        .setOrigin(0.5);

        button.on('pointerover', () => button.setStyle({ fill: color }));
        button.on('pointerout', () => button.setStyle({ fill: '#ffffff' }));

        return button;
    }
}
