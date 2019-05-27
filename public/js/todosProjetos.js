$(document).ready(function () {
    
    limparForm();
    carregarTodos();
    $("#notificacao").hide();

    $("#salvar").click(function () {
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
            var data = {
                nome: $("#nome").val(),
                preco: $("#preco").val(),
                descricao: $("#descricao").val()
            };
            var _id = $("#idProjeto").val();
            $.ajax({
                url: "http://localhost:8000/projeto/" + _id,
                type: "PUT",
                data: data,
                success: function (data, xhr) {
                    carregarTodos();
                    $(".alert").removeClass("alert-danger");
                    $(".alert").addClass("alert-success");
                    $("#msgNotificacao").text('Projeto salvo com sucesso');
                    $("#notificacao").show();
                }, error: function (data, xhr) {
                    carregarTodos();
                    $(".alert").addClass("alert-danger");
                    $(".alert").removeClass("alert-success");
                    $("#msgNotificacao").text('Erro ao salvar o projeto');
                    $("#notificacao").show();
                }
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
    $("#editarRegistro").hide();
}
function editarRegistro(_id, data) {
    $.get("http://localhost:8000/projeto/" + _id, function (data, status) {
        $("#idProjeto").val(_id);
        $("#nome").val(data.nome);
        $("#preco").val(data.preco);
        $("#descricao").val(data.descricao);
        $("#cadastrar").val('Salvar');

        $("#cancelar").show();
        $("#editarRegistro").show();
    });
}
function carregarTodos() {
    $("#tabela").empty();
    $.get("http://localhost:8000/projeto/todosProjetos", function (data, status) {
        for (i = 0; i < data.length; i++) {
            $("#tabela").append("<tr><td>" + data[i].nome + "</td><td>" + "R$ " + data[i].preco + "</td><td>" + data[i].descricao + "</td><td><button type='button' class='btn btn-primary' onclick='editarRegistro(&quot;" + data[i]._id + "&quot;)'>Editar</button></td><td><button type='button' class='btn btn-danger' onclick='deletarRegistro(&quot;" + data[i]._id + "&quot;)'>Deletar</button></td></tr>");
        }
    });
}
function deletarRegistro(_id) {
    $.ajax({
        url: "http://localhost:8000/projeto/" + _id,
        type: "DELETE",
        success: function (xhr) {
            carregarTodos();
            $(".alert").addClass("alert-danger");
            $(".alert").removeClass("alert-success");
            $("#msgNotificacao").text('Projeto excluído com sucesso');
            $("#notificacao").show();
        }
    });
}
