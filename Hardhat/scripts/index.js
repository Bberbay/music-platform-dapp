module.exports = {
	NewTrack_Contract,
	NewPlaylist_Contract,
	NewAlbum_Contract,
	AddTrackToPlaylist_Contract,
	AddTrackToAlbum_Contract,
	DeleteTrackToPlaylist_Contract,
	DeleteTrackToAlbum_Contract,
	MusicList,
	PlayList,
	AlbumList,
	AddressCheck,
};

const { ethers } = require('ethers');
const contractAbi = require('../artifacts/contracts/musicplatform.sol/MusicPlatform.json');
const abi = contractAbi.abi;
const address = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const tokenAbi = require('../artifacts/contracts/BTBToken.sol/BTBToken.json');
const abi2 = tokenAbi.abi;
const tokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
let platform;
let token;
let signer;
let signerAddress;
Connection();
async function Connection() {
	signer = await provider.getSigner();
	signerAddress = await signer.getAddress();
	token = new ethers.Contract(tokenAddress, abi2, signer);
	platform = new ethers.Contract(address, abi, signer);
	let amount = ethers.utils.parseUnits((1000).toString(), 18);
	await token.approve(address, amount);
	return signerAddress;
}

async function AddressCheck() {
	return signerAddress;
}

async function NewTrack_Contract(_musicname, _musicipfs) {
	let numMusic = await platform.callStatic.addNewMusic(_musicname, _musicipfs);
	await platform.addNewMusic(_musicname, _musicipfs);
	let result = await platform.getMusic(numMusic.length);
	return result.musicOwner;
}

async function NewPlaylist_Contract(_playlistName) {
	let NumPlaylist = await platform.callStatic.addNewPlaylist(_playlistName);
	console.log(NumPlaylist.length);
	await platform.addNewPlaylist(_playlistName);
	let result = await platform.getPlaylist(NumPlaylist.length);
	return result.playlistOwner;
}

async function NewAlbum_Contract(_albumName) {
	let numAlbum = await platform.callStatic.addNewAlbum(_albumName);
	await platform.addNewAlbum(_albumName);
	let result = await platform.getAlbum(numAlbum.length);
	return result.albumOwner;
}

async function AddTrackToPlaylist_Contract(_playlistId, _musicId) {
	await platform.addMusicToPlaylist(_playlistId, _musicId);
	let result = await platform.trackInPlaylist(_playlistId);
	return result;
}

async function AddTrackToAlbum_Contract(_albumId, _musicId) {
	await platform.addMusicToAlbum(_albumId, _musicId);
	let result = await platform.trackInAlbum(_albumId);
	return result;
}

async function DeleteTrackToPlaylist_Contract(_playlistId, _musicId) {
	await platform.deleteMusicToPlaylist(_playlistId, _musicId);
	let result = await platform.trackInPlaylist(_playlistId);
	return result;
}

async function DeleteTrackToAlbum_Contract(_albumId, _musicId) {
	await platform.deleteMusicToAlbum(_albumId, _musicId);
	let result = await platform.trackInAlbum(_albumId);
	return result;
}

async function MusicList(_musicNumber) {
	let result = await platform.getMusic(_musicNumber);
	return result;
}

async function PlayList(_playlistId) {
	let result = await platform.getPlaylist(_playlistId);
	return result;
}

async function AlbumList(_albumId) {
	let result = await platform.getAlbum(_albumId);
	return result;
}

// NewTrack_Contract().catch((error) => {
// 	console.error(error);
// 	process.exitCode = 1;
// });

// NewPlaylist_Contract().catch((error) => {
// 	console.error(error);
// 	process.exitCode = 1;
// });

// NewAlbum_Contract().catch((error) => {
// 	console.error(error);
// 	process.exitCode = 1;
// });

// AddTrackToPlaylist_Contract().catch((error) => {
// 	console.error(error);
// 	process.exitCode = 1;
// });

// AddTrackToAlbum_Contract().catch((error) => {
// 	console.error(error);
// 	process.exitCode = 1;
// });

// DeleteTrackToPlaylist_Contract().catch((error) => {
// 	console.error(error);
// 	process.exitCode = 1;
// });

// DeleteTrackToAlbum_Contract().catch((error) => {
// 	console.error(error);
// 	process.exitCode = 1;
// });

// MusicList().catch((error) => {
// 	console.error(error);
// 	process.exitCode = 1;
// });

// PlayList().catch((error) => {
// 	console.error(error);
// 	process.exitCode = 1;
// });

// AlbumList().catch((error) => {
// 	console.error(error);
// 	process.exitCode = 1;
// });
