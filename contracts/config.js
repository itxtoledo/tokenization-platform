// src/config.js
import { ethers } from 'ethers';

export const providerURL = "https://sepolia.infura.io/v3/3f5461f8964148eea0eec00b106f503c"; // Infura project API ID
export const provider = new ethers.providers.JsonRpcProvider(providerURL, {
    chainId: 11155111,//this is sepoliaETH for now 
    name: "sepolia",
});

//Hard coded my Metamask private key of sepoliaETH test Net
export const privateKey = "5d1193cbc7fa6a8df4173c6ab3c85355cb3e2099a384f0040ae920b122e1c339"; 
export const signer = new ethers.Wallet(privateKey, provider);
