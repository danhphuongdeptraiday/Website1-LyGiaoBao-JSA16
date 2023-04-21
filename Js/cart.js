// Đăng nhập
let unsignDiv = document.getElementById("unsign");
let signedDiv = document.getElementById("signed");
let acc = document.getElementById("acc");
let check = 0;
let a = 0;
if (localStorage.getItem("Accounts") == null) {
  localStorage.setItem("Accounts", JSON.stringify([]));
  location.reload();
} else {
  var listUser = JSON.parse(localStorage.getItem("Accounts"));
}

for (let i = 0; i < listUser.length; i++) {
  if (listUser[i].status == "signed") {
    acc.innerHTML = listUser[i].email.slice(
      0,
      listUser[i].email.search("@gmail.com")
    );
    unsignDiv.style.display = "none";
    signedDiv.style.display = "block";
    check = 1;
    a = i;
  }
}
function signOut() {
  for (let i = 0; i < listUser.length; i++) {
    if (listUser[i].status == "signed") {
      listUser[i].status = "unsign";
      localStorage.setItem("Accounts", JSON.stringify(listUser));
    }
  }
  location.reload();
}
// check
if (
  check == 1 &&
  listUser[a].buyPro != null &&
  listUser[a].buyPro.length != 0
) {
  var buyPro = listUser[a].buyPro;
}

if (localStorage.getItem("buyPro").length != 0 && check == 0) {
  var buyPro = JSON.parse(localStorage.getItem("buyPro"));
}

// product
let payPro = [];
let product = document.getElementById("product");
for (let i = 0; i < buyPro.length; i++) {
  if (Number(buyPro[i].pnum) > 0) {
    let p = document.createElement("div");
    p.className = "p";
    p.innerHTML = `<img src="${buyPro[i].ppic}" alt="" class="proPic" />
      <div class="proInfo">
        <h3 class="proName">${buyPro[i].pname}</h3>
        <h4 class="proPrice">${buyPro[i].pprice}</h4>
        <div class="amount">
          <a href="javascript:void(0);" class="minus"></a>
          <input class="num" type="text" value="${buyPro[i].pnum}" />
          <a href="javascript:void(0);" class="plus"></a>
        </div>
      </div>`;
    product.appendChild(p);
    payPro.push(i);
  }
}

// plus minus
let minus = document.getElementsByClassName("minus");
let plus = document.getElementsByClassName("plus");
let amount = document.getElementsByClassName("num");
let proArray = document.getElementsByClassName("p");
for (let k = 0; k < payPro.length; k++) {
  minus[k].addEventListener("click", function () {
    amount[k].value = Number(amount[k].value) - 1;
    buyPro[payPro[k]].pnum -= 1;
    if (check == 1) {
      listUser[a].buyPro = buyPro;
      localStorage.setItem("Accounts", JSON.stringify(listUser));
    } else if (check == 0) {
      localStorage.setItem("buyPro", JSON.stringify(buyPro));
    }
    if (amount[k].value == 0) {
      proArray[k].style.display = "none";
    }
    // Cart
    let cartNum = document.getElementById("cartNum");
    let c = 0;
    for (let i = 0; i < buyPro.length; i++) {
      c += Number(buyPro[i].pnum);
    }
    cartNum.innerHTML = `Cart(${c})`;
    // Pay
    let subTot = document.getElementById("subTot");
    let discount = document.getElementById("discount");
    let vat = document.getElementById("vat");
    let total = document.getElementById("total");
    let cost = document.getElementsByClassName("cost");
    let s = 0;
    for (let i = 0; i < payPro.length; i++) {
      s += Number(buyPro[payPro[i]].pnum) * Number(cost[i].innerHTML) * 1000;
    }
    subTot.innerHTML = String(s).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    vat.innerHTML = String(s * 0.1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (check == 1) {
      discount.innerHTML = String(s * 0.05).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
      );
      total.innerHTML = String(s * 1.05).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      discount.innerHTML = "-";
      total.innerHTML = String(s * 0.1 + s).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
      );
    }
  });
  plus[k].addEventListener("click", function () {
    amount[k].value = Number(amount[k].value) + 1;
    buyPro[payPro[k]].pnum += 1;
    if (check == 1) {
      listUser[a].buyPro = buyPro;
      localStorage.setItem("Accounts", JSON.stringify(listUser));
    } else if (check == 0) {
      localStorage.setItem("buyPro", JSON.stringify(buyPro));
    }
    // Cart
    let cartNum = document.getElementById("cartNum");
    let c = 0;
    for (let i = 0; i < buyPro.length; i++) {
      c += Number(buyPro[i].pnum);
    }
    cartNum.innerHTML = `Cart(${c})`;
    // Pay
    let subTot = document.getElementById("subTot");
    let discount = document.getElementById("discount");
    let vat = document.getElementById("vat");
    let total = document.getElementById("total");
    let cost = document.getElementsByClassName("cost");
    let s = 0;
    for (let i = 0; i < payPro.length; i++) {
      s += Number(buyPro[payPro[i]].pnum) * Number(cost[i].innerHTML) * 1000;
    }
    subTot.innerHTML = String(s).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    vat.innerHTML = String(s * 0.1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (check == 1) {
      discount.innerHTML = String(s * 0.05).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
      );
      total.innerHTML = String(s * 1.05).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      discount.innerHTML = "-";
      total.innerHTML = String(s * 0.1 + s).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
      );
    }
  });
  amount[k].addEventListener("change", function () {
    buyPro[payPro[k]].pnum = Number(amount[k].value);
    if (check == 1) {
      listUser[a].buyPro = buyPro;
      localStorage.setItem("Accounts", JSON.stringify(listUser));
    } else if (check == 0) {
      localStorage.setItem("buyPro", JSON.stringify(buyPro));
    }
    if (amount[k].value == 0) {
      proArray[k].style.display = "none";
    }
    // Cart
    let cartNum = document.getElementById("cartNum");
    let c = 0;
    for (let i = 0; i < buyPro.length; i++) {
      c += Number(buyPro[i].pnum);
    }
    cartNum.innerHTML = `Cart(${c})`;
    // Pay
    let subTot = document.getElementById("subTot");
    let discount = document.getElementById("discount");
    let vat = document.getElementById("vat");
    let total = document.getElementById("total");
    let cost = document.getElementsByClassName("cost");
    let s = 0;
    for (let i = 0; i < payPro.length; i++) {
      s += Number(buyPro[payPro[i]].pnum) * Number(cost[i].innerHTML) * 1000;
    }
    subTot.innerHTML = String(s).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    vat.innerHTML = String(s * 0.1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    if (check == 1) {
      discount.innerHTML = String(s * 0.05).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
      );
      total.innerHTML = String(s * 1.05).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      discount.innerHTML = "-";
      total.innerHTML = String(s * 0.1 + s).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
      );
    }
  });
}

