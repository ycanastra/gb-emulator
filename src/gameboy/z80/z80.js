import fetch from './fetch.js';
import execute from './execute.js';
import {
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
} from './flagsUtil.js';

import { ADDr8r8, ADDr8rr16, ADDr16r16 } from './instructions/add.js';
import { ANDn8, ANDr8 } from './instructions/and.js';
import { BITn3r8 } from './instructions/bit.js';
import { CALLn16 } from './instructions/call.js';
import { CPn8, CPrr16 } from './instructions/cp.js';
import CPL from './instructions/cpl.js';
import { INCr8, INCr16 } from './instructions/inc.js';
import { DECr8, DECr16, DECrr16 } from './instructions/dec.js';
import { JPn16, JPrr16, JPZn16 } from './instructions/jp.js';
import { JRn8, JRZn8, JRNZn8 } from './instructions/jr.js';
import {
  LDr8n8, LDr8r8, LDr8rn16, LDr8rr16, LDr16n16,
  LDrn16r8, LDrr8r8, LDrr16n8, LDrr16r8, LDDrr16r8,
  LDHr8rn8, LDHrn8r8, LDIr8rr16, LDIrr16r8,
} from './instructions/ld.js';
import { ORn8, ORr8 } from './instructions/or.js';
import POPr16 from './instructions/pop.js';
import PUSHr16 from './instructions/push.js';
import RESn3r8 from './instructions/res.js';
import { RET, RETZ } from './instructions/ret.js';
import { RLA, RLr8 } from './instructions/rl.js';
import RSTf from './instructions/rst.js';
import SLA from './instructions/sla.js';
import { SUBr8 } from './instructions/sub.js';
import { SWAPr8 } from './instructions/swap.js';
import { XORr8 } from './instructions/xor.js';

const formatRegister = (register) => {
  return register.toString(16).toUpperCase().padStart(2, '0');
};

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
    /* eslint-disable no-console */
    console.log('Printing final register values:');
    console.log(`af= 0x${formatRegister(this.registers.a)}${formatRegister(this.registers.f)}`);
    console.log(`bc= 0x${formatRegister(this.registers.b)}${formatRegister(this.registers.c)}`);
    console.log(`de= 0x${formatRegister(this.registers.d)}${formatRegister(this.registers.e)}`);
    console.log(`hl= 0x${formatRegister(this.registers.h)}${formatRegister(this.registers.l)}`);
    console.log(`sp= 0x${this.registers.sp.toString(16).toUpperCase().padStart(4, '0')}`);
    console.log(`pc= 0x${this.registers.pc.toString(16).toUpperCase().padStart(4, '0')}`);

    console.log(`z=  0b${this.getZeroFlagBit()}`);
    console.log(`n=  0b${this.getSubtractFlagBit()}`);
    console.log(`h=  0b${this.getHalfCarryFlagBit()}`);
    console.log(`c=  0b${this.getCarryFlagBit()}`);
    /* eslint-enable no-console */
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

export default Z80;
