import styles from './TextInput.module.css';

import { BaseInput } from '../_base/BaseInput';
import { InputCore } from '../_base/InputCore';

interface TextInputProps {
	id: string;
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	error?: string;
	width?: string;
	required?: boolean;
	className?: string;
	type?: string;
	placeholder?: string;
}

export const TextInput = ({
	id,
	label,
	value,
	onChange,
	onBlur,
	error,
	width = '100%',
	required = false,
	className,
	type = 'text',
	placeholder,
	...props
}: TextInputProps) => {
	return (
		<div className={styles.textInputContainer}>
			<BaseInput id={id} label={label} error={error} width={width} required={required}>
				<InputCore
					id={id}
					type={type}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					className={className}
					error={!!error}
					placeholder={placeholder}
					{...props}
				/>
			</BaseInput>
		</div>
	);
};
