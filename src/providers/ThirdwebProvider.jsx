import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Base } from "@thirdweb-dev/chains";

export default function TWProvider({ children }) {
  return (
    <ThirdwebProvider
      activeChain={Base}
      clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID || "SEU_CLIENT_ID_THIRDWEB"}
    >
      {children}
    </ThirdwebProvider>
  );
}

