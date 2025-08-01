import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from './postDetail.module.css';
import btnStyles from '@/components/common/BaseButton/BaseButton.module.css';

import { getNoticeId } from '@/api/getNoticeId';
import { getShopById } from '@/api/users/getShopById';
import { fetchNoticeList } from '@/api/users/getNotice';
import { applyNotice } from '@/api/applications/applyNotice';
import { updateApplication } from '@/api/applications/updateApplication';
import { getUser } from '@/api/users/getUser';

import { GetNoticeResponse, Notice } from '@/types/userNotice';
import { Shop } from '@/types';

import SmallNoticePoastCard from '@/components/common/NoticePostCard/SmallNoticePoastCard';
import NoticePostCard from '@/components/common/NoticePostCard';
import Confirm from '@/components/Modal/Confirm/Confirm';
import Action from '@/components/Modal/Action/Action';

import { useUserContext } from '@/contexts/auth-context';

interface Props {
	notice: Notice;
	shop: Shop;
	viewedNotices: GetNoticeResponse;
}

export const getServerSideProps: GetServerSideProps = async context => {
	const { shopId, id: noticeId } = context.params!;
	try {
		const res = await getNoticeId(shopId as string, noticeId as string);
		const notice = res.item;

		let shop: Shop;
		const viewedNotices = await fetchNoticeList({
			offset: 0,
			limit: 6,
		});

		if (notice?.shop?.item) {
			shop = notice.shop.item;
		} else {
			const shopRes = await getShopById(shopId as string);
			if (!shopRes.item) throw new Error('Shop not found');
			shop = shopRes.item;
		}
		if (!notice || !shop) {
			return { notFound: true };
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
	const [applicationId, setApplicationId] = useState<string | null>(null);

	// 버튼 상태
	const [isApplied, setIsApplied] = useState(false);
	const [isClosed, setIsClosed] = useState(false);

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
			if (isApplied) return;

			const res = await applyNotice(shop.id, notice.id);
			const newApplicationId = res.item?.id;
			if (newApplicationId) {
				setApplicationId(newApplicationId);
				setIsApplied(true);
			}
		} catch (err) {
			setAlertMessage('프로필 정보를 불러오지 못했습니다.');
			setIsConfirmOpen(true);
		}
	};

	const handleCancleClick = () => {
		setAlertMessage('신청을 취소하겠습니까?');
		setIsActionOpen(true);
	};

	const handleCancleConfirm = async () => {
		try {
			if (!applicationId) throw new Error('지원 id 없음');
			await updateApplication(shop.id, notice.id, applicationId, 'canceled');
			setIsApplied(false);
		} catch (err) {
			setAlertMessage('신청 취소 처리에 실패했습니다.');
			setIsConfirmOpen(true);
		} finally {
			setIsActionOpen(false);
		}
	};

	return (
		<div>
			<div>
				<NoticePostCard notice={notice}>
					{isClosed ? (
						<button className={`${styles.button} ${btnStyles.gray}`} disabled>
							신청 불가
						</button>
					) : isApplied ? (
						<button className={`${styles.button} ${btnStyles.white}`} onClick={handleCancleClick}>
							취소하기
						</button>
					) : (
						<button className={`${styles.button} ${btnStyles.red}`} onClick={handleApplyClick}>
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
					onConfirm={handleCancleConfirm}
					cancelText="아니요"
					cofirmText="취소하기"
				/>
			)}
		</div>
	);
};

export default PostDetailPage;
