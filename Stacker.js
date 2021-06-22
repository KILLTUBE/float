function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}

function not(a) {
  return ~a;
}

function unsignedRightShift(a, b) {
  return a >>> b;
}

// TODO:
// remainder %
// exponentiation **
// logical not !
// bitwise left/right << >>
// bitwise and/or/xor & | ^

// todo bits(0.1) is wrong
function bits(x) {
  x = x.toString(2);
  x = x.padStart(32, '0');
  x = '0b' + x;
  return x;
}

class Stacker {
  ops = [];
  constructor() {
    this.div = document.createElement('div');
    this.input = document.createElement('input');
    this.input.value = '100';
    this.table = document.createElement('table');
    document.body.append(
      this.div,
      this.input,
      this.table
    );
    this.buttonAdd                = this.addFunc(add               , '+'   , 0   );
    this.buttonSub                = this.addFunc(sub               , '-'   , 0   );
    this.buttonMul                = this.addFunc(mul               , '*'   , 1   );
    this.buttonDiv                = this.addFunc(div               , '/'   , 1   );
    this.buttonNot                = this.addFunc(not               , '~'   , null);
    this.buttonSin                = this.addFunc(Math.sin          , 'sin' , null);
    this.buttonCos                = this.addFunc(Math.cos          , 'cos' , null);
    this.buttonAbs                = this.addFunc(Math.abs          , 'abs' , null);
    this.buttonUnsignedRightShift = this.addFunc(unsignedRightShift, '>>>' , 0   );
    this.buttonUnsignedRightShift = this.addFunc(bits              , 'bits', 0   );
  }

  addFunc(func, name, identityValue) {
    var button;
    button = document.createElement('button');
    button.innerText = name;
    button.onclick = function(e) {
      var opInput = this.newInput();
      opInput.tdMiddle.innerText = name;
      if (this.ops.length == 0) {
        opInput.inputLeft.value = this.input.value;
      } else {
        opInput.inputLeft.value = this.ops[this.ops.length - 1].opInput.inputResult.value;
      }
      if (identityValue != null) {
        opInput.inputRight.value = identityValue;
      }
      this.ops.push({
        func,
        opInput
      });
      this.update();
    }.bind(this);
    document.body.append(button);
  }

  newInput() {
    var tr = document.createElement('tr');
    var tdLeft = document.createElement('td');
    var tdMiddle = document.createElement('td');
    var tdRight = document.createElement('td');
    var tdResult = document.createElement('td');
    this.table.append(tr);
    tr.append(
      tdLeft,
      tdMiddle,
      tdRight,
      tdResult
    );
    var inputLeft = document.createElement('input');
    var inputRight = document.createElement('input');
    var inputResult = document.createElement('input');
    tdLeft.append(inputLeft);
    tdRight.append(inputRight);
    tdRight.append('=');
    tdResult.append(inputResult);
    inputLeft.oninput = this.update.bind(this);
    inputRight.oninput = this.update.bind(this);
    return {
      tr,
      tdLeft,
      tdMiddle,
      tdRight,
      tdResult,
      inputLeft,
      inputRight,
      inputResult
    };
  }

  update() {
    this.ops.forEach((op, i) => {
      op.opInput.inputResult.value = op.func(
        eval(op.opInput.inputLeft.value),
        eval(op.opInput.inputRight.value)
      );

      // Activate second input (might be deactivated again)
      op.opInput.inputRight.disabled = false;
      // An op with one argument doesn't need a second input
      if (op.func.length == 1) {
        op.opInput.inputRight.disabled = true;
        op.opInput.inputRight.value = '';
      }

      // copy result to next row (if it exists)
      var nextOp = this.ops[i + 1];
      if (nextOp) {
        nextOp.opInput.inputLeft.value = op.opInput.inputResult.value;
      }
    });
  }
}
