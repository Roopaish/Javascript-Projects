qty = document.getElementsByName("qty");
price = document.getElementsByName("price");
tip = document.getElementsByName("tip");
prices = [80, 100, 50, 25];
var totalPrice;

function updateValues(index) {
  if (qty[index].value >= 0) {
    price[index].value = qty[index].value * prices[index];
  } else {
    price[index].value = 0;
  }
}

function Total() {
  totalPrice = 0;
  totalQty = 0;
  var i = 0;

  for (i = 0; i <= 3; i++) {
    if (parseInt(price[i].value) > 0) {
      totalPrice += parseInt(price[i].value);
    }
    if (parseInt(qty[i].value) > 0) {
      totalQty += parseInt(qty[i].value);
    }
  }

  if (i == 4) {
    price[4].value = totalPrice;
    qty[4].value = totalQty;
  }
}

function totalBill(i) {
  tipValues = [20, 10, 5, 0];
  remarks = [
    "Glad you enjoy that!😍",
    "Thank you!😊",
    "Thanks! We will improve.😁",
    "We are really sorry that you didn't like the food!😢",
  ];

  bill = totalPrice + (tipValues[i] / 100) * totalPrice;
  document.getElementById("bill").innerHTML = `
  Your Bill is Rs.${bill}
  <br/>
  ${remarks[i]}
  `;
}
