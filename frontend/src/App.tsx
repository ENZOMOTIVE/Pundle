import './index.css';
import { ConnectKitButton } from 'connectkit';
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button"; // Assuming you have a Button component
import HeroImage from "./../public/vite.svg"

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 p-6">

      {/* Two-column hero */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl w-full">

        {/* Left side: Rich Image Card */}
        <Card className="w-[350px] shadow-none hover:shadow-none">
  {/* Hero Image */}
  <Card.Content className="pb-0">
    <img
      src={HeroImage}
      alt="Hero"
      className="w-full h-64 object-contain rounded-xl" // object-contain prevents cropping
    />
  </Card.Content>

  {/* Optional empty header or title */}
  <Card.Header className="pb-0">
    <Card.Title className="text-xl font-bold text-gray-900 text-center">
      {/* Optional tagline */}
    </Card.Title>
  </Card.Header>

  {/* Get Started Button */}
  <Card.Content className="flex justify-center mt-2">
    <Button className="px-6 py-3 font-semibold rounded-xl bg-yellow-400 hover:bg-yellow-500 transition-all duration-300">
      Get Started
    </Button>
  </Card.Content>
</Card>



        {/* Right side: Welcome / Brief Card */}
        <div className="flex-1">
          <Card className="rounded-2xl shadow-2xl hover:shadow-3xl p-8 transform transition-all duration-300 hover:scale-105">
            <Card.Header className="flex flex-col items-center space-y-6">

              {/* Centered Title */}
              <Card.Title>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center">
                  Welcome to Pundle
                </h1>
              </Card.Title>

              {/* Centered Description */}
              <Card.Description className="text-gray-700 text-lg sm:text-xl leading-relaxed text-center">
                Pundle is a decentralized platform on Arbitrum that runs on top of Aave Protocol that combines crypto lending/borrowing
                with option contracts to protect against sudden liquidations. Borrow safely while hedging risk.
              </Card.Description>

              {/* Centered Connect Button */}
              <div className="flex justify-center mt-4">
                <ConnectKitButton />
              </div>

            </Card.Header>
          </Card>
        </div>


      </div>

      {/* Optional: Key Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-6">
        <Card className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-300">
          <Card.Title>
            <h3 className="text-2xl font-bold text-gray-900">Option Protection Module</h3>
          </Card.Title>
          <Card.Description className="text-gray-700 mt-2">
            Protects collateral during price drops with everlasting or fixed-term options.
          </Card.Description>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-300">
          <Card.Title>
            <h3 className="text-2xl font-bold text-gray-900">Trading Marketplace</h3>
          </Card.Title>
          <Card.Description className="text-gray-700 mt-2">
            Users can trade protective options or vanilla/exotic options for hedging or speculation.
          </Card.Description>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-300">
          <Card.Title>
            <h3 className="text-2xl font-bold text-gray-900">Dashboard & Analytics</h3>
          </Card.Title>
          <Card.Description className="text-gray-700 mt-2">
            Visualize option chains, implied volatility, pay-off curves, and loan status in real-time.
          </Card.Description>
        </Card>
      </div>

    </div>
  );
}

export default App;
