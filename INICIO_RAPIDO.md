# ⚡ INÍCIO RÁPIDO - Deploy no Vercel

## Para Desenvolvedores com Pressa

### 1️⃣ O Que Fazer Agora

```bash
# 1. Fazer commit e push (já deve estar feito)
git add .
git commit -m "Configuração para Vercel"
git push origin main
```

### 2️⃣ Configurar no Vercel

1. Vá em [vercel.com](https://vercel.com)
2. Conecte seu GitHub
3. Importe este repositório
4. Configure as variáveis de ambiente (veja abaixo)
5. Clique em "Deploy"

### 3️⃣ Variáveis de Ambiente Obrigatórias

Copie e cole no Vercel Dashboard → Settings → Environment Variables:

```
DB_HOST=seu-postgres-host.com
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=agrirslab
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app-gmail
EMAIL_TO=destino@exemplo.com
JWT_SECRET=gere-uma-chave-forte-aqui
```

**⚠️ IMPORTANTE:** Não use as credenciais de desenvolvimento em produção!

### 4️⃣ Configurar Banco de Dados

Escolha UMA opção:

**Opção A - Vercel Postgres (Mais Fácil)**
- No Vercel: Storage → Create Database → Postgres
- Variáveis configuradas automaticamente ✅

**Opção B - Neon (Gratuito)**
- Vá em [neon.tech](https://neon.tech)
- Crie conta e projeto
- Copie credenciais para Vercel

**Opção C - Supabase (Gratuito)**
- Vá em [supabase.com](https://supabase.com)
- Crie projeto
- Settings → Database → Copie credenciais

### 5️⃣ Testar

Após deploy:
```
https://seu-site.vercel.app/          → Website
https://seu-site.vercel.app/api       → API (deve retornar {"status": "backend ok"})
https://seu-site.vercel.app/dashboard/login.html → Dashboard
```

---

## 🚨 Problemas Comuns

### "Database connection failed"
→ Verifique variáveis de ambiente  
→ Certifique-se que DB aceita conexões externas  
→ Use Vercel Postgres para facilitar

### "Function timeout"
→ Normal no primeiro acesso (cold start)  
→ Se persistir, otimize queries do banco

### "404 Not Found" nas páginas
→ Verifique se `vercel.json` está na raiz  
→ Verifique se os caminhos estão corretos

### Formulário não envia e-mail
→ Use "Senha de App" do Gmail, não senha normal  
→ Google → Segurança → Verificação em 2 etapas → Senhas de app

---

## 📖 Documentação Completa

**Para configuração detalhada:**
- [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md) - Guia completo
- [PREPARAR_PRODUCAO.md](PREPARAR_PRODUCAO.md) - Preparar URLs
- [RESUMO_CONFIGURACAO.md](RESUMO_CONFIGURACAO.md) - Visão geral

**Não leu ainda?** Comece com `RESUMO_CONFIGURACAO.md`

---

## ✅ Checklist Pós-Deploy

Após fazer o deploy, verifique:

- [ ] Site abre na URL do Vercel
- [ ] Páginas em português funcionam
- [ ] Páginas em inglês funcionam
- [ ] Dashboard abre
- [ ] Login funciona (se tiver usuários no BD)
- [ ] API responde em `/api`
- [ ] Formulário de contato funciona

---

## 🎯 Próximos Passos (Opcional)

Para melhor experiência em produção:

1. **Atualizar URLs nos arquivos JS** (16 arquivos)
   - Substituir `http://localhost:3000` por `window.API_BASE_URL`
   - Ver guia em [PREPARAR_PRODUCAO.md](PREPARAR_PRODUCAO.md)

2. **Configurar Domínio Próprio**
   - Vercel → Settings → Domains
   - Adicionar seu domínio customizado

3. **Restringir CORS**
   - Editar `api/index.js`
   - Trocar `app.use(cors())` por `app.use(cors({ origin: 'https://seu-dominio.com' }))`

4. **Monitorar**
   - Vercel Dashboard → Analytics
   - Vercel Dashboard → Logs

---

## 💡 Dica Pro

**Deploy Automático:**  
Sempre que fizer `git push`, o Vercel faz deploy automaticamente! 🚀

**Preview Deployments:**  
Branches diferentes de `main` criam preview URLs para teste

---

## 📞 Ajuda

- 📖 Documentação completa: Ver arquivos `.md` na raiz
- 🐛 Problemas: Abrir issue no GitHub
- 👥 Equipe: Contatar NightHawks

---

**Status:** ✅ Pronto para Deploy  
**Tempo estimado:** 15-30 minutos (incluindo configuração de DB)  
**Última atualização:** Fevereiro 2026
