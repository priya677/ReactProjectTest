import { useContext, useEffect, useState } from 'react';
import SingleGroupSection from '../SingleGroupSection/SingleGroupSection';
import styles from './sideBar.module.css';
import { SelectedNoteGroupContext } from '../../context/selectedNoteGroupContext';
import { TiTick } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';
import DeletePopup from '../DeletePopup/DeletePopup';

const SideBar = ({ allNotes, setShowRightContainer, setShowLeftContainer, isSmallScreen }) => {
	const { selectedNoteGroup, setSelectedNoteGroup } = useContext(SelectedNoteGroupContext);
	const [isPopup, setIsPopup] = useState(false);
	const handleClick = () => {
		setSelectedNoteGroup('');
	};

	const handleClose = () => {
		setIsPopup(!isPopup);
	};

	const handleDeletePopup = () => {
		setIsPopup(true);
	};

	return (
		<main className={styles.mainContainer}>
			<h1 onClick={handleClick} className={styles.heading}>
				Pocket Notes
			</h1>
			<div className={styles.notesContainer}>
				{allNotes.length > 0 ? (
					<div className={styles.allNotes}>
						{allNotes.map((note) => {
							return (
								<div
									key={note.id}
									className={styles.singleGroupContainer}
									style={
										selectedNoteGroup.id === note.id ? { color: '#1fa567' } : {}
									}
								>
									<SingleGroupSection
										key={note.id}
										groupDetail={note}
										isSmallScreen={isSmallScreen}
										setShowLeftContainer={setShowLeftContainer}
										setShowRightContainer={setShowRightContainer}
									/>

									{selectedNoteGroup.id === note.id ? (
										<div className={styles.actionButtons}>
											<MdDelete
												onClick={handleDeletePopup}
												className={styles.deleteIcon}
											/>
										</div>
									) : (
										<></>
									)}
								</div>
							);
						})}
					</div>
				) : (
					<div className={styles.defaultNote}>Add new Notes here</div>
				)}
			</div>

			{isPopup && (
				<div className={styles.popupContainer}>
					{/* modal */}
					<DeletePopup
						name={selectedNoteGroup.name}
						open={isPopup}
						selectedNoteGroup={selectedNoteGroup}
						setSelectedNoteGroup={setSelectedNoteGroup}
						setOpen={setIsPopup}
						onClose={handleClose}
					/>
				</div>
			)}
		</main>
	);
};

export default SideBar;
