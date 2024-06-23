// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

error InvalidEtherSent(uint256 amountSent, uint256 requiredAmount);

contract Presale is OwnableUpgradeable {
    IERC20 public token;

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
        token = IERC20(token_);
        price = price_;
    }

    function contribute(uint256 amount) external payable {
        uint256 total = amount * price;

        require(
            total == msg.value,
            InvalidEtherSent(msg.value, total)
        );

        token
    }

    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawToken(address token_) external onlyOwner {
        IERC20(token_).transfer(owner(), token.balanceOf(address(this)));
    }
}
