import styles from './PostCard.module.css';
import PathIcon from '@/assets/img/pathIcon.svg';
import { Shop } from '@/types/shop';
import { BaseButton } from '@/components/common/BaseButton';
import { useRouter } from 'next/router';

interface PostCardProps {
	shop: Shop;
}

const Post = ({ shop }: PostCardProps) => {
	const router = useRouter();
	return (
		<ul className={styles.post}>
			<li className={styles.imageUrl}>
				<img src={shop.imageUrl} alt={shop.name} />
			</li>
			<div className={styles.responsiveDesign}>
				<div className={styles.responsiveDesignContents}>
					<li className={styles.postCategory}>{shop?.category}</li>
					<li className={styles.postName}>{shop?.name}</li>
					<li className={styles.postAddress1}>
						<PathIcon width={16} height={16} />
						{shop?.address1}
					</li>
					<li className={styles.postdescription}>{shop?.description}</li>
				</div>
				<div className={styles.responsiveDesignButton}>
					<li className={styles.buttonGruop}>
						<BaseButton
							onClick={() => router.push('/owner/store/edit')}
							size={'noneSize'}
							color={'white'}
						>
							편집하기
						</BaseButton>
						<BaseButton
							onClick={() => router.push('/owner/recruit/create')}
							size={'noneSize'}
							color={'red'}
						>
							공고 등록하기
						</BaseButton>
					</li>
				</div>
			</div>
		</ul>
	);
};

export default Post;
