//hook
import { useState } from 'react';

//style
import styles from './profile.module.css';

//employee/profile
export default function ProfilePage() {
	return (
		<>
			<div>
				<div>내 프로필</div>
				<div>
					<div>
						<div>이름</div>
						<div>홍길동</div>
						<div>010-0000-0000</div>
						<div>선호 지역: 서울시 도봉구</div>
						<div>열심히 일 하겠습니다.</div>
					</div>
					<div>(button) 편집하기</div>
				</div>
			</div>
			<div>신청 내역</div>
		</>
	);
}
