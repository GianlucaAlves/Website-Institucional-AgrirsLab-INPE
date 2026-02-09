const botaoEnviar = document.getElementById("btn-enviar");
const formElement = document.getElementById("formulario-contato");
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
    enviarContato();
  }
}

async function enviarContato() {
  try {
    const payload = new URLSearchParams();
    payload.append("nome", document.getElementById("nome").value.trim());
    payload.append("email", document.getElementById("email").value.trim());
    payload.append("assunto", document.getElementById("assunto").value);
    payload.append("mensagem", document.getElementById("mensagem").value);

    const res = await fetch(`${window.API_BASE_URL}/enviar`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: payload.toString(),
    });

    if (!res.ok) {
      window.location.href = `${window.location.pathname}?status=erro`;
      return;
    }

    window.location.href = `${window.location.pathname}?status=sucesso`;
  } catch (err) {
    console.error("Erro ao enviar contato:", err);
    window.location.href = `${window.location.pathname}?status=erro`;
  }
}

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get("status") == "sucesso") {
  alert("Mensagem enviada com sucesso! Em breve te retornaremos");
} else if (urlParams.get("status") == "erro") {
  alert("Nao foi possivel enviar sua mensagem. Tente novamente.");
}
