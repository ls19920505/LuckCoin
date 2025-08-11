
const { ethers } = require("hardhat");
async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Deployer:", await signer.getAddress());
  console.log("RPC:", process.env.RPC_URL);
  console.log("ChainId:", (await ethers.provider.getNetwork()).chainId);
  console.log("Balance:", await ethers.provider.getBalance(await signer.getAddress()));
}
main().catch(console.error);
