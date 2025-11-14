


    const supplyPayload = {
  tokenUid: { 
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", // WETH
    chainId: "421613" // Arbitrum Sepolia
  },
  amount: "100000000000000000", // 0.1 WETH (18 decimals)
  walletAddress: "0xYourConnectedWalletAddress"
};

const response = await fetch("https://api.emberai.xyz/mcp/lendingSupply", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(supplyPayload)
});




const result = await response.json();
console.log(result);
