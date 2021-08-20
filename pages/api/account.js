import User from '../../models/User';
import jwt from 'jsonwebtoken';
import connectDb from '../../utils/connectDb';
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
connectDb();

export default async (req, res) => {
	switch (req.method) {
		case 'GET':
			await handleGetRequest(req, res);
			break;
		case 'PUT':
			await handlePutRequest(req, res);
			break;
		default:
			res.status(405).send(`El metodo ${req.method} no esta permitido`);
			break;
	}
};

async function handleGetRequest(req, res) {
	if (!('authorization' in req.headers)) {
		return res.status(401).send('No hay token');
	}
	try {
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		);
		const user = await User.findOne({ _id: userId });
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).send('Usuario no encontrado');
		}
	} catch (error) {
		res.status(403).send('Token invalido');
	}
}

async function handlePutRequest(req, res) {
	const { _id, role, animalId } = req.body;
	console.log(req.body);
	await User.findOneAndUpdate(
		{ _id: _id },
		{ role: role, $addToSet: { reservedAnimals: animalId } }
	);
	res.status(203).send('Usuario actualizado');
}
