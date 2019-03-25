
function execute() {
  if (this.prefix === 0xCB) {
    switch (this.opcode) {
      case 0x7C: { // BIT 7,H
        this.BITn3r8(7, 'h');
        break;
      }
      case 0x11: { // RL C
        this.RLr8('c');
        break;
      }
      case 0x27: { // SLA A
        this.SLA('a');
        break;
      }
      case 0x37: { // SWAP A
        this.SWAPr8('a');
        break;
      }
      case 0x87: { // RES 0,A
        this.RESn3r8(0, 'a');
        break;
      }
      default: {
        /* eslint-disable no-console */
        console.log('Non-implemented extended instruction:');
        console.log('PCHex: ', `0x${this.originalpc.toString(16).padStart(4, '0').toUpperCase()}`);
        console.log('PrefixHex: ', `0x${this.prefix.toString(16).padStart(2, '0').toUpperCase()}`);
        console.log('OpcodeHex: ', `0x${this.opcode.toString(16).padStart(2, '0').toUpperCase()}`);
        console.log();
        /* eslint-enable no-console */
        break;
      }
    }
  } else {
    switch (this.opcode) {
      case 0x00: { // NOP
        break;
      }
      case 0x01: { // LD BC,$aabb
        this.LDr16n16('b', 'c', this.byte2, this.byte1);
        break;
      }
      case 0x04: { // INC B
        this.INCr8('b');
        break;
      }
      case 0x05: { // DEC B
        this.DECr8('b');
        break;
      }
      case 0x06: { // LD B,$xx
        this.LDr8n8('b', this.byte1);
        break;
      }
      case 0x0B: { // DEC BC
        this.DECr16('b', 'c');
        break;
      }
      case 0x0C: { // INC C
        this.INCr8('c');
        break;
      }
      case 0x0D: { // DEC C
        this.DECr8('c');
        break;
      }
      case 0x0E: { // LD C,$xx
        this.LDr8n8('c', this.byte1);
        break;
      }
      case 0x11: { // LD DE,$aabb
        this.LDr16n16('d', 'e', this.byte2, this.byte1);
        break;
      }
      case 0x12: { // LD (DE),A
        this.LDrr16r8('d', 'e', 'a');
        break;
      }
      case 0x13: { // INC DE
        this.INCr16('d', 'e');
        break;
      }
      case 0x15: { // DEC D
        this.DECr8('d');
        break;
      }
      case 0x16: { // LD D,$xx
        this.LDr8n8('d', this.byte1);
        break;
      }
      case 0x17: { // RLA
        this.RLA();
        break;
      }
      case 0x18: { // JR $xx
        this.JRn8(this.byte1);
        break;
      }
      case 0x19: { // ADD HL,DE
        this.ADDr16r16('h', 'l', 'd', 'e');
        break;
      }
      case 0x1A: { // LD A,(DE)
        this.LDr8rr16('a', 'd', 'e');
        break;
      }
      case 0x1B: { // DEC DE
        this.DECr16('d', 'e');
        break;
      }
      case 0x1C: { // INC E
        this.INCr8('e');
        break;
      }
      case 0x1D: { // DEC E
        this.DECr8('e');
        break;
      }
      case 0x1E: { // LD E,$xx
        this.LDr8n8('e', this.byte1);
        break;
      }
      case 0x20: { // JR NZ,$xx
        this.JRNZn8(this.byte1);
        break;
      }
      case 0x21: { // LD HL,$aabb
        this.LDr16n16('h', 'l', this.byte2, this.byte1);
        break;
      }
      case 0x22: { // LD (HLI),A
        this.LDIrr16r8('h', 'l', 'a');
        break;
      }
      case 0x23: { // INC HL
        this.INCr16('h', 'l');
        break;
      }
      case 0x24: { // INC H
        this.INCr8('h');
        break;
      }
      case 0x28: { // JR Z,$xx
        this.JRZn8(this.byte1);
        break;
      }
      case 0x2A: { // LD A,(HLI)
        this.LDIr8rr16('a', 'h', 'l');
        break;
      }
      case 0x2C: { // INC L
        this.INCr8('l');
        break;
      }
      case 0x2E: { // LD L, $xx
        this.LDr8n8('l', this.byte1);
        break;
      }
      case 0x2F: { // CPL
        this.CPL();
        break;
      }
      case 0x31: { // LD SP,$aabb
        this.LDr16n16('s', 'p', this.byte2, this.byte1);
        break;
      }
      case 0x32: { // LD (HLD),A
        this.LDDrr16r8('h', 'l', 'a');
        break;
      }
      case 0x35: { // DEC (HL)
        this.DECrr16('h', 'l');
        break;
      }
      case 0x36: { // LD (HL),$xx
        this.LDrr16n8('h', 'l', this.byte1);
        break;
      }
      case 0x3D: { // DEC A
        this.DECr8('a');
        break;
      }
      case 0x3E: { // LD A,$xx
        this.LDr8n8('a', this.byte1);
        break;
      }
      case 0x47: { // LD B,A
        this.LDr8r8('b', 'a');
        break;
      }
      case 0x4F: { // LD C,A
        this.LDr8r8('c', 'a');
        break;
      }
      case 0x56: { // LD D,(HL)
        this.LDr8rr16('d', 'h', 'l');
        break;
      }
      case 0x57: { // LD D,A
        this.LDr8r8('d', 'a');
        break;
      }
      case 0x58: { // LD E,B
        this.LDr8r8('e', 'b');
        break;
      }
      case 0x59: { // LD E,C
        this.LDr8r8('e', 'c');
        break;
      }
      case 0x5A: { // LD E,D
        this.LDr8r8('e', 'd');
        break;
      }
      case 0x5B: { // LD E,E
        this.LDr8r8('e', 'e');
        break;
      }
      case 0x5E: { // LD E,(HL)
        this.LDr8rr16('e', 'h', 'l');
        break;
      }
      case 0x5F: { // LD E,A
        this.LDr8r8('e', 'a');
        break;
      }
      case 0x67: { // LD H,A
        this.LDr8r8('h', 'a');
        break;
      }
      case 0x7E: { // LD A,(HL)
        this.LDr8rr16('a', 'h', 'l');
        break;
      }
      case 0x7B: { // LD A,E
        this.LDr8r8('a', 'e');
        break;
      }
      case 0x7C: { // LD A,H
        this.LDr8r8('a', 'h');
        break;
      }
      case 0x77: { // LD (HL),A
        this.LDrr16r8('h', 'l', 'a');
        break;
      }
      case 0x78: { // LD A,B
        this.LDr8r8('a', 'b');
        break;
      }
      case 0x79: { // LD A,C
        this.LDr8r8('a', 'c');
        break;
      }
      case 0x7D: { // LD A,L
        this.LDr8r8('a', 'l');
        break;
      }
      case 0x86: { // ADD A,(HL)
        this.ADDr8rr16('a', 'h', 'l');
        break;
      }
      case 0x87: { // ADD A,A
        this.ADDr8r8('a', 'a');
        break;
      }
      case 0x90: { // SUB B
        this.SUBr8('b');
        break;
      }
      case 0xA1: { // AND C
        this.ANDr8('c');
        break;
      }
      case 0xA7: { // AND A
        this.ANDr8('a');
        break;
      }
      case 0xA9: { // XOR C
        this.XORr8('c');
        break;
      }
      case 0xAF: { // XOR A
        this.XORr8('a');
        break;
      }
      case 0xB0: { // OR B
        this.ORr8('b');
        break;
      }
      case 0xB1: { // OR C
        this.ORr8('c');
        break;
      }
      case 0xBE: { // CP (HL)
        this.CPrr16('h', 'l');
        break;
      }
      case 0xC1: { // POP BC
        this.POPr16('b', 'c');
        break;
      }
      case 0xC3: { // JP $aabb
        this.JPn16(this.byte2, this.byte1);
        break;
      }
      case 0xC9: { // RET
        this.RET();
        break;
      }
      case 0xC5: { // PUSH BC
        this.PUSHr16('b', 'c');
        break;
      }
      case 0xC8: { // RET Z
        this.RETZ();
        break;
      }
      case 0xCA: { // JP Z,$aabb
        this.JPZn16(this.byte2, this.byte1);
        break;
      }
      case 0xCD: { // CALL $aabb
        this.CALLn16(this.byte2, this.byte1);
        break;
      }
      case 0xD1: { // POP DE
        this.POPr16('d', 'e');
        break;
      }
      case 0xD5: { // PUSH DE
        this.PUSHr16('d', 'e');
        break;
      }
      case 0xE0: { // LD ($xx),A
        this.LDHrn8r8(this.byte1, 'a');
        break;
      }
      case 0xE1: { // POP HL
        this.POPr16('h', 'l');
        break;
      }
      case 0xE2: { // LD (C),A
        this.LDrr8r8('c', 'a');
        break;
      }
      case 0xE5: { // PUSH HL
        this.PUSHr16('h', 'l');
        break;
      }
      case 0xE6: { // AND $xx
        this.ANDn8(this.byte1);
        break;
      }
      case 0xE9: { // JP (HL)
        this.JPrr16('h', 'l');
        break;
      }
      case 0xEA: { // LD ($aabb), A
        this.LDrn16r8(this.byte2, this.byte1, 'a');
        break;
      }
      case 0xEF: { // RST $28
        this.RSTf(0x28);
        break;
      }
      case 0xF0: { // LD A,($xx)
        this.LDHr8rn8('a', this.byte1);
        break;
      }
      case 0xF1: { // POP AF
        this.POPr16('a', 'f');
        break;
      }
      case 0xF3: { // DI
        this.masterInteruptSwitch = false;
        break;
      }
      case 0xF5: { // PUSH AF
        this.PUSHr16('a', 'f');
        break;
      }
      case 0xFA: { // LD A,($aabb)
        this.LDr8rn16('a', this.byte2, this.byte1);
        break;
      }
      case 0xFB: { // IE
        this.masterInteruptSwitch = true;
        break;
      }
      case 0xFE: { // CP $xx
        this.CPn8(this.byte1);
        break;
      }
      case 0xFF: { // RST 38H
        this.RSTf(0x38);
        break;
      }
      default: {
        /* eslint-disable no-console */
        console.log('Non-implemented instruction:');
        console.log('PCHex: ', `0x${this.originalpc.toString(16).padStart(4, '0').toUpperCase()}`);
        console.log('OpcodeHex: ', `0x${this.opcode.toString(16).padStart(2, '0').toUpperCase()}`);
        console.log();
        /* eslint-enable no-console */
        break;
      }
    }
  }
  this.currentCycle += this.instructionInfo.cycles;
}

module.exports = execute;
