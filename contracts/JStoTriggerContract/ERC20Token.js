// src/contracts/ERC20Token.js
import { signer } from '../config';
import { ethers } from 'ethers';


/***
 * NOTES :
 * 1. there are three solidity function so there should be three js functions to interact with the smart contract
 * 2. All functions will be async function to wait for smart contracts deployment
 * 3. parameters of all js functions should reflect solidity functions accordingly
 * 4. instead of calling the smart contract ABI I will listed the required functions to interact with in the erc20TokenABI const variable 
 * 5. ethers.Contract takes three params (address, ABI, and signer)
 * 
 */

// ERC20Token.js contract address is hard coded 
const erc20TokenAddress = "0x4b6d246ac54051cc225ab2c63ddcd8f90e1b812b";
const erc20TokenABI = [
    "function mint(address to, uint256 amount) public",
    "function burn(uint256 amount) public",
    //I have added the decimals() cuz I am worried will not work
    //The decimals function is just called by smart contract constructor itself to return 18 decimals 
    //we do not need to interact with this function 
    //this function can be deleted from the erc20TokenABI variable if we see it will not effect the overall functions 
    "function decimals() public view returns (uint8)",
];

//it should take (address, ABI, and signer)
const erc20TokenContract = new ethers.Contract(erc20TokenAddress, erc20TokenABI, signer);

//The solidity contract function with two param (address to, uint256 amount)
export async function mintTokens(to, amount) {
    try {
        const tx = await erc20TokenContract.mint(to, amount);
        const receipt = await tx.wait();
        console.log("Tokens minted with transaction hash:", receipt.transactionHash);
    } catch (error) {
        console.error("Error minting tokens:", error);
    }
}

//The solidity contract function with two param (uint256 amount)
export async function burnTokens(amount) {
    try {
        const tx = await erc20TokenContract.burn(amount);
        const receipt = await tx.wait();
        console.log("Tokens burned with transaction hash:", receipt.transactionHash);
    } catch (error) {
        console.error("Error burning tokens:", error);
    }
}
