import { useContext, useEffect, useState } from 'react';
import styles from './dashboard.module.css';
import ChatSection from '../../components/ChatSection/ChatSection';
import DefaultSection from '../../components/DefaultSection/DefaultSection';

import Modal from '../../components/Modal/Modal';
import { FaPlus } from 'react-icons/fa';
import SideBar from '../../components/SideBar/SideBar';
import { SelectedNoteGroupContext } from '../../context/selectedNoteGroupContext';

const Dashboard = () => {
	const [notesModal, setNotesModal] = useState(false);
	const allNotes = JSON.parse(localStorage.getItem('AllNotes')) || [];
	const [showRightContainer, setShowRightContainer] = useState(false);
	const [showLeftContainer, setShowLeftContainer] = useState(true);
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	const { selectedNoteGroup } = useContext(SelectedNoteGroupContext);
	const handleClose = () => {
		setNotesModal(!notesModal);
	};
	useEffect(() => {
		const handleResize = () => {
			
			if (window.innerWidth <= 760) {
				setIsSmallScreen(true);
				setShowLeftContainer(true);
				setShowRightContainer(false);
			} else {
				setIsSmallScreen(false);
				setShowLeftContainer(true);
				setShowRightContainer(true);
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

// Dashboard implementation handling

	return (
		<main>
			<div className={styles.TopSection}>
				{showLeftContainer && (
					<div className={styles.leftContainer}>
						<SideBar
							allNotes={allNotes}
							isSmallScreen={isSmallScreen}
							setShowRightContainer={setShowRightContainer}
							setShowLeftContainer={setShowLeftContainer}
						/>
						<div onClick={() => setNotesModal(true)} className={styles.addButton}>
							<FaPlus />
						</div>
					</div>
				)}

				{showRightContainer && (
					<div className={styles.RightContainer}>
						{selectedNoteGroup ? (
							<ChatSection
								
								allNotes={allNotes}
								isSmallScreen={isSmallScreen}
								setShowRightContainer={setShowRightContainer}
								setShowLeftContainer={setShowLeftContainer}
							/>
						) : (
							<DefaultSection />
						)}
					</div>
				)}
			</div>

			{notesModal && (
				<div className={styles.ModalContainer}>
					{/* Model section */}
					<Modal open={notesModal} setOpen={setNotesModal} onClose={handleClose} />
				</div>
			)}
		</main>
	);
};

export default Dashboard;
