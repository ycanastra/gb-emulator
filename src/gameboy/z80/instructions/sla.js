
function SLA(register) {
  this.registers[register] = (this.registers[register] << 1) & 0xFF;
}

export default SLA;
