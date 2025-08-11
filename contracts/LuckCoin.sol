// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

/// @title LuckCoin (LUCK)
/// @notice 固定总量、可销毁，无任何交易税/黑名单/可暂停逻辑——上所友好
contract LuckCoin is ERC20, ERC20Burnable {
    // 默认 18 位小数；如需修改小数位，解除下面注释并改返回值
    // function decimals() public view override returns (uint8) { return 18; }

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply // 最小单位：若 10亿枚且18位小数= 10_0000_0000 * 10**18
    ) ERC20(name_, symbol_) {
        _mint(msg.sender, initialSupply);
    }
}
