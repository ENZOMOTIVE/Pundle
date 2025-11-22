import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { useState } from "react";
import { ethers } from "ethers";
import { blockschules_contract_abi, blockschules_contract_address } from "@/contract-abi/BlockSchules-contract";

export default function BuyProtectionDialog() {
  // Default safe values
  const [collateralPrice, setCollateralPrice] = useState<string>("2000"); // USD
  const [strikePrice, setStrikePrice] = useState<string>("2000");         // USD
  const [expiryDays, setExpiryDays] = useState<string>("30");             // days
  const [txStatus, setTxStatus] = useState<string>("");

  const handleBuyProtection = async () => {
    // Validate inputs
    if (!collateralPrice || !strikePrice || !expiryDays) {
      alert("Please fill all fields");
      return;
    }
    if (Number(collateralPrice) <= 0 || Number(strikePrice) <= 0 || Number(expiryDays) <= 0) {
      alert("All values must be greater than 0");
      return;
    }
    if (Number(collateralPrice) < Number(strikePrice)) {
      alert("Collateral price must be >= strike price");
      return;
    }

    try {
      // @ts-ignore
      const { ethereum } = window;
      if (!ethereum) return alert("MetaMask not detected!");

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(blockschules_contract_address, blockschules_contract_abi, signer);

      // Convert to 18 decimals (matches your cast call)
      const collateral = ethers.parseUnits(collateralPrice, 18);
      const strike = ethers.parseUnits(strikePrice, 18);
      const expiry = Number(expiryDays) * 24 * 60 * 60; // days → seconds

      console.log("Collateral:", collateral.toString());
      console.log("Strike:", strike.toString());
      console.log("Expiry (seconds):", expiry);

      // Call contract
      const [mantissa, scale] = await contract.computePutPremium(collateral, strike, expiry);
      const premium = Number(mantissa) / 10 ** Number(scale);

      setTxStatus(`Calculated Premium: ${premium.toFixed(6)} USD`);
    } catch (err: any) {
      console.error(err);
      setTxStatus(`Error: ${err.message || err}`);
    }
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white mt-3 py-2 rounded-lg">
          Buy Protection
        </Button>
      </Dialog.Trigger>

      <Dialog.Content className="w-full max-w-3xl p-8 rounded-xl">
        <Dialog.Header>
          <Text as="h5" className="text-2xl font-semibold">
            Buy Protection Option
          </Text>
        </Dialog.Header>

        <section className="flex flex-col gap-6 mt-4">
          {/* Collateral Price Input */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Collateral Price (USD)</label>
            <input
              type="number"
              value={collateralPrice}
              onChange={(e) => setCollateralPrice(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Strike Price Input */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Strike Price (USD)</label>
            <input
              type="number"
              value={strikePrice}
              onChange={(e) => setStrikePrice(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Expiry Input */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Time to Expiry (days)</label>
            <input
              type="number"
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Action Button */}
          <div className="flex justify-end mt-4">
            <Button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg"
              onClick={handleBuyProtection}
            >
              Calculate Premium
            </Button>
          </div>

          {/* Transaction / Premium Status */}
          {txStatus && <p className="text-gray-700 mt-2">{txStatus}</p>}
        </section>
      </Dialog.Content>
    </Dialog>
  );
}
