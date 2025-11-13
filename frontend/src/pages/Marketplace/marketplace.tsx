import Navbar from "@/utils/UI-components/Navbar/Navbar";




export default function Marketplace() {

    return(
     <div className="flex flex-col min-h-screen p-6">
          {/* Navbar with top spacing */}
          <div className="mt-4 w-full">
            <Navbar />
          </div>
    
         {/* Main Content */}
    <div className="flex gap-6 w-full max-w-6xl justify-center mt-6 mx-auto ">
      <h1>This is the Marketplace</h1>
    </div>
    
        </div>
    )
}