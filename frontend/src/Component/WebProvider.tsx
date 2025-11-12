
import { type ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { arbitrumSepolia, goerli } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import MyCustomAvatar from "./ConnectKit/Avatar";





const config = createConfig(
  getDefaultConfig({
    chains: [arbitrumSepolia, goerli],
    transports: {
      [arbitrumSepolia.id]: http("https://arbitrum-sepolia.api.onfinality.io/public"),

      [goerli.id]: http("https://goerli.rpc.url"),


    },
    walletConnectProjectId: "67aab9c3509f2859dcc259e3096b9f91",
    appName: "Pundle"

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
            {
              customAvatar: MyCustomAvatar,



              disclaimer: (
                <>
                  By connecting your wallet you agree to the{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://en.wikipedia.org/wiki/Terms_of_service"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://en.wikipedia.org/wiki/Privacy_policy"
                  >
                    Privacy Policy
                  </a>
                </>
              )

            }

          }
        > {children}

        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
