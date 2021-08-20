import React from 'react';
import axios from 'axios';
import AnimalsList from '../components/Index/AnimalsList';
import ProductPagination from '../components/Index/ProductPagination';
import baseUrl from '../utils/baseUrl';

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

function Home({ animals, totalPages }) {
	return (
		<>
			<AnimalsList animals={animals} />
			<ProductPagination totalPages={totalPages} />
		</>
	);
}

Home.getInitialProps = async (ctx) => {
	const page = ctx.query.page ? ctx.query.page : '1';
	const size = 9;
	const url = `${baseUrl}/api/animals`;
	const payload = { params: { page, size } };
	const response = await axios.get(url, payload);
	return response.data;
};

export default Home;
