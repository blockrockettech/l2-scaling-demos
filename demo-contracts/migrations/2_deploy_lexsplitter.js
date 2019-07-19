const {accountGetter} = require('../constants');

const LexSplitter = artifacts.require('./LexSplitter.sol');

module.exports = async function (deployer, network, accounts) {

    const lexAccount = accountGetter(accounts, network, 0);
    // const one = accountGetter(accounts, network, 1);
    // const two = accountGetter(accounts, network, 2);
    // const three = accountGetter(accounts, network, 3);

    await deployer.deploy(LexSplitter, lexAccount, lexAccount, lexAccount, lexAccount, {from: lexAccount});
};
