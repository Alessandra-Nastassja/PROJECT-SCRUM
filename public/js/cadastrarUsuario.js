$(document).ready(function () {
    limparForm();
    $("#notificacao").hide();
    $("#cadastrar").click(function () {

        $(".alert").removeClass("alert-success");
        $(".alert").addClass("alert-danger");

        var txtNome = $("#nome");
        var txtEmail = $("#email");
        var txtEmailConfirmar = $("#emailConfirmar");
        var txtSenha = $("#senha");

        txtNome.removeClass("is-invalid");
        txtEmail.removeClass("is-invalid");
        txtEmailConfirmar.removeClass("is-invalid");
        txtSenha.removeClass("is-invalid");

        email = $("#email").val();
        emailConfirmar = $("#emailConfirmar").val();
        filtro = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

        if (!txtNome.val() && !txtEmail.val() && !txtEmailConfirmar.val() && !txtSenha.val()) {
            $("#msgNotificacao").text('Preencha corretamente os campos de nome, email, confirmar email e senha');
            $("#notificacao").show();
            return false;
        } else if (txtNome.val() == null || txtNome.val() == "") {
            $(".invalid-feedback").text('Preencha corretamente o campo nome');
            txtNome.addClass("is-invalid");
            return false;
        } else if (txtEmail.val() == null || txtEmail.val() == "" || !filtro.test(email)) {
            $(".invalid-feedback").text('Preencha corretamente o campo email');
            txtEmail.addClass("is-invalid");
            return false;
        } else if (txtEmail.val() != txtEmailConfirmar.val()) {
            $(".invalid-feedback").text('Os emails não conferem');
            txtEmail.addClass("is-invalid");
            txtEmailConfirmar.addClass("is-invalid");
            return false;
        } else if (txtEmailConfirmar.val() == null || txtEmailConfirmar.val() == "" || !filtro.test(emailConfirmar)) {
            $(".invalid-feedback").text('Preencha corretamente o campo confirmar email');
            txtEmailConfirmar.addClass("is-invalid");
            return false;
        } else if (txtSenha.val() == null || txtSenha.val() == "") {
            $(".invalid-feedback").text('Preencha corretamente o campo confirmar senha');
            txtSenha.addClass("is-invalid");
            return false;
        } else {
            $("#notificacao").hide();
            var data = {
                nome: $("#nome").val(),
                email: $("#email").val(),
                emailConfirmar: $("#emailConfirmar").val(),
                senha: $("#senha").val()
            };
            $.post("/usuario/new",
                data,
                function (data, status) {
                    $(".alert").removeClass("alert-danger");
                    $(".alert").addClass("alert-success");
                    $("#msgNotificacao").text('Usuário cadastrado com sucesso');
                    $("#notificacao").show();
                });
            limparForm();
        }
    });
});
function limparForm() {
    $("#idUsuario").val("");
    $("#nome").val("");
    $("#email").val("");
    $("#emailConfirmar").val("");
    $("#senha").val("");
}