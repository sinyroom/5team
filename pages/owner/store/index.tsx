import { getShopId } from '@/api/getShopId';
import JopPostCard from '@/components/UI/JopPostCard/JopPostCard';
import PostCard from '@/components/UI/PostCard/PostCard';
import { Shop } from '@/types/shop';
import { useEffect, useState } from 'react';

export default function StorePage() {
	const [shop, setShop] = useState<{ item: Shop } | null>(null);

	useEffect(() => {
		const fetchShop = async () => {
			const data = await getShopId('fbd5abfa-c573-4533-91b5-3ececf1ac830');
			setShop(data);
		};

		fetchShop();
	}, []);

	return (
		<div>
			<h2>내 가게</h2>
			{shop ? (
				<>
					<PostCard />
				</>
			) : (
				<div>
					<p>내 가게를 소개하고 공고도 등록해 보세요.</p>
					<button>가게 등록하기</button>
				</div>
			)}
			<h2>등록한 공고</h2>
			<JopPostCard />
		</div>
	);
}
