import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getNoticeId } from '@/api/getNoticeId';
import { getShopById } from '@/api/users/getShopById';
import { GetNoticeResponse, Notice } from '@/types/userNotice';
import { Shop } from '@/types';
import { fetchNoticeList } from '@/api/users/getNotice';
import { useEffect, useState } from 'react';
import SmallNoticePoastCard from '@/components/common/NoticePostCard/SmallNoticePoastCard';
import styles from './postDetail.module.css';
import NoticePostCard from '@/components/common/NoticePostCard';
import BtnStyles from '@/components/common/BaseButton/BaseButton.module.css';
import { useUserContext } from '@/contexts/auth-context';
import { getUser } from '@/api/users/getUser';
import Confirm from '@/components/Modal/Confirm/Confirm';
import Action from '@/components/Modal/Action/Action';
import { applyNotice } from '@/api/applications/applyNotice';

interface Props {
	notice: Notice | null;
	shop: Shop | null;
	viewedNotices: GetNoticeResponse;
}

export const getServerSideProps: GetServerSideProps = async context => {
	const { shopId, id: noticeId } = context.params!;
	try {
		const res = await getNoticeId(shopId as string, noticeId as string);
		const notice = res.item;

		let shop: any = null;
		const viewedNotices = await fetchNoticeList({
			offset: 0,
			limit: 6,
		});
		if (notice?.shop?.item) {
			shop = notice.shop.item;
		} else {
			const shopRes = await getShopById(shopId as string);
			shop = shopRes.item;
		}
		return {
			props: {
				notice,
				shop,
				viewedNotices,
			},
		};
	} catch (error) {
		return { props: { notice: null } };
	}
};

const PostDetailPage = ({ viewedNotices, notice, shop }: Props) => {
	const [newlyNotices, setNewlyNotices] = useState(viewedNotices.items);
	const [isClosed, setIsClosed] = useState(false);

	// 신청 여부
	const [isApplied, setIsApplied] = useState(false);

	// 모달 관련
	const [isConfirmOpen, setIsConfirmOpen] = useState(false);
	const [isActionOpen, setIsActionOpen] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	const router = useRouter();
	const { user } = useUserContext();

	if (!notice || !shop) return <p>존재하지 않는 공고입니다.</p>;

	const handleApplyClick = async () => {
		const token = localStorage.getItem('token');
		if (!token) {
			setAlertMessage('로그인이 필요합니다');
			setIsConfirmOpen(true);
			return;
		}

		try {
			const profileRes = await getUser(user!.id, token);
			const { name, phone, address, bio } = profileRes.item;

			if (!name || !phone || !address || !bio) {
				setAlertMessage('내 프로필을 먼저 등록해 주세요');
				setIsConfirmOpen(true);
				return;
			}
			if (isApplied) {
				console.log('신청 취소 처리');
				setIsApplied(false);
				return;
			}

			await applyNotice(shop.id, notice.id);
			console.log('신청 처리 완료');
			setIsApplied(true);
		} catch (err) {
			console.error('프로필 조회 실패', err);
			alert('프로필 정보를 불러오는 중 오류가 발생했습니다.');
		}
	};

	const handleCancleClick = () => {
		setIsActionOpen(true);
		setAlertMessage('신청을 취소하겠습니까?');
	};

	return (
		<div>
			<div>
				<NoticePostCard notice={notice}>
					{isClosed ? (
						<button className={`${styles.button} ${BtnStyles.gray}`} disabled>
							신청 불가
						</button>
					) : isApplied ? (
						<button className={`${styles.button} ${BtnStyles.white}`} onClick={handleCancleClick}>
							취소하기
						</button>
					) : (
						<button className={`${styles.button} ${BtnStyles.red}`} onClick={handleApplyClick}>
							신청하기
						</button>
					)}
				</NoticePostCard>
			</div>
			<div className={styles.newlyPost}>
				{newlyNotices.map(({ item }: { item: Notice }, idx: number) => (
					<SmallNoticePoastCard key={idx} notice={item} />
				))}
			</div>

			{isConfirmOpen && (
				<Confirm
					message={alertMessage}
					isOpen={isConfirmOpen}
					onClose={() => setIsConfirmOpen(false)}
					onConfirm={() => setIsConfirmOpen(false)}
				/>
			)}
			{isActionOpen && (
				<Action
					message={alertMessage}
					isOpen={isActionOpen}
					onClose={() => setIsActionOpen(false)}
					onCancel={() => setIsActionOpen(false)}
					onConfirm={() => {
						setIsApplied(false);
						setIsActionOpen(false);
					}}
					cancelText="아니요"
					cofirmText="취소하기"
				/>
			)}
		</div>
	);
};

export default PostDetailPage;
