
# 📦 Barcode Toolkit (Frontend)

Projeto frontend React para interação com o backend de geração e decodificação de códigos de barras, suportando padrões populares como EAN-13, CODE 128, UPC e GS1-128. Interface simples para entrada de códigos, visualização dos resultados e imagens geradas.

## 🛠️ Tecnologias Utilizadas

- React 18 (com hooks)
- TypeScript
- Axios (para consumo da API)
- CSS moderno para estilo responsivo e acessível
- Vite (configuração de build e dev server)

## 🚀 Como Executar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seuusuario/barcode-toolkit-frontend.git
   cd barcode-toolkit-frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

> O aplicativo estará disponível em `http://localhost:5173` (ou porta configurada pelo Vite)

## 🔄 Funcionalidades

### 📥 Decodificar código de barras

- Insira o código de barras no campo de texto e clique em **Decodificar**.
- Visualize as informações decodificadas, como tipo, fabricante, produto e outros detalhes.
- Validação de entrada para garantir que o campo não esteja vazio.
- Tratamento amigável de erros retornados pelo backend.

### ▶️ Gerar código de barras

- Insira o valor desejado para gerar um código de barras e clique em **Gerar**.
- Visualize a imagem do código gerado (em base64) na tela com informações do tipo e valor.
- Mensagens de erro claras caso o código não seja válido para geração.

## ⚙️ Integração com API Backend

- O frontend consome a API REST no endpoint configurado via variável de ambiente `VITE_API_BASE_URL`.
- Exemplos de rotas usadas:
    - `GET /barcode/decode?barcode=VALOR`
    - `GET /barcode/generate?barcode=VALOR`
- Todas as chamadas são feitas usando Axios com timeout de 10 segundos e tratamento global de erros.

## 📘 Padrões de Código de Barras Suportados

- EAN-13
- EAN-8
- UPC-A
- UPC-E
- DUN-14
- CODE 128
- GS1-128

> O reconhecimento do tipo do código é automático conforme a resposta da API backend.

## 🧪 Rodando Testes (se aplicável)

Se testes forem implementados, rode com:

```bash
npm run test
# ou
yarn test
```

## 🎨 Estilos e Layout

- Interface responsiva e clean, com foco em usabilidade.
- Feedback visual para estados de erro e sucesso.
- Botões desabilitados quando o campo está vazio para evitar requisições inválidas.

---

## 🧠 Sobre

Este projeto frontend foi desenvolvido para oferecer uma interface simples e eficiente para o serviço de geração e decodificação de códigos de barras, facilitando testes e integração com sistemas que dependem dessa funcionalidade.

---
