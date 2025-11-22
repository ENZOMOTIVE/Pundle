import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { useState } from "react";
import { contract_abi, option_contract_address } from "../solidity_utils";
import { ethers } from "ethers";

export default function DepositAsset() {
  const [amount, setAmount] = useState<number | "">("");
  const [txStatus, setTxStatus] = useState<string>("");

  const handleDeposit = async () => {
    if (!amount || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      // @ts-ignore
      const { ethereum } = window;
      if (!ethereum) {
        alert("MetaMask not detected!");
        return;
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(option_contract_address, contract_abi, signer);

      // Convert ETH amount to wei
      const depositValue = ethers.parseEther(amount.toString());

      const tx = await contract.depositCollateral({ value: depositValue });
      setTxStatus("Transaction sent...");

      await tx.wait();
      setTxStatus("Deposit successful ✅");
    } catch (err: any) {
      console.error(err);
      setTxStatus(`Error: ${err.message || err}`);
    }
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md flex flex-col h-full">
      <Card.Title>Deposit Collateral</Card.Title>
      <Card.Content className="flex flex-col gap-4 mt-3 flex-1">
        <p className="text-gray-600 text-sm">Supply ETH to start borrowing</p>

        {/* Amount Input with MAX button */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm">Amount</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="flex-1 border border-gray-300 rounded-md p-2"
            />
            <Button
  className="px-4 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md font-medium"
  onClick={async () => {
    // @ts-ignore
    const { ethereum } = window;
    if (!ethereum) return;

    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner(); // await this
    const address = await signer.getAddress();  // await here too

    const balance = await provider.getBalance(address);
    setAmount(Number(ethers.formatEther(balance)));
  }}
>
  MAX
</Button>

          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Available Balance & Current Value */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>Available:</span>
          <span>{amount || "0.00"} ETH</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Current Value:</span>
          <span>${(Number(amount) * 1800 || 0).toFixed(2)}</span> {/* optional ETH->USD */}
        </div>

        {/* Max Borrow Capacity */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>Max Borrow Capacity:</span>
          <span>$0.00</span>
        </div>

        {/* Deposit Button */}
        <Button
          className="bg-green-500 hover:bg-green-600 text-white mt-4 py-2 rounded-lg"
          onClick={handleDeposit}
        >
          Deposit Collateral
        </Button>

        {txStatus && <p className="text-sm mt-2 text-gray-700">{txStatus}</p>}
      </Card.Content>
    </Card>
  );
}

