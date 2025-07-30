import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getNoticeId } from '@/api/getNoticeId';
import { getShopById } from '@/api/users/getShopById';
import { Notice } from '@/types/userNotice';
import { Shop } from '@/types';

interface Props {
	notice: Notice | null;
	shop: Shop | null;
}

export const getServerSideProps: GetServerSideProps = async context => {
	const { shopId, id: noticeId } = context.params!;
	try {
		const res = await getNoticeId(shopId as string, noticeId as string); // ✅ id 기반 공고 fetch
		const notice = res.item;

		let shop = null;
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
			},
		};
	} catch (error) {
		return { props: { notice: null } };
	}
};

const PostDetailPage = ({ notice, shop }: Props) => {
	const router = useRouter();

	if (!notice || !shop) return <p>존재하지 않는 공고입니다.</p>;

	return (
		<div>
			<h1>{shop.name}</h1>
			<p>{notice.description}</p>
			<p>시급: {notice.hourlyPay}원</p>
			<p>근무지: {shop.address1}</p>
		</div>
	);
};

export default PostDetailPage;
