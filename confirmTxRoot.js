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

function hashPair(a, b) {
	const sha256 = util.sha256;
	const both = a + b;
	return util.stripHexPrefix(util.bufferToHex(sha256(both)));
}


function predictMerkleRoot(transactions, flag) {
	if (transactions.length == 1)
		return transactions;
	// Even it out
	var n = transactions.length;
	if (n % 2 == 1) {
		transactions[n] = transactions[n-1];
		n++;
	}
	// hash each hash 
	if (flag) {
		const sha256 = util.sha256;
		var i = 0;
		transactions.forEach((t) => {
			t = util.bufferToHex(sha256(t));
			transactions[i] = util.stripHexPrefix(t);
			i++;
		});
	}
	console.log(transactions);

	var tree = [];
	for (var i = 0; i < transactions.length; i+=2) {
		//var a = sha256(transactions[i]);
		var a = transactions[i];
		//var b = sha256(transactions[i+1]);
		var b = transactions[i+1];
		var hash = hashPair(a, b);
		tree.push(hash);
	}
	return predictMerkleRoot(tree, false);
}
// attempt to verify the tx root given the list of tx's
var s = getLatestBlock()
.then((r) => {
	console.log(util);
	console.log(r);	

	const sha256 = util.sha256;

	var transactions = r.transactions;
	var txRoot = r.transactionsRoot;
	var i = 0;
	transactions.forEach((t) => {
		transactions[i] = util.stripHexPrefix(t);
		i++;
	});

	var tree = merkle('sha256').sync(transactions);

	console.log("\npredicted first hash of merkle tree:\n",
				util.bufferToHex(sha256(transactions[0])));
	const prediction = predictMerkleRoot(transactions, true);
	console.log("\npredicted merkle root:\n")
	console.log(prediction);



	console.log("depth: ", tree.depth());
	console.log("nodes: ", tree.nodes());
	console.log("merkle root:\n", tree.root());
	console.log("merkle tree 2nd bottom level:\n", tree.level(tree.depth()-1));
	console.log("merkle tree bottom level:\n", tree.level(tree.depth()));
	// this is a complete failure btw. 
});


// simple async and return, for future reference
/*async function test() {
	return await getLatestBlock()
	.then((r) => { return r; });
}
*/
