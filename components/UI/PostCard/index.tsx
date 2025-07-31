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
			<li className={styles.postImageUrl}>{shop?.imageUrl}</li>
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
							children={'편집하기'}
							onClick={() => router.push('/owner/store/edit')}
							size={'noneSize'}
							color={'white'}
						/>
						<BaseButton
							children={'공고 등록하기'}
							onClick={() => router.push('/owner/recruit/create')}
							size={'noneSize'}
							color={'red'}
						/>
					</li>
				</div>
			</div>
		</ul>
	);
};

export default Post;
