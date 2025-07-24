import styles from './NumberInput.module.css';

import { BaseInput } from '../_base/BaseInput';
import { InputCore } from '../_base/InputCore';
import { formatNumberWithComma, sanitizeNumber } from '@/utils/farmatNumber';

interface NumberInputProps {
	id: string;
	label: string;
	error?: string;
	width?: string;
	required?: boolean;
	className?: string;
	value: string;
	type?: string;
	placeholder?: string;
	onChange?: (rawValue: string) => void;
	unitText: string;
}

export const NumberInput = ({
	id,
	label,
	value,
	error,
	width = '100%',
	required = false,
	className,
	onChange,
	unitText = '원',
	...props
}: NumberInputProps) => {
	const withUnit = !!unitText;
	const inputWithUnitClass = withUnit ? styles.withUnitPadding : '';
	const finalInputClassName = className ? `${className} ${inputWithUnitClass}` : inputWithUnitClass;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = sanitizeNumber(e.target.value);
		onChange?.(raw);
	};

	return (
		<div className={styles.unitInputContainer}>
			<BaseInput id={id} label={label} error={error} width={width} required={required}>
				<InputCore
					id={id}
					className={finalInputClassName}
					error={!!error}
					{...props}
					type="text"
					inputMode="numeric"
					value={formatNumberWithComma(value)}
					onChange={handleChange}
				/>
				{unitText && <span className={styles.unitText}>{unitText}</span>}
			</BaseInput>
		</div>
	);
};
