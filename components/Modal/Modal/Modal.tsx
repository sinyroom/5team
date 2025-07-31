import { ReactNode, useEffect, useState } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

interface modalProps {
	className: string;
	isOpen: boolean;
	onClose: () => void;
	children?: ReactNode;
}

function Modal({ className, isOpen, onClose, children }: modalProps) {
	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

	useEffect(() => {
		setPortalNode(document.getElementById('modal'));
	}, []);

	if (!portalNode) return null;

	if (!isOpen) return null;

	return createPortal(
		<div className={styles.overlay} onClick={handleOverlayClick}>
			<div className={`${styles.content} ${styles[className]}`}>{children}</div>
		</div>,
		portalNode
	);
}

export default Modal;
