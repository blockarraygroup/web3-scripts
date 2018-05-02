const Web3 = require('web3');
const util = require('ethereumjs-util');

var web3 = new Web3(new Web3.providers
	.HttpProvider("https://rinkeby.infura.io/BYVTTM95Gm2IOQFxuu5g"));
	// yea this too

if (process.argv[2] == undefined) {
	var privateKey =
	'0xb7ae1cc452a0858bdda9e66b7e48d705092b52950859e9d443a17001990d5643';
	// feel free to use this one. It's got 1 Ropsten ETH
} else {
	var privateKey = process.argv[2];
}

var pubKey = util.bufferToHex(util.privateToPublic(privateKey));

console.log("public key: ", pubKey);

var address = '0x' + util.bufferToHex(util.sha3(pubKey)).slice(26);

console.log("address: ", address);