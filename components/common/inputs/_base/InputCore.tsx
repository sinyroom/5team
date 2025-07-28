import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './InputCore.module.css';

export interface InputCoreProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'error'> {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
}

export const InputCore = forwardRef<HTMLInputElement, InputCoreProps>((props, ref) => {
	const { className, error, ...restProps } = props;

	const inputClasses = `${styles.input} ${error ? styles.errorBorder : ''} ${className || ''}`;

	return <input ref={ref} className={inputClasses} aria-invalid={!!error} {...restProps} />;
});

InputCore.displayName = 'InputCore';
