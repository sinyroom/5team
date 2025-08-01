import React, { useEffect, useState } from 'react';
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	ColumnDef,
	getPaginationRowModel,
} from '@tanstack/react-table';
import styles from './VolunteerListTable.module.css';

interface Applicant {
	id: string;
	name: string;
	bio?: string;
	phone?: string;
}

function useDeviceType(): 'mobile' | 'tablet' | 'desktop' {
	const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

	useEffect(() => {
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

	return deviceType;
}

const baseColumns: any[] = [
	{
		accessorKey: 'name',
		header: '신청자',
		meta: { responsive: 'mobile' },
		cell: (info: any) => info.getValue(),
	},
	{
		accessorKey: 'bio',
		header: '소개',
		meta: { responsive: 'tablet' },
		cell: (info: any) => info.getValue() || '-',
	},
	{
		accessorKey: 'phone',
		header: '전화번호',
		meta: { responsive: 'desktop' },
		cell: (info: any) => info.getValue() || '-',
	},
	{
		id: 'actions',
		header: '상태',
		meta: { responsive: 'mobile' },
		cell: () => (
			<div className={styles.actions}>
				<button className={styles.refuse}>거절하기</button>
				<button className={styles.admit}>승인하기</button>
			</div>
		),
	},
];

const sampleApplicants: Applicant[] = [
	{ id: '1', name: '김철수', bio: '성실하고 책임감 있습니다.', phone: '010-1234-5678' },
	{ id: '2', name: '이영희', bio: '서비스 경험이 많습니다.', phone: '010-2345-6789' },
	{ id: '3', name: '박지민', bio: '밝고 적극적인 성격입니다.', phone: '010-3456-7890' },
	{ id: '4', name: '최민호', bio: '항상 최선을 다합니다.', phone: '010-4567-8901' },
	{ id: '5', name: '장예은', bio: '고객 응대에 자신 있어요.', phone: '010-5678-9012' },
	{ id: '6', name: '안유진', bio: '책임감 있게 일합니다.', phone: '010-6789-0123' },
	{ id: '7', name: '윤다빈', bio: '친절한 알바생이 되고 싶어요.', phone: '010-7890-1234' },
	{ id: '8', name: '조민수', bio: '시간 약속 철저히 지킵니다.', phone: '010-8901-2345' },
	{ id: '9', name: '한지은', bio: '팀워크를 중요하게 생각합니다.', phone: '010-9012-3456' },
	{ id: '10', name: '정우성', bio: '꼼꼼한 성격입니다.', phone: '010-0123-4567' },
	{ id: '11', name: '서지수', bio: '항상 웃는 얼굴로 일합니다.', phone: '010-1111-2222' },
	{ id: '12', name: '강하늘', bio: '성실함이 강점입니다.', phone: '010-2222-3333' },
	{ id: '13', name: '배수지', bio: '배려심 있는 태도로 일합니다.', phone: '010-3333-4444' },
	{ id: '14', name: '김유정', bio: '경험은 없지만 배우고 싶습니다.', phone: '010-4444-5555' },
	{ id: '15', name: '이준호', bio: '빠르게 적응하는 편입니다.', phone: '010-5555-6666' },
	{ id: '16', name: '홍진호', bio: '승부근성이 강합니다.', phone: '010-6666-7777' },
	{ id: '17', name: '김하늘', bio: '꼼꼼하고 착실합니다.', phone: '010-7777-8888' },
	{ id: '18', name: '문채원', bio: '긍정적인 태도로 일합니다.', phone: '010-8888-9999' },
	{ id: '19', name: '정해인', bio: '항상 웃는 얼굴로 대응합니다.', phone: '010-9999-0000' },
	{ id: '20', name: '박보검', bio: '책임감 있게 행동합니다.', phone: '010-0000-1111' },
];

const VolunteerListTable = () => {
	const deviceType = useDeviceType();

	const [columns, setColumns] = useState(baseColumns);

	useEffect(() => {
		const filteredColumns = baseColumns.filter(col => {
			const responsive = col.meta?.responsive ?? 'desktop';
			if (deviceType === 'mobile') return ['mobile'].includes(responsive);
			if (deviceType === 'tablet') return ['mobile', 'tablet'].includes(responsive);
			return true;
		});
		setColumns(filteredColumns);
	}, [deviceType]);

	const table = useReactTable({
		data: sampleApplicants,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: {
				pageSize: 5,
			},
		},
	});

	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getPaginationRowModel().rows.map(row => (
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
};

export default VolunteerListTable;
