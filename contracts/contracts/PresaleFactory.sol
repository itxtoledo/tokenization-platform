// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Presale.sol";
import "./MintableERC20.sol";

contract PresaleFactory {
    Presale public immutable presale;
    MintableERC20 public immutable token;

    event PresaleCreated(address indexed presale);

    constructor(address factory_, address token_) {
        presale = Presale(factory_);
        token = MintableERC20(token_);
    }

    function createPresale(
        string calldata name,
        string calldata symbol,
        uint256 supply,
        uint256 price
    ) external {
        address newToken = Clones.clone(token);
        MintableERC20(clone).initialize(_msgSender(), name, symbol, supply);

        address newPresale = Clones.clone(presale);
        Presale(newPresale).initialize(_msgSender(), newToken, price);

        emit PresaleCreated(newPresale);
    }
}
