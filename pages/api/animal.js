import Animals from '../../models/AnimalsModel.js';
import connectDb from '../../utils/connectDb';

connectDb();
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

export default async (req, res) => {
	switch (req.method) {
		case 'GET':
			await handleGetRequest(req, res);
			break;
		case 'POST':
			await handlePostRequest(req, res);
			break;
		case 'PUT':
			await handlePutRequest(req, res);
			break;
		case 'DELETE':
			await handleDeleteRequest(req, res);
			break;
		default:
			res.status(405).send(`Method ${req.method} not allowed`);
			break;
	}
};

async function handleGetRequest(req, res) {
	const { _id } = req.query;
	const animal = await Animals.findOne({ _id });
	res.status(200).json(animal);
}

async function handlePostRequest(req, res) {
	const { name, age, sex, health, description, photoPath } = req.body;
	try {
		if (!name || !age || !sex || !health || !description || !photoPath) {
			return res.status(422).send('Te faltan campos!');
		}
		const animal = await new Animals({
			name,
			age,
			sex,
			health,
			description,
			photoPath,
		}).save();
		res.status(201).json(animal);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error de servidor');
	}
}

async function handlePutRequest(req, res) {
	const { _id, animalUpdate } = req.body;
	await Animals.findOneAndUpdate({ _id }, animalUpdate);
	res.status(203).send('Animal actualizado');
}

async function handleDeleteRequest(req, res) {
	const { _id } = req.query;
	try {
		await Animals.findOneAndDelete({ _id });
		res.status(204).json({});
	} catch (error) {
		console.error(error);
		res.status(500).send('Error eliminando animal');
	}
}
