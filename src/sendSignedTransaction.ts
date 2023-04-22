import { ethers } from "ethers";
import setup from "../utils/environment";
import { printAccountBalance } from "../utils/account";

setup();

const RECEIVER_ADDRESS = "0xd0a5ed1913b16b1233afed97df38535fe2560933";

const main = async () => {
  const provider = new ethers.AlchemyProvider(
    process.env.NETWORK,
    process.env.ALCHEMY_API_KEY
  );

  const signer = new ethers.Wallet(
    process.env.SIGNER_PRIVATE_KEY as string,
    provider
  );

  console.log("account balance before transaction: ");
  printAccountBalance(process.env.SIGNER_PUBLIC_KEY as string, provider);
  printAccountBalance(RECEIVER_ADDRESS as string, provider);

  const trx = await signer.sendTransaction({
    to: RECEIVER_ADDRESS,
    value: ethers.parseEther("0.001"),
  });
  await trx.wait();
  console.log(`transaction mined, hash: ${trx.hash}`);

  console.log("account balance after transaction: ");
  printAccountBalance(process.env.SIGNER_PUBLIC_KEY as string, provider);
  printAccountBalance(RECEIVER_ADDRESS as string, provider);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
