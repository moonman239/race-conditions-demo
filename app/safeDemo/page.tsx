"use client";
import { useEffect,useState } from "react";
import { runSafeDemo } from "./safe";
import { DemoResult } from "../DemoResult";
export default function SafeDemoComponent() {
  const [data,setData] = useState<DemoResult | null>(null);
  useEffect(()=>{
    const showResults = async ()=>{
      setData(await runSafeDemo());
    };
    showResults();
  },[])
  
  return (
    <div>
      Attempting 50 simulated withdrawals of $5
      <br/>
      Number of successful withdrawals, as reported by demo code: {data?.successfulWithdrawals}
      <br/>
      Account balance, as reported by demo code: {data?.simulatedBalance}
    </div>
  );
}
