


import Chatbot from "@/pages/Chatbot/chatbot";
import Dashboard from "@/pages/Dashboard/dashboard";
import { Home } from "@/pages/Home/home";
import Marketplace from "@/pages/Marketplace/marketplace";
import { BrowserRouter, Routes, Route } from "react-router-dom";



export default function AppRoutes(){

    return(
        <BrowserRouter>
        <Routes>

                <Route path="/" element={<Home />} />

                
                <Route path="/dashboard" element={< Dashboard/>} />
                <Route path="/live-data" element={<Chatbot />} />
                <Route path="/marketplace" element={<Marketplace />} />


        </Routes>
       
        </BrowserRouter>
        

    )
}

