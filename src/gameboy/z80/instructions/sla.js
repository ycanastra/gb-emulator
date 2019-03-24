
function SLA(register) {
  this.registers[register] = (this.registers[register] << 1) & 0xFF;
}

module.exports = SLA;
