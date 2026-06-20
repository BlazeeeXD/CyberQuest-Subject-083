import Phaser from 'phaser';


import houseImg from '../assets/images/house.png';

export class DeathScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DeathScene' });
    }

    init(data) {
        this.deathId = data.deathId;
    }

    preload() {
        this.load.image('bg_building', 'assets/images/building.png');
        this.load.image('bg_road', 'assets/images/road.png');
        this.load.image('bg_street', 'assets/images/street.png');
        this.load.image('bg_coffee_shop', 'assets/images/coffee_shop.png');
        this.load.image('bg_house', houseImg); 
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        
        const deathData = {
            'usb_death': {
                title: 'OBSERVATION FAILED',
                description: "Subject believed strangers distribute 64GB USB drives out of generosity.",
                narrator: "'An unexpectedly charitable view of humanity.'",
                bgStyle: 'street'
            },
            'phishing_death': { 
                title: 'OBSERVATION FAILED',
                description: "Subject willingly confirmed credentials through a fraudulent email.",
                narrator: "'The grammar was poor. The confidence was not.'",
                bgStyle: 'street'
            },
            'public_wifi_death': { 
                title: 'OBSERVATION FAILED',
                description: "Subject connected to a malicious wireless access point.",
                narrator: "'Several people enjoyed the free Wi-Fi. One enjoyed Bob's passwords.'",
                bgStyle: 'coffee'
            },
            'house_death': { 
                title: 'OBSERVATION FAILED',
                description: "Subject failed to notice the fingerprint skimmer attached to the door.",
                narrator: "'I really thought he'd make it home.'",
                bgStyle: 'house'
            }
        };

        const currentDeath = deathData[this.deathId] || {
            title: 'UNKNOWN ERROR',
            description: 'Subject experienced a critical failure of common sense.',
            narrator: "The simulation requires a reboot.",
            bgStyle: 'street'
        };

        
        if (currentDeath.bgStyle === 'coffee') {
            this.add.image(0, 0, 'bg_coffee_shop').setOrigin(0, 0).setDisplaySize(width, height);
        } else if (currentDeath.bgStyle === 'street') {
            this.add.image(0, 0, 'bg_building').setOrigin(0, 0).setDisplaySize(width, height * 0.4);
            this.add.image(0, height * 0.4, 'bg_road').setOrigin(0, 0).setDisplaySize(width, height * 0.3);
            this.add.image(0, height * 0.7, 'bg_street').setOrigin(0, 0).setDisplaySize(width, height * 0.3);
        } else if (currentDeath.bgStyle === 'house') {
            this.add.image(0, 0, 'bg_house').setOrigin(0, 0).setDisplaySize(width, height);
        }

        
        this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0, 0);

        
        const boxWidth = 900;
        const boxHeight = 500;
        const boxX = (width - boxWidth) / 2;
        const boxY = (height - boxHeight) / 2;

        const boxGraphics = this.add.graphics();
        boxGraphics.fillStyle(0xffffff, 1);
        boxGraphics.fillRoundedRect(boxX, boxY, boxWidth, boxHeight, 20); 
        boxGraphics.lineStyle(8, 0x000000); 
        boxGraphics.strokeRoundedRect(boxX, boxY, boxWidth, boxHeight, 20);

        
        this.add.text(width / 2, height * 0.25, currentDeath.title, {
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '48px',
            color: '#e62020',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        
        this.add.text(width / 2, height * 0.42, currentDeath.description, {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#000000',
            align: 'center',
            wordWrap: { width: 750 }
        }).setOrigin(0.5);

        
        this.add.text(width / 2, height * 0.58, currentDeath.narrator, {
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '24px',
            color: '#797979', 
            fontStyle: 'italic',
            align: 'center',
            wordWrap: { width: 750 }
        }).setOrigin(0.5);

        
        const btnWidth = 250;
        const btnHeight = 60;
        const btnX = (width - btnWidth) / 2;
        const btnY = height * 0.82; 

        const btnGraphics = this.add.graphics();
        
        const drawButton = (isHovered) => {
            btnGraphics.clear();
            
            btnGraphics.fillStyle(isHovered ? 0xe0e0e0 : 0xffffff, 1); 
            btnGraphics.fillRoundedRect(btnX, btnY, btnWidth, btnHeight, 15);
            btnGraphics.lineStyle(4, 0x000000); 
            btnGraphics.strokeRoundedRect(btnX, btnY, btnWidth, btnHeight, 15);
        };

        drawButton(false);

        
        this.add.text(width / 2, btnY + (btnHeight / 2), 'RESPAWN', {
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#000000' 
        }).setOrigin(0.5);

        
        const retryZone = this.add.zone(width / 2, btnY + (btnHeight / 2), btnWidth, btnHeight)
            .setInteractive({ useHandCursor: true });

        retryZone.on('pointerover', () => drawButton(true));
        retryZone.on('pointerout', () => drawButton(false));
        retryZone.on('pointerdown', () => {
            this.scene.start('Level1Scene');
        });
    }
}
