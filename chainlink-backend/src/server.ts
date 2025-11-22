import express, { Request, Response } from "express";
import cors from "cors";
import Web3 from "web3";

const app = express();
app.use(cors());
app.use(express.json());

const web3 = new Web3("https://arb-sepolia.g.alchemy.com/v2/yOWUwdp0MI_LI04pUv3l6");

// ---- Types ----
interface RoundData {
  roundId: string;
  answer: string;
  startedAt: string;
  updatedAt: string;
  answeredInRound: string;
}

// ---- ABI ----
const aggregatorV3InterfaceABI = [
  { inputs: [], name: "decimals", outputs: [{ internalType: "uint8", name: "", type: "uint8" }], stateMutability: "view", type: "function" },
  { inputs: [], name: "latestRoundData", outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ], stateMutability: "view", type: "function"
  },
  { inputs: [], name: "version", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
];

// Feed
const FEED_ADDRESS = "0xD1092a65338d049DB68D7Be6bD89d17a0929945e";
const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, FEED_ADDRESS);

// ---- Endpoint ----
app.get("/price", async (req: Request, res: Response) => {
  try {
    // explicitly type as any and cast to our interface
    const roundDataRaw: any = await priceFeed.methods.latestRoundData().call();
    const decimalsRaw: any = await priceFeed.methods.decimals().call();

    const decimals = Number(decimalsRaw);

    const roundData: RoundData = {
      roundId: roundDataRaw.roundId.toString(),
      answer: roundDataRaw.answer.toString(),
      startedAt: roundDataRaw.startedAt.toString(),
      updatedAt: roundDataRaw.updatedAt.toString(),
      answeredInRound: roundDataRaw.answeredInRound.toString(),
    };

    const price = Number(roundData.answer) / Math.pow(10, decimals);

    res.json({
      price,
      updatedAt: Number(roundData.updatedAt) * 1000,
      roundData,
    });
  } catch (err) {
    console.error("Chainlink error:", err);
    res.status(500).json({ error: "Failed to fetch price" });
  }
});

// ---- Server ----
app.listen(3001, () => {
  console.log("🚀 Chainlink server running on http://localhost:3001");
});
