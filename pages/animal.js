import axios from 'axios';
import AnimalSummary from '../components/Animal/AnimalSummary';
import AnimalAttributes from '../components/Animal/AnimalAttributes';
import baseUrl from '../utils/baseUrl';

function Animal({ animal, user }) {
	return (
		<>
			<AnimalSummary user={user} {...animal} />
			<AnimalAttributes user={user} {...animal} />
		</>
	);
}

Animal.getInitialProps = async ({ query: { _id } }) => {
	const url = `${baseUrl}/api/animal`;
	const payload = { params: { _id } };
	const response = await axios.get(url, payload);
	return { animal: response.data };
};

export default Animal;
