// Quick one liners
// tabulate([...Array(30)].map((x, i)=>{return [i, i%10]}), {id:'mantissacalculator', header: ['i', 'i%10']})

// float_to_uint(-248.75)
// 3279470592
function float_to_uint(float) {
  var ab = new ArrayBuffer(4);
  var f = new Float32Array(ab);
  var u = new Uint32Array(ab);
  f[0] = float;
  return u[0];
}

// uint_to_float(3279470592)
// -248.75
function uint_to_float(uint) {
  var ab = new ArrayBuffer(4);
  var f = new Float32Array(ab);
  var u = new Uint32Array(ab);
  u[0] = uint;
  return f[0];
}

// Make some numbers to work with
numbers = [];
for (var i=-3; i<3; i+=0.1) {
  numbers.push(i);
}
for (var i=-3; i<3; i+=0.1) {
  numbers.push(100 + i);
}
numbers.push(-248.75);
numbers.push(Math.PI);
numbers.push(Math.E);
numbers.push(NaN);
numbers.push(Infinity);
numbers.push(-Infinity);

class Float {
  constructor(num) {
    this.num = num;
    this.uint = float_to_uint(num); 
    this.bin = this.uint.toString(2);
    this.bin = this.bin.padStart(32, '0');
    console.assert(this.bin.length == 32);
  }
  get sign() {
    return this.bin[0];
  }
  get exponent() {
    return this.bin.substring(1, 9);
  }
  get mantissa() {
    return this.bin.substring(9, 32);
  }
  toString() {
    return `Float(sign=${this.sign} exponent=${this.exponent} mantissa=${this.mantissa})`;
  }
}

var input;
var output;
var mantissaCalculator;
var last = 0;
var curr = 0;

function main() {
  mantissaCalculator = new MantissaCalculator;
  
  var div = document.createElement('div');
  div.id = 'numbers';
  document.body.append(div);
  var data = [];
  for (var number of numbers) {
    float = new Float(number);
    curr = float.uint;
    data.push([number, last, curr, last - curr, float]);
    last = curr;
  }
  tabulate(data, {
    id: 'numbers',
    header: ['number', 'last', 'curr', 'last - curr', 'float']
  });
}

window.onload = main;
