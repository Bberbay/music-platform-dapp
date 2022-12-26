import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../model/User.js';
import Track from '../model/Track.js';
import Playlist from '../model/Playlist.js';
import Album from '../model/Album.js';
import {
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
} from '../../Hardhat/scripts/index.js';

dotenv.config();

const MongodbUrl = process.env.MONGODB_URL;

mongoose
	.connect(MongodbUrl)
	.then(() => {
		console.log('Connected to the Database.');
	})
	.catch((err) => {
		console.log(err);
	});

export async function RegisterUser(username, email, password) {
	try {
		var encryptedPassword = await bcrypt.hash(password, 10);
		const user = new User({
			username,
			email: email.toLowerCase(),
			password: encryptedPassword,
		});
		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: '24h',
			},
		);
		// save user token
		user.token = token;
		// Insert the article in our MongoDB database
		await user.save();
		console.log('User Registered Succesfully');
		res.status(200).json(user);
	} catch (err) {
		console.log(err);
	}
}

export async function LoginUser(username, password) {
	var err1 = 'There is no user with this username';
	var err2 = 'Password is Wrong';
	var UserID = (await User.findOne({ username })) || err1;
	var passCheck = await bcrypt.compare(password, UserID.password);
	console.log(UserID);
	if (UserID === err1) {
		console.log(err1);
		return err1;
	} else if (!passCheck) {
		console.log(err2);
		return err2;
	} else {
		const token = jwt.sign(
			{ user_id: UserID._id, email: UserID.email },
			process.env.JWT_SECRET_KEY,
			{
				expiresIn: '24h',
			},
		);
		UserID.token = token;
		await UserID.save();
		console.log('User Login Successful');
		return ['User Login Successful', token];
	}
}

export async function updatePassword(username, password, UpdatedPassword) {
	var err2 = 'Password is Wrong';
	var UserID = await User.findOne({ username });
	var passCheck = (await bcrypt.compare(password, UserID.password)) || err2;

	if (!passCheck) {
		console.log(err2);
		return ['Password is Wrong'];
	} else {
		await User.findOneAndUpdate({ username }, { password: UpdatedPassword });
		console.log('Password Changed Succesfully');
		return ['Password Changed Succesfully', UpdatedPassword];
	}
}

export async function DeleteUser(username, password) {
	var err2 = 'Password is Wrong';
	var UserID = await User.findOne({ username });
	var passCheck = (await bcrypt.compare(password, UserID.password)) || err2;
	console.log(UserID);
	console.log(UserID2);

	if (!passCheck) {
		console.log(err2);
		return err2;
	} else {
		await User.deleteOne({ username });
		console.log('Deleted Account Successfully');
		return 'Deleted Account Successfully';
	}
}

export async function NewTrack(TrackName, Ipfs) {
	var err1 = 'There is no music with this Name';
	var data = true;
	var trackCheck = (await Track.findOne({ TrackName })) || err1;
	if (trackCheck === err1) {
		let OwnerAddress = await NewTrack_Contract(TrackName, Ipfs);
		let Id = await Track.count();
		console.log(Id);
		const track = new Track({
			Id,
			TrackName,
			OwnerAddress,
			Ipfs,
		});
		// Insert the article in our MongoDB database
		await track.save();
		console.log('Track Created Succesfully');
		data = true;
	} else {
		console.log('Track Name already used');
		data = false;
	}
	return data;
}

export async function NewPlaylist(PlaylistName) {
	var err1 = 'There is no playlist with this playlistname';
	var data = true;
	var PlaylistID = (await Playlist.findOne({ PlaylistName })) || err1;
	if (PlaylistID === err1) {
		let OwnerAddress = await NewPlaylist_Contract(PlaylistName);
		let Id = await Playlist.count();
		console.log(Id);
		const playlist = new Playlist({
			Id,
			PlaylistName,
			OwnerAddress,
		});
		await playlist.save();
		console.log('Playlist Created Succesfully');
		data = true;
	} else {
		console.log('You have a playlist with this name already');
		data = false;
	}
	return data;
}

export async function NewAlbum(AlbumName) {
	var err1 = 'There is no album with this AlbumName';
	var data = true;
	var AlbumID = (await Album.findOne({ AlbumName })) || err1;
	if (AlbumID === err1) {
		let OwnerAddress = await NewAlbum_Contract(AlbumName);
		let Id = await Album.count();
		console.log(Id);
		const album = new Album({
			Id,
			AlbumName,
			OwnerAddress,
		});
		await album.save();
		console.log('Album Created Succesfully');
		data = true;
	} else {
		console.log('You have a album with this name already');
		data = false;
	}
	return data;
}

