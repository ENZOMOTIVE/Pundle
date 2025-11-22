import Navbar from "@/utils/UI-components/Navbar/Navbar";
import CandlestickChart from "./CandleStick";
import LivePriceCard from "./LivePrice";

export default function Chatbot() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="mt-4">
        <Navbar />
      </div>

      {/* Chart Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-7xl h-full bg-yellow-400 shadow-lg p-4 rounded-lg">
          <CandlestickChart />
        </div>
      </div>

      {/* Live Price Card at bottom */}
      <div className="flex justify-center p-6  shadow-inner">
        <LivePriceCard />
      </div>
    </div>
  );
}
