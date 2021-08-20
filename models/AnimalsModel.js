import mongoose from 'mongoose';

const { String, Number } = mongoose.Schema.Types;

const AnimalsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	sex: {
		type: String,
	},
	health: {
		type: String,
	},
	description: {
		type: String,
		required: true,
	},
	photoPath: {
		type: String,
		unique: true,
		required: true,
	},
	reserved: {
		isReserved: { type: Boolean, required: true, default: false},
		reservedBy: { type: String, required: false },
	},
});

export default mongoose.models.Animals || mongoose.model('Animals', AnimalsSchema);
