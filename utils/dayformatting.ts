import { format } from 'date-fns';
import { NoticeItem } from '@/types';

export function formatNoticeTimes(notice: NoticeItem): string {
	const start = new Date(notice.startsAt);
	const end = new Date(start.getTime() + notice.workhour * 60 * 60 * 1000);

	const startDate = format(start, 'yyyy-MM-dd');
	const startTime = format(start, 'HH:mm');
	const endTime = format(end, 'HH:mm');

	return `${startDate} ${startTime}~${endTime}(${notice.workhour}시간)`;
}

// ISO 8601 (RFC 3339) 형식으로 변환
export function formatToRFC3339(dateStr: string): string {
	if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
		throw new Error('Invalid date format. Expected "YYYY-MM-DD"');
	}
	return new Date(`${dateStr}T00:00:00Z`).toISOString();
}
