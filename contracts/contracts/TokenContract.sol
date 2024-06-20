// SPDX-License-Identifier: MIT

//After search I found it is recommended to use ^0.8.0 version, we can change this anytime later 
pragma solidity ^0.8.0;

//library provides the basic implementation of an ERC20 token.
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//library provides a basic access control mechanism, allowing only the contract owner to perform certain actions.
import "@openzeppelin/contracts/access/Ownable.sol";

//the contract is ownable 
contract ERC20Token is ERC20, Ownable {

    // Pass msg.sender to the Ownable constructor
    constructor(string memory name, string memory symbol, uint256 initialSupply) 
    ERC20(name, symbol) 
    Ownable(msg.sender) 
    {
        //I will create function to return 18 decimals 
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    //function to mint (should take address and uint256 param)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    //function to burn (should take uint256 param)
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    //function to return 18 decimals 
    function decimals() public view virtual override returns (uint8) {
        return 18;
    }
}
