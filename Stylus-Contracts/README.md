# Black-Scholes Put Option Calculator

A Rust smart contract on Arbitrum Stylus that calculates put option premiums for DeFi liquidation protection.

# What this contract does:

This contract calculates the premium (price) for put options using the Black-Scholes model.

Put options protect borrowers from liquidation by paying out when collateral prices drop below a threshold.
Example Use Case

Alice deposits 1 ETH (worth $2000) and borrows $1500 USDC
Her liquidation threshold is $1800
She buys 7-day protection for $15 (the premium this contract calculates)
If ETH drops to $1700, she gets paid out instead of being liquidated

This contract only calculates the premium - it doesn't store data, fetch prices, or handle payments.

---

## Test Commands:
```
cast call $STYLUS_CONTRACT_ADDRESS \
  "computePutPremium(uint256,uint256,uint256)(int256,uint256)" \
  2000000000000000000000 \
  2000000000000000000000 \
  19178082191780000 \
  --rpc-url $RPC_URL
  ```



  ### DeFi Input Example with 18 Decimal Places

In Ethereum and many DeFi protocols, numeric inputs are often represented using **18 decimal places** (also called `wei` precision). This is important for accurate calculations when dealing with tokens and prices.

Below is an example table showing how to convert actual values into 18-decimal format:

| Input Example | Actual Value | How to Calculate |
|---------------|-------------|----------------|
| Collateral Price | 2000 | 2000 × 10¹⁸ = 2000000000000000000000 |
| Strike Price | 1800 | 1800 × 10¹⁸ = 1800000000000000000000 |
| Time (7 days) | 0.019178 years | (7 ÷ 365) × 10¹⁸ = 191780821917800000 |
| Time (30 days) | 0.0821918 years | (30 ÷ 365) × 10¹⁸ = 821917808219180000 |

## Explanation

- **Collateral Price / Strike Price:** Multiply the actual USD value by `10^18` to convert it into the 18-decimal format used by smart contracts.  
- **Time:** Convert days into years (divide by 365), then multiply by `10^18` to maintain precision for contract computations.

### Notes

- Always use integer values in smart contracts; fractional numbers must be represented with 18 decimals.  
- This avoids rounding errors in DeFi calculations like options pricing, lending, or swaps.

### Outfput Formula:

Returns two values: (mantissa, scale)

Example:

```
644388041829310490583501703  ← mantissa
25                            ← scale
```

## Premium Increases when:

- Time to expiry is longer
- Collateral price is closer to strike price
- Option is in-the-money



## Contract Deployed :
The Contract has been deplyed on the Arbitrium Sepolia

```
deployed code at address: 0xe924cf374ea3fc5a88ef243949e92de0c00b6f40
deployment tx hash: 0x4b63779b1fbdaf2aa7a11e1d62038d0cc48a15df25806a8e215602eea87fd874
contract activated and ready onchain with tx hash: 0x9d81f991d1d85624a001292118372f180208511246c7c019b8b77954a2daff4b
```