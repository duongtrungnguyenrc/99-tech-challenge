"use client";

import { useEffect, useCallback, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { useForm } from "react-hook-form";

import { fetchPrices, TokenPrice } from "../lib";
import TokenSelect from "./TokenSelect";
import ExchangeRate from "./ExchangeRate";

interface SwapFormData {
  fromAmount: string;
  fromToken: string;
  toToken: string;
}

export default function SwapForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SwapFormData>({
    defaultValues: { fromAmount: "", fromToken: "", toToken: "" },
  });

  const fromAmount = watch("fromAmount");
  const fromToken = watch("fromToken");
  const toToken = watch("toToken");

  const [prices, setPrices] = useState<TokenPrice[]>([]);

  useEffect(() => {
    fetchPrices().then(setPrices);
  }, []);

  const toAmount = (() => {
    if (!fromToken || !toToken || !fromAmount) return "";
    const fromPrice = prices.find((p) => p.currency === fromToken)?.price || 0;
    const toPrice = prices.find((p) => p.currency === toToken)?.price || 0;
    return fromPrice && toPrice
      ? (Number(fromAmount) * (fromPrice / toPrice)).toFixed(6)
      : "";
  })();

  const onSubmit = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setValue("fromAmount", "");
  }, [setValue]);

  return (
    <div className="relative w-full max-w-md">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Swap Tokens
        </h1>
        <p className="text-gray-400 text-sm text-center">
          Trade tokens instantly
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          {/* From Token */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">From</label>
            <div className="p-4 bg-black/30 rounded-2xl border border-white/10">
              <TokenSelect
                value={fromToken}
                onChange={(val) => setValue("fromToken", val)}
                tokens={prices.map((p) => p.currency)}
              />
              <input
                {...register("fromAmount", {
                  required: "Enter amount",
                  min: 0.0001,
                })}
                type="number"
                placeholder="0.00"
                className="w-full bg-transparent text-2xl text-white placeholder-gray-500 outline-none mt-2"
              />
              {errors.fromAmount && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.fromAmount.message}
                </p>
              )}
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => {
                setValue("fromToken", toToken);
                setValue("toToken", fromToken);
                setValue("fromAmount", toAmount);
              }}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              <ArrowDownUp className="w-5 h-5 text-white/70" />
            </button>
          </div>

          {/* To Token */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">To</label>
            <div className="p-4 bg-black/30 rounded-2xl border border-white/10">
              <TokenSelect
                value={toToken}
                onChange={(val) => setValue("toToken", val)}
                tokens={prices.map((p) => p.currency)}
              />
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.00"
                className="w-full bg-transparent text-2xl text-white placeholder-gray-500 outline-none mt-2"
              />
            </div>
          </div>

          {/* Exchange Rate */}
          <ExchangeRate
            fromToken={fromToken}
            toToken={toToken}
            prices={prices}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !fromToken || !toToken || !fromAmount}
            className="w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? "Swapping..." : "Confirm Swap"}
          </button>
        </form>
      </div>
    </div>
  );
}
