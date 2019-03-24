const EventEmitter = require('events');

const Z80 = require('./z80/z80.js');
const LCD = require('./lcd.js');

const bootstrap = require('./DMG_ROM.bin');

class GameBoy extends EventEmitter {
  constructor() {
    super();
    this.z80 = new Z80();
    this.lcd = new LCD(this.z80);
    this.z80.initializeMemory();
    this.z80.loadBootstrap(bootstrap);
  }
  performanceChecker() {
    let debug = false;
    let scanlineCount = 0;
    let renderScreenCount = 0;
    while (true) {
      if (this.z80.registers.pc === 0x035E) {
        debug = true;
        // this.z80.printRegisters();
        // this.z80.fetch();
        // this.z80.execute();
        // this.z80.printRegisters();
        // this.z80.fetch();
        // this.z80.execute();
        // this.z80.printRegisters();
        // console.log('somethingf went wrong');
        // break;
      }
      if (debug && this.z80.registers.pc === 0x036E) { // 0x03E9) {
        this.z80.printRegisters();
        console.log(this.z80.mainMemory[0xff85].toString(16));
        this.z80.fetch();
        this.z80.execute();
        this.z80.printRegisters();
        console.log(this.z80.mainMemory[0xff85].toString(16));
        // this.z80.fetch();
        // this.z80.execute();
        // this.z80.printRegisters();
        // this.z80.fetch();
        // this.z80.execute();
        // this.z80.printRegisters();
        break;
      }
      // if (this.z80.registers.pc > 0x0100) {
      //   console.log(this.z80.registers.pc.toString(16));
      // }
      // if (this.z80.registers.pc === 0x0293) {
      //   console.log(this.z80.registers.pc.toString(16));
      // }
      if (debug) {
        // this.z80.printRegisters();
        // debugger;
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
      // if (this.z80.registers.pc > 0x0295) {
      //   console.log(this.z80.registers.pc.toString(16));
      //   this.z80.printRegisters();
      //   console.log('done');
      //   return;
      // }
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
