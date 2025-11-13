import { useAccount } from "wagmi";

export const useUserWallet = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  return { address, isConnecting, isDisconnected };
};
