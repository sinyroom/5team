import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from './posts.module.css';

import { Notice, GetNoticeResponse } from '@/types/userNotice';
import { fetchNoticeList, NoticeQueryParams } from '@/api/users/getNotice';
import { getUser } from '@/api/users/getUser';
import SmallNoticePoastCard from '@/components/common/NoticePostCard/SmallNoticePoastCard';
import DetailFilter from '@/components/UI/DetailFilter';
import { formatToRFC3339 } from '@/utils/dayformatting';
import { isClosed } from '@/utils/closedNotice';
import { useUserContext } from '@/contexts/auth-context';

const PERSONAL_NOTICE_LIMIT = 3;
const NOTICE_LIMIT = 6;
const sortOptions = [
	{ label: '마감임박순', value: 'time' },
	{ label: '시급많은순', value: 'pay' },
	{ label: '시간적은순', value: 'hour' },
	{ label: '가나다순', value: 'shop' },
];

interface Props {
	personalNotices: GetNoticeResponse;
	initialNotices: GetNoticeResponse;
}

interface DetailFilterState {
	startsAtGte: string;
	hourlyPayGte: string;
	selectedAddresses: string[];
}

export const getServerSideProps: GetServerSideProps = async () => {
	const address = '서울시 마포구'; // 로그인 안했을 때 기본값

	const personalNotices = await fetchNoticeList({
		offset: 0,
		limit: PERSONAL_NOTICE_LIMIT,
		address,
	});
	const initialNotices = await fetchNoticeList({ offset: 0, limit: NOTICE_LIMIT });
	return {
		props: {
			personalNotices,
			initialNotices,
		},
	};
};

