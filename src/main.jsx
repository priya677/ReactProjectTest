import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SelectedNoteGroupContextProvider } from './context/selectedNoteGroupContext.jsx';



ReactDOM.createRoot(document.getElementById('root')).render(
	<>
		<SelectedNoteGroupContextProvider>
			<App /> 
		</SelectedNoteGroupContextProvider>
	</>
);
