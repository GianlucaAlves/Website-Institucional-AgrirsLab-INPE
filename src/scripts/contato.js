botaoEnviar = document.getElementById("btn-enviar");
let formElement = document.getElementById("formulario-contato");
botaoEnviar.addEventListener("click", enviarFormulario);

function enviarFormulario(event) {
  console.log("Botão Clicado");
  event.preventDefault();

  let valorNome = document.getElementById("nome").value.trim();
  let valorEmail = document.getElementById("email").value.trim();
  let valorAssunto = document.getElementById("assunto").value;
  let valorMensagem = document.getElementById("mensagem").value;

  dadosDoFormulario = {
    caixaNome: valorNome,
    caixaEmail: valorEmail,
    caixaAssunto: valorAssunto,
    caixaMensagem: valorMensagem,
  };

  if (valorNome == "") {
    alert("Por favor, preencha o campo Nome.");
  } else if (valorEmail == "") {
    alert("Por favor, preencha o campo Email.");
  } else if (valorAssunto == false) {
    alert("Por favor, preencha o campo Assunto.");
  } else if (valorMensagem == false) {
    alert("Por favor, preencha o campo Mensagem.");
  } else {
    console.log("Dados: ", dadosDoFormulario);
    formElement.submit();
  }
}

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get("status") == "sucesso") {
  alert("Mensagem enviada com sucesso! Em breve te retornaremos");
}