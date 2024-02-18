import { useEffect, useState } from 'react';

const useInitials = (fullName) => {
	const [initials, setInitials] = useState('');

	useEffect(() => {
		if (fullName) {
			const words = fullName.split(' ');
			const firstInitial = words[0] ? words[0].charAt(0).toUpperCase() : '';
			const secondInitial = words.length > 1 ? words[1].charAt(0).toUpperCase() : '';
			const fullInitial = firstInitial + secondInitial;
			setInitials(fullInitial);
		}
	}, [fullName]);
	return initials;
};

export default useInitials;
