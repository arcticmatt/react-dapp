require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/0ce8b802f9c446bcb0276dd4c24c3731",
      accounts: [`0x${process.env.PKEY}`],
    },
  },
};
