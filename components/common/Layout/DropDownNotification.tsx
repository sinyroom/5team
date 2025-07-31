import React, { useState } from 'react';

import Notification from '@/assets/img/notification.svg';
import styles from './DropDownNotification.module.css';
import NotificationCard from '@/components/Modal/Notification/Notification';

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
	]; // 하드 코딩 아님. 테스트를 위한 목 데이터 임 .

	const toggleDropdown = () => {
		setDropdownVisible(prev => !prev);
	};

	return (
		<>
			<button className={styles.notification} onClick={toggleDropdown}>
				<Notification id={styles.icon} />
			</button>

			{dropdownVisible && <NotificationCard notifications={mok} onClose={toggleDropdown} />}
		</>
	);
}
