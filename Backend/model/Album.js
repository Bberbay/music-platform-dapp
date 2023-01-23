import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const AlbumSchema = new Schema({
    AlbumName: {
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

const Album = model('Album', AlbumSchema);
export default Album;