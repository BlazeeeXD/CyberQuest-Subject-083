import Phaser from 'phaser';

export class GalleryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GalleryScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.add.text(width / 2, height * 0.2, 'UNLOCKED AUTOPSIES', {
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '40px',
            fill: '#ff007f'
        }).setOrigin(0.5);

        
        const savedDeaths = JSON.parse(localStorage.getItem('cyberquest_deaths')) || [];
        
        if (savedDeaths.length === 0) {
            this.add.text(width / 2, height * 0.5, 'No records found. Stay alive... or don\'t.', {
                fontFamily: 'Arial',
                fontSize: '20px',
                fill: '#ffffff'
            }).setOrigin(0.5);
        }

        
        const backButton = this.add.text(width / 2, height * 0.85, 'RETURN TO MENU', {
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '24px',
            fill: '#ffffff',
            backgroundColor: '#222222',
            padding: { x: 15, y: 8 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        backButton.on('pointerover', () => backButton.setStyle({ fill: '#00ffc8' }));
        backButton.on('pointerout', () => backButton.setStyle({ fill: '#ffffff' }));
        
        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }
}
