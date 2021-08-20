import { APIRoute } from 'next-s3-upload';
import { v4 as uuidv4 } from 'uuid';

export default APIRoute.configure({
	key(req, filename) {
        filename = uuidv4();
		return `uploads/images/animals/${filename}`;
	},
});
