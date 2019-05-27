if (localStorage.getItem("idUsuario") == null || localStorage.getItem("idUsuario") == "null"){
    window.location.href = "/usuario/login";
    console.log(localStorage.getItem("idUsuario"));
}
var teste = localStorage.getItem("nomeUsuario");
document.getElementById("nomeUsuario").innerHTML = "Olá "+ teste;

function logout(botao) {
    localStorage.clear();
    window.location.href = "/usuario/login";
  }