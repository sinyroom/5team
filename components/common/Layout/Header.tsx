import React, { useState } from 'react';

import styles from './Header.module.css';
import LogoImage from '@/assets/img/logo.svg';
import LogoImageSmall from '@/assets/img/logoSmall.svg';
import Notification from '@/assets/img/notification.svg';
import Search from '@/assets/img/search.svg';

export default function Header() {
	const [loginState, setLoginState] = useState(true); //로그인 state <假 데이터>
	const [InputValue, setInputValue] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(InputValue);
		setInputValue(e.target.value);
	};
	return (
		<>
			<div className={styles.header}>
				<div className={styles.headerContent}>
					<div className={styles.headerLogoAndSearch}>
						<div className={styles.logoStyle}>
							<LogoImage />
						</div>
						<div className={styles.headerSearchBox}>
							<Search />
							<div className={styles.inputTag}>
								<form>
									<input
										type="text"
										name="headerSearch"
										value={InputValue}
										onChange={handleChange}
										placeholder="가게 이름으로 찾아보세요"
										style={{ width: '400px' }}
									/>
								</form>
							</div>
						</div>
					</div>
					<div className={styles.headerMenu}>
						{loginState ? (
							<>
								<button>내 가게</button>
								<button>로그아웃</button>
								<button className={styles.notification}>
									<Notification />
								</button>
							</>
						) : (
							<>
								<button>로그인</button>
								<button>회원가입</button>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
