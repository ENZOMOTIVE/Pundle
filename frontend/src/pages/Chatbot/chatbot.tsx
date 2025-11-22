import Navbar from "@/utils/UI-components/Navbar/Navbar";
import CandlestickChart from "./CandleStick";

export default function Chatbot() {
  return (
    <div className="flex flex-col min-h-screen ">
      {/* Navbar */}
     <div className="mt-4 w-full">
             <Navbar />
           </div>

      {/* Chart Container */}
      <div className="flex items-center justify-center w-full flex-1 p-6">
        <div className="w-full max-w-7xl h-full bg-white shadow-lg p-4">
          <CandlestickChart />
        </div>
      </div>
    </div>
  );
}
