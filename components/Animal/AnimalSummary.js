import { Item, Label, Button } from 'semantic-ui-react';
// import AdoptAnimal from "./AddProductToCart";

function AnimalSummary({
	name,
	photoPath,
	age,
	sex,
	description,
	health,
	reserved,
}) {
	return (
		<Item.Group>
			<Item>
				<Item.Image size='medium' src={photoPath} />
				<Item.Content>
					<Item.Header>{name}</Item.Header>
					<Item.Description>
						<p>{age > 12 ? age / 12 + ' años' : age + ' meses'}</p>
						<Label>
							{sex} • {health}
						</Label>
						<Label>{description}</Label>
					</Item.Description>
					{reserved.isReserved && (
						<Item.Extra>
							<Button
								disabled
								color='red'
								content={'Adoptado por ' + reserved.reservedBy}
							/>
						</Item.Extra>
					)}
				</Item.Content>
			</Item>
		</Item.Group>
	);
}

export default AnimalSummary;
