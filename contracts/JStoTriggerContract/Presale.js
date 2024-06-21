// src/contracts/Presale.js
import { signer } from '../config';
import { ethers } from 'ethers';

/***
 * NOTES :
 * 1. there are three solidity function so there should be three js functions to interact with the smart contract
 * 2. All functions will be async function to wait for smart contracts deployment
 * 3. parameters of all js functions should reflect solidity functions accordingly
 * 4. instead of calling the smart contract ABI I will listed the required functions to interact with in the presaleABI const variable 
 * 5. ethers.Contract takes three params (address, ABI, and signer)
 * 
 */

//hard code the smart contract address 
const presaleAddress = "0x4b6d246ac54051cc225ab2c63ddcd8f90e1b812b";
const presaleABI = [
    "function contribute() external payable",
    "function withdrawFunds() external",
    "function refund() external",
];

//it should take (address, ABI, and signer)
const presaleContract = new ethers.Contract(presaleAddress, presaleABI, signer);

//I will add one amount parameter is the amount of Ether to be sent in the transaction.
//and then the smart contract function will consider this as contribution 
export async function contribute(amount) {
    try {
        const tx = await presaleContract.contribute({ value: ethers.utils.parseEther(amount) });
        const receipt = await tx.wait();
        console.log("Contribution made with transaction hash:", receipt.transactionHash);
    } catch (error) {
        console.error("Error contributing:", error);
    }
}

//no parameter required 
export async function withdrawFunds() {
    try {
        const tx = await presaleContract.withdrawFunds();
        const receipt = await tx.wait();
        console.log("Funds withdrawn with transaction hash:", receipt.transactionHash);
    } catch (error) {
        console.error("Error withdrawing funds:", error);
    }
}

//no parameter required 
export async function refund() {
    try {
        const tx = await presaleContract.refund();
        const receipt = await tx.wait();
        console.log("Refund claimed with transaction hash:", receipt.transactionHash);
    } catch (error) {
        console.error("Error claiming refund:", error);
    }
}
