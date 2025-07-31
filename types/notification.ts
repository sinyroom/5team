export interface MyNotification {
	id: number;
	store: string;
	date: string;
	time: string;
	status: '승인' | '거절';
	ago: string;
}
