# 📚 Manga Store - E-commerce de Mangás

Um projeto de e-commerce responsivo desenvolvido para apresentação acadêmica, focado no gerenciamento de um carrinho de compras funcional com persistência de dados no navegador.

---

## 🚀 Funcionalidades

- **Catálogo de destaques:** Exebição dos mangás em destaques.
- **Catálogo de Produtos:** Exibição de mangás com imagens, títulos, autores e preços.
- **Carrinho Dinâmico:** Adição de itens ao carrinho diretamente da página principal.
- **Persistência com LocalStorage:** Os itens do carrinho permanecem salvos mesmo ao fechar ou atualizar o navegador.
- **Gerenciamento de Itens:**
  - Alteração da quantidade de cada produto com atualização automática do subtotal.
  - Remoção individual de itens da lista.
  - Cálculo em tempo real do valor total e quantidade geral de produtos.
- **Layout Responsivo:** Interface construída em Flexbox para melhor adaptação visual.

---

## 🛠️ Tecnologias Utilizadas 

- **HTML5:** Estruturação semântica das páginas (`index.html`, `todos.html`, `novidades.html` e `carrinho.html`).
- **CSS3:** Estilização personalizada, temas escuros/alaranjados e layout com Flexbox.
- **JavaScript (ES6):** Manipulação de DOM, consumo e gravação de dados via `localStorage`.

---

## 📂 Estrutura do Projeto

```text
├── CSS/
│   └── styles.css      # Estilização global e layouts
├── IMG/                # Capas dos mangás e ícones
├── index.html          # Página principal da loja
├── todos.html          # Página com todos mangás da loja
├── novidades.html      # Página com as novidades da loja
├── carrinho.html       # Página de visualização do carrinho
├── index.js            # Lógica do catálogo e do localStorage
└── README.md           # Documentação do projeto