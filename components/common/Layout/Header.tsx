//Hook
import React, { useState, useEffect } from 'react';
import useWindowWidth from '@/hooks/useWindowWidth.tsx';
import { useRouter } from 'next/router';
import { useUserContext } from '@/contexts/auth-context';

//style and svg
import styles from './Header.module.css';
import LogoImage from '@/assets/img/logo.svg';
import LogoImageSmall from '@/assets/img/logoSmall.svg';
import Search from '@/assets/img/search.svg';

//Components
import DropDownNotification from './DropDownNotification.tsx';

//api
import axiosInstance from '@/api/settings/axiosinstance.ts';

export default function Header() {
	const [loginState, setLoginState] = useState(false); //로그인 state <假 데이터>
	const [inputValue, setInputValue] = useState('');
	const [mobileScreen, setMobileScreen] = useState(false); // 모바일 화면 상태
	const [loginType, setLoginType] = useState(null);
	const windowWidth = useWindowWidth();
	const router = useRouter();
	const { user } = useUserContext();
	useEffect(() => {
		if (user == null) {
			setLoginState(false);
		} else {
			setLoginState(true);
			if (user.type == 'employee') {
				setLoginType('employee');
			} else {
				setLoginType('employer');
			}
		}
	}, []);

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
		localStorage.clear();
		setLoginState(false);
	};

	const handleClickSignup = () => {
		router.push('../register');
	};

	const handleClickMyShop = () => {
		router.push('./owner/store');
	};

	const handleClickMyProfile = () => {
		router.push('./employee/profile');
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
								{loginType === 'employer' ? (
									<button onClick={handleClickMyShop}>내 가게</button>
								) : (
									<button onClick={handleClickMyProfile}>내 프로필</button>
								)}
								<button onClick={handleClickLogout}>로그아웃</button>
								<DropDownNotification />
							</>
						) : (
							<>
								<div className={styles.noneLogin}>
									<button onClick={handleClickLogin}>로그인</button>
									<button onClick={handleClickSignup}>회원가입</button>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
