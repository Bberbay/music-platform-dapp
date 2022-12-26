import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TrackSchema = new Schema(
	{
		Id: {
			type: String,
			required: true,
		},
		TrackName: {
			type: String,
			required: true,
		},
		Ipfs: {
			type: String,
			required: true,
			unique: true,
		},
		OwnerAddress: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

const Track = model('Track', TrackSchema);
export default Track;
