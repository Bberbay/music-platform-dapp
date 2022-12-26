// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require('hardhat');

async function main() {
	const [owner] = await ethers.getSigners();
	Token = await ethers.getContractFactory('BTBToken');
	token = await Token.connect(owner).deploy();
	await token.deployed();
	const ItemFactory = await ethers.getContractFactory('MusicPlatform');
	const item = await ItemFactory.connect(owner).deploy(token.address);
	await item.deployed();
	console.log(
		`${owner.address} deployed to ${token.address}`,
	);
	console.log(
		`${owner.address} deployed to ${item.address}`,
	);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
