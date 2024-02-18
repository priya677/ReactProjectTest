
import useInitials from '../../utils/useInitials';
import styles from './groupInitials.module.css';
const GroupInitials = ({ name, color }) => {

	const initials = useInitials(name);
	return (
		<div className={styles.AddGroup} style={{ backgroundColor: color }}>
			{initials}
		</div>
	);
};

export default GroupInitials;
