/**
 * 숫자에서 쉼표 제거
 */
export const sanitizeNumber = (val: string): string => {
	return val.replace(/[^0-9]/g, '');
};

/**
 * 숫자 문자열에 콤마 포맷 적용
 */
export const formatNumberWithComma = (val: string): string => {
	if (!val) return '';
	return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
