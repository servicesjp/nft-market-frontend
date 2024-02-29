import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
  useSignMessage
} from "wagmi";
import { fetchBalance } from '@wagmi/core'
import { Bytes } from "ethers";
import React, { createContext } from "react";
interface IWalletContext {
  connect: any;
  disconnect: any;
  connectAsync: any;
  isConnected: any;
  connectors: any;
  address: any;
  pendingConnector: any;
  isLoading: any;
  chain: any;
  signer: any,
  chains: any
  switchNetwork: any;
  fetchBalance: any;
  signMessage?: (message: string | Bytes) => Promise<string>;
}

export const WalletConnectContext = createContext<IWalletContext>({} as IWalletContext);

function WalletConnectProvider({ children }: any) {
  const { chain, chains } = useNetwork();

  const { address, isConnected } = useAccount()
  const { connect, connectAsync, connectors, isLoading, pendingConnector } = useConnect();
  
  const { switchNetworkAsync } = useSwitchNetwork();
  const { disconnect } = useDisconnect();
  const { data: signer } = useSignMessage();

 
  return (
        <WalletConnectContext.Provider
          value={{
            connect: connect,
            disconnect: disconnect,
            connectAsync: connectAsync,
            isConnected: isConnected,
            connectors: connectors,
            address: address?.toLowerCase(),
            pendingConnector: pendingConnector,
            isLoading: isLoading,
            chain: chain,
            signer: signer,
            chains: chains,
            fetchBalance: fetchBalance,
            switchNetwork: switchNetworkAsync,
          }}
        >
          {children}
        </WalletConnectContext.Provider>
      );
}

export default WalletConnectProvider;