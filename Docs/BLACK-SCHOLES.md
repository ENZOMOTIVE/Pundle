# Black Scholes put equation:

The put option premium used in this protocol is computed using the standard Black–Scholes model:

$$
P = K e^{-rT} \, N(-d_2) - S \, N(-d_1)
$$


### 🔍 Meaning of Symbols

| Symbol | Meaning |
|--------|---------|
| **S** | Asset (collateral) price |
| **K** | Liquidation threshold (strike) |
| **T** | Time to expiry |
| **r** | Risk-free interest rate |
| **σ** | Volatility of the asset |
| **N(x)** | Cumulative Normal Distribution function |
| **d₁, d₂** | Intermediate variables used in Black–Scholes |

### 🧠 What is the Black–Scholes Equation (in simple words)?

The Black–Scholes model is one of the most widely used formulas in finance for calculating the **fair price of an option**.  
In our case, the “option” is the **protection a borrower buys to avoid liquidation**.

In simple terms:

- **S** (collateral price) might fall in the future  
- If it falls below **K** (liquidation threshold), the position would normally be liquidated  
- By paying a small premium **P**, the borrower buys protection against this downside risk  

The Black–Scholes formula calculates exactly how much this protection should cost based on:
- current collateral price  
- liquidation threshold  
- time until expiry  
- market volatility  
- interest rates  

It ensures the premium is **fair, mathematically correct, and consistent with real financial markets**.

---

### 🦀 Why I Used Arbitrum Stylus (Rust) for This

The Black–Scholes model involves heavy mathematical operations:

- exponentials  
- natural logarithms  
- square roots  
- error functions (erf)  
- cumulative normal distributions  
- high-precision decimal math  

These functions are **very difficult or nearly impossible to implement accurately in Solidity**, because Solidity:
- does not support floating-point math  
- lacks advanced math functions  
- becomes extremely expensive and slow when simulating them  

**Stylus**, on the other hand, lets me write smart contracts directly in **Rust**, which gives:

#### ✔ Accurate decimal arithmetic  
Using `rust_decimal`, I can safely perform calculations without losing precision.

#### ✔ Access to advanced math functions  
Rust provides `exp()`, `ln()`, `sqrt()`, `erf()` — which are essential for Black–Scholes.

#### ✔ Better performance and lower gas cost  
Stylus runs Rust/WASM inside the Arbitrum environment, making these heavy computations:
- **faster**
- **cheaper**
- **safer**
than equivalent Solidity code.

---

### 🔵 Why Arbitrum?

I chose Arbitrum because it offers:

#### ✔ Low transaction fees  
Making computation-heavy formulas like Black–Scholes affordable.

#### ✔ High throughput  
Good for real-time pricing of liquidation protection.

#### ✔ EVM compatibility  
Even though the core logic is written in Rust, the contract behaves like a normal Ethereum contract to wallets and dApps.

#### ✔ Stylus support  
Arbitrum is the only major L2 that allows deploying **Rust-based WASM smart contracts** that work seamlessly with Solidity contracts.

---

### ✨ Summary

Black–Scholes gives a **fair, mathematically sound premium** for liquidation protection.  
Stylus + Rust makes it **efficient and precise to compute on-chain**.  
Arbitrum provides the **scalability and low costs** needed to make this practical on a live DeFi protocol.


