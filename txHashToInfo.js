const Web3 = require('web3');
const util = require('ethereumjs-util');
const tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers
	.HttpProvider("https://rinkeby.infura.io/BYVTTM95Gm2IOQFxuu5g"));

if (process.argv[2] == undefined) {
	var txHash = 
	'0xa70fbf07afeb2e0786d1d421880d4dc5589d79b69e55193eae4a47f57b3d2e74';
} else {
	var txHash =
	process.argv[2];
}

// Get Transaction info 
var txInfo;
web3.eth.getTransaction(txHash)
.then((result) => {
	txInfo = result;
	console.log(txInfo);
});

