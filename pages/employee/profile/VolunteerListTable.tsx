// components/VolunteerListTable.tsx
import React from 'react';
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	ColumnDef,
	getPaginationRowModel,
} from '@tanstack/react-table';
import { useMediaQuery } from 'react-responsive';
import styles from './VolunteerListTable.module.css';
import { BaseButton } from '@/components/common/BaseButton';

interface Applicant {
	id: string;
	name: string;
	bio?: string;
	phone?: string;
}

interface VolunteerListTableProps {
	data?: Applicant[];
}

const VolunteerListTable = ({ data = [] }: VolunteerListTableProps) => {
	const isTablet = useMediaQuery({ maxWidth: 1024 });
	const isMobile = useMediaQuery({ maxWidth: 768 });

	const columns = React.useMemo<ColumnDef<Applicant>[]>(() => {
		const baseColumns: ColumnDef<Applicant>[] = [
			{
				accessorKey: 'name',
				header: '신청자',
				cell: info => info.getValue(),
			},
		];

		if (!isMobile) {
			baseColumns.push({
				accessorKey: 'bio',
				header: '소개',
				cell: info => info.getValue() || '-',
			});
		}

		if (!isTablet) {
			baseColumns.push({
				accessorKey: 'phone',
				header: '전화번호',
				cell: info => info.getValue() || '-',
			});
		}

		baseColumns.push({
			id: 'actions',
			header: '상태',
			cell: () => (
				<div className={styles.actions}>
					<BaseButton size="sm" color="gray">
						거절하기
					</BaseButton>
					<BaseButton size="sm" color="primary">
						승인하기
					</BaseButton>
				</div>
			),
		});

		return baseColumns;
	}, [isMobile, isTablet]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<div className={styles.tableWrapper}>
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
					이전
				</button>
				<span>
					{table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
				</span>
				<button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
					다음
				</button>
			</div>
		</div>
	);
};

export default VolunteerListTable;
