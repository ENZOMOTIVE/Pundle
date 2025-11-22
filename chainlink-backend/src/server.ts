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
  { inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }], name: "getRoundData", outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ], stateMutability: "view", type: "function"
  },
  { inputs: [], name: "version", outputs: [{ internalType: "uint256", name: "", type: "uint256" }], stateMutability: "view", type: "function" },
];

// ---- Feed ----
const FEED_ADDRESS = "0xD1092a65338d049DB68D7Be6bD89d17a0929945e";
const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, FEED_ADDRESS);

// ---- Live price endpoint ----
app.get("/price", async (req: Request, res: Response) => {
  try {
    const roundDataRaw: any = await priceFeed.methods.latestRoundData().call();
    const decimals = Number(await priceFeed.methods.decimals().call());

    const price = Number(roundDataRaw.answer) / Math.pow(10, decimals);

    res.json({
      price,
      updatedAt: Number(roundDataRaw.updatedAt) * 1000,
    });
  } catch (err) {
    console.error("Chainlink error:", err);
    res.status(500).json({ error: "Failed to fetch price" });
  }
});

// ---- Helper: simulate OHLC ----
function simulateOHLC(price: number) {
  const variation = price * 0.01; // 1% variation
  const open = price + (Math.random() - 0.5) * variation * 2;
  const close = price + (Math.random() - 0.5) * variation * 2;
  const high = Math.max(open, close) + Math.random() * variation;
  const low = Math.min(open, close) - Math.random() * variation;
  return [open, high, low, close];
}

// ---- Generate evenly spaced candles ----
function generateEvenCandles(latestPrice: number, numCandles: number, intervalMs: number) {
  const candles = [];
  let lastTime = Date.now() - numCandles * intervalMs;
  let lastPrice = latestPrice;

  for (let i = 0; i < numCandles; i++) {
    const ohlc = simulateOHLC(lastPrice);
    candles.push({ x: lastTime, y: ohlc });
    lastTime += intervalMs;
    lastPrice = ohlc[3]; // use close as next open
  }

  return candles;
}

// ---- Historical candles endpoint ----
app.get("/historical-candles", async (req: Request, res: Response) => {
  try {
    const decimals = Number(await priceFeed.methods.decimals().call());
    const latestRoundData: any = await priceFeed.methods.latestRoundData().call();
    const latestPrice = Number(latestRoundData.answer) / Math.pow(10, decimals);

    const candles = generateEvenCandles(latestPrice, 200, 60 * 1000); // 200 candles, 1-minute interval

    res.json({ candles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch historical candles" });
  }
});

// ---- Server ----
app.listen(3001, () => {
  console.log("🚀 Chainlink server running on http://localhost:3001");
});
