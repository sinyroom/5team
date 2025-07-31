import styles from './index.module.css';
import { BaseButton } from '@/components/common/BaseButton';
import PostCard from '@/components/UI/PostCard';
import SmallNoticePoastCard from '@/components/common/NoticePostCard/SmallNoticePoastCard';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getShopId } from '@/api/getShopId';
import { Shop, NoticeItem } from '@/types';
import { getNoticeList } from '@/api/getNoticeList';
import * as cookie from 'cookie';

export default function StorePage({
	shop,
	notices,
}: {
	shop: Shop;
	notices: NoticeItem[];
	notice: NoticeItem;
}) {
	const router = useRouter();
	const isClosed = (notice: { startsAt: string; workhour: number }) => {
		const start = new Date(notice.startsAt);
		const end = new Date(start.getTime() + notice.workhour * 60 * 60 * 1000);
		return new Date() > end;
	};
	return (
		<div className={styles.storeContainer}>
			<div className={styles.shopContainer}>
				<h1 className={styles.title}>내 가게</h1>
				{shop ? (
					<PostCard shop={shop} />
				) : (
					<div className={styles.emptyShop}>
						<p className={styles.emptyDescription}>내 가게를 소개하고 공고도 등록해 보세요.</p>
						<BaseButton
							children={'가게 등록하기'}
							onClick={() => router.push('/owner/store/create')}
							size={'medium'}
							color={'red'}
						/>
					</div>
				)}
			</div>
			<div className={styles.storeListContainer}>
				<h2 className={styles.subtitle}>내가 등록한 공고</h2>
				<div className={styles.noticeList}>
					{notices.length > 0 ? (
						notices.map(notice => {
							const closed = isClosed(notice);
							return (
								<div
									key={notice.id}
									className={styles.noticeItem}
									onClick={() => !closed && router.push(`/owner/recruit/${notice.id}`)}
									aria-disabled={closed}
								>
									<SmallNoticePoastCard notice={{ ...notice, closed }} />
								</div>
							);
						})
					) : (
						<div className={styles.emptyShop}>
							<p className={styles.emptyDescription}>공고를 등록해 보세요.</p>
							<BaseButton
								children={'공고 등록하기'}
								onClick={() => router.push('/owner/recruit/create')}
								size={'medium'}
								color={'red'}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async context => {
	// TODO: 인증 토큰 등 필요한 경우 context.req.headers.cookie 확인
	// 1. 쿠키 파싱
	const cookieHeader = context.req.headers.cookie || '';
	const cookies = cookie.parse(cookieHeader);

	// 2. 필요한 값 추출
	const userId = cookies.userId;
	const noticeId = cookies.noticeId;

	if (!userId || !noticeId) {
		return {
			redirect: {
				destination: '/error?reason=missing_user_id',
				permanent: false,
			},
		};
	}

	const { item: shop } = await getShopId(userId);
	const noticeList = await getNoticeList(noticeId);

	// const { item: shop } = await getShopId('c3319bbf-d05c-4b0e-9c6b-5058ed26df6e');
	// const noticeList = await getNoticeList('fbd5abfa-c573-4533-91b5-3ececf1ac830');

	const notices: NoticeItem[] = noticeList.items.map(({ item }) => ({
		...item,
		shop: {
			item: shop,
			href: `/shops/${shop.id}`,
		},
	}));

	return {
		props: { shop, notices },
	};
};
