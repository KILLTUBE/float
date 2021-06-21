class MantissaCalculator {
  static nextId = 0;
  constructor() {
    this.div = document.createElement('div');
    this.divdiv = document.createElement('div');
    this.divdiv.id = "mantissacalculator#" + this.nextId++;
    this.input = document.createElement('input');
    this.div.append(
      this.input,
      this.divdiv
    );
    this.div.append(this.input);
    document.body.appendChild(
        //this.description,
        this.div,
        //this.output
    );
    this.input.oninput = this.oninput.bind(this);
  }

  oninput(e) {
    var sum = 0;
    var data = [];
    var bitvalue;
    this.input.value.split("").forEach((bit, pos)=>{
      var add = 0;
      if (bit == '1') {
        bitvalue = 1 << (pos+1);
        add = 1 / bitvalue;
        sum += add;
      }
      data.push([bit, pos, bitvalue, add, sum]);
    });
    tabulate(data, {
      id: this.divdiv.id,
      arrive: '<h2>Mantissa Calculator</h2>',
      finalize: `<b><center>Final value: ${sum}</center></b>`,
      header: ['bit', 'pos', 'bitvalue', 'add', 'sum']
    });
  }
}
