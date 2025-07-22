import { useCallback, useState, ReactElement } from 'react';

const useModal = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = useCallback(() => setIsOpen(true), []);
	const closeModal = useCallback(() => setIsOpen(false), []);

	const renderModal = useCallback(
		(ModalComponent: React.ElementType, props: any = {}): ReactElement | null =>
			isOpen ? <ModalComponent {...props} isOpen={isOpen} onClose={closeModal} /> : null,
		[isOpen, closeModal]
	);

	return { isOpen, openModal, closeModal, renderModal };
};

export default useModal;
