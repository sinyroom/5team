import { ReactNode } from 'react';
import styles from './BaseInput.module.css';

interface BaseInputProps {
	id: string;
	label: string;
	error?: string; // 폼에서 전달
	width?: string;
	required?: boolean;
	children: ReactNode;
}

export const BaseInput = ({
	id,
	label,
	error,
	width = '100%',
	required = false,
	children,
	...props
}: BaseInputProps) => {
	return (
		<div className={styles.inputContainer} style={{ width }}>
			{label && (
				<label htmlFor={id} className={styles.label}>
					{label}
					{required && <span className={styles.requiredIndicator}>*</span>}
				</label>
			)}
			<div className={styles.inputWrapper}>{children}</div>
			{error && (
				<p id={`${id}-error`} className={styles.errorMessage} role="alert">
					{error}
				</p>
			)}
		</div>
	);
};
