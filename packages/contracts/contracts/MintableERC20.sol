// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract MintableERC20 is ERC20Upgradeable, AccessControlUpgradeable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    address public presaleAddress;

    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin_,
        address minter_,
        string calldata name_,
        string calldata symbol_,
        uint256 initialSupply_
    ) external initializer {
        __ERC20_init(name_, symbol_);
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin_);
        _grantRole(MINTER_ROLE, minter_);
        _mint(defaultAdmin_, initialSupply_);
        presaleAddress = minter_;
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}
