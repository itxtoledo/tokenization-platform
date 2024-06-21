// src/contracts/LiquidityLocker.js
import { signer } from '../config';
import { ethers } from 'ethers';

/***
 * 
 * 1. there are three solidity function so there should be three js functions to interact with the smart contract
 * 2. All functions will be async function to wait for smart contracts deployment
 * 3. parameters of all js functions should reflect solidity functions accordingly
 * 4. instead of calling the smart contract ABI I will listed the required functions to interact with in the liquidityLockerABI const variable 
 * 
 */

//hard code the smart contract address 
const liquidityLockerAddress = "0xdc131c0e552a49a12b900f4d61acffba07558c2d";
const liquidityLockerABI = [
    "function lockLiquidity(address token, uint256 amount, uint256 lockTime) external",
    "function unlockLiquidity(uint256 index) external",
    "function locks(address owner, uint256 index) external view returns (address token, uint256 amount, uint256 unlockTime)",
];

//it should take (address, ABI, and signer)
const liquidityLockerContract = new ethers.Contract(liquidityLockerAddress, liquidityLockerABI, signer);

//function should take the params (address token, uint256 amount, uint256 lockTime)
export async function lockLiquidity(tokenAddress, amount, lockTime) {
    try {
        const tx = await liquidityLockerContract.lockLiquidity(tokenAddress, amount, lockTime);
        const receipt = await tx.wait();
        console.log("Liquidity locked with transaction hash:", receipt.transactionHash);
    } catch (error) {
        console.error("Error locking liquidity:", error);
    }
}

//function should take param (uint256 index) 
export async function unlockLiquidity(index) {
    try {
        const tx = await liquidityLockerContract.unlockLiquidity(index);
        const receipt = await tx.wait();
        console.log("Liquidity unlocked with transaction hash:", receipt.transactionHash);
    } catch (error) {
        console.error("Error unlocking liquidity:", error);
    }
}

//function should take param (address owner, uint256 index) 
export async function getLockDetails(ownerAddress, index) {
    try {
        const lockDetails = await liquidityLockerContract.locks(ownerAddress, index);
        console.log(`Lock details for owner ${ownerAddress} at index ${index}:`, lockDetails);
        return lockDetails;
    } catch (error) {
        console.error("Error getting lock details:", error);
    }
}