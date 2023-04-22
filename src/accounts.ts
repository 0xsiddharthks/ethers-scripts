import { ethers } from "ethers";
import setup from "../utils/environment";

setup();

const ACCOUNT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const main = async () => {
  const provider = new ethers.AlchemyProvider(
    process.env.NETWORK,
    process.env.ALCHEMY_API_KEY
  );

  await provider.getBalance(ACCOUNT_ADDRESS).then((balance) => {
    console.log(
      `Account balance for ${ACCOUNT_ADDRESS} --> ${ethers.formatEther(
        balance
      )} ETH`
    );
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
