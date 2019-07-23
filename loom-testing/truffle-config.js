const {readFileSync} = require('fs');
const path = require('path');
const LoomTruffleProvider = require('loom-truffle-provider');
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
        // Local loom chain
        loom_dapp_chain: {
            provider: function () {
                const chainId = 'default';
                const writeUrl = 'http://127.0.0.1:46658/rpc';
                const readUrl = 'http://127.0.0.1:46658/query';

                //The Loom private key will be saved into a file called loom_private_key.
                const privateKey = readFileSync(path.join(__dirname, './loom_private_key'), 'utf-8');

                const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);
                loomTruffleProvider.createExtraAccountsFromMnemonic(MNEMONIC, 10);

                return loomTruffleProvider;
            },
            network_id: '*'
        },
        // Remote testnet
        extdev_plasma_us1: {
            provider: function () {
                const chainId = 'extdev-plasma-us1';
                const writeUrl = 'http://extdev-plasma-us1.dappchains.com:80/rpc';
                const readUrl = 'http://extdev-plasma-us1.dappchains.com:80/query';

                //The Loom private key will be saved into a file called extdev_private_key.
                const privateKey = readFileSync(path.join(__dirname, './extdev_private_key'), 'utf-8');

                const loomTruffleProvider = new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey);
                loomTruffleProvider.createExtraAccountsFromMnemonic(MNEMONIC, 10);

                return loomTruffleProvider;
            },
            network_id: '*'
        },
        ropsten: {
            provider: function () {
                return new HDWalletProvider(MNEMONIC, `https://ropsten.infura.io/v3/${INFURA_KEY}`);
            },
            network_id: 3,
            gas: 7000000, // default = 4712388
            gasPrice: 4000000000, // default = 100 gwei = 100000000000
            skipDryRun: true
        }
    }
};
