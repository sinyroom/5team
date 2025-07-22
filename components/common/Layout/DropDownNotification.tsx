import React, { useState } from 'react';

import Notification from '@/assets/img/notification.svg';
import styles from './DropDownNotification.module.css';
export default function DropDownMenu() {
	const [dropdownVisible, setDropdownVisible] = useState(false); //visible 상태

	const toggleDropdown = () => {
		setDropdownVisible(prev => !prev);
	};

	return (
		<>
			<button className={styles.notification} onClick={toggleDropdown}>
				<Notification id={styles.icon} />
			</button>

			{dropdownVisible && (
				<div className={styles.dropDownMenu}>
					<div>알림</div>
				</div>
			)}
		</>
	);
}