const Posts = ({ personalNotices, initialNotices }: Props) => {
	const [customNotices, setCustomNotices] = useState(personalNotices.items);

	const [showFilter, setShowFilter] = useState(false);
	const [sortOption, setSortOption] = useState<'time' | 'pay' | 'hour' | 'shop'>('time');
	const [showDetailFilter, setShowDetailFilter] = useState(false);
	const [detailFilterCount, setDetailFilterCount] = useState(0);
	const [detailFilterState, setDetailFilterState] = useState<DetailFilterState>({
		startsAtGte: '',
		hourlyPayGte: '',
		selectedAddresses: [],
	});

	// 유저 정보 가져오기
	const { user } = useUserContext();

	// 검색기능
	const router = useRouter();
	const searchQuery = typeof router.query.search === 'string' ? router.query.search : '';

	// 페이지네이션
	const [notices, setNotices] = useState(initialNotices.items);
	const [offset, setOffset] = useState(initialNotices.offset);
	const [hasNext, setHasNext] = useState(initialNotices.hasNext);
	const [totalCount, setTotalCount] = useState(initialNotices.count);

	const currentPage = Math.floor(offset / NOTICE_LIMIT) + 1;
	const totalPages = Math.ceil(totalCount / NOTICE_LIMIT);
	const pageCount = Math.min(totalPages, 7);
	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === totalPages;

	// 로컬스토리지에서 주소값 가져와서 맞춤공고 렌더링
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token || !user) return;

		const fetchUserAddress = async () => {
			try {
				const res = await getUser(user.id, token);
				const address = res.item.address;

				if (address) {
					const updatedNotices = await fetchNoticeList({
						offset: 0,
						limit: PERSONAL_NOTICE_LIMIT,
						address: `${address}`,
					});

					// 유저 주소에 맞는 공고가 없으면 기본값 보여줌
					if (updatedNotices.items.length > 0) {
						setCustomNotices(updatedNotices.items);
					} else {
						setCustomNotices(personalNotices.items);
					}
				}
			} catch (err) {
				console.error('유저 정소 불러오기 실패', err);
				setCustomNotices(personalNotices.items);
			}
		};
		fetchUserAddress();
	}, [user]);

	// 전체 공고 부분 렌더링 + 검색 기능
	useEffect(() => {
		const fetchNotice = async () => {
			const queryParams: NoticeQueryParams = {
				offset,
				limit: NOTICE_LIMIT,
				sort: sortOption,
			};

			if (detailFilterState.selectedAddresses.length > 0) {
				queryParams.address = detailFilterState.selectedAddresses[0];
			}
			if (detailFilterState.startsAtGte.trim()) {
				queryParams.startsAtGte = formatToRFC3339(detailFilterState.startsAtGte.trim());
			}
			if (detailFilterState.hourlyPayGte.trim()) {
				queryParams.hourlyPayGte = Number(detailFilterState.hourlyPayGte);
			}
			if (searchQuery) {
				queryParams.keyword = searchQuery;
			}

			const data = await fetchNoticeList(queryParams);
			setNotices(data.items);
			setTotalCount(data.count);
			setHasNext(data.hasNext);
		};

		fetchNotice();
	}, [offset, sortOption, detailFilterState, searchQuery]);

	return (
		<>
			{!searchQuery && (
				<div className={styles.fullWidthSection}>
					<div className={styles.innerContent}>
						<div className={styles.personalPostWrapper}>
							<p className={styles.title}>맞춤 공고</p>
							<div className={styles.personalPost}>
								{customNotices
									.filter(({ item }: { item: Notice }) => !isClosed(item))
									.map(({ item }: { item: Notice }, idx: number) => (
										<SmallNoticePoastCard key={idx} notice={item} />
									))}
							</div>
						</div>
					</div>
				</div>
			)}

			<div className={styles.innerContent}>
				<div className={styles.allPostContainer}>
					<div className={styles.allPostWrapper}>
						<span className={styles.title}>
							{searchQuery ? (
								<>
									<span className={styles.keyword}>{searchQuery}</span>에 대한 공고 목록
								</>
							) : (
								'전체 공고'
							)}
						</span>
						<div className={styles.filterWrapper}>
							<button className={styles.filter} onClick={() => setShowFilter(prev => !prev)}>
								<p>{sortOptions.find(opt => opt.value === sortOption)?.label}</p>
								<Image
									src={`/img/icon/${showFilter ? 'arrowup' : 'arrowdown'}.svg`}
									alt="필터"
									width={13}
									height={8}
								/>
							</button>

							{showFilter && (
								<ul className={styles.dropdown}>
									{sortOptions.map(({ label, value }) => (
										<li
											key={value}
											className={styles.dropdownItem}
											onClick={() => {
												// console.log('선택된 정렬 옵션:', value);
												setSortOption(value as 'time' | 'pay' | 'hour' | 'shop');
												setShowFilter(false);
												setOffset(0);
											}}
										>
											{label}
										</li>
									))}
								</ul>
							)}

							<button className={styles.detailFilter} onClick={() => setShowDetailFilter(true)}>
								<p>상세 필터{detailFilterCount > 0 && ` (${detailFilterCount})`}</p>
							</button>

							{showDetailFilter && (
								<DetailFilter
									onClose={() => setShowDetailFilter(false)}
									onApply={(count: number) => {
										setDetailFilterCount(count);
										setShowDetailFilter(false);
										setOffset(0);
									}}
									detailFilterState={detailFilterState}
									setDetailFilterState={setDetailFilterState}
								/>
							)}
						</div>
					</div>
					<div className={styles.allPost}>
						{notices.map(({ item }: { item: Notice }, idx: number) => {
							const closed = isClosed(item);
							return <SmallNoticePoastCard key={idx} notice={{ ...item, closed }} />;
						})}
					</div>

					<div className={styles.pagination}>
						<button
							disabled={isFirstPage}
							onClick={() => {
								setOffset(offset - NOTICE_LIMIT);
							}}
							className={styles.arrowButton}
						>
							<img src="/img/icon/leftIcon.svg" alt="이전페이지" />
						</button>

						{Array.from({ length: pageCount }).map((_, i) => {
							const pageNum = i + 1;
							const isActive = pageNum === currentPage;
							return (
								<button
									key={pageNum}
									onClick={() => setOffset((pageNum - 1) * NOTICE_LIMIT)}
									className={`${styles.pageButton} ${isActive ? styles.active : ''}`}
								>
									{pageNum}
								</button>
							);
						})}

						<button
							disabled={isLastPage}
							onClick={() => setOffset(offset + NOTICE_LIMIT)}
							className={styles.arrowButton}
						>
							<img src="/img/icon/rightIcon.svg" alt="다음페이지" />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Posts;
