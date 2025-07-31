import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getNoticeId } from '@/api/getNoticeId';
import { getShopById } from '@/api/users/getShopById';
import { GetNoticeResponse, Notice } from '@/types/userNotice';
import { Shop } from '@/types';
import { fetchNoticeList } from '@/api/users/getNotice';
import { useState } from 'react';
import SmallNoticePoastCard from '@/components/common/NoticePostCard/SmallNoticePoastCard';
import styles from './detailPost.module.css';

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

		let shop = null;
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

	const router = useRouter();

	if (!notice || !shop) return <p>존재하지 않는 공고입니다.</p>;

	return (
		<div>
			<h1>{shop.name}</h1>
			<p>{notice.description}</p>
			<p>시급: {notice.hourlyPay}원</p>
			<p>근무지: {shop.address1}</p>
			<div className={styles.newlyPost}>
				{newlyNotices.map(({ item }: { item: Notice }, idx: number) => (
					<SmallNoticePoastCard key={idx} notice={item} />
				))}
			</div>
		</div>
	);
};

export default PostDetailPage;
