import { ethers } from "ethers";
import setup from "../utils/environment";
import { printAccountERC20Balance } from "../utils/account";
import { LINK_CONTRACT_SEPOLIA_ADDRESS } from "../constants";

setup();

const RECEIVER_ADDRESS = "0xd0a5ed1913b16b1233afed97df38535fe2560933";
const ERC_20_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function symbol() view returns (string)",
  "function transfer(address to, uint amount) returns (bool)",
];

const main = async () => {
  const provider = new ethers.AlchemyProvider(
    process.env.NETWORK,
    process.env.ALCHEMY_API_KEY
  );

  const signer = new ethers.Wallet(
    process.env.WALLET_PRIVATE_KEY as string,
    provider
  );

  const contract = new ethers.Contract(
    LINK_CONTRACT_SEPOLIA_ADDRESS,
    ERC_20_ABI,
    provider
  );

  const contractAsSigner = new ethers.Contract(
    LINK_CONTRACT_SEPOLIA_ADDRESS,
    ERC_20_ABI,
    signer
  );

  console.log("account balance before transaction: ");
  printAccountERC20Balance(process.env.WALLET_PUBLIC_KEY as string, contract);
  printAccountERC20Balance(RECEIVER_ADDRESS, contract);

  const trx = await contractAsSigner.transfer(
    RECEIVER_ADDRESS,
    ethers.parseEther("0.1")
  );
  await trx.wait();
  console.log(`transaction mined, hash: ${trx.hash}`);

  console.log("account balance after transaction: ");
  printAccountERC20Balance(process.env.WALLET_PUBLIC_KEY as string, contract);
  printAccountERC20Balance(RECEIVER_ADDRESS, contract);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
