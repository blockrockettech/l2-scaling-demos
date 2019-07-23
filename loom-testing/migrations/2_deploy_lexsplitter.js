const {readFileSync} = require('fs');
const path = require('path');
const {accountGetter} = require('../constants');
const LoomTruffleProvider = require('loom-truffle-provider');
const {MNEMONIC} = require('../constants');

const LexSplitter = artifacts.require('./LexSplitter.sol');

module.exports = async function (deployer, network, accounts) {

    if (network === 'ropsten') {

        const lexAccount = accountGetter(accounts, network, 0);
        const one = accountGetter(accounts, network, 1);
        const two = accountGetter(accounts, network, 2);
        const three = accountGetter(accounts, network, 3);

        console.log([
            lexAccount,
            one,
            two,
            three
        ]);

        await deployer.deploy(LexSplitter, lexAccount, one, two, three, {from: lexAccount});
    } else if (network === 'loom_dapp_chain') {

        const loomTruffleProvider = new LoomTruffleProvider(
            'default',
            'http://127.0.0.1:46658/rpc',
            'http://127.0.0.1:46658/query',
            readFileSync(path.join(__dirname, '../loom_private_key'), 'utf-8')
        );
        const loomProvider = loomTruffleProvider.getProviderEngine();
        loomTruffleProvider.createExtraAccountsFromMnemonic(MNEMONIC, 10);

        const keys = [...loomProvider.accounts.keys()];
        console.log(keys);
        const lexAccount = keys[0];

        await deployer.deploy(LexSplitter, lexAccount, keys[1], keys[2], keys[3]);
    } else if (network === 'extdev_plasma_us1') {

        const loomTruffleProvider = new LoomTruffleProvider(
            'extdev-plasma-us1',
            'http://extdev-plasma-us1.dappchains.com:80/rpc',
            'http://extdev-plasma-us1.dappchains.com:80/query',
            readFileSync(path.join(__dirname, '../extdev_private_key'), 'utf-8')
        );
        const loomProvider = loomTruffleProvider.getProviderEngine();
        loomTruffleProvider.createExtraAccountsFromMnemonic(MNEMONIC, 10);

        const keys = [...loomProvider.accounts.keys()];
        console.log(keys);
        const lexAccount = keys[0];

        await deployer.deploy(LexSplitter, lexAccount, keys[1], keys[2], keys[3]);
    }
};
