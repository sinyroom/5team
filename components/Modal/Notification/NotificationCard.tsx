import styles from './NotificationCard.module.css';

interface Props {
	store: string;
	date: string;
	time: string;
	status: '승인' | '거절';
	ago: string;
}

export default function NotificationCard({ store, date, time, status, ago }: Props) {
	const isApproved = status === '승인';
	return (
		<div className={styles.card}>
			<span className={isApproved ? styles.dotBlue : styles.dotRed}></span>
			<span className={styles.result}>
				{store}({date} {time}) 공고 지원이{' '}
				<span className={isApproved ? styles.approved : styles.rejected}>{status}</span>되었어요.
			</span>
			<div className={styles.ago}>{ago}</div>
		</div>
	);
}
