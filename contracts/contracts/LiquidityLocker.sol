// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidityLocker is Ownable {
    // Struct to represent a lock of liquidity
    struct Lock {
        address token;       // Address of the ERC20 token being locked
        uint256 amount;      // Amount of tokens being locked
        uint256 unlockTime;  // Timestamp when the locked tokens can be unlocked
    }

    // Mapping to track multiple locks per user
    mapping(address => Lock[]) public locks;

    // Constructor
    constructor() Ownable(msg.sender) {} // Pass msg.sender to Ownable constructor

    // Function to lock liquidity by the owner
    function lockLiquidity(address token, uint256 amount, uint256 lockTime) external onlyOwner {
        require(lockTime > block.timestamp, "Invalid lock time");
        IERC20(token).transferFrom(msg.sender, address(this), amount); // Transfer tokens from owner to this contract
        locks[msg.sender].push(Lock(token, amount, lockTime)); // Record the lock details
    }

    // Function to unlock liquidity by the owner
    function unlockLiquidity(uint256 index) external {
        require(index < locks[msg.sender].length, "Invalid index");
        Lock storage userLock = locks[msg.sender][index];
        require(block.timestamp >= userLock.unlockTime, "Lock period not over");
        IERC20(userLock.token).transfer(msg.sender, userLock.amount); // Transfer locked tokens back to the owner
        removeLock(msg.sender, index); // Remove the lock record
    }

    // Internal function to remove a lock from the mapping
    function removeLock(address user, uint256 index) internal {
        locks[user][index] = locks[user][locks[user].length - 1]; // Move the last element to the position of the removed lock
        locks[user].pop(); // Remove the last element
    }
}

// this contract is deployed on SepoliaETH TestNet 
// The contract address is 0xdc131c0e552a49a12b900f4d61acffba07558c2d