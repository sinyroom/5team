import styles from './Confirm.module.css';
import { ReactNode } from 'react';
import Modal from '@/components/Modal/Modal/Modal';
import buttonStyles from '@/components/common/BaseButton/BaseButton.module.css';
import WarningIcon from '@/assets/img/warning.svg';

interface ConfirmModalProps {
	message: string;
	confirmText?: string;
	onConfirm: () => void;
	onClose: () => void;
	isOpen: boolean;
	children?: ReactNode;
}

export default function Confirm({
	message,
	confirmText = '확인',
	onConfirm: handleConfirm,
	onClose,
	isOpen,
}: ConfirmModalProps) {
	return (
		<Modal className="confirm" isOpen={isOpen ?? true} onClose={onClose ?? (() => {})}>
			<div className={styles.content}>
				<div className={styles.icon}>
					<WarningIcon alt="warning" />
				</div>
				<div className={styles.message}>{message}</div>
			</div>
			<button
				className={`${styles.button} ${buttonStyles.button} ${buttonStyles.white}`}
				onClick={handleConfirm}
			>
				{confirmText}
			</button>
		</Modal>
	);
}
