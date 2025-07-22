//SVG를 컴포넌트로 불러오도록 설정하기
declare module '*.svg' {
	import * as React from 'react';
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
