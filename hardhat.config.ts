import '@xyrusworx/hardhat-solidity-json';
import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';
import '@openzeppelin/hardhat-upgrades';
import 'solidity-coverage';
import '@nomiclabs/hardhat-solhint';
import '@primitivefi/hardhat-dodoc';
/* import dotenv from 'dotenv'; */

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.21',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
    settings: {
      /* evmVersion: 'istanbul', */
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  gasReporter: {
    enabled: true,
  },
  dodoc: {
    runOnCompile: false,
    debugMode: true,
    outputDir: './docgen',
    freshOutput: true,
  },
  networks: {
    sepolia: {
      url: ``,
      chainId: 11155111,
      accounts: [''],
      gas: 60 * 10 ** 9, // LÃ­mite de gas
      gasPrice: 60 * 10 ** 9, // Precio del gas en gwei (5 gwei) // AsegÃºrate de definir la PRIVATE_KEY en tu .env
    },
    fuji: {
      url: ``,
      chainId: 43113,
      accounts: [''],
      gas: 60 * 10 ** 9, // LÃ­mite de gas
      gasPrice: 60 * 10 ** 9, // Precio del gas en gwei (5 gwei) // AsegÃºrate de definir la PRIVATE_KEY en tu .env
    },
    polygon: {
      url: '',
      chainId: 137,
      accounts: [''], // AsegÃºrate de definir la PRIVATE_KEY en tu .env
      gas: 100 * 10 ** 9, // LÃ­mite de gas
      gasPrice: 100 * 10 ** 9, // Precio del gas en gwei (5 gwei)
    },
    amoy: {
      url: '',
      chainId: 80002,
      accounts: [''],
      gas: 60 * 10 ** 9, // LÃ­mite de gas
      gasPrice: 60 * 10 ** 9, // Precio del gas en gwei (5 gwei) // AsegÃºrate de definir la PRIVATE_KEY en tu .env
    },
    bsc: {
      url: '',
      chainId: 97,
      accounts: [''], // AsegÃºrate de definir la PRIVATE_KEY en tu .env
      gas: 60 * 10 ** 9, // LÃ­mite de gas
      gasPrice: 60 * 10 ** 9, // Precio del gas en gwei (5 gwei) // AsegÃºrate de definir la PRIVATE_KEY en tu .env
    },
  },
  etherscan: {
    apiKey: {
      polygon: '',
    },
  },
};

export default config;
