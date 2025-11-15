'use client'


import Navbar from "@/utils/UI-components/Navbar/Navbar";
import { Button } from "@/components/retroui/Button";
import { CONTRACT_ADDRESS, counter_abi } from "@/contract-abi/counter";
import { useWriteContract, useReadContract } from "wagmi";

export default function Marketplace() {
  // Read counter value from the contract
  const { data: counterData, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: counter_abi,
    functionName: "number"
 // optional: auto-refresh on new blocks
  });

  // Write contract function
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  const handleClick = async () => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: counter_abi,
        functionName: "increment",
      });

      // Refetch counter value after transaction
      await refetch();

    } catch (err: any) {
      console.error("Transaction failed:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="mt-4 w-full">
        <Navbar />
      </div>

      <div className="flex flex-col gap-6 w-full max-w-6xl justify-center mt-6 mx-auto text-center">
        <p className="text-lg font-semibold">
          Counter Value: {counterData?.toString() ?? "Loading..."}
        </p>

        <Button onClick={handleClick} className="mt-4">
          Increment
        </Button>

        {isPending && <p>Sending transaction...</p>}
        {isSuccess && <p>Transaction completed!</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
}
