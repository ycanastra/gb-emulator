const fetch = require('./fetch.js');
const execute = require('./execute.js');
const {
  getZeroFlagBit,
  getCarryFlagBit,
  getSubtractFlagBit,
  getHalfCarryFlagBit,
  setZeroFlagBit,
  setCarryFlagBit,
  setSubtractFlagBit,
  setHalfCarryFlagBit,
  clearZeroFlagBit,
  clearCarryFlagBit,
  clearSubtractFlagBit,
  clearHalfCarryFlagBit,
} = require('./flagsUtil.js');

const { ADDr8r8, ADDr8rr16, ADDr16r16 } = require('./instructions/add.js');
const { ANDn8, ANDr8 } = require('./instructions/and.js');
const { BITn3r8 } = require('./instructions/bit.js');
const { CALLn16 } = require('./instructions/call.js');
const { CPn8, CPrr16 } = require('./instructions/cp.js');
const CPL = require('./instructions/cpl.js');
const { INCr8, INCr16 } = require('./instructions/inc.js');
const { DECr8, DECr16, DECrr16 } = require('./instructions/dec.js');
const { JPn16, JPrr16, JPZn16 } = require('./instructions/jp.js');
const { JRn8, JRZn8, JRNZn8 } = require('./instructions/jr.js');
const { LDr8n8, LDr8r8, LDr8rn16, LDr8rr16, LDr16n16, LDrn16r8, LDrr8r8, LDrr16n8, LDrr16r8, LDDrr16r8, LDHr8rn8, LDHrn8r8, LDIr8rr16, LDIrr16r8 } = require('./instructions/ld.js');
const { ORn8, ORr8 } = require('./instructions/or.js');
const POPr16 = require('./instructions/pop.js');
const PUSHr16 = require('./instructions/push.js');
const RESn3r8 = require('./instructions/res.js');
const { RET, RETZ } = require('./instructions/ret.js');
const { RLA, RLr8 } = require('./instructions/rl.js');
const RSTf = require('./instructions/rst.js');
const SLA = require('./instructions/sla.js');
const { SUBr8 } = require('./instructions/sub.js');
const { SWAPr8 } = require('./instructions/swap.js');
const { XORr8 } = require('./instructions/xor.js');

class Z80 {
  constructor() {
    this.MAIN_MEMORY_SIZE = 0x10000; // 65536
    this.MAX_INSTRUCTION_SIZE = 0x200000; // 2097152
    this.CYCLES_PER_SEC = 4194304;
    this.CYCLES_PER_SCREEN_RENDER = 69905;

    this.currentCycle = 0;
    this.mainMemory = new Array(this.MAIN_MEMORY_SIZE);
    this.bootstrap = new Array(0x100);
    this.masterInteruptSwitch = false;
    this.cartridge = null;
    this.registers = {
      // accumulator, 8-bit
      a: 0,
      // flags, 8-bit
      f: 0,
      // general-purpose, 8-bit
      b: 0, c: 0, d: 0, e: 0, h: 0, l: 0,
      // program counter, 16-bit
      pc: 0,
      // stack pointer, 16-bit
      sp: 0,
      // instruction, 8-bit
      ir: 0,
    };
    this.prefix = null;
    this.opcode = null;
    this.operand1 = null;
    this.operand2 = null;
    this.byte1 = null;
    this.byte2 = null;
    this.originalpc = null;
    this.instructionInfo = null;
  }
  printRegisters() {
    console.log(`af= ${this.registers.a.toString(16).toUpperCase().padStart(2, '0')}${this.registers.f.toString(16).toUpperCase().padStart(2, '0')}`);
    console.log(`bc= ${this.registers.b.toString(16).toUpperCase().padStart(2, '0')}${this.registers.c.toString(16).toUpperCase().padStart(2, '0')}`);
    console.log(`de= ${this.registers.d.toString(16).toUpperCase().padStart(2, '0')}${this.registers.e.toString(16).toUpperCase().padStart(2, '0')}`);
    console.log(`hl= ${this.registers.h.toString(16).toUpperCase().padStart(2, '0')}${this.registers.l.toString(16).toUpperCase().padStart(2, '0')}`);
    console.log(`sp= ${this.registers.sp.toString(16).toUpperCase().padStart(4, '0')}`);
    console.log(`pc= ${this.registers.pc.toString(16).toUpperCase().padStart(4, '0')}`);

    console.log(`z= ${this.getZeroFlagBit()}`);
    console.log(`n= ${this.getSubtractFlagBit()}`);
    console.log(`h= ${this.getHalfCarryFlagBit()}`);
    console.log(`c= ${this.getCarryFlagBit()}`);
  }
  loadBootstrap(instructions) {
    instructions.forEach((instruction, index) => {
      this.bootstrap[index] = instruction;
      this.mainMemory[index] = instruction;
    });
  }
  loadCartridge(instructions) {
    this.cartridge = instructions;
    instructions.forEach((instruction, index) => {
      if (index > 0x7FFF) {
        return;
      }
      if (index >= 0x100) {
        this.bootstrap[index] = instruction;
        this.mainMemory[index] = instruction;
      }
    });
  }
  initializeMemory() {
    this.mainMemory.fill(0);
  }
  readMemory(address) {
    return this.mainMemory[address];
  }
  writeMemory(address, data) {
    if (address === 0xFF00) {
      this.mainMemory[address] = 0xFF;
      return;
    }
    if (address === 0xFF50 && data !== 0x00) {
      for (let i = 0; i < 0x100; i += 1) {
        this.mainMemory[i] = this.cartridge[i];
      }
    }
    this.mainMemory[address] = data;
  }
  getCurrentCycle() {
    return this.currentCycle;
  }
  resetCurrentCycle() {
    this.currentCycle = 0;
  }
}

