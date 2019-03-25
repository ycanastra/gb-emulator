import GameBoy from './gameboy/gameboy';
import cartridge from 'rom';

const gameBoy = new GameBoy();
gameBoy.loadCartridge(cartridge);
gameBoy.start();

const canvas = document.querySelector('#main-canvas');
const ctx = canvas.getContext('2d');

const imgData = ctx.createImageData(160, 144);
const { data } = imgData;

gameBoy.on('screen-update', () => {
  for (let i = 0, len = 160 * 144 * 4; i < len; i += 4) {
    data[i] = gameBoy.lcd.screen[i / 4];
    data[i + 1] = gameBoy.lcd.screen[i / 4];
    data[i + 2] = gameBoy.lcd.screen[i / 4];
    data[i + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);
});
