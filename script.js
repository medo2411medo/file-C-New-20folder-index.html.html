let salary = localStorage.getItem("salary") ? parseFloat(localStorage.getItem("salary")) : 0;
let purchases = localStorage.getItem("purchases") ? JSON.parse(localStorage.getItem("purchases")) : [];
let history = localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : [];
let monthCount = localStorage.getItem("monthCount") ? parseInt(localStorage.getItem("monthCount")) : 0;

function saveData() {
  localStorage.setItem("salary", salary);
  localStorage.setItem("purchases", JSON.stringify(purchases));
  localStorage.setItem("history", JSON.stringify(history));
  localStorage.setItem("monthCount", monthCount);
}

function setSalary() {
  salary = parseFloat(document.getElementById("salaryInput").value);
  saveData();
  render();
}

function addPurchase() {
  const name = document.getElementById("itemName").value;
  const price = parseFloat(document.getElementById("itemPrice").value);
  const date = new Date().toLocaleDateString("ar-EG");

  if(price > getBalance()){
    alert("المبلغ غير كافي!");
    return;
  }

  purchases.push({name, price, date});
  saveData();
  render();

  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
}

function getBalance() {
  const spent = purchases.reduce((sum, p) => sum + p.price, 0);
  return salary - spent;
}

function endMonth() {
  monthCount++;
  history.push({month: monthCount, salary: salary, purchases: purchases});
  purchases = [];
  saveData();
  render();
}

function render() {
  document.getElementById("balance").innerText = getBalance();

  const table = document.getElementById("purchaseTable");
  table.innerHTML = "";
  purchases.forEach(p => {
    const row = table.insertRow();
    row.insertCell(0).innerText = p.name;
    row.insertCell(1).innerText = p.price;
    row.insertCell(2).innerText = p.date;
  });

  const historyDiv = document.getElementById("history");
  historyDiv.innerHTML = "";
  history.forEach(h => {
    const section = document.createElement("div");
    section.innerHTML = `<h3>الشهر ${h.month}</h3>`;
    const tbl = document.createElement("table");
    tbl.innerHTML = "<tr><th>المنتج</th><th>السعر</th><th>التاريخ</th></tr>";
    h.purchases.forEach(p => {
      const row = tbl.insertRow();
      row.insertCell(0).innerText = p.name;
      row.insertCell(1).innerText = p.price;
      row.insertCell(2).innerText = p.date;
    });
    section.appendChild(tbl);
    historyDiv.appendChild(section);
  });
}

// أول ما الصفحة تفتح
render();