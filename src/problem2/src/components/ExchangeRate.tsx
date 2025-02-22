import React from "react";

interface ExchangeRateProps {
  fromToken: string;
  toToken: string;
  prices: { currency: string; price: number }[];
}

const ExchangeRate: React.FC<ExchangeRateProps> = ({
  fromToken,
  toToken,
  prices,
}) => {
  if (!fromToken || !toToken) return null;

  const fromPrice = prices.find((p) => p.currency === fromToken)?.price || 0;
  const toPrice = prices.find((p) => p.currency === toToken)?.price || 0;

  if (!fromPrice || !toPrice) return null;

  const rate = fromPrice / toPrice;

  return (
    <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Exchange Rate</span>
        <span className="text-white font-medium">
          1 {fromToken} = {rate.toFixed(6)} {toToken}
        </span>
      </div>
    </div>
  );
};

export default ExchangeRate;
