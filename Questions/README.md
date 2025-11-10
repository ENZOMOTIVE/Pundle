1. “Borrowers purchase a call or put option (subscription/insurance) that automatically protects their loan from liquidation”

Think of your loan as a house and the price of your collateral (ETH, USDC, etc.) as the value of the house:

In DeFi lending, if your collateral loses value, the system liquidates it to recover the loan. You lose part of your crypto.

The option acts like insurance: you pay a small premium (subscription fee) to a pool of option sellers.

This option activates only if your collateral’s value drops below a critical threshold.

Example:

Deposit $1000 USDC as collateral.

Borrow 1 ETH (worth $2000).

Buy a put option on ETH for $50.

If ETH drops to $1500, normally your collateral would be partially liquidated. But the put option pays the difference, so your loan stays safe.

You essentially pay a small fee upfront to avoid sudden liquidation losses.

Think: “I pay $50 to guarantee my collateral won’t be liquidated even if ETH crashes.”

2. “Earn premiums from selling options”

This is where lenders (or liquidity providers) earn:

In a traditional loan, the lender only earns interest from borrowers.

In this system, there’s a new revenue stream: the option premiums.

Here’s how it works:

Liquidity Providers (LPs) deposit crypto into a “protection pool”.

Borrowers buy options from this pool.

LPs earn the fees paid by borrowers (premiums).

Analogy:

You are an insurance company: people pay you a small fee to cover potential losses. If the bad event doesn’t happen, you keep the fee. If it happens, you pay out.

In DeFi: LPs take the risk of ETH price dropping. Borrowers pay them upfront for protection. That’s how LPs earn profit from selling options.

3. “Users by having the same value even if price drops”

Borrowers are protected from sudden price drops.

Without options: collateral could be liquidated, and borrower loses value.

With options: the option pays the difference, so even if ETH drops, the user’s loan position retains its value (minus the premium).

Example:

Collateral: 1 ETH ($2000)

Loan: $1000

ETH price drops to $1500

Normally, 1 ETH collateral might be partially liquidated to cover the loan. Borrower loses some ETH.

With option: the option pays the shortfall, collateral isn’t liquidated. Borrower keeps the same effective value of their crypto.