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
