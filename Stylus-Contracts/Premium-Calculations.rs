#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
#![cfg_attr(not(any(test, feature = "export-abi")), no_std)]

#[macro_use]
extern crate alloc;

use rust_decimal::prelude::*;
use rust_decimal_macros::dec;
use alloc::string::{String, ToString};
use alloc::vec::Vec;

/// Import items from the SDK. The prelude contains common traits and macros.
use stylus_sdk::{alloy_primitives::{I256, U256}, console, prelude::*};

#[storage]
#[entrypoint]
struct BlackScholes;

/// Declare that `BlackScholes` is a contract with the following external methods.
#[public]
impl BlackScholes {
    /// Computes the Black-Scholes put option premium
    /// @param collateral_price - Current price of collateral (e.g., ETH price in USD)
    /// @param strike_price - Liquidation threshold for this specific user
    /// @param time_to_expiry - Time until option expires, in years (e.g., 0.019178 for 1 week)
    /// @return (mantissa, scale) - Put option premium in decimal representation
    pub fn compute_put_premium(
        &self, 
        collateral_price: U256,
        strike_price: U256,
        time_to_expiry: U256
    ) -> (I256, U256) {
        // Convert U256 inputs to Decimal with 18 decimal places
        let s: Decimal = u256_to_decimal(collateral_price, 18);
        let k: Decimal = u256_to_decimal(strike_price, 18);
        let t: Decimal = u256_to_decimal(time_to_expiry, 18);
        
        // Hardcoded parameters for MVP
        // r = risk-free interest rate (5%)
        let r: Decimal = dec!(0.05);
        // sigma = volatility (30% - conservative for crypto)
        let sigma: Decimal = dec!(0.30);
        
        let put_premium: Decimal = compute_put_option(s, k, r, sigma, t);
        let premium_str: String = put_premium.to_string();
        console!("Put premium: {} | S: {} | K: {} | T: {}", premium_str, s, k, t);
        
        let mantissa: I256 = I256::try_from(put_premium.mantissa()).unwrap();
        let scale: U256 = U256::from(put_premium.scale());
        (mantissa, scale)
    }
    
    /// Helper function to compute put premium with all Decimal inputs
    /// Useful for testing with pre-converted values
    pub fn compute_put_decimal(
        &self,
        collateral_price_mantissa: I256,
        collateral_price_scale: U256,
        time_to_expiry_mantissa: I256,
        time_to_expiry_scale: U256
    ) -> (I256, U256) {
        let s = decimal_from_parts(collateral_price_mantissa, collateral_price_scale);
        let t = decimal_from_parts(time_to_expiry_mantissa, time_to_expiry_scale);
        
        let k: Decimal = dec!(750.00);
        let r: Decimal = dec!(0.05);
        let sigma: Decimal = dec!(0.20);
        
        let put_premium: Decimal = compute_put_option(s, k, r, sigma, t);
        
        let mantissa: I256 = I256::try_from(put_premium.mantissa()).unwrap();
        let scale: U256 = U256::from(put_premium.scale());
        (mantissa, scale)
    }
}

/// Computes Black-Scholes put option premium
/// Formula: P = K * e^(-rT) * N(-d2) - S * N(-d1)
fn compute_put_option(
    stock: Decimal,      // Current collateral price (S)
    strike: Decimal,     // Strike price / liquidation threshold (K)
    rate: Decimal,       // Risk-free rate (r)
    sigma: Decimal,      // Volatility (σ)
    maturity: Decimal,   // Time to expiry (T)
) -> Decimal {
    let discount: Decimal = (-rate * maturity).exp();
    let sqrt_maturity: Decimal = maturity.sqrt().unwrap();
    let sqrt_maturity_sigma: Decimal = sqrt_maturity * sigma;
    let k_discount: Decimal = strike * discount;
    
    if sqrt_maturity_sigma > Decimal::ZERO {
        let d1: Decimal = d1(stock, strike, discount, sqrt_maturity_sigma);
        let d2: Decimal = d1 - sqrt_maturity_sigma;
        
        // For put option: N(-d2) and N(-d1)
        let cdf_neg_d1: Decimal = cum_norm(-d1);
        let cdf_neg_d2: Decimal = cum_norm(-d2);
        
        // Put formula: K * e^(-rT) * N(-d2) - S * N(-d1)
        k_discount * cdf_neg_d2 - stock * cdf_neg_d1
    } else {
        // If volatility or time is zero, intrinsic value only
        max_or_zero(strike - stock)
    }
}

/// Standard normal cumulative distribution function
fn cum_norm(x: Decimal) -> Decimal {
    let one: Decimal = Decimal::ONE;
    let two: Decimal = Decimal::TWO;
    let sqrt2: Decimal = two.sqrt().unwrap();
    (x / sqrt2).erf() * dec!(0.5) + dec!(0.5)
}

/// Computes d1 parameter for Black-Scholes
fn d1(
    s: Decimal,
    k: Decimal,
    discount: Decimal,
    sqrt_maturity_sigma: Decimal,
) -> Decimal {
    (s / (k * discount)).ln() / sqrt_maturity_sigma + dec!(0.5) * sqrt_maturity_sigma
}

/// Returns max of value and zero
fn max_or_zero(v: Decimal) -> Decimal {
    v.max(Decimal::ZERO)
}

/// Convert U256 to Decimal with specified decimal places
/// Example: U256(1500000000000000000000), decimals=18 → Decimal(1500.0)
fn u256_to_decimal(value: U256, decimals: u32) -> Decimal {
    // Convert U256 to string
    let value_str = value.to_string();
    
    // Parse as Decimal
    let mut decimal_value = Decimal::from_str(&value_str).unwrap_or(Decimal::ZERO);
    
    // Divide by 10^decimals to shift decimal point
    if decimals > 0 {
        let divisor = Decimal::from(10_u64.pow(decimals));
        decimal_value = decimal_value / divisor;
    }
    
    decimal_value
}

/// Reconstruct Decimal from mantissa and scale
fn decimal_from_parts(mantissa: I256, scale: U256) -> Decimal {
    let mantissa_i128 = i128::try_from(mantissa).unwrap_or(0);
    let scale_u32 = u32::try_from(scale).unwrap_or(0);
    Decimal::from_i128_with_scale(mantissa_i128, scale_u32)
}