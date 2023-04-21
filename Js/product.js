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
// Product
let pro = JSON.parse(localStorage.getItem("proClick"));
document.getElementById("pic").src = pro.ppic;
document.getElementById("proName").innerHTML = pro.pname;
document.getElementById("proPrice").innerHTML = pro.pprice;
document.getElementById("proNameCopy").innerHTML = pro.pname;
document.getElementById("proPriceCopy").innerHTML = pro.pprice;
// Plus minus
let amount = document.getElementById("amount");
function bot() {
  if (Number(amount.value) > 0) {
    amount.value = Number(amount.value) - 1;
  } else {
    alert("Không thể mua ít hơn 0 món hàng. Đúng không?");
  }
}
function them() {
  amount.value = Number(amount.value) + 1;
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
console.log(check);
// Cart
let cartNum = document.getElementById("cartNum");
let c = 0;
for (let i = 0; i < buyPro.length; i++) {
  console.log(buyPro[i].pnum);
  c += Number(buyPro[i].pnum);
}
cartNum.innerHTML = `Cart(${c})`;
// function
let addBtn = document.getElementById("addBtn");
let buyBtn = document.getElementById("buyBtn");
let d;
for (let i = 0; i < buyPro.length; i++) {
  if (buyPro[i].pname == pro.pname) {
    d = i;
  }
}
addBtn.addEventListener("click", function () {
  buyPro[d].pnum += Number(amount.value);
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
});
buyBtn.addEventListener("click", function () {
  buyPro[d].pnum += Number(amount.value);
  if (check == 1) {
    listUser[a].buyPro = buyPro;
    localStorage.setItem("Accounts", JSON.stringify(listUser));
  } else if (check == 0) {
    localStorage.setItem("buyPro", JSON.stringify(buyPro));
  }
  window.location.href = "/JSA16/SPCK/Html/cart.html";
});
