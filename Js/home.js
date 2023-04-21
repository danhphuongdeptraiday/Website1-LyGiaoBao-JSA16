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
console.log(check);
// Cart
let cartNum = document.getElementById("cartNum");
let c = 0;
for (let i = 0; i < buyPro.length; i++) {
  c += Number(buyPro[i].pnum);
}
cartNum.innerHTML = `Cart(${c})`;
