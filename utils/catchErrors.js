function catchErrors(error, displayError) {
	let errorMsg;
	if (error.response) {
		errorMsg = error.response.data;
		console.error('Error: ', errorMsg);
	} else if (error.request) {
		errorMsg = error.request;
		console.error('Error: ', errorMsg);
	} else {
		errorMsg = error.message;
		console.error('Error: ', errorMsg);
	}
	displayError(errorMsg);
}

export default catchErrors;
