"use client";

import { useState, useEffect } from "react";
import { ArrowDownUp } from "lucide-react";

import { fetchPrices, TokenPrice } from "./lib";
import { SwapForm, TokenSelect } from "./components";

export default function App() {
  const [prices, setPrices] = useState<TokenPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getPrices = async () => {
      const data = await fetchPrices();
      setPrices(data);
    };
    getPrices();
  }, []);

  const calculateToAmount = (amount: string) => {
    if (!fromToken || !toToken || !amount) {
      setToAmount("");
      return;
    }

    const fromPrice = prices.find((p) => p.currency === fromToken)?.price || 0;
    const toPrice = prices.find((p) => p.currency === toToken)?.price || 0;

    if (!fromPrice || !toPrice) {
      setError("Invalid token pair");
      return;
    }

    const rate = fromPrice / toPrice;
    setToAmount((Number.parseFloat(amount) * rate).toFixed(6));
  };

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromToken || !toToken || !fromAmount) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    setFromAmount("");
    setToAmount("");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/30 blur-[100px]" />
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-500/30 blur-[100px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-500/30 blur-[100px]" />
        </div>
      </div>

      <SwapForm />
    </div>
  );
}
