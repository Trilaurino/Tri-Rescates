import { Card } from 'semantic-ui-react';

function AnimalsList({ animals }) {
	function animalsToItems(animals) {
		return animals.map((animal) => ({
			header: animal.name,
			image: animal.photoPath,
			meta: `${
				animal.age > 12 ? animal.age / 12 + ' años' : animal.age + ' meses'
			} · ${animal.sex} 
			${animal.reserved.isReserved ? "Reservado" : ''}`,
			color: `${animal.reserved.isReserved ? "red" : 'teal'}`,
			fluid: true,
			childKey: animal._id,
			href: `/animal?_id=${animal._id}`,
		}));
	}

	return (
		<Card.Group
			stackable
			itemsPerRow='3'
			centered
			items={animalsToItems(animals)}
		/>
	);
}

export default AnimalsList;
