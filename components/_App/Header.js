import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { handleLogout } from '../../utils/auth';

function Header({ user }) {
	const router = useRouter();
	const isAdmin = user && user.role === 'admin';

	function isActive(route) {
		return route === router.pathname;
	}

	return (
		<Menu stackable fluid id='menu' inverted>
			<Container text>
				<Link href='/'>
					<Menu.Item header active={isActive('/')}>
						<Image
							size='mini'
							src='/static/logo.png'
							style={{ marginRight: '1em' }}
						/>
						Tri Rescates
					</Menu.Item>
				</Link>

				{isAdmin && (
					<Link href='/create'>
						<Menu.Item header active={isActive('/create')}>
							<Icon name='add square' size='large' />
							Crear animal
						</Menu.Item>
					</Link>
				)}

				{user ? (
					<>
						<Link href='/account'>
							<Menu.Item header active={isActive('/account')}>
								<Icon name='user' size='large' />
								Mi cuenta
							</Menu.Item>
						</Link>

						<Menu.Item onClick={handleLogout} header>
							<Icon name='sign out' size='large' />
							Cerrar sesion
						</Menu.Item>
					</>
				) : (
					<>
						<Link href='/login'>
							<Menu.Item header active={isActive('/login')}>
								<Icon name='sign in' size='large' />
								Iniciar sesion
							</Menu.Item>
						</Link>

						<Link href='/signup'>
							<Menu.Item header active={isActive('/signup')}>
								<Icon name='signup' size='large' />
								Registrarse
							</Menu.Item>
						</Link>
					</>
				)}
			</Container>
		</Menu>
	);
}

export default Header;
