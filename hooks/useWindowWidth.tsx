import { useState, useEffect } from 'react';

const useWindowWidth = () => {
	const [windowWidth, setWindowWidth] = useState(0);
	useEffect(() => {
		if (typeof window === 'undefined') {
			return; // 서버에서는 window가 없으므로 여기서 바로 함수 종료
		}

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		setWindowWidth(window.innerWidth);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []); // 마운트 시 한 번만 실행
	return windowWidth;
};

export default useWindowWidth;
