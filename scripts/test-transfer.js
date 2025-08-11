const { ethers } = require("hardhat");

async function main() {
  const addr = "0x15Beb508c8768A8c15749815F53d170b567cE0BA";
  const toRaw = "0x47b4544320fe2e9c394c6045ec652e3b1e2743f"; // 先用全小写
  const to = ethers.getAddress(toRaw); // 规范化为正确校验和地址

  const [signer] = await ethers.getSigners();
  const token = await ethers.getContractAt("LuckCoin", addr, signer);

  const decimals = await token.decimals();
  const amount = ethers.parseUnits("10", decimals);

  // 预执行 + 发送
  await token.transfer.staticCall(to, amount);
  const tx = await token.transfer(to, amount);
  console.log("tx:", tx.hash);
  await tx.wait();
  console.log("done");
}
main().catch(console.error);
