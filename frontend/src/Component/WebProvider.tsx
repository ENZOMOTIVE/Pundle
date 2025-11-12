
import { type ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { arbitrumSepolia, goerli, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import MyCustomAvatar from "./ConnectKit/Avatar";




const config = createConfig(
  getDefaultConfig({
    chains: [arbitrumSepolia,sepolia,goerli],
    transports:  {
      [arbitrumSepolia.id]: http("https://arb-sepolia.blockpi.network/v1/rpc/public"),
      [sepolia.id]: http("https://sepolia.rpc.url"),
      [goerli.id]: http("https://goerli.rpc.url"),

    },
    walletConnectProjectId: "67aab9c3509f2859dcc259e3096b9f91",
    appName: "Pundle",
    appDescription: "Your App Description",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",
  })
);

const queryClient = new QueryClient();


interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider 
        theme="retro"
        options={
            {customAvatar: MyCustomAvatar}
        }
        >{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
