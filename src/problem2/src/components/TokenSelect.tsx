"use client";

import { ChevronDownIcon, SearchIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface TokenSelectProps {
  value: string;
  onChange: (value: string) => void;
  tokens: string[];
}

export default function TokenSelect({
  value,
  onChange,
  tokens,
}: TokenSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredTokens = tokens.filter((token) =>
    token.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 hover:bg-white/10 
                 border border-white/10 hover:border-white/20 transition-all duration-200 group w-full"
      >
        {value ? (
          <>
            <img
              src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${value}.svg`}
              alt={value}
              className="w-7 h-7 rounded-full bg-white/10 p-1"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg";
              }}
            />
            <span className="text-white font-medium">{value}</span>
          </>
        ) : (
          <span className="text-gray-400">Select token</span>
        )}
        <ChevronDownIcon className="w-5 h-5 text-gray-400 ml-auto group-hover:text-white transition-colors" />
      </button>

      {open && (
        <div
          className="absolute top-full mt-2 w-full bg-black/50 backdrop-blur-xl rounded-2xl 
                      shadow-[0_0_40px_rgba(0,0,0,0.2)] border border-white/20 p-2 z-50"
        >
          {/* Search */}
          <div className="relative mb-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tokens..."
              className="w-full bg-white/5 rounded-xl px-4 py-2 pl-10 text-white placeholder-gray-400 
                       outline-none border border-white/10 focus:border-white/20 transition-colors"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Token List */}
          <div className="max-h-60 overflow-auto space-y-1 custom-scrollbar">
            {filteredTokens.length === 0 ? (
              <div className="text-gray-400 text-center py-2">
                No tokens found
              </div>
            ) : (
              filteredTokens.map((token) => (
                <button
                  key={token}
                  type="button"
                  onClick={() => {
                    onChange(token);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-xl hover:bg-white/10 
                           transition-colors group"
                >
                  <img
                    src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token}.svg`}
                    alt={token}
                    className="w-8 h-8 rounded-full bg-white/5 p-1 group-hover:bg-white/10 transition-colors"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg";
                    }}
                  />
                  <div className="text-left">
                    <div className="text-white font-medium">{token}</div>
                    <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      {token}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
