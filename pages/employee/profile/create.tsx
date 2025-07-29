import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

import { TextInput } from '@/components/common/inputs/TextInput';
import { DropdownInput } from '@/components/common/inputs/DropdownInput';
import { TextareaInput } from '@/components/common/inputs/TextareaInput';
import Alert from '@/components/Modal/Alert/Alert';
import { getUser } from '@/api/users/getUser';
import { updateUser } from '@/api/users/updateUser';

import buttonStyle from '@/components/common/BaseButton/BaseButton.module.css';
import styles from './create.module.css';

export const getServerSideProps: GetServerSideProps = async context => {
	const { userId, token } = context.req.cookies;

	// 테스트용 쿠키 값 삽입
	// let { userId, token } = context.req.cookies;
	// userId = '7d36a348-c505-4452-8f29-a6c1fa1d01c6';
	// token =
	// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZDM2YTM0OC1jNTA1LTQ0NTItOGYyOS1hNmMxZmExZDAxYzYiLCJpYXQiOjE3NTMzNDgzODJ9.G6VJdK55gx8jRPu-eAD0nEdFxCfmv4NRgdniJYffBUo';

	// 디버깅용 코드
	// console.log('서버사이드 쿠키:', context.req.cookies);
	// console.log('사용할 userId:', userId);
	// console.log('사용할 token:', token);

	if (!userId || !token) {
		return {
			redirect: {
				destination: '/login',
				permanent: false,
			},
		};
	}

	try {
		const userData = await getUser(userId, token);
		return {
			props: {
				userData,
			},
		};
	} catch (error) {
		return {
			props: {
				userData: null,
			},
		};
	}
};

const Create = ({ userData }: { userData: any }) => {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [bio, setBio] = useState('');
	const [isAlertOpen, setIsAlertOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	const router = useRouter();

	useEffect(() => {
		const userIdCookie = Cookies.get('userId');
		const tokenCookie = Cookies.get('token');
		// 테스트용 코드
		// if (!userIdCookie || !tokenCookie) {
		// 	Cookies.set('userId', '7d36a348-c505-4452-8f29-a6c1fa1d01c6', {
		// 		path: '/',
		// 		sameSite: 'lax',
		// 		secure: false,
		// 	});
		// 	Cookies.set(
		// 		'token',
		// 		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3ZDM2YTM0OC1jNTA1LTQ0NTItOGYyOS1hNmMxZmExZDAxYzYiLCJpYXQiOjE3NTMzNDgzODJ9.G6VJdK55gx8jRPu-eAD0nEdFxCfmv4NRgdniJYffBUo',
		// 		{ path: '/', sameSite: 'lax', secure: false }
		// 	);
		// }

		const userInfo = userData.item;
		if (userData) {
			setName(userInfo.name || '');
			setPhone(userInfo.phone || '');
			setAddress(userInfo.address || '');
			setBio(userInfo.bio || '');
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		const userId = Cookies.get('userId');
		const token = Cookies.get('token');
		e.preventDefault();
		try {
			await updateUser(userId!, token!, { name, phone, address, bio });

			setAlertMessage('등록이 완료되었습니다.');
			setIsAlertOpen(true);
		} catch {
			setAlertMessage('등록에 실패했습니다.');
			setIsAlertOpen(true);
		}
	};

	const handleAlertConfirm = () => {
		router.push('/profile');
	};

	const handleAlertClose = () => {
		setIsAlertOpen(false);
	};

	const isDisabled: boolean = !name || !phone || !address || !bio;

	return (
		<>
			<div className={styles.container}>
				<div className={styles.titleWrapper}>
					<p className={styles.title}>내 프로필</p>
					<Image src="/img/icon/closeIcon.svg" alt="프로필 닫기" width={24} height={24} />
				</div>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.inputWrapper}>
						<div className={styles.input}>
							<TextInput
								id="name"
								label="이름"
								value={name}
								onChange={e => setName(e.target.value)}
								placeholder="입력"
								required
							/>
						</div>
						<div className={styles.input}>
							<TextInput
								id="phone"
								label="연락처 (010-0000-0000) "
								value={phone}
								onChange={e => setPhone(e.target.value)}
								placeholder="입력"
								required
							/>
						</div>
						<div className={styles.input}>
							<DropdownInput
								id="address"
								label="선호 지역"
								value={address}
								onSelectOption={value => setAddress(value)}
								placeholder="선택"
							/>
						</div>
					</div>
					<div>
						<TextareaInput
							id="bio"
							label="소개"
							value={bio}
							onChange={e => setBio(e.target.value)}
							placeholder="입력"
						/>
					</div>
					<div className={styles.buttonWrapper}>
						<button
							type="submit"
							disabled={isDisabled}
							className={`${buttonStyle.button} ${
								isDisabled ? buttonStyle.disabled : buttonStyle.red
							} ${styles.button}`}
						>
							등록하기
						</button>
					</div>
				</form>

				<Alert
					isOpen={isAlertOpen}
					message={alertMessage}
					onConfirm={handleAlertConfirm}
					onClose={handleAlertClose}
				></Alert>
			</div>
		</>
	);
};

export default Create;
