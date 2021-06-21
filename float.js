// Quick one liners
// tabulate([...Array(30)].map((x, i)=>{return [i, i%10]}), {id:'mantissacalculator', header: ['i', 'i%10']})

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
function tabulate(arr, options) {
  var table = document.createElement('table');
  var parent = undefined;
  if (options && options.id) {
    parent = document.getElementById(options.id);
    if (!parent) {
      console.error(`tabulate> id ${options.id} does not exist in dom`);
      return;
    }
    parent.innerHTML = ''; // delete old content
  }
  if (!parent) {
    parent = document.body;
  }
  parent.appendChild(table);
  arr.forEach((row, i) => {
    // add headers <th> every 10 rows
    if (options && options.header && i % 10 == 0) {
      var trHead = document.createElement('tr');
      table.append(trHead);
      options.header.forEach(col => {
        var th = document.createElement('th');
        th.innerText = col;
        trHead.append(th);
      });
    }
    // actual data
    var tr = document.createElement('tr');
    table.append(tr);
    row.forEach((col, j) => {
      var td = document.createElement('td');
      td.innerText = col;
      tr.append(td);
    });
  });
  return table;
}

var input;
var output;

function main() {
  description = document.createElement('h2');
  description.innerText = 'Mantissa Calculator';
  input = document.createElement('input');
  output = document.createElement('textarea');
  document.body.append(description, input, output);
  input.oninput = function(e) {
    out = '';
    sum = 0;
    data = [];
    data.push();
    input.value.split("").forEach((bit, pos)=>{
      add = 0;
      if (bit == '1') {
        bitvalue = 1 << (pos+1);
        add = 1 / bitvalue;
        sum += add;
      }
      data.push([bit, pos, bitvalue, add, sum]);
    });
    tabulate(data, {
      id: 'mantissacalculator',
      arrive: '<h2>Mantissa Calculator</h2>',
      finalize: `<b><center>Final value: ${sum}</center></b>`,
      header: ['bit', 'pos', 'bitvalue', 'add', 'sum']
    });
  };
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