import { ethers } from "ethers";

export const printAccountBalance = async (
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

export const printAccountERC20Balance = async (
  address: string,
  contract: ethers.Contract
) => {
  const balance = await contract.balanceOf(address);
  const symbol = await contract.symbol();
  console.log(
    `Account balance for ${address} --> ${ethers.formatEther(
      balance
    )} ${symbol}`
  );
};
