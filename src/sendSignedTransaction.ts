import { ethers } from "ethers";
import setup from "../utils/environment";

setup();

const RECEIVER_ADDRESS = "0xd0a5ed1913b16b1233afed97df38535fe2560933";

const printAccountBalance = async (
  account_address: ethers.AddressLike,
  provider: ethers.Provider
) => {
  await provider.getBalance(account_address).then((balance) => {
    console.log(
      `Account balance for ${account_address} --> ${ethers.formatEther(
        balance
      )} ETH`
    );
  });
};

const main = async () => {
  const provider = new ethers.AlchemyProvider(
    process.env.NETWORK,
    process.env.ALCHEMY_API_KEY
  );

  const wallet = new ethers.Wallet(
    process.env.WALLET_PRIVATE_KEY as string,
    provider
  );

  console.log("account balance before transaction: ");
  printAccountBalance(process.env.WALLET_PUBLIC_KEY as string, provider);
  printAccountBalance(RECEIVER_ADDRESS as string, provider);

  const trx = await wallet.sendTransaction({
    to: RECEIVER_ADDRESS,
    value: ethers.parseEther("0.001"),
  });
  await trx.wait();
  console.log(`transaction mined, hash: ${trx.hash}`);

  console.log("account balance after transaction: ");
  printAccountBalance(process.env.WALLET_PUBLIC_KEY as string, provider);
  printAccountBalance(RECEIVER_ADDRESS as string, provider);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
