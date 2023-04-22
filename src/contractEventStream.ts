import { ethers } from "ethers";
import setup from "../utils/environment";
import { printAccountERC20Balance } from "../utils/account";
import {
  DAI_CONTRACT_ADDRESS_MAINNET,
  LINK_CONTRACT_ADDRESS_SEPOLIA,
} from "../constants";

setup();
const ERC_20_ABI = [
  // "function balanceOf(address) view returns (uint256)",
  "function symbol() view returns (string)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const main = async () => {
  const provider = new ethers.AlchemyProvider(
    process.env.NETWORK,
    process.env.ALCHEMY_API_KEY
  );

  const contract = new ethers.Contract(
    DAI_CONTRACT_ADDRESS_MAINNET,
    ERC_20_ABI,
    provider
  );

  const symbol = await contract.symbol();
  const currentBlock = await provider.getBlockNumber();

  // for querying historic events
  // const events = await contract.queryFilter(contract.filters.Transfer, -10);

  // for listening to ongoing events
  // starts a new listener, on a new thread
  contract.on("Transfer", (from, to, _amount, _event) => {
    const amount = ethers.formatEther(_amount);
    console.log(`${from} sent ${amount} ${symbol} to ${to}`);
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
