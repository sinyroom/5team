import styles from './Alert.module.css';
import { ReactNode } from 'react';
import Modal from '@/components/Modal/Modal/Modal';
import buttonStyles from '@/components/common/BaseButton/BaseButton.module.css';

interface AlertModalProps {
	message: string;
	confirmText?: string;
	onConfirm: () => void;
	onClose: () => void;
	isOpen: boolean;
	children?: ReactNode;
}

export default function Alert({
	message,
	confirmText = '확인',
	onConfirm: handleConfirm,
	onClose,
	isOpen,
}: AlertModalProps) {
	if (!onClose || !isOpen) return null;
	return (
		<Modal className="alert" isOpen={isOpen ?? true} onClose={onClose ?? (() => {})}>
			<div className={styles.content}>
				<div className={styles.message}>{message}</div>
			</div>
			<button
				className={`${styles.button} ${buttonStyles.button} ${buttonStyles.red}`}
				onClick={handleConfirm}
			>
				{confirmText}
			</button>
		</Modal>
	);
}
