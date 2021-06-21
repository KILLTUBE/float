function float_to_uint(float) {
  var ab = new ArrayBuffer(4);
  var f = new Float32Array(ab);
  var u = new Uint32Array(ab);
  f[0] = float;
  return u[0];
}

function uint_to_float(uint) {
  var ab = new ArrayBuffer(4);
  var f = new Float32Array(ab);
  var u = new Uint32Array(ab);
  u[0] = uint;
  return f[0];
}

// float_to_uint(-248.75)
// 3279470592
// uint_to_float(3279470592)
// -248.75

last = 0;
curr = 0;

// Make some numbers to work with
numbers = [];
for (var i=-3; i<3; i+=0.1) {
  numbers.push(i);
}
numbers.push(-248.75);
numbers.push(Math.Pi);

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

// @example tabulate([[1,2,3],[4,5,6]]);
function tabulate(arr) {
  var table = document.createElement('table');
  document.body.appendChild(table);
  arr.forEach(row => {
    var tr = document.createElement('tr');
    table.append(tr);
    row.forEach(col => {
      var td = document.createElement('td');
      td.innerText = col;
      tr.append(td);
    });
  });
  return table;
}

function main() {
  var data = [];
  data.push(['number', 'last', 'curr', 'last - curr', 'float']);
  for (var number of numbers) {
    float = new Float(number);
    curr = float.uint;
    data.push([number, last, curr, last - curr, float]);
    last = curr;
  }
  
  
  
  
  tabulate(data);
}


window.onload = main;