// Pay
let subTot = document.getElementById("subTot");
let discount = document.getElementById("discount");
let vat = document.getElementById("vat");
let total = document.getElementById("total");
let cost = document.getElementsByClassName("cost");
let s = 0;
for (let i = 0; i < payPro.length; i++) {
  s += Number(buyPro[payPro[i]].pnum) * Number(cost[i].innerHTML) * 1000;
}
subTot.innerHTML = String(s).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
vat.innerHTML = String(s * 0.1).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
if (check == 1) {
  discount.innerHTML = String(s * 0.05).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  total.innerHTML = String(s * 1.05).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
} else {
  discount.innerHTML = "-";
  total.innerHTML = String(s * 0.1 + s).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
// Deliver
let qi = document.getElementsByClassName("qi");
let setDf = document.getElementById("setDf");
let x = 0;
let y = 0;
if (
  check == 1 &&
  listUser[a].fullname != undefined &&
  listUser[a].phone != undefined &&
  listUser[a].city != undefined &&
  listUser[a].district != undefined &&
  listUser[a].ward != undefined &&
  listUser[a].address != undefined
) {
  qi[0].value = listUser[a].fullname;
  qi[1].value = listUser[a].phone;
  qi[2].value = listUser[a].city;
  qi[3].value = listUser[a].district;
  qi[4].value = listUser[a].ward;
  qi[5].value = listUser[a].address;
}
setDf.addEventListener("click", function () {
  if (check == 0) {
    x = 1;
    alert("Please sign in to set default address!");
  }
  if (x == 1) {
    setDf.checked = false;
  }
});
document.getElementById("subBtn").addEventListener("click", function () {
  if (
    qi[1].value != "" &&
    qi[2].value != "" &&
    qi[3].value != "" &&
    qi[4].value != "" &&
    qi[5].value != "" &&
    qi[0].value != ""
  ) {
    y = 1;
    alert("Submit address success!");
    if (setDf.checked == true) {
      listUser[a].fullname = qi[0].value;
      listUser[a].phone = qi[1].value;
      listUser[a].city = qi[2].value;
      listUser[a].district = qi[3].value;
      listUser[a].ward = qi[4].value;
      listUser[a].address = qi[5].value;
      localStorage.setItem("Accounts", JSON.stringify(listUser));
    }
  } else {
    alert("Please fill in all the necessary information!");
  }
});
document.getElementById("buyBtn").addEventListener("click", function () {
  if (y == 1 && payPro.length > 0) {
    for (let i = 0; i < payPro.length; i++) {
      buyPro[payPro[i]].pnum = 0;
    }
    if (check == 1) {
      listUser[a].buyPro = buyPro;
      localStorage.setItem("Accounts", JSON.stringify(listUser));
    } else if (check == 0) {
      localStorage.setItem("buyPro", JSON.stringify(buyPro));
    }
    alert("Order success!");
    window.location.href = "/JSA16/SPCK/Html/home.html";
  } else if (y == 0) {
    alert("Please submit your address to order the items!");
  } else if (payPro.length < 1) {
    alert("You can't buy 0 product sir!!!");
  }
});

// Cart
let cartNum = document.getElementById("cartNum");
let c = 0;
for (let i = 0; i < buyPro.length; i++) {
  c += Number(buyPro[i].pnum);
}
cartNum.innerHTML = `Cart(${c})`;