Z80.prototype.fetch = fetch;
Z80.prototype.execute = execute;

Z80.prototype.ADDr8r8 = ADDr8r8;
Z80.prototype.ADDr8rr16 = ADDr8rr16;
Z80.prototype.ADDr16r16 = ADDr16r16;

Z80.prototype.ANDn8 = ANDn8;
Z80.prototype.ANDr8 = ANDr8;

Z80.prototype.BITn3r8 = BITn3r8;

Z80.prototype.CALLn16 = CALLn16;

Z80.prototype.CPn8 = CPn8;
Z80.prototype.CPrr16 = CPrr16;

Z80.prototype.CPL = CPL;

Z80.prototype.INCr8 = INCr8;
Z80.prototype.INCr16 = INCr16;

Z80.prototype.DECr8 = DECr8;
Z80.prototype.DECr16 = DECr16;
Z80.prototype.DECrr16 = DECrr16;

Z80.prototype.JPn16 = JPn16;
Z80.prototype.JPrr16 = JPrr16;
Z80.prototype.JPZn16 = JPZn16;

Z80.prototype.JRn8 = JRn8;
Z80.prototype.JRZn8 = JRZn8;
Z80.prototype.JRNZn8 = JRNZn8;

Z80.prototype.LDr8n8 = LDr8n8;
Z80.prototype.LDr8r8 = LDr8r8;
Z80.prototype.LDr8rn16 = LDr8rn16;
Z80.prototype.LDr8rr16 = LDr8rr16;
Z80.prototype.LDr16n16 = LDr16n16;
Z80.prototype.LDrn16r8 = LDrn16r8;
Z80.prototype.LDrr8r8 = LDrr8r8;
Z80.prototype.LDrr16n8 = LDrr16n8;
Z80.prototype.LDrr16r8 = LDrr16r8;
Z80.prototype.LDDrr16r8 = LDDrr16r8;
Z80.prototype.LDHr8rn8 = LDHr8rn8;
Z80.prototype.LDHrn8r8 = LDHrn8r8;
Z80.prototype.LDIr8rr16 = LDIr8rr16;
Z80.prototype.LDIrr16r8 = LDIrr16r8;

Z80.prototype.ORn8 = ORn8;
Z80.prototype.ORr8 = ORr8;

Z80.prototype.POPr16 = POPr16;
Z80.prototype.PUSHr16 = PUSHr16;

Z80.prototype.RET = RET;
Z80.prototype.RETZ = RETZ;

Z80.prototype.RESn3r8 = RESn3r8;

Z80.prototype.RLA = RLA;
Z80.prototype.RLr8 = RLr8;

Z80.prototype.RSTf = RSTf;

Z80.prototype.SLA = SLA;

Z80.prototype.SUBr8 = SUBr8;

Z80.prototype.SWAPr8 = SWAPr8;

Z80.prototype.XORr8 = XORr8;

Z80.prototype.getZeroFlagBit = getZeroFlagBit;
Z80.prototype.getCarryFlagBit = getCarryFlagBit;
Z80.prototype.getSubtractFlagBit = getSubtractFlagBit;
Z80.prototype.getHalfCarryFlagBit = getHalfCarryFlagBit;
Z80.prototype.setZeroFlagBit = setZeroFlagBit;
Z80.prototype.setCarryFlagBit = setCarryFlagBit;
Z80.prototype.setSubtractFlagBit = setSubtractFlagBit;
Z80.prototype.setHalfCarryFlagBit = setHalfCarryFlagBit;
Z80.prototype.clearZeroFlagBit = clearZeroFlagBit;
Z80.prototype.clearCarryFlagBit = clearCarryFlagBit;
Z80.prototype.clearSubtractFlagBit = clearSubtractFlagBit;
Z80.prototype.clearHalfCarryFlagBit = clearHalfCarryFlagBit;

module.exports = Z80;
