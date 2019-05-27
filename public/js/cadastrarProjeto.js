$(document).ready(function () {
    $('.dinheiro').mask('#.##0,00', {reverse: true});
    limparForm();
    $("#notificacao").hide();
    $("#cadastrar").click(function () {

        $(".alert").removeClass("alert-success");
        $(".alert").addClass("alert-danger");

        var txtNome = $("#nome");
        var txtPreco = $("#preco");
        var txtDescricao = $("#descricao");

        txtNome.removeClass("is-invalid");
        txtPreco.removeClass("is-invalid");
        txtDescricao.removeClass("is-invalid");

        if (!txtNome.val() && !txtPreco.val() && !txtDescricao.val()) {
            $("#msgNotificacao").text('Preencha corretamente os campos de nome, preço e descrição');
            $("#notificacao").show();
            return false;
        } else if (txtNome.val() == null || txtNome.val() == "") {
            $(".invalid-feedback").text('Preencha corretamente o campo nome');
            txtNome.addClass("is-invalid");
            return false;
        } else if (txtPreco.val() == null || txtPreco.val() == "") {
            $(".invalid-feedback").text('Preencha corretamente o campo preço');
            txtPreco.addClass("is-invalid");
            return false;
        } else if (txtDescricao.val() == null || txtDescricao.val() == "") {
            $(".invalid-feedback").text('Preencha corretamente o campo descrição');
            txtDescricao.addClass("is-invalid");
            return false;
        } else {
            $("#notificacao").hide();
            var data = {
                nome: $("#nome").val(),
                preco: $("#preco").val(),
                descricao: $("#descricao").val()
            };
            $.post("http://localhost:8000/projeto/new",
                data,
                function (data, status) {
                    $(".alert").removeClass("alert-danger");
                    $(".alert").addClass("alert-success");
                    $("#msgNotificacao").text('Projeto cadastrado com sucesso');
                    $("#notificacao").show();
                });
            limparForm();
        }
    });
});
function limparForm() {
    $("#idProjeto").val("");
    $("#nome").val("");
    $("#preco").val("");
    $("#descricao").val("");
    $("#cadastrar").val('Cadastrar');

    $("#cancelar").hide();
}
