$(document).ready(function () {
    limparForm();
    $("#notificacao").hide();
    $("#entrar").click(function () {

        $(".alert").removeClass("alert-success");
        $(".alert").addClass("alert-danger");

        var txtEmail = $("#email");
        var txtSenha = $("#senha");

        txtEmail.removeClass("is-invalid");
        txtSenha.removeClass("is-invalid");

        email = $("#email").val();
        filtro = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        if (!txtEmail.val() && !txtSenha.val()) {
            $("#msgNotificacao").text('Preencha corretamente os campos de email e senha');
            $("#notificacao").show();
            return false;
        } else if (txtEmail.val() == null || txtEmail.val() == "" || !filtro.test(email)) {
            $(".invalid-feedback").text('Preencha corretamente o campo email');
            txtEmail.addClass("is-invalid");
            return false;
        } else if (txtSenha.val() == null || txtSenha.val() == "") {
            $(".invalid-feedback").text('Preencha corretamente o campo confirmar senha');
            txtSenha.addClass("is-invalid");
            return false;
        } else {
            $("#notificacao").hide();
            var data = {
                email: $("#email").val(),
                senha: $("#senha").val()
            };
            $.post("http://localhost:8000/usuario/sam",
                data,
                function (data, status) {
                    $(".alert").removeClass("alert-danger");
                    $(".alert").addClass("alert-success");
                    
                    $("#notificacao").show();
                    console.log(data.status);
                    if(data.status == 1){
                        localStorage.setItem("idUsuario", data.id);
                        localStorage.setItem("nomeUsuario", data.nome);
                        $("#msgNotificacao").text('Usuário logado com sucesso');
                        $(window.document.location).attr('href',"/perfil");
                    }else{
                        $(".alert").removeClass("alert-success");
                        $(".alert").addClass("alert-danger");
                        $("#msgNotificacao").text(data.msg);
                        console.log(data.msg);
                    }
                });
            limparForm();
        }
    });
});
function limparForm() {
    $("#email").val("");
    $("#senha").val("");
}