# NΞØ Protocol - WebApp + PWA + MCP

WebApp oficial do Protocolo NΞØ com integração Web3 nativa, PWA compatível com iOS e preparado para MCP (Model Context Protocol).

## 🌐 ENS Domain

**neoprotocol.eth**

## 🚀 Tecnologias

- **React 18** + **Vite** - Framework e build tool
- **Web3Modal** + **wagmi** + **viem** - Integração Web3 (MCP-friendly)
- **Thirdweb** (opcional) - SDK para contratos e mint
- **React Router** - Roteamento
- **Tailwind CSS** - Estilização
- **PWA** - Progressive Web App com suporte iOS

## 📦 Instalação

```bash
npm install
```

## ⚙️ Configuração

### 1. Criar arquivo .env

**IMPORTANTE**: Você precisa criar o arquivo `.env` antes de executar o projeto:

```bash
cp .env.example .env
```

### 2. Web3Modal (Obrigatório)

O `VITE_WEB3MODAL_PROJECT_ID` é **OBRIGATÓRIO** para funcionalidade completa de wallet. O app funciona em **modo preview** sem ele, mas com funcionalidades limitadas.

1. Acesse [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Crie uma conta ou faça login
3. Crie um novo projeto
4. Copie o **Project ID**
5. Cole no arquivo `.env`:

```env
VITE_WEB3MODAL_PROJECT_ID=seu-project-id-aqui
```

### 3. Thirdweb (Opcional)

O `VITE_THIRDWEB_CLIENT_ID` é **OPCIONAL** (só necessário se usar Thirdweb para contratos).

1. Acesse [thirdweb.com](https://thirdweb.com)
2. Crie uma conta ou faça login
3. Vá em **Settings > API Keys**
4. Crie um novo **Client ID**
5. **Configure "Allowed Domains"** com:
   - `localhost`
   - `localhost:5173`
   - `neo-protcl.vercel.app` (domínio gerado automaticamente pela Vercel)
   - `*.vercel.app` (cobre todos os previews e branches)
   - `neoprotocol.eth` (se usar ENS)
6. Cole o Client ID no arquivo `.env`:

```env
VITE_THIRDWEB_CLIENT_ID=seu-client-id-aqui
```

> 📖 Veja `docs/THIRDWEB_SETUP.md` para guia completo de configuração de Allowed Domains

### 4. Verificar configuração

Após criar o `.env`, verifique se as variáveis estão corretas:

```bash
cat .env
```

**Nota**: O arquivo `.env` não deve ser commitado no git (já está no `.gitignore`).

## 🏃 Executar

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
neo-protocol-webapp/
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── logos/
│   ├── components/
│   │   ├── WalletConnect/
│   │   │   └── ConnectButton.jsx
│   │   ├── Layout/
│   │   │   └── MainLayout.jsx
│   │   └── UI/
│   │       └── Button.jsx
│   ├── context/
│   │   ├── web3/
│   │   │   └── index.js
│   │   └── mcp/
│   │       └── index.js
│   ├── hooks/
│   │   └── useMCP.js
│   ├── pages/
│   │   ├── home/
│   │   │   └── NeoProtocol.jsx
│   │   ├── manifesto/
│   │   ├── settings/
│   │   └── mcp-console.jsx
│   ├── providers/
│   │   ├── Web3ModalProvider.jsx
│   │   └── ThirdwebProvider.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   ├── manifest.json
│   ├── service-worker.js
│   ├── icon-192.png
│   ├── icon-512.png
│   └── logos/
│       ├── neo_ico.png
│       └── neowhite.png
└── package.json
```

## 🎨 Estilos NΞØ

### Terminal Green Mode
```css
.terminal {
  background: #000;
  color: #00ff66;
  font-family: "Courier New", monospace;
  text-shadow: 0 0 6px #00ff66;
}
```

### Neon Mode
- **Azul neon**: `.neon-blue`
- **Purple shift**: `.neon-purple`
- **Neon text**: `.neon-text`
- **Neon dot**: `.neon-dot`

## 📱 PWA (iOS-ready)

O projeto está configurado como PWA completo:

- ✅ Manifest.json configurado
- ✅ Service Worker para cache offline
- ✅ Meta tags iOS (standalone mode)
- ✅ Ícones para home screen

### Ícones PWA

Os ícones PWA já estão configurados em `public/favicons/`:

- `web-app-manifest-192x192.png` (192x192px) ✅
- `web-app-manifest-512x512.png` (512x512px) ✅

### Splash Screens iOS (opcional)

Para splash screens personalizados, coloque em `public/splash/`:

- `iphone-se.png` (640x1136px)
- `iphone-8.png` (750x1334px)
- `iphone-x.png` (1125x2436px)
- `iphone-12.png` (1170x2532px)
- `iphone-14-pro.png` (1179x2556px)
- `iphone-15-pro-max.png` (1290x2796px)

Veja `public/splash/README.md` para especificações completas.

## 🔌 Web3Modal vs Thirdweb

- **Web3Modal**: Usado para login/wallet connect (UI/UX superior)
- **Thirdweb**: Opcional, útil para contratos, mint, SDK

O projeto usa **Web3Modal** como provider principal. Para usar Thirdweb também, descomente no `main.jsx`:

```jsx
import TWProvider from './providers/ThirdwebProvider';

<TWProvider>
  <Web3ModalProvider>
    <App />
  </Web3ModalProvider>
</TWProvider>
```

## 🧠 MCP (Model Context Protocol)

Estrutura MCP implementada:

- `/src/context/mcp/index.js` - Router e lógica de persistência
- `/src/hooks/useMCP.js` - Hook para usar MCP
- `/src/pages/mcp-console.jsx` - Console de debug

Acesse em: `http://localhost:5173/mcp`

## 🎯 Rotas

- `/` - Página principal (NeoProtocol)
- `/neo-protocol` - Página principal (alias)
- `/mcp` - Console MCP

## 🌐 Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

### Deploy

Pronto para deploy em:

- **Vercel**: 
  - Conecte o repositório: [kauntdewn1/neo-protcl](https://github.com/kauntdewn1/neo-protcl.git)
  - Domínio gerado automaticamente: `neo-protcl.vercel.app` ou `neo-protcl-kauntdewn1.vercel.app`
  - Ou use: `vercel --prod`
- **Netlify**: Arraste a pasta `dist/` ou conecte o repositório

**Importante**: Após fazer deploy na Vercel, adicione o domínio `neo-protcl.vercel.app` e `*.vercel.app` nas "Allowed Domains" do Thirdweb (se estiver usando).

## 📝 Assets Necessários

### Logos (obrigatórios)

- `public/logos/neo_ico.png` - Logo principal (128x128px ou 256x256px)
- `public/logos/neowhite.png` - Logo branco footer (80px largura)
- Veja `public/logos/README.md` para detalhes

### Favicons

- `public/favicons/favicon.ico` - Favicon principal (multi-size)
- `public/favicons/favicon-16x16.png` - 16x16px
- `public/favicons/favicon-32x32.png` - 32x32px
- `public/favicons/apple-touch-icon.png` - 180x180px (iOS)
- Veja `public/favicons/README.md` para detalhes

### PWA Icons
- `public/favicons/web-app-manifest-192x192.png` - 192x192px (usado no manifest)
- `public/favicons/web-app-manifest-512x512.png` - 512x512px (usado no manifest)
- **Nota**: Os ícones PWA estão em `public/favicons/` e são referenciados no `manifest.json` e `vite.config.js`

### Images (opcional)
- `public/images/hero/` - Imagens da seção hero
- `public/images/sections/` - Imagens das seções
- `public/images/backgrounds/` - Imagens de fundo
- `public/images/illustrations/` - Ilustrações e gráficos
- Veja `public/images/README.md` para detalhes

## ⚠️ Notas Importantes

- **Não alterar textos do manifesto** - Mantidos conforme especificação
- **Identidade visual NΞØ preservada** - Cores e estilos conforme padrão
- **Web3Modal como provider principal** - Melhor compatibilidade com MCP
- **PWA full configurado** - Pronto para iOS standalone mode
- **Modo Preview** - O app funciona sem chaves para visualização do frontend
- **Mobile-First** - Design 100% otimizado para mobile com estilo iOS

## 🔗 Links Úteis

- [Web3Modal Docs](https://docs.walletconnect.com/web3modal)
- [wagmi Docs](https://wagmi.sh)
- [Thirdweb Docs](https://portal.thirdweb.com)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
