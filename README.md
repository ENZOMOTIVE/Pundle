#  Pundle – Option based Collateral protection


Pundle is a decentralized  lending protocol built on Arbitrum that empowers borrowers to protect their collateral from sudden liquidations. By leveraging an option-based mechanism, Pundle allows users to hedge against market volatility, ensuring that their positions remain safe even during sharp price movements. The protocol integrates seamlessly with lending and borrowing markets, providing a gas-efficient, trustless, and fully on-chain solution for risk management in decentralized finance

**Option-Based Loan Protection**.
Borrowers can protect their positions from liquidation by purchasing a small premium — essentially a fixed-term option — that secures the value of their collateral during a market downturn/sudden liquidation. When the collateral price falls toward the liquidation threshold, this protection kicks in and absorbs the price impact, preventing the position from being force-liquidated.

The cost of this protection (the premium) is calculated using the Black–Scholes option pricing model, a well-established financial formula that determines the fair price of an option based on market volatility, time to expiry, and the relationship between the collateral price and the liquidation threshold.

# 📘 Pundle Smart Contracts

This directory contains the core smart contracts powering **Pundle – the option-based, collateral-protected DeFi lending protocol**.  
The system is built using a dual-contract architecture:

1. **Lending Contract** – Handles deposits, borrowing, repayment, collateral, and protection logic.
2. **Black–Scholes Pricing Engine** – A high-precision option pricing module that is used to calculate the price of the premiums.



---

### 🏦 1. Lending Contract

**Contract Address:** `0xb686fDAfA06582de0792b18F64298dC5bcb78A3D`



### 🧮 2. Black–Scholes Pricing Engine (Arbitrum Stylus)

**Contract Address:** `0xe924cf374ea3fc5a88ef243949e92de0c00b6f40`










