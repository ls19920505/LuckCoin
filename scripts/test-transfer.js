const { ethers } = require("hardhat");

async function main() {
  const args = process.argv.slice(2);
  if (args[0] === "--") args.shift();
  const [addr, toRaw, amountInput] = args;
  if (!addr || !toRaw || !amountInput) {
    console.error(
      "Usage: npx hardhat run --network <network> scripts/test-transfer.js -- <tokenAddress> <to> <amount>"
    );
    return;
  }

  const tokenAddr = ethers.getAddress(addr);
  const to = ethers.getAddress(toRaw);

  const [signer] = await ethers.getSigners();
  const token = await ethers.getContractAt("LuckCoin", tokenAddr, signer);

  const decimals = await token.decimals();
  const amount = ethers.parseUnits(amountInput, decimals);

  const from = await signer.getAddress();
  console.log(`Transferring ${amountInput} tokens from ${from} to ${to}...`);

  const beforeFrom = await token.balanceOf(from);
  const beforeTo = await token.balanceOf(to);

  // 预执行 + 发送
  await token.transfer.staticCall(to, amount);
  const tx = await token.transfer(to, amount);
  console.log("tx:", tx.hash);
  await tx.wait();
  console.log("done");

  const afterFrom = await token.balanceOf(from);
  const afterTo = await token.balanceOf(to);
  console.log(
    `Sender balance: ${ethers.formatUnits(beforeFrom, decimals)} -> ${ethers.formatUnits(afterFrom, decimals)}`
  );
  console.log(
    `Recipient balance: ${ethers.formatUnits(beforeTo, decimals)} -> ${ethers.formatUnits(afterTo, decimals)}`
  );
}
main().catch(console.error);
