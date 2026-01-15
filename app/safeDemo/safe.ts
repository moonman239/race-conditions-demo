// safe.ts
// Demonstrates preventing a race condition using a mutex
// (a semaphore with a count of 1)

import { DemoResult } from "../DemoResult";
import Semaphore from "./Semaphore";

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mutex = semaphore with a count of 1
const mutex = new Semaphore(1);

// Demo-only shared state (in-memory simulation)
let simulatedBalance: number = 100;


export async function runSafeDemo(): Promise<DemoResult> {
  // Reset for each run so results are predictable
  simulatedBalance = 100;

  async function withdraw(amount: number): Promise<boolean> {
    return mutex.use(async () => {
      const current = simulatedBalance;

      // Artificial delay to mirror the unsafe demo
      await delay(Math.floor(Math.random() * 100));

      if (current >= amount) {
        simulatedBalance = current - amount;
        return true;
      }

      return false;
    });
  }

  // 50 parallel withdrawals of $5
  const withdrawals = Array.from({ length: 50 }, () => withdraw(5));
  const results = await Promise.all(withdrawals);

  return {
    successfulWithdrawals: results.filter(Boolean).length,
    simulatedBalance,
  };
}
