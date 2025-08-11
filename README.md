# LuckCoin

Solidity ERC-20 token with fixed supply, burnable, and no transfer taxes.

## Contract

The contract is located at `contracts/LuckCoin.sol` and uses OpenZeppelin's ERC20 implementation.

## Build

This repository does not include a build system. Install [Hardhat](https://hardhat.org/) and OpenZeppelin contracts to compile:

```bash
npm install --save-dev hardhat @openzeppelin/contracts
npx hardhat compile
```
