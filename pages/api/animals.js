import Animals from '../../models/AnimalsModel';
import connectDb from '../../utils/connectDb';

connectDb();

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

export default async (req, res) => {
	const { page, size } = req.query;
	const pageNum = Number(page);
	const pageSize = Number(size);
	let animals = [];
	const totalDocs = await Animals.countDocuments();
	const totalPages = Math.ceil(totalDocs / pageSize);
	if (pageNum === 1) {
		animals = await Animals.find().limit(pageSize);
	} else {
		const skips = pageSize * (pageNum - 1);
		animals = await Animals.find().skip(skips).limit(pageSize);
	}
	res.status(200).json({ animals, totalPages });
};
