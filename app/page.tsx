"use client";
import { useEffect,useState } from "react";
import {runUnsafeDemo} from "./unsafe";
import { DemoData } from "./DemoDataType";
export default function Home() {
  const [data,setData] = useState<DemoData | null>(null);
  useEffect(()=>{
    const showResults = async ()=>{
      setData(await runUnsafeDemo());
    };
    showResults();
  },[])
  
  return (
    <div>
      Unsafe withdrawals: {data?.numSuccessfulWithdrawals}
      Unsafe balance: {data?.finalBalance}
    </div>
  );
}
