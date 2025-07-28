import { forwardRef } from 'react';
import styles from './TextareaInput.module.css';

import { BaseInput } from '../_base/BaseInput';

interface TextareaInputProps {
	id: string;
	label: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
	error?: string;
	width?: string;
	required?: boolean;
	placeholder?: string;
	rows?: number;
	className?: string;
}

export const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
	(
		{
			id,
			label,
			value,
			onChange,
			onBlur,
			error,
			width = '100%',
			required = false,
			placeholder,
			rows = 5,
			className,
			...props
		},
		ref
	) => {
		const textareaClasses = `
		${styles.textarea} 
		${error ? styles.errorBorder : ''} 
		${className || ''}`;

		return (
			<div className={styles.textareaInputContainer}>
				<BaseInput id={id} label={label} error={error} width={width} required={required}>
					<textarea
						id={id}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						placeholder={placeholder}
						rows={rows}
						ref={ref}
						className={textareaClasses}
						{...props}
					/>
				</BaseInput>
			</div>
		);
	}
);

TextareaInput.displayName = 'TextareaInput';
