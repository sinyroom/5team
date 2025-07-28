type UpArrowIconProps = {
	color?: string;
	width?: number;
	height?: number;
};

const UpArrowIcon = ({ color = 'white', width = 12, height = 12 }: UpArrowIconProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 12 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M8.0001 11.5483H4.0001V6.21495H0.773438L6.0001 0.988281L11.2268 6.21495H8.0001V11.5483Z"
			fill={color}
		/>
	</svg>
);

export default UpArrowIcon;
