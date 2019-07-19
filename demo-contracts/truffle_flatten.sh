#!/usr/bin/env bash

node ./node_modules/.bin/truffle-flattener ./contracts/Migrations.sol > ./flat/Migrations.sol;

node ./node_modules/.bin/truffle-flattener ./contracts/LexSplitter.sol > ./flat/FLAT-LexSplitter-FLAT.sol;

