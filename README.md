# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🛒 Anime Shop

Loja virtual de animes desenvolvida com **React + Vite**, focada em uma interface moderna, performance e experiência do usuário. O projeto simula um e-commerce, onde é possível visualizar produtos, navegar entre páginas e futuramente incluir funcionalidades como carrinho e sistema de pagamento.

![Preview](https://via.placeholder.com/1000x400.png?text=Anime+Shop+Preview)

---

## 🚀 Tecnologias Utilizadas

- [React]
- [Vite]
- [Tailwind CSS]
- [React Router]
- [GitHub Pages]

---

## 📦 Instalação

Para rodar o projeto localmente:

```bash
# Clone o repositório
git clone https://github.com/theus-2005/Anime-Shop.git

# Acesse a pasta do projeto
cd Anime-Shop

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra o navegador e acesse:  
👉 `http://localhost:5173`

---

## 🌐 Deploy no GitHub Pages

Este projeto está publicado em:

🔗 [https://theus-2005.github.io/Anime-Shop]

Para publicar no GitHub Pages:

1. Instale o `gh-pages`:

```bash
npm install gh-pages --save-dev
```

2. Edite seu `package.json`:

```json
"homepage": "https://theus-2005.github.io/Anime-Shop",
"scripts": {
  "start": "vite",
  "build": "vite build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Faça o deploy:

```bash
npm run deploy
```

---

## 📁 Estrutura do Projeto

```
Anime-Shop/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── App.jsx
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧠 Aprendizados

Este projeto foi criado com o objetivo de praticar:

- Criação de interfaces com React
- Organização de componentes reutilizáveis
- Gerenciamento de rotas com React Router
- Estilização com Tailwind CSS
- Deploy gratuito com GitHub Pages

---

## 📌 Próximos Passos

- [ ] Adicionar sistema de carrinho
- [ ] Implementar login e autenticação
- [ ] Conectar com API de pagamento (ex: Stripe)
- [ ] Criar painel de administração (CRUD de produtos)
- [ ] Melhorar responsividade mobile

---

## 📄 Licença

Este projeto está sob a licença MIT.

Feito com 💙 por [Matheus Degrande Garcia]
