import { Header, Accordion, Label, Icon, List, Image } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import React from 'react';

function AccountAnimalReservations({ reservations }) {
	const [loadingAnimals, setLoadingAnimals] = React.useState(true);
	const [allAnimals, setAllAnimals] = React.useState([]);

	React.useEffect(() => {
		const url = `${baseUrl}/api/animals`;
		const getAllAnimals = async () => {
			const data = await axios.get(url);
			setAllAnimals(data);
			setLoadingAnimals(false);
		};
		getAllAnimals();
	}, [reservations]);

	function mapAnimalsToPanels(reservations) {
		return allAnimals.data.animals
			.filter((animal) => reservations.includes(animal._id))
			.map((animal) => ({
				key: animal._id,
				title: {
					content: (
						<Label color='blue' content={animal.name + ' · ' + animal._id} />
					),
				},
				content: {
					content: (
						<>
							<List.Header as='h3'>{animal.name}</List.Header>
							<List>
								<List.Item key={'animal' + animal._id}>
									<Image avatar size='small' src={animal.photoPath} />
									<List.Content>
										<List.Description>
											<Label.Group size='small'>
												<Label
													content={animal.sex}
													basic
													style={{ marginLeft: '1em' }}
												/>
												<Label
													content={
														animal.age > 12
															? animal.age / 12 + ' años'
															: animal.age + ' meses'
													}
													basic
													style={{ marginLeft: '1em' }}
												/>
												<Label
													content={animal.health}
													basic
													style={{ marginLeft: '1em' }}
												/>
												<Label
													content={animal.description}
													basic
													style={{ marginLeft: '1em' }}
												/>
											</Label.Group>
										</List.Description>
									</List.Content>
								</List.Item>
							</List>
						</>
					),
				},
			}));
	}

	return (
		<>
			<Header as='h2'>
				<Icon name='folder open' />
				Historial de adopciones
			</Header>
			{loadingAnimals === false && (
				<>
					<Accordion
						fluid
						styled
						exclusive={false}
						panels={mapAnimalsToPanels(reservations)}
					/>
				</>
			)}
		</>
	);
}

export default AccountAnimalReservations;
