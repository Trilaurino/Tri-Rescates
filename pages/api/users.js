import User from '../../models/User';
import jwt from 'jsonwebtoken';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

export default async (req, res) => {
	try {
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET
		);
		const users = await User.find({ _id: { $ne: userId } }).sort({
			role: 'asc',
		});
		res.status(200).json(users);
	} catch (error) {
		console.error(error);
		res.status(403).send('Por favor inicie sesion nuevamente');
	}
};
