//Hook
import React, { useState, useEffect } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth.tsx';
import { useRouter } from 'next/router';

//style and svg
import styles from './Header.module.css';
import LogoImage from '@/assets/img/logo.svg';
import LogoImageSmall from '@/assets/img/logoSmall.svg';
import Search from '@/assets/img/search.svg';

//Components
import DropDownNotification from './DropDownNotification.tsx';

export default function Header() {
	const [loginState, setLoginState] = useState(false); //로그인 state <假 데이터>
	const [inputValue, setInputValue] = useState('');
	const [mobileScreen, setMobileScreen] = useState(false); // 모바일 화면 상태

	const windowWidth = useWindowWidth();
	const router = useRouter();

	useEffect(() => {
		if (windowWidth <= 730) {
			setMobileScreen(true);
		} else {
			setMobileScreen(false);
		}
	}, [windowWidth]);

	const handleClickLogin = () => {
		router.push('../login');
	};

	const handleClickLogout = () => {
		router.push('.');
	};

	const handleClickSignup = () => {
		router.push('./register');
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
								<button onClick={handleClickLogout}>로그아웃</button>
								<DropDownNotification />
							</>
						) : (
							<>
								<div className={styles.noneLogin}>
									<button onClick={handleClickLogin}>로그인</button>
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
