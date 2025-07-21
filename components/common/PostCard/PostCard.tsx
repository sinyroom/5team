import styles from './PostCard.module.css';
import React, { useEffect, useState } from 'react';
import { getShopId } from '@/api/getShopId';
import { Shop } from '@/types/shop';
import PathIcon from '@/assets/img/pathIcon.svg';

const Post = () => {
	const [shop, setShop] = useState<{ item: Shop } | null>(null);

	useEffect(() => {
		const fetchShop = async () => {
			const data = await getShopId('fbd5abfa-c573-4533-91b5-3ececf1ac830');
			setShop(data);
		};

		fetchShop();
	}, []);

	return (
		<ul className={styles.post}>
			<li className={styles.postImageUrl}>{shop?.item?.imageUrl}</li>
			<li className={styles.postCategory}>{shop?.item?.category}</li>
			<li className={styles.postName}>{shop?.item?.name}</li>
			<li className={styles.postAddress1}>
				<PathIcon width={16} height={16} />
				{shop?.item?.address1}
			</li>
			<li className={styles.postdescription}>{shop?.item?.description}</li>
			<button>편집하기</button>
			<button>공고 등록하기</button>
		</ul>
	);
};

export default Post;
