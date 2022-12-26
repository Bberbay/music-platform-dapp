import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const AlbumSchema = new Schema(
	{
		Id: {
			type: String,
			required: true,
		},
		AlbumName: {
			type: String,
			required: true,
		},
		Tracks: {
			type: Array,
		},
		OwnerAddress: {
			type: String,
		},
	},
	{ timestamps: true },
);

const Album = model('Album', AlbumSchema);
export default Album;
