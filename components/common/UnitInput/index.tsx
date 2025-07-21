import { InputHTMLAttributes } from 'react';
import styles from './UnitInput.module.css';

import { BaseInput } from '../BaseInput';
import { InputCore } from '../InputCore';

interface UnitInputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	error?: string;
	width?: string;
	required?: boolean;
}

export const UnitInput = ({
	id,
	label,
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
				<InputCore id={id} className={finalInputClassName} error={!!error} {...props} />
				{showUnit && unitTextContent && <span className={styles.unitText}>{unitTextContent}</span>}
			</BaseInput>
		</div>
	);
};
