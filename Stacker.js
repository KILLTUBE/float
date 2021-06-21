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

class Stacker {
  ops = [];
  constructor() {
    this.div = document.createElement('div');
    this.input = document.createElement('input');
    this.input.value = '100';
    this.table = document.createElement('table');
    // +
    this.buttonAdd = document.createElement('button');
    this.buttonAdd.innerText = '+';
    this.buttonAdd.onclick = function(e) {
      var opInput = this.newInput();
      opInput.inputRight.value = '0';
      opInput.tdMiddle.innerText = '+';
      if (this.ops.length == 0)
        opInput.inputLeft.value = this.input.value;
      else {
        opInput.inputLeft.value = this.ops[this.ops.length - 1].opInput.inputResult.value;
      }
      this.ops.push({
        func: add,
        opInput
      });
      this.update();
    }.bind(this);
    // -
    this.buttonSub = document.createElement('button');
    this.buttonSub.innerText = '-';
    this.buttonSub.onclick = function(e) {
      var opInput = this.newInput();
      opInput.inputRight.value = '0';
      opInput.tdMiddle.innerText = '-';
      this.ops.push({
        func: sub,
        opInput
      });
      this.update();
    }.bind(this);
    // *
    this.buttonMul = document.createElement('button');
    this.buttonMul.innerText = '*';
    this.buttonMul.onclick = function(e) {
      var opInput = this.newInput();
      opInput.inputRight.value = '1';
      opInput.tdMiddle.innerText = '*';
      this.ops.push({
        func: mul,
        opInput
      });
      this.update();
    }.bind(this);
    // /
    this.buttonDiv = document.createElement('button');
    this.buttonDiv.innerText = '/';
    this.buttonDiv.onclick = function(e) {
      var opInput = this.newInput();
      opInput.inputRight.value = '1';
      opInput.tdMiddle.innerText = '/';
      this.ops.push({
        func: div,
        opInput
      });
      this.update();
    }.bind(this);
    // ~
    this.buttonNot = document.createElement('button');
    this.buttonNot.innerText = '~';
    this.buttonNot.onclick = function(e) {
      var opInput = this.newInput();
      opInput.tdMiddle.innerText = '~';
      this.ops.push({
        func: not,
        opInput
      });
      this.update();
    }.bind(this);

    this.buttonSin = this.addFunc(Math.sin);
    this.buttonCos = this.addFunc(Math.cos);
    this.buttonAbs = this.addFunc(Math.abs);

    document.body.append(
      this.div,
      this.input,
      this.table,
      this.buttonAdd,
      this.buttonSub,
      this.buttonMul,
      this.buttonDiv,
      this.buttonNot,
    );

  }

  addFunc(func) {
    var button;
    button = document.createElement('button');
    button.innerText = func.name;
    button.onclick = function(e) {
      var opInput = this.newInput();
      opInput.tdMiddle.innerText = func.name;
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
