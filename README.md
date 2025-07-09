# 🎟️ Theophilos - Sistema de Rifas

**Theophilos** é uma aplicação fullstack para gerenciamento de rifas, desenvolvida com **NestJS** no backend e **React** no frontend. Ela permite que usuários se cadastrem, comprem rifas, gerenciem suas vendas e acompanhem o histórico, com um sistema robusto de autenticação, verificação de e-mail e controle de permissões.

---

## ⚙️ Tecnologias

### Backend (NestJS)

- ✅ NestJS (modular)
- ✅ Prisma ORM
- ✅ JWT Auth com Guards
- ✅ Envio de e-mails com Nodemailer e Handlebars
- ✅ Tokens temporários (confirmação de e-mail)
- ✅ Validações com `class-validator`

### Frontend (React)

- ✅ Vite
- ✅ TailwindCSS + shadcn/ui
- ✅ React Query
- ✅ Zod para validação
- ✅ Gerenciamento de estado leve (useState/useContext)
- ✅ Upload de comprovante com preview
- ✅ Integração com API segura

---

## 🧠 Funcionalidades

### Usuários

- Cadastro e login
- Verificação de e-mail com código enviado
- Reenvio de token de verificação
- Proteção de rotas por autenticação e permissão

### Rifas

- Criação e visualização de rifas
- Venda de números com controle automático de range
- Cartela interativa com status (disponível, reservado, pago)
- Preenchimento de dados do comprador e upload de comprovante

### Painel

- Tabs com abas para:
  - 🎫 Todas as Rifas
  - 🎫 Minhas Rifas
  - 📤 Solicitações (leader/admin)
  - 📈 Histórico (leader/admin)

---

## 📦 Instalação

### Backend

```bash
# Instalar dependências
cd backend
npm install

# Gerar prisma client
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Rodar a API
npm run start:dev
```

criar um `.env` no backend contendo esses dados:

```env
DATABASE_URL = ""
JWT_SECRET = ""

SMTP_HOST = ""
SMTP_PORT = ""
SMTP_USER = ""
SMTP_PASS = ""
MAIL_FROM = ""
```

### Frontend

```bash
#Instalar dependências
cd ../frontend/
npm install

# Rodar em modo dev
npm run dev
```

## 🛡️ Autenticação e Autorização

- Guards no NestJS controlam acesso a rotas.
- Roles: admin, leader, seller.
- Frontend mostra ou oculta recursos com base no user.role.

## 👨‍🏫 Desenvolvido por

- Danilo Humberto
- [LinkedIn](https://www.linkedin.com/in/danilo-humberto-28a771215?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para detalhes.
