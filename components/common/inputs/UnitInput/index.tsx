import styles from './UnitInput.module.css';

import { BaseInput } from '../_base/BaseInput';
import { InputCore } from '../_base/InputCore';

interface UnitInputProps {
	id: string;
	label: string;
	error?: string;
	width?: string;
	required?: boolean;
	className?: string;
	value: string;
	type?: string;
	placeholder?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UnitInput = ({
	id,
	label,
	value,
	error,
	width = '100%',
	required = false,
	className,
	...props
}: UnitInputProps) => {
	// label 값에 따른 텍스트 단위 변경
	const showUnit = label === '시급' || label === '업무 시간' || label === '금액';
	let unitTextContent;
	if (label === '시급' || label === '금액') {
		unitTextContent = '원';
	} else if (label === '업무 시간') {
		unitTextContent = '시간';
	}

	const inputWithUnitClass = showUnit ? styles.withUnitPadding : '';
	const finalInputClassName = className ? `${className} ${inputWithUnitClass}` : inputWithUnitClass;

	return (
		<div className={styles.unitInputContainer}>
			<BaseInput id={id} label={label} error={error} width={width} required={required}>
				<InputCore
					id={id}
					value={value}
					className={finalInputClassName}
					error={!!error}
					{...props}
				/>
				{showUnit && unitTextContent && <span className={styles.unitText}>{unitTextContent}</span>}
			</BaseInput>
		</div>
	);
};
