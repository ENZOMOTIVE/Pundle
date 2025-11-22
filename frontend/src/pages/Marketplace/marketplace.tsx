'use client'


import Navbar from "@/utils/UI-components/Navbar/Navbar";

import PundleUserTable from "./Tables-ui/Tables";

export default function Marketplace() {



  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="mt-4 w-full">
        <Navbar />
      </div>

      <div className="flex flex-col gap-6 w-full max-w-6xl justify-center mt-6 mx-auto text-center">
        <PundleUserTable />
      </div>
    </div>
  );
}
