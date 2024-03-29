import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const PlaylistSchema = new Schema({
    PlaylistName: {
    type: String,
    required: true,
    },
    Tracks:{
    type: Array,
    },
    OwnerAddress: {
    type: String,
    },
},
{ timestamps: true }
);;

const Playlist = model('Playlist', PlaylistSchema);
export default Playlist;