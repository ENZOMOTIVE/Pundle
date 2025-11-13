
import { ConnectKitButton } from "connectkit";

import { useAccount, useEnsAvatar } from "wagmi";
import { Button } from "@/components/retroui/Button";
import MyCustomAvatar from "./Avatar";


export const CustomConnectWalletButton: React.FC = () => {

  const { address, isConnected } = useAccount();
  const { data: avatarUrl } = useEnsAvatar({ name: address });

    return(
            <ConnectKitButton.Custom>

 {({ show, truncatedAddress, ensName }) => (
        <Button
          onClick={show}
          className="bg-yellow-400 font-semibold rounded-xl hover:bg-yellow-500 flex items-center gap-3 px-6 py-3"
        >
          {isConnected && (
            <MyCustomAvatar
              ensImage={avatarUrl ?? undefined}
              ensName={ensName}
              size={29}
              radius={9999}
            />
          )}
          {isConnected
            ? ensName || truncatedAddress || "Connected"
            : "Connect Wallet"}
        </Button>
      )}
            </ConnectKitButton.Custom>

    )
}