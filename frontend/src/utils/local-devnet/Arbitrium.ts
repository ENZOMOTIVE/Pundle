import { defineChain } from "viem";

export const arbitrumLocal = defineChain({
  id: 412346, // ⭐ use the chain ID your Nitro devnet prints
  name: "Arbitrum Local Devnet",
  network: "arbitrum-local",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ["http://localhost:8548"] },
    default: { http: ["http://localhost:8548"] },
  },
});
