import styles from './JopPostCard.module.css';
import { getNoticeId } from '@/api/getNoticeId';
import { Notice } from '@/types/notice';
import React, { useEffect, useState } from 'react';
import TimeIcon from '@/assets/img/timeIcon.svg';
import PathIcon from '@/assets/img/pathIcon.svg';
import UpArrowIcon from '@/assets/img/UpArrowIcon.svg';
import { formatKSTDateTime } from '@/utils/dayformatting';

const JopPostCard = () => {
	const [notice, setNotice] = useState<{ item: Notice } | null>(null);

	useEffect(() => {
		const fetchNotice = async () => {
			const data = await getNoticeId(
				'fbd5abfa-c573-4533-91b5-3ececf1ac830',
				'0572fcd5-c2f3-43bf-8294-c957bb4520f8'
			);
			setNotice(data);
		};
		fetchNotice();
	}, []);

	// 시급 계산
	const hourlyPay = notice?.item?.hourlyPay;
	const originalPay = notice?.item?.shop?.item?.originalHourlyPay;
	const percentIncrease =
		hourlyPay && originalPay ? Math.round(((hourlyPay - originalPay) / originalPay) * 100) : null;

	return (
		<>
			<ul className={styles.JopPostCard}>
				<li className={styles.imageUrl}>{notice?.item?.shop.item.imageUrl}</li>
				<li className={styles.category}>{notice?.item?.shop.item.category}</li>
				<li className={styles.houlyPay}>
					{notice?.item?.hourlyPay}원
					<span className={styles.houlyPayBadge}>
						기존 시급보다 {percentIncrease}%
						<UpArrowIcon />
					</span>
				</li>
				<li className={styles.startsAt}>
					<TimeIcon witdh={16} height={16} />
					{notice?.item?.startsAt && formatKSTDateTime(notice.item.startsAt)}
				</li>
				<li className={styles.address1}>
					<PathIcon witdh={16} height={16} />
					{notice?.item?.shop.item.address1}
				</li>
				<li className={styles.description}>{notice?.item?.shop.item.description}</li>
				<button>공고 편집하기</button>
			</ul>
			<div className={styles.descriptionContainer}>
				<label className={styles.noticeLabel}>공고 설명</label>
				<p className={styles.noticeDescription}>{notice?.item?.description}</p>
			</div>
		</>
	);
};

export default JopPostCard;
