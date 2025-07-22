import styles from './TextareaInput.module.css';

import { BaseInput } from '../_base/BaseInput';

interface TextareaInputProps {
	id: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	error?: string;
	width?: string;
	required?: boolean;
	placeholder?: string;
	rows?: number;
	className?: string;
}

export const TextareaInput = ({
	id,
	label,
	value,
	onChange,
	error,
	width = '100%',
	required = false,
	placeholder,
	rows = 5,
	className,
}: TextareaInputProps) => {
	return (
		<div className={styles.textareaInputContainer}>
			<BaseInput id={id} label={label} error={error} width={width} required={required}>
				<textarea
					id={id}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					rows={rows}
					className={`${styles.textarea} ${className ?? ''}`}
				/>
			</BaseInput>
		</div>
	);
};
