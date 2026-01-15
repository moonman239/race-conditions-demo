"use client";
import { useEffect,useState } from "react";
import {runUnsafeDemo} from "./unsafe";
import { DemoResult } from "../DemoResult";
export default function UnsafeDemoComponent() {
  const [result,setResult] = useState<DemoResult | null>(null);
  useEffect(()=>{
    const showResults = async ()=>{
      setResult(await runUnsafeDemo());
    };
    showResults();
  },[])
  
  return (
    <div>
      Attempting 50 simulated withdrawals of $5
      <br/>
      Number of successful withdrawals, as reported by demo code: {result?.successfulWithdrawals}
      <br/>
      Account balance, as reported by demo code: {result?.simulatedBalance}
    </div>
  );
}
