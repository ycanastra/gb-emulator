const opcodesData = require('./opcodes.json');

function fetch() {
  this.originalpc = this.registers.pc; // only used for debugging purposes
  if (this.originalpc === 0x7FF3) {
    console.log(this.instructions[this.registers.pc]);
  }
  if (this.instructions[this.registers.pc] === 0xCB) {
    this.prefix = 0xCB;
    this.opcode = this.instructions[this.registers.pc + 1];
    this.registers.pc += 2;
  } else {
    this.prefix = null;
    this.opcode = this.instructions[this.registers.pc];
    this.registers.pc += 1;
  }

  const opcodeInfo = (this.prefix === null)
                     ? opcodesData[this.opcode]
                     : opcodesData[this.prefix][this.opcode];

  const numBytesToRead = (this.prefix === 0xCB) ? opcodeInfo.bytes - 2 : opcodeInfo.bytes - 1;

  if (numBytesToRead === 1) {
    this.byte1 = this.instructions[this.registers.pc];
    this.byte2 = null;
  } else if (numBytesToRead === 2) {
    this.byte1 = this.instructions[this.registers.pc];
    this.byte2 = this.instructions[this.registers.pc + 1];
  } else {
    this.byte1 = null;
    this.byte2 = null;
  }

  this.instructionInfo = opcodeInfo;

  this.registers.pc += numBytesToRead;
}

module.exports = fetch;
