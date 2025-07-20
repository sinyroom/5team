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

	return (
		<div className={styles.inputContainer}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
					{required && <span className={styles.label}>*</span>}
				</label>
			)}
			<input
				id={id}
				className={inputClasses}
				style={{ width }}
				aria-invalid={!!error}
				aria-describedby={error ? `${id}-error` : undefined}
				{...props}
			/>
			{error && (
				<p id={`${id}-error`} className={styles.errorMessage} role="alert">
					{error}
				</p>
			)}
		</div>
	);
};
