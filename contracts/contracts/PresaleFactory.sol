// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

// Importing Presale contract
import "./Presale.sol";

contract PresaleFactory {
    
    // Event emitted when a new Presale contract is created
    // I used indexed for efficient filtering and searching
    event PresaleCreated(address indexed presale, address indexed token, uint256 startTime, uint256 endTime, uint256 softCap, uint256 hardCap);

    // Function to create a new Presale contract
    function createPresale(
        address token,
        uint256 startTime,
        uint256 endTime,
        uint256 softCap,
        uint256 hardCap
    ) external {
        // Deploy a new instance of the Presale contract
        Presale presale = new Presale(token, startTime, endTime, softCap, hardCap);

        // Emit an event to log the creation of the Presale contract
        emit PresaleCreated(address(presale), token, startTime, endTime, softCap, hardCap);
    }
}
