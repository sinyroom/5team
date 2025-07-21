import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * ISO 날짜를 KST 기준으로 'YYYY-MM-DD HH:mm' 포맷으로 변환
 */
export const formatKSTDateTime = (isoDateString: string): string => {
	return dayjs(isoDateString).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm');
};
