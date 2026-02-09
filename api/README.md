# API Serverless - Vercel

Esta pasta contém a configuração do backend como uma função serverless do Vercel.

## Estrutura

- `index.js` - Função principal que exporta a aplicação Express para o Vercel
- `package.json` - Configuração para usar ES Modules

## Como Funciona

O Vercel detecta automaticamente este arquivo através da configuração em `/vercel.json` e o executa como uma função serverless. Todas as rotas da API são processadas por esta função.

## Rotas Disponíveis

- `/api/*` - Autenticação e usuários
- `/dashboard/*` - Gestão do dashboard
- `/posts/*` - Gestão de posts/notícias
- `/membros/*` - Gestão de membros
- `/enviar` - Formulário de contato por e-mail
- `/uploads/*` - Arquivos enviados (imagens, etc.)

## Desenvolvimento Local

Para testar localmente, use o comando na raiz do projeto:

```bash
cd backend
npm run dev
```

O backend original em `backend/src/server.js` continua funcionando para desenvolvimento local.

## Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis no Vercel:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_TO`
- `JWT_SECRET`

Veja `.env.example` na raiz do projeto para mais detalhes.
