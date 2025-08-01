// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./MintableERC20.sol";

error InvalidEtherSent(uint256 amountSent, uint256 requiredAmount);
error PresaleNotActive();
error HardCapExceeded(uint256 currentContribution, uint256 maxContribution);

contract Presale is OwnableUpgradeable {
    MintableERC20 public token;

    uint256 public price;
    uint256 public hardCap;
    uint256 public softCap;
    uint256 public startTime;
    uint256 public endTime;

    uint256 public totalContributed;

    event NewContribution(address indexed contributor, uint256 amount);
    event EtherWithdrawn(address indexed to, uint256 amount);
    event TokenWithdrawn(address indexed to, uint256 amount);

    constructor() {
        _disableInitializers();
    }

    function initialize(
        address owner_,
        address token_,
        uint256 price_,
        uint256 hardCap_,
        uint256 softCap_,
        uint256 startTime_,
        uint256 endTime_
    ) external initializer {
        __Ownable_init(owner_);
        token = MintableERC20(token_);
        price = price_;
        hardCap = hardCap_;
        softCap = softCap_;
        startTime = startTime_;
        endTime = endTime_;
    }

    function contribute(uint256 amount) external payable {
        if (block.timestamp < startTime || block.timestamp > endTime) revert PresaleNotActive();

        uint256 total = amount * price;

        if (total != msg.value) revert InvalidEtherSent(msg.value, total);

        if (totalContributed + msg.value > hardCap) revert HardCapExceeded(totalContributed, hardCap);

        totalContributed += msg.value;

        token.mint(msg.sender, amount * 10 ** token.decimals());

        emit NewContribution(msg.sender, amount);
    }

    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);

        emit EtherWithdrawn(owner(), address(this).balance);
    }

    function withdrawToken(address token_) external onlyOwner {
        MintableERC20(token_).transfer(owner(), token.balanceOf(address(this)));

        emit TokenWithdrawn(owner(), token.balanceOf(address(this)));
    }
}
