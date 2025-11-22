import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";

export default function DepositAsset() {
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
              className="flex-1 border border-gray-300 rounded-md p-2"
            />
            <Button className="px-4 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md font-medium">
              MAX
            </Button>
          </div>
        </div>

        {/* Spacer to stretch the card */}
        <div className="flex-1" />

        {/* Available Balance & Current Value */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>Available:</span>
          <span>0.00 ETH</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Current Value:</span>
          <span>$0.00</span>
        </div>

        {/* Max Borrow Capacity */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>Max Borrow Capacity:</span>
          <span>$0.00</span>
        </div>

        {/* Deposit Button */}
        <Button className="bg-green-500 hover:bg-green-600 text-white mt-4 py-2 rounded-lg">
          Deposit Collateral
        </Button>
      </Card.Content>
    </Card>
  );
}
