import Image from 'next/image';
import styles from './posts.module.css';
import { useEffect, useState } from 'react';

import ArrowRight from '@/assets/img/rightIcon.svg';
import ArrowLeft from '@/assets/img/leftIcon.svg';
import axiosInstance from '@/api/settings/axiosInstance';
import { Notice, GetNoticeResponse } from '@/types/userNotice';

const PAGE_LIMIT = 6;

const Posts = () => {
	const [showFilter, setShowFilter] = useState(false);

	// 페이지네이션
	const [notices, setNotices] = useState<GetNoticeResponse['items']>([]);
	const [offset, setOffset] = useState(0);
	const [hasNext, setHasNext] = useState(false);
	const [totalCount, setTotalCount] = useState(0);

	const currentPage = Math.floor(offset / PAGE_LIMIT) + 1;
	const totalPages = Math.ceil(totalCount / PAGE_LIMIT);
	const pageCount = Math.min(totalPages, 7);
	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === totalPages;

	useEffect(() => {
		const fetchNotice = async () => {
			try {
				const res = await axiosInstance.get(`/notices?offset=${offset}&limit=${PAGE_LIMIT}`);
				const data = await res.data;

				console.log('API 응답:', data);
				setNotices(data.items);
				setTotalCount(data.count);
				setHasNext(data.hasNext);
			} catch (err) {
				console.error('notice fetch error', err);
			}
		};
		fetchNotice();
	}, [offset]);

	const handlePageClick = (page: number) => {
		setOffset((page - 1) * PAGE_LIMIT);
	};

	return (
		<>
			<div className={styles.fullWidthSection}>
				<div className={styles.innerContent}>
					<div className={styles.personalPostWrapper}>
						<p className={styles.title}>맞춤 공고</p>
						<div className={styles.personalPost}>
							{notices.map(({ item }, idx) => (
								<div key={idx}>{item.shop.item.name}</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className={styles.innerContent}>
				<div className={styles.allPostContainer}>
					<div className={styles.allPostWrapper}>
						<p className={styles.title}>전체 공고</p>
						<div className={styles.filterWrapper}>
							<button className={styles.filter}>
								<p>마감임박순</p>
								<Image
									src={`/img/icon/${showFilter ? 'arrowup' : 'arrowdown'}.svg`}
									alt="필터"
									width={13}
									height={8}
								/>
							</button>
							<button className={styles.detailFilter}>
								<p>상세 필터</p>
							</button>
						</div>
					</div>
					<div className={styles.allPost}>
						{notices.map(({ item }, idx) => (
							<div key={idx}>{item.shop.item.name}</div>
						))}
					</div>

					<div className={styles.pagination}>
						<button
							disabled={isFirstPage}
							onClick={() => {
								setOffset(offset - PAGE_LIMIT);
							}}
						>
							<ArrowLeft style={{ fill: isFirstPage ? '#ccc' : '#000' }} />
						</button>

						{Array.from({ length: pageCount }).map((_, i) => {
							const pageNum = i + 1;
							const isActive = pageNum === currentPage;
							return (
								<button
									key={pageNum}
									onClick={() => setOffset((pageNum - 1) * PAGE_LIMIT)}
									className={`${styles.pageButton} ${isActive ? styles.active : ''}`}
								>
									{pageNum}
								</button>
							);
						})}

						<button
							disabled={isLastPage}
							onClick={() => setOffset(offset + PAGE_LIMIT)}
							className={styles.arrowButton}
						>
							<ArrowRight style={{ fill: isLastPage ? '#ccc' : '#000' }} />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Posts;
