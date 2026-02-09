// api/index.js - Vercel Serverless Function
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";

import userRoutes from "../backend/src/routes/userRoutes.js";
import dashboardRoutes from "../backend/src/routes/dashboardRoutes.js";
import postsRoutes from "../backend/src/routes/postsRoutes.js";
import membrosRoutes from "../backend/src/routes/membrosRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

// Configuração para __dirname funcionar com "import" (ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// CORS Configuration
// IMPORTANT: In production, restrict CORS to your specific domain
// Example: app.use(cors({ origin: 'https://your-domain.vercel.app' }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get("/", (req, res) => {
  res.json({ status: "backend ok" });
});

// Rotas do seu projeto (Banco de Dados)
app.use("/api", userRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/posts", postsRoutes);
app.use("/membros", membrosRoutes);

// Pasta de uploads pública
app.use("/uploads", express.static(path.join(__dirname, "../backend/src/uploads")));

// Configuração do Carteiro (Transporter)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// A Rota /enviar
app.post("/enviar", (req, res) => {
  console.log("Dados recebidos do formulário de contato:");
  console.log(req.body);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    replyTo: req.body.email,
    subject: `Nova mensagem do site: ${req.body.assunto}`,
    text: `
      Você recebeu uma nova mensagem de:
      Nome: ${req.body.nome}
      Email: ${req.body.email}

      Assunto: ${req.body.assunto}

      Mensagem:
      ${req.body.mensagem}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("ERRO AO ENVIAR E-MAIL:", error);
      res.redirect("/pages/contato.html?status=erro");
    } else {
      console.log("E-mail enviado com sucesso! " + info.response);
      res.redirect("/pages/contato.html?status=sucesso");
    }
  });
});

// Para Vercel serverless functions
export default app;
