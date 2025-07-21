import React, { useState, useEffect } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth.tsx';
import styles from './Header.module.css';
import LogoImage from '@/assets/img/logo.svg';
import LogoImageSmall from '@/assets/img/logoSmall.svg';
import Notification from '@/assets/img/notification.svg';
import Search from '@/assets/img/search.svg';

export default function Header() {
	const [loginState, setLoginState] = useState(true); //로그인 state <假 데이터>
	const [inputValue, setInputValue] = useState('');
	const [mobileScreen, setMobileScreen] = useState(false); // 모바일 화면 상태

	const windowWidth = useWindowWidth();
	console.log(windowWidth);

	useEffect(() => {
		if (windowWidth <= 730) {
			setMobileScreen(true);
		} else {
			setMobileScreen(false);
		}
	}, [windowWidth]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(inputValue);
		setInputValue(e.target.value);
	};
	return (
		<>
			<div className={styles.header}>
				<div className={styles.headerContent}>
					{mobileScreen ? (
						<>
							<div className={styles.logoStyle}>
								<LogoImage id={styles.logoItem} />
							</div>
							<div className={styles.headerSearchBox}>
								<div>
									<Search id={styles.searchItem} />
								</div>
								<div className={styles.inputTag}>
									<form>
										<input
											type="text"
											name="headerSearch"
											value={inputValue}
											onChange={handleChange}
											placeholder="가게 이름으로 찾아보세요"
										/>
									</form>
								</div>
							</div>
						</>
					) : (
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
											value={inputValue}
											onChange={handleChange}
											placeholder="가게 이름으로 찾아보세요"
										/>
									</form>
								</div>
							</div>
						</div>
					)}
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
								<div className={styles.noneLogin}>
									<button>로그인</button>
									<button>회원가입</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
