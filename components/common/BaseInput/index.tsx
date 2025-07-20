import { experimental_taintObjectReference, InputHTMLAttributes } from 'react';
import styles from './BaseInput.module.css';

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label?: string;
	error?: string; // 폼에서 전달
}

export const BaseInput = ({ id, label, error, className, ...props }: BaseInputProps) => {
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
				</label>
			)}
			<input
				id={id}
				className={inputClasses}
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
