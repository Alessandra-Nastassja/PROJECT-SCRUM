if (localStorage.getItem("idUsuario") == null || localStorage.getItem("idUsuario") == "null"){
    window.location.href = "/usuario/login";
    console.log(localStorage.getItem("idUsuario"));
}
var teste = localStorage.getItem("nomeUsuario");
console.log(teste)
document.getElementById("nomeUsuario").appendChild(localStorage.getItem("nomeUsuario"));

function logout(botao) {
    localStorage.clear();
    window.location.href = "/usuario/login";
  }