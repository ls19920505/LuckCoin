const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LuckCoin", function () {
  const NAME = "LuckCoin";
  const SYMBOL = "LUCK";
  const DECIMALS = 18;
  const TOTAL = "1000000000"; // 10亿

  async function deploy() {
    const [owner, alice, bob] = await ethers.getSigners();
    const supply = ethers.parseUnits(TOTAL, DECIMALS);
    const Token = await ethers.getContractFactory("LuckCoin");
    const token = await Token.deploy(NAME, SYMBOL, supply);
    await token.waitForDeployment();
    return { token, owner, alice, bob, supply };
  }

  it("部署正确并把总量给到owner", async () => {
    const { token, owner, supply } = await deploy();
    expect(await token.name()).to.equal(NAME);
    expect(await token.symbol()).to.equal(SYMBOL);
    expect(await token.decimals()).to.equal(DECIMALS);
    expect(await token.totalSupply()).to.equal(supply);
    expect(await token.balanceOf(await owner.getAddress())).to.equal(supply);
  });

  it("转账与事件", async () => {
    const { token, owner, alice } = await deploy();
    const amt = ethers.parseUnits("100", DECIMALS);
    await expect(token.transfer(await alice.getAddress(), amt))
      .to.emit(token, "Transfer")
      .withArgs(await owner.getAddress(), await alice.getAddress(), amt);
    expect(await token.balanceOf(await alice.getAddress())).to.equal(amt);
  });

  it("授权与transferFrom", async () => {
    const { token, owner, alice, bob } = await deploy();
    const amt = ethers.parseUnits("50", DECIMALS);
    await token.approve(await bob.getAddress(), amt);
    await token.connect(bob).transferFrom(
      await owner.getAddress(),
      await alice.getAddress(),
      amt
    );
    expect(await token.balanceOf(await alice.getAddress())).to.equal(amt);
  });

  it("销毁会减少总量", async () => {
    const { token } = await deploy();
    const burn = ethers.parseUnits("10", DECIMALS);
    const before = await token.totalSupply();
    await token.burn(burn);
    expect(await token.totalSupply()).to.equal(before - burn);
  });

  it("余额不足时转账应失败", async () => {
    const { token, owner, alice } = await deploy();
    await expect(
      token.connect(alice).transfer(await owner.getAddress(), 1n)
    ).to.be.reverted;
  });
});
