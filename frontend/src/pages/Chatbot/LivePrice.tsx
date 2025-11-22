import { useEffect, useState } from "react";
import { Card } from "@/components/retroui/Card";

export default function LivePriceCard() {
  const [price, setPrice] = useState<number>(0);
  const [change, setChange] = useState<number>(0);

  useEffect(() => {
    let lastPrice = 0;
    const interval = setInterval(async () => {
      const res = await fetch("http://localhost:3001/price");
      const data = await res.json();
      setPrice(data.price);
      setChange(data.price - lastPrice);
      lastPrice = data.price;
    }, 1000); // fetch every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-80 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 shadow-lg p-4">
      <Card.Content className="text-center">
        <h2 className="text-xl font-bold mb-2">Live Price</h2>
        <div className="text-3xl font-mono">
          ${price.toFixed(4)}
        </div>
        <div
          className={`mt-1 font-semibold ${
            change > 0 ? "text-green-600" : change < 0 ? "text-red-600" : "text-gray-600"
          }`}
        >
          {change > 0 ? "▲" : change < 0 ? "▼" : "–"} {Math.abs(change).toFixed(4)}
        </div>
      </Card.Content>
    </Card>
  );
}
