import React from 'react';
import axios from 'axios';
import { Header, Checkbox, Table, Icon } from 'semantic-ui-react';
import cookie from 'js-cookie';
import baseUrl from '../../utils/baseUrl';
import formatDate from '../../utils/formatDate';

function AccountPermissions() {
	const [users, setUsers] = React.useState([]);

	React.useEffect(() => {
		getUsers();
	}, []);

	async function getUsers() {
		const url = `${baseUrl}/api/users`;
		const token = cookie.get('token');
		const payload = { headers: { Authorization: token } };
		const response = await axios.get(url, payload);
		setUsers(response.data);
	}

	return (
		<div style={{ margin: '2em 0' }}>
			<Header as='h2'>
				<Icon name='settings' />
				Permisos de usuarios
			</Header>
			<Table compact celled definition>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell />
						<Table.HeaderCell>Nombre</Table.HeaderCell>
						<Table.HeaderCell>Email</Table.HeaderCell>
						<Table.HeaderCell>Registro</Table.HeaderCell>
						<Table.HeaderCell>Actualizado</Table.HeaderCell>
						<Table.HeaderCell>Rol</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{users.map((user) => (
						<UserPermission key={user._id} user={user} />
					))}
				</Table.Body>
			</Table>
		</div>
	);
}

function UserPermission({ user }) {
	const [admin, setAdmin] = React.useState(user.role === 'admin');
	const isFirstRun = React.useRef(true);

	React.useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}
		updatePermission();
	}, [admin]);

	function handleChangePermission() {
		setAdmin((prevState) => !prevState);
	}

	async function updatePermission() {
		const url = `${baseUrl}/api/account`;
		const userUpdate = {
			_id: user._id,
			role: admin ? 'admin' : 'user',
			reservedAnimals: user.reservedAnimals,
		};
		await axios.put(url, userUpdate);
	}

	return (
		<Table.Row>
			<Table.Cell collapsing>
				<Checkbox checked={admin} toggle onChange={handleChangePermission} />
			</Table.Cell>
			<Table.Cell>{user.name}</Table.Cell>
			<Table.Cell>{user.email}</Table.Cell>
			<Table.Cell>{formatDate(user.createdAt)}</Table.Cell>
			<Table.Cell>{formatDate(user.updatedAt)}</Table.Cell>
			<Table.Cell>{admin ? 'admin' : 'user'}</Table.Cell>
		</Table.Row>
	);
}

export default AccountPermissions;
