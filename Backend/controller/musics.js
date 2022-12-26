import {
	NewTrack,
	NewPlaylist,
	NewAlbum,
	AddTrackToPlaylist,
	DeleteTrackToPlaylist,
	AddTrackToAlbum,
	DeleteTrackToAlbum,
	TrackCheck,
	PlaylistCheck,
	AlbumCheck,
} from '../server/database.js';

export const NewMusic = async (req, res) => {
	const music = req.body;

	var data = await NewTrack(music.musicName, music.ipfs);
	if (data) {
		console.log(`Music [${music.musicName}] added to the database.`);
		res.send(`Music [${music.musicName}] added to the database.`);
	} else {
		console.log(`Music [${music.musicName}] is already added to the database.`);
		res.send(`Music [${music.musicName}] is already added to the database.`);
	}
};

export const Track_Check = async (req, res) => {
	const music = req.body;
	var data = await TrackCheck(music.musicName);
	res.send(`Music [${music.musicName}] is already added to the database.`);
};

export const Playlist_Check = async (req, res) => {
	const music = req.body;
	var data = await PlaylistCheck(music.musicName);
};

export const Album_Check = async (req, res) => {
	const music = req.body;
	var data = await AlbumCheck(music.musicName);
};

export const NewPlaylists = async (req, res) => {
	const playlist = req.body;

	var data = await NewPlaylist(playlist.playlistName);
	if (data) {
		console.log(`Playlist [${playlist.playlistName}] added to the database.`);
		res.send(`Playlist [${playlist.playlistName}] added to the database.`);
	} else {
		console.log(
			`Playlist [${playlist.playlistName}] is already added to the database.`,
		);
		res.send(
			`Playlist [${playlist.playlistName}] is already added to the database.`,
		);
	}
};

export const NewAlbums = async (req, res) => {
	const album = req.body;

	var data = await NewAlbum(album.albumName);
	if (data) {
		console.log(`Album [${album.albumName}] added to the database.`);
		res.send(`Album [${album.albumName}] added to the database.`);
	} else {
		console.log(`Album [${album.albumName}] is already added to the database.`);
		res.send(`Album [${album.albumName}] is already added to the database.`);
	}
};

export const AddMusicToPlaylist = async (req, res) => {
	const music = req.body;
	var returns = await AddTrackToPlaylist(music.playlistName, music.musicName);
	var data = returns[0];
	if (data) {
		console.log(`Music [${music.musicName}] added to [${music.playlistName}].`);
		res.send(`Music [${music.musicName}] added to [${music.playlistName}].`);
	} else {
		console.log(
			`Music [${music.musicName}] is already added to [${music.playlistName}].`,
		);
		res.send(
			`Music [${music.musicName}] is already added to [${music.playlistName}].`,
		);
	}
};

export const DeleteMusicToPlaylist = async (req, res) => {
	const music = req.body;
	var returns = await DeleteTrackToPlaylist(
		music.playlistName,
		music.musicName,
		music.ownerAddress,
	);
	var data = returns[0];
	console.log(returns[1]);
	if (data) {
		console.log(
			`Music [${music.musicName}] deleted from [${music.playlistName}].`,
		);
		res.send(
			`Music [${music.musicName}] deleted from [${music.playlistName}].`,
		);
	} else {
		console.log(
			`Music [${music.musicName}] is can not found at [${music.playlistName}].`,
		);
		res.send(
			`Music [${music.musicName}] is can not found at [${music.playlistName}].`,
		);
	}
};

export const AddMusicToAlbum = async (req, res) => {
	const music = req.body;
	var returns = await AddTrackToAlbum(
		music.albumName,
		music.musicName,
		music.ownerAddress,
	);
	var data = returns[0];
	if (data) {
		console.log(`Music [${music.musicName}] added to [${music.albumName}].`);
		res.send(`Music [${music.musicName}] added to [${music.albumName}].`);
	} else {
		console.log(
			`Music [${music.musicName}] is already added to [${music.albumName}].`,
		);
		res.send(
			`Music [${music.musicName}] is already added to [${music.albumName}].`,
		);
	}
};

export const DeleteMusicToAlbum = async (req, res) => {
	const music = req.body;
	var returns = await DeleteTrackToAlbum(
		music.albumName,
		music.musicName,
		music.ownerAddress,
	);
	var data = returns[0];
	if (data) {
		console.log(
			`Music [${music.musicName}] deleted from [${music.albumName}].`,
		);
		res.send(`Music [${music.musicName}] deleted from [${music.albumName}].`);
	} else {
		console.log(
			`Music [${music.musicName}] is can not found at [${music.albumName}].`,
		);
		res.send(
			`Music [${music.musicName}] is can not found at [${music.albumName}].`,
		);
	}
};
