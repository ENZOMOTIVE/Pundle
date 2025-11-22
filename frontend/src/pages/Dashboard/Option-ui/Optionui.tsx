import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";

export default function OptionCard() {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex-1 max-w-md">
      <Card.Title className="text-lg font-semibold">Buy Protection</Card.Title>
      <Card.Content className="flex flex-col gap-4 mt-3">


        {/* Premium & Coverage */}
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span>Premium</span>
          <span>$0.00</span>
        </div>
       

        {/* Protection Duration */}
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span>Protection Duration</span>
          <span>7 Days - $12.50</span>
        </div>

        {/* Strike Price */}
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span>Strike Price</span>
          <span>$1,245 ETH</span>
        </div>

        {/* Premium Cost */}
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span>Premium Cost</span>
          <span>$12.50 USDC</span>
        </div>

        {/* Max Payout */}
        <div className="flex justify-between items-center text-sm text-gray-700">
          <span>Max Payout</span>
          <span>Up to loan value</span>
        </div>

        

        {/* Buy Protection Button */}
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white mt-3 py-2 rounded-lg">
          Buy Protection Now
        </Button>
      </Card.Content>
    </Card>
  );
}
