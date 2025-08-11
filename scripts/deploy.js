const { ethers } = require("hardhat");

async function main() {
  // ===== 这里改你的参数 =====
  const NAME   = "LuckCoin";
  const SYMBOL = "LUCK";
  const DECIMALS = 18;
  const TOTAL = "1000000000"; // 10 亿
  // =========================

  const supply = ethers.parseUnits(TOTAL, DECIMALS);

  const Token = await ethers.getContractFactory("LuckCoin");
  const token = await Token.deploy(NAME, SYMBOL, supply);
  await token.waitForDeployment();

  console.log("LuckCoin deployed to:", await token.getAddress());
  console.log("Deployer:", (await ethers.getSigners())[0].address);
}

main().catch((e) => { console.error(e); process.exit(1); });
