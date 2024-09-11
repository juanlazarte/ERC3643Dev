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
      url: `https://eth-sepolia.g.alchemy.com/v2/9EHEvWG6rkcNXhox-oV4a4sa59fNt1DN`,
      chainId: 11155111,
      accounts: ['be4f5466fe225099ebdca96c9b14714fea3509f182561c16c76c3d46970ab6f1'],
      gas: 60 * 10 ** 9, // LÃ­mite de gas
      gasPrice: 60 * 10 ** 9, // Precio del gas en gwei (5 gwei) // AsegÃºrate de definir la PRIVATE_KEY en tu .env
    },
    fuji: {
      url: `https://avalanche-fuji-c-chain-rpc.publicnode.com`,
      chainId: 43113,
      accounts: ['be4f5466fe225099ebdca96c9b14714fea3509f182561c16c76c3d46970ab6f1'],
      gas: 60 * 10 ** 9, // LÃ­mite de gas
      gasPrice: 60 * 10 ** 9, // Precio del gas en gwei (5 gwei) // AsegÃºrate de definir la PRIVATE_KEY en tu .env
    },
    polygon: {
      url: 'https://polygon-rpc.com/',
      chainId: 137,
      accounts: ['be4f5466fe225099ebdca96c9b14714fea3509f182561c16c76c3d46970ab6f1'], // AsegÃºrate de definir la PRIVATE_KEY en tu .env
      gas: 100 * 10 ** 9, // LÃ­mite de gas
      gasPrice: 100 * 10 ** 9, // Precio del gas en gwei (5 gwei)
    },
    amoy: {
      url: 'https://polygon-amoy.g.alchemy.com/v2/9EHEvWG6rkcNXhox-oV4a4sa59fNt1DN',
      chainId: 80002,
      accounts: ['be4f5466fe225099ebdca96c9b14714fea3509f182561c16c76c3d46970ab6f1'],
      gas: 60 * 10 ** 9, // LÃ­mite de gas
      gasPrice: 60 * 10 ** 9, // Precio del gas en gwei (5 gwei) // AsegÃºrate de definir la PRIVATE_KEY en tu .env
    },
    bsc: {
      url: 'https://bsc-testnet-rpc.publicnode.com',
      chainId: 97,
      accounts: ['be4f5466fe225099ebdca96c9b14714fea3509f182561c16c76c3d46970ab6f1'], // AsegÃºrate de definir la PRIVATE_KEY en tu .env
      gas: 60 * 10 ** 9, // LÃ­mite de gas
      gasPrice: 60 * 10 ** 9, // Precio del gas en gwei (5 gwei) // AsegÃºrate de definir la PRIVATE_KEY en tu .env
    },
  },
  etherscan: {
    apiKey: {
      polygon: 'DDU5H1EN68ZKZIBQ9EWHWY9BS23DZGBMFP',
      /* bsc: 'AABG8TZX1JPB9JJMFFPF42IBYSC6PI1ED8', */
    },
  },
};

export default config;
