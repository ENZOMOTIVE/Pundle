import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";

export default function BorrowAssetCard() {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md flex flex-col h-full">
      <Card.Title>Borrow USDC</Card.Title>
      <Card.Content className="flex flex-col gap-4 mt-3 flex-1">
        <p className="text-gray-600 text-sm">Borrow against your collateral</p>

        {/* Amount Input */}
        <div className="flex flex-col gap-1">
          <label className="text-gray-500 text-sm">Amount</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="0.00"
              className="flex-1 border border-gray-300 rounded-md p-2"
            />
            <span className="flex items-center px-3 bg-gray-100 rounded-md text-gray-700 font-medium">
              USDC
            </span>
          </div>
        </div>

        {/* Spacer to stretch the card */}
        <div className="flex-1" />

        {/* Target LTV */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>Target LTV:</span>
          <span>45% <span className="text-green-600 font-semibold">Safe</span></span>
        </div>

        {/* Borrow APR */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>Borrow APR:</span>
          <span>4.25%</span>
        </div>

        {/* New Health Factor */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>New Health Factor:</span>
          <span className="font-semibold text-gray-700">2.45</span>
        </div>

        {/* Borrow Button */}
        <Button className="bg-blue-500 hover:bg-blue-600 text-white mt-4 py-2 rounded-lg">
          Borrow USDC
        </Button>
      </Card.Content>
    </Card>
  );
}
