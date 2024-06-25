// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./MintableERC20.sol";

error InvalidEtherSent(uint256 amountSent, uint256 requiredAmount);

contract Presale is OwnableUpgradeable {
    MintableERC20 public token;

    uint256 price;

    constructor() {
        _disableInitializers();
    }

    function initialize(
        address owner_,
        address token_,
        uint256 price_
    ) external initializer {
        __Ownable_init(owner_);
        token = MintableERC20(token_);
        price = price_;
    }

    function contribute(uint256 amount) external payable {
        uint256 total = amount * price;

        if (total != msg.value) revert InvalidEtherSent(msg.value, total);

        token.mint(msg.sender, amount);
    }

    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawToken(address token_) external onlyOwner {
        IERC20(token_).transfer(owner(), token.balanceOf(address(this)));
    }
}
