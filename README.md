# 🛡️ Pundle – Option-Protected DeFi Lending on Arbitrum  
**MVP: Borrow Assets + Buy Protection Options to Prevent Liquidation**

Pundle is a decentralized lending protocol built on Arbitrum that empowers borrowers to protect their collateral from sudden liquidations. By leveraging an option-based mechanism, Pundle allows users to hedge against market volatility, ensuring that their positions remain safe even during sharp price movements. The protocol integrates seamlessly with lending and borrowing markets, providing a gas-efficient, trustless, and fully on-chain solution for risk management in decentralized finance

**Option-Based Loan Protection**.

Borrowers can protect their positions from liquidation by purchasing a simple, fixed-term option that automatically offsets collateral losses during price crashes.


➡️ *Borrow Asset → Buy Option → Stay Safe From Liquidation.*

---

## 🚀 Why Pundle?

Traditional DeFi lending platforms (like Aave, Compound) require over-collateralization.  
When collateral price drops quickly, users get liquidated, losing money instantly.

There is currently **no integrated, seamless way to hedge liquidation risk** inside a lending platform.

**Pundle solves this.**

Borrowers can purchase protection options that automatically compensate losses when the collateral price drops near liquidation levels.

This enables:

- Safer leveraged positions  
- Predictable downside  
- Lower liquidation risk  
- A new revenue model for liquidity providers  

---

# 🎯 MVP Scope

This version focuses **only** on demonstrating the core mechanism of option-protected lending.

### ✔ Included in MVP
- Deposit collateral (ETH)
- Borrow asset (USDC)
- Buy liquidation-protection option (simple fixed-term option)
- Automatic protection when price falls 
- Simple LP pool where liquidity providers deposit USDC and earn option premiums
- Basic dashboard showing:
  - Collateral  
  - Borrowed amount  
  - Protection status  
  - Liquidation threshold  
  - Price impact simulation graph  



# 🧠 How Pundle Works 

### 1. **Deposit Collateral**
User deposits ETH as collateral.

### 2. **Borrow Asset**
User borrows the Asset.

### 3. **Buy Protection Option**
Borrower buys a simple put-style option:

- Strike = liquidation threshold  
- Expiry = fixed term  
- Premium paid in USDC  
- Backed by the LP liquidity pool  

### 4. **Price Drop **
If ETH price drops:

- Without protection → liquidation  
- With protection → option compensates shortfall  

### 5. **LP Side**
Liquidity providers deposit USDC into one pool and earn:

- Option premiums  
- Basic APY  

---

# 📊 MVP Screens (UI Overview)

### **1. Lending Page**
- Deposit ETH  
- Borrow USDC  
- See LTV & liquidation threshold  

### **2. Option Protection Page**
- Premium calculation  
- Strike level  
- Expiry  
- “Buy Protection” button  

### **3. Dashboard**
- Loan overview  
- Protection status  
- Liquidation risk meter  
- Price simulation slider/graph  

### **4. LP Pool**
- Deposit USDC  
- View earnings  
- View pool utilization  

---

# 🏗️ Tech Stack

| Layer | Technology |
|------|------------|
| Smart Contracts | Solidity / Stylus (Arbitrum Stylus Optional) |
| Frontend | Next.js + TypeScript |
| Wallet | wagmi + viem |
| Price Feeds | Chainlink |
| Charts | Recharts or Lightweight Charts |

---

# 🧱 Smart Contract Architecture (MVP)

### **1. LendingPool.sol**
Handles deposit, borrow, and tracks collateral/loan.

### **2. ProtectionOption.sol**
Simple put-style option with:
- strike  
- expiry  
- premium  
- payout logic  

### **3. OptionManager.sol**
Handles:
- buying protection  
- validating active option  
- calculating payout  

### **4. LiquidityPool.sol**
LPs deposit USDC → pool backs option payouts.

---

# 🔧 Local Development

```bash

cd pundle
npm install
npm run dev
```
