import styles from './ImageInput.module.css';
import { BaseInput } from '../_base/BaseInput';
import ImageUpload from '@/components/common/ImageUpload/ImageUpload';

interface ImageInputProps {
	id: string;
	label: string;
	value: string;
	error?: string;
	width?: string;
	required?: boolean;
	placeholder?: string;
	className?: string;
	onChange: (value: string) => void;
}

export const ImageInput = ({
	id,
	label,
	value,
	error,
	width = '100%',
	required = false,
	className,
	onChange,
}: ImageInputProps) => {
	const handleImageChange = (file: File | null, uploadedUrl?: string) => {
		if (uploadedUrl) {
			onChange(uploadedUrl);
		} else {
			onChange('');
		}
	};

	return (
		<div className={styles.imageInputContainer}>
			<BaseInput id={id} label={label} error={error} width={width} required={required}>
				<div className={styles.imageContainer}>
					<ImageUpload
						value={value}
						onChange={handleImageChange}
						placeholder="이미지 추가하기"
						className={`${styles.imageInput} ${className ?? ''}`}
					/>
				</div>
			</BaseInput>
		</div>
	);
};
