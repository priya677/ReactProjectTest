import { useContext } from 'react';
import styles from './singleGroupSection.module.css';
import GroupInitials from '../GroupInitials/GroupInitials';
import { SelectedNoteGroupContext } from '../../context/selectedNoteGroupContext';

const SingleGroupSection = ({
	groupDetail,
	setShowRightContainer,
	setShowLeftContainer,
	isSmallScreen,
}) => {
	const { setSelectedNoteGroup } = useContext(SelectedNoteGroupContext);
	const handleGroupSelected = (groupDetail) => {
		if (isSmallScreen) {
			
			setShowRightContainer((prev) => !prev);
			setShowLeftContainer((prev) => !prev);
		}
		setSelectedNoteGroup(groupDetail);
		localStorage.setItem('selectedGroupDetails', JSON.stringify(groupDetail));
	};

	return (
		<>
			{groupDetail.name && (
				<div
					onClick={() => handleGroupSelected(groupDetail)}
					className={styles.mainContainer}
				>
					<GroupInitials name={groupDetail.name} color={groupDetail.color} />
					<p className={styles.Name}>
						{groupDetail.name.length > 20
							? groupDetail.name.slice(0, 20) + '...'
							: groupDetail.name}
					</p>
				</div>
			)}
		</>
	);
};

export default SingleGroupSection;
