function buscarCEP() {
  var cep = document.getElementById("campoCep").value;
  var resultado = document.getElementById("resultadoCep");

  fetch("https://brasilapi.com.br/api/cep/v2/" + cep)
    .then(function(resposta) {
      return resposta.json();
    })
    .then(function(dados) {
      resultado.innerHTML =
        "<p>CEP: " + dados.cep + "</p>" +
        "<p>Rua: " + dados.street + "</p>" +
        "<p>Bairro: " + dados.neighborhood + "</p>" +
        "<p>Cidade: " + dados.city + "</p>" +
        "<p>Estado: " + dados.state + "</p>";
    })
    .catch(function(erro) {
      resultado.innerHTML = "<p>CEP não encontrado.</p>";
    });
}

function buscarCNPJ() {
  var cnpj = document.getElementById("campoCnpj").value;
  var resultado = document.getElementById("resultadoCnpj");

  fetch("https://brasilapi.com.br/api/cnpj/v1/" + cnpj)
    .then(function(resposta) {
      return resposta.json();
    })
    .then(function(dados) {
      resultado.innerHTML =
        "<p>Razão Social: " + dados.razao_social + "</p>" +
        "<p>Nome Fantasia: " + dados.nome_fantasia + "</p>" +
        "<p>Situação: " + dados.descricao_situacao_cadastral + "</p>" +
        "<p>Cidade: " + dados.municipio + "</p>" +
        "<p>Estado: " + dados.uf + "</p>";
    })
    .catch(function(erro) {
      resultado.innerHTML = "<p>CNPJ não encontrado.</p>";
    });
}

function buscarFeriados() {
  var ano = document.getElementById("campoAno").value;
  var resultado = document.getElementById("resultadoFeriados");

  fetch("https://brasilapi.com.br/api/feriados/v1/" + ano)
    .then(function(resposta) {
      return resposta.json();
    })
    .then(function(dados) {
      var lista = "<ul>";
      for (var i = 0; i < dados.length; i++) {
        lista += "<li>" + dados[i].date + " - " + dados[i].name + "</li>";
      }
      lista += "</ul>";
      resultado.innerHTML = lista;
    })
    .catch(function(erro) {
      resultado.innerHTML = "<p>Ano não encontrado.</p>";
    });
}