export async function AddTrackToPlaylist(PlaylistName, TrackName) {
	let trackcheck = await TrackCheck(TrackName);
	let playlistcheck = await PlaylistCheck(PlaylistName);
	let res;
	if (trackcheck[1] & playlistcheck[1]) {
		let ownerAddress = await AddressCheck();
		console.log(ownerAddress);
		if (ownerAddress == playlistcheck[0].OwnerAddress) {
			await AddTrackToPlaylist_Contract(playlistcheck[0].Id, trackcheck[0].Id);
			await Playlist.findOneAndUpdate(
				{ _id: playlistcheck[0]._id },
				{ $push: { Tracks: trackcheck[0].Id } },
			);
			res = 'Track Succesfully added to Playlist';
		} else {
			res = 'You are not the owner of playlist';
		}
	} else if (trackcheck[1] == false) {
		res = trackcheck[0];
	} else {
		res = playlistcheck[0];
	}
	return res;
}

export async function DeleteTrackToPlaylist(PlaylistName, TrackName) {
	let trackcheck = await TrackCheck(TrackName);
	let playlistcheck = await PlaylistCheck(PlaylistName);
	let res;
	if (trackcheck[1] & playlistcheck[1]) {
		let ownerAddress = await AddressCheck();
		if (ownerAddress == playlistcheck[0].OwnerAddress) {
			await DeleteTrackToPlaylist_Contract(
				playlistcheck[0].Id,
				trackcheck[0].Id,
			);
			await Playlist.findOneAndUpdate(
				{ _id: playlistcheck[0]._id },
				{ $pull: { Tracks: trackcheck[0].Id } },
			);
			res = 'Track Succesfully deleted from Playlist';
		} else {
			res = 'You are not the owner of playlist';
		}
	} else if (trackcheck[1] == false) {
		res = trackcheck[0];
	} else {
		res = playlistcheck[0];
	}
	return res;
}

export async function AddTrackToAlbum(AlbumName, TrackName) {
	let trackcheck = await TrackCheck(TrackName);
	let albumcheck = await AlbumCheck(AlbumName);
	let res;
	if (trackcheck[1] & albumcheck[1]) {
		let ownerAddress = await AddressCheck();
		let ownerAddress1 = await MusicList(trackcheck[0].Id);
		let ownerAddress2 = await AlbumList(albumcheck[0].Id);
		if (ownerAddress1.musicOwner == ownerAddress2.albumOwner) {
			if (ownerAddress2.albumOwner == ownerAddress) {
				await AddTrackToAlbum_Contract(albumcheck[0].Id, trackcheck[0].Id);
				await Album.findOneAndUpdate(
					{ _id: albumcheck[0]._id },
					{ $push: { Tracks: trackcheck[0].Id } },
				);
				res = 'Track Succesfully added to Album';
			} else {
				res = 'You are not the owner of Album';
			}
		} else {
			res = 'Album and Music owner must to be same';
		}
	} else if (trackcheck[1] == false) {
		res = trackcheck[0];
	} else {
		res = albumcheck[0];
	}
	return res;
}

export async function DeleteTrackToAlbum(AlbumName, TrackName) {
	let trackcheck = await TrackCheck(TrackName);
	let albumcheck = await AlbumCheck(AlbumName);
	let res;
	if (trackcheck[1] & albumcheck[1]) {
		let ownerAddress = await AddressCheck();
		let ownerAddress1 = await MusicList(trackcheck[0].Id);
		let ownerAddress2 = await AlbumList(albumcheck[0].Id);
		if (ownerAddress1.musicOwner == ownerAddress2.albumOwner) {
			if (ownerAddress2.albumOwner == ownerAddress) {
				await DeleteTrackToAlbum_Contract(albumcheck[0].Id, trackcheck[0].Id);
				await Album.findOneAndUpdate(
					{ _id: albumcheck[0]._id },
					{ $pull: { Tracks: trackcheck[0].Id } },
				);
				res = 'Track Succesfully deleted from Album';
			} else {
				res = 'You are not the owner of Album';
			}
		} else {
			res = 'Album and Music owner must to be same';
		}
	} else if (trackcheck[1] == false) {
		res = trackcheck[0];
	} else {
		res = albumcheck[0];
	}
	return res;
}

export async function TrackCheck(TrackName) {
	var err = 'Track is not found';
	let data;
	let res;
	var TrackID = (await Track.findOne({ TrackName })) || err;
	console.log(TrackID);
	if (TrackID !== err) {
		data = TrackID;
		res = true;
	} else {
		data = err;
		res = false;
	}
	return [data, res];
}

export async function PlaylistCheck(PlaylistName) {
	var err = 'Playlist is not found';
	let data;
	let res;
	var PlaylistID = (await Playlist.findOne({ PlaylistName })) || err;
	console.log(PlaylistID);
	if (PlaylistID !== err) {
		data = PlaylistID;
		res = true;
	} else {
		data = err;
		res = false;
	}
	return [data, res];
}

export async function AlbumCheck(AlbumName) {
	var err = 'Album is not found';
	let data;
	let res;
	var AlbumID = (await Album.findOne({ AlbumName })) || err;
	console.log(AlbumID);
	if (AlbumID !== err) {
		data = AlbumID;
		res = true;
	} else {
		data = err;
		res = false;
	}
	return [data, res];
}
