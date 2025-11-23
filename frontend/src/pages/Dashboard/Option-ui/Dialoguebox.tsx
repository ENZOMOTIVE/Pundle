import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { useState } from "react";
import { ethers } from "ethers";
import { blockschules_contract_abi, blockschules_contract_address } from "@/contract-abi/BlockSchules-contract";
import { contract_abi, option_contract_address } from "@/contract-abi/lending-borrowing";

// Pundle contract ABI & address


export default function BuyProtectionDialog() {
  const [collateralPrice, setCollateralPrice] = useState<string>("2000");
  const [strikePrice, setStrikePrice] = useState<string>("2000");
  const [expiryDays, setExpiryDays] = useState<string>("30");
  const [premium, setPremium] = useState<number | null>(null);
  const [txStatus, setTxStatus] = useState<string>("");

  // Step 1: Calculate premium
  const calculatePremium = async () => {
    try {
      // @ts-ignore
      const { ethereum } = window;
      if (!ethereum) return alert("MetaMask not detected!");

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();

      const blackScholes = new ethers.Contract(
        blockschules_contract_address,
        blockschules_contract_abi,
        signer
      );

      const collateral = ethers.parseUnits(collateralPrice, 18);
      const strike = ethers.parseUnits(strikePrice, 18);
      const expiry = Number(expiryDays) * 24 * 60 * 60;

      const [mantissa, scale] = await blackScholes.computePutPremium(
        collateral,
        strike,
        expiry
      );

      const calculatedPremium = Number(mantissa) / 10 ** Number(scale);
      setPremium(calculatedPremium);
      setTxStatus(`Calculated Premium: ${calculatedPremium.toFixed(6)} ETH`);
    } catch (err: any) {
      console.error(err);
      setTxStatus(`Error calculating premium: ${err.message || err}`);
    }
  };

  // Step 2: Buy protection by sending premium to Pundle
const buyProtection = async () => {
  if (!premium) return alert("Calculate premium first!");

  try {
    // @ts-ignore
    const { ethereum } = window;
    if (!ethereum) return alert("MetaMask not detected!");

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();

    const pundle = new ethers.Contract(
      option_contract_address,
      contract_abi,
      signer
    );

    const expiry = Math.floor(Date.now() / 1000) + Number(expiryDays) * 24 * 60 * 60;

    // Convert premium safely
    const premiumInWei = ethers.parseUnits(premium.toFixed(18), 18);
    const strikeInWei = ethers.parseUnits(strikePrice, 18);

    const tx = await pundle.buyProtection(
      strikeInWei,
      expiry,
      premiumInWei,
      { value: premiumInWei }
    );

    await tx.wait();
    setTxStatus(`Protection purchased successfully! Premium: ${premium.toFixed(6)} ETH`);
  } catch (err: any) {
    console.error(err);
    setTxStatus(`Error buying protection: ${err.message || err}`);
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
          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Collateral Price (USD)</label>
            <input
              type="number"
              value={collateralPrice}
              onChange={(e) => setCollateralPrice(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Strike Price (USD)</label>
            <input
              type="number"
              value={strikePrice}
              onChange={(e) => setStrikePrice(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-600">Time to Expiry (days)</label>
            <input
              type="number"
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex gap-2 justify-end mt-4">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
              onClick={calculatePremium}
            >
              Calculate Premium
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg"
              onClick={buyProtection}
              disabled={!premium}
            >
              Buy Protection
            </Button>
          </div>

          {txStatus && <p className="text-gray-700 mt-2">{txStatus}</p>}
        </section>
      </Dialog.Content>
    </Dialog>
  );
}
