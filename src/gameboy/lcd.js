// Resolution = 160×144 (20×18 tiles)
// tiles =
// Max sprites – Max 40 per screen, 10 per line
// Sprite sizes – 8×8 or 8×16

function getBit(value, bitNumber) {
  return (value >> bitNumber) & 0x1;
}

function getTileAddress(tileIdentifier, tileDataSelect) {
  if (tileDataSelect === 0 && tileIdentifier <= 0x7F) {
    return 0x9000 + (16 * tileIdentifier);
  }
  return 0x8000 + (16 * tileIdentifier);
}

class LCD {
  constructor(z80) {
    this.z80 = z80;
    this.screen = new Array(23040); // 160x144 pixels

    this.currentLine = 0;
  }
  updateGraphics() {
    // setLCDStatus() Not sure what this is yet

    this.currentLine = this.z80.readMemory(0xFF44);
    this.z80.writeMemory(0xFF44, this.currentLine + 1);

    if (this.currentLine >= 144 && this.currentLine <= 153) {
      // requestInterupt();
    } else if (this.currentLine > 153) {
      this.z80.writeMemory(0xFF44, 0);
    } else {
      this.renderScanline();
    }
  }
  getPixelData(pixelRow, pixelCol, tileDataSelect, bgTileMapSelect) {
    const tileRow = ~~(pixelRow / 8);
    const tileCol = ~~(pixelCol / 8);

    const tileMapAddress = (bgTileMapSelect === 0) ? 0x9800 : 0x9C00;

    const tileIndex = (tileRow * 32) + tileCol;
    const tileIdentifier = this.z80.readMemory(tileMapAddress + tileIndex);
    const relativePixelIndex = ((pixelRow % 8) << 3) + (pixelCol % 8);
    const relativeByteIndex = ~~(relativePixelIndex / 8) << 1;
    const relativeBitIndex = relativePixelIndex % 8;

    const tileDataAddress = getTileAddress(tileIdentifier, tileDataSelect);

    const pixelByte1 = this.z80.readMemory(tileDataAddress + relativeByteIndex);
    const pixelByte2 = this.z80.readMemory(tileDataAddress + relativeByteIndex + 1);

    const pixelBit1 = getBit(pixelByte1, ((-1) * relativeBitIndex) + 7);
    const pixelBit2 = getBit(pixelByte2, ((-1) * relativeBitIndex) + 7);

    return pixelBit1 << 1 + pixelBit2;
  }
  renderScanline() {
    const lcdControlReg = this.z80.readMemory(0xFF40);
    const lcdDisplayEnable = getBit(lcdControlReg, 7);
    // const winTileMapSelect = getBit(lcdControlReg, 6);
    const winDisplayEnable = getBit(lcdControlReg, 5);
    const tileDataSelect = getBit(lcdControlReg, 4);
    const bgTileMapSelect = getBit(lcdControlReg, 3);
    // const spriteSizeSelect = getBit(lcdControlReg, 2);
    const spriteDisplayEnable = getBit(lcdControlReg, 1);
    const bgDisplayEnable = getBit(lcdControlReg, 0);

    if (lcdDisplayEnable === 0) {
      return;
    }
    if (bgDisplayEnable === 1) {
      this.renderBackgroundScanline(tileDataSelect, bgTileMapSelect);
    }
    if (winDisplayEnable === 1) {
      // this.renderWindowScanline();
    }
    if (spriteDisplayEnable === 1) {
      // this.renderSpriteScaneline();
    }
  }
  renderBackgroundScanline(tileDataSelect, bgTileMapSelect) {
    const scrollY = this.z80.readMemory(0xFF42);
    const scrollX = this.z80.readMemory(0xFF43);
    // const bgY = this.z80.readMemory(0xFF4A);
    // const bgX = this.z80.readMemory(0xFF4B);

    const bgPalleteData = this.z80.readMemory(0xFF47);

    const colorMap = {
      0: getBit(bgPalleteData, 1) << 1 + getBit(bgPalleteData, 0),
      1: getBit(bgPalleteData, 3) << 1 + getBit(bgPalleteData, 2),
      2: getBit(bgPalleteData, 5) << 1 + getBit(bgPalleteData, 4),
      3: getBit(bgPalleteData, 7) << 1 + getBit(bgPalleteData, 6),
    };

    const colors = {
      0: 255,
      1: 170,
      2: 85,
      3: 0,
    };

    for (let i = 0; i < 160; i += 1) {
      const pixelRow = (this.currentLine + scrollY) & 0xFF;
      const pixelCol = (i + scrollX) & 0xFF;
      const pixelData = this.getPixelData(pixelRow, pixelCol, tileDataSelect, bgTileMapSelect);
      const pixelIndex = (this.currentLine * 160) + pixelCol;

      if (pixelData === 3) {
        this.screen[pixelIndex] = colors[colorMap[3]];
      } else if (pixelData === 2) {
        this.screen[pixelIndex] = colors[colorMap[2]];
      } else if (pixelData === 1) {
        this.screen[pixelIndex] = colors[colorMap[1]];
      } else {
        this.screen[pixelIndex] = colors[colorMap[0]];
      }
    }
  }
}

module.exports = LCD;
