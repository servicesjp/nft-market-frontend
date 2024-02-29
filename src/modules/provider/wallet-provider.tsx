"use client";

import { createContext } from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, sepolia, bsc, Chain, polygon } from "@wagmi/core/chains";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { EIP6963Connector } from "@web3modal/wagmi";
import WalletConnectProvider from "@/modules/provider/wallet-connect-provider";
import { RPC_PROVIDER } from "@/constants/env";
const projectId = "31df8043c259a624ff82a3b3c4d6e41e";

export const { chains, publicClient } = configureChains(
  [polygon, mainnet, sepolia, bsc],
  [
    jsonRpcProvider({
      rpc: (chain: Chain) => {
        return { http: `${RPC_PROVIDER[chain?.id]}` };
      },
    }),
  ],
  { pollingInterval: 10_000 }
);

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false, metadata },
    }),
    new EIP6963Connector({ chains }),
  ],
  publicClient,
});
createWeb3Modal({ wagmiConfig, projectId, chains });

export const WalletContext = createContext<any>({});

function WalletProvider({ children }: any) {
  return (
    <WalletContext.Provider value={{} as any}>
      <WagmiConfig config={wagmiConfig}>
        <WalletConnectProvider>{children}</WalletConnectProvider>
      </WagmiConfig>
    </WalletContext.Provider>
  );
}

export default WalletProvider;
