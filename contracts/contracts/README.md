# Tokenization Platform Diagram 

Here's a markdown document that provides an overview and abstract structure of the smart contracts:

# Smart Contracts Overview

## Contracts

| Contract Name | Functions                                                                                      | Description |
|---------------|------------------------------------------------------------------------------------------------|-------------|
| `LiquidityLocker` | `lockLiquidity(address token, uint256 amount, uint256 lockTime) external onlyOwner` <br> `unlockLiquidity(uint256 index) external` <br> `removeLock(address user, uint256 index) internal` | Allows the owner to lock and unlock liquidity tokens for a specified period. |
| `Presale`         | `contribute() external payable` <br> `withdrawFunds() external onlyOwner` <br> `refund() external` | Manages the token presale, including contributions, fund withdrawals, and refunds if soft cap is not reached. |
| `PresaleFactory`  | `createPresale(address token, uint256 startTime, uint256 endTime, uint256 softCap, uint256 hardCap) external` | Creates new instances of the `Presale` contract and emits an event for each creation. |
| `ERC20Token`      | `mint(address to, uint256 amount) public onlyOwner` <br> `burn(uint256 amount) public` <br> `decimals() public view virtual override returns (uint8)` | Implements an ERC20 token with minting and burning functionalities, accessible only by the owner. |

## Detailed Descriptions

### 1. LiquidityLocker

#### Description:
`LiquidityLocker` allows the owner to lock liquidity tokens for a specified period. The tokens can be unlocked by the owner after the lock period has ended.

#### Functions:

- **lockLiquidity**
  - **Parameters:** `address token`, `uint256 amount`, `uint256 lockTime`
  - **Modifiers:** `onlyOwner`
  - **Description:** Locks specified amount of tokens until the given unlock time.

- **unlockLiquidity**
  - **Parameters:** `uint256 index`
  - **Description:** Unlocks the tokens if the unlock time has passed.

- **removeLock**
  - **Parameters:** `address user`, `uint256 index`
  - **Visibility:** `internal`
  - **Description:** Removes the lock record from the user's locks.

### 2. Presale

#### Description:
`Presale` manages the token presale, including contributions, fund withdrawals by the owner, and refunds if the soft cap is not reached.

#### Functions:

- **contribute**
  - **Description:** Allows users to contribute ETH to the presale. Updates the total raised amount.

- **withdrawFunds**
  - **Modifiers:** `onlyOwner`
  - **Description:** Allows the owner to withdraw the funds after the presale ends if the soft cap is reached.

- **refund**
  - **Description:** Allows users to claim a refund if the presale does not reach the soft cap.

### 3. PresaleFactory

#### Description:
`PresaleFactory` creates new instances of the `Presale` contract and emits an event for each creation.

#### Functions:

- **createPresale**
  - **Parameters:** `address token`, `uint256 startTime`, `uint256 endTime`, `uint256 softCap`, `uint256 hardCap`
  - **Description:** Deploys a new `Presale` contract and emits a `PresaleCreated` event.

### 4. ERC20Token

#### Description:
`ERC20Token` is an implementation of an ERC20 token with additional functionalities for minting and burning tokens, accessible only by the owner.

#### Functions:

- **mint**
  - **Parameters:** `address to`, `uint256 amount`
  - **Modifiers:** `onlyOwner`
  - **Description:** Mints new tokens to the specified address.

- **burn**
  - **Parameters:** `uint256 amount`
  - **Description:** Burns a specified amount of tokens from the caller's balance.

- **decimals**
  - **Returns:** `uint8`
  - **Description:** Returns the number of decimals used by the token (overridden to return 18).

---

This document provides a structured overview of each contract along with a description of the key functions and their purposes.