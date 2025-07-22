import styles from './BaseButton.module.css';

type ButtonColor = 'red' | 'white' | 'gray';
type ButtonSize = 'small' | 'medium' | 'large' | 'grayMedium' | 'grayLarge' | 'noneSize';
type ButtonType = 'button' | 'submit' | 'reset';

type BaseButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	color?: ButtonColor;
	size?: ButtonSize;
	type?: ButtonType;
	className?: string;
};

export const BaseButton = ({
	children,
	onClick,
	disabled = false,
	color = 'red',
	size = 'small',
	type = 'button',
	className,
}: BaseButtonProps) => {
	const baseClasses = [styles.button, styles[color], styles[size], styles[type]];

	if (disabled) {
		baseClasses.push(styles.disabled);
	}

	if (className) {
		baseClasses.push(styles.className);
	}

	if (color === 'gray') {
		if (size === 'medium') {
			baseClasses.push(styles.grayMedium);
		} else if (size === 'large') {
			baseClasses.push(styles.grayLarge);
		}
	}

	return (
		<button className={baseClasses.join(' ')} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
};

/**
 * ✅ BaseButton 컴포넌트 사용법
 *
 * 공통 버튼 컴포넌트로, 크기(size)와 색상(color), 버튼 타입(type), 비활성화(disabled) 여부 등을 props로 설정할 수 있습니다.
 *
 * ---
 * 🎯 props 목록
 *
 * @param {ReactNode} children - 버튼 안에 들어갈 내용 (텍스트 또는 아이콘 등)
 * @param {() => void} [onClick] - 버튼 클릭 시 실행할 함수
 * @param {'red' | 'white' | 'gray'} [color='red'] - 버튼 색상 (기본값 red)
 * @param {'small' | 'medium' | 'large'} [size='small'] - 버튼 크기 (기본값 small)
 * @param {'button' | 'submit' | 'reset'} [type='button'] - 버튼 타입 (기본값 button)
 * @param {boolean} [disabled=false] - 비활성화 여부
 * @param {string} [className] - 추가로 class를 커스텀하고 싶을 때 사용
 *
 * ---
 * 💡 예시 사용법
 *
 * 기본 버튼
 * ```tsx
 * <BaseButton>버튼</BaseButton>
 * ```
 *
 * 흰색 medium 버튼
 * ```tsx
 * <BaseButton color="white" size="medium">버튼</BaseButton>
 * ```
 *
 * 회색 large 버튼 + 클릭 이벤트
 * ```tsx
 * <BaseButton color="gray" size="large" onClick={handleClick}>
 *   회색 버튼
 * </BaseButton>
 * ```
 *
 * 버튼 비활성화
 * ```tsx
 * <BaseButton disabled>비활성화</BaseButton>
 * ```
 *
 * 폼 제출용 버튼
 * ```tsx
 * <BaseButton type="submit">제출</BaseButton>
 * ```
 */
