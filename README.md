# Udacity Blockchain Capstone

## Project submission by: Ibrahim Almohandes, August 30, 2021. 

The capstone will build upon the knowledge you have gained in the course in order to build a decentralized housing product. 

## Tools with versions:

- Truffle v5.4.6 (core: 5.4.6)
- Solidity - ^0.5.0 (solc-js)
- Node v14.17.5
- Web3.js v1.5.1
- Ganache CLI v6.12.2 (ganache-core: 2.13.2)

## Ethereum Addresses

- owner address: `0x0682711243d9256641B520Bf913C43315857f5D0`
- contract deployments to `rinkeby`: see [contract-transactions.txt](./contract-transactions.txt)

## Steps

### For local deployment

Open a new terminal and run:
```bash
node install
ganache-cli
truffle compile [--all]
```

Then open another terminal, and run:
```bash
truffle migrate [--reset]
truffle test [--show-events]
```

### For deployment on the `rinkeby` test network:

Make a copy of [.env.sample](./.env.sample) to e.g., `.env.local`, and fill these missing values:
```
export INFURA_KEY=""
export MNEMONIC=""
export OWNER_ADDRESS=""
```

Then run:
```
. .env.local
```

Then run:
```bash
truffle migrate --network rinkeby
```

This will deploy the `solidity` contracts to the `rinkeby` test netowrk.

You can see all the `rinkeby` deployments for `my owner address` on `etherscan` at https://rinkeby.etherscan.io/address/0x0682711243d9256641b520bf913c43315857f5d0


### For mining new tokens on `OpenSea`:

Update your `.env.local`, and fill the missing value with your `RealStateToken` address:
```
export NFT_CONTRACT_ADDRESS=""
```

Then run:
```
. .env.local
```

Then run the minting script:
```
node scripts/mint.js
```

This will mint new tokens, and deploy them to the `rinkeby` test netowrk.

To see all transactions related to the `RealStateToken` contract, see https://rinkeby.etherscan.io/address/0x466524ff9b1e7dca6b0059a0765075f2838f90f6

To see the minted tokens' info along with transcations, see https://rinkeby.etherscan.io/token/0x466524ff9b1e7dca6b0059a0765075f2838f90f6


### For listing on the `OpenSea Marketplace`:

To create a new token collection, use this link https://testnets.opensea.io/get-listed/ and follow the instructions for `Live on a testnet`.

To see more details about listing on the `OpenSea Marketplace`, check steps `1 - 6` of the [OpenSea ERC721 Tutorial](https://docs.opensea.io/docs/getting-started), but for our case replace the `Creature` example with our `RealStateToken`.


### My `OpenSea Collection` for the Real State Tokens (RST):

This is the collection: [Real State Token V3](https://testnets.opensea.io/collection/real-state-token-v3)

You can see six house listings as well as two `Sell` and `Buy` orders I made. As with minting the new tokens, you can also their `rinkeby` testnet transactions at https://rinkeby.etherscan.io/token/0x466524ff9b1e7dca6b0059a0765075f2838f90f6


#### NOTE:
To prserve the initial project's file structure, I made symbolic links to the project folders under `./eth-contracts`. In case you of any issue running the project with these links, please recreate them (or move subfolder's contents to the main folder of the locally cloned repo).


# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
