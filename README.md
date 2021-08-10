# react-dapp

Following along with https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13#erc20-token.

## How to run it

### 1. Run local test node

```
crypto/react-dapp $ PKEY=... npx hardhat node
```

### 2. Add account to Metamask (if you haven't already)

Make sure to use the localhost network in Metamask.

### 3. Deploy contracts

```
crypto/react-dapp $ PKEY=... npx hardhat run scripts/deploy.js --network localhost
```

### 4. Take contract addresses output in last step, and modify `index.tsx` to use them

The contract addresses change every time you deploy.
