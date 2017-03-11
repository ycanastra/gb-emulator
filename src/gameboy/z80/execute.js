
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
      default: {
        console.log('Non-implemented extended instruction:');
        console.log('PCHex: ', this.originalpc.toString(16));
        console.log('PrefixHex: ', this.prefix.toString(16));
        console.log('OpcodeHex: ', this.opcode.toString(16));
        console.log();
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
      case 0x1A: { // LD A,(DE)
        this.LDr8rr16('a', 'd', 'e');
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
      case 0x2E: { // LD L, $xx
        this.LDr8n8('l', this.byte1);
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
      case 0x4F: { // LD C,A
        this.LDr8r8('c', 'a');
        break;
      }
      case 0x57: { // LD D,A
        this.LDr8r8('d', 'a');
        break;
      }
      case 0x67: { // LD H,A
        this.LDr8r8('h', 'a');
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
      case 0x7D: { // LD A,L
        this.LDr8r8('a', 'l');
        break;
      }
      case 0x86: { // ADD A,(HL)
        this.ADDr8rr16('a', 'h', 'l');
        break;
      }
      case 0x90: { // SUB B
        this.SUBr8('b');
        break;
      }
      case 0xAF: { // XOR A
        this.XORr8('a');
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
      case 0xCB: {
        // Program should never go here
        console.log('Something went wrong if you see this message');
        break;
      }
      case 0xCD: { // CALL $aabb
        this.CALLn16(this.byte2, this.byte1);
        break;
      }
      case 0xE0: { // LD ($xx),A
        this.LDHrn8r8(this.byte1, 'a');
        break;
      }
      case 0xE2: { // LD (C),A
        this.LDrr8r8('c', 'a');
        break;
      }
      case 0xEA: { // LD ($aabb), A
        this.LDrn16r8(this.byte2, this.byte1, 'a');
        break;
      }
      case 0xF0: { // LD A,($xx)
        this.LDHr8rn8('a', this.byte1);
        break;
      }
      case 0xF3: { // DI
        this.masterInteruptSwitch = false;
        break;
      }
      case 0xFE: { // CP $xx
        this.CPn8(this.byte1);
        break;
      }
      default: {
        console.log('Non-implemented instruction:');
        console.log('PCHex: ', this.originalpc.toString(16));
        console.log('OpcodeHex: ', this.opcode.toString(16));
        console.log();
        break;
      }
    }
  }
  this.currentCycle += this.instructionInfo.cycles;
}

module.exports = execute;