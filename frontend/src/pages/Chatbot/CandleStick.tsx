"use client";

import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface Candle {
  x: number; // timestamp in ms
  y: [number, number, number, number]; // OHLC
}

export default function CandlestickChart() {
  const [candles, setCandles] = useState<Candle[]>([]);

  useEffect(() => {
    async function fetchCandles() {
      try {
        const res = await fetch("http://localhost:3001/historical-candles");
        const data = await res.json();
        setCandles(data.candles);
      } catch (err) {
        console.error("Failed to fetch candles:", err);
      }
    }

    fetchCandles();
  }, []);

  const options: ApexOptions = {
    chart: { type: "candlestick" as const, height: 350 },
    title: { text: "Live Price Feed Simulation", align: "left" },
    xaxis: { type: "datetime" },
    yaxis: { tooltip: { enabled: true } },
  };

  const series = [{ data: candles }];

  return (
    <div className="w-full">
      <ReactApexChart options={options} series={series} type="candlestick" height={350} />
    </div>
  );
}
