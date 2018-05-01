const Web3 = require('web3');
const util = require('ethereumjs-util');
const tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers
	.HttpProvider("https://ropsten.infura.io/BYVTTM95Gm2IOQFxuu5g"));

if (process.argv[2] == undefined) {
	var privateKey = new Buffer(
	'b7ae1cc452a0858bdda9e66b7e48d705092b52950859e9d443a17001990d5643', 'hex');
} else {
	var privateKey = new Buffer(
		process.argv[2].slice(2), 'hex');
}

//send me eth
function makeRawTx(nonce) {
	// don't worry it only works once
	return {
		nonce: web3.utils.toHex(nonce),
		gasPrice: web3.utils.toHex(20000000000),
		gasLimit: web3.utils.toHex(100000),
		to: '0x28c7fA16aE91d2Adb6a31F45fb33EeaD33BD42AE',
		value: web3.utils.toHex(100000000),
		data: '0x0'
	};
}

async function trySend(nonce) {
	var rawTx = makeRawTx(nonce);

	var transaction = new tx(rawTx);
	transaction.sign(privateKey);
	var serialTx = transaction.serialize();

	web3.eth.sendSignedTransaction('0x' + serialTx.toString('hex'))
	.on('receipt', console.log)
	.on('error', console.error)
	.catch((e) => { return; });

}


trySend(0);
//trySend(4);


