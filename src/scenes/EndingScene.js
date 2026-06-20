import Phaser from 'phaser';

export class EndingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndingScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        
        this.cameras.main.setBackgroundColor('#000000');

        
        this.add.text(width / 2, height * 0.15, 'YOU SURVIVED THE INTERNET.', {
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '48px',
            color: '#22b14c', 
            fontWeight: 'bold'
        }).setOrigin(0.5);

        
        const boxWidth = 750;
        const boxHeight = 450;
        const boxX = (width - boxWidth) / 2;
        const boxY = (height - boxHeight) / 2;

        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0xffffff); 
        graphics.strokeRoundedRect(boxX, boxY, boxWidth, boxHeight, 20); 
        
        const endingPara = "SPECIAL NOTICE\n\nRecent studies estimate that thousands of\nBeyblades remain abandoned on store shelves\nevery year, waiting for someone to let\nthem rip.\n\nShould CyberQuest somehow receive the grand\nprize, 100% of the winnings (all $10 of\nthem) will be donated to the Beyblade\nHomelessness Relief Fund.*\n\nTogether, we can help one Beyblade find\nits forever launcher.\n\n*Pending budget approval.";
        
        this.add.text(width / 2, height / 2, endingPara, {
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '24px',
            color: '#ffffff', 
            align: 'left',
            wordWrap: { width: 750 } 
        }).setOrigin(0.5);

        
        const btnWidth = 250;
        const btnHeight = 60;
        const btnX = (width - btnWidth) / 2;
        const btnY = height * 0.85 - (btnHeight / 2);

        const btnGraphics = this.add.graphics();
        
        
        const drawButton = (isHovered) => {
            btnGraphics.clear();
            if (isHovered) {
                btnGraphics.fillStyle(0x333333, 1); 
                btnGraphics.fillRoundedRect(btnX, btnY, btnWidth, btnHeight, 15);
            }
            btnGraphics.lineStyle(2, 0xffffff); 
            btnGraphics.strokeRoundedRect(btnX, btnY, btnWidth, btnHeight, 15);
        };

        
        drawButton(false);

        
        this.add.text(width / 2, height * 0.85, 'Main Menu', {
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '28px',
            color: '#ffffff',
            fontWeight: 'bold'
        }).setOrigin(0.5);

        
        const menuZone = this.add.zone(width / 2, height * 0.85, btnWidth, btnHeight)
            .setInteractive({ useHandCursor: true });

        
        menuZone.on('pointerover', () => drawButton(true));
        menuZone.on('pointerout', () => drawButton(false));
        menuZone.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });

        
        const creditsText = "Field Research Conducted By:\nBlaze Hellsinger";
        
        this.add.text(50, height - 120, creditsText, {
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '18px',
            color: '#888888', 
            align: 'left'
        }).setOrigin(0, 0);
    }
}
