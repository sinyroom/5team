//hook
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useUserContext } from '@/contexts/auth-context';

//style
import styles from './profile.module.css';

//image
import PathIcon from '@/assets/img/pathIcon.svg';
import SmartPhoneIcon from '@/assets/img/smartPhoneIcon.svg';

//Components
import { BaseButton } from '@/components/common/BaseButton/index.tsx';
import { WorkTable } from '@/components/common/Table/index.tsx';

//api
import { getUser } from '@/api/users/getUser.ts';

//받아올 값 : 이름 ,전화번호 ,주소 , 소개
//employee/profile
export default function ProfilePage() {
	const router = useRouter();

	const [userData, setUserData] = useState(null); //實 데이터 상태
	//const [applyList, setApplyList] = useState(); // 신청 내역 여부입니다. default: false.
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [existProfile, setExistProfile] = useState(false);
	const { user } = useUserContext();

	let currentUserId; // 실제 사용자 ID
	let userToken; // 실제 인증 토큰

	useEffect(() => {
		//console.log('useEffect가 실행되었습니다!');
		userToken = localStorage.getItem('token');

		if (user != null) {
			currentUserId = user.id;
		}

		const fetchUserData = async () => {
			setLoading(true);
			setError(null);
			try {
				// getUser 함수 호출
				console.log(`userID : ${currentUserId}, userToken : ${userToken}`);
				const res = await getUser(currentUserId, userToken);

				const resitem = res.item;
				console.log(resitem);
				setUserData(resitem);
			} catch (err) {
				setError('사용자 정보를 가져오는데 실패했습니다.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchUserData();
	}, []);

	useEffect(() => {
		console.log(`resItem : ${userData}`);

		if (userData != null) {
			setExistProfile(true);
		} else {
			setExistProfile(false);
		}
	}, [userData]);

	const handleClickPost = () => {
		router.push('./posts');
	};

	const handleClickEdit = () => {
		router.push('./profile/create');
	};

	const applyList = userData?.shop || false;

	return (
		<>
			{existProfile ? (
				<>
					<div className={styles.profileBlock}>
						<div className={styles.Title} id={styles.myProfile}>
							내 프로필
						</div>
						<div className={styles.profileDetailed}>
							<div className={styles.profileDetiledInside}>
								<div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
									<div>
										<div id={styles.name}>이름</div>
										<div id={styles.profileName}>{userData?.name || '정보 없음'}</div>{' '}
										{/* 이름 값 넣기 */}
									</div>
									<div id={styles.phoneNumber}>
										<SmartPhoneIcon style={{ width: '20px', height: '20px' }} />
										{userData?.phone || 'Data 를 불러오지 못했습니다.'} {/* 전화번호 값 넣기 */}
									</div>
									<div id={styles.preferLocation}>
										<PathIcon style={{ objectFit: 'contain', width: '20px', height: '20px' }} />
										{userData?.address || 'Data 를 불러오지 못했습니다.'}
									</div>
								</div>
								<div id={styles.profileIntroduce}>
									{userData?.bio || 'Data 를 불러오지 못했습니다.'}
								</div>
							</div>
							<div>
								<BaseButton color="white" size="medium" onClick={handleClickEdit}>
									{/*사이즈 조절 가능한지 여쭤보기 */}
									편집하기
								</BaseButton>
							</div>
						</div>
					</div>
					<div className={styles.applyListBlock}>
						<div className={styles.Title} id={styles.applyListTitle}>
							신청 내역
						</div>
						{applyList ? (
							<>테이블</>
						) : (
							<div className={styles.applyListContent}>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									아직 신청 내역이 없어요.
								</div>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<BaseButton size="large" onClick={handleClickPost}>
										공고 보러가기
									</BaseButton>
								</div>
							</div>
						)}
					</div>
				</>
			) : (
				<>
					<div className={styles.applyListBlock}>
						<div className={styles.Title} style={{ marginBottom: '32px' }}>
							내 프로필
						</div>
						<div className={styles.applyListContent}>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								내 프로필을 등록하고 원하는 가게에 지원해 보세요.
							</div>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<BaseButton size="large" onClick={handleClickEdit}>
									내 프로필 등록하기
								</BaseButton>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
