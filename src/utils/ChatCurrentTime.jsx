export const chatCurrentTime = () => {
	const currentDateTime = new Date();
	const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
	const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

	const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(currentDateTime);
	const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(currentDateTime);

	return { formattedDate, formattedTime };
};

chatCurrentTime();
