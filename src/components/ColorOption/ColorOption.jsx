import React, { useEffect, useState } from 'react';
import styles from './colorOption.module.css';

//SET YOUR COLOR FOR CIRCLE ICON

const ColorOption = ({ color, selectedColor, setSelectedColor }) => {
	const [active, setActive] = useState(false);
	const style = {
		backgroundColor: color,
		border: active ? '2px solid #000000' : '',
	};

	useEffect(() => {
		if (selectedColor === color) {
			setActive(true);
		} else {
			setActive(false);
		}
	}, [selectedColor]);

	return (
		<div
			onClick={() => setSelectedColor(color)}
			className={styles.ColorContainer}
			style={style}
		></div>
	);
};

export default ColorOption;
