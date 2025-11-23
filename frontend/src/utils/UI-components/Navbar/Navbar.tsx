import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { FaArrowLeft } from "react-icons/fa";

import { AiFillDollarCircle } from "react-icons/ai";




import { CustomConnectWalletButton } from "@/utils/ConnectKit/CustomConnectButton";
import { useNavigate } from "react-router-dom";




export default function Navbar() {


    const navigate = useNavigate()

    const handleBackButton = () => { navigate("/") };

    return (
        <Card className="w-full ">
            <Card.Header className="flex  w-auto">

                <div className="flex justify-between">
                    {/* Left side: navigation buttons */}
                    <div className="flex items-center gap-12">
                        <Button onClick={handleBackButton} variant="outline"><FaArrowLeft /></Button>
                        <br />
                        <br />


                        <Button onClick={() => { navigate("/dashboard") }} className={navbuttonStyle}>Dashboard</Button>
                        <Button
                            onClick={() => navigate("/live-data")}
                            className={`${navbuttonStyle} flex items-center justify-center gap-2`}
                        >
                            <AiFillDollarCircle className="w-6 h-6" />
                            <span>Live Price Data </span>
                        </Button>
                        <Button onClick={() => { navigate("/marketplace") }} className={navbuttonStyle}>Marketplace</Button>

                    </div>

                    {/* Right side: connect wallet button */}
                    <div className="flex items-center gap-10">
                        <CustomConnectWalletButton />

                    </div>
                </div>
            </Card.Header>
        </Card>
    );
}


// Common Buttonstyle
const navbuttonStyle = "px-6 py-3 font-semibold  bg-yellow-400 hover:bg-yellow-500 transition-all duration-300"
