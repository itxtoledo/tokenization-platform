// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "./Presale.sol";
import "./MintableERC20.sol";

contract PresaleFactory {
    Presale public immutable presale;
    MintableERC20 public immutable token;

    address[] public allPresales;
    mapping(address => address[]) private userCreatedTokens;

    event PresaleCreated(address indexed presale);

    constructor(address presale_, address token_) {
        presale = Presale(presale_);
        token = MintableERC20(token_);
    }

    function createPresale(
        string calldata name,
        string calldata symbol,
        uint256 supply,
        uint256 price,
        uint256 hardCap,
        uint256 softCap,
        uint256 startTime,
        uint256 endTime
    ) external {
        address newToken = Clones.clone(address(token));
        address newPresale = Clones.clone(address(presale));

        MintableERC20(newToken).initialize(msg.sender, newPresale, name, symbol, supply);
        Presale(newPresale).initialize(msg.sender, newToken, price, hardCap, softCap, startTime, endTime);

        allPresales.push(newPresale);

        emit PresaleCreated(newPresale);
        userCreatedTokens[msg.sender].push(newToken);
    }

    function getPaginatedPresales(uint256 page)
        external
        view
        returns (address[] memory)
    {
        uint256 totalPresales = allPresales.length;
        uint256 pageSize = 10; // Fixed page size
        if (page == 0) {
            return new address[](0);
        }
        uint256 startIndex = (page - 1) * pageSize;
        if (startIndex >= totalPresales) {
            return new address[](0);
        }
        uint256 endIndex = startIndex + pageSize;
        if (endIndex > totalPresales) {
            endIndex = totalPresales;
        }
        uint256 count = endIndex - startIndex;
        address[] memory result = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = allPresales[startIndex + i];
        }
        return result;
    }

    function getUserCreatedTokens(address user) external view returns (address[] memory) {
        return userCreatedTokens[user];
    }
}
