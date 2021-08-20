import AccountHeader from '../components/Account/AccountHeader';
import AccountAnimalReservations from '../components/Account/AccountAnimalReservations';
import AccountPermissions from '../components/Account/AccountPermissions';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';

function Account({ user }) {
	return (
		<>
			<AccountHeader {...user} />
			<AccountAnimalReservations reservations={user.reservedAnimals} />
			{user.role === 'admin' && <AccountPermissions />}
		</>
	);
}

Account.getInitialProps = async (ctx) => {
	const { token } = parseCookies(ctx);
	const payload = { headers: { Authorization: token } };
	const url = `${baseUrl}/api/account`;
	const response = await axios.get(url, payload);
	return response.data;
};

export default Account;
