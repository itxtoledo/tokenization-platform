// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract MintableERC20 is ERC20Upgradeable, OwnableUpgradeable {
    constructor() {
        _disableInitializers();
    }
    
    function initialize(
        address owner_,
        string calldata name_,
        string calldata symbol_,
        uint256 initialSupply_
    ) external initializer {
        __ERC20_init(name_, symbol_);
        __Ownable_init(owner_);
        transferOwnership(owner_);
        _mint(owner_, initialSupply_);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}