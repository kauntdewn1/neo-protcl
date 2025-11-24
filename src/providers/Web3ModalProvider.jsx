import { WagmiProvider, createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { walletConnect, injected, coinbaseWallet } from "@web3modal/wagmi";

const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;
const hasProjectId = projectId && projectId !== "SEU_PROJECT_ID_WEB3MODAL" && projectId !== "your-web3modal-project-id-here";

const metadata = {
  name: "NΞØ Protocol",
  description: "NΞØ Protocol - Uma nova forma de existir em rede",
  url: "https://neoprotocol.eth",
  icons: ["/favicons/web-app-manifest-512x512.png"]
};

const chains = [base];

// Configuração básica do wagmi (sempre funciona)
const wagmiConfig = createConfig({
  chains,
  transports: {
    [base.id]: http()
  },
  connectors: hasProjectId
    ? [
        walletConnect({ projectId, metadata, showQrModal: true }),
        injected({ shimDisconnect: true }),
        coinbaseWallet({ appName: metadata.name, appLogoUrl: metadata.icons[0] })
      ]
    : [
        // Apenas injected wallet se não tiver Project ID
        injected({ shimDisconnect: true })
      ]
});

// Só inicializa Web3Modal se tiver Project ID válido
if (hasProjectId) {
  createWeb3Modal({
    wagmiConfig,
    projectId,
    enableAnalytics: false,
    enableOnramp: false,
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent": "#00eaff",
      "--w3m-background": "#000000",
      "--w3m-z-index": "9999"
    }
  });
}

export default function Web3ModalProvider({ children }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      {children}
      {/* Botão Web3Modal oculto para ser acionado programaticamente */}
      {hasProjectId && (
        <w3m-button 
          style={{ display: 'none' }} 
          balance="hide"
        />
      )}
    </WagmiProvider>
  );
}

