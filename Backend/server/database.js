import mongoose from "mongoose";
import User from "../model/User.js";
import Track from "../model/Track.js";
import Playlist from "../model/Playlist.js";
import Album from "../model/Album.js";
import jwt from "jsonwebtoken";


mongoose
  .connect(
    "mongodb+srv://bberbay:bberbay@btb.zl6hoyp.mongodb.net/BTB"
  )
  .then(() => {
    console.log("Connected to the Database.");
  })
  .catch((err) => {
    console.log(err);
  });

export async function RegisterUser(username, email, password) {
  const user = new User({
    username,
    email,
    password,
  });
  await user.save();
  console.log("User Registered Succesfully");
}

export async function LoginUser(username, password) {
	var err1 = 'There is no user with this username';
	var err2 = 'Password is wrong';
	var UserID = (await User.findOne({ username })) || err1;
	var UserID2 = (await User.findOne({ username, password })) || err2;
	if (UserID === err1) {
		console.log(err1);
		return err1;
	} else if (UserID2 === err2) {
		console.log(err2);
		return err2;
	} else if (UserID.username === UserID2.username) {
		console.log('User Login Successful');
		return 'User Login Successful';
	}
  var err1 = "There is no user with this username";
  var err2 = "Password is wrong";
  var UserID = (await User.findOne({ username })) || err1;
  var UserID2 = (await User.findOne({ username, password })) || err2;
  if (UserID === err1) {
    console.log(err1);
    return err1;
  } else if (UserID2 === err2) {
    console.log(err2);
    return err2;
  } else if (UserID.username === UserID2.username) {

    console.log("User Login Successful 123");
   /* const payload = {
      _id : User._id,
      password : User.password
    }
    jwt.sign(payload,key, {
      expiresIn : 600000
    }, (err,token) => {
      res.status(200).json ({
        success:true,
        token : `Bearer ${token}`,
        message : "Logged in"
      })
    })
  */
    return "User Login Successful 123";
  }
}

export async function updatePassword(username, password, UpdatedPassword) {
  var err2 = "Password is Wrong";
  var UserID = await User.findOne({ username });
  var UserID2 = (await User.findOne({ username, password })) || err2;

  if (UserID2 === err2) {
    console.log(err2);
    return ["Password is Wrong"];
  } else if (UserID.username === UserID2.username) {
    await User.findOneAndUpdate({ username }, { password: UpdatedPassword });
    console.log("Password Changed Succesfully");
    return ["Password Changed Succesfully", UpdatedPassword];
  }
}

export async function DeleteUser(username, password) {
  var err2 = "Password is Wrong";
  var UserID = await User.findOne({ username });
  var UserID2 = (await User.findOne({ username, password })) || err2;
  console.log(UserID);
  console.log(UserID2);

  if (UserID2 === err2) {
    console.log(err2);
    return err2;
  } else if (UserID.username === UserID2.username) {
    await User.deleteOne({ username });
    console.log("Deleted Account Successfully");
    return "Deleted Account Successfully";
  }
}

export async function NewTrack(TrackName, OwnerAddress, Ipfs) {
  var err1 = "There is no music with this IPFS";
  var data =true;
  var trackCheck = (await Track.findOne({ Ipfs })) || err1;
  if (trackCheck === err1) {
    const track = new Track({
      TrackName,
      OwnerAddress,
      Ipfs,
    });
    // Insert the article in our MongoDB database
    await track.save();
    console.log("Track Created Succesfully");
    data =true;
  } else {
    console.log("Track Ipfs already used");
    data =false;
  }
  return(data)
}

export async function NewPlaylist(PlaylistName, OwnerAddress) {
  var err1 = "There is no playlist with this playlistname";
  var data =true;
  var PlaylistID = (await Playlist.findOne({ PlaylistName, OwnerAddress })) || err1
  if (PlaylistID === err1) {
  const playlist = new Playlist({
    PlaylistName,
    OwnerAddress,
  });
  await playlist.save();
  console.log("Playlist Created Succesfully");
  data =true;
  }else {
    console.log("You have a playlist with this name already");
    data =false;
  }
  return(data)
}

export async function NewAlbum(AlbumName, OwnerAddress) {
  var err1 = "There is no album with this AlbumName";
  var data =true;
  var AlbumID = (await Album.findOne({ AlbumName, OwnerAddress })) || err1
  if (AlbumID === err1) {
  const album = new Album({
    AlbumName,
    OwnerAddress,
  });
  await album.save();
  console.log("Album Created Succesfully");
  data =true;
  }else {
    console.log("You have a album with this name already");
    data =false;
  }
return(data)
}

