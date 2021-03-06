const HDWalletProvider = require('truffle-hdwallet-provider');
const {INFURA_KEY, MNEMONIC} = require('./constants');

module.exports = {
    compilers: {
        solc: {
            version: '0.5.0',
            settings: {
                optimizer: {
                    enabled: true, // Default: false
                    runs: 200      // Default: 200
                },
            }
        }
    },
    networks: {
        development: {
            host: '127.0.0.1',
            port: 7545,
            gas: 6721975, // <-- Use this high gas value
            gasPrice: 1000000000,    // <-- Use this low gas price
            network_id: '*', // Match any network id
        },
        ganache: {
            host: '127.0.0.1',
            port: 7545,
            gas: 6721975, // <-- Use this high gas value
            gasPrice: 1000000000,    // <-- Use this low gas price
            network_id: '5777', // Match any network id
        },
        ropsten: {
            provider: function () {
                return new HDWalletProvider(MNEMONIC, `https://ropsten.infura.io/v3/${INFURA_KEY}`);
            },
            network_id: 3,
            gas: 7000000, // default = 4712388
            gasPrice: 4000000000, // default = 100 gwei = 100000000000
            skipDryRun: true
        },
        sokol: {
            provider: function () {
                return new HDWalletProvider(MNEMONIC, 'https://sokol.poa.network');
            },
            network_id: 77,
            gas: 500000,
            gasPrice: 1000000000,
            skipDryRun: true,
        },
        xdai: {
            provider: function () {
                return new HDWalletProvider(MNEMONIC, 'https://dai.poa.network');
            },
            network_id: 100,
            gas: 500000,
            gasPrice: 1000000000,
            skipDryRun: true,
        },
    }
};
