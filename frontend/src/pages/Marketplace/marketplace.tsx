'use client';

import Navbar from "@/utils/UI-components/Navbar/Navbar";
import PundleUserTable from "./Tables-ui/Tables";

export default function Marketplace() {
  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="mt-4 w-full">
        <Navbar />
      </div>

      {/* Centered Table */}
      <div className="flex justify-center mt-10 w-full">
        <div className="w-full max-w-4xl">
          <PundleUserTable />
        </div>
      </div>
    </div>
  );
}
