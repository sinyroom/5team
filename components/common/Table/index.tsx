import React from 'react';
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	flexRender,
	ColumnDef,
} from '@tanstack/react-table';
import styles from './table.module.css';

type WorkItem = {
	store: string;
	date: string;
	wage: string;
	status: '승인 완료' | '거절' | '대기중';
};

//  디바이스에 따라 컬럼 필터링을 위한 Hook
function useDeviceType() {
	const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
	if (width <= 640) return 'mobile';
	if (width <= 1024) return 'tablet';
	return 'desktop';
}

const baseColumns: ColumnDef<WorkItem>[] = [
	{
		accessorKey: 'store',
		header: '가게',
		meta: { responsive: 'mobile' },
	},
	{
		accessorKey: 'date',
		header: '일자',
		meta: { responsive: 'tablet' },
	},
	{
		accessorKey: 'wage',
		header: '시급',
		meta: { responsive: 'desktop' },
		cell: ({ getValue }) => (
			<a href="#" className={styles.wageLink}>
				{getValue() as string}
			</a>
		),
	},
	{
		accessorKey: 'status',
		header: '상태',
		meta: { responsive: 'mobile' },
		cell: ({ getValue }) => {
			const value = getValue() as WorkItem['status'];
			const statusClass = {
				'승인 완료': styles.badgeBlue,
				거절: styles.badgeRed,
				대기중: styles.badgeGreen,
			};
			return <span className={`${styles.badge} ${statusClass[value]}`}>{value}</span>;
		},
	},
];

const data: WorkItem[] = [
	{
		store: 'HS 과일주스',
		date: '2023-01-12 10:00 ~ 12:00 (2시간)',
		wage: '15,000원',
		status: '승인 완료',
	},
	{
		store: '써니 브런치 레스토랑',
		date: '2023-01-12 10:00 ~ 12:00 (2시간)',
		wage: '15,000원',
		status: '승인 완료',
	},
	{
		store: '수리 에스프레소 샵',
		date: '2023-01-12 10:00 ~ 12:00 (2시간)',
		wage: '15,000원',
		status: '거절',
	},
	{
		store: '너구리네 라면집',
		date: '2023-01-12 10:00 ~ 12:00 (2시간)',
		wage: '15,000원',
		status: '대기중',
	},
	{
		store: '초가을집',
		date: '2023-01-12 10:00 ~ 12:00 (2시간)',
		wage: '15,000원',
		status: '대기중',
	},
];

export default function WorkTable() {
	const [deviceType, setDeviceType] = React.useState<'mobile' | 'tablet' | 'desktop'>(
		useDeviceType()
	);

	// resize 이벤트 리스너
	React.useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width <= 768) setDeviceType('mobile');
			else if (width <= 1024) setDeviceType('tablet');
			else setDeviceType('desktop');
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// 현재 화면 타입에 따라 컬럼 필터링
	const columns = baseColumns.filter(col => {
		const minDevice = col.meta?.responsive ?? 'desktop';
		if (deviceType === 'mobile') return ['mobile'].includes(minDevice);
		if (deviceType === 'tablet') return ['mobile', 'tablet'].includes(minDevice);
		return true;
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id}>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			<div className={styles.pagination}>
				<button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
					&lt;
				</button>
				{table.getPageOptions().map(page => (
					<button
						key={page}
						onClick={() => table.setPageIndex(page)}
						className={table.getState().pagination.pageIndex === page ? styles.active : ''}
					>
						{page + 1}
					</button>
				))}
				<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
					&gt;
				</button>
			</div>
		</div>
	);
}
