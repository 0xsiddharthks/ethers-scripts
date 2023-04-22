import { ethers } from "ethers";
import setup from "../utils/environment";

setup();

const DAI_CONTRACT_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f";
const ERC_20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
];

const main = async () => {
  const provider = new ethers.AlchemyProvider(
    process.env.NETWORK,
    process.env.ALCHEMY_API_KEY
  );

  const contract = new ethers.Contract(
    DAI_CONTRACT_ADDRESS,
    ERC_20_ABI,
    provider
  );

  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const balance = await contract.balanceOf(DAI_CONTRACT_ADDRESS);

  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total supply: ${ethers.formatEther(totalSupply)}`);
  console.log(`Balance: ${ethers.formatEther(balance)}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
