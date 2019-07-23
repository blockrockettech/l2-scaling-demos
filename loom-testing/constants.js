const HDWalletProvider = require('truffle-hdwallet-provider');

const mnemonic = process.env.LEXBLOCK_MNEMONIC;
const INFURA_KEY = process.env.PROTOTYPE_BR_INFURA_KEY;

const accountGetter = (accounts, network, no) => {
    let _acc = accounts[no];
    if (network === 'ropsten' || network === 'rinkeby') {
        _acc = new HDWalletProvider(mnemonic, `https://${network}.infura.io/v3/${INFURA_KEY}`, no).getAddress();
    }
    console.log(`Using account [${_acc}] for network [${network}]`);
    return _acc;
};

module.exports = {
    INFURA_KEY: INFURA_KEY,
    MNEMONIC: mnemonic,
    accountGetter: accountGetter,
};
