import Head from 'next/head';
import { Container } from 'semantic-ui-react';

import Header from './Header';

function Layout({ children, user }) {
	return (
		<>
			<Head>
				<link rel='stylesheet' type='text/css' href='/static/styles.css' />
				<link
					rel='stylesheet'
					href='//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css'
				/>
				<link rel='icon' type='image/png' href='/static/logo.png' />
				<link rel='shortcut icon' type='image/x-icon' href='/static/logo.ico' />
				<title>Tri Rescates</title>
			</Head>
			<Header user={user} />
			<Container text style={{ paddingTop: '1em' }}>
				{children}
			</Container>
		</>
	);
}

export default Layout;
