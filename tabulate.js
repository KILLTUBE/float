// @example tabulate([[1,2,3],[4,5,6]]);
function tabulate(data, options) {
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
  const maxCols = Math.max(...data.map(row => row ? row.length : 0));
  data.forEach((row, i) => {
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
  if (options && options.finalize) {
    var tr = document.createElement('tr');
    table.append(tr);
    var td = document.createElement('td');
    td.colSpan = maxCols;
    td.innerHTML = options.finalize;
    tr.append(td);
  }
  return table;
}
