import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './InputCore.module.css';

export interface InputCoreProps extends InputHTMLAttributes<HTMLInputElement> {
	value: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
}

export const InputCore = forwardRef<HTMLInputElement, InputCoreProps>(
	({ className, error, ...props }, ref) => {
		const inputClasses = `${styles.input} ${error ? styles.errorBorder : ''} ${className || ''}`;

		return <input ref={ref} className={inputClasses} aria-invalid={!!error} {...props} />;
	}
);

InputCore.displayName = 'InputCore';
