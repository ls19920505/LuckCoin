const { ethers } = require("hardhat");
(async () => {
  const addr = "0x15Beb508c8768A8c15749815F53d170b567cE0BA";
  const t = await ethers.getContractAt("LuckCoin", addr);
  const [signer] = await ethers.getSigners();
  console.log("name:", await t.name());
  console.log("symbol:", await t.symbol());
  console.log("decimals:", await t.decimals());
  console.log("total:", ethers.formatEther(await t.totalSupply()));
  console.log("my balance:", ethers.formatEther(await t.balanceOf(await signer.getAddress())));
})();
