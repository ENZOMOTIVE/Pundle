import { Card } from "@/components/retroui/Card";
import { Textarea } from "@/components/retroui/Textarea";
import Navbar from "@/utils/UI-components/Navbar/Navbar";
import { Button } from "@/components/retroui/Button";
import HeroImage from "@/assets/vite.svg";
import { useState } from "react";
import LineChartStyleMultiple from "@/utils/UI-components/Charts/charts";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there 👋! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [
      ...messages,
      { sender: "user", text: input.trim() },
      // You can replace this with your actual AI response call later
      { sender: "bot", text: "🤖 Got it! (I'll process your request soon...)" },
    ];
    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      {/* Navbar */}
      <div className="mt-4 w-full">
        <Navbar />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl w-full mx-auto mt-10">
        {/* Left side: Hero Card */}
        <Card className="w-[450px] shadow-l hover:shadow-none">
          <Card.Content className="pb-0">
            <LineChartStyleMultiple />
          </Card.Content>

          

        </Card>

        {/* Right side: Chatbot Card */}
        <div className="flex-1">
          <Card className="rounded-2xl shadow-2xl hover:shadow-3xl p-6 flex flex-col h-[600px]">
            <Card.Header className="mb-4 text-center">
              <Card.Title>
                <h1 className="text-3xl font-extrabold text-gray-900">
                  Chatbot
                </h1>
              </Card.Title>
            </Card.Header>

            {/* Chat messages area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-xl space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-yellow-400 text-gray-900 rounded-br-none"
                        : "bg-white text-gray-800 border rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="mt-4 flex items-center gap-3">
              <Textarea
                placeholder="Type your message..."
                value={input}
                onChange={(e:any) => setInput(e.target.value)}
                className="flex-1 resize-none rounded-xl shadow-l "
              />
              <Button
                onClick={handleSend}
                className="px-4 py-2 font-semibold bg-yellow-400 hover:bg-yellow-500 rounded-xl transition-all duration-300"
              >
                Send
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
