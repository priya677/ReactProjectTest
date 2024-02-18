import { createContext, useState } from 'react';

export const SelectedNoteGroupContext = createContext('');

export const SelectedNoteGroupContextProvider = ({ children }) => {
	const [selectedNoteGroup, setSelectedNoteGroup] = useState(
		JSON.parse(localStorage.getItem('selectedGroupDetails')) || ''
	);
	return (
		<SelectedNoteGroupContext.Provider value={{ selectedNoteGroup, setSelectedNoteGroup }}>
			{children}
		</SelectedNoteGroupContext.Provider>
	);
};
