import React from 'react';
import { Header, Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { useRouter } from 'next/router';
import Link from 'next/link';

function AnimalAttributes({ description, _id, user, reserved }) {
	const [modal, setModal] = React.useState(false);
	const [modalFunction, setModalFunction] = React.useState('adopt');
	const router = useRouter();
	const isAdmin = user && user.role === 'admin';

	async function handleDelete() {
		const url = `${baseUrl}/api/animal`;
		const payload = { params: { _id } };
		await axios.delete(url, payload);
		router.push('/');
	}

	async function handleAdopt() {
		const animalUrl = `${baseUrl}/api/animal?_id=${_id}`;
		const animalUpdate = {
			reserved: { isReserved: true, reservedBy: user.name },
		};
		const animalPayload = { _id, animalUpdate };

		const userUrl = `${baseUrl}/api/account`;
		const userUpdate = { _id: user._id, animalId: _id, role: user.role };

		await axios.put(animalUrl, animalPayload);
		await axios.put(userUrl, userUpdate);
		router.push('/');
	}

	return (
		<>
			<Header as='h3'>Acerca de este animal</Header>
			<p>{description}</p>
			{user && !reserved.isReserved ? (
				<Button
					color='green'
					content='Adoptar animal'
					onClick={() => {
						setModalFunction('adopt');
						setModal(true);
					}}
				/>
			) : (
				user && (
					<Button
						disabled
						color='red'
						content={'Adoptado por ' + reserved.reservedBy}
					/>
				)
			)}
			{!user && (
				<Link href='/login' as='button'>
					<Button
						color='teal'
						content='Inicia sesion para adoptar'
					/>
				</Link>
			)}
			{isAdmin && (
				<>
					<Button
						icon='trash alternate outline'
						color='red'
						content='Borrar animal'
						onClick={() => {
							setModalFunction('delete');
							setModal(true);
						}}
					/>
				</>
			)}
			{modalFunction === 'adopt' ? (
				<Modal open={modal} dimmer='blurring'>
					<Modal.Header>Confirmar adopcion</Modal.Header>
					<Modal.Content>
						<p>Estas seguro que deseas adoptar este animal?</p>
					</Modal.Content>
					<Modal.Actions>
						<Button onClick={() => setModal(false)} content='Cancelar' />
						<Button
							positive
							icon='paw'
							labelPosition='right'
							content='Adoptar'
							onClick={handleAdopt}
						/>
					</Modal.Actions>
				</Modal>
			) : (
				modalFunction === 'delete' && (
					<Modal open={modal} dimmer='blurring'>
						<Modal.Header>Confirmar borrado</Modal.Header>
						<Modal.Content>
							<p>
								Estas seguro que deseas borrar este animal de la base de datos?
							</p>
						</Modal.Content>
						<Modal.Actions>
							<Button onClick={() => setModal(false)} content='Cancelar' />
							<Button
								negative
								icon='trash'
								labelPosition='right'
								content='Borrar'
								onClick={handleDelete}
							/>
						</Modal.Actions>
					</Modal>
				)
			)}
		</>
	);
}

export default AnimalAttributes;
