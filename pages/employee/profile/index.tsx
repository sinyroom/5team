//hook
import { useState } from 'react';

//style
import styles from './profile.module.css';

//image
import PathIcon from '@/assets/img/pathIcon.svg';
import SmartPhoneIcon from '@/assets/img/smartPhoneIcon.svg';

//employee/profile
export default function ProfilePage() {
	const [applyList, setApplyList] = useState(false); // 신청 내역 여부입니다. default, false.

	return (
		<>
			<div className={styles.profileBlock}>
				<div className={styles.profileTitle}>내 프로필</div>
				<div className={styles.profileDetailed}>
					<div>
						<div id={styles.name}>이름</div>
						<div id={styles.profileName}>홍길동</div>
						<div id={styles.phoneNumber}>
							<SmartPhoneIcon style={{ width: '20px', height: '20px' }} />
							010-0000-0000
						</div>
						<div id={styles.preferLocation}>
							<PathIcon style={{ objectFit: 'contain', width: '20px', height: '20px' }} />
							선호 지역: 서울시 도봉구
						</div>
						<div id={styles.profileIntroduce}>열심히 일 하겠습니다.</div>
					</div>
					<div> 편집하기</div>
				</div>
			</div>
			<div className={styles.applyListBlock}>신청 내역</div>
		</>
	);
}
