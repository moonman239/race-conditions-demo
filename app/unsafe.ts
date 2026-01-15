import { DemoData } from "./DemoDataType";

// unsafe.js
const delay = (ms:number) => new Promise((r) => setTimeout(r, ms));

let balance = 100;

export async function runUnsafeDemo(): Promise<DemoData> {
  balance = 100;

  async function withdraw(amount:number) {
    const current = balance;

    // Yield control – creates the race window
    await delay(Math.floor(Math.random() * 100));

    if (current >= amount) {
      balance = current - amount;
      return true;
    }
    return false;
  }

  const withdrawals = Array.from({ length: 50 }, () => withdraw(5));
  const results = await Promise.all(withdrawals);

  return {
    numSuccessfulWithdrawals: results.filter(Boolean).length,
    finalBalance: balance,
  };
}
