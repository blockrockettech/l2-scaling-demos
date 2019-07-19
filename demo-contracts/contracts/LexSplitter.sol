pragma solidity ^0.5.0;

contract LexSplitter {

    uint256 public counter = 0;
    uint256 public amountPerPlayInWei = 1000;

    address payable[4] royalties;

    constructor(address payable _artist,  address payable _publisher, address payable _other, address payable _lex) public {
        royalties[0] = _artist;
        royalties[1] = _publisher;
        royalties[2] = _other;
        royalties[3] = _lex;
    }

    function play() public payable {
        require(msg.value > amountPerPlayInWei);

        counter = counter + 1;

        uint256 share = amountPerPlayInWei / royalties.length;
        for (uint i = 0; i < royalties.length; i++) {
            royalties[i].transfer(share);
        }
    }
}
