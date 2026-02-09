# 🚀 Guia Rápido: Preparar Projeto para Produção (Vercel)

## ⚡ O que Precisa Ser Feito

Para que o site funcione tanto localmente quanto no Vercel, é necessário substituir as URLs hardcoded (`http://localhost:3000`) por URLs dinâmicas.

## ✅ Solução Simples (Recomendada)

Foram criados arquivos de configuração global:
- `/src/scripts/api-config.js` - Para o website
- `/dashboard/dashboard_js/api-config.js` - Para o dashboard

### Como Usar

#### 1. Incluir o Script em Todas as Páginas HTML

**Para páginas do website (`pages/*.html` e `en-pages/*.html`):**

Adicione **ANTES** de qualquer outro script:
```html
<script src="/src/scripts/api-config.js"></script>
```

**Para páginas do dashboard (`dashboard/*.html`):**

Adicione **ANTES** de qualquer outro script:
```html
<script src="/dashboard/dashboard_js/api-config.js"></script>
```

#### 2. Atualizar os Arquivos JavaScript

Substitua todas as ocorrências de `http://localhost:3000` por `window.API_BASE_URL`.

**Exemplo:**

**ANTES:**
```javascript
const apiUrl = "http://localhost:3000/membros";
fetch("http://localhost:3000/posts?tipo=3")
```

**DEPOIS:**
```javascript
const apiUrl = `${window.API_BASE_URL}/membros`;
fetch(`${window.API_BASE_URL}/posts?tipo=3`)
```

#### 3. Atualizar o Form de Contato

Em `pages/contato.html`, trocar:

**ANTES:**
```html
<form action="http://localhost:3000/enviar" method="post">
```

**DEPOIS:**
```html
<form action="/enviar" method="post" id="formulario-contato">
```

## 📋 Lista de Arquivos a Serem Atualizados

### Website (src/scripts/)
- [ ] `ProjetosIndividual.js` - 2 ocorrências
- [ ] `serverVagaIndividual.js` - 1 ocorrência
- [ ] `serverProjetos.js` - 2 ocorrências
- [ ] `membros.js` - 2 ocorrências
- [ ] `servervagas.js` - 1 ocorrência
- [ ] `publicacoes.js` - 2 ocorrências
- [ ] `home.js` - 2 ocorrências
- [ ] `servernotindividual.js` - 2 ocorrências
- [ ] `servernoticias.js` - 1 ocorrência

### Dashboard (dashboard/dashboard_js/)
- [ ] `listar-membros.js` - 1 ocorrência
- [ ] `script.js` - 1 ocorrência
- [ ] `posts.js` - 1 ocorrência
- [ ] `editar-membro.js` - 1 ocorrência
- [ ] `criar-membros.js` - 2 ocorrências
- [ ] `listar-posts.js` - 1 ocorrência

### Páginas HTML
- [ ] `pages/contato.html` - 1 ocorrência (form action)
- [ ] Adicionar `<script src="/src/scripts/api-config.js"></script>` em todas páginas do website
- [ ] Adicionar `<script src="/dashboard/dashboard_js/api-config.js"></script>` em todas páginas do dashboard

## 🔍 Como Encontrar os Arquivos

Use o comando para listar todas as ocorrências:

```bash
# No diretório raiz do projeto
grep -rn "localhost:3000" src/scripts/ dashboard/dashboard_js/ pages/
```

## 🧪 Teste Local

Após fazer as alterações:

1. Inicie o backend:
```bash
cd backend
npm run dev
```

2. Abra o navegador em `http://localhost:3000/pages/home.html`

3. Abra o Console do navegador (F12) e verifique:
   - Deve aparecer: "API Base URL: http://localhost:3000"
   - Todas as requisições devem funcionar normalmente

## 🌐 Teste no Vercel

Após fazer o deploy:

1. Acesse a URL do Vercel
2. Abra o Console do navegador
3. Verifique:
   - Deve aparecer: "API Base URL: https://seu-site.vercel.app"
   - Todas as requisições devem ir para a URL do Vercel

## 💡 Exemplo Completo de Migração

### Arquivo: src/scripts/membros.js

**ANTES:**
```javascript
const API_URL = "http://localhost:3000/membros";

async function fetchMembros() {
    try {
        const response = await fetch(API_URL);
        // ...
        const imgUrl = `http://localhost:3000/uploads/${membro.imagem}`;
    }
}
```

**DEPOIS:**
```javascript
const API_URL = `${window.API_BASE_URL}/membros`;

async function fetchMembros() {
    try {
        const response = await fetch(API_URL);
        // ...
        const imgUrl = `${window.API_BASE_URL}/uploads/${membro.imagem}`;
    }
}
```

### Arquivo: pages/home.html

**ADICIONAR no início, após o `<head>`:**
```html
<head>
    <meta charset="UTF-8">
    <!-- ... outros meta tags ... -->
    <script src="/src/scripts/api-config.js"></script>
    <!-- Outros scripts vêm depois -->
</head>
```

## ⚠️ Avisos Importantes

1. **Ordem dos scripts:** O `api-config.js` deve ser carregado ANTES de qualquer script que use `window.API_BASE_URL`

2. **Barra no início:** URLs relativas devem começar com `/` (ex: `/enviar`, não `enviar`)

3. **Template literals:** Use crases `` ` `` e `${}` para interpolar variáveis:
   ```javascript
   `${window.API_BASE_URL}/membros`
   ```

4. **Console.log:** Sempre verifique o console para confirmar que `window.API_BASE_URL` está definido

## 🎯 Próximos Passos

1. [ ] Criar um script para fazer as substituições automaticamente (opcional)
2. [ ] Fazer as alterações manualmente seguindo esta lista
3. [ ] Testar localmente
4. [ ] Commitar e fazer push
5. [ ] Fazer deploy no Vercel
6. [ ] Testar em produção

## 📞 Precisa de Ajuda?

Se encontrar problemas:
1. Verifique o console do navegador (F12)
2. Verifique os logs do Vercel
3. Confirme que as variáveis de ambiente estão configuradas
4. Consulte o arquivo `DEPLOY_VERCEL.md` para mais detalhes

---

**Status:** ✅ Configuração criada  
**Próximo:** Atualizar os arquivos conforme a lista acima