export async function AddTrackToPlaylist(PlaylistName,TrackName,OwnerAddress) {
  var err1 = "There is no Playlist with this PlaylistName";
  var err2 = "Track is not found";
  var err3 = "Track is already added to Playlist"
  var res ="Track added to Playlist succesfuly"
  var data =true;
  var PlaylistID = (await Playlist.findOne({ PlaylistName, OwnerAddress })) || err1
  var TrackID = (await Track.findOne({ TrackName })) || err2
  var TrackCheck =""
  for (var i of PlaylistID.Tracks){
    if  (i.toString()==TrackID._id.toString()){
      TrackCheck =err3
      break
    } 
  }
  if (PlaylistID!==err1){
    if(TrackID!==err2){
      if(TrackCheck!==err3){
        await Playlist.findOneAndUpdate(
          { _id: PlaylistID._id },
          { $push: { Tracks: TrackID._id } }
        );
        data =true;
      } else {
        res = err3;
        data = false;
      }
    }else {
      res = err2;
      data = false;
    }
  }else {
    res = err1;
    data = false;
  }
  return [data,res]
}

export async function DeleteTrackToPlaylist(PlaylistName,TrackName,OwnerAddress) {
  var err1 = "There is no Playlist with this PlaylistName";
  var err2 = "Track is not found";
  var err3 = "Track deleted from Playlist succesfuly"
  var res = "Track can not found at Playlist"
  var data =true;
  var PlaylistID = (await Playlist.findOne({ PlaylistName, OwnerAddress })) || err1
  var TrackID = (await Track.findOne({ TrackName })) || err2
  var TrackCheck =""
  for (var i of PlaylistID.Tracks){
    if  (i.toString()==TrackID._id.toString()){
      TrackCheck =err3
      break
    } 
  }
  if (PlaylistID!==err1){
    if(TrackID!==err2){
      if(TrackCheck===err3){
        await Playlist.findOneAndUpdate(
          { _id: PlaylistID._id },
          { $pull: { Tracks: TrackID._id } }
        );
        data =true;
        res = err3;
      } else {
        data = false;
      }
    }else {
      res = err2;
      data = false;
    }
  }else {
    res = err1;
    data = false;
  }
  return [data,res]
}

export async function AddTrackToAlbum(AlbumName, TrackName, OwnerAddress) {
  var err1 = "There is no album with this AlbumName";
  var err2 = "Track is not found";
  var err3 = "Track is already added to Album"
  var res ="Track added to Album succesfuly"
  var data =true;
  var AlbumID = (await Album.findOne({ AlbumName, OwnerAddress })) || err1
  var TrackID = (await Track.findOne({ TrackName,OwnerAddress })) || err2
  var TrackCheck =""
  for (var i of AlbumID.Tracks){
    if  (i.toString()==TrackID._id.toString()){
      TrackCheck =err3
      break
    } 
  }
  if (AlbumID!==err1){
    if(TrackID!==err2){
      if(TrackCheck!==err3){
        await Album.findOneAndUpdate(
          {_id: AlbumID._id },
          { $push: { Tracks: TrackID._id } }
        );
        data =true;
      } else {
        res = err3;
        data = false;
      }
    }else {
      res = err2;
      data = false;
    }
  }else {
    res = err1;
    data = false;
  }
  return [data,res]
}

export async function DeleteTrackToAlbum(AlbumName, TrackName, OwnerAddress) {
  var err1 = "There is no album with this AlbumName";
  var err2 = "Track is not found";
  var err3 = "Track deleted from Album succesfuly"
  var res ="Track can not found at Album"
  var data =true;
  var AlbumID = (await Album.findOne({ AlbumName, OwnerAddress })) || err1
  var TrackID = (await Track.findOne({ TrackName,OwnerAddress })) || err2
  var TrackCheck =""
  for (var i of AlbumID.Tracks){
    if  (i.toString()==TrackID._id.toString()){
      TrackCheck =err3
      break
    } 
  }
  if (AlbumID!==err1){
    if(TrackID!==err2){
      if(TrackCheck==err3){
        await Album.findOneAndUpdate(
          {_id: AlbumID._id },
          { $pull: { Tracks: TrackID._id } }
        );
        data =true;
        res = err3;
      } else {
        data = false;
      }
    }else {
      res = err2;
      data = false;
    }
  }else {
    res = err1;
    data = false;
  }
  return [data,res]
}
