import React from 'react';
import heroImage from '../../assets/heroImage.png';
import styles from './defaultSection.module.css';
import { MdLock } from 'react-icons/md';

//code for Default Option
const DefaultSection = () => {
	return (
		<div className={styles.HeadContainer}>
			<div className={styles.ImageContainer}>
				<img src={heroImage} alt='heroImage' />
			</div>
			<h2 className={styles.heading}>Pocket Notes</h2>
			<p className={styles.infoNote}>
				Send and receive messages without keeping your phone online.Use Pocket Notes on up
				to 4 linked devices and 1 mobile Phone.
			</p>

			<div className={styles.secureNote}>
				<MdLock />
				<p>end-to-end encrypted</p>
			</div>
		</div>
	);
};

export default DefaultSection;
