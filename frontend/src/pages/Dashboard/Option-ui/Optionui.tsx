
import { Card } from "@/components/retroui/Card";


import BuyProtectionDialog from "./Dialoguebox";

export default function OptionCard() {


  

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl flex-1 max-w-md">
      <Card.Title className="text-lg font-semibold">
        Protect Your Collateral
      </Card.Title>
      <Card.Content className="flex flex-col gap-4 mt-3 text-gray-700">
        <p>
          Buy insurance-like protection for your collateral to safeguard it from sudden
          liquidations if market prices drop.
        </p>
        <p>
          Premiums are dynamically calculated using a Black-Scholes option pricing model
          based on your collateral, strike price, and duration.
        </p>
        

        <BuyProtectionDialog />
      </Card.Content>
    </Card>
  );
}
