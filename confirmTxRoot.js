const Web3 = require('web3');
const rlp = require('rlp');
const merkle = require('merkle');
const util = require('ethereumjs-util');
const tx = require('ethereumjs-tx');


var web3 = new Web3(new Web3.providers
	.HttpProvider("https://rinkeby.infura.io/BYVTTM95Gm2IOQFxuu5g"));

async function getLatestBlock() {
	//var result
	//return await web3.eth.getBlock('latest')
	return await web3.eth.getBlock(2209599)
	.then((result) => {
		return result;
	})
	.catch(console.error);
}

async function getTransactions() {
	var transactions;
	var txRoot;
}

// attempt to verify the tx root given the list of tx's
var s = getLatestBlock()
.then((r) => {
	console.log(r);	
	var transactions = r.transactions;
	var i = 0;
	transactions.forEach((t) => {
		transactions[i] = t.slice(2);	
		i++;
	})
	var txRoot = r.transactionsRoot;
	var tree = merkle('sha256').sync(transactions);
	console.log(transactions);

	const sha256 = web3.utils.keccak256;
	console.log(sha256(sha256(transactions[0])));

	console.log("depth: ", tree.depth());
	console.log("nodes: ", tree.nodes());
	console.log("root: ", tree.root());
	console.log(tree.level(tree.depth()));
	// this is a complete failure btw. 
});


// simple async and return, for future reference
/*async function test() {
	return await getLatestBlock()
	.then((r) => { return r; });
}
*/
