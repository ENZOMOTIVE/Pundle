import Navbar from "@/utils/UI-components/Navbar/Navbar";
import Tables from "../Marketplace/Tables-ui/Tables";
import HealthFactorDonut from "@/utils/UI-components/Charts/CustomPieChart";
import DepositAsset from "./deposit-ui/Deposit";
import BorrowAssetCard from "./borrow-ui/BorrowAsset";
import OptionCard from "./Option-ui/Optionui";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen p-6 bg-yellow-150">
      {/* Navbar */}
      <div className="mt-4 w-full">
        <Navbar />
      </div>

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row gap-6 mt-6 max-w-6xl mx-auto w-full">
        {/* Left Column: Deposit + Borrow side by side */}
        <div className="flex gap-6 flex-1">

          {/* Borrow Card */}
          <div className="flex-1">
            <BorrowAssetCard />
          </div>

          {/* Deposit Card */}
          <div className="flex-1">
            <DepositAsset />
          </div>
          
        </div>

        {/* Right Column: Health Factor (top) + Option Card (bottom) */}
        <div className="flex flex-col gap-6 w-80">
          {/* Health Factor */}
          <div className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl">
            <h3 className="text-gray-700 font-semibold mb-2 text-lg">Health Factor</h3>
            <div className="w-40 h-40">
              <HealthFactorDonut healthFactor={75} />
            </div>
          </div>

          {/* Option Card */}
          <OptionCard />
        </div>
      </div>

      {/* Bottom Section: Tables */}
      <div className="flex flex-col lg:flex-row gap-6 mt-10 max-w-6xl mx-auto w-full">
        <Tables />
      </div>
    </div>
  );
}
