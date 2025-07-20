import { InputHTMLAttributes } from 'react';
import styles from './BaseInput.module.css';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label?: string;
	error?: string; // 폼에서 전달
	width?: string;
	required?: boolean;
}

export const BaseInput = ({
	id,
	label,
	error,
	className,
	width = '100%',
	required = false,
	...props
}: BaseInputProps) => {
	let inputClasses = styles.input;
	if (error) {
		inputClasses += ` ${styles.errorBorder}`;
	}
	if (className) {
		inputClasses += ` ${className}`;
	}

	// placeholder 기본값 설정
	const finalPlaceholder = props.placeholder || '입력';

	// label 값에 따른 조건 설정
	const showUnit = label === '시급' || label === '업무 시간' || label === '금액';

	let unitTextContent;
	if (label === '시급' || label === '금액') {
		unitTextContent = '원';
	} else if (label === '업무 시간') {
		unitTextContent = '시간';
	} else {
		unitTextContent = '';
	}

	if (showUnit) {
		inputClasses += ` ${styles.withUnitPadding}`;
	}

	return (
		<div className={styles.inputContainer}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
					{required && <span className={styles.label}>*</span>}
				</label>
			)}
			<div className={styles.inputWrapper}>
				<input
					id={id}
					className={inputClasses}
					style={{ width }}
					aria-invalid={!!error}
					aria-describedby={error ? `${id}-error` : undefined}
					placeholder={finalPlaceholder}
					required={required}
					{...props}
				/>
				{showUnit && <span className={styles.unitText}>{unitTextContent}</span>}
			</div>
			{error && (
				<p id={`${id}-error`} className={styles.errorMessage} role="alert">
					{error}
				</p>
			)}
		</div>
	);
};
