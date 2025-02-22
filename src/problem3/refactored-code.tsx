enum EBlockChain {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: EBlockChain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const blockchainPriority: Record<EBlockChain, number> = {
  [EBlockChain.Osmosis]: 100,
  [EBlockChain.Ethereum]: 50,
  [EBlockChain.Arbitrum]: 30,
  [EBlockChain.Zilliqa]: 20,
  [EBlockChain.Neo]: 20,
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: EBlockChain): number => {
    return blockchainPriority[blockchain] ?? -99;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => getPriority(balance.blockchain) > -99)
      .sort(
        (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
    (balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
    })
  );

  return (
    <div {...rest}>
      {formattedBalances.map((balance, index) => (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={prices[balance.currency] * balance.amount}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};
