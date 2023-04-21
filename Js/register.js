let mail = document.getElementById("email");
let mk = document.getElementById("mk");
let mkcf = document.getElementById("cf");
let check = 0;

if (localStorage.getItem("Accounts") == null) {
  localStorage.setItem("Accounts", JSON.stringify([]));
  location.reload();
  check = 1;
} else {
  var listUser = JSON.parse(localStorage.getItem("Accounts"));
}

function saveinf() {
  if (mail.value == "" || mk.value == "" || mkcf.value == "") {
    alert("Please fill in the information below!");
  } else if (mk.value != mkcf.value) {
    alert("Please check your password!");
  } else if (check == 0) {
    for (let i = 0; i < listUser.length; i++) {
      if (listUser[i].email == mail.value) {
        check = 2;
      } else {
        check = 1;
      }
    }
    if (check == 2) {
      alert("Account already exists!");
      mail.value = "";
      mk.value = "";
      mkcf.value = "";
    } else {
      listUser.push({
        email: mail.value,
        password: mk.value,
      });
      localStorage.setItem("Accounts", JSON.stringify(listUser));
      mail.value = "";
      mk.value = "";
      mkcf.value = "";
      alert("Thank you! You have successfully registered.\nPlease login!");
      window.location.href = "/JSA16/SPCK/Html/login.html";
    }
  } else {
    listUser.push({
      email: mail.value,
      password: mk.value,
    });
    localStorage.setItem("Accounts", JSON.stringify(listUser));
    mail.value = "";
    mk.value = "";
    mkcf.value = "";
    alert("Thank you! You have successfully registered.\nPlease login!");
    window.location.href = "/JSA16/SPCK/Html/login.html";
  }
}
