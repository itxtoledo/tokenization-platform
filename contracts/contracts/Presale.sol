// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Presale is Ownable {

    using SafeMath for uint256;

    // Stating what I think important variables
    IERC20 public token; // Instance of the ERC20 token being sold in the presale.
    uint256 public startTime;// Timestamps defining the start and end times of the presale.
    uint256 public endTime;
    uint256 public softCap;// Minimum and maximum amounts of funds (in wei) that the presale aims to raise.
    uint256 public hardCap;
    uint256 public totalRaised;//Cumulative amount of funds raised during the presale.
    mapping(address => uint256) public contributions;//Mapping to track each contributor's contribution amount.

    // Constructor
    // I will Pass msg.sender to Ownable constructor
    constructor(
        address _token,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _softCap,
        uint256 _hardCap
    ) Ownable(msg.sender) 
    {
        token = IERC20(_token);
        startTime = _startTime;
        endTime = _endTime;
        softCap = _softCap;
        hardCap = _hardCap;
    }

    // External function for contributors to participate in the presale
    function contribute() external payable {
        //The presale should be active
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Presale not active");
        //should be less or equal hardcap
        require(totalRaised.add(msg.value) <= hardCap, "Exceeds hard cap");
        contributions[msg.sender] = contributions[msg.sender].add(msg.value);
        //updating the raised value 
        totalRaised = totalRaised.add(msg.value);
    }

    // External function for the owner to withdraw funds after the presale ends
    function withdrawFunds() external onlyOwner {
        //the presale should end first 
        require(block.timestamp > endTime, "Presale not ended");
        //total raised should be greater than or equal softcap
        require(totalRaised >= softCap, "Soft cap not reached");
        payable(owner()).transfer(address(this).balance); // Transfer all Ether balance to the owner address(this)
        token.transfer(owner(), token.balanceOf(address(this))); // Transfer all token balance to the owner address(this)
    }

    // External function for contributors to claim a refund if the presale fails to reach soft cap as the condition requires totalRaised >= softCap
    function refund() external {
        //The presale should not be ended 
        require(block.timestamp > endTime, "Presale not ended");
        //the total raised should be less than softcap
        require(totalRaised < softCap, "Soft cap reached");
        uint256 amount = contributions[msg.sender];//assigning the contribution amout to variable 
        contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amount); // Refund the contributed Ether amount to the contributor
    }
}

// this contract is deployed on SepoliaETH TestNet 
// The contract address is 0x4b6d246ac54051cc225ab2c63ddcd8f90e1b812b