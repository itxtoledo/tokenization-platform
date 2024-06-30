// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Presale.sol";
import "./MintableERC20.sol";

contract PresaleFactory {
    Presale public immutable presale;
    MintableERC20 public immutable token;

    uint256 public presaleCount;
    mapping(uint256 => address) presales;

    event PresaleCreated(address indexed presale);

    constructor(address presale_, address token_) {
        presale = Presale(presale_);
        token = MintableERC20(token_);
    }

    function createPresale(
        string calldata name,
        string calldata symbol,
        uint256 supply,
        uint256 price
    ) external {
        address newToken = Clones.clone(address(token));
        address newPresale = Clones.clone(address(presale));

        MintableERC20(newToken).initialize(newPresale, name, symbol, supply);
        Presale(newPresale).initialize(msg.sender, newToken, price);

        presales[presaleCount] = newPresale;
        presaleCount += 1;

        emit PresaleCreated(newPresale);
    }
}
