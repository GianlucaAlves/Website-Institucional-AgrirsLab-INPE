# Guia de Deploy no Vercel - AgriRS Lab INPE

Este documento descreve como fazer o deploy do projeto Website Institucional AgriRS Lab no Vercel.

## 📋 Visão Geral

O projeto consiste em três componentes principais:
1. **Website Principal** - Páginas HTML estáticas (português e inglês)
2. **Dashboard** - Interface administrativa para gerenciar conteúdo
3. **Backend API** - API RESTful com Express.js e PostgreSQL

## 🚀 Passo a Passo para Deploy no Vercel

### 1. Preparar o Repositório

Certifique-se de que todas as alterações estão commitadas no GitHub:

```bash
git add .
git commit -m "Preparar projeto para deploy no Vercel"
git push origin main
```

### 2. Criar Conta no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Conecte com sua conta do GitHub

### 3. Importar Projeto

1. No dashboard do Vercel, clique em "Add New..." → "Project"
2. Selecione o repositório `Website-Institucional-AgrirsLab-INPE`
3. Clique em "Import"

### 4. Configurar Variáveis de Ambiente

Na página de configuração do projeto, adicione as seguintes variáveis de ambiente:

#### Variáveis do Banco de Dados (PostgreSQL)
```
DB_HOST=seu-host-postgres.com
DB_PORT=5432
DB_USER=seu-usuario
DB_PASSWORD=sua-senha
DB_NAME=agrirslab
```

#### Variáveis de E-mail (Nodemailer)
```
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
EMAIL_TO=email-destino@exemplo.com
```

#### Variáveis de Autenticação (JWT)
```
JWT_SECRET=sua-chave-secreta-jwt-aqui
```

**Importante:** Para o Gmail, você precisa usar uma "Senha de App", não sua senha normal:
1. Acesse sua conta Google
2. Vá em Segurança → Verificação em duas etapas
3. Role até "Senhas de app" e gere uma nova senha

### 5. Configurar Banco de Dados PostgreSQL

O Vercel não hospeda bancos de dados diretamente. Você tem algumas opções:

#### Opção A: Vercel Postgres (Recomendado)
1. No dashboard do Vercel, vá em Storage → Create Database
2. Selecione "Postgres"
3. As variáveis de ambiente serão configuradas automaticamente

#### Opção B: Neon (Gratuito)
1. Acesse [neon.tech](https://neon.tech)
2. Crie uma conta e um novo projeto
3. Copie a connection string
4. Adicione como variável de ambiente no Vercel

#### Opção C: Supabase (Gratuito)
1. Acesse [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Vá em Settings → Database
4. Copie as credenciais de conexão
5. Adicione como variáveis de ambiente no Vercel

### 6. Configurações de Build

O Vercel detectará automaticamente as configurações através do arquivo `vercel.json`:

- **Framework Preset:** Other
- **Build Command:** (deixe em branco)
- **Output Directory:** (deixe em branco)
- **Install Command:** `npm install`

### 7. Deploy

1. Clique em "Deploy"
2. Aguarde o processo de build e deploy
3. Após conclusão, você receberá uma URL (ex: `seu-projeto.vercel.app`)

### 8. Configurar Domínio Customizado (Opcional)

1. No dashboard do projeto, vá em Settings → Domains
2. Adicione seu domínio customizado
3. Configure os registros DNS conforme instruído

## 🔧 Estrutura do Projeto no Vercel

```
/
├── api/                    # Serverless functions (Backend)
│   └── index.js           # Função principal da API
├── pages/                 # Website principal (PT)
├── en-pages/              # Website em inglês
├── dashboard/             # Dashboard administrativo
├── backend/               # Código fonte do backend
│   └── src/
│       ├── routes/        # Rotas da API
│       ├── controllers/   # Controladores
│       ├── models/        # Modelos de dados
│       └── db/            # Configuração do banco
└── vercel.json           # Configuração do Vercel
```

## 🌐 Rotas Configuradas

### API Routes
- `/api/*` - Rotas de autenticação e usuários
- `/dashboard/*` - Rotas do dashboard
- `/posts/*` - Rotas de posts/notícias
- `/membros/*` - Rotas de membros da equipe
- `/enviar` - Formulário de contato

### Static Routes
- `/` - Redireciona para `/pages/home.html`
- `/pages/*.html` - Páginas em português
- `/en-pages/*.html` - Páginas em inglês
- `/dashboard/*.html` - Dashboard administrativo
- `/src/*` - Assets estáticos (CSS, JS, imagens)

## 📝 Após o Deploy

### Testar o Website
1. Acesse a URL fornecida pelo Vercel
2. Navegue pelas páginas principais
3. Teste o formulário de contato

### Testar o Dashboard
1. Acesse `sua-url.vercel.app/dashboard/login.html`
2. Faça login com suas credenciais
3. Verifique se consegue gerenciar conteúdo

### Testar a API
1. Acesse `sua-url.vercel.app/api` (deve retornar `{"status": "backend ok"}`)
2. Teste endpoints específicos conforme necessário

## 🔐 Segurança

### Variáveis de Ambiente Sensíveis
- **NUNCA** commite arquivos `.env` no repositório
- Use sempre variáveis de ambiente no Vercel Dashboard
- Gere chaves JWT fortes e únicas

### CORS
O CORS está configurado no arquivo `api/index.js` para aceitar requisições de qualquer origem durante o desenvolvimento. **Em produção, você DEVE restringir para seu domínio específico:**

```javascript
// Em api/index.js, substituir:
app.use(cors());

// Por:
app.use(cors({
  origin: 'https://seu-dominio.vercel.app'
}));
```

Ou use variável de ambiente:

```javascript
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*'
}));
```

E configure `ALLOWED_ORIGIN` no Vercel Dashboard.

## 🐛 Troubleshooting

### Erro: "Module not found"
- Verifique se todas as dependências estão no `package.json` raiz
- Execute `npm install` localmente para garantir que tudo funciona

### Erro: "Database connection failed"
- Verifique as variáveis de ambiente do banco de dados
- Teste a conexão com o banco externamente
- Certifique-se que o banco aceita conexões externas

### Erro: "Function timeout"
- Funções serverless do Vercel têm limite de 10s (plano gratuito)
- Otimize queries do banco de dados
- Considere upgrade do plano se necessário

### Página 404 ao acessar rotas
- Verifique o arquivo `vercel.json`
- Certifique-se que os caminhos dos arquivos estão corretos

## 📊 Monitoramento

1. Acesse o dashboard do Vercel
2. Vá em Analytics para ver métricas de acesso
3. Vá em Logs para ver logs das functions
4. Configure alertas conforme necessário

## 🔄 Atualizações

O Vercel faz deploy automático sempre que você faz push para a branch `main`:

```bash
git add .
git commit -m "Atualizar conteúdo"
git push origin main
```

O Vercel detectará o push e iniciará um novo deploy automaticamente.

## 💡 Dicas Importantes

1. **Teste localmente primeiro**: Sempre teste mudanças localmente antes de fazer deploy
2. **Use preview deploys**: Branches diferentes da main criam preview deployments
3. **Monitore custos**: O plano gratuito tem limites de execução e bandwidth
4. **Backups**: Faça backups regulares do banco de dados
5. **SSL automático**: O Vercel fornece SSL/HTTPS automaticamente

## 📞 Suporte

- Documentação Vercel: https://vercel.com/docs
- GitHub Issues: Abra uma issue no repositório
- Equipe NightHawks: Contate os desenvolvedores

---

**Última atualização:** Fevereiro 2026
**Versão:** 1.0
