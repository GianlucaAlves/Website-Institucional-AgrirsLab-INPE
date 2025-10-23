const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Servidor do Gmail
  port: 587,
  secure: false, // `true` para porta 465, `false` para outras
  auth: {
    user: "ceconlucasferreira@gmail.com", // Seu e-mail
    pass: "spmz sbzr hipa vsvh", // Sua senha de app
  },
});


const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../../")));

//Middleware "tradutor" para entender os dados do formulário
app.use(express.urlencoded({ extended: true }));



//Rota para receber os dados do formulário
app.post("/enviar", (req, res) => {
  // Por enquanto, vamos apenas mostrar os dados recebidos no console do servidor
  console.log("Dados recebidos do formulário:");
  console.log(req.body);

  const mailOptions = {
    from: "ceconlucasferreira@gmail.com", // Seu e-mail (quem envia)
    to: "playcecon@gmail.com", // Para quem você quer enviar
    replyTo: req.body.email, // Para quem a resposta vai
    subject: `Nova mensagem do site: ${req.body.assunto}`, // Assunto usando dados do form
    text: `
    Você recebeu uma nova mensagem de:
    Nome: ${req.body.nome}
    Email: ${req.body.email}

    Mensagem:
    ${req.body.mensagem}
  `, // Corpo do e-mail bem formatado
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("ERRO AO ENVIAR E-MAIL:", error);
      res.send(
        "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde."
      );
    } else {
      console.log(
        "E-mail enviado com sucesso! Resposta do servidor: " + info.response
      );
      res.redirect("/pages/contato.html?status=sucesso");
    }
  });

});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});
