const EventEmitter = require('events');

const Z80 = require('./z80/z80.js');
const LCD = require('./lcd.js');

const bootloader = require('./DMG_ROM.bin');

class GameBoy extends EventEmitter {
  constructor() {
    super();
    this.z80 = new Z80();
    this.lcd = new LCD(this.z80);
    this.z80.initializeMemory();
    this.z80.loadBootLoader(bootloader);
  }
  performanceChecker() {
    let scanlineCount = 0;
    let renderScreenCount = 0;
    while (true) {
      if (this.z80.registers.pc > 0x0100) {
        console.log(this.z80.getCurrentCycle());
        console.log('done');
        break;
      }
      this.z80.fetch();
      this.z80.execute();
      if (scanlineCount + 1 === ~~(this.z80.getCurrentCycle() / 465)) {
        this.lcd.updateGraphics();
        scanlineCount = ~~(this.z80.getCurrentCycle() / 465);
      }
      if (renderScreenCount + 1 === ~~(this.z80.getCurrentCycle() / 69905)) {
        renderScreenCount = ~~(this.z80.getCurrentCycle() / 69905);
      }
    }
  }
  start() {
    const run = () => {
      if (this.z80.registers.pc > 0x0300) {
        console.log('done');
        return;
      }
      setTimeout(run, 0);
      const renderScreenCount = ~~(this.z80.getCurrentCycle() / 69905);
      let scanlineCount = ~~(this.z80.getCurrentCycle() / 465);
      // ~~ used instead of parseInt for performance gains
      while (renderScreenCount + 1 !== ~~(this.z80.getCurrentCycle() / 69905)) {
        this.z80.fetch();
        this.z80.execute();
        if (scanlineCount + 1 === ~~(this.z80.getCurrentCycle() / 465)) {
          this.lcd.updateGraphics();
          scanlineCount = ~~(this.z80.getCurrentCycle() / 465);
        }
      }
      this.emit('screen-update');
    };
    setTimeout(run, 0);
  }
  loadCartridge(data) {
    this.z80.loadCartridge(data);
  }
}

export default GameBoy;
