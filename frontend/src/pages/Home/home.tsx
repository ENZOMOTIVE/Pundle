import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";

import HeroImage from "@/assets/Pundle-removebg-preview.png";
import { useNavigate } from "react-router-dom";

import { CustomConnectWalletButton } from "@/utils/ConnectKit/CustomConnectButton";
import { useState } from "react";
import { Loader } from "@/components/retroui/Loader";

export function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500">
        <Loader size="lg" variant="outline" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">

      {/* Two-column hero */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl w-full">

        {/* Left side: Logo Image Card */}
        <Card className="w-[350px] shadow-none hover:shadow-none">
          <Card.Content className="pb-0">
            <img
              src={HeroImage}
              alt="Hero"
              className="w-full h-80 object-contain rounded-xl scale-125"
            />
          </Card.Content>

          <Card.Content className="flex justify-center mt-2">
            <Button
              className="px-6 py-3 font-semibold rounded-xl bg-yellow-400 hover:bg-yellow-500 transition-all duration-300"
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </Card.Content>
        </Card>

        {/* Right side: Main Intro Card */}
        <div className="flex-1">
          <Card className="rounded-2xl shadow-2xl hover:shadow-3xl p-8 transform transition-all duration-300 hover:scale-105">
            <Card.Header className="flex flex-col items-center space-y-6">

              <Card.Title>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center">
                  Welcome to Pundle
                </h1>
              </Card.Title>

              <Card.Description className="text-gray-700 text-lg sm:text-xl leading-relaxed text-center">
Pundle is a next-generation decentralized lending protocol on Arbitrum that lets borrowers protect their collateral from sudden liquidations with a seamless, on-chain option-based safety layer. By automatically hedging against market volatility, Pundle keeps your positions secure even during sharp price swings — no manual monitoring, no stress. Powered by gas-efficient architecture and deep integration with lending markets, Pundle delivers a trustless, transparent, and user-friendly risk-management experience designed for the future of DeFi.
              </Card.Description>

              <div className="flex justify-center mt-4">
                <CustomConnectWalletButton />
              </div>

            </Card.Header>
          </Card>
        </div>

      </div>

      {/* Key Features */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full px-6">

        {/* Protection Module */}
        <Card className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-300">
          <Card.Title>
            <h3 className="text-2xl font-bold text-gray-900">Liquidation Protection</h3>
          </Card.Title>
          <Card.Description className="text-gray-700 mt-2">
           

Shield your collateral from sudden price crashes — borrow with confidence.
          </Card.Description>
        </Card>

      

       

        {/* Protection Pricing */}
        <Card className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-300">
          <Card.Title>
            <h3 className="text-2xl font-bold text-gray-900">On-Chain Pricing Engine</h3>
          </Card.Title>
          <Card.Description className="text-gray-700 mt-2">
          On-chain Black-Scholes pricing that’s fast, accurate, and trustless — powered by Arbitrum Stylus.
          </Card.Description>
        </Card>

        {/* Buy Protection */}
        <Card className="p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl hover:scale-105 transform transition-all duration-300">
          <Card.Title>
            <h3 className="text-2xl font-bold text-gray-900">Dashboard & Analysis</h3>
          </Card.Title>
          <Card.Description className="text-gray-700 mt-2">
Live and historical price data at your fingertips. Powered by Chainlink oracles for precision you can trust.          </Card.Description>
        </Card>

       

      </div>

    </div>
  );
}
