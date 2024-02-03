import EventEmitter from 'events';

import Z80 from './z80/z80.js';
import LCD from './lcd.js';
import { repeatEvery } from './util';

import bootstrap from './../../resources/DMG_ROM.bin';

class GameBoy extends EventEmitter {
  constructor() {
    super();
    this.z80 = new Z80();
    this.lcd = new LCD(this.z80);
    this.z80.initializeMemory();
    this.z80.loadBootstrap(bootstrap);
  }
  // Only for debugging
  performanceChecker() {
    let scanlineCount = 0;
    let renderScreenCount = 0;
    for (; ;) {
      if (this.z80.registers.pc === 0x031F) {
        this.z80.printRegisters();
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
    const VRAM_CYCLES_PER_UPDATE = 465;
    const SCREEN_CYCLES_PER_UPDATE = 69905;

    const maybeUpdateGraphics =
      repeatEvery(VRAM_CYCLES_PER_UPDATE, () => this.lcd.updateGraphics());

    const run = () => {
      // console.log('hi');
      const resetPc = 0x0100;

      // const pcToStop = 0x0100;
      if (this.z80.registers.pc === 0x073E) {
        this.z80.printRegisters();

        // debugger;
        return;
      }

      if (this.z80.registers.pc === resetPc) {
        this.z80.printRegisters();

        // debugger;
        return;
      }

      // if (this.z80.registers.pc >= pcToStop) {

      //   this.z80.printRegisters();
      //   debugger;
      //   return;
      // }
      setTimeout(run, 0);
      const renderScreenCount = ~~(this.z80.getCurrentCycle() / SCREEN_CYCLES_PER_UPDATE);
      while (renderScreenCount + 1 !== ~~(this.z80.getCurrentCycle() / SCREEN_CYCLES_PER_UPDATE)) {
        // this.z80.printRegisters2();

        this.z80.fetch();
        this.z80.execute();

        // Update VRAM every 465 cycles
        maybeUpdateGraphics(this.z80.getCurrentCycle());
      }
      this.emit('screen-update');
    };
    run();
  }
  loadCartridge(data) {
    this.z80.loadCartridge(data);
  }
}

export default GameBoy;
