import { ethers } from "ethers";
import setup from "../utils/environment";

setup();

const main = async () => {
  const provider = new ethers.AlchemyProvider(
    process.env.NETWORK,
    process.env.ALCHEMY_API_KEY
  );

  const blockNumber = await provider.getBlockNumber();
  const blockInfo = await provider.getBlock(blockNumber);

  console.log("Latest Block: ", blockInfo);
  const firstTrxHash = blockInfo?.transactions[0];
  const trx = await provider.getTransaction(firstTrxHash as string);
  console.log("Transaction #0: ", trx);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
