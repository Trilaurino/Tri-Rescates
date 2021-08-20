import React from 'react';
import {
	Form,
	Input,
	TextArea,
	Button,
	Message,
	Header,
	Icon,
	Image,
} from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';
import { useS3Upload } from 'next-s3-upload';

const BASE_ANIMAL = {
	name: '',
	age: '',
	sex: '',
	health: '',
	description: '',
	photoPath: '',
};

function CreateAnimal() {
	const [animal, setAnimal] = React.useState(BASE_ANIMAL);
	const [mediaPreview, setMediaPreview] = React.useState();
	const [success, setSuccess] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [disabled, setDisabled] = React.useState(true);
	const [error, setError] = React.useState('');
	const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

	React.useEffect(() => {
		const isAnimal = Object.values(animal).every((el) => Boolean(el));
		isAnimal ? setDisabled(false) : setDisabled(true);
	}, [animal]);

	function handleChange(event) {
		const { name, value } = event.target;
		setAnimal((prevState) => ({ ...prevState, [name]: value }));
	}

	async function handleImageUpload(file) {
		let { url } = await uploadToS3(file);
		setAnimal((prevState) => ({ ...prevState, photoPath: url }));
		setMediaPreview(url);
	}

	async function handleSubmit(event) {
		try {
			event.preventDefault();
			setLoading(true);
			setError('');
			const photoPath = mediaPreview;
			const url = `${baseUrl}/api/animal`;
			const { name, age, sex, health, description } = animal;
			const payload = { name, age, sex, health, description, photoPath };
			await axios.post(url, payload);
			setAnimal(BASE_ANIMAL);
			setSuccess(true);
		} catch (error) {
			catchErrors(error, setError);
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Header as='h2' block>
				<Icon name='add' color='orange' />
				Crear nuevo animal
			</Header>
			<Form
				loading={loading}
				error={Boolean(error)}
				success={success}
				onSubmit={handleSubmit}>
				<Message error header='Oops!' content={error} />
				<Message
					success
					icon='check'
					header='Exito!'
					content='Animal agregado'
				/>
				<Form.Group widths='equal'>
					<Form.Field
						control={Input}
						name='name'
						label='Nombre'
						placeholder='Nombre'
						value={animal.name}
						onChange={handleChange}
					/>
					<Form.Field
						control={Input}
						name='sex'
						label='Sexo'
						placeholder='Sexo'
						value={animal.sex}
						onChange={handleChange}
					/>
					<Form.Field
						control={Input}
						name='age'
						label='Edad'
						placeholder='Edad'
						min='1'
						max='300'
						step='1'
						type='number'
						value={animal.age}
						onChange={handleChange}
					/>
					<Form.Field
						control={Input}
						name='health'
						label='Salud'
						placeholder='Salud'
						value={animal.health}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Field
					control={TextArea}
					name='description'
					label='Descripcion'
					placeholder='Descripcion'
					onChange={handleChange}
					value={animal.description}
				/>
				<Button
					onClick={(evt) => {
						evt.preventDefault();
						openFileDialog();
					}} style={{marginBottom: '15px'}}>
					Subir Imagen
				</Button>
				<FileInput onChange={handleImageUpload} />
				{mediaPreview && (
					<Image src={mediaPreview} rounded centered size='small' />
				)}
				<Form.Field
					control={Button}
					disabled={disabled || loading}
					color='blue'
					icon='pencil alternate'
					content='Subir'
					type='submit'
				/>
			</Form>
		</>
	);
}

export default CreateAnimal;
