
import { Card } from "@/components/retroui/Card";
import HeroImage from "@/assets/vite.svg"
import DialogStyleDefault from "./Dialogue";
 
export default function CommerceCard() {
  return (
    <Card className="w-[350px]  shadow-m hover:shadow">
      <Card.Content className="pb-0">
        <img
          src={HeroImage}
          className="w-full h-full"
          alt="Gameboy"
        />
      </Card.Content>
      <Card.Header className="pb-0">
        <Card.Title>Classic 8-bit Gameboy</Card.Title>
      </Card.Header>
      <Card.Content className="flex justify-between items-center">
        <p className="text-lg font-semibold">0.001 ETH</p>

        <DialogStyleDefault  />
      </Card.Content>
    </Card>
  );
}