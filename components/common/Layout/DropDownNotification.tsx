import React, { useState } from 'react';

import Notification from '@/assets/img/notification.svg';
import styles from './DropDownNotification.module.css';
import NotificationCard from '@/components/Modal/Notification/Notification.tsx';

export default function DropDownMenu() {
	const [dropdownVisible, setDropdownVisible] = useState(false); //visible 상태

	const mok = [
		{
			id: 1,
			store: '카페 굿모닝',
			date: '2024-07-24',
			time: '10:30',
			status: '승인',
			ago: '1시간 전',
		},
		{
			id: 1,
			store: '카페 굿모닝',
			date: '2024-07-24',
			time: '10:30',
			status: '승인',
			ago: '1시간 전',
		},
	];

	const toggleDropdown = () => {
		setDropdownVisible(prev => !prev);
	};

	return (
		<>
			<button className={styles.notification} onClick={toggleDropdown}>
				<Notification id={styles.icon} />
			</button>

			{dropdownVisible && (
				<div className={styles.notificationLocation}>
					<NotificationCard notifications={mok} onClose={toggleDropdown} />
				</div>
			)}
		</>
	);
}
