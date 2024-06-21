// src/contracts/PresaleFactory.js
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
const presaleFactoryAddress = "0x80a2e497f39426eac80cb493509c31f7c1b397cc";
const presaleFactoryABI = [
    "function createPresale(address token, uint256 startTime, uint256 endTime, uint256 softCap, uint256 hardCap) external",
];

//it should take (address, ABI, and signer)
const presaleFactoryContract = new ethers.Contract(presaleFactoryAddress, presaleFactoryABI, signer);

//The function takes params (address indexed presale, address indexed token, uint256 startTime, uint256 endTime, uint256 softCap, uint256 hardCap)
//assuming the contract address is unchangeable (address indexed presale) I will not take it as parameter
export async function createPresale(tokenAddress, startTime, endTime, softCap, hardCap) {
    try {
        const tx = await presaleFactoryContract.createPresale(tokenAddress, startTime, endTime, softCap, hardCap);
        const receipt = await tx.wait();
        console.log("Presale created with transaction hash:", receipt.transactionHash);
    } catch (error) {
        console.error("Error creating presale:", error);
    }
}
